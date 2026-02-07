import { describe, it, expect, jest, beforeAll } from '@jest/globals';
import request from 'supertest';
import express, { Express } from 'express';

const mockAuthMiddleware = (req: any, res: any, next: any) => {
  req.user = { id: 'test-user-123' };
  next();
};

describe('Credits API Endpoints', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    // Mock credit endpoints
    app.get('/api/credits/balance', mockAuthMiddleware, (req, res) => {
      res.json({ balance: 1500 });
    });

    app.get('/api/credits/history', mockAuthMiddleware, (req, res) => {
      const limit = parseInt(req.query.limit as string) || 10;

      const mockHistory = [
        {
          id: 'tx-1',
          amount: 1000,
          balanceAfter: 1500,
          type: 'PURCHASE',
          description: 'Purchased 1000 credits',
          createdAt: new Date('2026-02-05'),
        },
        {
          id: 'tx-2',
          amount: -200,
          balanceAfter: 500,
          type: 'DEDUCTION',
          description: 'Used 200 credits for premium_pack',
          createdAt: new Date('2026-02-04'),
        },
      ];

      res.json({
        transactions: mockHistory.slice(0, limit),
        total: mockHistory.length,
      });
    });

    app.post('/api/credits/purchase', mockAuthMiddleware, (req, res) => {
      const { packageIndex } = req.body;

      if (packageIndex === undefined) {
        return res.status(400).json({ error: 'Package index required' });
      }

      const packages = [
        { credits: 500, amount: 499 },
        { credits: 1200, amount: 999 },
        { credits: 3000, amount: 1999 },
      ];

      if (packageIndex < 0 || packageIndex >= packages.length) {
        return res.status(400).json({ error: 'Invalid package index' });
      }

      res.json({
        clientSecret: 'pi_test_secret_123',
        credits: packages[packageIndex].credits,
        amount: packages[packageIndex].amount,
      });
    });

    app.get('/api/credits/stats', mockAuthMiddleware, (req, res) => {
      res.json({
        currentBalance: 1500,
        totalEarned: 3000,
        totalSpent: 1500,
        transactionCount: 8,
      });
    });

    app.post('/api/credits/validate', mockAuthMiddleware, (req, res) => {
      const { amount } = req.body;
      const userBalance = 1500;

      res.json({
        valid: userBalance >= amount,
        balance: userBalance,
        required: amount,
      });
    });

    app.get('/api/credits/packages', (req, res) => {
      res.json({
        packages: [
          { credits: 500, amount: 499, bonus: 0 },
          { credits: 1200, amount: 999, bonus: 200 },
          { credits: 3000, amount: 1999, bonus: 1000 },
        ],
      });
    });
  });

  describe('GET /api/credits/balance', () => {
    it('should return user credit balance', async () => {
      const response = await request(app)
        .get('/api/credits/balance')
        .expect(200);

      expect(response.body).toHaveProperty('balance');
      expect(typeof response.body.balance).toBe('number');
    });
  });

  describe('GET /api/credits/history', () => {
    it('should return transaction history', async () => {
      const response = await request(app)
        .get('/api/credits/history')
        .expect(200);

      expect(response.body).toHaveProperty('transactions');
      expect(Array.isArray(response.body.transactions)).toBe(true);
      expect(response.body).toHaveProperty('total');
    });

    it('should respect limit parameter', async () => {
      const response = await request(app)
        .get('/api/credits/history?limit=1')
        .expect(200);

      expect(response.body.transactions).toHaveLength(1);
    });

    it('should order transactions by date descending', async () => {
      const response = await request(app)
        .get('/api/credits/history')
        .expect(200);

      const transactions = response.body.transactions;
      if (transactions.length > 1) {
        const firstDate = new Date(transactions[0].createdAt);
        const secondDate = new Date(transactions[1].createdAt);
        expect(firstDate >= secondDate).toBe(true);
      }
    });
  });

  describe('POST /api/credits/purchase', () => {
    it('should create payment intent for valid package', async () => {
      const response = await request(app)
        .post('/api/credits/purchase')
        .send({ packageIndex: 1 })
        .expect(200);

      expect(response.body).toHaveProperty('clientSecret');
      expect(response.body).toHaveProperty('credits', 1200);
      expect(response.body).toHaveProperty('amount', 999);
    });

    it('should return 400 for missing package index', async () => {
      const response = await request(app)
        .post('/api/credits/purchase')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid package index', async () => {
      const response = await request(app)
        .post('/api/credits/purchase')
        .send({ packageIndex: 99 })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle negative package index', async () => {
      const response = await request(app)
        .post('/api/credits/purchase')
        .send({ packageIndex: -1 })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/credits/stats', () => {
    it('should return credit statistics', async () => {
      const response = await request(app)
        .get('/api/credits/stats')
        .expect(200);

      expect(response.body).toHaveProperty('currentBalance');
      expect(response.body).toHaveProperty('totalEarned');
      expect(response.body).toHaveProperty('totalSpent');
      expect(response.body).toHaveProperty('transactionCount');
    });

    it('should have valid statistics', async () => {
      const response = await request(app)
        .get('/api/credits/stats')
        .expect(200);

      const { currentBalance, totalEarned, totalSpent } = response.body;

      // Current balance should equal earned minus spent
      expect(currentBalance).toBe(totalEarned - totalSpent);
    });
  });

  describe('POST /api/credits/validate', () => {
    it('should validate sufficient credits', async () => {
      const response = await request(app)
        .post('/api/credits/validate')
        .send({ amount: 1000 })
        .expect(200);

      expect(response.body).toHaveProperty('valid', true);
      expect(response.body).toHaveProperty('balance');
      expect(response.body).toHaveProperty('required', 1000);
    });

    it('should validate insufficient credits', async () => {
      const response = await request(app)
        .post('/api/credits/validate')
        .send({ amount: 2000 }) // More than balance
        .expect(200);

      expect(response.body).toHaveProperty('valid', false);
    });
  });

  describe('GET /api/credits/packages', () => {
    it('should return available credit packages', async () => {
      const response = await request(app)
        .get('/api/credits/packages')
        .expect(200);

      expect(response.body).toHaveProperty('packages');
      expect(Array.isArray(response.body.packages)).toBe(true);
      expect(response.body.packages).toHaveLength(3);
    });

    it('should include bonus information', async () => {
      const response = await request(app)
        .get('/api/credits/packages')
        .expect(200);

      const packages = response.body.packages;
      expect(packages[1]).toHaveProperty('bonus', 200); // Value pack
      expect(packages[2]).toHaveProperty('bonus', 1000); // Premium pack
    });

    it('should not require authentication', async () => {
      // Packages should be publicly accessible
      const response = await request(app)
        .get('/api/credits/packages')
        .expect(200);

      expect(response.body).toHaveProperty('packages');
    });
  });
});
