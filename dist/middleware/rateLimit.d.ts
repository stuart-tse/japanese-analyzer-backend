import { Request, Response, NextFunction } from 'express';
import type { RateLimitConfig } from '../types/index.js';
export declare function rateLimit(overrides?: Partial<RateLimitConfig>): (req: Request, res: Response, next: NextFunction) => void;
/**
 * Tier-based rate limiting
 * Different limits for FREE, PRO, and PREMIUM users
 */
interface TierLimits {
    free: {
        maxTokens: number;
        refillRate: number;
    };
    pro: {
        maxTokens: number;
        refillRate: number;
    };
    premium: {
        maxTokens: number;
        refillRate: number;
    };
}
export declare function tierBasedRateLimit(limits: TierLimits): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Preset tier-based rate limits for common use cases
 */
export declare const TIER_LIMITS: {
    ANALYSIS: {
        free: {
            maxTokens: number;
            refillRate: number;
        };
        pro: {
            maxTokens: number;
            refillRate: number;
        };
        premium: {
            maxTokens: number;
            refillRate: number;
        };
    };
    SRS_REVIEW: {
        free: {
            maxTokens: number;
            refillRate: number;
        };
        pro: {
            maxTokens: number;
            refillRate: number;
        };
        premium: {
            maxTokens: number;
            refillRate: number;
        };
    };
    GENERAL: {
        free: {
            maxTokens: number;
            refillRate: number;
        };
        pro: {
            maxTokens: number;
            refillRate: number;
        };
        premium: {
            maxTokens: number;
            refillRate: number;
        };
    };
};
export {};
