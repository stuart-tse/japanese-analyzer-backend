import { Request, Response, NextFunction } from 'express';
import { AccessTokenPayload } from '../utils/jwt.js';
declare module 'express-serve-static-core' {
    interface Request {
        jwtUser?: AccessTokenPayload;
    }
}
/**
 * Require a valid JWT. Returns 401 if missing or invalid.
 */
export declare function requireAuth(req: Request, res: Response, next: NextFunction): void;
/**
 * Optionally attach user info if a valid JWT is present.
 * Does NOT reject — unauthenticated requests pass through with req.jwtUser = undefined.
 */
export declare function optionalAuth(req: Request, _res: Response, next: NextFunction): void;
