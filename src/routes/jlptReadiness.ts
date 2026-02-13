import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { computeReadiness } from '../services/readinessService.js';
import { TEXTS } from '../constants/texts.js';

const router = Router();

// GET /jlpt-readiness — returns per-level readiness breakdown
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.jwtUser!.userId;
    const result = await computeReadiness(userId);
    res.json(result);
  } catch (error) {
    console.error('JLPT readiness fetch error:', error);
    res.status(500).json({ error: { message: TEXTS.READINESS.FETCH_FAILED } });
  }
});

export default router;
