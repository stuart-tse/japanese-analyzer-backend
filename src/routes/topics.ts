import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { TEXTS } from '../constants/texts.js';

const router = Router();

// ─── GET / — List all topics (public, no auth) ───
router.get('/', async (_req: Request, res: Response) => {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        nameZh: true,
        nameJa: true,
        icon: true,
        sortOrder: true,
        _count: { select: { content: { where: { status: 'READY' } } } },
      },
    });

    res.json(topics);
  } catch (error) {
    console.error('List topics error:', error);
    res.status(500).json({ error: { message: '获取话题列表失败' } });
  }
});

// ─── POST /admin — Create topic (admin only) ───
router.post(
  '/admin',
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const { name, nameZh, nameJa, icon, sortOrder } = req.body as {
        name?: string;
        nameZh?: string;
        nameJa?: string;
        icon?: string;
        sortOrder?: number;
      };

      if (!name || !nameZh) {
        res.status(400).json({ error: { message: TEXTS.TOPIC.NAME_REQUIRED } });
        return;
      }

      const existing = await prisma.topic.findUnique({ where: { name } });
      if (existing) {
        res.status(409).json({ error: { message: TEXTS.TOPIC.ALREADY_EXISTS } });
        return;
      }

      const topic = await prisma.topic.create({
        data: {
          name,
          nameZh,
          nameJa: nameJa || '',
          icon: icon || '',
          sortOrder: sortOrder ?? 0,
        },
      });

      res.status(201).json(topic);
    } catch (error) {
      console.error('Create topic error:', error);
      res.status(500).json({ error: { message: '创建话题失败' } });
    }
  }
);

// ─── PATCH /admin/:id — Update topic (admin only) ───
router.patch(
  '/admin/:id',
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const { name, nameZh, nameJa, icon, sortOrder } = req.body as {
        name?: string;
        nameZh?: string;
        nameJa?: string;
        icon?: string;
        sortOrder?: number;
      };

      const existing = await prisma.topic.findUnique({
        where: { id: req.params.id as string },
      });

      if (!existing) {
        res.status(404).json({ error: { message: TEXTS.TOPIC.NOT_FOUND } });
        return;
      }

      const updated = await prisma.topic.update({
        where: { id: req.params.id as string },
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(nameZh !== undefined ? { nameZh } : {}),
          ...(nameJa !== undefined ? { nameJa } : {}),
          ...(icon !== undefined ? { icon } : {}),
          ...(sortOrder !== undefined ? { sortOrder } : {}),
        },
      });

      res.json(updated);
    } catch (error) {
      console.error('Update topic error:', error);
      res.status(500).json({ error: { message: '更新话题失败' } });
    }
  }
);

export default router;
