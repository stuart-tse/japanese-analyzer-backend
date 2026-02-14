import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import {
  attachRoles,
  requirePermission,
} from "../middleware/rbac.js";
import { PERMISSIONS } from "../constants/permissions.js";
import { TEXTS } from "../constants/texts.js";

const router = Router();

router.use(requireAuth);
router.use(attachRoles);
router.use(requirePermission(PERMISSIONS.VIEW_CONTENT_ANALYTICS));

// ─── GET / — Per-content analytics for creator's published content ───
router.get("/", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;

    // Get all published content by this creator
    const publishedContent = await prisma.contentItem.findMany({
      where: { creatorId, status: "READY" },
      select: {
        id: true,
        title: true,
        titleZh: true,
        jlptLevel: true,
      },
      orderBy: { publishedAt: "desc" },
    });

    if (publishedContent.length === 0) {
      res.json({ success: true, data: [] });
      return;
    }

    const contentIds = publishedContent.map((c) => c.id);

    // Aggregate progress per content item
    const progressByContent = await prisma.userContentProgress.groupBy({
      by: ["contentItemId"],
      where: { contentItemId: { in: contentIds } },
      _count: { id: true },
      _avg: { quizScore: true },
      _sum: { quizAttempts: true },
    });

    // Count completed readers per content
    const completedByContent = await prisma.userContentProgress.groupBy({
      by: ["contentItemId"],
      where: {
        contentItemId: { in: contentIds },
        status: "completed",
      },
      _count: { id: true },
    });

    const progressMap = new Map(
      progressByContent.map((p) => [p.contentItemId, p]),
    );
    const completedMap = new Map(
      completedByContent.map((c) => [c.contentItemId, c._count.id]),
    );

    const data = publishedContent.map((content) => {
      const progress = progressMap.get(content.id);
      const readers = progress?._count.id ?? 0;
      const completed = completedMap.get(content.id) ?? 0;

      return {
        id: content.id,
        title: content.title,
        titleZh: content.titleZh,
        jlptLevel: content.jlptLevel,
        readers,
        completionRate: readers > 0 ? Math.round((completed / readers) * 100) : 0,
        avgQuizScore: Math.round(progress?._avg.quizScore ?? 0),
        quizAttempts: progress?._sum.quizAttempts ?? 0,
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Creator analytics error:", error);
    res
      .status(500)
      .json({ error: { message: TEXTS.CREATOR.ANALYTICS_FAILED } });
  }
});

export default router;
