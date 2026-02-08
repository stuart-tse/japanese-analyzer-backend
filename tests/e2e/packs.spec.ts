import { test, expect } from '@playwright/test';
import { registerUser, authHeader } from './helpers';

test.describe('Packs Routes', () => {
  let tokens: Awaited<ReturnType<typeof registerUser>>;

  test.beforeAll(async ({ request }) => {
    tokens = await registerUser(request, 'packs');
  });

  test.describe('GET /packs', () => {
    test('lists all N5 packs with progress', async ({ request }) => {
      const res = await request.get('/api/packs', {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body.packs)).toBe(true);
      expect(body.packs.length).toBeGreaterThan(0);
      expect(typeof body.totalWords).toBe('number');
      expect(typeof body.totalLearned).toBe('number');

      // First pack should be available for new user
      const firstPack = body.packs[0];
      expect(firstPack.packId).toBeTruthy();
      expect(firstPack.name_zh_CN).toBeTruthy();
      expect(firstPack.wordCount).toBeGreaterThan(0);
      expect(firstPack.status).toBe('available');
    });

    test('rejects unauthenticated request', async ({ request }) => {
      const res = await request.get('/api/packs');
      expect(res.status()).toBe(401);
    });
  });

  test.describe('GET /packs/:packId', () => {
    test('returns pack detail with words', async ({ request }) => {
      // Get pack list first
      const listRes = await request.get('/api/packs', {
        headers: authHeader(tokens.accessToken),
      });
      const { packs } = await listRes.json();
      const packId = packs[0].packId;

      const res = await request.get(`/api/packs/${packId}`, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.packId).toBe(packId);
      expect(Array.isArray(body.words)).toBe(true);
      expect(body.words.length).toBeGreaterThan(0);

      // Each word should have vocabulary data
      const word = body.words[0];
      expect(word.word).toBeTruthy();
      expect(typeof word.furigana).toBe('string');
      expect(typeof word.romaji).toBe('string');

      // Should include progress
      expect(body.progress).toBeTruthy();
      expect(body.progress.status).toBeTruthy();
    });

    test('returns 404 for non-existent pack', async ({ request }) => {
      const res = await request.get('/api/packs/nonexistent-pack', {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(404);
    });
  });

  test.describe('POST /packs/:packId/study', () => {
    test('marks words as studied', async ({ request }) => {
      const listRes = await request.get('/api/packs', {
        headers: authHeader(tokens.accessToken),
      });
      const { packs } = await listRes.json();
      const packId = packs[0].packId;

      // Get pack detail to find actual words
      const detailRes = await request.get(`/api/packs/${packId}`, {
        headers: authHeader(tokens.accessToken),
      });
      const detail = await detailRes.json();
      const wordsToStudy = detail.words.slice(0, 3).map((w: { word: string }) => w.word);

      const res = await request.post(`/api/packs/${packId}/study`, {
        headers: authHeader(tokens.accessToken),
        data: { words: wordsToStudy },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.status).toBe('studying');
      expect(Array.isArray(body.studiedWords)).toBe(true);
      expect(body.studiedWords.length).toBeGreaterThanOrEqual(wordsToStudy.length);
    });

    test('rejects empty words array', async ({ request }) => {
      const listRes = await request.get('/api/packs', {
        headers: authHeader(tokens.accessToken),
      });
      const { packs } = await listRes.json();

      const res = await request.post(`/api/packs/${packs[0].packId}/study`, {
        headers: authHeader(tokens.accessToken),
        data: { words: [] },
      });
      expect(res.status()).toBe(400);
    });
  });

  test.describe('GET /packs/:packId/quiz-words', () => {
    test('returns quiz words with distractors', async ({ request }) => {
      const listRes = await request.get('/api/packs', {
        headers: authHeader(tokens.accessToken),
      });
      const { packs } = await listRes.json();
      const packId = packs[0].packId;

      const res = await request.get(`/api/packs/${packId}/quiz-words`, {
        headers: authHeader(tokens.accessToken),
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body.quizWords)).toBe(true);
      expect(body.quizWords.length).toBeGreaterThan(0);
      expect(Array.isArray(body.allN5Words)).toBe(true);

      // Each quiz word should have vocabulary data
      const qw = body.quizWords[0];
      expect(qw.word).toBeTruthy();
      expect(typeof qw.furigana).toBe('string');
      expect(typeof qw.meaning_zh_CN).toBe('string');
      expect(typeof qw.isReinjected).toBe('boolean');
    });
  });

  test.describe('POST /packs/:packId/quiz', () => {
    test('submits quiz results', async ({ request }) => {
      const listRes = await request.get('/api/packs', {
        headers: authHeader(tokens.accessToken),
      });
      const { packs } = await listRes.json();
      const packId = packs[0].packId;

      // Get pack detail for real words
      const detailRes = await request.get(`/api/packs/${packId}`, {
        headers: authHeader(tokens.accessToken),
      });
      const detail = await detailRes.json();
      const words = detail.words.slice(0, 5);

      // Simulate quiz answers - some correct, some wrong
      const answers = words.map((w: { word: string }, i: number) => ({
        word: w.word,
        correct: i < 4, // 4 correct, 1 wrong = 80% score
      }));

      const res = await request.post(`/api/packs/${packId}/quiz`, {
        headers: authHeader(tokens.accessToken),
        data: { answers },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(typeof body.score).toBe('number');
      expect(typeof body.completed).toBe('boolean');
      expect(Array.isArray(body.wrongWords)).toBe(true);
      expect(body.correctCount).toBe(4);
      expect(body.totalQuestions).toBe(5);
    });

    test('rejects missing answers', async ({ request }) => {
      const listRes = await request.get('/api/packs', {
        headers: authHeader(tokens.accessToken),
      });
      const { packs } = await listRes.json();

      const res = await request.post(`/api/packs/${packs[0].packId}/quiz`, {
        headers: authHeader(tokens.accessToken),
        data: {},
      });
      expect(res.status()).toBe(400);
    });
  });
});
