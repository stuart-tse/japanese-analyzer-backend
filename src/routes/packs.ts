import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';
import { recordActivity } from '../services/streakService.js';

const router = Router();

// Helper: read JLPT vocabulary for enriching pack words with full data
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

interface VocabEntry {
  word: string;
  furigana: string;
  romaji: string;
  meaning_zh_CN: string;
  jlptLevel: string;
  pos: string;
}

interface GrammarEntry {
  id: string;
  pattern: string;
  meaning_zh_CN: string;
  explanation_zh_CN: string;
  example: string;
  example_meaning_zh_CN: string;
  jlptLevel: string;
  category: string;
}

const jlptData: VocabEntry[] = JSON.parse(
  readFileSync(resolve(process.cwd(), 'data/jlpt_vocabulary_all.json'), 'utf-8')
);
const jlptMap = new Map(jlptData.map(w => [w.word, w]));

// Load grammar data if available
const grammarPath = resolve(process.cwd(), 'data/jlpt_grammar_all.json');
const grammarData: GrammarEntry[] = existsSync(grammarPath)
  ? JSON.parse(readFileSync(grammarPath, 'utf-8'))
  : [];
const grammarMap = new Map(grammarData.map(g => [g.id, g]));

const VALID_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const VALID_TYPES = ['vocabulary', 'grammar'];

// GET /packs — list all packs with user's progress
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const level = (req.query.level as string) || 'N5';
    const type = (req.query.type as string) || 'vocabulary';

    if (!VALID_LEVELS.includes(level)) {
      res.status(400).json({ error: { message: `无效的等级: ${level}` } });
      return;
    }
    if (!VALID_TYPES.includes(type)) {
      res.status(400).json({ error: { message: `无效的类型: ${type}` } });
      return;
    }

    const packs = await prisma.wordPack.findMany({
      where: { jlptLevel: level, type },
      orderBy: { order: 'asc' },
    });

    const packIds = packs.map(p => p.packId);
    const progress = await prisma.userPackProgress.findMany({
      where: { userId, packId: { in: packIds } },
    });
    const progressMap = new Map(progress.map(p => [p.packId, p]));

    // Initialize progress for first pack if none exists for this level+type
    if (progress.length === 0 && packs.length > 0) {
      await prisma.userPackProgress.create({
        data: { userId, packId: packs[0].packId, status: 'available' },
      });
      progressMap.set(packs[0].packId, {
        id: '',
        userId,
        packId: packs[0].packId,
        status: 'available',
        studiedWords: [],
        wrongWords: [],
        quizScore: null,
        quizAttempts: 0,
        completedAt: null,
        createdAt: new Date(),
      });
    }

    const result = packs.map(pack => {
      const prog = progressMap.get(pack.packId);
      const words = pack.words as string[];
      const studiedWords = (prog?.studiedWords ?? []) as string[];
      return {
        packId: pack.packId,
        name_zh_CN: pack.nameZhCN,
        name_en: pack.nameEn,
        description_zh_CN: pack.descriptionZhCN,
        category: pack.category,
        wordCount: words.length,
        order: pack.order,
        status: prog?.status || 'locked',
        studiedCount: studiedWords.length,
        quizScore: prog?.quizScore ?? null,
        completedAt: prog?.completedAt ?? null,
      };
    });

    // Compute totalWords dynamically from matched packs
    const totalWords = packs.reduce((sum, p) => sum + (p.words as string[]).length, 0);

    // Count total learned words for this level+type
    const completedPacks = progress.filter(p => p.status === 'completed');
    const totalLearned = completedPacks.reduce((sum, p) => {
      const pack = packs.find(pk => pk.packId === p.packId);
      const words = (pack?.words ?? []) as string[];
      return sum + words.length;
    }, 0);

    res.json({ packs: result, totalWords, totalLearned });
  } catch (error) {
    console.error('Packs list error:', error);
    res.status(500).json({ error: { message: '获取词汇包列表失败' } });
  }
});

// GET /packs/:packId — pack detail with full word data
router.get('/:packId', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const packId = req.params.packId as string;
    const pack = await prisma.wordPack.findUnique({
      where: { packId },
    });
    if (!pack) {
      res.status(404).json({ error: { message: '词汇包不存在' } });
      return;
    }

    const progress = await prisma.userPackProgress.findUnique({
      where: { userId_packId: { userId, packId: pack.packId } },
    });

    const packWords = pack.words as string[];

    // Enrich words depending on pack type
    const words = pack.type === 'grammar'
      ? packWords.map(grammarId => {
          const entry = grammarMap.get(grammarId);
          return {
            word: grammarId,
            pattern: entry?.pattern || '',
            meaning_zh_CN: entry?.meaning_zh_CN || '',
            explanation_zh_CN: entry?.explanation_zh_CN || '',
            example: entry?.example || '',
            example_meaning_zh_CN: entry?.example_meaning_zh_CN || '',
            furigana: '',
            romaji: '',
            pos: entry?.category || '',
          };
        })
      : packWords.map(word => {
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
      packId: pack.packId,
      name_zh_CN: pack.nameZhCN,
      name_en: pack.nameEn,
      description_zh_CN: pack.descriptionZhCN,
      category: pack.category,
      jlptLevel: pack.jlptLevel,
      type: pack.type,
      order: pack.order,
      words,
      progress: {
        status: progress?.status || 'locked',
        studiedWords: (progress?.studiedWords ?? []) as string[],
        wrongWords: (progress?.wrongWords ?? []) as string[],
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
    const packId = req.params.packId as string;
    const { words } = req.body as { words: string[] };

    if (!Array.isArray(words) || words.length === 0) {
      res.status(400).json({ error: { message: '缺少学习词汇列表' } });
      return;
    }

    // Read current progress, merge studied words (equivalent to $addToSet)
    const existing = await prisma.userPackProgress.findUnique({
      where: { userId_packId: { userId, packId } },
    });

    const currentStudied = (existing?.studiedWords ?? []) as string[];
    const merged = [...new Set([...currentStudied, ...words])];

    const progress = await prisma.userPackProgress.upsert({
      where: { userId_packId: { userId, packId } },
      update: {
        studiedWords: merged,
        status: 'studying',
      },
      create: {
        userId,
        packId,
        studiedWords: merged,
        status: 'studying',
      },
    });

    // Track streak + challenge progress (fire-and-forget)
    recordActivity({ userId, activityType: 'pack_study' }).catch((err) => {
      console.error('Streak update failed for pack_study:', err);
    });

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
    const packId = req.params.packId as string;
    const { answers } = req.body as {
      answers: Array<{ word: string; correct: boolean }>;
    };

    if (!Array.isArray(answers)) {
      res.status(400).json({ error: { message: '缺少答题结果' } });
      return;
    }

    const pack = await prisma.wordPack.findUnique({
      where: { packId },
    });
    if (!pack) {
      res.status(404).json({ error: { message: '词汇包不存在' } });
      return;
    }

    const correctCount = answers.filter(a => a.correct).length;
    const score = Math.round((correctCount / answers.length) * 100);
    const wrongWords = answers.filter(a => !a.correct).map(a => a.word);
    const completed = score >= 70;

    // Read current progress to merge wrongWords
    const existingProgress = await prisma.userPackProgress.findUnique({
      where: { userId_packId: { userId, packId: pack.packId } },
    });
    const currentWrongWords = (existingProgress?.wrongWords ?? []) as string[];
    const mergedWrongWords = [...new Set([...currentWrongWords, ...wrongWords])];

    const updateData: Record<string, unknown> = {
      quizAttempts: (existingProgress?.quizAttempts ?? 0) + 1,
      wrongWords: mergedWrongWords,
      quizScore: score,
    };

    if (completed) {
      updateData.status = 'completed';
      updateData.completedAt = new Date();
    }

    await prisma.userPackProgress.upsert({
      where: { userId_packId: { userId, packId: pack.packId } },
      update: updateData,
      create: {
        userId,
        packId: pack.packId,
        quizAttempts: 1,
        wrongWords: mergedWrongWords,
        quizScore: score,
        status: completed ? 'completed' : 'studying',
        completedAt: completed ? new Date() : null,
      },
    });

    const packWords = pack.words as string[];

    // If completed, add words to SRS (vocabulary packs only) and unlock next pack
    if (completed) {
      if (pack.type !== 'grammar') {
        // Upsert vocabulary entries with SRS fields
        for (const word of packWords) {
          const entry = jlptMap.get(word);
          const wasWrong = wrongWords.includes(word);

          await prisma.vocabulary.upsert({
            where: { userId_word: { userId, word } },
            update: {
              srsStage: 'learning',
              srsDueDate: wasWrong ? new Date() : new Date(Date.now() + 86400000),
              srsInterval: wasWrong ? 0 : 1,
              srsEaseFactor: 2.5,
              wrongCount: wasWrong ? { increment: 1 } : undefined,
            },
            create: {
              userId,
              word,
              furigana: entry?.furigana?.replace(/&nbsp;/g, ' ') || '',
              romaji: entry?.romaji?.replace(/&nbsp;/g, ' ') || '',
              meaningZhCN: entry?.meaning_zh_CN || '',
              jlptLevel: pack.jlptLevel,
              pos: entry?.pos || '',
              mastered: false,
              reviewCount: 0,
              sourcePackId: word,
              srsStage: 'learning',
              srsDueDate: wasWrong ? new Date() : new Date(Date.now() + 86400000),
              srsInterval: wasWrong ? 0 : 1,
              srsEaseFactor: 2.5,
              wrongCount: wasWrong ? 1 : 0,
            },
          });
        }
      }

      // Update learning stats + streak via unified service
      await recordActivity({
        userId,
        activityType: 'pack_quiz',
        wordsLearned: packWords.length,
      });

      // Unlock next pack — scoped to same jlptLevel + type
      const allPacks = await prisma.wordPack.findMany({
        where: { jlptLevel: pack.jlptLevel, type: pack.type },
        orderBy: { order: 'asc' },
      });
      const currentIdx = allPacks.findIndex(p => p.packId === pack.packId);
      if (currentIdx >= 0 && currentIdx < allPacks.length - 1) {
        const nextPack = allPacks[currentIdx + 1];
        // Create if not exists (upsert with no-op update)
        await prisma.userPackProgress.upsert({
          where: { userId_packId: { userId, packId: nextPack.packId } },
          update: {},
          create: {
            userId,
            packId: nextPack.packId,
            status: 'available',
            studiedWords: [],
            wrongWords: [],
            quizAttempts: 0,
          },
        });
      }
    }

    // For wrong words in vocab packs, update wrongCount in Vocabulary
    if (pack.type !== 'grammar' && wrongWords.length > 0) {
      await prisma.vocabulary.updateMany({
        where: { userId, word: { in: wrongWords } },
        data: { wrongCount: { increment: 1 } },
      });
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
    const packId = req.params.packId as string;
    const pack = await prisma.wordPack.findUnique({
      where: { packId },
    });
    if (!pack) {
      res.status(404).json({ error: { message: '词汇包不存在' } });
      return;
    }

    // Get user's wrong words from all completed packs (not in this pack)
    const allProgress = await prisma.userPackProgress.findMany({
      where: {
        userId,
        status: 'completed',
        packId: { not: pack.packId },
      },
    });

    const allWrongWords = allProgress.flatMap(p => (p.wrongWords as string[]));
    // Filter to words not already mastered
    const notMastered = allWrongWords.length > 0
      ? await prisma.vocabulary.findMany({
          where: {
            userId,
            word: { in: allWrongWords },
            srsStage: { not: 'mastered' },
          },
        })
      : [];

    const wrongPool = notMastered.map(v => v.word);

    const packWords = pack.words as string[];

    // Calculate injection: 15-20% of 10 questions = 1-2 wrong words
    const totalQuestions = 10;
    const injectionRate = 0.15 + Math.random() * 0.05;
    const wrongSlots = Math.min(Math.round(totalQuestions * injectionRate), wrongPool.length);
    const packSlots = totalQuestions - wrongSlots;

    // Shuffle and pick
    const shuffled = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
    const quizWrongWords = shuffled(wrongPool).slice(0, wrongSlots);
    const quizPackWords = shuffled(packWords).slice(0, packSlots);

    const isGrammar = pack.type === 'grammar';

    const quizWords = shuffled([...quizPackWords, ...quizWrongWords]).map(word => {
      if (isGrammar) {
        const entry = grammarMap.get(word);
        return {
          word,
          pattern: entry?.pattern || '',
          meaning_zh_CN: entry?.meaning_zh_CN || '',
          explanation_zh_CN: entry?.explanation_zh_CN || '',
          example: entry?.example || '',
          example_meaning_zh_CN: entry?.example_meaning_zh_CN || '',
          furigana: '',
          romaji: '',
          pos: entry?.category || '',
          isReinjected: quizWrongWords.includes(word),
        };
      }
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

    // Distractor pool — filter by the pack's actual level and type
    let distractorPool: string[];
    if (isGrammar) {
      distractorPool = grammarData
        .filter(g => g.jlptLevel === pack.jlptLevel)
        .map(g => g.meaning_zh_CN);
    } else {
      distractorPool = jlptData
        .filter(w => w.jlptLevel === pack.jlptLevel)
        .map(w => w.meaning_zh_CN);
    }

    const shuffledDistractors = shuffled(distractorPool).slice(0, 50);

    // Return both new `distractorPool` and legacy `allN5Words` for backwards compat
    res.json({
      quizWords,
      distractorPool: shuffledDistractors,
      allN5Words: shuffledDistractors,
    });
  } catch (error) {
    console.error('Quiz words error:', error);
    res.status(500).json({ error: { message: '获取测验词汇失败' } });
  }
});

export default router;
