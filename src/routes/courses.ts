import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/auth.js';
import { recordActivity } from '../services/streakService.js';
import { getTitleForActivity, getMetaForActivity } from '../services/activityLogHelpers.js';

const router = Router();

/**
 * GET /courses
 * Fetch all courses with lesson counts
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: { lessons: true },
        },
      },
      orderBy: { level: 'asc' },
    });

    const formattedCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      level: course.level,
      description: course.description,
      isPublished: course.isPublished,
      estimatedHours: course.estimatedHours,
      totalLessons: course.totalLessons,
      lessonCount: course._count.lessons,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
    }));

    res.json({
      success: true,
      courses: formattedCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses',
    });
  }
});

/**
 * GET /courses/:id
 * Fetch course details with lessons
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const courseId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: {
          orderBy: { lessonNumber: 'asc' },
          select: {
            id: true,
            title: true,
            lessonNumber: true,
            isQuiz: true,
            estimatedMinutes: true,
          },
        },
      },
    });

    if (!course) {
      res.status(404).json({
        success: false,
        error: 'Course not found',
      });
      return;
    }

    const formattedCourse = {
      id: course.id,
      title: course.title,
      level: course.level,
      description: course.description,
      isPublished: course.isPublished,
      estimatedHours: course.estimatedHours,
      totalLessons: course.totalLessons,
      lessonCount: course.lessons.length,
      lessons: course.lessons,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
    };

    res.json({
      success: true,
      course: formattedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course',
    });
  }
});

/**
 * GET /courses/:courseId/lessons/:lessonNumber
 * Fetch lesson details with navigation
 */
router.get('/:courseId/lessons/:lessonNumber', async (req: Request, res: Response) => {
  try {
    const courseId = Array.isArray(req.params.courseId) ? req.params.courseId[0] : req.params.courseId;
    const lessonNumber = parseInt(
      Array.isArray(req.params.lessonNumber) ? req.params.lessonNumber[0] : req.params.lessonNumber,
      10
    );

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: {
          orderBy: { lessonNumber: 'asc' },
        },
      },
    });

    if (!course) {
      res.status(404).json({
        success: false,
        error: 'Course not found',
      });
      return;
    }

    const currentLessonIndex = course.lessons.findIndex((l) => l.lessonNumber === lessonNumber);

    if (currentLessonIndex === -1) {
      res.status(404).json({
        success: false,
        error: 'Lesson not found',
      });
      return;
    }

    const currentLesson = course.lessons[currentLessonIndex];
    const previousLesson = currentLessonIndex > 0 ? course.lessons[currentLessonIndex - 1] : null;
    const nextLesson =
      currentLessonIndex < course.lessons.length - 1 ? course.lessons[currentLessonIndex + 1] : null;

    const formattedLesson = {
      id: currentLesson.id,
      title: currentLesson.title,
      lessonNumber: currentLesson.lessonNumber,
      vocabularyItems: currentLesson.vocabularyItems,
      grammarPoints: currentLesson.grammarPoints,
      practiceExercises: currentLesson.practiceExercises,
      isQuiz: currentLesson.isQuiz,
      estimatedMinutes: currentLesson.estimatedMinutes,
      course: {
        id: course.id,
        title: course.title,
        level: course.level,
      },
      navigation: {
        previous: previousLesson
          ? { lessonNumber: previousLesson.lessonNumber, title: previousLesson.title }
          : null,
        next: nextLesson ? { lessonNumber: nextLesson.lessonNumber, title: nextLesson.title } : null,
      },
    };

    res.json({
      success: true,
      lesson: formattedLesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lesson',
    });
  }
});

/**
 * POST /courses/:courseId/lessons/:lessonId/progress
 * Mark a lesson as completed for the authenticated user.
 */
router.post('/:courseId/lessons/:lessonId/progress', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const courseId = Array.isArray(req.params.courseId) ? req.params.courseId[0] : req.params.courseId;
    const lessonId = Array.isArray(req.params.lessonId) ? req.params.lessonId[0] : req.params.lessonId;

    // Validate lesson exists and belongs to the course
    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, courseId },
      select: { id: true, title: true },
    });

    if (!lesson) {
      res.status(404).json({ success: false, error: 'Lesson not found in this course' });
      return;
    }

    // Upsert progress
    const progress = await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        id: `${userId}_${lessonId}`,
        userId,
        lessonId,
        isCompleted: true,
        completedAt: new Date(),
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
        lastAccessedAt: new Date(),
      },
    });

    // Record activity for streak tracking (fire-and-forget)
    recordActivity({ userId, activityType: 'pack_study' }).catch((err) => {
      console.error('Record activity failed for lesson complete:', err);
    });

    // Write activity log entry for lesson completion (fire-and-forget)
    prisma.activityLog.create({
      data: {
        userId,
        activityType: 'lesson_complete',
        title: getTitleForActivity('pack_study', { lessonTitle: lesson.title }),
        meta: getMetaForActivity('pack_study', { lessonTitle: lesson.title }),
      },
    }).catch((err: unknown) => {
      console.error('Activity log write failed for lesson complete:', err);
    });

    res.json({ success: true, progress });
  } catch (error) {
    console.error('Lesson progress save error:', error);
    res.status(500).json({ success: false, error: 'Failed to save lesson progress' });
  }
});

/**
 * GET /courses/:courseId/progress
 * Fetch completed lesson IDs for the authenticated user (or empty for guests).
 */
router.get('/:courseId/progress', optionalAuth, async (req: Request, res: Response) => {
  try {
    const courseId = Array.isArray(req.params.courseId) ? req.params.courseId[0] : req.params.courseId;

    if (!req.jwtUser) {
      res.json({ completedLessonIds: [], completedCount: 0 });
      return;
    }

    const userId = req.jwtUser.userId;

    const completedLessons = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        isCompleted: true,
        Lesson: { courseId },
      },
      select: { lessonId: true },
    });

    const completedLessonIds = completedLessons.map((p) => p.lessonId);

    res.json({
      completedLessonIds,
      completedCount: completedLessonIds.length,
    });
  } catch (error) {
    console.error('Course progress fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch course progress' });
  }
});

export default router;
