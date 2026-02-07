import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { CreditService } from '../../src/services/creditService.js';
import { CreditTransactionType } from '../../src/generated/prisma/index.js';

// Mock Prisma
const mockPrisma = {
  $transaction: jest.fn() as any,
  user: {
    findUnique: jest.fn() as any,
    update: jest.fn() as any,
  },
  creditTransaction: {
    create: jest.fn() as any,
    findMany: jest.fn() as any,
    count: jest.fn() as any,
  },
} as any;

// Mock Stripe service
jest.mock('../../src/services/stripeService.js', () => ({
  stripeService: {
    createCreditPaymentIntent: jest.fn(),
  },
}));

// Mock Prisma client
jest.mock('../../src/config/prisma.js', () => ({
  prisma: mockPrisma,
}));

describe('CreditService', () => {
  let creditService: CreditService;

  beforeEach(() => {
    jest.clearAllMocks();
    creditService = new CreditService();
  });

  describe('deductCredits', () => {
    it('should successfully deduct credits when user has sufficient balance', async () => {
      const userId = 'user-123';
      const amount = 100;
      const featureType = 'premium_pack';

      // Mock transaction callback
      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            findUnique: (jest.fn() as any).mockResolvedValue({ credits: 500 }),
            update: (jest.fn() as any).mockResolvedValue({ credits: 400 }),
          },
          creditTransaction: {
            create: (jest.fn() as any).mockResolvedValue({}),
          },
        };
        return callback(mockTx);
      });

      const result = await creditService.deductCredits(userId, amount, featureType);

      expect(result).toBe(true);
      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });

    it('should return false when user has insufficient credits', async () => {
      const userId = 'user-123';
      const amount = 100;
      const featureType = 'premium_pack';

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            findUnique: (jest.fn() as any).mockResolvedValue({ credits: 50 }), // Insufficient
          },
        };
        return callback(mockTx);
      });

      const result = await creditService.deductCredits(userId, amount, featureType);

      expect(result).toBe(false);
    });

    it('should throw error when user not found', async () => {
      const userId = 'non-existent';
      const amount = 100;
      const featureType = 'premium_pack';

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            findUnique: (jest.fn() as any).mockResolvedValue(null), // User not found
          },
        };
        return callback(mockTx);
      });

      await expect(
        creditService.deductCredits(userId, amount, featureType)
      ).rejects.toThrow('User not found');
    });

    it('should record transaction with correct details', async () => {
      const userId = 'user-123';
      const amount = 200;
      const featureType = 'jlpt_exam';
      const relatedEntityId = 'exam-456';

      const mockCreate = jest.fn();

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            findUnique: (jest.fn() as any).mockResolvedValue({ credits: 500 }),
            update: (jest.fn() as any).mockResolvedValue({ credits: 300 }),
          },
          creditTransaction: {
            create: mockCreate,
          },
        };
        return callback(mockTx);
      });

      await creditService.deductCredits(userId, amount, featureType, relatedEntityId);

      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId,
          amount: -amount, // Should be negative
          balanceAfter: 300,
          type: CreditTransactionType.DEDUCTION,
          featureType,
          relatedEntityId,
        }),
      });
    });
  });

  describe('addCredits', () => {
    it('should successfully add credits to user balance', async () => {
      const userId = 'user-123';
      const amount = 1000;
      const type = CreditTransactionType.PURCHASE;
      const description = 'Purchased 1000 credits';

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            findUnique: (jest.fn() as any).mockResolvedValue({ credits: 500 }),
            update: (jest.fn() as any).mockResolvedValue({ credits: 1500 }),
          },
          creditTransaction: {
            create: (jest.fn() as any).mockResolvedValue({}),
          },
        };
        return callback(mockTx);
      });

      const newBalance = await creditService.addCredits(userId, amount, type, description);

      expect(newBalance).toBe(1500);
      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });

    it('should handle monthly allocation correctly', async () => {
      const userId = 'user-123';
      const amount = 1000;
      const type = CreditTransactionType.MONTHLY_ALLOCATION;
      const description = 'Monthly Pro credits';

      const mockCreate = jest.fn();

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            findUnique: (jest.fn() as any).mockResolvedValue({ credits: 0 }),
            update: (jest.fn() as any).mockResolvedValue({ credits: 1000 }),
          },
          creditTransaction: {
            create: mockCreate,
          },
        };
        return callback(mockTx);
      });

      await creditService.addCredits(userId, amount, type, description);

      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          amount: 1000, // Should be positive
          type: CreditTransactionType.MONTHLY_ALLOCATION,
        }),
      });
    });

    it('should throw error for non-existent user', async () => {
      const userId = 'non-existent';
      const amount = 100;
      const type = CreditTransactionType.BONUS;
      const description = 'Bonus credits';

      (mockPrisma.$transaction as any).mockImplementation(async (callback: any) => {
        const mockTx = {
          user: {
            findUnique: (jest.fn() as any).mockResolvedValue(null),
          },
        };
        return callback(mockTx);
      });

      await expect(
        creditService.addCredits(userId, amount, type, description)
      ).rejects.toThrow('User not found');
    });
  });

  describe('getBalance', () => {
    it('should return user credit balance', async () => {
      const userId = 'user-123';

      mockPrisma.user.findUnique.mockResolvedValue({
        credits: 750,
      });

      const balance = await creditService.getBalance(userId);

      expect(balance).toBe(750);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { credits: true },
      });
    });

    it('should throw error for non-existent user', async () => {
      const userId = 'non-existent';

      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(creditService.getBalance(userId)).rejects.toThrow('User not found');
    });
  });

  describe('getTransactionHistory', () => {
    it('should return transaction history with correct ordering', async () => {
      const userId = 'user-123';
      const mockTransactions = [
        {
          id: 'tx-1',
          amount: 1000,
          type: CreditTransactionType.PURCHASE,
          createdAt: new Date('2026-02-05'),
        },
        {
          id: 'tx-2',
          amount: -200,
          type: CreditTransactionType.DEDUCTION,
          createdAt: new Date('2026-02-04'),
        },
      ];

      mockPrisma.creditTransaction.findMany.mockResolvedValue(mockTransactions);

      const history = await creditService.getTransactionHistory(userId, 10);

      expect(history).toEqual(mockTransactions);
      expect(mockPrisma.creditTransaction.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    });

    it('should respect limit parameter', async () => {
      const userId = 'user-123';
      const limit = 5;

      mockPrisma.creditTransaction.findMany.mockResolvedValue([]);

      await creditService.getTransactionHistory(userId, limit);

      expect(mockPrisma.creditTransaction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: limit })
      );
    });
  });

  describe('getCreditStats', () => {
    it('should calculate credit statistics correctly', async () => {
      const userId = 'user-123';

      mockPrisma.user.findUnique.mockResolvedValue({ credits: 1500 });

      mockPrisma.creditTransaction.findMany.mockResolvedValue([
        { amount: 1000, type: CreditTransactionType.PURCHASE },
        { amount: 1000, type: CreditTransactionType.MONTHLY_ALLOCATION },
        { amount: -200, type: CreditTransactionType.DEDUCTION },
        { amount: -300, type: CreditTransactionType.DEDUCTION },
      ]);

      const stats = await creditService.getCreditStats(userId);

      expect(stats).toEqual({
        currentBalance: 1500,
        totalEarned: 2000, // 1000 + 1000
        totalSpent: 500, // 200 + 300
        transactionCount: 4,
      });
    });
  });
});
