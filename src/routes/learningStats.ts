import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';
import { recordActivity } from '../services/streakService.js';

const router = Router();

// GET /learning-stats — get user stats
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    let stats = await prisma.learningStats.findUnique({ where: { userId } });

    if (!stats) {
      stats = await prisma.learningStats.create({ data: { userId } });
    }

    res.json(stats);
  } catch (error) {
    console.error('Learning stats get error:', error);
    res.status(500).json({ error: { message: '获取学习统计失败' } });
  }
});

// POST /learning-stats/update — increment stats after analysis
router.post('/update', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { wordsLearned, jlptLevel } = req.body;

    const streakResult = await recordActivity({
      userId,
      activityType: 'analysis',
      wordsLearned: typeof wordsLearned === 'number' ? wordsLearned : undefined,
      jlptLevel: typeof jlptLevel === 'string' ? jlptLevel : undefined,
    });

    // Re-fetch updated stats to return full object (same shape as before)
    const updated = await prisma.learningStats.findUnique({ where: { userId } });

    res.json({
      ...updated,
      streakMilestone: streakResult.isNewMilestone ? streakResult.milestone : null,
    });
  } catch (error) {
    console.error('Learning stats update error:', error);
    res.status(500).json({ error: { message: '更新学习统计失败' } });
  }
});

export default router;
