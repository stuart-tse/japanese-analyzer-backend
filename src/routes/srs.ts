import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Vocabulary, SrsStage } from '../models/Vocabulary.js';

const router = Router();

// GET /srs/due — get today's due review words
router.get('/due', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);

    const dueWords = await Vocabulary.find({
      userId,
      srsStage: { $in: ['learning', 'review'] as SrsStage[] },
      srsDueDate: { $lte: new Date() },
    })
      .sort({ srsDueDate: 1 })
      .limit(limit)
      .lean();

    const result = dueWords.map(v => ({
      _id: v._id,
      word: v.word,
      furigana: v.furigana,
      romaji: v.romaji,
      meaning_zh_CN: v.meaning_zh_CN,
      pos: v.pos,
      jlptLevel: v.jlptLevel,
      srsStage: v.srsStage,
      srsInterval: v.srsInterval,
      reviewCount: v.reviewCount,
      wrongCount: v.wrongCount,
    }));

    res.json({ items: result, count: result.length });
  } catch (error) {
    console.error('SRS due error:', error);
    res.status(500).json({ error: { message: '获取复习词汇失败' } });
  }
});

// GET /srs/stats — review dashboard stats
router.get('/stats', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;

    const [dueToday, learning, review, mastered, total] = await Promise.all([
      Vocabulary.countDocuments({
        userId,
        srsStage: { $in: ['learning', 'review'] },
        srsDueDate: { $lte: new Date() },
      }),
      Vocabulary.countDocuments({ userId, srsStage: 'learning' }),
      Vocabulary.countDocuments({ userId, srsStage: 'review' }),
      Vocabulary.countDocuments({ userId, srsStage: 'mastered' }),
      Vocabulary.countDocuments({ userId, srsStage: { $ne: 'new' } }),
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
    const { wordId, quality } = req.body as { wordId: string; quality: number };

    if (!wordId || typeof quality !== 'number' || quality < 0 || quality > 5) {
      res.status(400).json({ error: { message: '参数无效' } });
      return;
    }

    const vocab = await Vocabulary.findOne({ _id: wordId, userId });
    if (!vocab) {
      res.status(404).json({ error: { message: '词汇不存在' } });
      return;
    }

    const now = new Date();
    let { srsInterval, srsEaseFactor, srsStage } = vocab;

    if (srsStage === 'learning') {
      // Learning stage: simple interval progression
      if (quality >= 3) {
        // Correct
        if (srsInterval === 0) {
          srsInterval = 1;
        } else if (srsInterval === 1) {
          srsInterval = 3;
          srsStage = 'review'; // Graduate to review stage
        } else {
          srsInterval = 3;
          srsStage = 'review';
        }
      } else {
        // Wrong — reset
        srsInterval = 0;
        vocab.wrongCount += 1;
      }
    } else if (srsStage === 'review') {
      // Review stage: SM-2 algorithm
      if (quality < 3) {
        // Failed — back to learning
        srsStage = 'learning';
        srsInterval = 0;
        vocab.wrongCount += 1;
      } else {
        // SM-2 interval calculation
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

    vocab.srsInterval = srsInterval;
    vocab.srsEaseFactor = srsEaseFactor;
    vocab.srsStage = srsStage;
    vocab.srsDueDate = srsDueDate;
    vocab.reviewCount += 1;
    vocab.lastReviewedAt = now;
    if (srsStage === 'mastered') {
      vocab.mastered = true;
    }
    await vocab.save();

    res.json({
      word: vocab.word,
      srsStage: vocab.srsStage,
      srsInterval: vocab.srsInterval,
      srsDueDate: vocab.srsDueDate,
      reviewCount: vocab.reviewCount,
      mastered: vocab.mastered,
    });
  } catch (error) {
    console.error('SRS review error:', error);
    res.status(500).json({ error: { message: '提交复习结果失败' } });
  }
});

export default router;
