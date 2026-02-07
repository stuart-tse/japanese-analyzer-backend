import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { WordPack } from '../models/WordPack.js';
import { UserPackProgress } from '../models/UserPackProgress.js';
import { Vocabulary, SrsStage } from '../models/Vocabulary.js';
import { LearningStats } from '../models/LearningStats.js';

const router = Router();

// Helper: read JLPT vocabulary for enriching pack words with full data
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jlptData: Array<{
  word: string; furigana: string; romaji: string;
  meaning_zh_CN: string; jlptLevel: string; pos: string;
}> = JSON.parse(
  readFileSync(resolve(__dirname, '../../data/jlpt_vocabulary_all.json'), 'utf-8')
);
const jlptMap = new Map(jlptData.map(w => [w.word, w]));

// GET /packs — list all packs with user's progress
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const packs = await WordPack.find({ jlptLevel: 'N5' }).sort({ order: 1 }).lean();
    const progress = await UserPackProgress.find({ userId }).lean();
    const progressMap = new Map(progress.map(p => [p.packId, p]));

    // Initialize progress for first pack if none exists
    if (progress.length === 0 && packs.length > 0) {
      await UserPackProgress.create({
        userId, packId: packs[0].packId, status: 'available',
      });
      // Re-query so progressMap includes the new record
      const freshProgress = await UserPackProgress.find({ userId }).lean();
      for (const p of freshProgress) {
        progressMap.set(p.packId, p);
      }
    }

    const result = packs.map(pack => {
      const prog = progressMap.get(pack.packId);
      return {
        packId: pack.packId,
        name_zh_CN: pack.name_zh_CN,
        name_en: pack.name_en,
        description_zh_CN: pack.description_zh_CN,
        category: pack.category,
        wordCount: pack.words.length,
        order: pack.order,
        status: prog?.status || 'locked',
        studiedCount: prog?.studiedWords?.length || 0,
        quizScore: prog?.quizScore ?? null,
        completedAt: prog?.completedAt ?? null,
      };
    });

    // Count total learned words
    const completedPacks = progress.filter(p => p.status === 'completed');
    const totalLearned = completedPacks.reduce((sum, p) => {
      const pack = packs.find(pk => pk.packId === p.packId);
      return sum + (pack?.words.length || 0);
    }, 0);

    res.json({ packs: result, totalWords: 681, totalLearned });
  } catch (error) {
    console.error('Packs list error:', error);
    res.status(500).json({ error: { message: '获取词汇包列表失败' } });
  }
});

// GET /packs/:packId — pack detail with full word data
router.get('/:packId', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const pack = await WordPack.findOne({ packId: req.params.packId }).lean();
    if (!pack) {
      res.status(404).json({ error: { message: '词汇包不存在' } });
      return;
    }

    const progress = await UserPackProgress.findOne({ userId, packId: pack.packId }).lean();

    // Enrich words with full vocabulary data
    const words = pack.words.map(word => {
      const entry = jlptMap.get(word);
      return {
        word,
        furigana: entry?.furigana?.replace(/&nbsp;/g, ' ') || '',
        romaji: entry?.romaji?.replace(/&nbsp;/g, ' ') || '',
        meaning_zh_CN: entry?.meaning_zh_CN || '',
        pos: entry?.pos || '',
      };
    });

    res.json({
      ...pack,
      words,
      progress: {
        status: progress?.status || 'locked',
        studiedWords: progress?.studiedWords || [],
        wrongWords: progress?.wrongWords || [],
        quizScore: progress?.quizScore ?? null,
        quizAttempts: progress?.quizAttempts || 0,
      },
    });
  } catch (error) {
    console.error('Pack detail error:', error);
    res.status(500).json({ error: { message: '获取词汇包详情失败' } });
  }
});

// POST /packs/:packId/study — mark words as studied
router.post('/:packId/study', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { words } = req.body as { words: string[] };

    if (!Array.isArray(words) || words.length === 0) {
      res.status(400).json({ error: { message: '缺少学习词汇列表' } });
      return;
    }

    const progress = await UserPackProgress.findOneAndUpdate(
      { userId, packId: req.params.packId },
      {
        $addToSet: { studiedWords: { $each: words } },
        $set: { status: 'studying' },
      },
      { upsert: true, new: true },
    );

    res.json({ studiedWords: progress.studiedWords, status: progress.status });
  } catch (error) {
    console.error('Pack study error:', error);
    res.status(500).json({ error: { message: '更新学习进度失败' } });
  }
});

// POST /packs/:packId/quiz — submit quiz results
router.post('/:packId/quiz', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { answers } = req.body as {
      answers: Array<{ word: string; correct: boolean }>;
    };

    if (!Array.isArray(answers)) {
      res.status(400).json({ error: { message: '缺少答题结果' } });
      return;
    }

    const pack = await WordPack.findOne({ packId: req.params.packId }).lean();
    if (!pack) {
      res.status(404).json({ error: { message: '词汇包不存在' } });
      return;
    }

    const correctCount = answers.filter(a => a.correct).length;
    const score = Math.round((correctCount / answers.length) * 100);
    const wrongWords = answers.filter(a => !a.correct).map(a => a.word);
    const completed = score >= 70;

    // Update pack progress
    const update: Record<string, unknown> = {
      $inc: { quizAttempts: 1 },
      $addToSet: { wrongWords: { $each: wrongWords } },
    };

    if (completed) {
      update.$set = { status: 'completed', quizScore: score, completedAt: new Date() };
    } else {
      update.$set = { quizScore: score };
    }

    await UserPackProgress.findOneAndUpdate(
      { userId, packId: pack.packId },
      update,
      { upsert: true },
    );

    // If completed, add words to SRS and unlock next pack
    if (completed) {
      // Upsert vocabulary entries with SRS fields
      for (const word of pack.words) {
        const entry = jlptMap.get(word);
        const wasWrong = wrongWords.includes(word);
        await Vocabulary.findOneAndUpdate(
          { userId, word },
          {
            $setOnInsert: {
              userId, word,
              furigana: entry?.furigana?.replace(/&nbsp;/g, ' ') || '',
              romaji: entry?.romaji?.replace(/&nbsp;/g, ' ') || '',
              meaning_zh_CN: entry?.meaning_zh_CN || '',
              jlptLevel: 'N5',
              pos: entry?.pos || '',
              mastered: false,
              reviewCount: 0,
              sourcePackId: word,
            },
            $set: {
              srsStage: 'learning' as SrsStage,
              srsDueDate: wasWrong ? new Date() : new Date(Date.now() + 86400000),
              srsInterval: wasWrong ? 0 : 1,
              srsEaseFactor: 2.5,
            },
            ...(wasWrong ? { $inc: { wrongCount: 1 } } : {}),
          },
          { upsert: true },
        );
      }

      // Update learning stats
      await LearningStats.findOneAndUpdate(
        { userId },
        {
          $inc: { totalWordsLearned: pack.words.length },
          $set: { lastActiveDate: new Date() },
        },
        { upsert: true },
      );

      // Unlock next pack
      const allPacks = await WordPack.find({ jlptLevel: 'N5' }).sort({ order: 1 }).lean();
      const currentIdx = allPacks.findIndex(p => p.packId === pack.packId);
      if (currentIdx >= 0 && currentIdx < allPacks.length - 1) {
        const nextPack = allPacks[currentIdx + 1];
        await UserPackProgress.findOneAndUpdate(
          { userId, packId: nextPack.packId },
          { $setOnInsert: { status: 'available', studiedWords: [], wrongWords: [], quizAttempts: 0 } },
          { upsert: true },
        );
      }
    }

    // For wrong words, update wrongCount in Vocabulary
    if (wrongWords.length > 0) {
      await Vocabulary.updateMany(
        { userId, word: { $in: wrongWords } },
        { $inc: { wrongCount: 1 } },
      );
    }

    res.json({ score, completed, wrongWords, correctCount, totalQuestions: answers.length });
  } catch (error) {
    console.error('Pack quiz error:', error);
    res.status(500).json({ error: { message: '提交测验结果失败' } });
  }
});

// GET /packs/:packId/quiz-words — get quiz words (with 15-20% wrong word injection)
router.get('/:packId/quiz-words', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const pack = await WordPack.findOne({ packId: req.params.packId }).lean();
    if (!pack) {
      res.status(404).json({ error: { message: '词汇包不存在' } });
      return;
    }

    // Get user's wrong words from all completed packs (not in this pack)
    const allProgress = await UserPackProgress.find({
      userId,
      status: 'completed',
      packId: { $ne: pack.packId },
    }).lean();

    const allWrongWords = allProgress.flatMap(p => p.wrongWords);
    // Filter to words not already mastered
    const notMastered = allWrongWords.length > 0
      ? await Vocabulary.find({
          userId,
          word: { $in: allWrongWords },
          srsStage: { $ne: 'mastered' },
        }).lean()
      : [];

    const wrongPool = notMastered.map(v => v.word);

    // Calculate injection: 15-20% of 10 questions = 1-2 wrong words
    const totalQuestions = 10;
    const injectionRate = 0.15 + Math.random() * 0.05;
    const wrongSlots = Math.min(Math.round(totalQuestions * injectionRate), wrongPool.length);
    const packSlots = totalQuestions - wrongSlots;

    // Shuffle and pick
    const shuffled = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);
    const quizWrongWords = shuffled(wrongPool).slice(0, wrongSlots);
    const quizPackWords = shuffled(pack.words).slice(0, packSlots);

    const quizWords = shuffled([...quizPackWords, ...quizWrongWords]).map(word => {
      const entry = jlptMap.get(word);
      return {
        word,
        furigana: entry?.furigana?.replace(/&nbsp;/g, ' ') || '',
        romaji: entry?.romaji?.replace(/&nbsp;/g, ' ') || '',
        meaning_zh_CN: entry?.meaning_zh_CN || '',
        pos: entry?.pos || '',
        isReinjected: quizWrongWords.includes(word),
      };
    });

    // Also provide distractor words for multiple choice
    const allN5Words = jlptData
      .filter(w => w.jlptLevel === 'N5')
      .map(w => ({ word: w.word, meaning_zh_CN: w.meaning_zh_CN }));

    res.json({ quizWords, allN5Words: shuffled(allN5Words.map(w => w.meaning_zh_CN)).slice(0, 50) });
  } catch (error) {
    console.error('Quiz words error:', error);
    res.status(500).json({ error: { message: '获取测验词汇失败' } });
  }
});

export default router;
