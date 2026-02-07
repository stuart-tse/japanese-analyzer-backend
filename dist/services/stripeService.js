import { stripe, getPricing, PRICING } from '../config/stripe.js';
export class StripeService {
    /**
     * Create or retrieve a Stripe customer for a user
     */
    async createCustomer(email, name) {
        return await stripe.customers.create({
            email,
            name,
            metadata: {
                source: 'japanese-analyzer',
            },
        });
    }
    /**
     * Retrieve a customer by ID
     */
    async getCustomer(customerId) {
        return await stripe.customers.retrieve(customerId);
    }
    /**
     * Update customer information
     */
    async updateCustomer(customerId, data) {
        return await stripe.customers.update(customerId, data);
    }
    /**
     * Create a subscription for a customer
     */
    async createSubscription(customerId, tier, period, paymentMethodId) {
        const pricing = getPricing(tier, period);
        // Attach payment method to customer
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
        // Set as default payment method
        await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });
        // Create subscription
        return await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: pricing.priceId }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                tier,
                period,
                monthlyCredits: pricing.credits.toString(),
            },
        });
    }
    /**
     * Cancel a subscription (at period end)
     */
    async cancelSubscription(subscriptionId, immediately = false) {
        if (immediately) {
            return await stripe.subscriptions.cancel(subscriptionId);
        }
        return await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
        });
    }
    /**
     * Reactivate a subscription that was set to cancel
     */
    async reactivateSubscription(subscriptionId) {
        return await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: false,
        });
    }
    /**
     * Update subscription (change tier or period)
     */
    async updateSubscription(subscriptionId, tier, period) {
        const pricing = getPricing(tier, period);
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        return await stripe.subscriptions.update(subscriptionId, {
            items: [
                {
                    id: subscription.items.data[0].id,
                    price: pricing.priceId,
                },
            ],
            proration_behavior: 'create_prorations',
            metadata: {
                tier,
                period,
                monthlyCredits: pricing.credits.toString(),
            },
        });
    }
    /**
     * Create a payment intent for credit purchase
     */
    async createCreditPaymentIntent(customerId, packageIndex) {
        const creditPackage = PRICING.CREDITS[packageIndex];
        if (!creditPackage) {
            throw new Error('Invalid credit package index');
        }
        const totalCredits = creditPackage.credits + creditPackage.bonus;
        return await stripe.paymentIntents.create({
            amount: creditPackage.amount,
            currency: 'usd',
            customer: customerId,
            automatic_payment_methods: { enabled: true },
            metadata: {
                type: 'credit_topup',
                credits: totalCredits.toString(),
                packageLabel: creditPackage.label,
            },
            description: `${creditPackage.label} - ${totalCredits} credits`,
        });
    }
    /**
     * Create a payment intent with specific payment method (for Alipay/WeChat)
     */
    async createPaymentIntentWithMethod(amount, customerId, paymentMethod, metadata) {
        const paymentMethodTypes = {
            card: ['card'],
            alipay: ['alipay'],
            wechat_pay: ['wechat_pay'],
        };
        const currency = paymentMethod === 'card' ? 'usd' : 'cny';
        return await stripe.paymentIntents.create({
            amount,
            currency,
            customer: customerId,
            payment_method_types: paymentMethodTypes[paymentMethod],
            metadata,
        });
    }
    /**
     * Retrieve payment intent
     */
    async getPaymentIntent(paymentIntentId) {
        return await stripe.paymentIntents.retrieve(paymentIntentId);
    }
    /**
     * List all payment methods for a customer
     */
    async listPaymentMethods(customerId) {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });
        return paymentMethods.data;
    }
    /**
     * Detach payment method from customer
     */
    async detachPaymentMethod(paymentMethodId) {
        return await stripe.paymentMethods.detach(paymentMethodId);
    }
    /**
     * List invoices for a customer
     */
    async listInvoices(customerId, limit = 10) {
        const invoices = await stripe.invoices.list({
            customer: customerId,
            limit,
        });
        return invoices.data;
    }
    /**
     * Retrieve an invoice
     */
    async getInvoice(invoiceId) {
        return await stripe.invoices.retrieve(invoiceId);
    }
    /**
     * Get upcoming invoice (for subscription changes)
     */
    async getUpcomingInvoice(customerId, subscriptionId) {
        // Type assertion: method name may have changed in Stripe API v2026
        return await stripe.invoices.retrieveUpcoming({
            customer: customerId,
            subscription: subscriptionId,
        });
    }
    /**
     * Create a billing portal session
     */
    async createBillingPortalSession(customerId, returnUrl) {
        return await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });
    }
    /**
     * Retrieve subscription
     */
    async getSubscription(subscriptionId) {
        return await stripe.subscriptions.retrieve(subscriptionId);
    }
}
export const stripeService = new StripeService();
//# sourceMappingURL=stripeService.js.map