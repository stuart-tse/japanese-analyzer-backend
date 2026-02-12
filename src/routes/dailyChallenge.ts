import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';
import { getOrCreateTodayChallenge } from '../services/challengeService.js';

const router = Router();

// GET /daily-challenge — returns today's challenge + user progress + streak info
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;

    // Get or create today's challenge
    const challenge = await getOrCreateTodayChallenge();

    // Get user's progress for this challenge
    const userChallenge = await prisma.userDailyChallenge.findUnique({
      where: { userId_challengeId: { userId, challengeId: challenge.id } },
    });

    // Get streak info from learning stats
    const stats = await prisma.learningStats.findUnique({ where: { userId } });

    res.json({
      challenge: {
        id: challenge.id,
        date: challenge.date,
        type: challenge.type,
        titleZh: challenge.titleZh,
        descriptionZh: challenge.descriptionZh,
        targetCount: challenge.targetCount,
        xpReward: challenge.xpReward,
      },
      progress: {
        currentProgress: userChallenge?.currentProgress ?? 0,
        completed: userChallenge?.completed ?? false,
        completedAt: userChallenge?.completedAt?.toISOString() ?? null,
      },
      streak: {
        streakDays: stats?.streakDays ?? 0,
        isNewMilestone: false,
        milestone: null,
      },
    });
  } catch (error) {
    console.error('Daily challenge get error:', error);
    res.status(500).json({ error: { message: '获取每日挑战失败' } });
  }
});

export default router;
