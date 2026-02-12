import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
import { TEXTS } from '../constants/texts.js';
import type { ContentStatus } from '../generated/prisma/index.js';

const router = Router();

// ─── GET / — Browse listening library (public + optional user progress) ───
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const topicId = req.query.topicId as string | undefined;
    const jlptLevel = req.query.jlptLevel as string | undefined;
    const search = req.query.search as string | undefined;

    const where = {
      status: 'READY' as ContentStatus,
      ...(topicId ? { topicId } : {}),
      ...(jlptLevel ? { jlptLevel } : {}),
      ...(search
        ? { title: { contains: search, mode: 'insensitive' as const } }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.listeningContent.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          titleZh: true,
          imageUrl: true,
          jlptLevel: true,
          duration: true,
          sourceType: true,
          status: true,
          publishedAt: true,
          topic: { select: { id: true, name: true, nameZh: true, icon: true } },
        },
      }),
      prisma.listeningContent.count({ where }),
    ]);

    // Attach user progress if logged in
    const userId = req.jwtUser?.userId;
    let itemsWithProgress = items;
    if (userId) {
      const contentIds = items.map((i) => i.id);
      const progressRecords = await prisma.userListeningProgress.findMany({
        where: { userId, listeningContentId: { in: contentIds } },
        select: { listeningContentId: true, status: true, quizScore: true },
      });
      const progressMap = new Map(progressRecords.map((p) => [p.listeningContentId, p]));

      itemsWithProgress = items.map((item) => ({
        ...item,
        userProgress: progressMap.get(item.id) ?? null,
      }));
    }

    res.json({ items: itemsWithProgress, total, page, limit });
  } catch (error) {
    console.error('Browse listening error:', error);
    res.status(500).json({ error: { message: '获取听力内容列表失败' } });
  }
});

// ─── GET /:id — Listening content detail with segments ───
router.get('/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const content = await prisma.listeningContent.findUnique({
      where: { id: req.params.id as string },
      include: {
        topic: { select: { id: true, name: true, nameZh: true, icon: true } },
        segments: { orderBy: { orderIndex: 'asc' } },
      },
    });

    if (!content || content.status === ('ARCHIVED' as ContentStatus)) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NOT_FOUND } });
      return;
    }

    // Get user progress if logged in
    const userId = req.jwtUser?.userId;
    let userProgress = null;
    if (userId) {
      userProgress = await prisma.userListeningProgress.findUnique({
        where: {
          userId_listeningContentId: {
            userId,
            listeningContentId: req.params.id as string,
          },
        },
      });
    }

    res.json({ ...content, userProgress });
  } catch (error) {
    console.error('Get listening detail error:', error);
    res.status(500).json({ error: { message: '获取听力内容详情失败' } });
  }
});

// ─── GET /:id/quiz — Get listening quiz questions ───
router.get('/:id/quiz', optionalAuth, async (req: Request, res: Response) => {
  try {
    const questions = await prisma.generatedQuestion.findMany({
      where: { listeningContentId: req.params.id as string },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        type: true,
        prompt: true,
        options: true,
        jlptLevel: true,
        audioClip: true,
      },
    });

    if (questions.length === 0) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NO_QUIZ } });
      return;
    }

    res.json(questions);
  } catch (error) {
    console.error('Get listening quiz error:', error);
    res.status(500).json({ error: { message: '获取听力测验失败' } });
  }
});

// ─── POST /:id/quiz/submit — Submit listening quiz answers ───
router.post('/:id/quiz/submit', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const listeningContentId = req.params.id as string;
    const { answers } = req.body as {
      answers: Array<{ questionId: string; answer: string }>;
    };

    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({ error: { message: '请提交答案' } });
      return;
    }

    // Fetch all questions with correct answers
    const questions = await prisma.generatedQuestion.findMany({
      where: { listeningContentId },
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
        type: question.type,
      };
    });

    const score = Math.round((correct / Math.max(answers.length, 1)) * 100);

    // Update user progress
    await prisma.userListeningProgress.upsert({
      where: {
        userId_listeningContentId: { userId, listeningContentId },
      },
      update: {
        quizScore: score,
        quizAttempts: { increment: 1 },
      },
      create: {
        userId,
        listeningContentId,
        status: 'listening',
        quizScore: score,
        quizAttempts: 1,
      },
    });

    res.json({
      score,
      correct,
      total: answers.length,
      readingScore: 0,
      listeningScore: score,
      results,
      message: TEXTS.LISTENING.QUIZ_SUBMIT_SUCCESS,
    });
  } catch (error) {
    console.error('Submit listening quiz error:', error);
    res.status(500).json({ error: { message: '提交听力测验失败' } });
  }
});

// ─── POST /:id/progress — Update listening progress ───
router.post('/:id/progress', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const listeningContentId = req.params.id as string;
    const { status, lastSegmentIndex, totalListens } = req.body as {
      status?: string;
      lastSegmentIndex?: number;
      totalListens?: number;
    };

    await prisma.userListeningProgress.upsert({
      where: {
        userId_listeningContentId: { userId, listeningContentId },
      },
      update: {
        ...(status !== undefined ? { status } : {}),
        ...(lastSegmentIndex !== undefined ? { lastSegmentIndex } : {}),
        ...(totalListens !== undefined ? { totalListens } : {}),
      },
      create: {
        userId,
        listeningContentId,
        status: status || 'listening',
        lastSegmentIndex: lastSegmentIndex ?? 0,
        totalListens: totalListens ?? 1,
      },
    });

    res.json({ message: TEXTS.LISTENING.PROGRESS_UPDATED });
  } catch (error) {
    console.error('Update listening progress error:', error);
    res.status(500).json({ error: { message: '更新收听进度失败' } });
  }
});

export default router;
