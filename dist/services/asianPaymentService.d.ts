export type PaymentMethod = 'card' | 'alipay' | 'wechat_pay';
export interface PaymentMethodInfo {
    type: PaymentMethod;
    label: string;
    currency: 'usd' | 'cny';
    icon: string;
    description: string;
}
export declare const SUPPORTED_PAYMENT_METHODS: PaymentMethodInfo[];
export declare class AsianPaymentService {
    /**
     * Convert USD amount to CNY
     */
    convertToCNY(usdAmount: number): number;
    /**
     * Convert CNY amount to USD
     */
    convertToUSD(cnyAmount: number): number;
    /**
     * Get amount in appropriate currency based on payment method
     */
    getAmountForMethod(usdAmount: number, paymentMethod: PaymentMethod): number;
    /**
     * Format amount for display
     */
    formatAmount(amount: number, currency: 'usd' | 'cny'): string;
    /**
     * Create credit payment with specific payment method
     */
    createCreditPaymentWithMethod(customerId: string, packageIndex: number, paymentMethod: PaymentMethod): Promise<{
        clientSecret: string | null;
        amount: number;
        currency: string;
        credits: number;
        paymentMethod: PaymentMethod;
        requiresAction: boolean;
        qrCodeUrl: string | null;
    }>;
    /**
     * Get QR code URL for Alipay/WeChat Pay
     * These payment methods redirect to a page with QR code
     */
    private getQRCodeUrl;
    /**
     * Create subscription payment with specific method
     */
    createSubscriptionPaymentWithMethod(amount: number, customerId: string, paymentMethod: PaymentMethod, tier: string, period: string): Promise<{
        clientSecret: string | null;
        amount: number;
        currency: string;
        paymentMethod: PaymentMethod;
        requiresAction: boolean;
        qrCodeUrl: string | null;
    }>;
    /**
     * Get supported payment methods for a region
     */
    getSupportedPaymentMethods(countryCode?: string): PaymentMethodInfo[];
    /**
     * Validate payment method for amount
     */
    validatePaymentMethod(paymentMethod: PaymentMethod, amount: number, currency: 'usd' | 'cny'): {
        valid: boolean;
        error?: string;
    };
}
export declare const asianPaymentService: AsianPaymentService;
