import { test, expect } from '@playwright/test';
import { registerUser, authHeader } from './helpers';

const BASE = '/api/history';

test.describe('History Routes', () => {
  let tokens: Awaited<ReturnType<typeof registerUser>>;

  test.beforeAll(async ({ request }) => {
    tokens = await registerUser(request, 'history');
  });

  test.describe('GET /history', () => {
    test('returns empty list for new user', async ({ request }) => {
      const res = await request.get(BASE, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.items).toEqual([]);
      expect(body.total).toBe(0);
      expect(body.page).toBe(1);
    });

    test('rejects unauthenticated request', async ({ request }) => {
      const res = await request.get(BASE);
      expect(res.status()).toBe(401);
    });
  });

  test.describe('POST /history', () => {
    test('saves an analysis', async ({ request }) => {
      const res = await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: {
          sentence: '今日は天気がいいです',
          tokens: [{ word: '今日', pos: '名詞' }],
          translations: { quick: '今天天气很好' },
          fullTranslation: '今天天气很好',
        },
      });
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body.inputText).toBe('今日は天気がいいです');
      expect(body.id).toBeTruthy();
    });

    test('rejects missing sentence', async ({ request }) => {
      const res = await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: { tokens: [] },
      });
      expect(res.status()).toBe(400);
    });
  });

  test.describe('GET /history (with data)', () => {
    test('returns saved analyses with pagination', async ({ request }) => {
      // Save a second analysis
      await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: { sentence: '日本語を勉強しています', tokens: [] },
      });

      const res = await request.get(`${BASE}?page=1&limit=10`, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.items.length).toBeGreaterThanOrEqual(2);
      expect(body.total).toBeGreaterThanOrEqual(2);
      expect(body.totalPages).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('DELETE /history/:id', () => {
    test('deletes an analysis', async ({ request }) => {
      // Create one to delete
      const createRes = await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: { sentence: '削除テスト', tokens: [] },
      });
      const { id } = await createRes.json();

      const res = await request.delete(`${BASE}/${id}`, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    test('returns 404 for non-existent id', async ({ request }) => {
      const res = await request.delete(`${BASE}/nonexistent-id`, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(404);
    });
  });
});
