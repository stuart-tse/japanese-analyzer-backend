import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const router = Router();

/**
 * GET /api/mobile/packs
 * Get packs with reduced payload for mobile
 */
router.get('/packs', requireAuth, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const category = req.query.category as string;

    const where: any = {};
    if (category) {
      where.category = category;
    }

    const packs = await prisma.wordPack.findMany({
      where,
      select: {
        id: true,
        packId: true,
        nameZhCN: true,
        nameEn: true,
        descriptionZhCN: true,
        category: true,
        jlptLevel: true,
        order: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { order: 'asc' },
    });

    const total = await prisma.wordPack.count({ where });

    res.json({
      packs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch packs' });
  }
});

/**
 * GET /api/mobile/packs/:packId/words
 * Get pack words with pagination for mobile
 */
router.get('/packs/:packId/words', requireAuth, async (req: Request, res: Response) => {
  try {
    const { packId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    const pack = await prisma.wordPack.findUnique({
      where: { packId: Array.isArray(packId) ? packId[0] : packId },
      select: { id: true, words: true },
    });

    if (!pack) {
      return res.status(404).json({ error: 'Pack not found' });
    }

    // Words stored as JSON string array in the pack
    const allWords = (pack.words as string[]) || [];
    const start = (page - 1) * limit;
    const paginatedWords = allWords.slice(start, start + limit);

    res.json({
      words: paginatedWords,
      pagination: {
        page,
        limit,
        total: allWords.length,
        pages: Math.ceil(allWords.length / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

/**
 * POST /api/mobile/sync
 * Sync offline changes to server
 */
router.post('/sync', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { operations } = req.body;

    if (!Array.isArray(operations)) {
      return res.status(400).json({ error: 'Operations must be an array' });
    }

    const results = [];

    for (const op of operations) {
      try {
        const result = await processSyncOperation(userId, op);
        results.push({
          id: op.id,
          status: 'success',
          data: result,
        });
      } catch (error) {
        results.push({
          id: op.id,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    res.json({
      synced: results.filter((r) => r.status === 'success').length,
      failed: results.filter((r) => r.status === 'error').length,
      results,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync' });
  }
});

/**
 * Process individual sync operation
 */
async function processSyncOperation(userId: string, operation: any) {
  const { type, data, timestamp } = operation;

  switch (type) {
    case 'vocabulary_review':
      return await prisma.vocabulary.update({
        where: {
          userId_word: {
            userId,
            word: data.word,
          },
        },
        data: {
          reviewCount: data.reviewCount,
          srsEaseFactor: data.easeFactor,
          srsInterval: data.interval,
          srsDueDate: data.srsDueDate,
          wrongCount: data.wrongCount,
          lastReviewedAt: new Date(timestamp),
        },
      });

    case 'learning_stats':
      return await prisma.learningStats.upsert({
        where: { userId },
        create: {
          userId,
          totalAnalyses: data.totalAnalyses || 0,
          totalWordsLearned: data.totalWordsLearned || 0,
          streakDays: data.streakDays || 0,
        },
        update: {
          totalAnalyses: data.totalAnalyses,
          totalWordsLearned: data.totalWordsLearned,
          streakDays: data.streakDays,
          lastActiveDate: new Date(timestamp),
        },
      });

    case 'pack_progress':
      return await prisma.userPackProgress.upsert({
        where: {
          userId_packId: {
            userId,
            packId: data.packId,
          },
        },
        create: {
          userId,
          packId: data.packId,
          status: data.status || 'studying',
          studiedWords: data.studiedWords || [],
          wrongWords: data.wrongWords || [],
          quizScore: data.quizScore,
        },
        update: {
          status: data.status,
          studiedWords: data.studiedWords,
          wrongWords: data.wrongWords,
          quizScore: data.quizScore,
        },
      });

    default:
      throw new Error(`Unknown operation type: ${type}`);
  }
}

/**
 * POST /api/mobile/auth/refresh
 * Refresh JWT token for mobile apps
 */
router.post('/auth/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret || config.jwtSecret) as any;

    const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, config.jwtSecret, {
      expiresIn: '15m',
    });

    const newRefreshToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      config.jwtRefreshSecret || config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 900,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

/**
 * GET /api/mobile/user/summary
 * Get user summary with minimal data for mobile dashboard
 */
router.get('/user/summary', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        subscriptionTier: true,
        credits: true,
        subscriptionExpiry: true,
      },
    });

    const stats = await prisma.learningStats.findUnique({
      where: { userId },
      select: {
        totalWordsLearned: true,
        streakDays: true,
      },
    });

    const now = new Date();
    const reviewsDue = await prisma.vocabulary.count({
      where: {
        userId,
        srsDueDate: {
          lte: now,
        },
      },
    });

    res.json({
      user,
      stats: stats || {
        totalWordsLearned: 0,
        streakDays: 0,
      },
      reviewsDue,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user summary' });
  }
});

/**
 * POST /api/mobile/batch-operations
 * Process multiple operations in a single request (mobile optimization)
 */
router.post('/batch-operations', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { requests } = req.body;

    if (!Array.isArray(requests)) {
      return res.status(400).json({ error: 'Requests must be an array' });
    }

    const responses = await Promise.all(
      requests.map(async (r: any) => {
        try {
          switch (r.endpoint) {
            case 'packs':
              return { id: r.id, data: await getMobilePacks(r.params) };
            case 'stats':
              return { id: r.id, data: await getUserStats(userId) };
            case 'reviews':
              return { id: r.id, data: await getReviewsDue(userId) };
            default:
              return { id: r.id, error: 'Unknown endpoint' };
          }
        } catch (error) {
          return {
            id: r.id,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      })
    );

    res.json({ responses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process batch operations' });
  }
});

// Helper functions for batch operations
async function getMobilePacks(params: any) {
  return await prisma.wordPack.findMany({
    take: params?.limit || 10,
    select: {
      id: true,
      packId: true,
      nameZhCN: true,
      category: true,
    },
  });
}

async function getUserStats(userId: string) {
  return await prisma.learningStats.findUnique({
    where: { userId },
  });
}

async function getReviewsDue(userId: string) {
  return await prisma.vocabulary.count({
    where: {
      userId,
      srsDueDate: { lte: new Date() },
    },
  });
}

export default router;
