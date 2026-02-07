import { beforeAll, afterAll, afterEach, jest } from '@jest/globals';

// Set test environment variables
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(process.env as any).NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_mock';
process.env.JWT_SECRET = 'test_jwt_secret';

beforeAll(() => {
  // Global setup
});

afterEach(() => {
  // Clean up after each test
  jest.clearAllMocks();
});

afterAll(() => {
  // Global teardown
});
