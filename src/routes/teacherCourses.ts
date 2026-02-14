import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { attachRoles, requireRole } from '../middleware/rbac.js';
import { ROLES } from '../constants/permissions.js';
import { TEXTS } from '../constants/texts.js';
import {
  createCourseSchema,
  updateCourseSchema,
  createLessonSchema,
  updateLessonSchema,
  reorderLessonsSchema,
} from '../services/courseValidation.js';
import { ZodError } from 'zod';

const router = Router();

// All routes require auth + teacher
router.use(requireAuth);
router.use(attachRoles);
router.use(requireRole(ROLES.TEACHER));

// ─── Helper: format Zod errors ───
function formatZodError(error: ZodError<unknown>): string {
  return error.issues
    .map((issue) => `${String(issue.path.join('.'))}: ${issue.message}`)
    .join('; ');
}

// ─── Helper: verify course ownership ───
async function verifyOwnership(courseId: string, teacherId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });
  if (!course) return { error: 'not_found' as const, course: null };
  if (course.teacherId !== teacherId)
    return { error: 'not_owner' as const, course: null };
  return { error: null, course };
}

// ─── GET / — List teacher's courses ───
router.get('/', async (req: Request, res: Response) => {
  try {
    const teacherId = req.jwtUser!.userId;

    const courses = await prisma.course.findMany({
      where: { teacherId },
      include: {
        _count: { select: { lessons: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      courses: courses.map((c) => ({
        id: c.id,
        level: c.level,
        title: c.title,
        description: c.description,
        totalLessons: c.totalLessons,
        estimatedHours: c.estimatedHours,
        requiredTier: c.requiredTier,
        creditCostPerLesson: c.creditCostPerLesson,
        isPublished: c.isPublished,
        lessonCount: c._count.lessons,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Teacher list courses error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.LIST_FAILED } });
  }
});

// ─── POST / — Create course ───
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = createCourseSchema.parse(req.body);
    const teacherId = req.jwtUser!.userId;

    const course = await prisma.course.create({
      data: {
        ...validated,
        totalLessons: 0,
        teacherId,
      },
    });

    res.status(201).json({
      message: TEXTS.COURSE.CREATE_SUCCESS,
      course: {
        id: course.id,
        level: course.level,
        title: course.title,
        description: course.description,
        totalLessons: course.totalLessons,
        estimatedHours: course.estimatedHours,
        requiredTier: course.requiredTier,
        creditCostPerLesson: course.creditCostPerLesson,
        isPublished: course.isPublished,
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: {
          message: `${TEXTS.COURSE.VALIDATION_FAILED}: ${formatZodError(error)}`,
        },
      });
      return;
    }
    console.error('Teacher create course error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.CREATE_FAILED } });
  }
});

// ─── GET /:id — Course detail with lessons ───
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const teacherId = req.jwtUser!.userId;
    const course = await prisma.course.findUnique({
      where: { id: req.params.id as string },
      include: {
        lessons: { orderBy: { lessonNumber: 'asc' } },
        _count: { select: { lessons: true } },
      },
    });

    if (!course) {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }

    if (course.teacherId !== teacherId) {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    res.json({
      course: {
        id: course.id,
        level: course.level,
        title: course.title,
        description: course.description,
        totalLessons: course.totalLessons,
        estimatedHours: course.estimatedHours,
        requiredTier: course.requiredTier,
        creditCostPerLesson: course.creditCostPerLesson,
        isPublished: course.isPublished,
        lessonCount: course._count.lessons,
        lessons: course.lessons.map((l) => ({
          id: l.id,
          lessonNumber: l.lessonNumber,
          unitNumber: l.unitNumber,
          title: l.title,
          description: l.description,
          vocabularyItems: l.vocabularyItems,
          grammarPoints: l.grammarPoints,
          practiceExercises: l.practiceExercises,
          isQuiz: l.isQuiz,
          estimatedMinutes: l.estimatedMinutes,
          createdAt: l.createdAt.toISOString(),
          updatedAt: l.updatedAt.toISOString(),
        })),
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Teacher get course error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.LIST_FAILED } });
  }
});

// ─── PATCH /:id — Update course metadata ───
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const validated = updateCourseSchema.parse(req.body);
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    const data: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(validated)) {
      if (value !== undefined) {
        data[key] = value;
      }
    }

    const updated = await prisma.course.update({
      where: { id: req.params.id as string },
      data,
    });

    res.json({
      message: TEXTS.COURSE.UPDATE_SUCCESS,
      course: {
        id: updated.id,
        level: updated.level,
        title: updated.title,
        description: updated.description,
        totalLessons: updated.totalLessons,
        estimatedHours: updated.estimatedHours,
        requiredTier: updated.requiredTier,
        creditCostPerLesson: updated.creditCostPerLesson,
        isPublished: updated.isPublished,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: {
          message: `${TEXTS.COURSE.VALIDATION_FAILED}: ${formatZodError(error)}`,
        },
      });
      return;
    }
    console.error('Teacher update course error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.UPDATE_FAILED } });
  }
});

// ─── DELETE /:id — Delete course (guarded) ───
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    const progressCount = await prisma.userLessonProgress.count({
      where: { Lesson: { courseId: req.params.id as string } },
    });

    if (progressCount > 0) {
      res
        .status(409)
        .json({ error: { message: TEXTS.TEACHER.DELETE_HAS_PROGRESS } });
      return;
    }

    await prisma.course.delete({
      where: { id: req.params.id as string },
    });

    res.json({ message: TEXTS.COURSE.DELETE_SUCCESS });
  } catch (error) {
    console.error('Teacher delete course error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.DELETE_FAILED } });
  }
});

// ─── POST /:id/publish — Publish course ───
router.post('/:id/publish', async (req: Request, res: Response) => {
  try {
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    await prisma.course.update({
      where: { id: req.params.id as string },
      data: { isPublished: true },
    });

    res.json({ message: TEXTS.COURSE.PUBLISH_SUCCESS });
  } catch (error) {
    console.error('Teacher publish course error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.UPDATE_FAILED } });
  }
});

// ─── POST /:id/unpublish — Unpublish course ───
router.post('/:id/unpublish', async (req: Request, res: Response) => {
  try {
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    await prisma.course.update({
      where: { id: req.params.id as string },
      data: { isPublished: false },
    });

    res.json({ message: TEXTS.COURSE.UNPUBLISH_SUCCESS });
  } catch (error) {
    console.error('Teacher unpublish course error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.UPDATE_FAILED } });
  }
});

// ─── GET /:id/lessons — List lessons ───
router.get('/:id/lessons', async (req: Request, res: Response) => {
  try {
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    const lessons = await prisma.lesson.findMany({
      where: { courseId: req.params.id as string },
      orderBy: { lessonNumber: 'asc' },
    });

    res.json({
      lessons: lessons.map((l) => ({
        id: l.id,
        lessonNumber: l.lessonNumber,
        unitNumber: l.unitNumber,
        title: l.title,
        description: l.description,
        vocabularyItems: l.vocabularyItems,
        grammarPoints: l.grammarPoints,
        practiceExercises: l.practiceExercises,
        isQuiz: l.isQuiz,
        estimatedMinutes: l.estimatedMinutes,
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Teacher list lessons error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.LIST_FAILED } });
  }
});

// ─── POST /:id/lessons — Create lesson ───
router.post('/:id/lessons', async (req: Request, res: Response) => {
  try {
    const validated = createLessonSchema.parse(req.body);
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    // Check for lessonNumber conflict
    const existing = await prisma.lesson.findUnique({
      where: {
        courseId_lessonNumber: {
          courseId: req.params.id as string,
          lessonNumber: validated.lessonNumber,
        },
      },
    });

    if (existing) {
      res
        .status(409)
        .json({ error: { message: TEXTS.TEACHER.LESSON_NUMBER_CONFLICT } });
      return;
    }

    const lesson = await prisma.lesson.create({
      data: {
        courseId: req.params.id as string,
        ...validated,
        vocabularyItems: validated.vocabularyItems ?? undefined,
        grammarPoints: validated.grammarPoints ?? undefined,
        practiceExercises: validated.practiceExercises ?? undefined,
      },
    });

    // Update course totalLessons
    const lessonCount = await prisma.lesson.count({
      where: { courseId: req.params.id as string },
    });

    await prisma.course.update({
      where: { id: req.params.id as string },
      data: { totalLessons: lessonCount },
    });

    res.status(201).json({
      message: TEXTS.COURSE.LESSON_CREATE_SUCCESS,
      lesson: {
        id: lesson.id,
        lessonNumber: lesson.lessonNumber,
        unitNumber: lesson.unitNumber,
        title: lesson.title,
        description: lesson.description,
        vocabularyItems: lesson.vocabularyItems,
        grammarPoints: lesson.grammarPoints,
        practiceExercises: lesson.practiceExercises,
        isQuiz: lesson.isQuiz,
        estimatedMinutes: lesson.estimatedMinutes,
        createdAt: lesson.createdAt.toISOString(),
        updatedAt: lesson.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: {
          message: `${TEXTS.COURSE.VALIDATION_FAILED}: ${formatZodError(error)}`,
        },
      });
      return;
    }
    console.error('Teacher create lesson error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.CREATE_FAILED } });
  }
});

// ─── PATCH /:id/lessons/:lessonId — Update lesson ───
router.patch('/:id/lessons/:lessonId', async (req: Request, res: Response) => {
  try {
    const validated = updateLessonSchema.parse(req.body);
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: req.params.lessonId as string,
        courseId: req.params.id as string,
      },
    });

    if (!lesson) {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.LESSON_NOT_FOUND } });
      return;
    }

    // If lessonNumber is changing, check for conflict
    if (
      validated.lessonNumber !== undefined &&
      validated.lessonNumber !== lesson.lessonNumber
    ) {
      const conflict = await prisma.lesson.findUnique({
        where: {
          courseId_lessonNumber: {
            courseId: req.params.id as string,
            lessonNumber: validated.lessonNumber,
          },
        },
      });

      if (conflict) {
        res
          .status(409)
          .json({ error: { message: TEXTS.TEACHER.LESSON_NUMBER_CONFLICT } });
        return;
      }
    }

    const data: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(validated)) {
      if (value !== undefined) {
        data[key] = value;
      }
    }

    const updated = await prisma.lesson.update({
      where: { id: req.params.lessonId as string },
      data,
    });

    res.json({
      message: TEXTS.COURSE.LESSON_UPDATE_SUCCESS,
      lesson: {
        id: updated.id,
        lessonNumber: updated.lessonNumber,
        unitNumber: updated.unitNumber,
        title: updated.title,
        description: updated.description,
        vocabularyItems: updated.vocabularyItems,
        grammarPoints: updated.grammarPoints,
        practiceExercises: updated.practiceExercises,
        isQuiz: updated.isQuiz,
        estimatedMinutes: updated.estimatedMinutes,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: {
          message: `${TEXTS.COURSE.VALIDATION_FAILED}: ${formatZodError(error)}`,
        },
      });
      return;
    }
    console.error('Teacher update lesson error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.UPDATE_FAILED } });
  }
});

// ─── DELETE /:id/lessons/:lessonId — Delete lesson ───
router.delete(
  '/:id/lessons/:lessonId',
  async (req: Request, res: Response) => {
    try {
      const teacherId = req.jwtUser!.userId;
      const { error } = await verifyOwnership(
        req.params.id as string,
        teacherId,
      );

      if (error === 'not_found') {
        res
          .status(404)
          .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
        return;
      }
      if (error === 'not_owner') {
        res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
        return;
      }

      const lesson = await prisma.lesson.findFirst({
        where: {
          id: req.params.lessonId as string,
          courseId: req.params.id as string,
        },
      });

      if (!lesson) {
        res
          .status(404)
          .json({ error: { message: TEXTS.TEACHER.LESSON_NOT_FOUND } });
        return;
      }

      await prisma.lesson.delete({
        where: { id: req.params.lessonId as string },
      });

      // Update course totalLessons
      const lessonCount = await prisma.lesson.count({
        where: { courseId: req.params.id as string },
      });

      await prisma.course.update({
        where: { id: req.params.id as string },
        data: { totalLessons: lessonCount },
      });

      res.json({ message: TEXTS.COURSE.LESSON_DELETE_SUCCESS });
    } catch (error) {
      console.error('Teacher delete lesson error:', error);
      res
        .status(500)
        .json({ error: { message: TEXTS.TEACHER.DELETE_FAILED } });
    }
  },
);

// ─── POST /:id/lessons/reorder — Reorder lessons ───
router.post('/:id/lessons/reorder', async (req: Request, res: Response) => {
  try {
    const validated = reorderLessonsSchema.parse(req.body);
    const teacherId = req.jwtUser!.userId;
    const { error } = await verifyOwnership(
      req.params.id as string,
      teacherId,
    );

    if (error === 'not_found') {
      res
        .status(404)
        .json({ error: { message: TEXTS.TEACHER.COURSE_NOT_FOUND } });
      return;
    }
    if (error === 'not_owner') {
      res.status(403).json({ error: { message: TEXTS.TEACHER.NOT_OWNER } });
      return;
    }

    // Verify all lessonIds belong to this course
    const courseLessons = await prisma.lesson.findMany({
      where: {
        id: { in: validated.lessonIds },
        courseId: req.params.id as string,
      },
      select: { id: true },
    });

    if (courseLessons.length !== validated.lessonIds.length) {
      res
        .status(400)
        .json({ error: { message: TEXTS.COURSE.VALIDATION_FAILED } });
      return;
    }

    // Two-pass approach to avoid unique constraint violation
    await prisma.$transaction(async (tx) => {
      // Pass 1: negative temporaries
      for (let i = 0; i < validated.lessonIds.length; i++) {
        await tx.lesson.update({
          where: { id: validated.lessonIds[i] },
          data: { lessonNumber: -(i + 1) },
        });
      }

      // Pass 2: final values
      for (let i = 0; i < validated.lessonIds.length; i++) {
        await tx.lesson.update({
          where: { id: validated.lessonIds[i] },
          data: { lessonNumber: i + 1 },
        });
      }
    });

    res.json({ message: TEXTS.COURSE.REORDER_SUCCESS });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: {
          message: `${TEXTS.COURSE.VALIDATION_FAILED}: ${formatZodError(error)}`,
        },
      });
      return;
    }
    console.error('Teacher reorder lessons error:', error);
    res.status(500).json({ error: { message: TEXTS.TEACHER.UPDATE_FAILED } });
  }
});

export default router;
