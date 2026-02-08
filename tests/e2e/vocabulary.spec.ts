import { test, expect } from '@playwright/test';
import { registerUser, authHeader } from './helpers';

const BASE = '/api/vocabulary';

test.describe('Vocabulary Routes', () => {
  let tokens: Awaited<ReturnType<typeof registerUser>>;

  test.beforeAll(async ({ request }) => {
    tokens = await registerUser(request, 'vocab');
  });

  test.describe('GET /vocabulary', () => {
    test('returns empty list for new user', async ({ request }) => {
      const res = await request.get(BASE, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.items).toEqual([]);
      expect(body.total).toBe(0);
    });

    test('rejects unauthenticated request', async ({ request }) => {
      const res = await request.get(BASE);
      expect(res.status()).toBe(401);
    });
  });

  test.describe('POST /vocabulary', () => {
    test('adds a word', async ({ request }) => {
      const res = await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: {
          word: '食べる',
          furigana: 'たべる',
          romaji: 'taberu',
          meaning_zh_CN: '吃',
          jlptLevel: 'N5',
          pos: '動詞',
        },
      });
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body.word).toBe('食べる');
      expect(body.meaningZhCN).toBe('吃');
      expect(body.srsStage).toBe('learning');
      expect(body.srsEaseFactor).toBe(2.5);
    });

    test('upserts existing word', async ({ request }) => {
      const res = await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: {
          word: '食べる',
          notes: 'Updated note',
        },
      });
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body.word).toBe('食べる');
      expect(body.notes).toBe('Updated note');
    });

    test('rejects missing word', async ({ request }) => {
      const res = await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: { furigana: 'test' },
      });
      expect(res.status()).toBe(400);
    });
  });

  test.describe('GET /vocabulary (with data)', () => {
    test('returns saved words with pagination', async ({ request }) => {
      // Add another word
      await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: { word: '飲む', furigana: 'のむ', meaning_zh_CN: '喝', jlptLevel: 'N5', pos: '動詞' },
      });

      const res = await request.get(`${BASE}?page=1&limit=10`, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.items.length).toBeGreaterThanOrEqual(2);
      expect(body.total).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('DELETE /vocabulary/:id', () => {
    test('deletes a word', async ({ request }) => {
      // Create one to delete
      const createRes = await request.post(BASE, {
        headers: authHeader(tokens.accessToken),
        data: { word: '消す', meaning_zh_CN: '删除', jlptLevel: 'N4' },
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
