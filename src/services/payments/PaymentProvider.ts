/**
 * Payment Provider abstraction layer.
 * Allows swapping Stripe for other providers (Alipay, WeChat Pay, LINE Pay, Airwallex).
 */

// ============================================
// Shared Types
// ============================================

export interface CustomerInfo {
  id: string;
  email: string;
  name?: string;
}

export interface PaymentMethodInfo {
  id: string;
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
  isDefault: boolean;
}

export interface SetupIntentResult {
  clientSecret: string;
  setupIntentId: string;
}

export interface SubscriptionResult {
  subscriptionId: string;
  status: string;
  clientSecret?: string; // For incomplete payments
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
}

export interface InvoiceInfo {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paidAt?: Date;
  hostedUrl?: string;
}

// ============================================
// Provider Interface
// ============================================

export interface PaymentProvider {
  readonly name: string;

  // Customer Management
  createCustomer(email: string, name?: string): Promise<CustomerInfo>;
  getCustomer(customerId: string): Promise<CustomerInfo>;

  // Payment Methods
  createSetupIntent(customerId: string): Promise<SetupIntentResult>;
  listPaymentMethods(customerId: string): Promise<PaymentMethodInfo[]>;
  getDefaultPaymentMethodId(customerId: string): Promise<string | null>;
  setDefaultPaymentMethod(customerId: string, paymentMethodId: string): Promise<void>;
  detachPaymentMethod(paymentMethodId: string): Promise<void>;

  // Subscriptions
  createSubscription(
    customerId: string,
    tier: 'PRO' | 'PREMIUM',
    period: 'monthly' | 'yearly',
    paymentMethodId: string
  ): Promise<SubscriptionResult>;
  cancelSubscription(subscriptionId: string, immediately?: boolean): Promise<void>;
  reactivateSubscription(subscriptionId: string): Promise<void>;

  // Invoices
  listInvoices(customerId: string, limit?: number): Promise<InvoiceInfo[]>;
}
