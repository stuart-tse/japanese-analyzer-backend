import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

const router = Router();

/**
 * GET /placement-test
 * Fetch 20 placement questions (4 per level: N5, N4, N3, N2, N1)
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const questionsPerLevel = 4;

    const allQuestions = [];

    // Fetch 4 questions per level
    for (const level of levels) {
      const questions = await prisma.placementQuestion.findMany({
        where: {
          level,
          isActive: true,
        },
        take: questionsPerLevel,
        orderBy: {
          difficulty: 'asc',
        },
      });

      allQuestions.push(...questions);
    }

    // Shuffle questions to mix levels
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

    // Remove correct answer from response (send it separately for validation)
    const questionsForClient = shuffledQuestions.map((q) => ({
      id: q.id,
      level: q.level,
      skillType: q.skillType,
      difficulty: q.difficulty,
      questionText: q.questionText,
      questionTextChinese: q.questionTextChinese,
      passageText: q.passageText,
      options: q.options as Array<{ id: string; text: string; textChinese?: string }>,
      audioUrl: q.audioUrl,
      // Don't send correctAnswerId or explanation yet
    }));

    res.json({
      success: true,
      questions: questionsForClient,
      total: questionsForClient.length,
    });
  } catch (error) {
    console.error('Error fetching placement questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch placement questions',
    });
  }
});

/**
 * POST /placement-test
 * Submit answers and get results with level recommendation
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({
        success: false,
        error: 'Invalid answers format',
      });
      return;
    }

    // Validate answers and calculate score
    const results = await Promise.all(
      answers.map(async (answer: { questionId: string; selectedAnswerId: string }) => {
        const question = await prisma.placementQuestion.findUnique({
          where: { id: answer.questionId },
        });

        if (!question) {
          return null;
        }

        const isCorrect = question.correctAnswerId === answer.selectedAnswerId;

        return {
          questionId: answer.questionId,
          level: question.level,
          skillType: question.skillType,
          difficulty: question.difficulty,
          isCorrect,
          correctAnswerId: question.correctAnswerId,
          explanation: question.explanation,
        };
      })
    );

    const validResults = results.filter((r) => r !== null);

    // Calculate scores by level
    const scoresByLevel: Record<string, { correct: number; total: number }> = {};
    const scoresBySkill: Record<string, { correct: number; total: number }> = {};

    validResults.forEach((result) => {
      if (!result) return;

      // By level
      if (!scoresByLevel[result.level]) {
        scoresByLevel[result.level] = { correct: 0, total: 0 };
      }
      scoresByLevel[result.level].total += 1;
      if (result.isCorrect) {
        scoresByLevel[result.level].correct += 1;
      }

      // By skill type
      if (result.skillType) {
        if (!scoresBySkill[result.skillType]) {
          scoresBySkill[result.skillType] = { correct: 0, total: 0 };
        }
        scoresBySkill[result.skillType].total += 1;
        if (result.isCorrect) {
          scoresBySkill[result.skillType].correct += 1;
        }
      }
    });

    // Determine recommended level
    const recommendedLevel = calculateRecommendedLevel(scoresByLevel);

    // Calculate skill breakdown
    const skillBreakdown = Object.entries(scoresBySkill).reduce(
      (acc, [skill, scores]) => {
        acc[skill] = Math.round((scores.correct / scores.total) * 100);
        return acc;
      },
      {} as Record<string, number>
    );

    const totalCorrect = validResults.filter((r) => r?.isCorrect).length;
    const totalQuestions = validResults.length;
    const overallScore = Math.round((totalCorrect / totalQuestions) * 100);

    res.json({
      success: true,
      results: {
        totalCorrect,
        totalQuestions,
        overallScore,
        recommendedLevel,
        scoresByLevel,
        skillBreakdown,
        detailedResults: validResults,
      },
    });
  } catch (error) {
    console.error('Error processing placement test:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process placement test',
    });
  }
});

/**
 * Calculate recommended JLPT level based on scores
 */
function calculateRecommendedLevel(
  scoresByLevel: Record<string, { correct: number; total: number }>
): string {
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  // Find highest level where user scored >= 75%
  for (let i = levels.length - 1; i >= 0; i--) {
    const level = levels[i];
    const score = scoresByLevel[level];

    if (score && score.correct / score.total >= 0.75) {
      // If scoring well at this level, recommend it
      return level;
    }
  }

  // Find the level where user scored between 50-75%
  for (let i = levels.length - 1; i >= 0; i--) {
    const level = levels[i];
    const score = scoresByLevel[level];

    if (score && score.correct / score.total >= 0.5) {
      return level;
    }
  }

  // Default to N5 for beginners
  return 'N5';
}

export default router;
