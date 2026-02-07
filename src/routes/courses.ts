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
      orderBy: [
        { level: 'asc' }, // N5, N4, N3, N2, N1
        { order: 'asc' },
      ],
    });

    // Format response with lesson counts
    const formattedCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      slug: course.slug,
      level: course.level,
      description: course.description,
      published: course.published,
      estimatedHours: course.estimatedHours,
      order: course.order,
      lessonCount: course._count.lessons,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
    }));

    res.json({
      success: true,
      courses: formattedCourses,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses',
    });
  }
});

/**
 * GET /courses/:slug
 * Fetch course details with lessons
 */
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            slug: true,
            order: true,
            type: true,
            duration: true,
            published: true,
            isFree: true,
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

    // Format response
    const formattedCourse = {
      id: course.id,
      title: course.title,
      slug: course.slug,
      level: course.level,
      description: course.description,
      published: course.published,
      estimatedHours: course.estimatedHours,
      order: course.order,
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
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course',
    });
  }
});

/**
 * GET /courses/:courseSlug/lessons/:lessonSlug
 * Fetch lesson details with navigation
 */
router.get('/:courseSlug/lessons/:lessonSlug', async (req: Request, res: Response) => {
  try {
    const { courseSlug, lessonSlug } = req.params;

    // Get the course first
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
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

    // Find the current lesson
    const currentLessonIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);

    if (currentLessonIndex === -1) {
      res.status(404).json({
        success: false,
        error: 'Lesson not found',
      });
      return;
    }

    const currentLesson = course.lessons[currentLessonIndex];

    // Get previous and next lessons for navigation
    const previousLesson = currentLessonIndex > 0 ? course.lessons[currentLessonIndex - 1] : null;
    const nextLesson = currentLessonIndex < course.lessons.length - 1 ? course.lessons[currentLessonIndex + 1] : null;

    // Format response
    const formattedLesson = {
      id: currentLesson.id,
      title: currentLesson.title,
      slug: currentLesson.slug,
      content: currentLesson.content,
      type: currentLesson.type,
      order: currentLesson.order,
      duration: currentLesson.duration,
      published: currentLesson.published,
      isFree: currentLesson.isFree,
      course: {
        id: course.id,
        title: course.title,
        level: course.level,
        slug: course.slug,
      },
      navigation: {
        previous: previousLesson ? { slug: previousLesson.slug, title: previousLesson.title } : null,
        next: nextLesson ? { slug: nextLesson.slug, title: nextLesson.title } : null,
      },
    };

    res.json({
      success: true,
      lesson: formattedLesson,
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lesson',
    });
  }
});

export default router;
