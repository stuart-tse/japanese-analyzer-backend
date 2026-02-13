import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// --- Types ---

interface GrammarEntry {
  id: string;
  pattern: string;
  meaning_zh_CN: string;
  explanation_zh_CN: string;
  example: string;
  example_meaning_zh_CN: string;
  jlptLevel: string;
  category: string;
}

export interface MatchedGrammarPattern {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  example: string;
  exampleMeaning: string;
  jlptLevel: string;
  category: string;
  matchedTokenIndices: number[];
}

interface TokenInput {
  word: string;
  pos: string;
}

interface PreparedPattern {
  entry: GrammarEntry;
  coreMorpheme: string;
  matchType: 'particle' | 'suffix' | 'multi-token' | 'fixed';
}

// --- Module-level constants ---

// Particle POS markers from the analyzer
const PARTICLE_POS_MARKERS = ['助詞', '助词'];

// Single-char particles that map to specific grammar entries
const SINGLE_PARTICLES = new Set([
  'は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の',
  'か', 'ね', 'よ', 'や', 'し',
]);

// Suffix endings from verb/adjective conjugation patterns
const SUFFIX_ENDINGS = new Set([
  'ます', 'ません', 'ました', 'ない', 'た', 'て', 'たい',
  'くない', 'かった', 'ましょう', 'られる', 'させる', 'れる',
  'させられる', 'すぎる', 'やすい', 'にくい',
]);

// --- Eager initialization at module load (blocks at startup, not at request) ---

function buildPreparedPatterns(): PreparedPattern[] {
  const dataPath = resolve(process.cwd(), 'data/jlpt_grammar_all.json');
  const raw: GrammarEntry[] = JSON.parse(readFileSync(dataPath, 'utf-8'));

  return raw.map((entry) => {
    const core = extractCoreMorpheme(entry.pattern);
    const matchType = classifyPattern(core, entry.category);
    return { entry, coreMorpheme: core, matchType };
  });
}

function extractCoreMorpheme(pattern: string): string {
  // Strip 〜 placeholders and 【...】 level labels
  let core = pattern
    .replace(/〜/g, '')
    .replace(/【[^】]*】/g, '')
    .trim();

  // Handle "A / B" alternatives — keep the first form
  if (core.includes(' / ')) {
    core = core.split(' / ')[0].trim();
  }

  return core;
}

function classifyPattern(
  core: string,
  category: string,
): PreparedPattern['matchType'] {
  if (category === 'particles' && SINGLE_PARTICLES.has(core)) {
    return 'particle';
  }

  if (SUFFIX_ENDINGS.has(core)) {
    return 'suffix';
  }

  // Multi-char patterns that appear as sequences in token stream
  if (core.length > 2) {
    return 'multi-token';
  }

  return 'fixed';
}

const preparedPatterns: PreparedPattern[] = buildPreparedPatterns();

// --- Matching ---

export function matchGrammarPatterns(
  text: string,
  tokens: TokenInput[],
): MatchedGrammarPattern[] {
  const matches: MatchedGrammarPattern[] = [];
  const matchedPatternIds = new Set<string>();

  // Build concatenated token text for substring search
  const tokenWords = tokens.map((t) => t.word);
  const concatenated = tokenWords.join('');

  for (const prepared of preparedPatterns) {
    const { entry, coreMorpheme, matchType } = prepared;

    // Skip patterns with empty core or abstract conjugation tables
    if (!coreMorpheme || coreMorpheme.includes('→')) continue;

    let matchedIndices: number[] = [];

    switch (matchType) {
      case 'particle':
        matchedIndices = matchParticle(tokens, coreMorpheme);
        break;
      case 'suffix':
        matchedIndices = matchSuffix(tokens, coreMorpheme);
        break;
      case 'multi-token':
        matchedIndices = matchMultiToken(
          tokenWords,
          concatenated,
          coreMorpheme,
        );
        break;
      case 'fixed':
        matchedIndices = matchFixed(tokens, concatenated, coreMorpheme);
        break;
    }

    if (matchedIndices.length > 0 && !matchedPatternIds.has(entry.id)) {
      matchedPatternIds.add(entry.id);
      matches.push({
        id: entry.id,
        pattern: entry.pattern,
        meaning: entry.meaning_zh_CN,
        explanation: entry.explanation_zh_CN,
        example: entry.example,
        exampleMeaning: entry.example_meaning_zh_CN,
        jlptLevel: entry.jlptLevel,
        category: entry.category,
        matchedTokenIndices: matchedIndices,
      });
    }
  }

  // Deduplicate: if multiple patterns cover the exact same token indices,
  // keep the most specific (longer coreMorpheme wins)
  const deduped = deduplicateMatches(matches);

  // Sort by position in text, then by JLPT level (N5 first)
  const jlptOrder: Record<string, number> = {
    N5: 0, N4: 1, N3: 2, N2: 3, N1: 4,
  };
  deduped.sort((a, b) => {
    const posA = Math.min(...a.matchedTokenIndices);
    const posB = Math.min(...b.matchedTokenIndices);
    if (posA !== posB) return posA - posB;
    return (jlptOrder[a.jlptLevel] ?? 5) - (jlptOrder[b.jlptLevel] ?? 5);
  });

  return deduped;
}

// --- Match strategies ---

function matchParticle(tokens: TokenInput[], particle: string): number[] {
  const indices: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (
      t.word === particle &&
      PARTICLE_POS_MARKERS.some((m) => t.pos.includes(m))
    ) {
      indices.push(i);
    }
  }
  return indices;
}

function matchSuffix(tokens: TokenInput[], suffix: string): number[] {
  const indices: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].word.endsWith(suffix)) {
      indices.push(i);
    }
  }
  return indices;
}

function matchMultiToken(
  tokenWords: string[],
  concatenated: string,
  morpheme: string,
): number[] {
  // Single indexOf: both checks and finds position
  const matchStart = concatenated.indexOf(morpheme);
  if (matchStart === -1) return [];
  const matchEnd = matchStart + morpheme.length;

  // Map character positions back to token indices
  const indices: number[] = [];
  let currentCharPos = 0;
  for (let i = 0; i < tokenWords.length; i++) {
    const wordEnd = currentCharPos + tokenWords[i].length;
    // Token overlaps with the matched region
    if (currentCharPos < matchEnd && wordEnd > matchStart) {
      indices.push(i);
    }
    currentCharPos = wordEnd;
  }

  return indices;
}

function matchFixed(
  tokens: TokenInput[],
  concatenated: string,
  morpheme: string,
): number[] {
  // Direct word match on individual tokens
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].word === morpheme) {
      return [i]; // Return first match only for fixed expressions
    }
  }

  // Fallback: check concatenated text for compound morphemes
  if (morpheme.length > 1) {
    return findTokenIndicesForSubstring(tokens, concatenated, morpheme);
  }

  return [];
}

function findTokenIndicesForSubstring(
  tokens: TokenInput[],
  concatenated: string,
  substring: string,
): number[] {
  const matchStart = concatenated.indexOf(substring);
  if (matchStart === -1) return [];
  const matchEnd = matchStart + substring.length;

  const indices: number[] = [];
  let currentCharPos = 0;
  for (let i = 0; i < tokens.length; i++) {
    const wordEnd = currentCharPos + tokens[i].word.length;
    if (currentCharPos < matchEnd && wordEnd > matchStart) {
      indices.push(i);
    }
    currentCharPos = wordEnd;
  }
  return indices;
}

// --- Deduplication ---

function deduplicateMatches(
  matches: MatchedGrammarPattern[],
): MatchedGrammarPattern[] {
  // Group by the set of matched token indices
  const byIndices = new Map<string, MatchedGrammarPattern[]>();

  for (const m of matches) {
    const key = [...m.matchedTokenIndices].sort().join(',');
    const group = byIndices.get(key) ?? [];
    group.push(m);
    byIndices.set(key, group);
  }

  const result: MatchedGrammarPattern[] = [];
  for (const group of byIndices.values()) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }
    // Keep the most specific pattern (longest pattern text)
    const best = group.reduce((a, b) =>
      a.pattern.length >= b.pattern.length ? a : b,
    );
    result.push(best);
  }

  return result;
}
