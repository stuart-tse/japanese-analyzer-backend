import { APIRequestContext } from '@playwright/test';

const BASE = '/api';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

/**
 * Register a new test user and return tokens.
 */
export async function registerUser(
  request: APIRequestContext,
  suffix: string,
): Promise<AuthTokens> {
  const email = `e2e-${suffix}-${Date.now()}@test.local`;
  const res = await request.post(`${BASE}/auth/register`, {
    data: { name: `Test ${suffix}`, email, password: 'Test1234!' },
  });
  const body = await res.json();
  if (!res.ok()) {
    throw new Error(`Register failed: ${res.status()} ${JSON.stringify(body)}`);
  }
  return {
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
    userId: body.user.id,
  };
}

/**
 * Login with email/password and return tokens.
 */
export async function loginUser(
  request: APIRequestContext,
  email: string,
  password: string,
): Promise<AuthTokens> {
  const res = await request.post(`${BASE}/auth/login`, {
    data: { email, password },
  });
  const body = await res.json();
  if (!res.ok()) {
    throw new Error(`Login failed: ${res.status()} ${JSON.stringify(body)}`);
  }
  return {
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
    userId: body.user.id,
  };
}

/**
 * Build Authorization header object.
 */
export function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

/**
 * Delete test user from DB directly (cleanup after tests).
 * Uses the Prisma client directly via a cleanup endpoint isn't available,
 * so we rely on cascading deletes when the user is removed.
 * For E2E tests we accept orphaned data — or we can add a cleanup API.
 *
 * Since we can't import Prisma in Playwright (different runtime), we
 * simply leave test users. Each test uses unique emails so there's no collision.
 */
export function uniqueEmail(prefix: string): string {
  return `e2e-${prefix}-${Date.now()}@test.local`;
}
