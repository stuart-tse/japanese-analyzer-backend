import { prisma } from '../config/prisma.js';
import { stripeService } from './stripeService.js';
import {
  SubscriptionTier,
  SubscriptionStatus,
  PaymentMethod,
  PaymentStatus,
  PaymentType
} from '../generated/prisma/index.js';
import { getPricing } from '../config/stripe.js';
import type Stripe from 'stripe';

export class SubscriptionService {
  /**
   * Create a new subscription for a user
   */
  async createSubscription(
    userId: string,
    tier: 'PRO' | 'PREMIUM',
    period: 'monthly' | 'yearly',
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

    // Create Stripe subscription
    const stripeSubscription = await stripeService.createSubscription(
      stripeCustomerId,
      tier,
      period,
      paymentMethodId
    );

    const pricing = getPricing(tier, period);

    // Create subscription in database
    // Type assertion: Stripe API v2026 has these properties but TS definitions may be incomplete
    const sub = stripeSubscription as any;
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        tier: SubscriptionTier[tier],
        status: SubscriptionStatus.ACTIVE,
        stripeSubscriptionId: stripeSubscription.id,
        stripePriceId: pricing.priceId,
        billingPeriod: period,
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        monthlyCredits: pricing.credits,
      },
    });

    // Update user tier and allocate monthly credits
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: SubscriptionTier[tier],
        subscriptionExpiry: new Date(sub.current_period_end * 1000),
        credits: { increment: pricing.credits },
      },
    });

    // Record credit allocation
    await prisma.creditTransaction.create({
      data: {
        userId,
        amount: pricing.credits,
        balanceAfter: user.credits + pricing.credits,
        type: 'MONTHLY_ALLOCATION',
        description: `${tier} subscription - ${period} billing`,
      },
    });

    // Type assertion: Stripe API v2026 has these properties but TS definitions may be incomplete
    const latestInvoice = stripeSubscription.latest_invoice as any;
    return {
      subscription,
      clientSecret: latestInvoice?.payment_intent
        ? (latestInvoice.payment_intent as any).client_secret
        : null,
    };
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(
    userId: string,
    immediately = false
  ) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    if (!subscription || !subscription.stripeSubscriptionId) {
      throw new Error('No active subscription found');
    }

    // Cancel in Stripe
    const stripeSubscription = await stripeService.cancelSubscription(
      subscription.stripeSubscriptionId,
      immediately
    );

    // Update subscription in database
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: !immediately,
        canceledAt: new Date(),
        status: immediately ? SubscriptionStatus.CANCELED : subscription.status,
      },
    });

    // If immediate cancellation, downgrade to FREE tier
    if (immediately) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionTier: SubscriptionTier.FREE,
          subscriptionExpiry: new Date(),
        },
      });
    }

    return updatedSubscription;
  }

  /**
   * Reactivate a subscription that was set to cancel
   */
  async reactivateSubscription(userId: string) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        cancelAtPeriodEnd: true,
      },
    });

    if (!subscription || !subscription.stripeSubscriptionId) {
      throw new Error('No cancelable subscription found');
    }

    // Reactivate in Stripe
    await stripeService.reactivateSubscription(subscription.stripeSubscriptionId);

    // Update database
    return await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: false,
        canceledAt: null,
      },
    });
  }

  /**
   * Update subscription (change tier or billing period)
   */
  async updateSubscription(
    userId: string,
    newTier: 'PRO' | 'PREMIUM',
    newPeriod: 'monthly' | 'yearly'
  ) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    if (!subscription || !subscription.stripeSubscriptionId) {
      throw new Error('No active subscription found');
    }

    // Update in Stripe
    const stripeSubscription = await stripeService.updateSubscription(
      subscription.stripeSubscriptionId,
      newTier,
      newPeriod
    );

    const pricing = getPricing(newTier, newPeriod);

    // Update database
    return await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        tier: SubscriptionTier[newTier],
        stripePriceId: pricing.priceId,
        billingPeriod: newPeriod,
        monthlyCredits: pricing.credits,
      },
    });
  }

  /**
   * Get current subscription for a user
   */
  async getCurrentSubscription(userId: string) {
    return await prisma.subscription.findFirst({
      where: {
        userId,
        status: {
          in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PAST_DUE],
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get subscription payment history
   */
  async getPaymentHistory(userId: string, limit = 10) {
    return await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Check if user has access to a feature based on tier
   */
  async checkFeatureAccess(userId: string, featureType: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return false;

    const feature = await prisma.featureAccess.findUnique({
      where: { featureType: featureType as any },
    });

    if (!feature) return false;

    const tierLevels = {
      [SubscriptionTier.FREE]: 0,
      [SubscriptionTier.PRO]: 1,
      [SubscriptionTier.PREMIUM]: 2,
    };

    return tierLevels[user.subscriptionTier] >= tierLevels[feature.minTier];
  }

  /**
   * Record a successful payment
   */
  async recordPayment(
    userId: string,
    amount: number,
    paymentMethod: PaymentMethod,
    paymentType: PaymentType,
    stripePaymentIntentId?: string,
    stripeInvoiceId?: string,
    subscriptionId?: string,
    creditAmount?: number
  ) {
    return await prisma.payment.create({
      data: {
        userId,
        amount,
        currency: 'usd',
        paymentMethod,
        status: PaymentStatus.SUCCEEDED,
        type: paymentType,
        stripePaymentIntentId,
        stripeInvoiceId,
        subscriptionId,
        creditAmount,
        paidAt: new Date(),
      },
    });
  }

  /**
   * Handle subscription renewal (called by webhook)
   */
  async handleSubscriptionRenewal(stripeSubscriptionId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId },
      include: { user: true },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Allocate monthly credits
    const newBalance = subscription.user.credits + subscription.monthlyCredits;

    await prisma.user.update({
      where: { id: subscription.userId },
      data: {
        credits: newBalance,
      },
    });

    // Record credit transaction
    await prisma.creditTransaction.create({
      data: {
        userId: subscription.userId,
        amount: subscription.monthlyCredits,
        balanceAfter: newBalance,
        type: 'MONTHLY_ALLOCATION',
        description: `Monthly renewal - ${subscription.tier} subscription`,
      },
    });
  }

  /**
   * Handle subscription cancellation (called by webhook)
   */
  async handleSubscriptionCancellation(stripeSubscriptionId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Update subscription status
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: SubscriptionStatus.CANCELED,
        canceledAt: new Date(),
      },
    });

    // Downgrade user to FREE tier
    await prisma.user.update({
      where: { id: subscription.userId },
      data: {
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionExpiry: new Date(),
      },
    });
  }

  /**
   * Handle payment failure (called by webhook)
   */
  async handlePaymentFailure(stripeSubscriptionId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId },
    });

    if (!subscription) {
      return;
    }

    // Mark subscription as PAST_DUE
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: SubscriptionStatus.PAST_DUE,
      },
    });

    // TODO: Send email notification to user
  }
}

export const subscriptionService = new SubscriptionService();
