import Stripe from 'stripe';
export declare const stripe: Stripe;
export declare const PRICING: {
    readonly PRO: {
        readonly MONTHLY: {
            readonly amount: 999;
            readonly currency: "usd";
            readonly interval: "month";
            readonly priceId: string;
            readonly credits: 1000;
        };
        readonly YEARLY: {
            readonly amount: 9999;
            readonly currency: "usd";
            readonly interval: "year";
            readonly priceId: string;
            readonly credits: 1000;
        };
    };
    readonly PREMIUM: {
        readonly MONTHLY: {
            readonly amount: 2999;
            readonly currency: "usd";
            readonly interval: "month";
            readonly priceId: string;
            readonly credits: 5000;
        };
        readonly YEARLY: {
            readonly amount: 29999;
            readonly currency: "usd";
            readonly interval: "year";
            readonly priceId: string;
            readonly credits: 5000;
        };
    };
    readonly CREDITS: readonly [{
        readonly amount: 499;
        readonly credits: 500;
        readonly bonus: 0;
        readonly label: "Starter Pack";
    }, {
        readonly amount: 999;
        readonly credits: 1000;
        readonly bonus: 200;
        readonly label: "Value Pack";
    }, {
        readonly amount: 1999;
        readonly credits: 2000;
        readonly bonus: 1000;
        readonly label: "Premium Pack";
    }];
};
export declare function getPricing(tier: 'PRO' | 'PREMIUM', period: 'monthly' | 'yearly'): {
    readonly amount: 999;
    readonly currency: "usd";
    readonly interval: "month";
    readonly priceId: string;
    readonly credits: 1000;
} | {
    readonly amount: 9999;
    readonly currency: "usd";
    readonly interval: "year";
    readonly priceId: string;
    readonly credits: 1000;
} | {
    readonly amount: 2999;
    readonly currency: "usd";
    readonly interval: "month";
    readonly priceId: string;
    readonly credits: 5000;
} | {
    readonly amount: 29999;
    readonly currency: "usd";
    readonly interval: "year";
    readonly priceId: string;
    readonly credits: 5000;
};
export declare function constructWebhookEvent(payload: string | Buffer, signature: string, secret: string): Stripe.Event;
export default stripe;
