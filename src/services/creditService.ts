import { prisma } from '../config/prisma.js';
import { stripeService } from './stripeService.js';
import { CreditTransactionType } from '../generated/prisma/index.js';

export class CreditService {
  /**
   * Deduct credits from user balance
   * Returns true if successful, false if insufficient credits
   */
  async deductCredits(
    userId: string,
    amount: number,
    featureType: string,
    relatedEntityId?: string
  ): Promise<boolean> {
    // Use transaction to ensure atomicity
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.credits < amount) {
        return false; // Insufficient credits
      }

      // Deduct credits
      const newBalance = user.credits - amount;

      await tx.user.update({
        where: { id: userId },
        data: { credits: newBalance },
      });

      // Record transaction
      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -amount, // Negative for deductions
          balanceAfter: newBalance,
          type: CreditTransactionType.DEDUCTION,
          description: `Used ${amount} credits for ${featureType}`,
          featureType,
          relatedEntityId,
        },
      });

      return true;
    });
  }

  /**
   * Add credits to user balance (internal)
   */
  async addCredits(
    userId: string,
    amount: number,
    type: CreditTransactionType,
    description: string,
    paymentId?: string
  ): Promise<number> {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const newBalance = user.credits + amount;

      await tx.user.update({
        where: { id: userId },
        data: { credits: newBalance },
      });

      await tx.creditTransaction.create({
        data: {
          userId,
          amount,
          balanceAfter: newBalance,
          type,
          description,
          paymentId,
        },
      });

      return newBalance;
    });
  }

  /**
   * Purchase credits via Stripe
   */
  async purchaseCredits(
    userId: string,
    packageIndex: number,
    paymentMethodId: string
  ) {
    // Get user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Create or get Stripe customer
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripeService.createCustomer(
        user.email,
        user.username || undefined
      );
      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      });
    }

    // Create payment intent
    const paymentIntent = await stripeService.createCreditPaymentIntent(
      stripeCustomerId,
      packageIndex
    );

    // Attach payment method and confirm
    const { stripe } = await import('../config/stripe.js');
    await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: paymentMethodId,
    });

    return {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    };
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(userId: string, limit = 50) {
    return await prisma.creditTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Get current balance
   */
  async getBalance(userId: string): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    return user?.credits || 0;
  }

  /**
   * Allocate monthly credits (called on subscription renewal)
   */
  async allocateMonthlyCredits(
    userId: string,
    amount: number,
    subscriptionTier: string
  ): Promise<number> {
    return await this.addCredits(
      userId,
      amount,
      CreditTransactionType.MONTHLY_ALLOCATION,
      `Monthly credit allocation - ${subscriptionTier} tier`
    );
  }

  /**
   * Refund credits
   */
  async refundCredits(
    userId: string,
    amount: number,
    reason: string,
    relatedPaymentId?: string
  ): Promise<number> {
    return await this.addCredits(
      userId,
      amount,
      CreditTransactionType.REFUND,
      `Credit refund: ${reason}`,
      relatedPaymentId
    );
  }

  /**
   * Grant bonus credits
   */
  async grantBonusCredits(
    userId: string,
    amount: number,
    reason: string
  ): Promise<number> {
    return await this.addCredits(
      userId,
      amount,
      CreditTransactionType.BONUS,
      `Bonus credits: ${reason}`
    );
  }

  /**
   * Check if user can afford a feature
   */
  async canAfford(userId: string, cost: number): Promise<boolean> {
    const balance = await this.getBalance(userId);
    return balance >= cost;
  }

  /**
   * Get credit statistics
   */
  async getCreditStats(userId: string) {
    const transactions = await prisma.creditTransaction.findMany({
      where: { userId },
    });

    const stats = {
      currentBalance: await this.getBalance(userId),
      totalEarned: 0,
      totalSpent: 0,
      totalPurchased: 0,
      totalMonthlyAllocation: 0,
      totalBonus: 0,
      totalRefunded: 0,
    };

    for (const tx of transactions) {
      if (tx.amount > 0) {
        stats.totalEarned += tx.amount;

        switch (tx.type) {
          case CreditTransactionType.PURCHASE:
            stats.totalPurchased += tx.amount;
            break;
          case CreditTransactionType.MONTHLY_ALLOCATION:
            stats.totalMonthlyAllocation += tx.amount;
            break;
          case CreditTransactionType.BONUS:
            stats.totalBonus += tx.amount;
            break;
          case CreditTransactionType.REFUND:
            stats.totalRefunded += tx.amount;
            break;
        }
      } else {
        stats.totalSpent += Math.abs(tx.amount);
      }
    }

    return stats;
  }

  /**
   * Validate credit cost for a feature
   */
  async validateFeatureCost(
    userId: string,
    featureType: string
  ): Promise<{ allowed: boolean; cost: number; balance: number; reason?: string }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true, subscriptionTier: true },
    });

    if (!user) {
      return {
        allowed: false,
        cost: 0,
        balance: 0,
        reason: 'User not found',
      };
    }

    const feature = await prisma.featureAccess.findUnique({
      where: { featureType: featureType as any },
    });

    if (!feature) {
      return {
        allowed: false,
        cost: 0,
        balance: user.credits,
        reason: 'Feature not found',
      };
    }

    // Check if user has required tier
    const tierLevels = { FREE: 0, PRO: 1, PREMIUM: 2 };
    const userTierLevel = tierLevels[user.subscriptionTier];
    const minTierLevel = tierLevels[feature.minTier];

    if (userTierLevel >= minTierLevel) {
      return {
        allowed: true,
        cost: 0,
        balance: user.credits,
      };
    }

    // Check if user can pay with credits
    const cost = feature.creditCost || 0;

    if (cost === 0) {
      return {
        allowed: false,
        cost: 0,
        balance: user.credits,
        reason: 'Feature requires tier upgrade (no credit alternative)',
      };
    }

    return {
      allowed: user.credits >= cost,
      cost,
      balance: user.credits,
      reason: user.credits < cost ? 'Insufficient credits' : undefined,
    };
  }
}

export const creditService = new CreditService();
