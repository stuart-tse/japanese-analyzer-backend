import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProfile, updateProfile, updateAvatar, profileUpdateSchema } from '../services/profileService.js';
import { generateAvatarUploadUrl } from '../services/uploadService.js';
import { TEXTS } from '../constants/texts.js';
import { ZodError } from 'zod';

const router = Router();

// All profile routes require authentication
router.use(requireAuth);

/**
 * GET /api/me/profile
 * Get the current user's full profile.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const profile = await getProfile(userId);

    if (!profile) {
      res.status(404).json({ success: false, message: TEXTS.PROFILE.USER_NOT_FOUND });
      return;
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: TEXTS.PROFILE.FETCH_FAILED });
  }
});

/**
 * PATCH /api/me/profile
 * Update profile fields (displayName, phone, social links).
 */
router.patch('/', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const profile = await updateProfile(userId, req.body, req);
    res.json({ success: true, profile });
  } catch (error) {
    if (error instanceof ZodError) {
      const firstIssue = error.issues[0];
      res.status(400).json({ success: false, message: firstIssue.message });
      return;
    }
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: TEXTS.PROFILE.UPDATE_FAILED });
  }
});

/**
 * POST /api/me/avatar/upload-url
 * Generate a presigned S3 URL for avatar upload.
 */
router.post('/avatar/upload-url', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { fileExtension } = req.body;

    if (!fileExtension) {
      res.status(400).json({ success: false, message: TEXTS.UPLOAD.MISSING_EXTENSION });
      return;
    }

    const result = await generateAvatarUploadUrl(userId, fileExtension);
    res.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : TEXTS.UPLOAD.URL_GENERATION_FAILED;
    res.status(400).json({ success: false, message });
  }
});

/**
 * POST /api/me/avatar/confirm
 * Confirm avatar upload — saves the object URL to the user's profile.
 */
router.post('/avatar/confirm', async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const { objectUrl } = req.body;

    if (!objectUrl) {
      res.status(400).json({ success: false, message: TEXTS.UPLOAD.MISSING_OBJECT_URL });
      return;
    }

    const profile = await updateAvatar(userId, objectUrl, req);
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Confirm avatar error:', error);
    res.status(500).json({ success: false, message: TEXTS.UPLOAD.AVATAR_CONFIRM_FAILED });
  }
});

export default router;
