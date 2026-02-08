import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';
import { stripeService } from '../services/stripeService.js';
import { logAudit, extractRequestMeta } from '../services/auditService.js';
import { TEXTS } from '../constants/texts.js';
import { stripe } from '../config/stripe.js';

const router = Router();

// All payment method routes require authentication
router.use(requireAuth);

/**
 * Helper: get or throw the user's Stripe customerId.
 */
async function getCustomerId(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { customerId: true },
  });

  if (!user?.customerId) {
    throw new Error(TEXTS.PAYMENT.NO_CUSTOMER);
  }

  return user.customerId;
}

/**
 * Helper: verify a payment method belongs to the given customer.
 * Prevents users from modifying payment methods they don't own.
 */
async function verifyPaymentMethodOwnership(
  paymentMethodId: string,
  customerId: string
): Promise<void> {
  const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
  if (pm.customer !== customerId) {
    throw new Error(TEXTS.PAYMENT.NOT_FOUND);
  }
}

/**
 * POST /api/payment-methods/setup-intent
 * Create a Stripe SetupIntent for adding a new payment method.
 */
router.post('/setup-intent', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const customerId = await getCustomerId(userId);

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      success: true,
      clientSecret: setupIntent.client_secret,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : TEXTS.PAYMENT.SETUP_INTENT_FAILED;
    const status = message === TEXTS.PAYMENT.NO_CUSTOMER ? 400 : 500;
    res.status(status).json({ success: false, message });
  }
});

/**
 * GET /api/payment-methods
 * List all saved payment methods for the current user.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { customerId: true },
    });

    if (!user?.customerId) {
      res.json({ success: true, paymentMethods: [], defaultPaymentMethodId: null });
      return;
    }

    const [paymentMethods, customer] = await Promise.all([
      stripeService.listPaymentMethods(user.customerId),
      stripeService.getCustomer(user.customerId),
    ]);

    const defaultPmId =
      typeof customer.invoice_settings?.default_payment_method === 'string'
        ? customer.invoice_settings.default_payment_method
        : (customer.invoice_settings?.default_payment_method as { id: string } | null)?.id ?? null;

    res.json({
      success: true,
      paymentMethods: paymentMethods.map((pm) => ({
        id: pm.id,
        brand: pm.card?.brand ?? null,
        last4: pm.card?.last4 ?? null,
        expMonth: pm.card?.exp_month ?? null,
        expYear: pm.card?.exp_year ?? null,
        isDefault: pm.id === defaultPmId,
      })),
      defaultPaymentMethodId: defaultPmId,
    });
  } catch {
    res.status(500).json({ success: false, message: TEXTS.PAYMENT.LIST_FAILED });
  }
});

/**
 * POST /api/payment-methods/:id/default
 * Set a payment method as the default for the customer.
 */
router.post('/:id/default', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const paymentMethodId = String(req.params.id);
    const customerId = await getCustomerId(userId);

    await verifyPaymentMethodOwnership(paymentMethodId, customerId);

    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    const meta = extractRequestMeta(req);
    logAudit({
      userId,
      action: 'payment_method.set_default',
      entity: 'payment_method',
      entityId: paymentMethodId,
      ...meta,
    });

    res.json({ success: true, message: TEXTS.PAYMENT.DEFAULT_SET });
  } catch (error) {
    const message = error instanceof Error ? error.message : TEXTS.PAYMENT.SET_DEFAULT_FAILED;
    const status = message === TEXTS.PAYMENT.NOT_FOUND ? 404 : 500;
    res.status(status).json({ success: false, message });
  }
});

/**
 * DELETE /api/payment-methods/:id
 * Detach (delete) a payment method.
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const paymentMethodId = String(req.params.id);
    const customerId = await getCustomerId(userId);

    await verifyPaymentMethodOwnership(paymentMethodId, customerId);

    await stripeService.detachPaymentMethod(paymentMethodId);

    const meta = extractRequestMeta(req);
    logAudit({
      userId,
      action: 'payment_method.delete',
      entity: 'payment_method',
      entityId: paymentMethodId,
      ...meta,
    });

    res.json({ success: true, message: TEXTS.PAYMENT.DELETE_CONFIRM });
  } catch (error) {
    const message = error instanceof Error ? error.message : TEXTS.PAYMENT.DELETE_FAILED;
    const status = message === TEXTS.PAYMENT.NOT_FOUND ? 404 : 500;
    res.status(status).json({ success: false, message });
  }
});

export default router;
