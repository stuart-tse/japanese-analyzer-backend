import express from 'express';
import passport from 'passport';
import { corsMiddleware } from './config/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import webhookRoutes from './routes/webhooks.js';

export function createApp() {
  const app = express();

  // Global middleware
  app.use(corsMiddleware);

  // IMPORTANT: Webhook routes need raw body for signature verification
  // Must be before express.json() middleware
  app.use('/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

  // JSON body parser for all other routes
  app.use(express.json({ limit: '15mb' }));
  app.use(passport.initialize());

  // Health check (for AWS Elastic Beanstalk)
  app.get('/health', async (_req, res) => {
    try {
      // TODO: Add database ping check if needed
      // await prisma.$queryRaw`SELECT 1`;
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      });
    } catch (error) {
      res.status(503).json({
        status: 'error',
        message: 'Service unavailable',
      });
    }
  });

  // API routes (mounted at /api)
  app.use('/api', routes);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
}
