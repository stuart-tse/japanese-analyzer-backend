import { stripeService } from './stripeService.js';
import { PRICING } from '../config/stripe.js';
/**
 * Currency conversion rates (USD to CNY)
 * In production, fetch real-time rates from an API
 */
const USD_TO_CNY_RATE = 7.2; // Approximate rate
export const SUPPORTED_PAYMENT_METHODS = [
    {
        type: 'card',
        label: 'Credit/Debit Card',
        currency: 'usd',
        icon: '💳',
        description: 'Visa, Mastercard, Amex',
    },
    {
        type: 'alipay',
        label: 'Alipay (支付宝)',
        currency: 'cny',
        icon: '🇨🇳',
        description: 'Scan QR code to pay',
    },
    {
        type: 'wechat_pay',
        label: 'WeChat Pay (微信支付)',
        currency: 'cny',
        icon: '💬',
        description: 'Scan QR code to pay',
    },
];
export class AsianPaymentService {
    /**
     * Convert USD amount to CNY
     */
    convertToCNY(usdAmount) {
        return Math.round(usdAmount * USD_TO_CNY_RATE);
    }
    /**
     * Convert CNY amount to USD
     */
    convertToUSD(cnyAmount) {
        return Math.round(cnyAmount / USD_TO_CNY_RATE);
    }
    /**
     * Get amount in appropriate currency based on payment method
     */
    getAmountForMethod(usdAmount, paymentMethod) {
        if (paymentMethod === 'card') {
            return usdAmount; // USD cents
        }
        return this.convertToCNY(usdAmount); // CNY fen (1/100 yuan)
    }
    /**
     * Format amount for display
     */
    formatAmount(amount, currency) {
        if (currency === 'usd') {
            return `$${(amount / 100).toFixed(2)}`;
        }
        return `¥${(amount / 100).toFixed(2)}`;
    }
    /**
     * Create credit payment with specific payment method
     */
    async createCreditPaymentWithMethod(customerId, packageIndex, paymentMethod) {
        const creditPackage = PRICING.CREDITS[packageIndex];
        if (!creditPackage) {
            throw new Error('Invalid credit package index');
        }
        const totalCredits = creditPackage.credits + creditPackage.bonus;
        const usdAmount = creditPackage.amount;
        const amount = this.getAmountForMethod(usdAmount, paymentMethod);
        const currency = paymentMethod === 'card' ? 'usd' : 'cny';
        const paymentIntent = await stripeService.createPaymentIntentWithMethod(amount, customerId, paymentMethod, {
            type: 'credit_topup',
            credits: totalCredits.toString(),
            packageLabel: creditPackage.label,
            originalUSDAmount: usdAmount.toString(),
        });
        return {
            clientSecret: paymentIntent.client_secret,
            amount,
            currency,
            credits: totalCredits,
            paymentMethod,
            requiresAction: paymentIntent.status === 'requires_action',
            qrCodeUrl: this.getQRCodeUrl(paymentIntent, paymentMethod),
        };
    }
    /**
     * Get QR code URL for Alipay/WeChat Pay
     * These payment methods redirect to a page with QR code
     */
    getQRCodeUrl(paymentIntent, paymentMethod) {
        if (paymentMethod === 'alipay' || paymentMethod === 'wechat_pay') {
            // Stripe provides next_action with redirect URL for QR code
            return paymentIntent.next_action?.redirect_to_url?.url || null;
        }
        return null;
    }
    /**
     * Create subscription payment with specific method
     */
    async createSubscriptionPaymentWithMethod(amount, customerId, paymentMethod, tier, period) {
        const convertedAmount = this.getAmountForMethod(amount, paymentMethod);
        const currency = paymentMethod === 'card' ? 'usd' : 'cny';
        const paymentIntent = await stripeService.createPaymentIntentWithMethod(convertedAmount, customerId, paymentMethod, {
            type: 'subscription',
            tier,
            period,
            originalUSDAmount: amount.toString(),
        });
        return {
            clientSecret: paymentIntent.client_secret,
            amount: convertedAmount,
            currency,
            paymentMethod,
            requiresAction: paymentIntent.status === 'requires_action',
            qrCodeUrl: this.getQRCodeUrl(paymentIntent, paymentMethod),
        };
    }
    /**
     * Get supported payment methods for a region
     */
    getSupportedPaymentMethods(countryCode) {
        // In production, filter based on country
        // For now, return all methods
        return SUPPORTED_PAYMENT_METHODS;
    }
    /**
     * Validate payment method for amount
     */
    validatePaymentMethod(paymentMethod, amount, currency) {
        // Alipay minimum: ¥1 (100 fen)
        if (paymentMethod === 'alipay' && currency === 'cny' && amount < 100) {
            return { valid: false, error: 'Alipay minimum payment is ¥1' };
        }
        // WeChat Pay minimum: ¥1 (100 fen)
        if (paymentMethod === 'wechat_pay' && currency === 'cny' && amount < 100) {
            return { valid: false, error: 'WeChat Pay minimum payment is ¥1' };
        }
        // Card minimum: $0.50 (50 cents)
        if (paymentMethod === 'card' && currency === 'usd' && amount < 50) {
            return { valid: false, error: 'Card minimum payment is $0.50' };
        }
        return { valid: true };
    }
}
export const asianPaymentService = new AsianPaymentService();
//# sourceMappingURL=asianPaymentService.js.map