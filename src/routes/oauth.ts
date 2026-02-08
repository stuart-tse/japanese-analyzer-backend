import { Router, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from '../config/index.js';
import { prisma } from '../config/prisma.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';
import { hashPassword } from '../utils/password.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = Router();

// --- Helper: find-or-create OAuth user and generate tokens ---
async function handleOAuthUser(profile: {
  provider: 'google' | 'facebook';
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
}): Promise<{ accessToken: string; refreshToken: string }> {
  // Look up by provider + providerId
  let user = await prisma.user.findFirst({
    where: { provider: profile.provider, providerId: profile.providerId },
  });

  if (!user) {
    // Check if a user with the same email exists (link accounts)
    user = await prisma.user.findUnique({ where: { email: profile.email } });
    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          provider: profile.provider,
          providerId: profile.providerId,
          avatar: profile.avatar ?? user.avatar,
          lastLoginAt: new Date(),
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          displayName: profile.name,
          email: profile.email,
          provider: profile.provider,
          providerId: profile.providerId,
          avatar: profile.avatar,
        },
      });
    }
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        avatar: profile.avatar ?? user.avatar,
      },
    });
  }

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
    provider: user.provider,
  });
  const refreshToken = signRefreshToken({ userId: user.id });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash: await hashPassword(refreshToken) },
  });

  return { accessToken, refreshToken };
}

// --- Google OAuth ---
if (config.googleClientId && config.googleClientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: `${config.backendUrl}/auth/google/callback`,
        scope: ['profile', 'email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || '';
          const tokens = await handleOAuthUser({
            provider: 'google',
            providerId: profile.id,
            email,
            name: profile.displayName || email.split('@')[0],
            avatar: profile.photos?.[0]?.value,
          });
          done(null, tokens);
        } catch (err) {
          done(err as Error);
        }
      },
    ),
  );

  router.get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: config.frontendUrl }),
    (req: Request, res: Response) => {
      const { accessToken, refreshToken } = req.user as { accessToken: string; refreshToken: string };
      const params = new URLSearchParams({ accessToken, refreshToken });
      res.redirect(`${config.frontendUrl}?${params.toString()}`);
    },
  );
}

// --- Facebook OAuth ---
if (config.facebookClientId && config.facebookClientSecret) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebookClientId,
        clientSecret: config.facebookClientSecret,
        callbackURL: `${config.backendUrl}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.id}@facebook.placeholder`;
          const tokens = await handleOAuthUser({
            provider: 'facebook',
            providerId: profile.id,
            email,
            name: profile.displayName || 'Facebook User',
            avatar: profile.photos?.[0]?.value,
          });
          done(null, tokens);
        } catch (err) {
          done(err as Error);
        }
      },
    ),
  );

  router.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }));

  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: config.frontendUrl }),
    (req: Request, res: Response) => {
      const { accessToken, refreshToken } = req.user as { accessToken: string; refreshToken: string };
      const params = new URLSearchParams({ accessToken, refreshToken });
      res.redirect(`${config.frontendUrl}?${params.toString()}`);
    },
  );
}

// --- Phone OTP stub ---
router.post('/phone-login', rateLimit({ maxTokens: 5, refillRate: 0.2 }), async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      res.status(400).json({ success: false, message: '请提供手机号和验证码' });
      return;
    }

    // Stub: accept any 6-digit code
    if (!/^\d{6}$/.test(otp)) {
      res.status(400).json({ success: false, message: '验证码格式不正确' });
      return;
    }

    // Find or create phone user
    let user = await prisma.user.findFirst({
      where: { phone, provider: 'phone' },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          displayName: `User ${phone.slice(-4)}`,
          email: `${phone}@phone.placeholder`,
          phone,
          provider: 'phone',
        },
      });
    }

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      provider: user.provider,
    });
    const refreshToken = signRefreshToken({ userId: user.id });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokenHash: await hashPassword(refreshToken),
        lastLoginAt: new Date(),
      },
    });

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
      },
    });
  } catch (error) {
    console.error('Phone login error:', error);
    res.status(500).json({ success: false, message: '手机登录失败' });
  }
});

export default router;
