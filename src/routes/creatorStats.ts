import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { attachRoles, requireRole } from "../middleware/rbac.js";
import { ROLES } from "../constants/permissions.js";
import { TEXTS } from "../constants/texts.js";

const router = Router();

router.use(requireAuth);
router.use(attachRoles);
router.use(requireRole(ROLES.CREATOR));

// ─── GET / — Creator KPI stats ───
router.get("/", async (req: Request, res: Response) => {
  try {
    const creatorId = req.jwtUser!.userId;

    const [totalContent, draftCount, publishedCount, processingCount] =
      await Promise.all([
        prisma.contentItem.count({ where: { creatorId } }),
        prisma.contentItem.count({
          where: { creatorId, status: "DRAFT" },
        }),
        prisma.contentItem.count({
          where: { creatorId, status: "READY" },
        }),
        prisma.contentItem.count({
          where: { creatorId, status: "PROCESSING" },
        }),
      ]);

    // Get reader and quiz stats from UserContentProgress for this creator's content
    const readerAgg = await prisma.userContentProgress.aggregate({
      _count: { id: true },
      _avg: { quizScore: true },
      where: {
        contentItem: { creatorId },
      },
    });

    res.json({
      success: true,
      data: {
        totalContent,
        draftCount,
        publishedCount,
        totalReaders: readerAgg._count.id,
        avgQuizScore: readerAgg._avg.quizScore ?? 0,
        processingCount,
      },
    });
  } catch (error) {
    console.error("Creator stats error:", error);
    res.status(500).json({ error: { message: TEXTS.CREATOR.STATS_FAILED } });
  }
});

export default router;
