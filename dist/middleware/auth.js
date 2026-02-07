import { verifyAccessToken } from '../utils/jwt.js';
/**
 * Require a valid JWT. Returns 401 if missing or invalid.
 */
export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: { message: '未登录，请先登录' } });
        return;
    }
    const token = authHeader.slice(7);
    try {
        req.jwtUser = verifyAccessToken(token);
        next();
    }
    catch {
        res.status(401).json({ error: { message: '登录已过期，请重新登录' } });
    }
}
/**
 * Optionally attach user info if a valid JWT is present.
 * Does NOT reject — unauthenticated requests pass through with req.jwtUser = undefined.
 */
export function optionalAuth(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        try {
            req.jwtUser = verifyAccessToken(token);
        }
        catch {
            // token invalid — proceed as guest
        }
    }
    next();
}
//# sourceMappingURL=auth.js.map