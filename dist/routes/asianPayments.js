import { Router } from 'express';
import { asianPaymentService } from '../services/asianPaymentService.js';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';
const router = Router();
/**
 * GET /api/payments/methods
 * Get supported payment methods
 */
router.get('/methods', (req, res) => {
    try {
        const countryCode = req.query.country;
        const methods = asianPaymentService.getSupportedPaymentMethods(countryCode);
        res.json({
            methods,
            defaultCurrency: 'usd',
            exchangeRate: {
                usd_to_cny: 7.2,
                cny_to_usd: 0.14,
            },
        });
    }
    catch (error) {
        console.error('Error fetching payment methods:', error);
        res.status(500).json({ error: 'Failed to fetch payment methods' });
    }
});
/**
 * POST /api/payments/credits/purchase
 * Purchase credits with specific payment method
 */
router.post('/credits/purchase', requireAuth, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { packageIndex, paymentMethod } = req.body;
        if (packageIndex === undefined || !paymentMethod) {
            return res.status(400).json({ error: 'Package index and payment method required' });
        }
        if (!['card', 'alipay', 'wechat_pay'].includes(paymentMethod)) {
            return res.status(400).json({ error: 'Invalid payment method' });
        }
        // Get or create Stripe customer
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { stripeCustomerId: true, email: true, username: true },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const { stripeService } = await import('../services/stripeService.js');
            const customer = await stripeService.createCustomer(user.email, user.username || undefined);
            customerId = customer.id;
            await prisma.user.update({
                where: { id: userId },
                data: { stripeCustomerId: customerId },
            });
        }
        // Create payment with specified method
        const payment = await asianPaymentService.createCreditPaymentWithMethod(customerId, packageIndex, paymentMethod);
        res.json(payment);
    }
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({
            error: 'Failed to create payment',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
/**
 * POST /api/payments/convert
 * Convert amount between currencies
 */
router.post('/convert', (req, res) => {
    try {
        const { amount, from, to } = req.body;
        if (!amount || !from || !to) {
            return res.status(400).json({ error: 'Amount, from, and to currencies required' });
        }
        let converted;
        if (from === 'usd' && to === 'cny') {
            converted = asianPaymentService.convertToCNY(amount);
        }
        else if (from === 'cny' && to === 'usd') {
            converted = asianPaymentService.convertToUSD(amount);
        }
        else {
            converted = amount; // Same currency
        }
        res.json({
            originalAmount: amount,
            originalCurrency: from,
            convertedAmount: converted,
            convertedCurrency: to,
            exchangeRate: from === 'usd' ? 7.2 : 0.14,
            formatted: asianPaymentService.formatAmount(converted, to),
        });
    }
    catch (error) {
        console.error('Error converting currency:', error);
        res.status(500).json({ error: 'Failed to convert currency' });
    }
});
/**
 * POST /api/payments/validate
 * Validate payment method and amount
 */
router.post('/validate', (req, res) => {
    try {
        const { paymentMethod, amount, currency } = req.body;
        if (!paymentMethod || !amount || !currency) {
            return res.status(400).json({ error: 'Payment method, amount, and currency required' });
        }
        const validation = asianPaymentService.validatePaymentMethod(paymentMethod, amount, currency);
        res.json(validation);
    }
    catch (error) {
        console.error('Error validating payment:', error);
        res.status(500).json({ error: 'Failed to validate payment' });
    }
});
/**
 * GET /api/payments/pricing
 * Get pricing in multiple currencies
 */
router.get('/pricing', (req, res) => {
    try {
        const { PRICING } = require('../config/stripe.js');
        const creditsWithCNY = PRICING.CREDITS.map((pkg) => ({
            ...pkg,
            usd: {
                amount: pkg.amount,
                formatted: asianPaymentService.formatAmount(pkg.amount, 'usd'),
            },
            cny: {
                amount: asianPaymentService.convertToCNY(pkg.amount),
                formatted: asianPaymentService.formatAmount(asianPaymentService.convertToCNY(pkg.amount), 'cny'),
            },
        }));
        res.json({
            credits: creditsWithCNY,
            exchangeRate: 7.2,
        });
    }
    catch (error) {
        console.error('Error fetching pricing:', error);
        res.status(500).json({ error: 'Failed to fetch pricing' });
    }
});
export default router;
//# sourceMappingURL=asianPayments.js.map