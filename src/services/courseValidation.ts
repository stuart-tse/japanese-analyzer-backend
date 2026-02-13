import { z } from 'zod';

// ============================================
// Course Validation Schemas
// ============================================

export const createCourseSchema = z.object({
  level: z.string().min(1).max(10),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  estimatedHours: z.number().int().min(0).optional(),
  requiredTier: z.enum(['FREE', 'PRO', 'PREMIUM']).default('FREE'),
  creditCostPerLesson: z.number().int().min(0).default(0),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;

// ============================================
// Lesson Validation Schemas
// ============================================

export const createLessonSchema = z.object({
  lessonNumber: z.number().int().min(1),
  unitNumber: z.number().int().min(1).optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  vocabularyItems: z.unknown().optional(),
  grammarPoints: z.unknown().optional(),
  practiceExercises: z.unknown().optional(),
  isQuiz: z.boolean().default(false),
  estimatedMinutes: z.number().int().min(1).default(30),
});

export const updateLessonSchema = createLessonSchema.partial();

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;

// ============================================
// Reorder Schema
// ============================================

export const reorderLessonsSchema = z.object({
  lessonIds: z.array(z.string().min(1)),
});

export type ReorderLessonsInput = z.infer<typeof reorderLessonsSchema>;
