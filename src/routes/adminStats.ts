import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { attachRoles, requireRole } from "../middleware/rbac.js";
import { ROLES } from "../constants/permissions.js";
import { TEXTS } from "../constants/texts.js";

const router = Router();

router.use(requireAuth);
router.use(attachRoles);
router.use(requireRole(ROLES.ADMIN));

// GET /admin/stats — System KPIs
router.get("/", async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers7d,
      totalContent,
      totalCourses,
      activeSubs,
      recentSignups,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { lastLoginAt: { gte: sevenDaysAgo } },
      }),
      prisma.contentItem.count(),
      prisma.course.count(),
      prisma.subscription.count({
        where: { status: "ACTIVE" },
      }),
      prisma.user.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers7d,
        totalContent,
        totalCourses,
        activeSubs,
        recentSignups,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: { message: TEXTS.ADMIN.STATS_FAILED } });
  }
});

export default router;
