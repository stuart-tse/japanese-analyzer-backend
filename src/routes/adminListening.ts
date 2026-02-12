import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { processListeningContent } from '../services/listeningPipeline.js';
import { generateAudioUploadUrl } from '../services/s3Service.js';
import { TEXTS } from '../constants/texts.js';
import type { ContentStatus, ListeningSourceType } from '../generated/prisma/index.js';

const router = Router();

// All routes require auth + admin
router.use(requireAuth);
router.use(requireAdmin);

// ─── GET / — List all listening content (admin view) ───
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;
    const status = req.query.status as string | undefined;

    const where = status ? { status: status as ContentStatus } : {};

    const [items, total] = await Promise.all([
      prisma.listeningContent.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          titleZh: true,
          sourceType: true,
          audioUrl: true,
          duration: true,
          jlptLevel: true,
          status: true,
          publishedAt: true,
          createdAt: true,
          topic: { select: { id: true, name: true, nameZh: true, icon: true } },
          _count: { select: { questions: true, segments: true } },
        },
      }),
      prisma.listeningContent.count({ where }),
    ]);

    res.json({ items, total, page, limit });
  } catch (error) {
    console.error('List listening content error:', error);
    res.status(500).json({ error: { message: '获取听力内容列表失败' } });
  }
});

// ─── POST /create — Create listening content ───
router.post('/create', async (req: Request, res: Response) => {
  try {
    const {
      title,
      titleZh,
      description,
      descriptionZh,
      imageUrl,
      sourceType,
      audioUrl,
      duration,
      transcript,
      topicId,
      jlptLevel,
    } = req.body as {
      title?: string;
      titleZh?: string;
      description?: string;
      descriptionZh?: string;
      imageUrl?: string;
      sourceType?: string;
      audioUrl?: string;
      duration?: number;
      transcript?: string;
      topicId?: string;
      jlptLevel?: string;
    };

    if (!title) {
      res.status(400).json({ error: { message: TEXTS.LISTENING.TITLE_REQUIRED } });
      return;
    }

    if (!transcript) {
      res.status(400).json({ error: { message: TEXTS.LISTENING.TRANSCRIPT_REQUIRED } });
      return;
    }

    if (!sourceType || !['UPLOAD', 'URL'].includes(sourceType)) {
      res.status(400).json({ error: { message: TEXTS.LISTENING.SOURCE_TYPE_REQUIRED } });
      return;
    }

    if (sourceType === 'URL' && !audioUrl) {
      res.status(400).json({ error: { message: TEXTS.LISTENING.AUDIO_URL_REQUIRED } });
      return;
    }

    const content = await prisma.listeningContent.create({
      data: {
        title,
        titleZh: titleZh || '',
        description: description || null,
        descriptionZh: descriptionZh || null,
        imageUrl: imageUrl || null,
        sourceType: sourceType as ListeningSourceType,
        audioUrl: audioUrl || '',
        duration: duration || null,
        transcript,
        topicId: topicId || null,
        jlptLevel: jlptLevel || 'N3',
        status: 'DRAFT' as ContentStatus,
      },
    });

    res.status(201).json({
      id: content.id,
      message: TEXTS.LISTENING.CREATE_SUCCESS,
    });
  } catch (error) {
    console.error('Create listening content error:', error);
    res.status(500).json({ error: { message: '创建听力内容失败' } });
  }
});

// ─── POST /:id/upload-url — Get presigned S3 upload URL for MP3 ───
router.post('/:id/upload-url', async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id as string;
    const existing = await prisma.listeningContent.findUnique({
      where: { id: contentId },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NOT_FOUND } });
      return;
    }

    const { uploadUrl, objectUrl, s3Key } = await generateAudioUploadUrl(contentId);

    res.json({
      uploadUrl,
      objectUrl,
      s3Key,
      message: TEXTS.LISTENING.UPLOAD_URL_GENERATED,
    });
  } catch (error) {
    console.error('Generate upload URL error:', error);
    res.status(500).json({ error: { message: '生成上传链接失败' } });
  }
});

// ─── POST /:id/finalize-upload — Confirm upload done, set audioUrl, trigger pipeline ───
router.post('/:id/finalize-upload', async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id as string;
    const { objectUrl, s3Key, duration } = req.body as {
      objectUrl: string;
      s3Key: string;
      duration?: number;
    };

    const existing = await prisma.listeningContent.findUnique({
      where: { id: contentId },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NOT_FOUND } });
      return;
    }

    await prisma.listeningContent.update({
      where: { id: contentId },
      data: {
        audioUrl: objectUrl,
        audioS3Key: s3Key,
        ...(duration ? { duration } : {}),
      },
    });

    // Trigger pipeline in background
    processListeningContent(contentId).catch((err) => {
      console.error('Listening pipeline background error:', err);
    });

    res.json({ message: TEXTS.LISTENING.UPLOAD_FINALIZED });
  } catch (error) {
    console.error('Finalize upload error:', error);
    res.status(500).json({ error: { message: '确认上传失败' } });
  }
});

// ─── POST /:id/process — Manually trigger AI pipeline ───
router.post('/:id/process', async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id as string;
    const existing = await prisma.listeningContent.findUnique({
      where: { id: contentId },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NOT_FOUND } });
      return;
    }

    processListeningContent(contentId).catch((err) => {
      console.error('Listening pipeline background error:', err);
    });

    res.json({ message: TEXTS.LISTENING.PIPELINE_STARTED });
  } catch (error) {
    console.error('Process listening error:', error);
    res.status(500).json({ error: { message: TEXTS.LISTENING.PIPELINE_FAILED } });
  }
});

// ─── PATCH /:id — Edit metadata, transcript, segments ───
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id as string;
    const {
      title,
      titleZh,
      description,
      descriptionZh,
      imageUrl,
      audioUrl,
      duration,
      transcript,
      topicId,
      jlptLevel,
    } = req.body as Record<string, unknown>;

    const existing = await prisma.listeningContent.findUnique({
      where: { id: contentId },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NOT_FOUND } });
      return;
    }

    const updated = await prisma.listeningContent.update({
      where: { id: contentId },
      data: {
        ...(title !== undefined ? { title: title as string } : {}),
        ...(titleZh !== undefined ? { titleZh: titleZh as string } : {}),
        ...(description !== undefined ? { description: description as string } : {}),
        ...(descriptionZh !== undefined ? { descriptionZh: descriptionZh as string } : {}),
        ...(imageUrl !== undefined ? { imageUrl: imageUrl as string } : {}),
        ...(audioUrl !== undefined ? { audioUrl: audioUrl as string } : {}),
        ...(duration !== undefined ? { duration: duration as number } : {}),
        ...(transcript !== undefined ? { transcript: transcript as string } : {}),
        ...(topicId !== undefined ? { topicId: (topicId as string) || null } : {}),
        ...(jlptLevel !== undefined ? { jlptLevel: jlptLevel as string } : {}),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('Update listening content error:', error);
    res.status(500).json({ error: { message: '更新听力内容失败' } });
  }
});

// ─── POST /:id/publish — Publish listening content ───
router.post('/:id/publish', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.listeningContent.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NOT_FOUND } });
      return;
    }

    await prisma.listeningContent.update({
      where: { id: req.params.id as string },
      data: {
        status: 'READY' as ContentStatus,
        publishedAt: new Date(),
      },
    });

    res.json({ message: TEXTS.LISTENING.PUBLISH_SUCCESS });
  } catch (error) {
    console.error('Publish listening error:', error);
    res.status(500).json({ error: { message: '发布听力内容失败' } });
  }
});

// ─── DELETE /:id — Soft delete (archive) ───
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.listeningContent.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.LISTENING.NOT_FOUND } });
      return;
    }

    await prisma.listeningContent.update({
      where: { id: req.params.id as string },
      data: { status: 'ARCHIVED' as ContentStatus },
    });

    res.json({ message: TEXTS.LISTENING.ARCHIVE_SUCCESS });
  } catch (error) {
    console.error('Archive listening error:', error);
    res.status(500).json({ error: { message: '归档听力内容失败' } });
  }
});

export default router;
