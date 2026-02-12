import { callAI, parseJsonFromResponse } from './aiHelper.js';

// ============================================
// Types
// ============================================

export interface ListeningQuestionRaw {
  type: 'LISTENING' | 'DICTATION';
  prompt: string;
  options: Array<{ id: string; text: string }> | null;
  answer: string;
  explanation: string;
  explanationWrong: Record<string, string> | null;
  jlptLevel: string;
  audioClip: {
    startTime: number;
    endTime: number;
    segmentIndex: number;
  };
}

export interface SegmentInput {
  orderIndex: number;
  text: string;
  startTime: number;
  endTime: number;
}

export interface SegmentTranslation {
  index: number;
  translationZh: string;
}

// ============================================
// Generate listening questions via AI
// ============================================

export async function generateListeningQuestions(
  segments: SegmentInput[],
  jlptLevel: string,
): Promise<ListeningQuestionRaw[]> {
  const segmentSummary = segments
    .map((s) => `[${s.orderIndex}] (${s.startTime.toFixed(1)}s–${s.endTime.toFixed(1)}s) ${s.text.slice(0, 200)}`)
    .join('\n');

  const prompt = `You are creating a listening comprehension quiz for Japanese learners at ${jlptLevel} level.
The student will ONLY hear audio — they CANNOT see the text. Generate questions that test listening ability.

There are ${segments.length} audio segments:
"""
${segmentSummary}
"""

Generate 6-8 LISTENING (MCQ) questions and 2-4 DICTATION questions.

Rules:
1. Each question MUST reference a specific segment with exact audioClip timestamps
2. LISTENING questions: MCQ with 4 options (a, b, c, d). Test comprehension of what was heard
3. DICTATION questions: No options (null). The "answer" is the exact text the student should write
4. All question prompts in Japanese
5. All explanations in Chinese (Simplified)
6. audioClip.segmentIndex must match an actual segment orderIndex
7. audioClip.startTime and endTime must be within the segment's time range

Return a JSON array of objects:
[{
  "type": "LISTENING" | "DICTATION",
  "prompt": "question in Japanese",
  "options": [{"id":"a","text":"..."},{"id":"b","text":"..."},{"id":"c","text":"..."},{"id":"d","text":"..."}] | null,
  "answer": "correct option id or dictation text",
  "explanation": "Chinese explanation",
  "explanationWrong": {"b":"why wrong","c":"why wrong","d":"why wrong"} | null,
  "jlptLevel": "${jlptLevel}",
  "audioClip": {"startTime": 0.0, "endTime": 5.0, "segmentIndex": 0}
}]

Return ONLY the JSON array, no other text.`;

  const content = await callAI(prompt, 6000);
  const raw = parseJsonFromResponse<ListeningQuestionRaw[]>(content, 'listening questions');

  // Validate: filter questions with out-of-range segmentIndex or bad timestamps
  const segmentMap = new Map(segments.map((s) => [s.orderIndex, s]));
  return raw.filter((q) => {
    if (!q.audioClip) return false;
    const seg = segmentMap.get(q.audioClip.segmentIndex);
    if (!seg) return false;
    // Clamp timestamps to segment range
    if (q.audioClip.startTime < seg.startTime) {
      q.audioClip.startTime = seg.startTime;
    }
    if (q.audioClip.endTime > seg.endTime) {
      q.audioClip.endTime = seg.endTime;
    }
    return q.audioClip.startTime < q.audioClip.endTime;
  });
}

// ============================================
// Generate segment translations via AI
// ============================================

export async function generateSegmentTranslations(
  segments: SegmentInput[],
): Promise<SegmentTranslation[]> {
  const texts = segments
    .map((s) => `[${s.orderIndex}] ${s.text.slice(0, 500)}`)
    .join('\n');

  const prompt = `Translate each of the following Japanese segments into Chinese (Simplified).

Segments:
"""
${texts}
"""

Return a JSON array with exactly ${segments.length} objects:
[{"index": 0, "translationZh": "Chinese translation"}, ...]

CRITICAL: Return exactly ${segments.length} items. Each index matches the segment's [index].
Return ONLY the JSON array, no other text.`;

  const content = await callAI(prompt, 4000);
  const result = parseJsonFromResponse<SegmentTranslation[]>(content, 'segment translations');

  // Ensure we have translations for all segments
  const translationMap = new Map(result.map((t) => [t.index, t.translationZh]));
  return segments.map((s) => ({
    index: s.orderIndex,
    translationZh: translationMap.get(s.orderIndex) || '',
  }));
}
