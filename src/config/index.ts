import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),

  // Gemini (or alternative AI provider)
  apiKey: process.env.API_KEY || '',
  apiUrl:
    process.env.API_URL ||
    'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
  modelName: process.env.MODEL_NAME || 'gemini-2.5-flash',

  // Code gate
  code: process.env.CODE || '',

  // CORS
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // JWT
  jwtSecret: process.env.JWT_SECRET || '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',

  // OAuth (Phase 3)
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  facebookClientId: process.env.FACEBOOK_CLIENT_ID || '',
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:4000',

  // Stripe (Subscription System)
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    proPriceIds: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || '',
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID || '',
    },
    premiumPriceIds: {
      monthly: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || '',
      yearly: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID || '',
    },
  },

  // PostgreSQL
  databaseUrl: process.env.DATABASE_URL || '',
};
