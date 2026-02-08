import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';

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

    const today = new Date().toISOString().slice(0, 10);

    let stats = await prisma.learningStats.findUnique({ where: { userId } });
    if (!stats) {
      stats = await prisma.learningStats.create({ data: { userId } });
    }

    // Build immutable update data
    let totalAnalyses = stats.totalAnalyses + 1;
    let totalWordsLearned = stats.totalWordsLearned;
    if (typeof wordsLearned === 'number' && wordsLearned > 0) {
      totalWordsLearned += wordsLearned;
    }

    // Update JLPT progress (immutable)
    const jlptProgress = { ...(stats.jlptProgress as Record<string, number>) };
    if (jlptLevel && typeof jlptLevel === 'string') {
      jlptProgress[jlptLevel] = (jlptProgress[jlptLevel] || 0) + 1;
    }

    // Update daily activity (immutable)
    const dailyArr = [...((stats.dailyActivity as Array<{ date: string; count: number }>) || [])];
    const todayIdx = dailyArr.findIndex((d) => d.date === today);
    if (todayIdx >= 0) {
      dailyArr[todayIdx] = { ...dailyArr[todayIdx], count: dailyArr[todayIdx].count + 1 };
    } else {
      dailyArr.push({ date: today, count: 1 });
      // Keep last 90 days
      if (dailyArr.length > 90) dailyArr.shift();
    }

    // Update streak
    const lastDate = stats.lastActiveDate
      ? new Date(stats.lastActiveDate).toISOString().slice(0, 10)
      : '';
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    let streakDays = stats.streakDays;
    if (lastDate === yesterday) {
      streakDays += 1;
    } else if (lastDate !== today) {
      streakDays = 1;
    }

    const updated = await prisma.learningStats.update({
      where: { userId },
      data: {
        totalAnalyses,
        totalWordsLearned,
        jlptProgress,
        dailyActivity: dailyArr,
        streakDays,
        lastActiveDate: new Date(),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('Learning stats update error:', error);
    res.status(500).json({ error: { message: '更新学习统计失败' } });
  }
});

export default router;
