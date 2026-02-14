import { prisma } from '../config/prisma.js';
import { incrementChallengeProgress, getOrCreateTodayChallenge } from './challengeService.js';
import { getTitleForActivity, getMetaForActivity } from './activityLogHelpers.js';

// --- Types ---

export type ActivityType = 'analysis' | 'srs_review' | 'pack_study' | 'pack_quiz' | 'cloze_practice';

export interface RecordActivityOptions {
  readonly userId: string;
  readonly activityType: ActivityType;
  readonly wordsLearned?: number;
  readonly jlptLevel?: string;
}

export interface RecordActivityResult {
  readonly streakDays: number;
  readonly isNewMilestone: boolean;
  readonly milestone: number | null; // 3, 7, 14, 30
}

const MILESTONES = [3, 7, 14, 30] as const;
const MAX_DAILY_ACTIVITY_DAYS = 90;

/**
 * Record any learning activity: updates streak, daily activity, and challenge progress.
 * All activity types (analysis, srs_review, pack_study, pack_quiz) flow through here.
 * Uses a Prisma transaction to prevent race conditions on streak calculation.
 */
export async function recordActivity(opts: RecordActivityOptions): Promise<RecordActivityResult> {
  const { userId, activityType, wordsLearned, jlptLevel } = opts;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Run streak + stats update inside a transaction for consistency
  const result = await prisma.$transaction(async (tx) => {
    // Ensure stats row exists (upsert pattern)
    let stats = await tx.learningStats.findUnique({ where: { userId } });
    if (!stats) {
      stats = await tx.learningStats.create({ data: { userId } });
    }

    // Build update payload (immutable approach)
    let totalAnalyses = stats.totalAnalyses;
    let totalWordsLearned = stats.totalWordsLearned;

    if (activityType === 'analysis') {
      totalAnalyses += 1;
    }

    if (typeof wordsLearned === 'number' && wordsLearned > 0) {
      totalWordsLearned += wordsLearned;
    }

    // Update JLPT progress (immutable)
    const jlptProgress = { ...(stats.jlptProgress as Record<string, number>) };
    if (jlptLevel && typeof jlptLevel === 'string') {
      jlptProgress[jlptLevel] = (jlptProgress[jlptLevel] || 0) + 1;
    }

    // Update daily activity (immutable — keep last N days)
    const dailyArr = [...((stats.dailyActivity as Array<{ date: string; count: number }>) || [])];
    const todayIdx = dailyArr.findIndex((d) => d.date === today);
    if (todayIdx >= 0) {
      dailyArr[todayIdx] = { ...dailyArr[todayIdx], count: dailyArr[todayIdx].count + 1 };
    } else {
      dailyArr.push({ date: today, count: 1 });
      if (dailyArr.length > MAX_DAILY_ACTIVITY_DAYS) dailyArr.shift();
    }

    // Compute streak (inside transaction to prevent race condition)
    const lastDate = stats.lastActiveDate
      ? new Date(stats.lastActiveDate).toISOString().slice(0, 10)
      : '';

    let streakDays = stats.streakDays;
    if (lastDate === yesterday) {
      streakDays += 1;
    } else if (lastDate !== today) {
      streakDays = 1;
    }
    // If lastDate === today, streak stays the same (already counted today)

    // Check for milestone — return only the highest new milestone
    let isNewMilestone = false;
    let milestone: number | null = null;
    let streakMilestoneNotified = stats.streakMilestoneNotified ?? 0;

    for (const m of MILESTONES) {
      if (streakDays >= m && streakMilestoneNotified < m) {
        isNewMilestone = true;
        milestone = m; // Overwrites with highest matching milestone
      }
    }

    if (milestone !== null) {
      streakMilestoneNotified = milestone;
    }

    // Persist within the transaction
    await tx.learningStats.update({
      where: { userId },
      data: {
        totalAnalyses,
        totalWordsLearned,
        jlptProgress,
        dailyActivity: dailyArr,
        streakDays,
        lastActiveDate: new Date(),
        streakMilestoneNotified,
      },
    });

    return { streakDays, isNewMilestone, milestone };
  });

  // Increment challenge progress (fire-and-forget — don't block the response)
  incrementChallengeForActivity(userId, activityType).catch((err) => {
    console.error('Challenge progress update failed:', { userId, activityType, error: err });
  });

  // Write activity log entry (fire-and-forget)
  prisma.activityLog.create({
    data: {
      userId,
      activityType,
      title: getTitleForActivity(activityType, { wordsLearned }),
      meta: getMetaForActivity(activityType, { wordsLearned }),
    },
  }).catch((err: unknown) => {
    console.error('Activity log write failed:', { userId, activityType, error: err });
  });

  return result;
}

/**
 * Helper: map activity type to challenge type and increment progress.
 */
async function incrementChallengeForActivity(userId: string, activityType: ActivityType): Promise<void> {
  const challenge = await getOrCreateTodayChallenge();

  // Determine if this activity contributes to today's challenge
  const typeMatch = challenge.type === activityType
    || challenge.type === 'mixed'
    || (challenge.type === 'analyze_text' && activityType === 'analysis')
    || (challenge.type === 'cloze_practice' && activityType === 'cloze_practice');

  if (typeMatch) {
    await incrementChallengeProgress(userId, challenge.id, activityType);
  }
}
