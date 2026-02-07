import serverless from 'serverless-http';
import { createApp } from './app.js';
import { connectDB } from './config/database.js';

let isConnected = false;

async function ensureDBConnection() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

const app = createApp();

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Keep Lambda warm for connection reuse
  context.callbackWaitsForEmptyEventLoop = false;

  await ensureDBConnection();
  return serverlessHandler(event, context);
};
