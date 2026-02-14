import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { attachRoles, requireRole } from "../middleware/rbac.js";
import { ROLES } from "../constants/permissions.js";
import { TEXTS } from "../constants/texts.js";
import { processContent } from "../services/contentPipeline.js";
import type { ContentStatus, ContentType } from "../generated/prisma/index.js";

const router = Router();

router.use(requireAuth);
router.use(attachRoles);
router.use(requireRole(ROLES.CREATOR));

// ─── GET / — List creator's content (paginated + filtered) ───
router.get("/", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;
    const status = req.query.status as string | undefined;
    const contentType = req.query.contentType as string | undefined;
    const jlptLevel = req.query.jlptLevel as string | undefined;

    const where = {
      creatorId,
      ...(status ? { status: status as ContentStatus } : {}),
      ...(contentType ? { contentType: contentType as ContentType } : {}),
      ...(jlptLevel ? { jlptLevel } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.contentItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
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

    res.json({
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Creator list content error:", error);
    res.status(500).json({ error: { message: TEXTS.CREATOR.LIST_FAILED } });
  }
});

// ─── POST /import — Import content from URL ───
router.post("/import", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;
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

    const contentItem = await prisma.contentItem.create({
      data: {
        title: url,
        rawText: "",
        url,
        topicId: topicId || null,
        contentType: (contentType as ContentType) || "ARTICLE",
        status: "PROCESSING" as ContentStatus,
        creatorId,
      },
    });

    const job = await prisma.contentImportJob.create({
      data: {
        contentItemId: contentItem.id,
        url,
        status: "pending",
        progress: 0,
      },
    });

    processContent(contentItem.id).catch((err) => {
      console.error("Creator pipeline background error:", err);
    });

    res.status(201).json({
      contentItemId: contentItem.id,
      jobId: job.id,
      message: TEXTS.CONTENT.IMPORT_STARTED,
    });
  } catch (error) {
    console.error("Creator import error:", error);
    res.status(500).json({ error: { message: TEXTS.CREATOR.IMPORT_FAILED } });
  }
});

// ─── PATCH /:id — Edit content metadata ───
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;
    const existing = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    if (existing.creatorId !== creatorId) {
      res.status(403).json({ error: { message: TEXTS.CREATOR.NOT_OWNER } });
      return;
    }

    const { title, titleZh, topicId, jlptLevel } = req.body as {
      title?: string;
      titleZh?: string;
      topicId?: string;
      jlptLevel?: string;
    };

    const updated = await prisma.contentItem.update({
      where: { id: req.params.id as string },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(titleZh !== undefined ? { titleZh } : {}),
        ...(topicId !== undefined ? { topicId } : {}),
        ...(jlptLevel !== undefined ? { jlptLevel } : {}),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Creator update content error:", error);
    res.status(500).json({ error: { message: TEXTS.CREATOR.UPDATE_FAILED } });
  }
});

// ─── PATCH /:id/status — Submit for review or unpublish ───
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;
    const existing = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    if (existing.creatorId !== creatorId) {
      res.status(403).json({ error: { message: TEXTS.CREATOR.NOT_OWNER } });
      return;
    }

    const { status } = req.body as { status?: string };

    // Only allow DRAFT→PROCESSING (submit) or READY→DRAFT (unpublish)
    const allowedTransitions: Record<string, string[]> = {
      DRAFT: ["PROCESSING"],
      READY: ["DRAFT"],
    };

    const allowed = allowedTransitions[existing.status] || [];
    if (!status || !allowed.includes(status)) {
      res.status(400).json({
        error: { message: TEXTS.CREATOR.STATUS_UPDATE_FAILED },
      });
      return;
    }

    if (status === "PROCESSING") {
      await prisma.contentItem.update({
        where: { id: req.params.id as string },
        data: { status: "PROCESSING" as ContentStatus },
      });

      processContent(req.params.id as string).catch((err) => {
        console.error("Creator submit pipeline error:", err);
      });
    } else {
      await prisma.contentItem.update({
        where: { id: req.params.id as string },
        data: {
          status: status as ContentStatus,
          ...(status === "DRAFT" ? { publishedAt: null } : {}),
        },
      });
    }

    res.json({ message: TEXTS.CONTENT.PROGRESS_UPDATED });
  } catch (error) {
    console.error("Creator status update error:", error);
    res
      .status(500)
      .json({ error: { message: TEXTS.CREATOR.STATUS_UPDATE_FAILED } });
  }
});

// ─── DELETE /:id — Soft delete to ARCHIVED ───
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;
    const existing = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existing) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    if (existing.creatorId !== creatorId) {
      res.status(403).json({ error: { message: TEXTS.CREATOR.NOT_OWNER } });
      return;
    }

    await prisma.contentItem.update({
      where: { id: req.params.id as string },
      data: { status: "ARCHIVED" as ContentStatus },
    });

    res.json({ message: TEXTS.CONTENT.ARCHIVE_SUCCESS });
  } catch (error) {
    console.error("Creator archive error:", error);
    res.status(500).json({ error: { message: TEXTS.CREATOR.ARCHIVE_FAILED } });
  }
});

// ─── POST /:id/retry — Retry failed pipeline ───
router.post("/:id/retry", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;
    const contentItem = await prisma.contentItem.findUnique({
      where: { id: req.params.id as string },
      include: { importJob: true },
    });

    if (!contentItem) {
      res.status(404).json({ error: { message: TEXTS.CONTENT.NOT_FOUND } });
      return;
    }

    if (contentItem.creatorId !== creatorId) {
      res.status(403).json({ error: { message: TEXTS.CREATOR.NOT_OWNER } });
      return;
    }

    await prisma.contentItem.update({
      where: { id: req.params.id as string },
      data: { status: "PROCESSING" as ContentStatus },
    });

    if (contentItem.importJob) {
      await prisma.contentImportJob.update({
        where: { id: contentItem.importJob.id },
        data: { status: "pending", progress: 0, error: null },
      });
    }

    processContent(req.params.id as string).catch((err) => {
      console.error("Creator retry pipeline error:", err);
    });

    res.json({ message: TEXTS.CONTENT.IMPORT_STARTED });
  } catch (error) {
    console.error("Creator retry error:", error);
    res.status(500).json({ error: { message: TEXTS.CREATOR.RETRY_FAILED } });
  }
});

export default router;
