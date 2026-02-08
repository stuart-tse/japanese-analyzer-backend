import serverless from 'serverless-http';
import { createApp } from './app.js';

const app = createApp();

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Keep Lambda warm for connection reuse
  context.callbackWaitsForEmptyEventLoop = false;

  return serverlessHandler(event, context);
};
