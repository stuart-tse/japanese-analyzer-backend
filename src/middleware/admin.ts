import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { TEXTS } from '../constants/texts.js';

/**
 * Require admin role. Must be used AFTER requireAuth middleware.
 * Looks up the user's role from the database.
 */
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const userId = req.jwtUser?.userId;
  if (!userId) {
    res.status(401).json({ error: { message: TEXTS.AUTH.NOT_LOGGED_IN } });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: { message: TEXTS.AUTH.NO_PERMISSION } });
      return;
    }

    next();
  } catch {
    res.status(500).json({ error: { message: TEXTS.AUTH.PERMISSION_CHECK_FAILED } });
  }
}
