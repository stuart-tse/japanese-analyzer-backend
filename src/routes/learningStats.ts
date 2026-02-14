import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../config/prisma.js";
import { recordActivity } from "../services/streakService.js";
import {
  formatRelativeTime,
  getDotColorForActivity,
} from "../services/activityLogHelpers.js";

const router = Router();

// GET /learning-stats — get user stats
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    let stats = await prisma.learningStats.findUnique({ where: { userId } });

    if (!stats) {
      stats = await prisma.learningStats.create({ data: { userId } });
    }

    res.json(stats);
  } catch (error) {
    console.error("Learning stats get error:", error);
    res.status(500).json({ error: { message: "获取学习统计失败" } });
  }
});

// POST /learning-stats/update — increment stats after analysis
router.post("/update", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { wordsLearned, jlptLevel } = req.body;

    const streakResult = await recordActivity({
      userId,
      activityType: "analysis",
      wordsLearned: typeof wordsLearned === "number" ? wordsLearned : undefined,
      jlptLevel: typeof jlptLevel === "string" ? jlptLevel : undefined,
    });

    // Re-fetch updated stats to return full object (same shape as before)
    const updated = await prisma.learningStats.findUnique({
      where: { userId },
    });

    res.json({
      ...updated,
      streakMilestone: streakResult.isNewMilestone
        ? streakResult.milestone
        : null,
    });
  } catch (error) {
    console.error("Learning stats update error:", error);
    res.status(500).json({ error: { message: "更新学习统计失败" } });
  }
});

// GET /learning-stats/badges — compute earned badges from user stats
router.get("/badges", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;

    // Fetch stats in parallel
    const [stats, masteredCount, quizCount, lessonCount] = await Promise.all([
      prisma.learningStats.findUnique({ where: { userId } }),
      prisma.vocabulary.count({ where: { userId, mastered: true } }),
      prisma.userPackProgress.count({
        where: { userId, quizScore: { not: null } },
      }),
      prisma.userLessonProgress.count({
        where: { userId, isCompleted: true },
      }),
    ]);

    const totalWords = stats?.totalWordsLearned ?? 0;
    const streakDays = stats?.streakDays ?? 0;
    const totalAnalyses = stats?.totalAnalyses ?? 0;

    // Compute earned badge IDs based on thresholds
    const earnedBadgeIds: string[] = [];

    // Word milestones
    if (totalWords >= 1) earnedBadgeIds.push("first_word");
    if (totalWords >= 50) earnedBadgeIds.push("words_50");
    if (totalWords >= 100) earnedBadgeIds.push("words_100");

    // Streak milestones
    if (streakDays >= 3) earnedBadgeIds.push("streak_3");
    if (streakDays >= 7) earnedBadgeIds.push("streak_7");
    if (streakDays >= 30) earnedBadgeIds.push("streak_30");

    // Mastery milestones
    if (masteredCount >= 10) earnedBadgeIds.push("mastery_10");
    if (masteredCount >= 50) earnedBadgeIds.push("mastery_50");

    // Quiz milestones
    if (quizCount >= 3) earnedBadgeIds.push("quiz_3");

    // Analysis milestones
    if (totalAnalyses >= 10) earnedBadgeIds.push("analysis_10");

    // Lesson milestones
    if (lessonCount >= 5) earnedBadgeIds.push("lessons_5");

    // Persist earned badges to achievements field (fire-and-forget)
    if (stats) {
      prisma.learningStats
        .update({
          where: { userId },
          data: { achievements: earnedBadgeIds },
        })
        .catch((err: unknown) => {
          console.error("Failed to persist badges:", err);
        });
    }

    res.json({
      earnedBadgeIds,
      stats: {
        totalWords,
        streakDays,
        totalAnalyses,
        masteredCount,
        quizCount,
        lessonCount,
      },
    });
  } catch (error) {
    console.error("Badges fetch error:", error);
    res.status(500).json({ error: { message: "获取徽章数据失败" } });
  }
});

// GET /learning-stats/activity-timeline — recent activity log entries
router.get(
  "/activity-timeline",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.jwtUser!.userId;

      const logs = await prisma.activityLog.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      const activities = logs.map((log) => ({
        id: log.id,
        title: log.title,
        meta: log.meta ?? "",
        time: formatRelativeTime(log.createdAt),
        dotColor: getDotColorForActivity(log.activityType),
      }));

      res.json({ activities });
    } catch (error) {
      console.error("Activity timeline fetch error:", error);
      res.status(500).json({ error: { message: "获取活动记录失败" } });
    }
  },
);

export default router;
