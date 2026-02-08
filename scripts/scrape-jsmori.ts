/**
 * Scrape JLPT vocabulary, grammar, and kanji data from jsmori.com
 *
 * Uses Playwright to navigate pages, extract table data, convert
 * Traditional → Simplified Chinese, and save as JSON.
 *
 * Usage: npx tsx scripts/scrape-jsmori.ts
 */

import { chromium, type Page } from 'playwright';
import * as OpenCC from 'opencc-js';
import { toRomaji, isHiragana, isKatakana } from 'wanakana';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = resolve(__dirname, '../data/jsmori_raw');

// Traditional → Simplified Chinese converter
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' });

// ─── URL Definitions ────────────────────────────────────────────────

interface PageDef {
  level: string;
  type: 'vocab' | 'grammar' | 'kanji' | 'particles';
  pos?: string;
  url: string;
}

const PAGES: PageDef[] = [
  // ── N5 ──
  { level: 'N5', type: 'vocab', pos: 'verb', url: 'https://www.jsmori.com/jlpt-n5-vocabulary-list-verb/' },
  { level: 'N5', type: 'vocab', pos: 'noun', url: 'https://www.jsmori.com/jlpt-n5-vocabulary-list-nouns/' },
  { level: 'N5', type: 'vocab', pos: 'adj', url: 'https://www.jsmori.com/jlpt-n5-vocabulary-list-adj/' },
  { level: 'N5', type: 'vocab', pos: 'adverb', url: 'https://www.jsmori.com/jlpt-n5-vocabulary-list-adverb/' },
  { level: 'N5', type: 'vocab', pos: 'katakana', url: 'https://www.jsmori.com/jlpt-n5-vocabulary-list-katakana/' },
  { level: 'N5', type: 'grammar', url: 'https://www.jsmori.com/jlpt-n5-grammar-list/' },
  { level: 'N5', type: 'particles', url: 'https://www.jsmori.com/jlpt-n5-particles-list/' },
  { level: 'N5', type: 'kanji', url: 'https://www.jsmori.com/jlpt-n5-kanji-list/' },

  // ── N4 ──
  { level: 'N4', type: 'vocab', pos: 'verb', url: 'https://www.jsmori.com/jlpt-n4-vocabulary-list-verb/' },
  { level: 'N4', type: 'vocab', pos: 'noun', url: 'https://www.jsmori.com/jlpt-n4-vocabulary-list-nouns/' },
  { level: 'N4', type: 'vocab', pos: 'adj', url: 'https://www.jsmori.com/jlpt-n4-vocabulary-list-adj/' },
  { level: 'N4', type: 'vocab', pos: 'adverb', url: 'https://www.jsmori.com/jlpt-n4-vocabulary-list-adverb/' },
  { level: 'N4', type: 'vocab', pos: 'katakana', url: 'https://www.jsmori.com/jlpt-n4-vocabulary-list-katakana/' },
  { level: 'N4', type: 'grammar', url: 'https://www.jsmori.com/jlpt-n4-grammar-list/' },
  { level: 'N4', type: 'particles', url: 'https://www.jsmori.com/jlpt-n4-particles-list/' },
  { level: 'N4', type: 'kanji', url: 'https://www.jsmori.com/jlpt-n4-kanji-list/' },

  // ── N3 ──
  { level: 'N3', type: 'vocab', pos: 'verb', url: 'https://www.jsmori.com/jlpt-n3-vocabulary-list-verb/' },
  { level: 'N3', type: 'vocab', pos: 'noun', url: 'https://www.jsmori.com/jlpt-n3-vocabulary-list-nouns/' },
  { level: 'N3', type: 'vocab', pos: 'adj', url: 'https://www.jsmori.com/jlpt-n3-vocabulary-list-adj/' },
  { level: 'N3', type: 'vocab', pos: 'adverb', url: 'https://www.jsmori.com/jlpt-n3-vocabulary-list-adverb/' },
  { level: 'N3', type: 'vocab', pos: 'katakana', url: 'https://www.jsmori.com/jlpt-n3-vocabulary-list-katakana/' },
  { level: 'N3', type: 'grammar', url: 'https://www.jsmori.com/jlpt-n3-grammar-list/' },
  { level: 'N3', type: 'particles', url: 'https://www.jsmori.com/jlpt-n3-particles-list/' },
  { level: 'N3', type: 'kanji', url: 'https://www.jsmori.com/jlpt-n3-kanji-list/' },

  // ── N2 ──
  { level: 'N2', type: 'vocab', pos: 'verb', url: 'https://www.jsmori.com/jlpt-n2-vocabulary-list-verb/' },
  { level: 'N2', type: 'vocab', pos: 'adj', url: 'https://www.jsmori.com/jlpt-n2-vocabulary-list-adj/' },
  { level: 'N2', type: 'vocab', pos: 'adverb', url: 'https://www.jsmori.com/jlpt-n2-vocabulary-list-adverb/' },
  { level: 'N2', type: 'vocab', pos: 'katakana', url: 'https://www.jsmori.com/jlpt-n2-vocabulary-list-katakana/' },
  { level: 'N2', type: 'grammar', url: 'https://www.jsmori.com/jlpt-n2-grammar-list/' },

  // ── N1 ──
  { level: 'N1', type: 'vocab', pos: 'verb', url: 'https://www.jsmori.com/jlpt-n1-vocabulary-list-verb/' },
  { level: 'N1', type: 'vocab', pos: 'noun', url: 'https://www.jsmori.com/jlpt-n1-vocabulary-list-nouns/' },
  { level: 'N1', type: 'vocab', pos: 'adj', url: 'https://www.jsmori.com/jlpt-n1-vocabulary-list-adj/' },
  { level: 'N1', type: 'vocab', pos: 'adverb', url: 'https://www.jsmori.com/jlpt-n1-vocabulary-list-adverb/' },
  { level: 'N1', type: 'vocab', pos: 'katakana', url: 'https://www.jsmori.com/jlpt-n1-vocabulary-list-katakana/' },
  { level: 'N1', type: 'grammar', url: 'https://www.jsmori.com/jlpt-n1-grammar-list/' },
  { level: 'N1', type: 'particles', url: 'https://www.jsmori.com/jlpt-n1-particles-list/' },
  { level: 'N1', type: 'kanji', url: 'https://www.jsmori.com/jlpt-n1-kanji-list/' },
];

// ─── Data Types ─────────────────────────────────────────────────────

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

// ─── Extraction Functions ───────────────────────────────────────────

async function extractVocabTables(page: Page): Promise<Array<{ furigana: string; word: string; meaning_en: string; meaning_zh_raw: string; verbType: string }>> {
  return page.evaluate(() => {
    const results: Array<{ furigana: string; word: string; meaning_en: string; meaning_zh_raw: string; verbType: string }> = [];
    const tables = document.querySelectorAll('table');

    for (const table of tables) {
      const rows = table.querySelectorAll('tr');
      for (const row of rows) {
        const cells = row.querySelectorAll('td');

        // ── 2-column format (adj pages): word(kanji) | "Chinese English" ──
        if (cells.length === 2) {
          const col0 = (cells[0]?.textContent || '').trim();
          const col1 = (cells[1]?.textContent || '').trim();

          // Skip header rows like "い形容詞 | 意思"
          if (col1.includes('意思') || col0.includes('形容詞')) continue;

          // Parse "word(kanji)" format, e.g. "あせくさい(汗臭い)"
          const parenMatch = col0.match(/^(.+?)(?:\((.+?)\))?$/);
          const furigana = parenMatch?.[1]?.trim() || col0;
          const word = parenMatch?.[2]?.trim() || furigana;

          // Parse "Chinese English" - split on last space-separated English
          // Format: "汗味 smell(ing) of sweat" → zh="汗味", en="smell(ing) of sweat"
          // Heuristic: first part is Chinese chars, rest is English
          let meaning_zh_raw = col1;
          let meaning_en = '';
          const parts = col1.split(/\s+/);
          const zhParts: string[] = [];
          const enParts: string[] = [];
          let foundEn = false;
          for (const part of parts) {
            if (!foundEn && /^[a-zA-Z(]/.test(part)) foundEn = true;
            if (foundEn) enParts.push(part);
            else zhParts.push(part);
          }
          if (zhParts.length > 0 && enParts.length > 0) {
            meaning_zh_raw = zhParts.join(' ');
            meaning_en = enParts.join(' ');
          }

          if (furigana) {
            results.push({ furigana, word, meaning_en, meaning_zh_raw, verbType: '' });
          }
          continue;
        }

        if (cells.length < 3) continue;

        // Skip header rows or reference tables (verb conjugation tables have 5+ cols)
        if (cells.length >= 5) continue;

        const furigana = (cells[0]?.textContent || '').trim();
        const word = (cells[1]?.textContent || '').trim();
        const meaning_en = (cells[2]?.textContent || '').trim();

        // 4th column: Chinese meaning + optional verb type img
        let meaning_zh_raw = '';
        let verbType = '';
        if (cells[3]) {
          const imgs = cells[3].querySelectorAll('img');
          for (const img of imgs) {
            const alt = img.getAttribute('alt') || '';
            if (alt.includes('自動詞')) verbType = '自動詞';
            else if (alt.includes('他動詞')) verbType = '他動詞';
          }
          // Get text content (strips img tags)
          meaning_zh_raw = (cells[3].textContent || '').trim();
        }

        if (!furigana && !word) continue;

        results.push({ furigana, word, meaning_en, meaning_zh_raw, verbType });
      }
    }
    return results;
  });
}

async function extractGrammarTable(page: Page): Promise<Array<{ pattern: string; meaning_zh_raw: string; scene: string }>> {
  return page.evaluate(() => {
    const results: Array<{ pattern: string; meaning_zh_raw: string; scene: string }> = [];
    const tables = document.querySelectorAll('table');

    for (const table of tables) {
      const headers = table.querySelectorAll('th');
      const headerTexts = Array.from(headers).map(h => (h.textContent || '').trim());

      // Grammar table has "語法" or "文法" in headers
      const isGrammarTable = headerTexts.some(h => h.includes('語法') || h.includes('文法'));
      if (!isGrammarTable) continue;

      const rows = table.querySelectorAll('tbody tr');
      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length < 2) continue;

        const pattern = (cells[0]?.textContent || '').trim();
        const meaning_zh_raw = (cells[1]?.textContent || '').trim();
        const scene = cells[2] ? (cells[2].textContent || '').trim() : '';

        if (!pattern) continue;
        results.push({ pattern, meaning_zh_raw, scene });
      }
    }

    // Also handle particle pages: tables without headers, 2-3 columns
    // Particle pages have many small tables with 助詞 content
    if (results.length === 0) {
      for (const table of tables) {
        const rows = table.querySelectorAll('tr');
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length < 2 || cells.length > 4) continue;

          const text0 = (cells[0]?.textContent || '').trim();
          const text1 = (cells[1]?.textContent || '').trim();

          // Skip if first cell doesn't look like a particle/grammar pattern
          if (!text0 || text0.length > 50) continue;
          // Skip if it looks like a conjugation reference
          if (text0.includes('Ｖ') || text0.includes('形') || text0.includes('動詞詞性')) continue;

          const scene = cells[2] ? (cells[2].textContent || '').trim() : '助詞';
          results.push({ pattern: text0, meaning_zh_raw: text1, scene });
        }
      }
    }

    return results;
  });
}

async function extractKanjiTables(page: Page): Promise<Array<{ word: string; reading: string; meaning_en: string; meaning_zh_raw: string; category: string }>> {
  return page.evaluate(() => {
    const results: Array<{ word: string; reading: string; meaning_en: string; meaning_zh_raw: string; category: string }> = [];

    // Each table is preceded by an h5 heading with the category
    const tables = document.querySelectorAll('figure table, table');
    const headings = document.querySelectorAll('h5');

    // Build a map of table → nearest preceding h5
    const headingTexts: string[] = [];
    for (const h of headings) {
      headingTexts.push((h.textContent || '').trim());
    }

    let headingIdx = 0;
    const allTables = document.querySelectorAll('table');

    for (const table of allTables) {
      // Skip tables with th headers (those are reference/conjugation tables)
      const hasHeaders = table.querySelectorAll('th').length > 0;

      // Find nearest preceding h5
      let category = '';
      let el: Element | null = table.closest('figure')?.previousElementSibling || table.previousElementSibling;
      let maxSearch = 5;
      while (el && maxSearch > 0) {
        if (el.tagName === 'H5') {
          category = (el.textContent || '').trim();
          break;
        }
        // Check inside paragraphs for strong tags (some categories are in <p><strong>)
        if (el.tagName === 'P') {
          const strong = el.querySelector('strong');
          if (strong) {
            category = (strong.textContent || '').trim();
          }
        }
        el = el.previousElementSibling;
        maxSearch--;
      }

      const rows = table.querySelectorAll('tr');
      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length < 3) continue;
        // Skip if it looks like a reference/header row
        if (hasHeaders && cells.length !== 3) continue;

        // Cell 0: word with ruby reading
        const cell0 = cells[0];
        const rubyElements = cell0.querySelectorAll('ruby');
        let word = '';
        let reading = '';

        if (rubyElements.length > 0) {
          // Extract from ruby annotations
          word = (cell0.textContent || '').trim();
          // Reading is in rt elements
          const rtElements = cell0.querySelectorAll('rt');
          reading = Array.from(rtElements).map(rt => (rt.textContent || '').trim()).join('');
          // Word text without ruby readings
          const textNodes: string[] = [];
          for (const ruby of rubyElements) {
            // Get the base text (not the rt)
            for (const child of ruby.childNodes) {
              if (child.nodeType === Node.TEXT_NODE) {
                textNodes.push((child.textContent || '').trim());
              }
            }
          }
          // Also get text outside ruby
          for (const child of cell0.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
              textNodes.push((child.textContent || '').trim());
            }
          }
          if (textNodes.length > 0) {
            word = textNodes.filter(Boolean).join('');
          }
        } else {
          word = (cell0.textContent || '').trim();
        }

        const meaning_en = (cells[1]?.textContent || '').trim();
        const meaning_zh_raw = (cells[2]?.textContent || '').trim();

        if (!word) continue;
        results.push({ word, reading, meaning_en, meaning_zh_raw, category });
      }
    }

    return results;
  });
}

// ─── Helper Functions ───────────────────────────────────────────────

function generateRomaji(text: string): string {
  try {
    // wanakana handles hiragana and katakana
    const cleaned = text.replace(/\s+/g, '');
    if (!cleaned) return '';
    return toRomaji(cleaned);
  } catch {
    return '';
  }
}

function generateRuby(word: string, furigana: string): Array<{ text: string; reading: string | null }> {
  if (!word || !furigana) return [{ text: word || furigana, reading: null }];

  // If word is all kana, no ruby needed
  const isAllKana = [...word].every(ch => isHiragana(ch) || isKatakana(ch) || /[\s\u3000ー〜・]/.test(ch));
  if (isAllKana) return [{ text: word, reading: null }];

  // Simple approach: return the whole word with reading
  return [{ text: word, reading: furigana }];
}

function generateRubyText(word: string, furigana: string): string {
  if (!furigana || word === furigana) return word;
  return `${word}(${furigana})`;
}

function saveJson(filename: string, data: unknown): void {
  const filePath = resolve(RAW_DIR, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  const count = Array.isArray(data) ? data.length : 0;
  console.log(`  Saved ${filePath} (${count} entries)`);
}

async function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  });
  const page = await context.newPage();

  const allVocab: RawVocab[] = [];
  const allGrammar: RawGrammar[] = [];
  const allKanji: RawKanji[] = [];

  let successCount = 0;
  let failCount = 0;

  for (const pageDef of PAGES) {
    const label = `${pageDef.level} ${pageDef.type}${pageDef.pos ? '/' + pageDef.pos : ''}`;
    console.log(`\nScraping: ${label} → ${pageDef.url}`);

    try {
      await page.goto(pageDef.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await delay(1500); // Be respectful to the server

      if (pageDef.type === 'vocab') {
        const raw = await extractVocabTables(page);
        console.log(`  Extracted ${raw.length} vocabulary entries`);

        const processed: RawVocab[] = raw.map(r => ({
          furigana: r.furigana,
          word: r.word || r.furigana,
          meaning_en: r.meaning_en,
          meaning_zh_CN: t2s(r.meaning_zh_raw),
          verbType: r.verbType || undefined,
          jlptLevel: pageDef.level,
          pos: pageDef.pos || 'other',
        }));

        allVocab.push(...processed);
        saveJson(`${pageDef.level.toLowerCase()}_vocab_${pageDef.pos}.json`, processed);
      } else if (pageDef.type === 'grammar' || pageDef.type === 'particles') {
        const raw = await extractGrammarTable(page);
        console.log(`  Extracted ${raw.length} grammar entries`);

        const processed: RawGrammar[] = raw.map(r => ({
          pattern: r.pattern,
          meaning_zh_CN: t2s(r.meaning_zh_raw),
          scene: t2s(r.scene),
          jlptLevel: pageDef.level,
        }));

        allGrammar.push(...processed);
        const suffix = pageDef.type === 'particles' ? 'particles' : 'grammar';
        saveJson(`${pageDef.level.toLowerCase()}_${suffix}.json`, processed);
      } else if (pageDef.type === 'kanji') {
        const raw = await extractKanjiTables(page);
        console.log(`  Extracted ${raw.length} kanji entries`);

        const processed: RawKanji[] = raw.map(r => ({
          word: r.word,
          reading: r.reading,
          meaning_en: r.meaning_en,
          meaning_zh_CN: t2s(r.meaning_zh_raw),
          category: t2s(r.category),
          jlptLevel: pageDef.level,
        }));

        allKanji.push(...processed);
        saveJson(`${pageDef.level.toLowerCase()}_kanji.json`, processed);
      }

      successCount++;
    } catch (err) {
      console.error(`  FAILED: ${err instanceof Error ? err.message : String(err)}`);
      failCount++;
    }
  }

  // Save combined files
  console.log('\n── Saving combined files ──');
  saveJson('all_vocab.json', allVocab);
  saveJson('all_grammar.json', allGrammar);
  saveJson('all_kanji.json', allKanji);

  await browser.close();

  console.log(`\n── Summary ──`);
  console.log(`Pages scraped: ${successCount} success, ${failCount} failed`);
  console.log(`Vocabulary: ${allVocab.length} entries`);
  console.log(`Grammar: ${allGrammar.length} entries`);
  console.log(`Kanji: ${allKanji.length} entries`);
}

main().catch(err => {
  console.error('Scrape failed:', err);
  process.exit(1);
});
