import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { TEXTS } from "../constants/texts.js";
import {
  deriveRoles,
  getUserPermissions,
  hasAnyRole,
  type Permission,
} from "../constants/permissions.js";

// Extend Express Request to include user roles
declare module "express-serve-static-core" {
  interface Request {
    userRoles?: string[];
  }
}

/**
 * Middleware: attach user roles from DB to req.userRoles.
 * Must be used AFTER requireAuth.
 * Backward compatible: derives roles from legacy `role` field if `roles` array is empty.
 */
export async function attachRoles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.jwtUser?.userId;
  if (!userId) {
    res.status(401).json({ error: { message: TEXTS.AUTH.NOT_LOGGED_IN } });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, roles: true },
    });

    if (!user) {
      res.status(401).json({ error: { message: TEXTS.AUTH.NOT_LOGGED_IN } });
      return;
    }

    req.userRoles = deriveRoles(user.role, user.roles);
    next();
  } catch {
    res
      .status(500)
      .json({ error: { message: TEXTS.AUTH.PERMISSION_CHECK_FAILED } });
  }
}

/**
 * Middleware factory: require the user to have at least one of the specified roles.
 * Must be used AFTER attachRoles (or after manually setting req.userRoles).
 */
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.userRoles;
    if (!userRoles || !hasAnyRole(userRoles, roles)) {
      res.status(403).json({ error: { message: TEXTS.AUTH.ROLE_REQUIRED } });
      return;
    }
    next();
  };
}

/**
 * Middleware factory: require the user to have ALL of the specified permissions.
 * Must be used AFTER attachRoles.
 */
export function requirePermission(...permissions: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.userRoles;
    if (!userRoles) {
      res
        .status(403)
        .json({ error: { message: TEXTS.AUTH.PERMISSION_REQUIRED } });
      return;
    }

    const userPerms = getUserPermissions(userRoles);
    const hasAll = permissions.every((p) => userPerms.includes(p));
    if (!hasAll) {
      res
        .status(403)
        .json({ error: { message: TEXTS.AUTH.PERMISSION_REQUIRED } });
      return;
    }
    next();
  };
}
