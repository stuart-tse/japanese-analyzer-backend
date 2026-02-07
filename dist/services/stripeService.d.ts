import Stripe from 'stripe';
export declare class StripeService {
    /**
     * Create or retrieve a Stripe customer for a user
     */
    createCustomer(email: string, name?: string): Promise<Stripe.Customer>;
    /**
     * Retrieve a customer by ID
     */
    getCustomer(customerId: string): Promise<Stripe.Customer>;
    /**
     * Update customer information
     */
    updateCustomer(customerId: string, data: Stripe.CustomerUpdateParams): Promise<Stripe.Customer>;
    /**
     * Create a subscription for a customer
     */
    createSubscription(customerId: string, tier: 'PRO' | 'PREMIUM', period: 'monthly' | 'yearly', paymentMethodId: string): Promise<Stripe.Subscription>;
    /**
     * Cancel a subscription (at period end)
     */
    cancelSubscription(subscriptionId: string, immediately?: boolean): Promise<Stripe.Subscription>;
    /**
     * Reactivate a subscription that was set to cancel
     */
    reactivateSubscription(subscriptionId: string): Promise<Stripe.Subscription>;
    /**
     * Update subscription (change tier or period)
     */
    updateSubscription(subscriptionId: string, tier: 'PRO' | 'PREMIUM', period: 'monthly' | 'yearly'): Promise<Stripe.Subscription>;
    /**
     * Create a payment intent for credit purchase
     */
    createCreditPaymentIntent(customerId: string, packageIndex: number): Promise<Stripe.PaymentIntent>;
    /**
     * Create a payment intent with specific payment method (for Alipay/WeChat)
     */
    createPaymentIntentWithMethod(amount: number, customerId: string, paymentMethod: 'card' | 'alipay' | 'wechat_pay', metadata: Record<string, string>): Promise<Stripe.PaymentIntent>;
    /**
     * Retrieve payment intent
     */
    getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
    /**
     * List all payment methods for a customer
     */
    listPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]>;
    /**
     * Detach payment method from customer
     */
    detachPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod>;
    /**
     * List invoices for a customer
     */
    listInvoices(customerId: string, limit?: number): Promise<Stripe.Invoice[]>;
    /**
     * Retrieve an invoice
     */
    getInvoice(invoiceId: string): Promise<Stripe.Invoice>;
    /**
     * Get upcoming invoice (for subscription changes)
     */
    getUpcomingInvoice(customerId: string, subscriptionId?: string): Promise<Stripe.Invoice>;
    /**
     * Create a billing portal session
     */
    createBillingPortalSession(customerId: string, returnUrl: string): Promise<Stripe.BillingPortal.Session>;
    /**
     * Retrieve subscription
     */
    getSubscription(subscriptionId: string): Promise<Stripe.Subscription>;
}
export declare const stripeService: StripeService;
