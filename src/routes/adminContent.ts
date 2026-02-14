import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { attachRoles, requireRole } from '../middleware/rbac.js';
import { ROLES } from '../constants/permissions.js';
import { processContent } from '../services/contentPipeline.js';
import { TEXTS } from '../constants/texts.js';
import type { ContentStatus, ContentType } from '../generated/prisma/index.js';

const router = Router();

// All routes require auth + admin
router.use(requireAuth);
router.use(attachRoles);
router.use(requireRole(ROLES.ADMIN));

// ─── POST /import — Import content from URL ───
router.post('/import', async (req: Request, res: Response) => {
  try {
    const { url, topicId, contentType } = req.body as {
      url?: string;
      topicId?: string;
      contentType?: string;
    };

    if (!url) {
      res.status(400).json({ error: { message: TEXTS.CONTENT.URL_REQUIRED } });
      return;
    }

    try {
      new URL(url);
    } catch {
      res.status(400).json({ error: { message: TEXTS.CONTENT.INVALID_URL } });
      return;
    }

    // Create content item
    const contentItem = await prisma.contentItem.create({
      data: {
        title: url, // Will be updated by scraper
        rawText: '', // Will be populated by scraper
        url,
        topicId: topicId || null,
        contentType: (contentType as ContentType) || 'ARTICLE',
        status: 'PROCESSING' as ContentStatus,
      },
    });

    // Create import job
    const job = await prisma.contentImportJob.create({
      data: {
        contentItemId: contentItem.id,
        url,
        status: 'pending',
        progress: 0,
      },
    });

    // Run pipeline (synchronous for MVP)
    processContent(contentItem.id).catch((err) => {
      console.error('Pipeline background error:', err);
    });

    res.status(201).json({
      contentItemId: contentItem.id,
      jobId: job.id,
      message: TEXTS.CONTENT.IMPORT_STARTED,
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ error: { message: TEXTS.CONTENT.IMPORT_FAILED } });
  }
});

// ─── GET /jobs — List all import jobs ───
router.get('/jobs', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      prisma.contentImportJob.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          contentItem: {
            select: { id: true, title: true, status: true, jlptLevel: true },
          },
        },
      }),
      prisma.contentImportJob.count(),
    ]);

    res.json({ jobs, total, page, limit });
  } catch (error) {
    console.error('List jobs error:', error);
    res.status(500).json({ error: { message: '获取导入任务失败' } });
  }
});

// ─── GET /jobs/:id — Single job status ───
router.get('/jobs/:id', async (req: Request, res: Response) => {
  try {
    const job = await prisma.contentImportJob.findUnique({
      where: { id: req.params.id as string },
      include: {
        contentItem: {
          select: { id: true, title: true, status: true, jlptLevel: true },
        },
      },
    });

    if (!job) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: { message: '获取任务详情失败' } });
  }
});

// ─── PATCH /:id — Edit content metadata ───
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { topicId, jlptLevel, status, publishedAt, titleZh, title } = req.body as {
      topicId?: string;
      jlptLevel?: string;
      status?: string;
      publishedAt?: string;
      titleZh?: string;
      title?: string;
    };

    const existing = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    const updated = await prisma.contentItem.update({
      where: { id: req.params.id as string },
      data: {
        ...(topicId !== undefined ? { topicId } : {}),
        ...(jlptLevel !== undefined ? { jlptLevel } : {}),
        ...(status !== undefined ? { status: status as ContentStatus } : {}),
        ...(publishedAt !== undefined ? { publishedAt: new Date(publishedAt) } : {}),
        ...(titleZh !== undefined ? { titleZh } : {}),
        ...(title !== undefined ? { title } : {}),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: { message: '更新内容失败' } });
  }
});

// ─── DELETE /:id — Soft delete (archive) ───
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    await prisma.contentItem.update({
      where: { id: req.params.id as string },
      data: { status: 'ARCHIVED' as ContentStatus },
    });

    res.json({ message: TEXTS.CONTENT.ARCHIVE_SUCCESS });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ error: { message: '归档内容失败' } });
  }
});

// ─── POST /:id/publish — Publish content ───
router.post('/:id/publish', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    await prisma.contentItem.update({
      where: { id: req.params.id as string },
      data: {
        status: 'READY' as ContentStatus,
        publishedAt: new Date(),
      },
    });

    res.json({ message: TEXTS.CONTENT.PUBLISH_SUCCESS });
  } catch (error) {
    console.error('Publish error:', error);
    res.status(500).json({ error: { message: '发布内容失败' } });
  }
});

// ─── POST /:id/retry — Retry failed pipeline ───
router.post('/:id/retry', async (req: Request, res: Response) => {
  try {
    const contentItem = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
      include: { importJob: true },
    });

    if (!contentItem) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    // Reset status
    await prisma.contentItem.update({
      where: { id: req.params.id as string },
      data: { status: 'PROCESSING' as ContentStatus },
    });

    if (contentItem.importJob) {
      await prisma.contentImportJob.update({
        where: { id: contentItem.importJob.id },
        data: { status: 'pending', progress: 0, error: null },
      });
    }

    // Re-run pipeline
    processContent(req.params.id as string).catch((err) => {
      console.error('Retry pipeline error:', err);
    });

    res.json({ message: TEXTS.CONTENT.IMPORT_STARTED });
  } catch (error) {
    console.error('Retry error:', error);
    res.status(500).json({ error: { message: '重试失败' } });
  }
});

// ─── GET / — List all content (admin view) ───
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;
    const status = req.query.status as string | undefined;

    const where = status ? { status: status as ContentStatus } : {};

    const [items, total] = await Promise.all([
      prisma.contentItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          titleZh: true,
          url: true,
          contentType: true,
          status: true,
          jlptLevel: true,
          wordCount: true,
          estimatedMinutes: true,
          publishedAt: true,
          createdAt: true,
          topic: { select: { id: true, name: true, nameZh: true, icon: true } },
          importJob: { select: { id: true, status: true, progress: true, error: true } },
        },
      }),
      prisma.contentItem.count({ where }),
    ]);

    res.json({ items, total, page, limit });
  } catch (error) {
    console.error('List content error:', error);
    res.status(500).json({ error: { message: '获取内容列表失败' } });
  }
});

export default router;
