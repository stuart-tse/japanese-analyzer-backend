const DEFAULT_CONFIG = {
    maxTokens: 30,
    refillRate: 2,
};
const buckets = new Map();
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 60_000;
const STALE_THRESHOLD_MS = 300_000;
function cleanup() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL_MS)
        return;
    lastCleanup = now;
    for (const [key, bucket] of buckets) {
        if (now - bucket.lastRefill > STALE_THRESHOLD_MS) {
            buckets.delete(key);
        }
    }
}
function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
        return forwarded.split(',')[0]?.trim() || 'unknown';
    }
    return req.headers['x-real-ip'] || req.ip || 'unknown';
}
export function rateLimit(overrides) {
    return (req, res, next) => {
        cleanup();
        const { maxTokens, refillRate } = { ...DEFAULT_CONFIG, ...overrides };
        const ip = getClientIp(req);
        const now = Date.now();
        let bucket = buckets.get(ip);
        if (!bucket) {
            bucket = { tokens: maxTokens, lastRefill: now };
            buckets.set(ip, bucket);
        }
        const elapsed = (now - bucket.lastRefill) / 1000;
        bucket.tokens = Math.min(maxTokens, bucket.tokens + elapsed * refillRate);
        bucket.lastRefill = now;
        if (bucket.tokens < 1) {
            res.status(429).json({ error: { message: '请求过于频繁，请稍后再试' } });
            return;
        }
        bucket.tokens -= 1;
        next();
    };
}
export function tierBasedRateLimit(limits) {
    return async (req, res, next) => {
        cleanup();
        const userId = req.user?.id;
        // If no user, apply strict limits (free tier)
        let config = limits.free;
        if (userId) {
            try {
                const { prisma } = await import('../config/prisma.js');
                const { SubscriptionTier } = await import('../generated/prisma/index.js');
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { subscriptionTier: true },
                });
                if (user) {
                    switch (user.subscriptionTier) {
                        case SubscriptionTier.PRO:
                            config = limits.pro;
                            break;
                        case SubscriptionTier.PREMIUM:
                            config = limits.premium;
                            break;
                        default:
                            config = limits.free;
                    }
                }
            }
            catch (error) {
                console.error('Error checking user tier for rate limit:', error);
                // Fallback to free tier limits on error
            }
        }
        const { maxTokens, refillRate } = config;
        const identifier = userId || getClientIp(req);
        const now = Date.now();
        let bucket = buckets.get(identifier);
        if (!bucket) {
            bucket = { tokens: maxTokens, lastRefill: now };
            buckets.set(identifier, bucket);
        }
        const elapsed = (now - bucket.lastRefill) / 1000;
        bucket.tokens = Math.min(maxTokens, bucket.tokens + elapsed * refillRate);
        bucket.lastRefill = now;
        if (bucket.tokens < 1) {
            const retryAfter = Math.ceil((1 - bucket.tokens) / refillRate);
            return res.status(429).json({
                error: '请求过于频繁，请稍后再试',
                retryAfter,
                upgradeAvailable: !userId || config === limits.free,
            });
        }
        bucket.tokens -= 1;
        next();
    };
}
/**
 * Preset tier-based rate limits for common use cases
 */
export const TIER_LIMITS = {
    // For API analysis endpoints (100/day free, unlimited pro/premium)
    ANALYSIS: {
        free: { maxTokens: 10, refillRate: 0.1 }, // ~10 per hour, 100 per day
        pro: { maxTokens: 100, refillRate: 10 }, // Effectively unlimited
        premium: { maxTokens: 100, refillRate: 10 }, // Effectively unlimited
    },
    // For SRS review endpoints (50/day free, unlimited pro/premium)
    SRS_REVIEW: {
        free: { maxTokens: 5, refillRate: 0.05 }, // ~5 per hour, 50 per day
        pro: { maxTokens: 100, refillRate: 10 },
        premium: { maxTokens: 100, refillRate: 10 },
    },
    // For general API requests
    GENERAL: {
        free: { maxTokens: 30, refillRate: 2 },
        pro: { maxTokens: 60, refillRate: 4 },
        premium: { maxTokens: 100, refillRate: 6 },
    },
};
//# sourceMappingURL=rateLimit.js.map