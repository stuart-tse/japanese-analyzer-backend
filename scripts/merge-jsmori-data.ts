/**
 * Merge scraped jsmori.com data into existing JLPT vocabulary and grammar JSON files.
 *
 * - Vocabulary: dedup by word+level, supplement missing fields, add new entries
 * - Grammar: dedup by pattern (fuzzy match), add new entries
 * - Kanji: create new jlpt_kanji_all.json
 *
 * Usage: npx tsx scripts/merge-jsmori-data.ts
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { toRomaji, isHiragana, isKatakana } from 'wanakana';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '../data');
const RAW_DIR = resolve(DATA_DIR, 'jsmori_raw');

// ─── Types ──────────────────────────────────────────────────────────

interface VocabEntry {
  word: string;
  furigana: string;
  romaji: string;
  ruby: Array<{ text: string; reading: string | null }>;
  ruby_text: string;
  meaning_en: string;
  meaning_zh_CN: string;
  jlptLevel: string;
  pos: string;
}

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

interface RawVocab {
  furigana: string;
  word: string;
  meaning_en: string;
  meaning_zh_CN: string;
  verbType?: string;
  jlptLevel: string;
  pos: string;
}

interface RawGrammar {
  pattern: string;
  meaning_zh_CN: string;
  scene: string;
  jlptLevel: string;
}

interface RawKanji {
  word: string;
  reading: string;
  meaning_en: string;
  meaning_zh_CN: string;
  category: string;
  jlptLevel: string;
}

interface KanjiEntry {
  kanji: string;
  readings: string[];
  meaning_en: string;
  meaning_zh_CN: string;
  category: string;
  jlptLevel: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function loadJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function saveJson(filePath: string, data: unknown): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function generateRomaji(text: string): string {
  try {
    const cleaned = text.replace(/\s+/g, '');
    if (!cleaned) return '';
    return toRomaji(cleaned);
  } catch {
    return '';
  }
}

function generateRuby(word: string, furigana: string): Array<{ text: string; reading: string | null }> {
  if (!word || !furigana) return [{ text: word || furigana, reading: null }];

  const isAllKana = [...word].every(ch => isHiragana(ch) || isKatakana(ch) || /[\s\u3000ー〜・]/.test(ch));
  if (isAllKana) return [{ text: word, reading: null }];

  return [{ text: word, reading: furigana }];
}

function generateRubyText(word: string, furigana: string): string {
  if (!furigana || word === furigana) return word;
  return `${word}(${furigana})`;
}

function normalizePattern(p: string): string {
  return p
    .replace(/[〜～~]/g, '')
    .replace(/\s+/g, '')
    .replace(/[（()）]/g, '')
    .trim()
    .toLowerCase();
}

function generateGrammarId(level: string, pattern: string, index: number): string {
  const lvl = level.toLowerCase();
  const slug = pattern
    .replace(/[〜～~]/g, '')
    .replace(/[（()）]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, '')
    .substring(0, 30);
  return `${lvl}-jsmori-${slug || index}`;
}

function mapGrammarCategory(scene: string): string {
  const s = scene.toLowerCase();
  if (s.includes('助詞') || s.includes('格助詞') || s.includes('particle')) return 'particles';
  if (s.includes('接続') || s.includes('接續')) return 'conjunctions';
  if (s.includes('敬語') || s.includes('尊敬') || s.includes('謙譲')) return 'honorifics';
  if (s.includes('条件') || s.includes('條件')) return 'conditionals';
  if (s.includes('受身') || s.includes('被動') || s.includes('使役')) return 'passive-causative';
  if (s.includes('動詞') || s.includes('verb')) return 'verb-conjugation';
  if (s.includes('形容詞') || s.includes('adj')) return 'adjective-conjugation';
  if (s.includes('文語') || s.includes('古文') || s.includes('literary')) return 'literary-expressions';
  if (s.includes('書面') || s.includes('formal') || s.includes('硬い')) return 'formal-expressions';
  if (s.includes('高级') || s.includes('高級') || s.includes('advanced')) return 'advanced-expressions';
  if (s.includes('副詞')) return 'expressions';
  return 'sentence-patterns';
}

// ─── Merge Vocabulary ───────────────────────────────────────────────

function mergeVocabulary(): { total: number; added: number; updated: number } {
  const vocabPath = resolve(DATA_DIR, 'jlpt_vocabulary_all.json');
  const rawPath = resolve(RAW_DIR, 'all_vocab.json');

  if (!existsSync(rawPath)) {
    console.log('No scraped vocab data found. Run scrape-jsmori.ts first.');
    return { total: 0, added: 0, updated: 0 };
  }

  const existing: VocabEntry[] = loadJson(vocabPath);
  const scraped: RawVocab[] = loadJson(rawPath);

  console.log(`\n── Merging Vocabulary ──`);
  console.log(`Existing: ${existing.length} entries`);
  console.log(`Scraped:  ${scraped.length} entries`);

  // Build index: key = word+level or furigana+level
  const index = new Map<string, number>();
  for (let i = 0; i < existing.length; i++) {
    const e = existing[i];
    const key = `${e.word}|${e.jlptLevel}`;
    index.set(key, i);
    // Also index by furigana for kana-only words
    if (e.furigana && e.furigana !== e.word) {
      index.set(`${e.furigana}|${e.jlptLevel}`, i);
    }
  }

  let added = 0;
  let updated = 0;
  const newEntries: VocabEntry[] = [];

  for (const raw of scraped) {
    if (!raw.word && !raw.furigana) continue;

    const word = raw.word || raw.furigana;
    const key = `${word}|${raw.jlptLevel}`;
    const keyFurigana = raw.furigana ? `${raw.furigana}|${raw.jlptLevel}` : '';

    const existingIdx = index.get(key) ?? (keyFurigana ? index.get(keyFurigana) : undefined);

    if (existingIdx !== undefined && existingIdx < existing.length) {
      // Supplement missing fields on existing entry
      const entry = existing[existingIdx];
      let didUpdate = false;

      if (!entry.meaning_en && raw.meaning_en) {
        entry.meaning_en = raw.meaning_en;
        didUpdate = true;
      }
      if (!entry.meaning_zh_CN && raw.meaning_zh_CN) {
        entry.meaning_zh_CN = raw.meaning_zh_CN;
        didUpdate = true;
      }
      if (!entry.romaji && raw.furigana) {
        entry.romaji = generateRomaji(raw.furigana);
        didUpdate = true;
      }

      if (didUpdate) {
        existing[existingIdx] = entry;
        updated++;
      }
    } else if (existingIdx === undefined) {
      // New entry (not seen in existing OR in newEntries)
      const furigana = raw.furigana || '';
      const newEntry: VocabEntry = {
        word,
        furigana,
        romaji: generateRomaji(furigana),
        ruby: generateRuby(word, furigana),
        ruby_text: generateRubyText(word, furigana),
        meaning_en: raw.meaning_en || '',
        meaning_zh_CN: raw.meaning_zh_CN || '',
        jlptLevel: raw.jlptLevel,
        pos: raw.pos,
      };

      newEntries.push(newEntry);
      // Mark as seen to avoid duplicates from multiple scrape pages
      // Use a sentinel value >= existing.length to indicate "already added"
      index.set(key, existing.length + newEntries.length - 1);
      if (furigana && furigana !== word) {
        index.set(`${furigana}|${raw.jlptLevel}`, existing.length + newEntries.length - 1);
      }
      added++;
    }
    // else: existingIdx >= existing.length means it was already added from scraped data, skip
  }

  const merged = [...existing, ...newEntries];

  // Sort by level then pos
  const levelOrder: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };
  merged.sort((a, b) => {
    const lvlDiff = (levelOrder[a.jlptLevel] ?? 5) - (levelOrder[b.jlptLevel] ?? 5);
    if (lvlDiff !== 0) return lvlDiff;
    return a.pos.localeCompare(b.pos);
  });

  saveJson(vocabPath, merged);

  console.log(`Added: ${added} new entries`);
  console.log(`Updated: ${updated} existing entries`);
  console.log(`Total: ${merged.length} entries`);

  // Show per-level breakdown
  const perLevel: Record<string, number> = {};
  for (const e of merged) {
    perLevel[e.jlptLevel] = (perLevel[e.jlptLevel] || 0) + 1;
  }
  console.log('Per level:', perLevel);

  return { total: merged.length, added, updated };
}

// ─── Merge Grammar ──────────────────────────────────────────────────

function mergeGrammar(): { total: number; added: number } {
  const grammarPath = resolve(DATA_DIR, 'jlpt_grammar_all.json');
  const rawPath = resolve(RAW_DIR, 'all_grammar.json');

  if (!existsSync(rawPath)) {
    console.log('No scraped grammar data found. Run scrape-jsmori.ts first.');
    return { total: 0, added: 0 };
  }

  const existing: GrammarEntry[] = loadJson(grammarPath);
  const scraped: RawGrammar[] = loadJson(rawPath);

  console.log(`\n── Merging Grammar ──`);
  console.log(`Existing: ${existing.length} entries`);
  console.log(`Scraped:  ${scraped.length} entries`);

  // Build index of existing patterns (normalized)
  const patternIndex = new Set<string>();
  for (const e of existing) {
    patternIndex.add(normalizePattern(e.pattern) + '|' + e.jlptLevel);
  }

  let added = 0;
  let idx = existing.length;
  const newEntries: GrammarEntry[] = [];

  for (const raw of scraped) {
    if (!raw.pattern) continue;

    const normalizedKey = normalizePattern(raw.pattern) + '|' + raw.jlptLevel;
    if (patternIndex.has(normalizedKey)) continue;

    // New grammar point
    const newEntry: GrammarEntry = {
      id: generateGrammarId(raw.jlptLevel, raw.pattern, idx),
      pattern: raw.pattern,
      meaning_zh_CN: raw.meaning_zh_CN,
      explanation_zh_CN: raw.meaning_zh_CN, // Use meaning as explanation too
      example: '',
      example_meaning_zh_CN: '',
      jlptLevel: raw.jlptLevel,
      category: mapGrammarCategory(raw.scene || raw.meaning_zh_CN),
    };

    newEntries.push(newEntry);
    patternIndex.add(normalizedKey);
    added++;
    idx++;
  }

  const merged = [...existing, ...newEntries];

  // Sort by level then category
  const levelOrder: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };
  merged.sort((a, b) => {
    const lvlDiff = (levelOrder[a.jlptLevel] ?? 5) - (levelOrder[b.jlptLevel] ?? 5);
    if (lvlDiff !== 0) return lvlDiff;
    return a.category.localeCompare(b.category);
  });

  saveJson(grammarPath, merged);

  console.log(`Added: ${added} new grammar points`);
  console.log(`Total: ${merged.length} entries`);

  const perLevel: Record<string, number> = {};
  for (const e of merged) {
    perLevel[e.jlptLevel] = (perLevel[e.jlptLevel] || 0) + 1;
  }
  console.log('Per level:', perLevel);

  return { total: merged.length, added };
}

// ─── Create Kanji Data ──────────────────────────────────────────────

function createKanjiData(): { total: number } {
  const kanjiPath = resolve(DATA_DIR, 'jlpt_kanji_all.json');
  const rawPath = resolve(RAW_DIR, 'all_kanji.json');

  if (!existsSync(rawPath)) {
    console.log('No scraped kanji data found. Run scrape-jsmori.ts first.');
    return { total: 0 };
  }

  const scraped: RawKanji[] = loadJson(rawPath);

  console.log(`\n── Creating Kanji Data ──`);
  console.log(`Scraped: ${scraped.length} entries`);

  // Deduplicate by word+level
  const seen = new Set<string>();
  const entries: KanjiEntry[] = [];

  for (const raw of scraped) {
    if (!raw.word) continue;

    const key = `${raw.word}|${raw.jlptLevel}`;
    if (seen.has(key)) continue;
    seen.add(key);

    entries.push({
      kanji: raw.word,
      readings: raw.reading ? [raw.reading] : [],
      meaning_en: raw.meaning_en,
      meaning_zh_CN: raw.meaning_zh_CN,
      category: raw.category,
      jlptLevel: raw.jlptLevel,
    });
  }

  // Sort by level
  const levelOrder: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };
  entries.sort((a, b) => (levelOrder[a.jlptLevel] ?? 5) - (levelOrder[b.jlptLevel] ?? 5));

  saveJson(kanjiPath, entries);

  console.log(`Total: ${entries.length} kanji entries`);

  const perLevel: Record<string, number> = {};
  for (const e of entries) {
    perLevel[e.jlptLevel] = (perLevel[e.jlptLevel] || 0) + 1;
  }
  console.log('Per level:', perLevel);

  return { total: entries.length };
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  console.log('=== JSMORI Data Merge ===\n');

  const vocabResult = mergeVocabulary();
  const grammarResult = mergeGrammar();
  const kanjiResult = createKanjiData();

  console.log('\n=== Final Summary ===');
  console.log(`Vocabulary: ${vocabResult.total} total (${vocabResult.added} new, ${vocabResult.updated} updated)`);
  console.log(`Grammar: ${grammarResult.total} total (${grammarResult.added} new)`);
  console.log(`Kanji: ${kanjiResult.total} total (new dataset)`);
}

main();
