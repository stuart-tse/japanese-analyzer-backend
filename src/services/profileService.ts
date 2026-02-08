import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { logAudit, extractRequestMeta } from './auditService.js';
import { TEXTS } from '../constants/texts.js';
import type { Request } from 'express';

// ============================================
// Validation Schemas
// ============================================

const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format

const socialLinkSchema = z
  .string()
  .max(200)
  .nullable()
  .optional()
  .transform((v) => v?.trim() || null);

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .transform((v) => v?.trim()),
  phone: z
    .string()
    .regex(phoneRegex, TEXTS.PROFILE.INVALID_PHONE)
    .nullable()
    .optional(),
  twitter: socialLinkSchema,
  weibo: socialLinkSchema,
  douyin: socialLinkSchema,
  tiktok: socialLinkSchema,
  instagram: socialLinkSchema,
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// ============================================
// Profile Select (fields returned to client)
// ============================================

const PROFILE_SELECT = {
  id: true,
  email: true,
  displayName: true,
  avatar: true,
  phone: true,
  role: true,
  twitter: true,
  weibo: true,
  douyin: true,
  tiktok: true,
  instagram: true,
  subscriptionTier: true,
  credits: true,
  createdAt: true,
} as const;

// ============================================
// Service Functions
// ============================================

/**
 * Get a user's full profile.
 */
export async function getProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: PROFILE_SELECT,
  });
}

/**
 * Update profile fields with audit logging.
 * Returns the updated profile.
 */
export async function updateProfile(
  userId: string,
  input: ProfileUpdateInput,
  req: Request
) {
  const validated = profileUpdateSchema.parse(input);

  // Build data object with only provided fields (no undefined)
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(validated)) {
    if (value !== undefined) {
      data[key] = value;
    }
  }

  if (Object.keys(data).length === 0) {
    return getProfile(userId);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data,
    select: PROFILE_SELECT,
  });

  // Non-blocking audit
  const meta = extractRequestMeta(req);
  logAudit({
    userId,
    action: 'profile.update',
    entity: 'user',
    entityId: userId,
    details: { updatedFields: Object.keys(data) },
    ...meta,
  });

  return updated;
}

/**
 * Update only the avatar URL after S3 upload confirmation.
 */
export async function updateAvatar(userId: string, avatarUrl: string, req: Request) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { avatar: avatarUrl },
    select: PROFILE_SELECT,
  });

  const meta = extractRequestMeta(req);
  logAudit({
    userId,
    action: 'profile.avatar_update',
    entity: 'user',
    entityId: userId,
    details: { avatarUrl },
    ...meta,
  });

  return updated;
}
