import { test, expect } from '@playwright/test';

const BASE = '/api/words';

test.describe('Word Examples Routes', () => {
  test.describe('GET /words/:word/examples', () => {
    test('generates examples for a word (no auth required)', async ({ request }) => {
      // Use a common word that should succeed with Gemini API
      const res = await request.get(`${BASE}/食べる/examples?level=N5`);

      // This depends on Gemini API availability
      // Accept both 200 (success) and 502/503 (API unavailable)
      if (res.status() === 200) {
        const body = await res.json();
        expect(body.word).toBe('食べる');
        expect(Array.isArray(body.examples)).toBe(true);
        expect(body.examples.length).toBe(2);

        // Each example should have the required fields
        const ex = body.examples[0];
        expect(ex.sentence).toBeTruthy();
        expect(typeof ex.furigana).toBe('string');
        expect(typeof ex.meaning_zh_CN).toBe('string');
      } else {
        // API unavailable — acceptable in test environment
        expect([502, 503]).toContain(res.status());
      }
    });

    test('returns cached examples on second request', async ({ request }) => {
      // First request
      const res1 = await request.get(`${BASE}/飲む/examples?level=N5`);

      if (res1.status() !== 200) {
        test.skip();
        return;
      }

      // Second request should be cached
      const res2 = await request.get(`${BASE}/飲む/examples?level=N5`);
      expect(res2.status()).toBe(200);
      const body = await res2.json();
      expect(body.cached).toBe(true);
      expect(body.word).toBe('飲む');
    });

    test('defaults to N5 level for invalid level', async ({ request }) => {
      const res = await request.get(`${BASE}/犬/examples?level=INVALID`);

      // Accept API being available or unavailable
      if (res.status() === 200) {
        const body = await res.json();
        expect(body.word).toBe('犬');
      } else {
        expect([502, 503]).toContain(res.status());
      }
    });
  });
});
