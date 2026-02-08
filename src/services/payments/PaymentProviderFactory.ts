import type { PaymentProvider } from './PaymentProvider.js';
import { stripeProvider } from './StripeProvider.js';
import {
  alipayProvider,
  weChatPayProvider,
  linePayProvider,
  airwallexProvider,
} from './StubProviders.js';

// ============================================
// Provider Registry
// ============================================

type ProviderName = 'stripe' | 'alipay' | 'wechat_pay' | 'line_pay' | 'airwallex';

const providers: Record<ProviderName, PaymentProvider> = {
  stripe: stripeProvider,
  alipay: alipayProvider,
  wechat_pay: weChatPayProvider,
  line_pay: linePayProvider,
  airwallex: airwallexProvider,
};

// ============================================
// Region-Based Defaults
// ============================================

type Region = 'global' | 'china' | 'japan' | 'southeast_asia';

const regionDefaults: Record<Region, ProviderName> = {
  global: 'stripe',
  china: 'alipay',
  japan: 'stripe',
  southeast_asia: 'stripe',
};

// ============================================
// Factory Functions
// ============================================

/**
 * Get a payment provider by name.
 */
export function getProvider(name: ProviderName): PaymentProvider {
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Unknown payment provider: ${name}`);
  }
  return provider;
}

/**
 * Get the default payment provider for a region.
 */
export function getProviderForRegion(region: Region): PaymentProvider {
  const providerName = regionDefaults[region];
  return getProvider(providerName);
}

/**
 * Get the default payment provider (Stripe).
 */
export function getDefaultProvider(): PaymentProvider {
  return stripeProvider;
}

/**
 * List all available provider names.
 */
export function listProviders(): ProviderName[] {
  return Object.keys(providers) as ProviderName[];
}
