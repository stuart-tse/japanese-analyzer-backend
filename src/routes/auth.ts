import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { TEXTS } from "../constants/texts.js";
import { deriveRoles, getUserPermissions } from "../constants/permissions.js";

const router = Router();

// POST /auth/register
router.post("/register", rateLimit(), async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !email.includes("@")) {
      res.status(400).json({ success: false, message: "请提供有效的邮箱地址" });
      return;
    }

    if (!password || password.length < 6) {
      res.status(400).json({ success: false, message: "密码至少需要6个字符" });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ success: false, message: "该邮箱已被注册" });
      return;
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        displayName: name || email.split("@")[0],
        email,
        passwordHash,
        provider: "credentials",
      },
    });

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      provider: user.provider,
    });
    const refreshToken = signRefreshToken({ userId: user.id });

    // Store refresh token hash
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: await hashPassword(refreshToken) },
    });

    const roles = deriveRoles(user.role, user.roles);
    res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.displayName,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        roles,
        permissions: getUserPermissions(roles),
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "注册过程中发生错误" });
  }
});

// POST /auth/login
router.post(
  "/login",
  rateLimit({ maxTokens: 10, refillRate: 0.5 }),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ success: false, message: "请提供邮箱和密码" });
        return;
      }

      const user = await prisma.user.findFirst({
        where: { email, provider: "credentials" },
      });
      if (!user || !user.passwordHash) {
        res.status(401).json({ success: false, message: "邮箱或密码错误" });
        return;
      }

      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) {
        res.status(401).json({ success: false, message: "邮箱或密码错误" });
        return;
      }

      const accessToken = signAccessToken({
        userId: user.id,
        email: user.email,
        provider: user.provider,
      });
      const refreshToken = signRefreshToken({ userId: user.id });

      // Rotate refresh token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          refreshTokenHash: await hashPassword(refreshToken),
          lastLoginAt: new Date(),
        },
      });

      const roles = deriveRoles(user.role, user.roles);
      res.json({
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.displayName,
          email: user.email,
          provider: user.provider,
          avatar: user.avatar,
          roles,
          permissions: getUserPermissions(roles),
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "登录过程中发生错误" });
    }
  },
);

// POST /auth/refresh
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ success: false, message: "缺少刷新令牌" });
      return;
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      res.status(401).json({ success: false, message: "刷新令牌无效或已过期" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user || !user.refreshTokenHash) {
      res.status(401).json({ success: false, message: "用户不存在" });
      return;
    }

    // Verify stored refresh token hash matches
    const valid = await comparePassword(refreshToken, user.refreshTokenHash);
    if (!valid) {
      // Possible token reuse — invalidate all refresh tokens
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshTokenHash: null },
      });
      res
        .status(401)
        .json({ success: false, message: "刷新令牌已失效，请重新登录" });
      return;
    }

    // Issue new token pair (rotation)
    const newAccessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      provider: user.provider,
    });
    const newRefreshToken = signRefreshToken({ userId: user.id });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: await hashPassword(newRefreshToken) },
    });

    res.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ success: false, message: "令牌刷新失败" });
  }
});

// GET /auth/me
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.jwtUser!.userId },
      select: {
        id: true,
        displayName: true,
        email: true,
        provider: true,
        avatar: true,
        phone: true,
        role: true,
        roles: true,
        twitter: true,
        weibo: true,
        douyin: true,
        tiktok: true,
        instagram: true,
        subscriptionTier: true,
        credits: true,
        createdAt: true,
      },
    });
    if (!user) {
      res
        .status(404)
        .json({ error: { message: TEXTS.PROFILE.USER_NOT_FOUND } });
      return;
    }

    const roles = deriveRoles(user.role, user.roles);
    res.json({
      id: user.id,
      name: user.displayName,
      email: user.email,
      provider: user.provider,
      avatar: user.avatar,
      phone: user.phone,
      role: user.role,
      roles,
      permissions: getUserPermissions(roles),
      twitter: user.twitter,
      weibo: user.weibo,
      douyin: user.douyin,
      tiktok: user.tiktok,
      instagram: user.instagram,
      subscriptionTier: user.subscriptionTier,
      credits: user.credits,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: { message: TEXTS.PROFILE.FETCH_FAILED } });
  }
});

export default router;
