/**
 * Re-scrape pages that returned 0 results in the first pass:
 * - N3/N2/N1 adjective pages (2-column format)
 * - N3 kanji page (timed out)
 * - Particle pages (no th headers)
 *
 * Usage: npx tsx scripts/rescrape-missing.ts
 */

import { chromium, type Page } from 'playwright';
import * as OpenCC from 'opencc-js';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = resolve(__dirname, '../data/jsmori_raw');
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' });

function saveJson(filename: string, data: unknown): void {
  const filePath = resolve(RAW_DIR, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  const count = Array.isArray(data) ? data.length : 0;
  console.log(`  Saved ${filename} (${count} entries)`);
}

async function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

async function scrapeAdjPage(page: Page, level: string, url: string, filename: string) {
  console.log(`\nScraping ${level} adj → ${url}`);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await delay(2000);

  const raw = await page.evaluate(() => {
    const results: Array<{ furigana: string; word: string; meaning_en: string; meaning_zh_raw: string }> = [];
    const tables = document.querySelectorAll('table');

    for (const table of tables) {
      const rows = table.querySelectorAll('tr');
      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length !== 2) continue;

        const col0 = (cells[0]?.textContent || '').trim();
        const col1 = (cells[1]?.textContent || '').trim();

        // Skip header rows
        if (col1.includes('意思') || col0.includes('形容詞')) continue;

        // Parse "furigana(kanji)" format
        const m = col0.match(/^(.+?)\((.+?)\)$/);
        const furigana = m ? m[1].trim() : col0;
        const word = m ? m[2].trim() : col0;

        // Split "Chinese English" from col1
        let zh = col1;
        let en = '';
        const parts = col1.split(/\s+/);
        const zhParts: string[] = [];
        const enParts: string[] = [];
        let foundEn = false;
        for (const p of parts) {
          if (!foundEn && /^[a-zA-Z(]/.test(p)) foundEn = true;
          if (foundEn) enParts.push(p);
          else zhParts.push(p);
        }
        if (zhParts.length > 0 && enParts.length > 0) {
          zh = zhParts.join(' ');
          en = enParts.join(' ');
        }

        if (furigana) {
          results.push({ furigana, word, meaning_en: en, meaning_zh_raw: zh });
        }
      }
    }
    return results;
  });

  console.log(`  Extracted ${raw.length} entries`);

  const processed = raw.map(r => ({
    furigana: r.furigana,
    word: r.word || r.furigana,
    meaning_en: r.meaning_en,
    meaning_zh_CN: t2s(r.meaning_zh_raw),
    jlptLevel: level,
    pos: 'adj',
  }));

  saveJson(filename, processed);
  return processed;
}

async function scrapeParticlePage(page: Page, level: string, url: string, filename: string) {
  console.log(`\nScraping ${level} particles → ${url}`);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await delay(2000);

  const raw = await page.evaluate(() => {
    const results: Array<{ pattern: string; meaning_zh_raw: string; scene: string }> = [];

    // Particle pages have many small tables, often with content formatted as
    // examples showing particle usage. Look for tables with 2-3 column data rows.
    const tables = document.querySelectorAll('table');
    for (const table of tables) {
      const rows = table.querySelectorAll('tr');
      // Check if this has th headers
      const ths = table.querySelectorAll('th');
      const headerTexts = Array.from(ths).map(h => (h.textContent || '').trim());
      const isGrammarTable = headerTexts.some(h =>
        h.includes('語法') || h.includes('文法') || h.includes('助詞') || h.includes('用法')
      );

      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length < 2 || cells.length > 4) continue;

        const text0 = (cells[0]?.textContent || '').trim();
        const text1 = (cells[1]?.textContent || '').trim();

        // Skip reference rows
        if (!text0 || text0.length > 60) continue;
        if (text0.includes('Ｖ') || text0.includes('動詞詞性')) continue;

        const scene = cells[2] ? (cells[2].textContent || '').trim() : '助詞';
        results.push({ pattern: text0, meaning_zh_raw: text1, scene });
      }
    }
    return results;
  });

  console.log(`  Extracted ${raw.length} entries`);

  const processed = raw.map(r => ({
    pattern: r.pattern,
    meaning_zh_CN: t2s(r.meaning_zh_raw),
    scene: t2s(r.scene),
    jlptLevel: level,
  }));

  saveJson(filename, processed);
  return processed;
}

async function scrapeKanjiPage(page: Page, level: string, url: string, filename: string) {
  console.log(`\nScraping ${level} kanji → ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await delay(5000);

    const tableCount = await page.evaluate(() => document.querySelectorAll('table').length);
    console.log(`  Tables found: ${tableCount}`);

    if (tableCount === 0) {
      console.log(`  No tables found for ${level} kanji - page may use different format`);
      saveJson(filename, []);
      return [];
    }

    const raw = await page.evaluate(() => {
      const results: Array<{ word: string; reading: string; meaning_en: string; meaning_zh_raw: string; category: string }> = [];
      const tables = document.querySelectorAll('table');

      for (const table of tables) {
        // Find category from nearest h5
        let category = '';
        let el: Element | null = table.closest('figure')?.previousElementSibling || table.previousElementSibling;
        let maxSearch = 5;
        while (el && maxSearch > 0) {
          if (el.tagName === 'H5') {
            category = (el.textContent || '').trim();
            break;
          }
          el = el.previousElementSibling;
          maxSearch--;
        }

        const rows = table.querySelectorAll('tr');
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length < 3) continue;

          const word = (cells[0]?.textContent || '').trim();
          const rtElements = cells[0]?.querySelectorAll('rt');
          const reading = Array.from(rtElements || []).map(rt => (rt.textContent || '').trim()).join('');
          const meaning_en = (cells[1]?.textContent || '').trim();
          const meaning_zh_raw = (cells[2]?.textContent || '').trim();

          if (word) results.push({ word, reading, meaning_en, meaning_zh_raw, category });
        }
      }
      return results;
    });

    const processed = raw.map(r => ({
      word: r.word,
      reading: r.reading,
      meaning_en: r.meaning_en,
      meaning_zh_CN: t2s(r.meaning_zh_raw),
      category: t2s(r.category),
      jlptLevel: level,
    }));

    saveJson(filename, processed);
    return processed;
  } catch (err) {
    console.log(`  Failed: ${err instanceof Error ? err.message.substring(0, 100) : String(err)}`);
    saveJson(filename, []);
    return [];
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const allNewVocab: unknown[] = [];
  const allNewGrammar: unknown[] = [];
  const allNewKanji: unknown[] = [];

  // Re-scrape adj pages
  for (const { level, url, file } of [
    { level: 'N3', url: 'https://www.jsmori.com/jlpt-n3-vocabulary-list-adj/', file: 'n3_vocab_adj.json' },
    { level: 'N2', url: 'https://www.jsmori.com/jlpt-n2-vocabulary-list-adj/', file: 'n2_vocab_adj.json' },
    { level: 'N1', url: 'https://www.jsmori.com/jlpt-n1-vocabulary-list-adj/', file: 'n1_vocab_adj.json' },
  ]) {
    const data = await scrapeAdjPage(page, level, url, file);
    allNewVocab.push(...data);
  }

  // Re-scrape particle pages
  for (const { level, url, file } of [
    { level: 'N5', url: 'https://www.jsmori.com/jlpt-n5-particles-list/', file: 'n5_particles.json' },
    { level: 'N4', url: 'https://www.jsmori.com/jlpt-n4-particles-list/', file: 'n4_particles.json' },
    { level: 'N3', url: 'https://www.jsmori.com/jlpt-n3-particles-list/', file: 'n3_particles.json' },
    { level: 'N1', url: 'https://www.jsmori.com/jlpt-n1-particles-list/', file: 'n1_particles.json' },
  ]) {
    const data = await scrapeParticlePage(page, level, url, file);
    allNewGrammar.push(...data);
  }

  // Re-scrape kanji pages that failed
  for (const { level, url, file } of [
    { level: 'N3', url: 'https://www.jsmori.com/jlpt-n3-kanji-list/', file: 'n3_kanji.json' },
    { level: 'N1', url: 'https://www.jsmori.com/jlpt-n1-kanji-list/', file: 'n1_kanji.json' },
  ]) {
    const data = await scrapeKanjiPage(page, level, url, file);
    allNewKanji.push(...data);
  }

  // Update combined files by merging with existing
  console.log('\n── Updating combined files ──');

  const vocabCombined = JSON.parse(readFileSync(resolve(RAW_DIR, 'all_vocab.json'), 'utf-8'));
  vocabCombined.push(...allNewVocab);
  writeFileSync(resolve(RAW_DIR, 'all_vocab.json'), JSON.stringify(vocabCombined, null, 2));
  console.log(`Vocab combined: ${vocabCombined.length} total`);

  const grammarCombined = JSON.parse(readFileSync(resolve(RAW_DIR, 'all_grammar.json'), 'utf-8'));
  grammarCombined.push(...allNewGrammar);
  writeFileSync(resolve(RAW_DIR, 'all_grammar.json'), JSON.stringify(grammarCombined, null, 2));
  console.log(`Grammar combined: ${grammarCombined.length} total`);

  const kanjiCombined = JSON.parse(readFileSync(resolve(RAW_DIR, 'all_kanji.json'), 'utf-8'));
  kanjiCombined.push(...allNewKanji);
  writeFileSync(resolve(RAW_DIR, 'all_kanji.json'), JSON.stringify(kanjiCombined, null, 2));
  console.log(`Kanji combined: ${kanjiCombined.length} total`);

  await browser.close();
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
