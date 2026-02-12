import { callAI, parseJsonFromResponse } from './aiHelper.js';

// Re-export for backwards compatibility
export { callAI, parseJsonFromResponse };

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
  try {
    return await generateSectionsAI(text, vocab);
  } catch {
    // Fallback: programmatic paragraph splitting + string-match highlights
    return generateSectionsFallback(text, vocab);
  }
}

async function generateSectionsAI(
  text: string,
  vocab: ExtractedVocab[]
): Promise<ContentSection[]> {
  const truncated = text.slice(0, 3000);
  const vocabWords = vocab.slice(0, 15).map((v) => v.word);

  const prompt = `Split this Japanese article into paragraphs and find vocabulary highlights.

Text:
"""
${truncated}
"""

Vocabulary to find: ${JSON.stringify(vocabWords)}

Return a JSON array. Each element:
{"orderIndex":0,"type":"paragraph","text":"exact paragraph text","vocabHighlights":[{"word":"単語","furigana":"たんご","pos":"名詞","meaningZh":"单词","startIdx":5,"endIdx":7}]}

Rules:
- type: "heading" for short title lines, "paragraph" for body text
- startIdx/endIdx: character positions within that section's text
- Only highlight words from the vocabulary list
- Return ONLY valid JSON, nothing else`;

  const content = await callAI(prompt, 6000);
  return parseJsonFromResponse<ContentSection[]>(content, 'sections');
}

/**
 * Fallback: split text into paragraphs and find vocab by string matching.
 * No AI required — deterministic and always succeeds.
 */
function generateSectionsFallback(
  text: string,
  vocab: ExtractedVocab[]
): ContentSection[] {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((para, idx) => {
    const isHeading = para.length < 60 && !para.includes('。');

    const highlights: ContentSection['vocabHighlights'] = [];
    for (const v of vocab) {
      let searchFrom = 0;
      while (searchFrom < para.length) {
        const foundIdx = para.indexOf(v.word, searchFrom);
        if (foundIdx === -1) break;
        highlights.push({
          word: v.word,
          furigana: v.furigana,
          pos: v.pos,
          meaningZh: v.meaningZh,
          startIdx: foundIdx,
          endIdx: foundIdx + v.word.length,
        });
        searchFrom = foundIdx + v.word.length;
      }
    }

    // Sort by position, deduplicate overlaps
    highlights.sort((a, b) => a.startIdx - b.startIdx);
    const deduped: ContentSection['vocabHighlights'] = [];
    let lastEnd = -1;
    for (const hl of highlights) {
      if (hl.startIdx >= lastEnd) {
        deduped.push(hl);
        lastEnd = hl.endIdx;
      }
    }

    return {
      orderIndex: idx,
      type: isHeading ? 'heading' : 'paragraph',
      text: para,
      vocabHighlights: deduped,
    };
  });
}

export interface ContentTranslations {
  titleZh: string;
  summary: string;
  sectionTranslations: string[];
}

export async function generateTranslations(
  title: string,
  sectionTexts: string[],
  sectionTypes?: string[]
): Promise<ContentTranslations> {
  const count = sectionTexts.length;

  // Build a compact payload: numbered sections with type labels
  const numberedSections = sectionTexts
    .map((t, i) => {
      const typeLabel = sectionTypes?.[i] ? ` (${sectionTypes[i]})` : '';
      return `[${i}]${typeLabel} ${t.slice(0, 500)}`;
    })
    .join('\n');
  const truncated = numberedSections.slice(0, 4000);

  const prompt = `Translate the following Japanese article into Chinese (Simplified).

Title: ${title}

There are exactly ${count} sections. Each is labeled [index] (type).

Sections:
"""
${truncated}
"""

CRITICAL RULES:
1. Return a JSON object with "titleZh", "summary", and "sectionTranslations"
2. "sectionTranslations" MUST be an array of EXACTLY ${count} strings
3. sectionTranslations[i] is the Chinese translation of section [i] — strict 1:1 mapping
4. Do NOT merge or skip any section. Every section gets its own translation, even headings
5. For short heading sections, translate the heading text only (keep it brief)

Return ONLY the JSON object, no other text.`;

  const content = await callAI(prompt, 6000);

  // Parse as object directly — parseJsonFromResponse tries arrays first
  // which incorrectly matches the inner sectionTranslations array
  const codeBlockMatch = content.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  const rawJson = codeBlockMatch ? codeBlockMatch[1] : content;
  const objMatch = rawJson.match(/\{[\s\S]*\}/);
  if (!objMatch) {
    throw new Error('Failed to parse AI translations response as JSON object');
  }
  const raw = JSON.parse(objMatch[0]) as Record<string, unknown>;

  // Normalize: AI may use different key names
  const titleZh = (raw.titleZh || raw.title_zh || raw.title || '') as string;
  const summary = (raw.summary || raw.summaryZh || raw.summary_zh || '') as string;
  const rawTranslations: string[] = (
    raw.sectionTranslations ||
    raw.section_translations ||
    raw.translations ||
    raw.sections ||
    []
  ) as string[];

  // Strip numbered prefixes like "[0] " that AI may echo from the prompt
  const sectionTranslations = rawTranslations.map((t) =>
    t.replace(/^\[\d+\]\s*/, '')
  );

  // Ensure array matches input length
  while (sectionTranslations.length < sectionTexts.length) {
    sectionTranslations.push('');
  }

  return { titleZh, summary, sectionTranslations };
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
