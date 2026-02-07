import Stripe from 'stripe';
import { stripe, getPricing, PRICING } from '../config/stripe.js';
import { SubscriptionTier } from '../generated/prisma/index.js';

export class StripeService {
  /**
   * Create or retrieve a Stripe customer for a user
   */
  async createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
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
  async getCustomer(customerId: string): Promise<Stripe.Customer> {
    return await stripe.customers.retrieve(customerId) as Stripe.Customer;
  }

  /**
   * Update customer information
   */
  async updateCustomer(
    customerId: string,
    data: Stripe.CustomerUpdateParams
  ): Promise<Stripe.Customer> {
    return await stripe.customers.update(customerId, data);
  }

  /**
   * Create a subscription for a customer
   */
  async createSubscription(
    customerId: string,
    tier: 'PRO' | 'PREMIUM',
    period: 'monthly' | 'yearly',
    paymentMethodId: string
  ): Promise<Stripe.Subscription> {
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
  async cancelSubscription(
    subscriptionId: string,
    immediately = false
  ): Promise<Stripe.Subscription> {
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
  async reactivateSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
  }

  /**
   * Update subscription (change tier or period)
   */
  async updateSubscription(
    subscriptionId: string,
    tier: 'PRO' | 'PREMIUM',
    period: 'monthly' | 'yearly'
  ): Promise<Stripe.Subscription> {
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
  async createCreditPaymentIntent(
    customerId: string,
    packageIndex: number
  ): Promise<Stripe.PaymentIntent> {
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
  async createPaymentIntentWithMethod(
    amount: number,
    customerId: string,
    paymentMethod: 'card' | 'alipay' | 'wechat_pay',
    metadata: Record<string, string>
  ): Promise<Stripe.PaymentIntent> {
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
  async getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  }

  /**
   * List all payment methods for a customer
   */
  async listPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data;
  }

  /**
   * Detach payment method from customer
   */
  async detachPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod> {
    return await stripe.paymentMethods.detach(paymentMethodId);
  }

  /**
   * List invoices for a customer
   */
  async listInvoices(
    customerId: string,
    limit = 10
  ): Promise<Stripe.Invoice[]> {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit,
    });

    return invoices.data;
  }

  /**
   * Retrieve an invoice
   */
  async getInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    return await stripe.invoices.retrieve(invoiceId);
  }

  /**
   * Get upcoming invoice (for subscription changes)
   */
  async getUpcomingInvoice(
    customerId: string,
    subscriptionId?: string
  ): Promise<Stripe.Invoice> {
    // Type assertion: method name may have changed in Stripe API v2026
    return await (stripe.invoices as any).retrieveUpcoming({
      customer: customerId,
      subscription: subscriptionId,
    });
  }

  /**
   * Create a billing portal session
   */
  async createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<Stripe.BillingPortal.Session> {
    return await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
  }

  /**
   * Retrieve subscription
   */
  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.retrieve(subscriptionId);
  }
}

export const stripeService = new StripeService();
