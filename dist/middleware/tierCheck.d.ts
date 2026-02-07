import { Request, Response, NextFunction } from 'express';
import { SubscriptionTier, FeatureType } from '../generated/prisma/index.js';
/**
 * Middleware to check if user has required subscription tier
 * Usage: router.get('/premium-feature', requireTier(SubscriptionTier.PREMIUM), handler)
 */
export declare function requireTier(minTier: SubscriptionTier): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Middleware to check feature access (supports credit alternative)
 * Usage: router.get('/feature', requireFeature(FeatureType.JLPT_PREP), handler)
 */
export declare function requireFeature(featureType: FeatureType): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Middleware to deduct credits after successful request
 * Usage: router.get('/feature', requireFeature(...), deductCredits, handler)
 */
export declare function deductCredits(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Middleware to check daily limits
 * Usage: router.post('/analyze', checkDailyLimit(FeatureType.ADVANCED_ANALYSIS), handler)
 */
export declare function checkDailyLimit(featureType: FeatureType): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare global {
    namespace Express {
        interface Request {
            featureCredits?: {
                cost: number;
                featureType: string;
            };
            dailyUsage?: {
                used: number;
                limit: number;
                remaining: number;
            };
        }
    }
}
