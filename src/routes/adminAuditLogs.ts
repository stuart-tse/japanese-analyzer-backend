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

// GET /admin/audit-logs — Paginated audit logs with filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const action = (req.query.action as string) || "";
    const userId = (req.query.userId as string) || "";
    const startDate = (req.query.startDate as string) || "";
    const endDate = (req.query.endDate as string) || "";

    const where: Record<string, unknown> = {};

    if (action) {
      where.action = action;
    }

    if (userId) {
      where.userId = userId;
    }

    if (startDate || endDate) {
      const createdAt: Record<string, Date> = {};
      if (startDate) {
        createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        createdAt.lte = new Date(endDate);
      }
      where.createdAt = createdAt;
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              displayName: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      success: true,
      data: logs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Audit log list error:", error);
    res
      .status(500)
      .json({ error: { message: TEXTS.ADMIN.AUDIT_LOG_FAILED } });
  }
});

export default router;
