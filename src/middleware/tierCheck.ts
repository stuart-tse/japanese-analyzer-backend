import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { creditService } from '../services/creditService.js';

/**
 * Feature configuration (replaces FeatureAccess DB table)
 */
interface FeatureConfig {
  minTier: string;
  creditCost?: number;
  freeLimitDaily?: number | null;
  proLimitDaily?: number | null;
  premiumLimitDaily?: number | null;
}

const FEATURE_CONFIGS: Record<string, FeatureConfig> = {
  premium_pack: { minTier: 'PRO', creditCost: 10 },
  jlpt_exam: { minTier: 'PREMIUM', creditCost: 20 },
  advanced_analysis: {
    minTier: 'PRO',
    creditCost: 5,
    freeLimitDaily: 3,
    proLimitDaily: 50,
    premiumLimitDaily: null,
  },
};

/**
 * Tier levels for comparison
 */
const TIER_LEVELS: Record<string, number> = {
  FREE: 0,
  PRO: 1,
  PREMIUM: 2,
};

/**
 * Middleware to check if user has required subscription tier
 * Usage: router.get('/premium-feature', requireTier('PREMIUM'), handler)
 */
export function requireTier(minTier: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { subscriptionTier: true, credits: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userTierLevel = TIER_LEVELS[user.subscriptionTier] ?? 0;
      const minTierLevel = TIER_LEVELS[minTier] ?? 0;

      if (userTierLevel >= minTierLevel) {
        return next();
      }

      // Check for subscription expiry
      const userWithExpiry = await prisma.user.findUnique({
        where: { id: userId },
        select: { subscriptionExpiry: true },
      });

      if (userWithExpiry?.subscriptionExpiry && userWithExpiry.subscriptionExpiry < new Date()) {
        return res.status(403).json({
          error: 'Subscription expired',
          requiredTier: minTier,
          currentTier: user.subscriptionTier,
          upgradeRequired: true,
        });
      }

      return res.status(403).json({
        error: 'Insufficient subscription tier',
        requiredTier: minTier,
        currentTier: user.subscriptionTier,
        upgradeRequired: true,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to verify subscription tier' });
    }
  };
}

/**
 * Middleware to check feature access (supports credit alternative)
 * Usage: router.get('/feature', requireFeature('premium_pack'), handler)
 */
export function requireFeature(featureType: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { subscriptionTier: true, credits: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const feature = FEATURE_CONFIGS[featureType];

      if (!feature) {
        return res.status(404).json({ error: 'Feature not found' });
      }

      const userTierLevel = TIER_LEVELS[user.subscriptionTier] ?? 0;
      const minTierLevel = TIER_LEVELS[feature.minTier] ?? 0;

      // User has required tier
      if (userTierLevel >= minTierLevel) {
        return next();
      }

      // Check credit alternative
      if (feature.creditCost && user.credits >= feature.creditCost) {
        req.featureCredits = {
          cost: feature.creditCost,
          featureType,
        };
        return next();
      }

      // Access denied
      return res.status(403).json({
        error: 'Insufficient access',
        requiredTier: feature.minTier,
        currentTier: user.subscriptionTier,
        creditCost: feature.creditCost || null,
        availableCredits: user.credits,
        upgradeRequired: !feature.creditCost || user.credits < feature.creditCost,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to verify feature access' });
    }
  };
}

/**
 * Middleware to deduct credits after successful request
 * Usage: router.get('/feature', requireFeature(...), deductCredits, handler)
 */
export async function deductCredits(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const featureCredits = req.featureCredits;

    if (!userId || !featureCredits) {
      return next();
    }

    const success = await creditService.deductCredits(
      userId,
      featureCredits.cost,
      featureCredits.featureType,
      req.params.id || req.body.id
    );

    if (!success) {
      return res.status(402).json({
        error: 'Insufficient credits',
        required: featureCredits.cost,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to deduct credits' });
  }
}

/**
 * Middleware to check daily limits
 * Usage: router.post('/analyze', checkDailyLimit('advanced_analysis'), handler)
 */
export function checkDailyLimit(featureType: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { subscriptionTier: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const feature = FEATURE_CONFIGS[featureType];

      if (!feature) {
        return next();
      }

      // Get limit for user's tier
      let dailyLimit: number | null | undefined = null;

      switch (user.subscriptionTier) {
        case 'FREE':
          dailyLimit = feature.freeLimitDaily;
          break;
        case 'PRO':
          dailyLimit = feature.proLimitDaily;
          break;
        case 'PREMIUM':
          dailyLimit = feature.premiumLimitDaily;
          break;
      }

      // No limit or unlimited
      if (dailyLimit === null || dailyLimit === undefined || dailyLimit < 0) {
        return next();
      }

      // Count today's usage
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const todayUsage = await prisma.creditTransaction.count({
        where: {
          userId,
          featureType,
          createdAt: { gte: startOfDay },
          type: 'DEDUCTION',
        },
      });

      if (todayUsage >= dailyLimit) {
        return res.status(429).json({
          error: 'Daily limit exceeded',
          limit: dailyLimit,
          used: todayUsage,
          resetAt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000),
          upgradeRequired: user.subscriptionTier === 'FREE',
        });
      }

      // Attach usage info to request
      req.dailyUsage = {
        used: todayUsage,
        limit: dailyLimit,
        remaining: dailyLimit - todayUsage,
      };

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to check daily limit' });
    }
  };
}

// Extend Express Request type
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
