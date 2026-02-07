import cors from 'cors';
import { config } from './index.js';
export const corsMiddleware = cors({
    origin: [config.frontendUrl, /\.vercel\.app$/, /^http:\/\/localhost:\d+$/, /^http:\/\/192\.168\.\d+\.\d+:\d+$/],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Gemini-Key'],
    credentials: true,
});
//# sourceMappingURL=cors.js.map