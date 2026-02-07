import { Router, Request, Response } from 'express';
import { WordExample } from '../models/WordExample.js';
import { config } from '../config/index.js';

const router = Router();

const levelDescriptions: Record<string, string> = {
  N5: 'JLPT N5 level learners (absolute beginners). Use only basic grammar (です/ます form, simple particles は/が/を/に/で) and very common vocabulary.',
  N4: 'JLPT N4 level learners (elementary). Use basic-to-intermediate grammar (て form, ない form, たい, から/ので) and everyday vocabulary.',
  N3: 'JLPT N3 level learners (intermediate). Use intermediate grammar (passive, causative, conditionals ば/たら/なら) and moderately complex vocabulary.',
  N2: 'JLPT N2 level learners (upper-intermediate). Use advanced grammar (formal expressions, complex conjunctions, ようにする/ことにする) and varied vocabulary.',
  N1: 'JLPT N1 level learners (advanced). Use sophisticated grammar, idiomatic expressions, formal/literary forms, and nuanced vocabulary.',
};

// GET /words/:word/examples — get or generate cached AI examples
router.get('/:word/examples', async (req: Request, res: Response) => {
  try {
    const { word } = req.params;
    const level = (req.query.level as string || 'N5').toUpperCase();
    const validLevel = levelDescriptions[level] ? level : 'N5';

    // Check cache first (keyed by word + level)
    const cached = await WordExample.findOne({ word, jlptLevel: validLevel }).lean();
    if (cached) {
      res.json({ word: cached.word, examples: cached.examples, cached: true });
      return;
    }

    // Generate via Gemini
    const apiKey = config.apiKey;
    if (!apiKey) {
      res.status(503).json({ error: { message: 'API key not configured' } });
      return;
    }

    const levelDesc = levelDescriptions[validLevel];
    const prompt = `Generate exactly 2 example sentences using the Japanese word 「${word}」.
These sentences should be suitable for ${levelDesc}

Return a JSON array with exactly 2 objects, each having:
- "sentence": the Japanese sentence
- "furigana": the full sentence in hiragana
- "meaning_zh_CN": Chinese (Simplified) translation

Return ONLY the JSON array, no other text.`;

    const apiUrl = config.apiUrl;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: config.modelName,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      res.status(502).json({ error: { message: '生成例句失败' } });
      return;
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || '';

    // Extract JSON from response
    let examples: Array<{ sentence: string; furigana: string; meaning_zh_CN: string }>;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('No JSON array found');
      examples = JSON.parse(jsonMatch[0]);
    } catch {
      console.error('Failed to parse AI examples:', content);
      res.status(502).json({ error: { message: '解析例句失败' } });
      return;
    }

    // Save to cache (global, keyed by word + level)
    await WordExample.findOneAndUpdate(
      { word, jlptLevel: validLevel },
      {
        word,
        jlptLevel: validLevel,
        examples,
        generatedAt: new Date(),
      },
      { upsert: true },
    );

    res.json({ word, examples, cached: false });
  } catch (error) {
    console.error('Word examples error:', error);
    res.status(500).json({ error: { message: '获取例句失败' } });
  }
});

export default router;
