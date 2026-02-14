import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { attachRoles, requireRole } from "../middleware/rbac.js";
import { TEXTS } from "../constants/texts.js";
import {
  ROLES,
  deriveRoles,
  getUserPermissions,
} from "../constants/permissions.js";
import { logAudit, extractRequestMeta } from "../services/auditService.js";

const router = Router();

// All routes require admin role
router.use(requireAuth);
router.use(attachRoles);
router.use(requireRole(ROLES.ADMIN));

// GET /admin/users — list users with pagination + search + role filter
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const search = (req.query.search as string) || "";
    const roleFilter = (req.query.role as string) || "";

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { displayName: { contains: search, mode: "insensitive" } },
      ];
    }

    if (roleFilter) {
      where.roles = { has: roleFilter };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          displayName: true,
          avatar: true,
          role: true,
          roles: true,
          subscriptionTier: true,
          lastLoginAt: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    const enriched = users.map((u) => {
      const resolvedRoles = deriveRoles(u.role, u.roles);
      return {
        ...u,
        roles: resolvedRoles,
        permissions: getUserPermissions(resolvedRoles),
      };
    });

    res.json({
      success: true,
      data: enriched,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("List users error:", error);
    res.status(500).json({ error: { message: TEXTS.ADMIN.LIST_FAILED } });
  }
});

// GET /admin/users/:id — single user detail
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        avatar: true,
        role: true,
        roles: true,
        provider: true,
        subscriptionTier: true,
        credits: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        learningStreak: true,
        totalAnalyses: true,
        wordsLearned: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: { message: "用户不存在" } });
      return;
    }

    const resolvedRoles = deriveRoles(user.role, user.roles);
    res.json({
      success: true,
      data: {
        ...user,
        roles: resolvedRoles,
        permissions: getUserPermissions(resolvedRoles),
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: { message: TEXTS.ADMIN.GET_FAILED } });
  }
});

// PATCH /admin/users/:id/roles — update roles array + audit log
router.patch("/:id/roles", async (req: Request, res: Response) => {
  try {
    const { roles } = req.body;

    if (!Array.isArray(roles) || roles.length === 0) {
      res.status(400).json({ error: { message: TEXTS.ADMIN.ROLES_REQUIRED } });
      return;
    }

    // Sanitize: filter to valid string roles, deduplicate
    const validRoles = Object.values(ROLES) as string[];
    const sanitized = [
      ...new Set(
        roles.filter(
          (r: unknown): r is string =>
            typeof r === "string" && validRoles.includes(r),
        ),
      ),
    ];
    if (sanitized.length === 0) {
      res.status(400).json({
        error: {
          message: `${TEXTS.ADMIN.INVALID_ROLES}${validRoles.join(", ")}`,
        },
      });
      return;
    }

    // Ensure student role is always present
    const finalRoles: string[] = sanitized.includes(ROLES.STUDENT)
      ? sanitized
      : [ROLES.STUDENT, ...sanitized];

    const targetId = req.params.id as string;
    const actorId = req.jwtUser!.userId;

    // Prevent admin self-demotion
    if (targetId === actorId && !finalRoles.includes(ROLES.ADMIN)) {
      res.status(403).json({
        error: { message: TEXTS.ADMIN.CANNOT_REMOVE_OWN_ADMIN },
      });
      return;
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetId },
      select: { id: true, roles: true, role: true },
    });

    if (!targetUser) {
      res
        .status(404)
        .json({ error: { message: TEXTS.PROFILE.USER_NOT_FOUND } });
      return;
    }

    // Prevent removing the last admin
    const targetWasAdmin = deriveRoles(
      targetUser.role,
      targetUser.roles,
    ).includes(ROLES.ADMIN);
    if (targetWasAdmin && !finalRoles.includes(ROLES.ADMIN)) {
      const adminCount = await prisma.user.count({
        where: { roles: { has: ROLES.ADMIN } },
      });
      if (adminCount <= 1) {
        res.status(403).json({
          error: { message: TEXTS.ADMIN.LAST_ADMIN },
        });
        return;
      }
    }

    const oldRoles = deriveRoles(targetUser.role, targetUser.roles);

    // Update roles array and sync legacy role field
    const legacyRole = finalRoles.includes(ROLES.ADMIN) ? "admin" : "user";
    const updated = await prisma.user.update({
      where: { id: targetId },
      data: { roles: finalRoles, role: legacyRole },
      select: {
        id: true,
        email: true,
        displayName: true,
        roles: true,
        role: true,
      },
    });

    // Create audit log entry (non-blocking)
    const { ipAddress, userAgent } = extractRequestMeta(req);
    logAudit({
      userId: req.jwtUser!.userId,
      action: "user.roles_updated",
      entity: "user",
      entityId: targetId,
      details: {
        oldRoles,
        newRoles: finalRoles,
        targetEmail: updated.email,
      },
      ipAddress,
      userAgent,
    });

    res.json({
      success: true,
      data: {
        ...updated,
        permissions: getUserPermissions(finalRoles),
      },
    });
  } catch (error) {
    console.error("Update roles error:", error);
    res
      .status(500)
      .json({ error: { message: TEXTS.ADMIN.UPDATE_ROLES_FAILED } });
  }
});

export default router;
