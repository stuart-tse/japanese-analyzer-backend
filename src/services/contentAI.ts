import { config } from '../config/index.js';

// ============================================
// Types
// ============================================

export interface JlptEstimation {
  overallLevel: string;
  sectionLevels: Array<{ index: number; level: string; reason: string }>;
}

export interface ExtractedVocab {
  word: string;
  furigana: string;
  pos: string;
  meaningZh: string;
  jlptLevel: string;
}

export interface ExtractedGrammar {
  pattern: string;
  meaningZh: string;
  level: string;
  examples: string[];
}

export interface GeneratedQuestion {
  type: 'MCQ' | 'CLOZE' | 'READING_COMPREHENSION';
  prompt: string;
  options: Array<{ id: string; text: string }> | null;
  answer: string;
  explanation: string;
  explanationWrong: Record<string, string> | null;
  jlptLevel: string;
}

export interface ContentSection {
  orderIndex: number;
  type: string;
  text: string;
  vocabHighlights: Array<{
    word: string;
    furigana: string;
    pos: string;
    meaningZh: string;
    startIdx: number;
    endIdx: number;
  }>;
}

// ============================================
// AI Call Helper
// ============================================

async function callAI(prompt: string, maxTokens: number = 4000): Promise<string> {
  const apiKey = config.apiKey;
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.modelName,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'unknown');
    throw new Error(`AI API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content || '';
  if (!content) {
    throw new Error('AI returned empty response');
  }

  return content;
}

function parseJsonFromResponse<T>(content: string, label: string): T {
  // Try to extract JSON from markdown code block first
  const codeBlockMatch = content.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  const rawJson = codeBlockMatch ? codeBlockMatch[1] : content;

  // Try array
  const arrayMatch = rawJson.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[0]) as T;
    } catch {
      // fall through
    }
  }

  // Try object
  const objMatch = rawJson.match(/\{[\s\S]*\}/);
  if (objMatch) {
    try {
      return JSON.parse(objMatch[0]) as T;
    } catch {
      // fall through
    }
  }

  throw new Error(`Failed to parse AI ${label} response as JSON`);
}

// ============================================
// Individual AI Functions
// ============================================

export async function estimateJlptLevel(text: string): Promise<JlptEstimation> {
  const truncated = text.slice(0, 3000);
  const prompt = `Analyze the following Japanese text and estimate its JLPT level.

Text:
"""
${truncated}
"""

Return a JSON object with:
- "overallLevel": one of "N5", "N4", "N3", "N2", "N1"
- "sectionLevels": array of objects, each paragraph gets: { "index": number, "level": "N5"|"N4"|"N3"|"N2"|"N1", "reason": "brief reason" }

Base your estimation on vocabulary complexity, grammar patterns, and kanji usage.
Return ONLY the JSON object, no other text.`;

  const content = await callAI(prompt, 2000);
  return parseJsonFromResponse<JlptEstimation>(content, 'JLPT estimation');
}

export async function extractVocabulary(text: string): Promise<ExtractedVocab[]> {
  const truncated = text.slice(0, 3000);
  const prompt = `Extract the 20-30 most important vocabulary words from this Japanese text for Chinese learners.

Text:
"""
${truncated}
"""

Return a JSON array of objects, each with:
- "word": the Japanese word/expression
- "furigana": hiragana reading
- "pos": part of speech in Japanese (名詞, 動詞, 形容詞, 副詞, etc.)
- "meaningZh": Chinese (Simplified) meaning
- "jlptLevel": estimated JLPT level ("N5","N4","N3","N2","N1")

Focus on words that are:
1. Key to understanding the article
2. Useful for language learners
3. Not overly basic (skip は、が、の etc.)

Return ONLY the JSON array, no other text.`;

  const content = await callAI(prompt, 4000);
  return parseJsonFromResponse<ExtractedVocab[]>(content, 'vocabulary');
}

export async function extractGrammar(text: string): Promise<ExtractedGrammar[]> {
  const truncated = text.slice(0, 3000);
  const prompt = `Extract the 8-15 most important grammar patterns from this Japanese text for Chinese learners.

Text:
"""
${truncated}
"""

Return a JSON array of objects, each with:
- "pattern": the grammar pattern (e.g., "〜ている", "〜ことができる")
- "meaningZh": Chinese explanation
- "level": JLPT level ("N5","N4","N3","N2","N1")
- "examples": 1-2 example sentences from the text using this pattern

Return ONLY the JSON array, no other text.`;

  const content = await callAI(prompt, 3000);
  return parseJsonFromResponse<ExtractedGrammar[]>(content, 'grammar');
}

export async function generateQuestions(
  text: string,
  vocab: ExtractedVocab[],
  grammar: ExtractedGrammar[]
): Promise<GeneratedQuestion[]> {
  const truncated = text.slice(0, 2500);
  const vocabSummary = vocab
    .slice(0, 15)
    .map((v) => `${v.word}(${v.meaningZh})`)
    .join(', ');
  const grammarSummary = grammar
    .slice(0, 8)
    .map((g) => g.pattern)
    .join(', ');

  const prompt = `Generate 8-10 quiz questions based on this Japanese article.

Article text:
"""
${truncated}
"""

Key vocabulary: ${vocabSummary}
Grammar patterns: ${grammarSummary}

Create a mix of question types:
- 4-5 MCQ (multiple choice) questions about vocabulary meaning or reading comprehension
- 3-4 CLOZE (fill-in-the-blank) questions testing grammar or vocabulary in context
- 1-2 READING_COMPREHENSION questions about the article content

For each question, return a JSON array of objects with:
- "type": "MCQ" | "CLOZE" | "READING_COMPREHENSION"
- "prompt": the question text (in Japanese with Chinese hint if needed)
- "options": for MCQ, array of { "id": "a"|"b"|"c"|"d", "text": "option text" }; null for CLOZE
- "answer": correct answer (option ID for MCQ, expected text for CLOZE)
- "explanation": explanation in Chinese why this is correct
- "explanationWrong": for MCQ, object mapping wrong option IDs to Chinese explanations; null for others
- "jlptLevel": estimated difficulty level

All question prompts in Japanese, all explanations in Chinese (Simplified).
Return ONLY the JSON array, no other text.`;

  const content = await callAI(prompt, 6000);
  return parseJsonFromResponse<GeneratedQuestion[]>(content, 'questions');
}

export async function generateSections(
  text: string,
  vocab: ExtractedVocab[]
): Promise<ContentSection[]> {
  const truncated = text.slice(0, 4000);
  const vocabWords = vocab.map((v) => v.word);

  const prompt = `Split this Japanese article text into logical sections (paragraphs) and identify vocabulary highlights within each section.

Article text:
"""
${truncated}
"""

Known vocabulary words: ${JSON.stringify(vocabWords)}

Return a JSON array of section objects, each with:
- "orderIndex": section number starting from 0
- "type": "heading" or "paragraph"
- "text": the section text (exact text from the article)
- "vocabHighlights": array of vocabulary occurrences found in this section, each with:
  - "word": the word
  - "furigana": hiragana reading
  - "pos": part of speech (Japanese)
  - "meaningZh": Chinese meaning
  - "startIdx": character start index within this section's text
  - "endIdx": character end index within this section's text

Important:
- Keep the original text exactly as-is
- startIdx and endIdx must be accurate character positions
- Only highlight words from the known vocabulary list

Return ONLY the JSON array, no other text.`;

  const content = await callAI(prompt, 8000);
  return parseJsonFromResponse<ContentSection[]>(content, 'sections');
}

export async function generateSimplifiedVersion(
  text: string,
  targetLevel: string
): Promise<string> {
  const truncated = text.slice(0, 3000);
  const prompt = `Rewrite this Japanese article at ${targetLevel} level for language learners.

Original text:
"""
${truncated}
"""

Rules:
- Use vocabulary and grammar appropriate for ${targetLevel}
- Keep the same meaning and information
- Use furigana notation for difficult kanji: 漢字（かんじ）
- Keep sentences shorter and clearer
- Maintain the same paragraph structure

Return ONLY the simplified text, no other commentary.`;

  const content = await callAI(prompt, 4000);
  return content.trim();
}
