import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4099',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  webServer: {
    command: 'PORT=4099 npx tsx src/server.ts',
    port: 4099,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
    env: {
      PORT: '4099',
      JWT_SECRET: process.env.JWT_SECRET || 'e2e-test-jwt-secret-key',
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'e2e-test-jwt-refresh-secret-key',
      DATABASE_URL: process.env.DATABASE_URL || '',
      API_KEY: process.env.API_KEY || '',
      API_URL: process.env.API_URL || '',
      MODEL_NAME: process.env.MODEL_NAME || '',
    },
  },
});
