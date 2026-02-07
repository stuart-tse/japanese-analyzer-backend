import cors from 'cors';
import { config } from './index.js';

const allowedOrigins: (string | RegExp)[] = [
  config.frontendUrl,
  /\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
];

// Add CORS_ORIGIN from environment if set
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

export const corsMiddleware = cors({
  origin: allowedOrigins,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Gemini-Key'],
  credentials: true,
});
