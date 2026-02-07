import Stripe from 'stripe';
import { config } from './index.js';
if (!config.stripe.secretKey) {
    throw new Error('STRIPE_SECRET_KEY is required');
}
// Initialize Stripe client
export const stripe = new Stripe(config.stripe.secretKey, {
    apiVersion: '2026-01-28.clover', // Use latest API version
    typescript: true,
    telemetry: false, // Disable telemetry in production
});
// Pricing configuration
export const PRICING = {
    PRO: {
        MONTHLY: {
            amount: 999, // $9.99 in cents
            currency: 'usd',
            interval: 'month',
            priceId: config.stripe.proPriceIds.monthly,
            credits: 1000,
        },
        YEARLY: {
            amount: 9999, // $99.99 in cents (17% discount)
            currency: 'usd',
            interval: 'year',
            priceId: config.stripe.proPriceIds.yearly,
            credits: 1000,
        },
    },
    PREMIUM: {
        MONTHLY: {
            amount: 2999, // $29.99 in cents
            currency: 'usd',
            interval: 'month',
            priceId: config.stripe.premiumPriceIds.monthly,
            credits: 5000,
        },
        YEARLY: {
            amount: 29999, // $299.99 in cents (17% discount)
            currency: 'usd',
            interval: 'year',
            priceId: config.stripe.premiumPriceIds.yearly,
            credits: 5000,
        },
    },
    CREDITS: [
        {
            amount: 499, // $4.99
            credits: 500,
            bonus: 0,
            label: 'Starter Pack',
        },
        {
            amount: 999, // $9.99
            credits: 1000,
            bonus: 200, // 17% bonus
            label: 'Value Pack',
        },
        {
            amount: 1999, // $19.99
            credits: 2000,
            bonus: 1000, // 33% bonus
            label: 'Premium Pack',
        },
    ],
};
// Helper to get pricing by tier and period
export function getPricing(tier, period) {
    const periodKey = period === 'monthly' ? 'MONTHLY' : 'YEARLY';
    return PRICING[tier][periodKey];
}
// Helper to validate webhook signature
export function constructWebhookEvent(payload, signature, secret) {
    try {
        return stripe.webhooks.constructEvent(payload, signature, secret);
    }
    catch (error) {
        throw new Error(`Webhook signature verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
export default stripe;
//# sourceMappingURL=stripe.js.map