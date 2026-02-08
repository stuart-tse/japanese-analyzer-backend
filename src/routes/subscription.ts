import { Router, Request, Response } from 'express';
import { subscriptionService } from '../services/subscriptionService.js';
import { stripeService } from '../services/stripeService.js';
import { requireAuth } from '../middleware/auth.js';
import { config } from '../config/index.js';

const router = Router();

/**
 * GET /api/subscription/pricing
 * Get pricing information (PUBLIC - no auth required)
 */
router.get('/pricing', async (_req: Request, res: Response) => {
  try {
    const { PRICING } = await import('../config/stripe.js');

    res.json({
      success: true,
      pricing: {
        pro: {
          monthly: {
            amount: PRICING.PRO.MONTHLY.amount,
            credits: PRICING.PRO.MONTHLY.credits,
            interval: 'month',
          },
          yearly: {
            amount: PRICING.PRO.YEARLY.amount,
            credits: PRICING.PRO.YEARLY.credits,
            interval: 'year',
            savings: PRICING.PRO.MONTHLY.amount * 12 - PRICING.PRO.YEARLY.amount,
          },
        },
        premium: {
          monthly: {
            amount: PRICING.PREMIUM.MONTHLY.amount,
            credits: PRICING.PREMIUM.MONTHLY.credits,
            interval: 'month',
          },
          yearly: {
            amount: PRICING.PREMIUM.YEARLY.amount,
            credits: PRICING.PREMIUM.YEARLY.credits,
            interval: 'year',
            savings: PRICING.PREMIUM.MONTHLY.amount * 12 - PRICING.PREMIUM.YEARLY.amount,
          },
        },
        credits: PRICING.CREDITS,
      },
      stripePublishableKey: config.stripe.publishableKey,
    });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({
      error: 'Failed to fetch pricing',
    });
  }
});

// All other subscription routes require authentication
router.use(requireAuth);

/**
 * POST /api/subscription/create
 * Create a new subscription
 */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { tier, period, paymentMethodId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate input
    if (!tier || !period || !paymentMethodId) {
      return res.status(400).json({
        error: 'Missing required fields: tier, period, paymentMethodId',
      });
    }

    if (!['PRO', 'PREMIUM'].includes(tier)) {
      return res.status(400).json({ error: 'Invalid tier. Must be PRO or PREMIUM' });
    }

    if (!['monthly', 'yearly'].includes(period)) {
      return res.status(400).json({ error: 'Invalid period. Must be monthly or yearly' });
    }

    // Create subscription
    const result = await subscriptionService.createSubscription(
      userId,
      tier,
      period,
      paymentMethodId
    );

    res.json({
      success: true,
      subscription: result.subscription,
      clientSecret: result.clientSecret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create subscription',
    });
  }
});

/**
 * GET /api/subscription/current
 * Get current subscription details
 */
router.get('/current', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const subscription = await subscriptionService.getCurrentSubscription(userId);

    if (!subscription) {
      return res.json({
        success: true,
        subscription: null,
        tier: 'FREE',
      });
    }

    res.json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      error: 'Failed to fetch subscription',
    });
  }
});

/**
 * POST /api/subscription/cancel
 * Cancel current subscription
 */
router.post('/cancel', async (req: Request, res: Response) => {
  try {
    const { immediately } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const subscription = await subscriptionService.cancelSubscription(
      userId,
      immediately === true
    );

    res.json({
      success: true,
      subscription,
      message: immediately
        ? 'Subscription cancelled immediately'
        : 'Subscription will be cancelled at the end of the billing period',
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to cancel subscription',
    });
  }
});

/**
 * POST /api/subscription/reactivate
 * Reactivate a subscription that was set to cancel
 */
router.post('/reactivate', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const subscription = await subscriptionService.reactivateSubscription(userId);

    res.json({
      success: true,
      subscription,
      message: 'Subscription reactivated successfully',
    });
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to reactivate subscription',
    });
  }
});

/**
 * POST /api/subscription/update
 * Update subscription (change tier or billing period)
 */
router.post('/update', async (req: Request, res: Response) => {
  try {
    const { tier, period } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!tier || !period) {
      return res.status(400).json({
        error: 'Missing required fields: tier, period',
      });
    }

    if (!['PRO', 'PREMIUM'].includes(tier)) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    if (!['monthly', 'yearly'].includes(period)) {
      return res.status(400).json({ error: 'Invalid period' });
    }

    const subscription = await subscriptionService.updateSubscription(
      userId,
      tier,
      period
    );

    res.json({
      success: true,
      subscription,
      message: 'Subscription updated successfully',
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to update subscription',
    });
  }
});

/**
 * GET /api/subscription/payments
 * Get payment history
 */
router.get('/payments', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payments = await subscriptionService.getPaymentHistory(userId, limit);

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      error: 'Failed to fetch payment history',
    });
  }
});

/**
 * POST /api/subscription/billing-portal
 * Create a Stripe billing portal session
 */
router.post('/billing-portal', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user's Stripe customer ID
    const { prisma } = await import('../config/prisma.js');
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.customerId) {
      return res.status(400).json({
        error: 'No Stripe customer found. Please create a subscription first.',
      });
    }

    const returnUrl = req.body.returnUrl || `${config.frontendUrl}/settings`;

    const session = await stripeService.createBillingPortalSession(
      user.customerId,
      returnUrl
    );

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    res.status(500).json({
      error: 'Failed to create billing portal session',
    });
  }
});

/**
 * GET /api/subscription/payment-methods
 * List user's saved payment methods
 */
router.get('/payment-methods', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { prisma } = await import('../config/prisma.js');
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.customerId) {
      return res.json({
        success: true,
        paymentMethods: [],
      });
    }

    const paymentMethods = await stripeService.listPaymentMethods(user.customerId);

    res.json({
      success: true,
      paymentMethods,
    });
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({
      error: 'Failed to fetch payment methods',
    });
  }
});

/**
 * DELETE /api/subscription/payment-methods/:id
 * Remove a payment method
 */
router.delete('/payment-methods/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const paymentMethodId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await stripeService.detachPaymentMethod(paymentMethodId);

    res.json({
      success: true,
      message: 'Payment method removed successfully',
    });
  } catch (error) {
    console.error('Error removing payment method:', error);
    res.status(500).json({
      error: 'Failed to remove payment method',
    });
  }
});

/**
 * GET /api/subscription/invoices
 * Get user's invoices
 */
router.get('/invoices', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { prisma } = await import('../config/prisma.js');
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.customerId) {
      return res.json({
        success: true,
        invoices: [],
      });
    }

    const invoices = await stripeService.listInvoices(user.customerId, limit);

    res.json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      error: 'Failed to fetch invoices',
    });
  }
});

export default router;
