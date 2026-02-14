import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';
import { recordActivity } from '../services/streakService.js';

const router = Router();

// GET /srs/due — get today's due review words
router.get('/due', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);

    const dueWords = await prisma.vocabulary.findMany({
      where: {
        userId,
        srsStage: { in: ['learning', 'review'] },
        srsDueDate: { lte: new Date() },
      },
      orderBy: { srsDueDate: 'asc' },
      take: limit,
    });

    const result = dueWords.map(v => ({
      _id: v.id,
      word: v.word,
      furigana: v.furigana,
      romaji: v.romaji,
      meaning_zh_CN: v.meaningZhCN,
      pos: v.pos,
      jlptLevel: v.jlptLevel,
      srsStage: v.srsStage,
      srsInterval: v.srsInterval,
      reviewCount: v.reviewCount,
      wrongCount: v.wrongCount,
      notes: typeof v.notes === 'string' ? v.notes : '',
    }));

    res.json({ items: result, count: result.length });
  } catch (error) {
    console.error('SRS due error:', error);
    res.status(500).json({ error: { message: '获取复习词汇失败' } });
  }
});

// GET /srs/due-enriched — due words with example sentences joined
router.get('/due-enriched', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);

    const dueWords = await prisma.vocabulary.findMany({
      where: {
        userId,
        srsStage: { in: ['learning', 'review'] },
        srsDueDate: { lte: new Date() },
      },
      orderBy: { srsDueDate: 'asc' },
      take: limit,
    });

    // Batch-join example sentences
    const wordList = [...new Set(dueWords.map(v => v.word))];
    const examples = wordList.length > 0
      ? await prisma.wordExample.findMany({
          where: { word: { in: wordList } },
        })
      : [];

    const exampleMap = new Map(
      examples.map(e => [e.word, e.examples as Array<{ sentence: string; furigana: string; meaning_zh_CN: string }>]),
    );

    const result = dueWords.map(v => ({
      _id: v.id,
      word: v.word,
      furigana: v.furigana,
      romaji: v.romaji,
      meaning_zh_CN: v.meaningZhCN,
      pos: v.pos,
      jlptLevel: v.jlptLevel,
      srsStage: v.srsStage,
      srsInterval: v.srsInterval,
      reviewCount: v.reviewCount,
      wrongCount: v.wrongCount,
      notes: typeof v.notes === 'string' ? v.notes : '',
      exampleSentences: exampleMap.get(v.word) ?? null,
    }));

    res.json({ items: result, count: result.length });
  } catch (error) {
    console.error('SRS due-enriched error:', error);
    res.status(500).json({ error: { message: '获取复习词汇失败' } });
  }
});

// GET /srs/stats — review dashboard stats
router.get('/stats', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;

    const [dueToday, learning, review, mastered, total] = await Promise.all([
      prisma.vocabulary.count({
        where: {
          userId,
          srsStage: { in: ['learning', 'review'] },
          srsDueDate: { lte: new Date() },
        },
      }),
      prisma.vocabulary.count({ where: { userId, srsStage: 'learning' } }),
      prisma.vocabulary.count({ where: { userId, srsStage: 'review' } }),
      prisma.vocabulary.count({ where: { userId, srsStage: 'mastered' } }),
      prisma.vocabulary.count({ where: { userId, srsStage: { not: 'new' } } }),
    ]);

    res.json({ dueToday, learning, review, mastered, total });
  } catch (error) {
    console.error('SRS stats error:', error);
    res.status(500).json({ error: { message: '获取复习统计失败' } });
  }
});

// POST /srs/review — submit review result for a single word
router.post('/review', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { wordId, quality, cardType } = req.body as { wordId: string; quality: number; cardType?: string };

    if (!wordId || typeof quality !== 'number' || quality < 0 || quality > 5) {
      res.status(400).json({ error: { message: '参数无效' } });
      return;
    }

    const vocab = await prisma.vocabulary.findFirst({
      where: { id: wordId, userId },
    });
    if (!vocab) {
      res.status(404).json({ error: { message: '词汇不存在' } });
      return;
    }

    const now = new Date();
    let srsInterval = vocab.srsInterval;
    let srsEaseFactor = vocab.srsEaseFactor;
    let srsStage = vocab.srsStage;
    let wrongCount = vocab.wrongCount;

    if (srsStage === 'learning') {
      // Learning stage: simple interval progression
      if (quality >= 3) {
        if (srsInterval === 0) {
          srsInterval = 1;
        } else if (srsInterval === 1) {
          srsInterval = 3;
          srsStage = 'review';
        } else {
          srsInterval = 3;
          srsStage = 'review';
        }
      } else {
        srsInterval = 0;
        wrongCount += 1;
      }
    } else if (srsStage === 'review') {
      // Review stage: SM-2 algorithm
      if (quality < 3) {
        srsStage = 'learning';
        srsInterval = 0;
        wrongCount += 1;
      } else {
        if (srsInterval === 0) {
          srsInterval = 1;
        } else if (srsInterval === 1) {
          srsInterval = 6;
        } else {
          srsInterval = Math.round(srsInterval * srsEaseFactor);
        }

        // SM-2 ease factor adjustment
        srsEaseFactor = srsEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (srsEaseFactor < 1.3) srsEaseFactor = 1.3;

        // Graduate to mastered if interval > 21 days
        if (srsInterval > 21) {
          srsStage = 'mastered';
        }
      }
    }

    const srsDueDate = new Date(now.getTime() + srsInterval * 86400000);
    const mastered = srsStage === 'mastered';

    const updated = await prisma.vocabulary.update({
      where: { id: vocab.id },
      data: {
        srsInterval,
        srsEaseFactor,
        srsStage,
        srsDueDate,
        reviewCount: vocab.reviewCount + 1,
        lastReviewedAt: now,
        mastered,
        wrongCount,
      },
    });

    // Track streak + challenge progress for SRS review
    const streakResult = await recordActivity({ userId, activityType: 'srs_review' });

    // If this was a cloze/audio_cloze card, also track cloze_practice for challenge progress
    if (cardType === 'cloze' || cardType === 'audio_cloze') {
      recordActivity({ userId, activityType: 'cloze_practice' }).catch(() => {});
    }

    res.json({
      word: updated.word,
      srsStage: updated.srsStage,
      srsInterval: updated.srsInterval,
      srsDueDate: updated.srsDueDate,
      reviewCount: updated.reviewCount,
      mastered: updated.mastered,
      streakMilestone: streakResult.isNewMilestone ? streakResult.milestone : null,
    });
  } catch (error) {
    console.error('SRS review error:', error);
    res.status(500).json({ error: { message: '提交复习结果失败' } });
  }
});

export default router;
