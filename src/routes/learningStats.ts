import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { LearningStats } from '../models/LearningStats.js';

const router = Router();

// GET /learning-stats — get user stats
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const stats = await LearningStats.findOne({ userId }).lean();

    if (!stats) {
      const created = await LearningStats.create({ userId });
      res.json(created.toObject());
      return;
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

    let stats = await LearningStats.findOne({ userId });
    if (!stats) {
      stats = new LearningStats({ userId });
    }

    // Increment analysis count
    stats.totalAnalyses += 1;

    // Increment words learned
    if (typeof wordsLearned === 'number' && wordsLearned > 0) {
      stats.totalWordsLearned += wordsLearned;
    }

    // Update JLPT progress
    if (jlptLevel && typeof jlptLevel === 'string') {
      const current = (stats.jlptProgress as Record<string, number>)[jlptLevel] || 0;
      (stats.jlptProgress as Record<string, number>)[jlptLevel] = current + 1;
      stats.markModified('jlptProgress');
    }

    // Update daily activity
    const dailyArr = stats.dailyActivity || [];
    const todayEntry = dailyArr.find((d) => d.date === today);
    if (todayEntry) {
      todayEntry.count += 1;
    } else {
      dailyArr.push({ date: today, count: 1 });
      // Keep last 90 days
      if (dailyArr.length > 90) dailyArr.shift();
    }
    stats.dailyActivity = dailyArr;

    // Update streak
    const lastDate = stats.lastActiveDate
      ? new Date(stats.lastActiveDate).toISOString().slice(0, 10)
      : '';
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (lastDate === yesterday) {
      stats.streakDays += 1;
    } else if (lastDate !== today) {
      stats.streakDays = 1;
    }

    stats.lastActiveDate = new Date();
    await stats.save();

    res.json(stats);
  } catch (error) {
    console.error('Learning stats update error:', error);
    res.status(500).json({ error: { message: '更新学习统计失败' } });
  }
});

export default router;
