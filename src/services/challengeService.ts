import { prisma } from '../config/prisma.js';

// --- Challenge Templates ---

interface ChallengeTemplate {
  readonly type: string;
  readonly titleZh: string;
  readonly descriptionZh: string;
  readonly targetCount: number;
  readonly xpReward: number;
}

const CHALLENGE_POOL: ReadonlyArray<ChallengeTemplate> = [
  {
    type: 'srs_review',
    titleZh: '复习5个SRS单词',
    descriptionZh: '通过间隔重复复习巩固你的记忆',
    targetCount: 5,
    xpReward: 10,
  },
  {
    type: 'pack_study',
    titleZh: '学习1个词汇包',
    descriptionZh: '选择一个词汇包并完成学习',
    targetCount: 1,
    xpReward: 15,
  },
  {
    type: 'pack_quiz',
    titleZh: '完成1个测验',
    descriptionZh: '完成一个词汇包测验来检验学习成果',
    targetCount: 1,
    xpReward: 20,
  },
  {
    type: 'analyze_text',
    titleZh: '分析3个句子',
    descriptionZh: '使用AI分析器解析日语句子',
    targetCount: 3,
    xpReward: 10,
  },
  {
    type: 'mixed',
    titleZh: '完成任意2项学习活动',
    descriptionZh: '复习、学习、测验或分析均可',
    targetCount: 2,
    xpReward: 15,
  },
];

/**
 * Get today's date string in YYYY-MM-DD format.
 */
function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Deterministic daily challenge selection using date-based index.
 */
function selectTemplate(dateStr: string): ChallengeTemplate {
  // Simple hash: sum char codes of the date string
  const hash = dateStr.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return CHALLENGE_POOL[hash % CHALLENGE_POOL.length];
}

/**
 * Get or create today's challenge. Creates a new DailyChallenge row if one
 * doesn't exist for today's date.
 */
export async function getOrCreateTodayChallenge() {
  const date = todayDateString();

  const existing = await prisma.dailyChallenge.findUnique({ where: { date } });
  if (existing) return existing;

  const template = selectTemplate(date);

  return prisma.dailyChallenge.create({
    data: {
      date,
      type: template.type,
      titleZh: template.titleZh,
      descriptionZh: template.descriptionZh,
      targetCount: template.targetCount,
      xpReward: template.xpReward,
    },
  });
}

/**
 * Increment a user's progress toward today's challenge.
 * Uses a transaction to prevent race conditions on completion.
 * Returns the updated progress.
 */
export async function incrementChallengeProgress(
  userId: string,
  challengeId: string,
  _activityType: string,
): Promise<{ currentProgress: number; completed: boolean; completedAt: string | null }> {
  return prisma.$transaction(async (tx) => {
    // Upsert user challenge progress
    const userChallenge = await tx.userDailyChallenge.upsert({
      where: { userId_challengeId: { userId, challengeId } },
      update: {
        currentProgress: { increment: 1 },
      },
      create: {
        userId,
        challengeId,
        currentProgress: 1,
      },
    });

    // If already completed, just return current state
    if (userChallenge.completed) {
      return {
        currentProgress: userChallenge.currentProgress,
        completed: true,
        completedAt: userChallenge.completedAt?.toISOString() ?? null,
      };
    }

    // Check if challenge target is now met
    const challenge = await tx.dailyChallenge.findUnique({
      where: { id: challengeId },
    });

    if (challenge && userChallenge.currentProgress >= challenge.targetCount) {
      // Atomic conditional update: only mark complete if still incomplete
      const result = await tx.userDailyChallenge.updateMany({
        where: {
          id: userChallenge.id,
          completed: false,
        },
        data: {
          completed: true,
          completedAt: new Date(),
        },
      });

      // If we won the race (result.count === 1), return completed state
      if (result.count > 0) {
        return {
          currentProgress: userChallenge.currentProgress,
          completed: true,
          completedAt: new Date().toISOString(),
        };
      }
    }

    return {
      currentProgress: userChallenge.currentProgress,
      completed: false,
      completedAt: null,
    };
  });
}
