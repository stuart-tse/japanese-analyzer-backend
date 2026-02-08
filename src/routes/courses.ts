import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

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

export default router;
