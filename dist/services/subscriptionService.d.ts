import { PaymentMethod, PaymentType } from '../generated/prisma/index.js';
export declare class SubscriptionService {
    /**
     * Create a new subscription for a user
     */
    createSubscription(userId: string, tier: 'PRO' | 'PREMIUM', period: 'monthly' | 'yearly', paymentMethodId: string): Promise<{
        subscription: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("../generated/prisma/index.js").$Enums.SubscriptionStatus;
            tier: import("../generated/prisma/index.js").$Enums.SubscriptionTier;
            stripeSubscriptionId: string | null;
            stripePriceId: string | null;
            stripeProductId: string | null;
            billingPeriod: string;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            cancelAtPeriodEnd: boolean;
            canceledAt: Date | null;
            monthlyCredits: number;
        };
        clientSecret: any;
    }>;
    /**
     * Cancel a subscription
     */
    cancelSubscription(userId: string, immediately?: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("../generated/prisma/index.js").$Enums.SubscriptionStatus;
        tier: import("../generated/prisma/index.js").$Enums.SubscriptionTier;
        stripeSubscriptionId: string | null;
        stripePriceId: string | null;
        stripeProductId: string | null;
        billingPeriod: string;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        monthlyCredits: number;
    }>;
    /**
     * Reactivate a subscription that was set to cancel
     */
    reactivateSubscription(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("../generated/prisma/index.js").$Enums.SubscriptionStatus;
        tier: import("../generated/prisma/index.js").$Enums.SubscriptionTier;
        stripeSubscriptionId: string | null;
        stripePriceId: string | null;
        stripeProductId: string | null;
        billingPeriod: string;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        monthlyCredits: number;
    }>;
    /**
     * Update subscription (change tier or billing period)
     */
    updateSubscription(userId: string, newTier: 'PRO' | 'PREMIUM', newPeriod: 'monthly' | 'yearly'): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("../generated/prisma/index.js").$Enums.SubscriptionStatus;
        tier: import("../generated/prisma/index.js").$Enums.SubscriptionTier;
        stripeSubscriptionId: string | null;
        stripePriceId: string | null;
        stripeProductId: string | null;
        billingPeriod: string;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        monthlyCredits: number;
    }>;
    /**
     * Get current subscription for a user
     */
    getCurrentSubscription(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("../generated/prisma/index.js").$Enums.SubscriptionStatus;
        tier: import("../generated/prisma/index.js").$Enums.SubscriptionTier;
        stripeSubscriptionId: string | null;
        stripePriceId: string | null;
        stripeProductId: string | null;
        billingPeriod: string;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        monthlyCredits: number;
    } | null>;
    /**
     * Get subscription payment history
     */
    getPaymentHistory(userId: string, limit?: number): Promise<{
        id: string;
        subscriptionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        paymentMethod: import("../generated/prisma/index.js").$Enums.PaymentMethod;
        status: import("../generated/prisma/index.js").$Enums.PaymentStatus;
        type: import("../generated/prisma/index.js").$Enums.PaymentType;
        stripePaymentIntentId: string | null;
        stripeInvoiceId: string | null;
        externalPaymentId: string | null;
        creditAmount: number | null;
        paidAt: Date | null;
    }[]>;
    /**
     * Check if user has access to a feature based on tier
     */
    checkFeatureAccess(userId: string, featureType: string): Promise<boolean>;
    /**
     * Record a successful payment
     */
    recordPayment(userId: string, amount: number, paymentMethod: PaymentMethod, paymentType: PaymentType, stripePaymentIntentId?: string, stripeInvoiceId?: string, subscriptionId?: string, creditAmount?: number): Promise<{
        id: string;
        subscriptionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        paymentMethod: import("../generated/prisma/index.js").$Enums.PaymentMethod;
        status: import("../generated/prisma/index.js").$Enums.PaymentStatus;
        type: import("../generated/prisma/index.js").$Enums.PaymentType;
        stripePaymentIntentId: string | null;
        stripeInvoiceId: string | null;
        externalPaymentId: string | null;
        creditAmount: number | null;
        paidAt: Date | null;
    }>;
    /**
     * Handle subscription renewal (called by webhook)
     */
    handleSubscriptionRenewal(stripeSubscriptionId: string): Promise<void>;
    /**
     * Handle subscription cancellation (called by webhook)
     */
    handleSubscriptionCancellation(stripeSubscriptionId: string): Promise<void>;
    /**
     * Handle payment failure (called by webhook)
     */
    handlePaymentFailure(stripeSubscriptionId: string): Promise<void>;
}
export declare const subscriptionService: SubscriptionService;
