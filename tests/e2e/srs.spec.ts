import { test, expect } from '@playwright/test';
import { registerUser, authHeader } from './helpers';

test.describe('SRS Routes', () => {
  let tokens: Awaited<ReturnType<typeof registerUser>>;

  test.beforeAll(async ({ request }) => {
    tokens = await registerUser(request, 'srs');

    // Seed vocabulary words for SRS testing
    for (const word of ['読む', '書く', '聞く']) {
      await request.post('/api/vocabulary', {
        headers: authHeader(tokens.accessToken),
        data: {
          word,
          furigana: word,
          meaning_zh_CN: 'test',
          jlptLevel: 'N5',
          pos: '動詞',
        },
      });
    }
  });

  test.describe('GET /srs/stats', () => {
    test('returns SRS statistics', async ({ request }) => {
      const res = await request.get('/api/srs/stats', {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(typeof body.dueToday).toBe('number');
      expect(typeof body.learning).toBe('number');
      expect(typeof body.review).toBe('number');
      expect(typeof body.mastered).toBe('number');
      expect(typeof body.total).toBe('number');
    });

    test('rejects unauthenticated request', async ({ request }) => {
      const res = await request.get('/api/srs/stats');
      expect(res.status()).toBe(401);
    });
  });

  test.describe('GET /srs/due', () => {
    test('returns due words', async ({ request }) => {
      const res = await request.get('/api/srs/due', {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body.items)).toBe(true);
      expect(typeof body.count).toBe('number');
    });

    test('respects limit parameter', async ({ request }) => {
      const res = await request.get('/api/srs/due?limit=1', {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.items.length).toBeLessThanOrEqual(1);
    });
  });

  test.describe('POST /srs/review', () => {
    test('submits a review with quality 4 (good)', async ({ request }) => {
      // Get a due word first
      const dueRes = await request.get('/api/srs/due?limit=1', {
        headers: authHeader(tokens.accessToken),
      });
      const dueBody = await dueRes.json();

      if (dueBody.items.length === 0) {
        test.skip();
        return;
      }

      const wordId = dueBody.items[0]._id;

      const res = await request.post('/api/srs/review', {
        headers: authHeader(tokens.accessToken),
        data: { wordId, quality: 4 },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.word).toBeTruthy();
      expect(body.srsStage).toBeTruthy();
      expect(typeof body.srsInterval).toBe('number');
      expect(typeof body.reviewCount).toBe('number');
    });

    test('rejects invalid quality value', async ({ request }) => {
      const res = await request.post('/api/srs/review', {
        headers: authHeader(tokens.accessToken),
        data: { wordId: 'some-id', quality: 10 },
      });
      expect(res.status()).toBe(400);
    });

    test('rejects missing wordId', async ({ request }) => {
      const res = await request.post('/api/srs/review', {
        headers: authHeader(tokens.accessToken),
        data: { quality: 3 },
      });
      expect(res.status()).toBe(400);
    });

    test('returns 404 for non-existent word', async ({ request }) => {
      const res = await request.post('/api/srs/review', {
        headers: authHeader(tokens.accessToken),
        data: { wordId: 'nonexistent-id', quality: 3 },
      });
      expect(res.status()).toBe(404);
    });
  });
});
