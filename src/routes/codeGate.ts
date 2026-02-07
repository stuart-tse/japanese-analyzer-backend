import { Router, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { config } from '../config/index.js';

const router = Router();

// POST /auth/code-gate — verify password
router.post('/', rateLimit({ maxTokens: 5, refillRate: 0.1 }), (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const correctPassword = config.code;

    if (!correctPassword) {
      res.json({ success: true, message: '无需密码验证' });
      return;
    }

    if (password === correctPassword) {
      res.json({ success: true, message: '验证成功' });
    } else {
      res.status(401).json({ success: false, message: '密码错误，请重试' });
    }
  } catch (error) {
    console.error('身份验证错误:', error);
    res.status(500).json({ success: false, message: '验证过程中发生错误' });
  }
});

// GET /auth/code-gate — check if password is required
router.get('/', (_req: Request, res: Response) => {
  try {
    res.json({ requiresAuth: !!config.code });
  } catch (error) {
    console.error('获取验证状态错误:', error);
    res.json({ requiresAuth: false });
  }
});

export default router;
