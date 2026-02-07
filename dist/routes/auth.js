import { Router } from 'express';
import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken, } from '../utils/jwt.js';
import { requireAuth } from '../middleware/auth.js';
import { rateLimit } from '../middleware/rateLimit.js';
const router = Router();
// POST /auth/register
router.post('/register', rateLimit(), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !email.includes('@')) {
            res.status(400).json({ success: false, message: '请提供有效的邮箱地址' });
            return;
        }
        if (!password || password.length < 6) {
            res.status(400).json({ success: false, message: '密码至少需要6个字符' });
            return;
        }
        const existing = await User.findOne({ email });
        if (existing) {
            res.status(409).json({ success: false, message: '该邮箱已被注册' });
            return;
        }
        const passwordHash = await hashPassword(password);
        const user = await User.create({
            name: name || email.split('@')[0],
            email,
            passwordHash,
            provider: 'credentials',
        });
        const userId = String(user._id);
        const accessToken = signAccessToken({
            userId,
            email: user.email,
            provider: user.provider,
        });
        const refreshToken = signRefreshToken({ userId });
        // Store refresh token hash
        user.refreshTokenHash = await hashPassword(refreshToken);
        await user.save();
        res.status(201).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                provider: user.provider,
                avatar: user.avatar,
            },
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: '注册过程中发生错误' });
    }
});
// POST /auth/login
router.post('/login', rateLimit({ maxTokens: 10, refillRate: 0.5 }), async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: '请提供邮箱和密码' });
            return;
        }
        const user = await User.findOne({ email, provider: 'credentials' });
        if (!user || !user.passwordHash) {
            res.status(401).json({ success: false, message: '邮箱或密码错误' });
            return;
        }
        const valid = await comparePassword(password, user.passwordHash);
        if (!valid) {
            res.status(401).json({ success: false, message: '邮箱或密码错误' });
            return;
        }
        const userId = String(user._id);
        const accessToken = signAccessToken({
            userId,
            email: user.email,
            provider: user.provider,
        });
        const refreshToken = signRefreshToken({ userId });
        // Rotate refresh token
        user.refreshTokenHash = await hashPassword(refreshToken);
        user.lastLoginAt = new Date();
        await user.save();
        res.json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                provider: user.provider,
                avatar: user.avatar,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: '登录过程中发生错误' });
    }
});
// POST /auth/refresh
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({ success: false, message: '缺少刷新令牌' });
            return;
        }
        let payload;
        try {
            payload = verifyRefreshToken(refreshToken);
        }
        catch {
            res.status(401).json({ success: false, message: '刷新令牌无效或已过期' });
            return;
        }
        const user = await User.findById(payload.userId);
        if (!user || !user.refreshTokenHash) {
            res.status(401).json({ success: false, message: '用户不存在' });
            return;
        }
        // Verify stored refresh token hash matches
        const valid = await comparePassword(refreshToken, user.refreshTokenHash);
        if (!valid) {
            // Possible token reuse — invalidate all refresh tokens
            user.refreshTokenHash = undefined;
            await user.save();
            res.status(401).json({ success: false, message: '刷新令牌已失效，请重新登录' });
            return;
        }
        // Issue new token pair (rotation)
        const userId = String(user._id);
        const newAccessToken = signAccessToken({
            userId,
            email: user.email,
            provider: user.provider,
        });
        const newRefreshToken = signRefreshToken({ userId });
        user.refreshTokenHash = await hashPassword(newRefreshToken);
        await user.save();
        res.json({
            success: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    }
    catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ success: false, message: '令牌刷新失败' });
    }
});
// GET /auth/me
router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.jwtUser.userId).select('-passwordHash -refreshTokenHash');
        if (!user) {
            res.status(404).json({ error: { message: '用户不存在' } });
            return;
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            provider: user.provider,
            avatar: user.avatar,
            createdAt: user.createdAt,
        });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: { message: '获取用户信息失败' } });
    }
});
export default router;
//# sourceMappingURL=auth.js.map