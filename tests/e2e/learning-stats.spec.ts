import { test, expect } from '@playwright/test';
import { registerUser, authHeader } from './helpers';

const BASE = '/api/learning-stats';

test.describe('Learning Stats Routes', () => {
  let tokens: Awaited<ReturnType<typeof registerUser>>;

  test.beforeAll(async ({ request }) => {
    tokens = await registerUser(request, 'lstats');
  });

  test.describe('GET /learning-stats', () => {
    test('returns stats (auto-creates for new user)', async ({ request }) => {
      const res = await request.get(BASE, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.userId).toBe(tokens.userId);
      expect(body.totalAnalyses).toBe(0);
      expect(body.totalWordsLearned).toBe(0);
      expect(body.streakDays).toBe(0);
    });

    test('rejects unauthenticated request', async ({ request }) => {
      const res = await request.get(BASE);
      expect(res.status()).toBe(401);
    });
  });

  test.describe('POST /learning-stats/update', () => {
    test('increments analysis count', async ({ request }) => {
      const res = await request.post(`${BASE}/update`, {
        headers: authHeader(tokens.accessToken),
        data: { wordsLearned: 5, jlptLevel: 'N5' },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.totalAnalyses).toBe(1);
      expect(body.totalWordsLearned).toBe(5);
    });

    test('accumulates stats on subsequent calls', async ({ request }) => {
      const res = await request.post(`${BASE}/update`, {
        headers: authHeader(tokens.accessToken),
        data: { wordsLearned: 3, jlptLevel: 'N5' },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.totalAnalyses).toBe(2);
      expect(body.totalWordsLearned).toBe(8);
    });

    test('tracks JLPT progress', async ({ request }) => {
      await request.post(`${BASE}/update`, {
        headers: authHeader(tokens.accessToken),
        data: { jlptLevel: 'N4' },
      });

      const res = await request.get(BASE, {
        headers: authHeader(tokens.accessToken),
      });
      const body = await res.json();
      const jlptProgress = body.jlptProgress as Record<string, number>;
      expect(jlptProgress['N5']).toBe(2);
      expect(jlptProgress['N4']).toBe(1);
    });

    test('tracks daily activity', async ({ request }) => {
      const res = await request.get(BASE, {
        headers: authHeader(tokens.accessToken),
      });
      const body = await res.json();
      const dailyActivity = body.dailyActivity as Array<{ date: string; count: number }>;
      expect(dailyActivity.length).toBeGreaterThan(0);

      const today = new Date().toISOString().slice(0, 10);
      const todayEntry = dailyActivity.find(d => d.date === today);
      expect(todayEntry).toBeTruthy();
      expect(todayEntry!.count).toBeGreaterThan(0);
    });
  });
});
