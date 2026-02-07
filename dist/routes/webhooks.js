import { Router } from 'express';
import { constructWebhookEvent } from '../config/stripe.js';
import { config } from '../config/index.js';
import { subscriptionService } from '../services/subscriptionService.js';
import { prisma } from '../config/prisma.js';
import { SubscriptionStatus, PaymentMethod, PaymentType } from '../generated/prisma/index.js';
const router = Router();
/**
 * CRITICAL: Stripe Webhook Handler
 * This endpoint receives real-time events from Stripe
 * Must be public (no auth) but signature-verified
 */
router.post('/stripe', async (req, res) => {
    const signature = req.headers['stripe-signature'];
    if (!signature || typeof signature !== 'string') {
        return res.status(400).json({ error: 'Missing signature' });
    }
    if (!config.stripe.webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET not configured');
        return res.status(500).json({ error: 'Webhook secret not configured' });
    }
    let event;
    try {
        // Verify webhook signature
        // Note: req.body must be raw buffer, not parsed JSON
        event = constructWebhookEvent(req.body, signature, config.stripe.webhookSecret);
    }
    catch (error) {
        console.error('Webhook signature verification failed:', error);
        return res.status(400).json({ error: 'Invalid signature' });
    }
    // Idempotency: Check if event already processed
    const existingEvent = await prisma.$queryRaw `
    SELECT 1 FROM "_processed_stripe_events"
    WHERE event_id = ${event.id}
    LIMIT 1
  `.catch(() => []);
    if (existingEvent.length > 0) {
        console.log(`Event ${event.id} already processed, skipping`);
        return res.json({ received: true, skipped: true });
    }
    console.log(`Processing Stripe event: ${event.type} (${event.id})`);
    try {
        switch (event.type) {
            // Subscription events
            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                await handleSubscriptionUpdated(subscription);
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                await handleSubscriptionDeleted(subscription);
                break;
            }
            // Invoice events
            case 'invoice.payment_succeeded': {
                const invoice = event.data.object;
                await handleInvoicePaymentSucceeded(invoice);
                break;
            }
            case 'invoice.payment_failed': {
                const invoice = event.data.object;
                await handleInvoicePaymentFailed(invoice);
                break;
            }
            // Payment intent events (for credit purchases)
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                await handlePaymentIntentSucceeded(paymentIntent);
                break;
            }
            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                await handlePaymentIntentFailed(paymentIntent);
                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        // Mark event as processed (create table if not exists)
        await prisma.$executeRaw `
      CREATE TABLE IF NOT EXISTS "_processed_stripe_events" (
        event_id TEXT PRIMARY KEY,
        processed_at TIMESTAMP DEFAULT NOW()
      )
    `;
        await prisma.$executeRaw `
      INSERT INTO "_processed_stripe_events" (event_id, processed_at)
      VALUES (${event.id}, NOW())
      ON CONFLICT (event_id) DO NOTHING
    `;
        res.json({ received: true });
    }
    catch (error) {
        console.error(`Error processing webhook event ${event.id}:`, error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});
// ============================================
// Event Handlers
// ============================================
async function handleSubscriptionUpdated(subscription) {
    const dbSubscription = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: subscription.id },
    });
    if (!dbSubscription) {
        console.warn(`Subscription ${subscription.id} not found in database`);
        return;
    }
    // Update subscription details
    // Type assertion: Stripe API v2026 has these properties but TS definitions may be incomplete
    const sub = subscription;
    await prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: {
            status: mapStripeStatus(subscription.status),
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
    });
    // Update user subscription expiry
    await prisma.user.update({
        where: { id: dbSubscription.userId },
        data: {
            subscriptionExpiry: new Date(sub.current_period_end * 1000),
        },
    });
    console.log(`Updated subscription ${subscription.id}`);
}
async function handleSubscriptionDeleted(subscription) {
    try {
        await subscriptionService.handleSubscriptionCancellation(subscription.id);
        console.log(`Deleted subscription ${subscription.id}`);
    }
    catch (error) {
        console.error('Error handling subscription deletion:', error);
    }
}
async function handleInvoicePaymentSucceeded(invoice) {
    // Type assertion: Stripe API v2026 has subscription property but TS definitions may be incomplete
    const inv = invoice;
    if (!inv.subscription) {
        console.log('Invoice not associated with subscription, skipping');
        return;
    }
    const subscription = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: inv.subscription },
    });
    if (!subscription) {
        console.warn(`Subscription ${inv.subscription} not found`);
        return;
    }
    // Record payment
    await subscriptionService.recordPayment(subscription.userId, invoice.amount_paid / 100, // Convert cents to dollars
    PaymentMethod.CARD, PaymentType.SUBSCRIPTION, undefined, invoice.id, subscription.id);
    // Allocate monthly credits on renewal
    if (invoice.billing_reason === 'subscription_cycle') {
        await subscriptionService.handleSubscriptionRenewal(subscription.stripeSubscriptionId);
        console.log(`Allocated monthly credits for subscription ${subscription.id}`);
    }
    console.log(`Payment succeeded for invoice ${invoice.id}`);
}
async function handleInvoicePaymentFailed(invoice) {
    // Type assertion: Stripe API v2026 has subscription property but TS definitions may be incomplete
    const inv = invoice;
    if (!inv.subscription) {
        return;
    }
    try {
        await subscriptionService.handlePaymentFailure(inv.subscription);
        console.log(`Payment failed for subscription ${inv.subscription}`);
    }
    catch (error) {
        console.error('Error handling payment failure:', error);
    }
}
async function handlePaymentIntentSucceeded(paymentIntent) {
    // Only handle credit top-ups here (subscriptions handled via invoices)
    if (paymentIntent.metadata.type !== 'credit_topup') {
        return;
    }
    const user = await prisma.user.findUnique({
        where: { stripeCustomerId: paymentIntent.customer },
    });
    if (!user) {
        console.warn(`User not found for customer ${paymentIntent.customer}`);
        return;
    }
    const credits = parseInt(paymentIntent.metadata.credits || '0', 10);
    if (credits > 0) {
        // Add credits to user balance
        const newBalance = user.credits + credits;
        await prisma.user.update({
            where: { id: user.id },
            data: { credits: newBalance },
        });
        // Record payment
        await subscriptionService.recordPayment(user.id, paymentIntent.amount / 100, PaymentMethod.CARD, PaymentType.CREDIT_TOPUP, paymentIntent.id, undefined, undefined, credits);
        // Record credit transaction
        await prisma.creditTransaction.create({
            data: {
                userId: user.id,
                amount: credits,
                balanceAfter: newBalance,
                type: 'PURCHASE',
                description: `Credit top-up: ${paymentIntent.metadata.packageLabel || 'Unknown package'}`,
                paymentId: paymentIntent.id,
            },
        });
        console.log(`Added ${credits} credits to user ${user.id}`);
    }
}
async function handlePaymentIntentFailed(paymentIntent) {
    console.log(`Payment intent ${paymentIntent.id} failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`);
    // TODO: Send notification to user
}
// Helper: Map Stripe subscription status to our enum
function mapStripeStatus(stripeStatus) {
    const statusMap = {
        active: SubscriptionStatus.ACTIVE,
        past_due: SubscriptionStatus.PAST_DUE,
        canceled: SubscriptionStatus.CANCELED,
        incomplete: SubscriptionStatus.INCOMPLETE,
        incomplete_expired: SubscriptionStatus.CANCELED,
        trialing: SubscriptionStatus.TRIALING,
        unpaid: SubscriptionStatus.PAST_DUE,
        paused: SubscriptionStatus.CANCELED,
    };
    return statusMap[stripeStatus] || SubscriptionStatus.CANCELED;
}
export default router;
//# sourceMappingURL=webhooks.js.map