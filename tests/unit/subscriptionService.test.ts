import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SubscriptionService } from '../../src/services/subscriptionService.js';
import { SubscriptionTier, SubscriptionStatus } from '../../src/generated/prisma/index.js';

// Mock dependencies
const mockPrisma = {
  $transaction: jest.fn() as any,
  user: {
    findUnique: jest.fn() as any,
    update: jest.fn() as any,
  },
  subscription: {
    create: jest.fn() as any,
    findUnique: jest.fn() as any,
    findMany: jest.fn() as any,
    update: jest.fn() as any,
  },
} as any;

const mockStripeService = {
  createCustomer: jest.fn() as any,
  createSubscription: jest.fn() as any,
  cancelSubscription: jest.fn() as any,
  getSubscription: jest.fn() as any,
} as any;

const mockCreditService = {
  addCredits: jest.fn() as any,
} as any;

jest.mock('../../src/config/prisma.js', () => ({
  prisma: mockPrisma,
}));

jest.mock('../../src/services/stripeService.js', () => ({
  stripeService: mockStripeService,
}));

jest.mock('../../src/services/creditService.js', () => ({
  creditService: mockCreditService,
}));

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;

  beforeEach(() => {
    jest.clearAllMocks();
    subscriptionService = new SubscriptionService();
  });

  describe('createSubscription', () => {
    it('should create new subscription for user without Stripe customer', async () => {
      const userId = 'user-123';
      const tier = SubscriptionTier.PRO;
      const period = 'monthly';
      const paymentMethodId = 'pm_123';

      const mockUser = {
        id: userId,
        email: 'test@example.com',
        username: 'testuser',
        stripeCustomerId: null,
      };

      const mockStripeCustomer = {
        id: 'cus_123',
      };

      const mockStripeSubscription = {
        id: 'sub_123',
        current_period_start: 1707091200,
        current_period_end: 1709596800,
        status: 'active',
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockStripeService.createCustomer.mockResolvedValue(mockStripeCustomer);
      mockStripeService.createSubscription.mockResolvedValue(mockStripeSubscription);

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            update: (jest.fn() as any).mockResolvedValue({ ...mockUser, stripeCustomerId: 'cus_123' }),
          },
          subscription: {
            create: (jest.fn() as any).mockResolvedValue({
              id: 'subscription-123',
              tier: SubscriptionTier.PRO,
              status: SubscriptionStatus.ACTIVE,
            }),
          },
        };
        return callback(mockTx);
      });

      const result = await subscriptionService.createSubscription(
        userId,
        tier,
        period,
        paymentMethodId
      );

      expect(mockStripeService.createCustomer).toHaveBeenCalledWith(
        mockUser.email,
        mockUser.username
      );
      expect(mockStripeService.createSubscription).toHaveBeenCalledWith(
        'cus_123',
        tier,
        period,
        paymentMethodId
      );
      expect(mockCreditService.addCredits).toHaveBeenCalled(); // Monthly credit allocation
      expect(result).toHaveProperty('tier', SubscriptionTier.PRO);
    });

    it('should reuse existing Stripe customer', async () => {
      const userId = 'user-123';
      const tier = SubscriptionTier.PREMIUM;
      const period = 'yearly';
      const paymentMethodId = 'pm_456';

      const mockUser = {
        id: userId,
        email: 'test@example.com',
        username: 'testuser',
        stripeCustomerId: 'cus_existing',
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockStripeService.createSubscription.mockResolvedValue({
        id: 'sub_456',
        current_period_start: 1707091200,
        current_period_end: 1738627200,
        status: 'active',
      });

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            update: (jest.fn() as any).mockResolvedValue(mockUser),
          },
          subscription: {
            create: (jest.fn() as any).mockResolvedValue({
              id: 'subscription-456',
              tier: SubscriptionTier.PREMIUM,
            }),
          },
        };
        return callback(mockTx);
      });

      await subscriptionService.createSubscription(userId, tier, period, paymentMethodId);

      expect(mockStripeService.createCustomer).not.toHaveBeenCalled();
      expect(mockStripeService.createSubscription).toHaveBeenCalledWith(
        'cus_existing',
        tier,
        period,
        paymentMethodId
      );
    });

    it('should allocate correct monthly credits based on tier', async () => {
      const userId = 'user-123';
      const tier = SubscriptionTier.PREMIUM; // 5000 credits
      const period = 'monthly';
      const paymentMethodId = 'pm_123';

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        email: 'test@example.com',
        stripeCustomerId: 'cus_123',
      });

      mockStripeService.createSubscription.mockResolvedValue({
        id: 'sub_123',
        current_period_start: 1707091200,
        current_period_end: 1709596800,
        status: 'active',
      });

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            update: jest.fn(),
          },
          subscription: {
            create: (jest.fn() as any).mockResolvedValue({}),
          },
        };
        return callback(mockTx);
      });

      await subscriptionService.createSubscription(userId, tier, period, paymentMethodId);

      expect(mockCreditService.addCredits).toHaveBeenCalledWith(
        userId,
        5000, // Premium tier gets 5000 credits
        expect.anything(),
        expect.anything()
      );
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel subscription at period end', async () => {
      const userId = 'user-123';

      mockPrisma.subscription.findMany.mockResolvedValue([
        {
          id: 'sub-db-123',
          stripeSubscriptionId: 'sub_stripe_123',
          status: SubscriptionStatus.ACTIVE,
        },
      ]);

      mockStripeService.cancelSubscription.mockResolvedValue({
        cancel_at_period_end: true,
        current_period_end: 1709596800,
      });

      mockPrisma.subscription.update.mockResolvedValue({
        id: 'sub-db-123',
        cancelAtPeriodEnd: true,
      });

      const result = await subscriptionService.cancelSubscription(userId);

      expect(mockStripeService.cancelSubscription).toHaveBeenCalledWith('sub_stripe_123');
      expect(mockPrisma.subscription.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'sub-db-123' },
          data: expect.objectContaining({
            cancelAtPeriodEnd: true,
          }),
        })
      );
      expect(result.cancelAtPeriodEnd).toBe(true);
    });

    it('should throw error when no active subscription found', async () => {
      const userId = 'user-without-sub';

      mockPrisma.subscription.findMany.mockResolvedValue([]);

      await expect(subscriptionService.cancelSubscription(userId)).rejects.toThrow(
        'No active subscription found'
      );
    });
  });

  describe('handleSubscriptionRenewal', () => {
    it('should allocate monthly credits on renewal', async () => {
      const stripeSubscriptionId = 'sub_123';

      mockPrisma.subscription.findUnique.mockResolvedValue({
        id: 'sub-db-123',
        userId: 'user-123',
        tier: SubscriptionTier.PRO,
        monthlyCredits: 1000,
      });

      await subscriptionService.handleSubscriptionRenewal(stripeSubscriptionId);

      expect(mockCreditService.addCredits).toHaveBeenCalledWith(
        'user-123',
        1000,
        expect.anything(),
        expect.stringContaining('Monthly')
      );
    });

    it('should handle non-existent subscription', async () => {
      const stripeSubscriptionId = 'sub_nonexistent';

      mockPrisma.subscription.findUnique.mockResolvedValue(null);

      await expect(
        subscriptionService.handleSubscriptionRenewal(stripeSubscriptionId)
      ).rejects.toThrow('Subscription not found');
    });
  });

  describe('checkFeatureAccess', () => {
    it('should grant access when user has sufficient tier', async () => {
      const userId = 'user-123';
      const requiredTier = SubscriptionTier.PRO;

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        subscriptionTier: SubscriptionTier.PREMIUM, // Higher than required
        credits: 500,
      });

      const hasAccess = await subscriptionService.checkFeatureAccess(userId, requiredTier);

      expect(hasAccess).toBe(true);
    });

    it('should deny access when user has insufficient tier', async () => {
      const userId = 'user-123';
      const requiredTier = SubscriptionTier.PREMIUM;

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        subscriptionTier: SubscriptionTier.PRO, // Lower than required
        credits: 500,
      });

      const hasAccess = await subscriptionService.checkFeatureAccess(userId, requiredTier);

      expect(hasAccess).toBe(false);
    });

    it('should grant access to free tier features for all users', async () => {
      const userId = 'user-free';
      const requiredTier = SubscriptionTier.FREE;

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        subscriptionTier: SubscriptionTier.FREE,
        credits: 0,
      });

      const hasAccess = await subscriptionService.checkFeatureAccess(userId, requiredTier);

      expect(hasAccess).toBe(true);
    });
  });

  describe('getCurrentSubscription', () => {
    it('should return active subscription with details', async () => {
      const userId = 'user-123';

      const mockSubscription = {
        id: 'sub-123',
        tier: SubscriptionTier.PRO,
        status: SubscriptionStatus.ACTIVE,
        currentPeriodEnd: new Date('2026-03-01'),
        cancelAtPeriodEnd: false,
      };

      mockPrisma.subscription.findMany.mockResolvedValue([mockSubscription]);

      const subscription = await subscriptionService.getCurrentSubscription(userId);

      expect(subscription).toEqual(mockSubscription);
      expect(mockPrisma.subscription.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING] },
        },
        orderBy: { createdAt: 'desc' },
        take: 1,
      });
    });

    it('should return null when no active subscription', async () => {
      const userId = 'user-free';

      mockPrisma.subscription.findMany.mockResolvedValue([]);

      const subscription = await subscriptionService.getCurrentSubscription(userId);

      expect(subscription).toBeNull();
    });
  });
});
