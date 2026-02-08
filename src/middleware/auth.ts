import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, AccessTokenPayload } from '../utils/jwt.js';
import { TEXTS } from '../constants/texts.js';

// Use module augmentation that's compatible with Passport's user declaration
declare module 'express-serve-static-core' {
  interface Request {
    jwtUser?: AccessTokenPayload;
  }
}

/**
 * Require a valid JWT. Returns 401 if missing or invalid.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: { message: TEXTS.AUTH.NOT_LOGGED_IN } });
    return;
  }

  const token = authHeader.slice(7);
  try {
    req.jwtUser = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ error: { message: TEXTS.AUTH.TOKEN_EXPIRED } });
  }
}

/**
 * Optionally attach user info if a valid JWT is present.
 * Does NOT reject — unauthenticated requests pass through with req.jwtUser = undefined.
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      req.jwtUser = verifyAccessToken(token);
    } catch {
      // token invalid — proceed as guest
    }
  }
  next();
}
