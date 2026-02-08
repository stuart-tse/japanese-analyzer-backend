import { stripe } from '../../config/stripe.js';
import { stripeService } from '../stripeService.js';
import { getPricing } from '../../config/stripe.js';
import type {
  PaymentProvider,
  CustomerInfo,
  PaymentMethodInfo,
  SetupIntentResult,
  SubscriptionResult,
  InvoiceInfo,
} from './PaymentProvider.js';

export class StripeProvider implements PaymentProvider {
  readonly name = 'stripe';

  // ============================================
  // Customer Management
  // ============================================

  async createCustomer(email: string, name?: string): Promise<CustomerInfo> {
    const customer = await stripeService.createCustomer(email, name);
    return {
      id: customer.id,
      email: customer.email ?? email,
      name: customer.name ?? undefined,
    };
  }

  async getCustomer(customerId: string): Promise<CustomerInfo> {
    const customer = await stripeService.getCustomer(customerId);
    return {
      id: customer.id,
      email: customer.email ?? '',
      name: customer.name ?? undefined,
    };
  }

  // ============================================
  // Payment Methods
  // ============================================

  async createSetupIntent(customerId: string): Promise<SetupIntentResult> {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: setupIntent.client_secret ?? '',
      setupIntentId: setupIntent.id,
    };
  }

  async listPaymentMethods(customerId: string): Promise<PaymentMethodInfo[]> {
    const [methods, customer] = await Promise.all([
      stripeService.listPaymentMethods(customerId),
      stripeService.getCustomer(customerId),
    ]);

    const defaultPmId = this.extractDefaultPaymentMethodId(customer);

    return methods.map((pm) => ({
      id: pm.id,
      brand: pm.card?.brand ?? null,
      last4: pm.card?.last4 ?? null,
      expMonth: pm.card?.exp_month ?? null,
      expYear: pm.card?.exp_year ?? null,
      isDefault: pm.id === defaultPmId,
    }));
  }

  async getDefaultPaymentMethodId(customerId: string): Promise<string | null> {
    const customer = await stripeService.getCustomer(customerId);
    return this.extractDefaultPaymentMethodId(customer);
  }

  async setDefaultPaymentMethod(customerId: string, paymentMethodId: string): Promise<void> {
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  }

  async detachPaymentMethod(paymentMethodId: string): Promise<void> {
    await stripeService.detachPaymentMethod(paymentMethodId);
  }

  // ============================================
  // Subscriptions
  // ============================================

  async createSubscription(
    customerId: string,
    tier: 'PRO' | 'PREMIUM',
    period: 'monthly' | 'yearly',
    paymentMethodId: string
  ): Promise<SubscriptionResult> {
    const stripeSub = await stripeService.createSubscription(customerId, tier, period, paymentMethodId);
    // Type assertion: Stripe API v2026 has these properties but TS definitions may lag
    const sub = stripeSub as unknown as Record<string, unknown>;
    const invoice = sub.latest_invoice as { payment_intent?: { client_secret?: string } } | null;

    return {
      subscriptionId: stripeSub.id,
      status: stripeSub.status,
      clientSecret: invoice?.payment_intent?.client_secret ?? undefined,
      currentPeriodStart: sub.current_period_start
        ? new Date((sub.current_period_start as number) * 1000)
        : undefined,
      currentPeriodEnd: sub.current_period_end
        ? new Date((sub.current_period_end as number) * 1000)
        : undefined,
    };
  }

  async cancelSubscription(subscriptionId: string, immediately = false): Promise<void> {
    await stripeService.cancelSubscription(subscriptionId, immediately);
  }

  async reactivateSubscription(subscriptionId: string): Promise<void> {
    await stripeService.reactivateSubscription(subscriptionId);
  }

  // ============================================
  // Invoices
  // ============================================

  async listInvoices(customerId: string, limit = 10): Promise<InvoiceInfo[]> {
    const invoices = await stripeService.listInvoices(customerId, limit);
    return invoices.map((inv) => ({
      id: inv.id,
      amount: inv.amount_paid ?? 0,
      currency: inv.currency ?? 'usd',
      status: inv.status ?? 'unknown',
      paidAt: inv.status_transitions?.paid_at
        ? new Date(inv.status_transitions.paid_at * 1000)
        : undefined,
      hostedUrl: inv.hosted_invoice_url ?? undefined,
    }));
  }

  // ============================================
  // Private Helpers
  // ============================================

  private extractDefaultPaymentMethodId(customer: { invoice_settings?: { default_payment_method?: unknown } }): string | null {
    const dpm = customer.invoice_settings?.default_payment_method;
    if (typeof dpm === 'string') return dpm;
    if (dpm && typeof dpm === 'object' && 'id' in dpm) return (dpm as { id: string }).id;
    return null;
  }
}

export const stripeProvider = new StripeProvider();
