import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * GET /user/stats
 * Get user statistics
 */
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let stats = await prisma.learningStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      stats = await prisma.learningStats.create({
        data: {
          userId,
          totalAnalyses: 0,
          totalWordsLearned: 0,
          streakDays: 0,
        },
      });
    }

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch user stats',
    });
  }
});

/**
 * POST /user/stats
 * Update user statistics
 */
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { totalAnalyses, totalWordsLearned } = req.body;

    let stats = await prisma.learningStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      stats = await prisma.learningStats.create({
        data: {
          userId,
          totalAnalyses: totalAnalyses || 0,
          totalWordsLearned: totalWordsLearned || 0,
          streakDays: 0,
        },
      });
    } else {
      stats = await prisma.learningStats.update({
        where: { userId },
        data: {
          totalAnalyses: { increment: totalAnalyses || 0 },
          totalWordsLearned: { increment: totalWordsLearned || 0 },
          lastActiveDate: new Date(),
        },
      });
    }

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update user stats',
    });
  }
});

export default router;
