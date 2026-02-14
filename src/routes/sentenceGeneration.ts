import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { config } from '../config/index.js';
import { TEXTS } from '../constants/texts.js';

const router = Router();

const levelDescriptions: Record<string, string> = {
  N5: 'JLPT N5 level learners (absolute beginners). Use only basic grammar (です/ます form, simple particles は/が/を/に/で) and very common vocabulary.',
  N4: 'JLPT N4 level learners (elementary). Use basic-to-intermediate grammar (て form, ない form, たい, から/ので) and everyday vocabulary.',
  N3: 'JLPT N3 level learners (intermediate). Use intermediate grammar (passive, causative, conditionals ば/たら/なら) and moderately complex vocabulary.',
  N2: 'JLPT N2 level learners (upper-intermediate). Use advanced grammar (formal expressions, complex conjunctions, ようにする/ことにする) and varied vocabulary.',
  N1: 'JLPT N1 level learners (advanced). Use sophisticated grammar, idiomatic expressions, formal/literary forms, and nuanced vocabulary.',
};

interface BatchWordInput {
  readonly word: string;
  readonly jlptLevel?: string;
}

interface ExampleSentence {
  readonly sentence: string;
  readonly furigana: string;
  readonly meaning_zh_CN: string;
}

async function generateSentencesForWord(
  word: string,
  level: string,
): Promise<ExampleSentence[]> {
  const apiKey = config.apiKey;
  if (!apiKey) throw new Error('API key not configured');

  const levelDesc = levelDescriptions[level] || levelDescriptions.N5;
  const prompt = `Generate exactly 3 example sentences using the Japanese word 「${word}」.
These sentences should be suitable for ${levelDesc}

Return a JSON array with exactly 3 objects, each having:
- "sentence": the Japanese sentence
- "furigana": the full sentence in hiragana
- "meaning_zh_CN": Chinese (Simplified) translation

Return ONLY the JSON array, no other text.`;

  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.modelName,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!response.ok) throw new Error(TEXTS.SENTENCES.GENERATE_FAILED);

  const data = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content || '';

  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON array found');
  return JSON.parse(jsonMatch[0]) as ExampleSentence[];
}

// POST /sentences/generate-batch — generate sentences for multiple words
router.post('/generate-batch', async (req: Request, res: Response) => {
  try {
    const { words } = req.body as { words: BatchWordInput[] };
    if (!Array.isArray(words) || words.length === 0) {
      res.status(400).json({ error: { message: '请提供词汇列表' } });
      return;
    }
    if (words.length > 10) {
      res.status(400).json({ error: { message: TEXTS.SENTENCES.BATCH_LIMIT } });
      return;
    }

    // Batch-check cache for all words
    const wordKeys = words.map((w) => ({
      word: w.word,
      level: (w.jlptLevel || 'N5').toUpperCase(),
    }));

    const cached = await prisma.wordExample.findMany({
      where: {
        OR: wordKeys.map((k) => ({
          word: k.word,
          jlptLevel: k.level,
        })),
      },
    });

    const cachedMap = new Map(
      cached.map((c) => [`${c.word}:${c.jlptLevel}`, c.examples]),
    );

    // Generate missing ones in parallel
    const results = await Promise.allSettled(
      wordKeys.map(async ({ word, level }) => {
        const key = `${word}:${level}`;
        const existing = cachedMap.get(key);
        if (existing) {
          return { word, sentences: existing as unknown as ExampleSentence[], cached: true };
        }

        const sentences = await generateSentencesForWord(word, level);

        // Cache globally — cast to Prisma-compatible JSON type
        const examplesJson = sentences as unknown as Array<{ sentence: string; furigana: string; meaning_zh_CN: string }>;
        await prisma.wordExample.upsert({
          where: { word_jlptLevel: { word, jlptLevel: level } },
          update: { examples: examplesJson, generatedAt: new Date() },
          create: { word, jlptLevel: level, examples: examplesJson, generatedAt: new Date() },
        });

        return { word, sentences, cached: false };
      }),
    );

    const output = results.map((r, i) =>
      r.status === 'fulfilled'
        ? r.value
        : { word: wordKeys[i].word, sentences: [], cached: false },
    );

    res.json({ results: output });
  } catch (error) {
    console.error('Batch sentence generation error:', error);
    res.status(500).json({ error: { message: TEXTS.SENTENCES.GENERATE_FAILED } });
  }
});

export default router;
