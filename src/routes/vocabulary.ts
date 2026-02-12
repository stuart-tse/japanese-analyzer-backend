import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../config/prisma.js';

const router = Router();

// GET /vocabulary — list user's saved words
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.vocabulary.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.vocabulary.count({ where: { userId } }),
    ]);

    res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Vocabulary list error:', error);
    res.status(500).json({ error: { message: '获取词汇列表失败' } });
  }
});

// POST /vocabulary — add a word
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { word, furigana, romaji, meaning_zh_CN, jlptLevel, pos, notes } = req.body;

    if (!word) {
      res.status(400).json({ error: { message: '缺少单词' } });
      return;
    }

    // Upsert: update if already exists, auto-enroll in SRS for new words
    const vocab = await prisma.vocabulary.upsert({
      where: { userId_word: { userId, word } },
      update: {
        furigana: furigana ?? undefined,
        romaji: romaji ?? undefined,
        meaningZhCN: meaning_zh_CN ?? undefined,
        jlptLevel: jlptLevel ?? undefined,
        pos: pos ?? undefined,
        notes: notes ?? undefined,
      },
      create: {
        userId,
        word,
        furigana: furigana || '',
        romaji: romaji || '',
        meaningZhCN: meaning_zh_CN || '',
        jlptLevel: jlptLevel || '',
        pos: pos || '',
        notes,
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

    res.status(201).json(vocab);
  } catch (error) {
    console.error('Vocabulary add error:', error);
    res.status(500).json({ error: { message: '保存词汇失败' } });
  }
});

// POST /vocabulary/batch — save multiple words in a transaction
router.post('/batch', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { words } = req.body;

    if (!Array.isArray(words) || words.length === 0) {
      res.status(400).json({ error: { message: '请提供词汇数组' } });
      return;
    }

    if (words.length > 30) {
      res.status(400).json({ error: { message: '每次最多保存30个词汇' } });
      return;
    }

    // Validate individual field lengths
    for (const item of words) {
      if (item.word && item.word.length > 100) {
        res.status(400).json({ error: { message: '单词长度不能超过100字符' } });
        return;
      }
      if (item.notes && item.notes.length > 500) {
        res.status(400).json({ error: { message: '备注长度不能超过500字符' } });
        return;
      }
    }

    const results: Array<{ word: string; status: 'created' | 'updated' | 'error'; error?: string }> = [];

    await prisma.$transaction(async (tx) => {
      for (const item of words) {
        if (!item.word) {
          results.push({ word: '', status: 'error', error: '缺少单词' });
          continue;
        }

        try {
          const existing = await tx.vocabulary.findUnique({
            where: { userId_word: { userId, word: item.word } },
          });

          await tx.vocabulary.upsert({
            where: { userId_word: { userId, word: item.word } },
            update: {
              furigana: item.furigana ?? undefined,
              romaji: item.romaji ?? undefined,
              meaningZhCN: item.meaning_zh_CN ?? undefined,
              jlptLevel: item.jlptLevel ?? undefined,
              pos: item.pos ?? undefined,
              notes: item.notes ?? undefined,
            },
            create: {
              userId,
              word: item.word,
              furigana: item.furigana || '',
              romaji: item.romaji || '',
              meaningZhCN: item.meaning_zh_CN || '',
              jlptLevel: item.jlptLevel || '',
              pos: item.pos || '',
              notes: item.notes,
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

          results.push({ word: item.word, status: existing ? 'updated' : 'created' });
        } catch (err) {
          results.push({ word: item.word, status: 'error', error: '保存失败' });
        }
      }
    });

    const saved = results.filter(r => r.status !== 'error').length;
    res.status(201).json({ saved, results });
  } catch (error) {
    console.error('Vocabulary batch save error:', error);
    res.status(500).json({ error: { message: '批量保存词汇失败' } });
  }
});

// DELETE /vocabulary/:id — remove a word
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;

    const existing = await prisma.vocabulary.findFirst({
      where: { id: req.params.id as string, userId },
    });

    if (!existing) {
      res.status(404).json({ error: { message: '词汇不存在' } });
      return;
    }

    await prisma.vocabulary.delete({ where: { id: existing.id } });

    res.json({ success: true });
  } catch (error) {
    console.error('Vocabulary delete error:', error);
    res.status(500).json({ error: { message: '删除词汇失败' } });
  }
});

export default router;
