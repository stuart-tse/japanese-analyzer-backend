import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { attachRoles, requireRole } from '../middleware/rbac.js';
import { ROLES } from '../constants/permissions.js';
import { TEXTS } from '../constants/texts.js';

const router = Router();

// All routes require auth + teacher role
router.use(requireAuth);
router.use(attachRoles);
router.use(requireRole(ROLES.TEACHER));

// ─── GET / — Teacher KPI stats ───
router.get('/', async (req: Request, res: Response) => {
  try {
    const teacherId = req.jwtUser!.userId;

    const [totalCourses, publishedCourses, draftCourses, teacherCourses] =
      await Promise.all([
        prisma.course.count({ where: { teacherId } }),
        prisma.course.count({ where: { teacherId, isPublished: true } }),
        prisma.course.count({ where: { teacherId, isPublished: false } }),
        prisma.course.findMany({
          where: { teacherId },
          select: { id: true, totalLessons: true },
        }),
      ]);

    const totalLessons = teacherCourses.reduce(
      (sum, c) => sum + c.totalLessons,
      0,
    );

    const courseIds = teacherCourses.map((c) => c.id);

    let totalStudents = 0;
    let avgCompletion = 0;

    if (courseIds.length > 0) {
      const [studentResult, completionResult] = await Promise.all([
        prisma.userLessonProgress.findMany({
          where: { Lesson: { courseId: { in: courseIds } } },
          select: { userId: true },
          distinct: ['userId'],
        }),
        prisma.userLessonProgress.aggregate({
          where: { Lesson: { courseId: { in: courseIds } } },
          _avg: { practiceScore: true },
          _count: { _all: true },
        }),
      ]);

      totalStudents = studentResult.length;

      if (completionResult._count._all > 0) {
        const completedCount = await prisma.userLessonProgress.count({
          where: {
            Lesson: { courseId: { in: courseIds } },
            isCompleted: true,
          },
        });
        avgCompletion = Math.round(
          (completedCount / completionResult._count._all) * 100,
        );
      }
    }

    res.json({
      success: true,
      data: {
        totalCourses,
        publishedCourses,
        draftCourses,
        totalLessons,
        totalStudents,
        avgCompletion,
      },
    });
  } catch (error) {
    console.error('Teacher stats error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.STATS_FAILED } });
  }
});

export default router;
