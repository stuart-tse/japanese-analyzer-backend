import { CreditTransactionType } from '../generated/prisma/index.js';
export declare class CreditService {
    /**
     * Deduct credits from user balance
     * Returns true if successful, false if insufficient credits
     */
    deductCredits(userId: string, amount: number, featureType: string, relatedEntityId?: string): Promise<boolean>;
    /**
     * Add credits to user balance (internal)
     */
    addCredits(userId: string, amount: number, type: CreditTransactionType, description: string, paymentId?: string): Promise<number>;
    /**
     * Purchase credits via Stripe
     */
    purchaseCredits(userId: string, packageIndex: number, paymentMethodId: string): Promise<{
        paymentIntentId: string;
        clientSecret: string | null;
    }>;
    /**
     * Get transaction history
     */
    getTransactionHistory(userId: string, limit?: number): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        type: import("../generated/prisma/index.js").$Enums.CreditTransactionType;
        balanceAfter: number;
        description: string | null;
        paymentId: string | null;
        featureType: string | null;
        relatedEntityId: string | null;
    }[]>;
    /**
     * Get current balance
     */
    getBalance(userId: string): Promise<number>;
    /**
     * Allocate monthly credits (called on subscription renewal)
     */
    allocateMonthlyCredits(userId: string, amount: number, subscriptionTier: string): Promise<number>;
    /**
     * Refund credits
     */
    refundCredits(userId: string, amount: number, reason: string, relatedPaymentId?: string): Promise<number>;
    /**
     * Grant bonus credits
     */
    grantBonusCredits(userId: string, amount: number, reason: string): Promise<number>;
    /**
     * Check if user can afford a feature
     */
    canAfford(userId: string, cost: number): Promise<boolean>;
    /**
     * Get credit statistics
     */
    getCreditStats(userId: string): Promise<{
        currentBalance: number;
        totalEarned: number;
        totalSpent: number;
        totalPurchased: number;
        totalMonthlyAllocation: number;
        totalBonus: number;
        totalRefunded: number;
    }>;
    /**
     * Validate credit cost for a feature
     */
    validateFeatureCost(userId: string, featureType: string): Promise<{
        allowed: boolean;
        cost: number;
        balance: number;
        reason?: string;
    }>;
}
export declare const creditService: CreditService;
