import type {
  PaymentProvider,
  CustomerInfo,
  PaymentMethodInfo,
  SetupIntentResult,
  SubscriptionResult,
  InvoiceInfo,
} from './PaymentProvider.js';

/**
 * Base stub for payment providers that are not yet implemented.
 * Throws descriptive errors so callers know the feature is pending.
 */
abstract class StubProvider implements PaymentProvider {
  abstract readonly name: string;

  private notImplemented(): never {
    throw new Error(`${this.name} 支付暂未开放，敬请期待`);
  }

  async createCustomer(): Promise<CustomerInfo> { return this.notImplemented(); }
  async getCustomer(): Promise<CustomerInfo> { return this.notImplemented(); }
  async createSetupIntent(): Promise<SetupIntentResult> { return this.notImplemented(); }
  async listPaymentMethods(): Promise<PaymentMethodInfo[]> { return this.notImplemented(); }
  async getDefaultPaymentMethodId(): Promise<string | null> { return this.notImplemented(); }
  async setDefaultPaymentMethod(): Promise<void> { return this.notImplemented(); }
  async detachPaymentMethod(): Promise<void> { return this.notImplemented(); }
  async createSubscription(): Promise<SubscriptionResult> { return this.notImplemented(); }
  async cancelSubscription(): Promise<void> { return this.notImplemented(); }
  async reactivateSubscription(): Promise<void> { return this.notImplemented(); }
  async listInvoices(): Promise<InvoiceInfo[]> { return this.notImplemented(); }
}

export class AlipayProvider extends StubProvider {
  readonly name = 'alipay';
}

export class WeChatPayProvider extends StubProvider {
  readonly name = 'wechat_pay';
}

export class LinePayProvider extends StubProvider {
  readonly name = 'line_pay';
}

export class AirwallexProvider extends StubProvider {
  readonly name = 'airwallex';
}

export const alipayProvider = new AlipayProvider();
export const weChatPayProvider = new WeChatPayProvider();
export const linePayProvider = new LinePayProvider();
export const airwallexProvider = new AirwallexProvider();
