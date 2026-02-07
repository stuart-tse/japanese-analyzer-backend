import { Router } from 'express';
import { creditService } from '../services/creditService.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
// All credit routes require authentication
router.use(requireAuth);
/**
 * GET /api/credits/balance
 * Get current credit balance
 */
router.get('/balance', async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const balance = await creditService.getBalance(userId);
        res.json({
            success: true,
            balance,
        });
    }
    catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({
            error: 'Failed to fetch balance',
        });
    }
});
/**
 * POST /api/credits/purchase
 * Purchase credit package
 */
router.post('/purchase', async (req, res) => {
    try {
        const { packageIndex, paymentMethodId } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (typeof packageIndex !== 'number' || !paymentMethodId) {
            return res.status(400).json({
                error: 'Missing required fields: packageIndex, paymentMethodId',
            });
        }
        if (packageIndex < 0 || packageIndex > 2) {
            return res.status(400).json({
                error: 'Invalid packageIndex. Must be 0, 1, or 2',
            });
        }
        const result = await creditService.purchaseCredits(userId, packageIndex, paymentMethodId);
        res.json({
            success: true,
            paymentIntentId: result.paymentIntentId,
            clientSecret: result.clientSecret,
        });
    }
    catch (error) {
        console.error('Error purchasing credits:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to purchase credits',
        });
    }
});
/**
 * GET /api/credits/history
 * Get credit transaction history
 */
router.get('/history', async (req, res) => {
    try {
        const userId = req.user?.id;
        const limit = parseInt(req.query.limit) || 50;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const transactions = await creditService.getTransactionHistory(userId, limit);
        res.json({
            success: true,
            transactions,
        });
    }
    catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({
            error: 'Failed to fetch transaction history',
        });
    }
});
/**
 * GET /api/credits/stats
 * Get credit statistics
 */
router.get('/stats', async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const stats = await creditService.getCreditStats(userId);
        res.json({
            success: true,
            stats,
        });
    }
    catch (error) {
        console.error('Error fetching credit stats:', error);
        res.status(500).json({
            error: 'Failed to fetch credit stats',
        });
    }
});
/**
 * POST /api/credits/validate
 * Validate if user can afford a feature
 */
router.post('/validate', async (req, res) => {
    try {
        const { featureType } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!featureType) {
            return res.status(400).json({
                error: 'Missing required field: featureType',
            });
        }
        const validation = await creditService.validateFeatureCost(userId, featureType);
        res.json({
            success: true,
            validation,
        });
    }
    catch (error) {
        console.error('Error validating feature cost:', error);
        res.status(500).json({
            error: 'Failed to validate feature cost',
        });
    }
});
/**
 * POST /api/credits/redeem
 * Use credits to access a feature (internal use)
 */
router.post('/redeem', async (req, res) => {
    try {
        const { amount, featureType, relatedEntityId } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (typeof amount !== 'number' || !featureType) {
            return res.status(400).json({
                error: 'Missing required fields: amount, featureType',
            });
        }
        // First validate the feature cost
        const validation = await creditService.validateFeatureCost(userId, featureType);
        if (!validation.allowed) {
            return res.status(403).json({
                error: validation.reason || 'Cannot access feature',
                validation,
            });
        }
        // Deduct credits
        const success = await creditService.deductCredits(userId, amount, featureType, relatedEntityId);
        if (!success) {
            return res.status(400).json({
                error: 'Insufficient credits',
            });
        }
        const newBalance = await creditService.getBalance(userId);
        res.json({
            success: true,
            balance: newBalance,
            message: `${amount} credits redeemed for ${featureType}`,
        });
    }
    catch (error) {
        console.error('Error redeeming credits:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to redeem credits',
        });
    }
});
/**
 * GET /api/credits/packages
 * Get available credit packages
 */
router.get('/packages', async (_req, res) => {
    try {
        const { PRICING } = await import('../config/stripe.js');
        const packages = PRICING.CREDITS.map((pkg, index) => ({
            index,
            label: pkg.label,
            credits: pkg.credits,
            bonus: pkg.bonus,
            totalCredits: pkg.credits + pkg.bonus,
            amount: pkg.amount,
            priceUsd: (pkg.amount / 100).toFixed(2),
            savings: pkg.bonus > 0 ? `${Math.round((pkg.bonus / pkg.credits) * 100)}%` : null,
        }));
        res.json({
            success: true,
            packages,
        });
    }
    catch (error) {
        console.error('Error fetching credit packages:', error);
        res.status(500).json({
            error: 'Failed to fetch credit packages',
        });
    }
});
export default router;
//# sourceMappingURL=credits.js.map