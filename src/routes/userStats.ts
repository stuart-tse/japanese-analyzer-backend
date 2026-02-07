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
    const userId = req.jwtUser!.userId;

    // Fetch user stats
    let stats = await prisma.userStats.findUnique({
      where: { userId },
    });

    // Create stats if they don't exist
    if (!stats) {
      stats = await prisma.userStats.create({
        data: {
          userId,
          totalAnalyses: 0,
          totalTranslations: 0,
          totalWords: 0,
          streakDays: 0,
        },
      });
    }

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
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
    const userId = req.jwtUser!.userId;
    const { totalAnalyses, totalTranslations, totalWords } = req.body;

    // Get or create stats
    let stats = await prisma.userStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      stats = await prisma.userStats.create({
        data: {
          userId,
          totalAnalyses: totalAnalyses || 0,
          totalTranslations: totalTranslations || 0,
          totalWords: totalWords || 0,
          streakDays: 0,
        },
      });
    } else {
      // Update existing stats
      stats = await prisma.userStats.update({
        where: { userId },
        data: {
          totalAnalyses: { increment: totalAnalyses || 0 },
          totalTranslations: { increment: totalTranslations || 0 },
          totalWords: { increment: totalWords || 0 },
          lastActiveAt: new Date(),
        },
      });
    }

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Error updating user stats:', error);
    res.status(500).json({
      error: 'Failed to update user stats',
    });
  }
});

export default router;
