import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
import { TEXTS } from '../constants/texts.js';
import type { ContentStatus } from '../generated/prisma/index.js';

const router = Router();

// ─── GET / — Browse library (public + optional user progress) ───
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const topicId = req.query.topicId as string | undefined;
    const jlptLevel = req.query.jlptLevel as string | undefined;
    const contentType = req.query.contentType as string | undefined;
    const search = req.query.search as string | undefined;

    const where = {
      status: 'READY' as ContentStatus,
      ...(topicId ? { topicId } : {}),
      ...(jlptLevel ? { jlptLevel } : {}),
      ...(contentType ? { contentType: contentType as never } : {}),
      ...(search
        ? { title: { contains: search, mode: 'insensitive' as const } }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.contentItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          titleZh: true,
          url: true,
          imageUrl: true,
          contentType: true,
          status: true,
          jlptLevel: true,
          wordCount: true,
          estimatedMinutes: true,
          summary: true,
          publishedAt: true,
          createdAt: true,
          topic: { select: { id: true, name: true, nameZh: true, icon: true } },
        },
      }),
      prisma.contentItem.count({ where }),
    ]);

    // Attach user progress if logged in
    const userId = req.jwtUser?.userId;
    let itemsWithProgress = items;
    if (userId) {
      const contentIds = items.map((i) => i.id);
      const progressRecords = await prisma.userContentProgress.findMany({
        where: { userId, contentItemId: { in: contentIds } },
        select: { contentItemId: true, status: true, quizScore: true },
      });
      const progressMap = new Map(progressRecords.map((p) => [p.contentItemId, p]));

      itemsWithProgress = items.map((item) => ({
        ...item,
        userProgress: progressMap.get(item.id) ?? null,
      }));
    }

    res.json({ items: itemsWithProgress, total, page, limit });
  } catch (error) {
    console.error('Browse content error:', error);
    res.status(500).json({ error: { message: '获取内容列表失败' } });
  }
});

// ─── GET /:id — Article detail with sections ───
router.get('/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const contentItem = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
      include: {
        topic: { select: { id: true, name: true, nameZh: true, icon: true } },
        source: { select: { id: true, name: true, type: true } },
        sections: { orderBy: { orderIndex: 'asc' } },
      },
    });

    if (!contentItem || contentItem.status === 'ARCHIVED') {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    // Get user progress if logged in
    const userId = req.jwtUser?.userId;
    let userProgress = null;
    if (userId) {
      userProgress = await prisma.userContentProgress.findUnique({
        where: { userId_contentItemId: { userId, contentItemId: req.params.id as string } },
      });
    }

    res.json({ ...contentItem, userProgress });
  } catch (error) {
    console.error('Get content detail error:', error);
    res.status(500).json({ error: { message: '获取内容详情失败' } });
  }
});

// ─── POST /:id/save-word — Save word to SRS ───
router.post('/:id/save-word', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const contentItemId = req.params.id as string;
    const { word, furigana, pos, meaningZh, contextSentence } = req.body as {
      word?: string;
      furigana?: string;
      pos?: string;
      meaningZh?: string;
      contextSentence?: string;
    };

    if (!word) {
      res.status(400).json({ error: { message: '缺少单词' } });
      return;
    }

    // Upsert into Vocabulary (existing SRS model)
    const vocab = await prisma.vocabulary.upsert({
      where: { userId_word: { userId, word } },
      update: {
        furigana: furigana ?? undefined,
        meaningZhCN: meaningZh ?? undefined,
        pos: pos ?? undefined,
        notes: contextSentence ? `来源: 内容库 | ${contextSentence}` : undefined,
      },
      create: {
        userId,
        word,
        furigana: furigana || '',
        romaji: '',
        meaningZhCN: meaningZh || '',
        jlptLevel: '',
        pos: pos || '',
        notes: contextSentence ? `来源: 内容库 | ${contextSentence}` : null,
        mastered: false,
        reviewCount: 0,
        srsStage: 'learning',
        srsInterval: 0,
        srsEaseFactor: 2.5,
        srsDueDate: new Date(),
        wrongCount: 0,
        sourcePackId: null,
      },
    });

    // Also track in user progress savedWords
    const progress = await prisma.userContentProgress.findUnique({
      where: { userId_contentItemId: { userId, contentItemId } },
    });

    if (progress) {
      const savedWords = (progress.savedWords as string[]) || [];
      if (!savedWords.includes(word)) {
        await prisma.userContentProgress.update({
          where: { id: progress.id },
          data: { savedWords: [...savedWords, word] as never },
        });
      }
    }

    res.status(201).json({ vocab, message: TEXTS.CONTENT.WORD_SAVED });
  } catch (error) {
    console.error('Save word error:', error);
    res.status(500).json({ error: { message: '保存单词失败' } });
  }
});

// ─── GET /:id/quiz — Get generated questions ───
router.get('/:id/quiz', optionalAuth, async (req: Request, res: Response) => {
  try {
    const questions = await prisma.generatedQuestion.findMany({
      where: { contentItemId: req.params.id as string },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        type: true,
        prompt: true,
        options: true,
        jlptLevel: true,
      },
    });

    if (questions.length === 0) {
      res.status(404).json({ error: { message: '暂无测验题目' } });
      return;
    }

    res.json(questions);
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ error: { message: '获取测验失败' } });
  }
});

// ─── POST /:id/quiz/submit — Submit quiz answers ───
router.post('/:id/quiz/submit', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const contentItemId = req.params.id as string;
    const { answers } = req.body as {
      answers: Array<{ questionId: string; answer: string }>;
    };

    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({ error: { message: '请提交答案' } });
      return;
    }

    // Fetch all questions with correct answers
    const questions = await prisma.generatedQuestion.findMany({
      where: { contentItemId },
    });

    const questionMap = new Map(questions.map((q) => [q.id, q]));

    let correct = 0;
    const results = answers.map((a) => {
      const question = questionMap.get(a.questionId);
      if (!question) {
        return { questionId: a.questionId, correct: false, error: 'Question not found' };
      }

      const isCorrect =
        a.answer.trim().toLowerCase() === question.answer.trim().toLowerCase();
      if (isCorrect) correct++;

      return {
        questionId: a.questionId,
        correct: isCorrect,
        correctAnswer: question.answer,
        explanation: question.explanation,
        explanationWrong: !isCorrect ? question.explanationWrong : null,
      };
    });

    const score = Math.round((correct / Math.max(answers.length, 1)) * 100);

    // Update user progress
    await prisma.userContentProgress.upsert({
      where: { userId_contentItemId: { userId, contentItemId } },
      update: {
        quizScore: score,
        quizAttempts: { increment: 1 },
      },
      create: {
        userId,
        contentItemId,
        status: 'reading',
        quizScore: score,
        quizAttempts: 1,
      },
    });

    res.json({
      score,
      correct,
      total: answers.length,
      results,
      message: TEXTS.CONTENT.QUIZ_SUBMIT_SUCCESS,
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: { message: '提交测验失败' } });
  }
});

// ─── POST /:id/progress — Update reading progress ───
router.post('/:id/progress', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const contentItemId = req.params.id as string;
    const { status, lastSectionIndex } = req.body as {
      status?: string;
      lastSectionIndex?: number;
    };

    await prisma.userContentProgress.upsert({
      where: { userId_contentItemId: { userId, contentItemId } },
      update: {
        ...(status !== undefined ? { status } : {}),
        ...(lastSectionIndex !== undefined ? { lastSectionIndex } : {}),
      },
      create: {
        userId,
        contentItemId,
        status: status || 'reading',
        lastSectionIndex: lastSectionIndex ?? 0,
      },
    });

    res.json({ message: TEXTS.CONTENT.PROGRESS_UPDATED });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: { message: '更新进度失败' } });
  }
});

export default router;
