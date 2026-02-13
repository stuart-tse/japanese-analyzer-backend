import { prisma } from '../config/prisma.js';
import {
  JLPT_VOCAB_TOTALS,
  JLPT_GRAMMAR_TOTALS,
  JLPT_LEVELS,
} from '../constants/jlptTotals.js';

// --- Types ---

export interface LevelReadiness {
  readonly level: string;
  readonly overallScore: number;
  readonly vocabCoverage: number;
  readonly vocabMastery: number;
  readonly grammarProgress: number;
  readonly quizPerformance: number;
  readonly consistencyBonus: number;
  readonly raw: {
    readonly vocabLearned: number;
    readonly vocabTotal: number;
    readonly vocabMastered: number;
    readonly grammarCompleted: number;
    readonly grammarTotal: number;
    readonly avgQuizScore: number;
    readonly quizCount: number;
  };
}

export interface ReadinessResult {
  readonly levels: readonly LevelReadiness[];
  readonly estimatedLevel: string | null;
  readonly streakDays: number;
  readonly generatedAt: string;
}

// --- Helpers ---

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function pct(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return clamp((numerator / denominator) * 100, 0, 100);
}

/** Check if a packId belongs to a JLPT level (e.g. "n5-vocab-01" → N5). */
function matchesJlptLevel(packId: string, level: string): boolean {
  const normalized = packId.toLowerCase();
  const target = level.toLowerCase();
  return normalized.startsWith(target) || normalized.startsWith(`${target}-`);
}

// --- Main computation ---

export async function computeReadiness(
  userId: string,
): Promise<ReadinessResult> {
  // Fire all queries in parallel
  const [
    vocabByLevel,
    masteredByLevel,
    grammarPacks,
    completedProgress,
    stats,
  ] = await Promise.all([
    // 1. Vocab learned per level
    prisma.vocabulary.groupBy({
      by: ['jlptLevel'],
      where: { userId },
      _count: true,
    }),

    // 2. Vocab mastered per level
    prisma.vocabulary.groupBy({
      by: ['jlptLevel'],
      where: { userId, srsStage: 'mastered' },
      _count: true,
    }),

    // 3. All grammar packs (packId + jlptLevel)
    prisma.wordPack.findMany({
      where: { type: 'grammar' },
      select: { packId: true, jlptLevel: true },
    }),

    // 4. User's completed pack progress (packId + quizScore)
    prisma.userPackProgress.findMany({
      where: { userId, status: 'completed' },
      select: { packId: true, quizScore: true },
    }),

    // 5. Streak days
    prisma.learningStats.findUnique({
      where: { userId },
      select: { streakDays: true },
    }),
  ]);

  // Build lookup maps
  const vocabLearnedMap = new Map(
    vocabByLevel.map((r) => [r.jlptLevel, r._count]),
  );
  const vocabMasteredMap = new Map(
    masteredByLevel.map((r) => [r.jlptLevel, r._count]),
  );

  // Grammar packs grouped by level
  const grammarPacksByLevel = new Map<string, Set<string>>();
  for (const gp of grammarPacks) {
    const existing = grammarPacksByLevel.get(gp.jlptLevel);
    if (existing) {
      existing.add(gp.packId);
    } else {
      grammarPacksByLevel.set(gp.jlptLevel, new Set([gp.packId]));
    }
  }

  // Completed pack IDs for quick lookup
  const completedPackIds = new Set(completedProgress.map((p) => p.packId));
  const quizScoreByPack = new Map(
    completedProgress.map((p) => [p.packId, p.quizScore ?? 0]),
  );

  const streakDays = stats?.streakDays ?? 0;
  const consistencyRaw = clamp(streakDays / 14, 0, 1) * 100;

  const levels: LevelReadiness[] = JLPT_LEVELS.map((level) => {
    const vocabTotal = JLPT_VOCAB_TOTALS[level] ?? 0;
    const grammarTotal = JLPT_GRAMMAR_TOTALS[level] ?? 0;
    const vocabLearned = vocabLearnedMap.get(level) ?? 0;
    const vocabMastered = vocabMasteredMap.get(level) ?? 0;

    // Grammar completion for this level
    const levelGrammarPacks = grammarPacksByLevel.get(level) ?? new Set();
    let grammarCompleted = 0;
    let quizScoreSum = 0;
    let quizCount = 0;

    for (const packId of levelGrammarPacks) {
      if (completedPackIds.has(packId)) {
        grammarCompleted++;
      }
    }

    // Quiz performance: avg quiz score across completed packs for this level.
    // Match by packId prefix (e.g. "n5-vocab-01") or grammar pack membership.
    for (const cp of completedProgress) {
      const isLevelMatch =
        matchesJlptLevel(cp.packId, level) || levelGrammarPacks.has(cp.packId);

      if (isLevelMatch && cp.quizScore !== null) {
        quizScoreSum += cp.quizScore;
        quizCount++;
      }
    }
    const avgQuizScore = quizCount > 0 ? quizScoreSum / quizCount : 0;

    // Sub-scores (0-100 each)
    const vocabCoverage = pct(vocabLearned, vocabTotal);
    const vocabMastery =
      vocabLearned > 0 ? pct(vocabMastered, vocabLearned) : 0;
    const grammarProgress =
      levelGrammarPacks.size > 0
        ? pct(grammarCompleted, levelGrammarPacks.size)
        : 0;
    const quizPerformance = clamp(avgQuizScore, 0, 100);

    // Weighted overall
    const overallScore = Math.round(
      vocabCoverage * 0.4 +
        vocabMastery * 0.2 +
        grammarProgress * 0.2 +
        quizPerformance * 0.1 +
        consistencyRaw * 0.1,
    );

    return {
      level,
      overallScore: clamp(overallScore, 0, 100),
      vocabCoverage: Math.round(vocabCoverage),
      vocabMastery: Math.round(vocabMastery),
      grammarProgress: Math.round(grammarProgress),
      quizPerformance: Math.round(quizPerformance),
      consistencyBonus: Math.round(consistencyRaw),
      raw: {
        vocabLearned,
        vocabTotal,
        vocabMastered,
        grammarCompleted,
        grammarTotal: levelGrammarPacks.size || grammarTotal,
        avgQuizScore: Math.round(avgQuizScore),
        quizCount,
      },
    };
  });

  // Estimated level: highest level where score >= 70
  let estimatedLevel: string | null = null;
  for (const lr of levels) {
    if (lr.overallScore >= 70) {
      estimatedLevel = lr.level;
    }
  }

  return {
    levels,
    estimatedLevel,
    streakDays,
    generatedAt: new Date().toISOString(),
  };
}
