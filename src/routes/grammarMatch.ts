import { Router, Request, Response } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { matchGrammarPatterns } from '../services/grammarMatcher.js';
import { TEXTS } from '../constants/texts.js';

const router = Router();

const MAX_TOKENS = 500;

/**
 * POST /grammar/match
 * Rule-based JLPT grammar pattern matching (no AI, no auth required).
 *
 * Body: { text: string, tokens: Array<{word: string, pos: string}> }
 * Returns: { success: true, data: MatchedGrammarPattern[] }
 */
router.post('/match', rateLimit({ maxTokens: 60, refillRate: 4 }), (req: Request, res: Response) => {
  try {
    const { text, tokens } = req.body;

    if (!Array.isArray(tokens) || tokens.length === 0) {
      res.status(400).json({
        success: false,
        error: TEXTS.GRAMMAR_MATCH.NO_TOKENS,
      });
      return;
    }

    if (tokens.length > MAX_TOKENS) {
      res.status(400).json({
        success: false,
        error: TEXTS.GRAMMAR_MATCH.TOO_MANY_TOKENS,
      });
      return;
    }

    // Validate token shape
    const isValid = tokens.every(
      (t: unknown) =>
        typeof t === 'object' &&
        t !== null &&
        typeof (t as Record<string, unknown>).word === 'string' &&
        typeof (t as Record<string, unknown>).pos === 'string',
    );

    if (!isValid) {
      res.status(400).json({
        success: false,
        error: TEXTS.GRAMMAR_MATCH.INVALID_TOKEN_FORMAT,
      });
      return;
    }

    const inputText = typeof text === 'string' ? text : tokens.map((t: { word: string }) => t.word).join('');

    const matches = matchGrammarPatterns(inputText, tokens);

    res.json({
      success: true,
      data: matches,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: TEXTS.GRAMMAR_MATCH.MATCH_FAILED,
    });
  }
});

export default router;
