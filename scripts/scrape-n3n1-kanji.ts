/**
 * Scrape N3 and N1 kanji from jsmori.com.
 *
 * These pages use a non-table format:
 *   <h6>漢字</h6>
 *   <p>音読み：{on}訓読み：{kun}【意思】{meaning}</p>
 *   <p>example words with ruby readings</p>
 *   <hr>
 *
 * After scraping, merges into jlpt_kanji_all.json and re-seeds kanji packs.
 *
 * Usage: npx tsx scripts/scrape-n3n1-kanji.ts
 */

import { chromium, type Page } from 'playwright';
import * as OpenCC from 'opencc-js';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '../data');
const RAW_DIR = resolve(DATA_DIR, 'jsmori_raw');
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' });

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

function saveJson(filePath: string, data: unknown): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function loadJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

async function scrapeKanjiPage(page: Page, level: string, url: string): Promise<RawKanji[]> {
  console.log(`\nScraping ${level} kanji: ${url}`);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));

  const raw = await page.evaluate(() => {
    const results: Array<{
      kanji: string;
      onReadings: string;
      kunReadings: string;
      meaning: string;
    }> = [];

    const article = document.querySelector('.entry-content');
    if (!article) return results;

    const h6s = article.querySelectorAll('h6');
    for (const h6 of h6s) {
      const kanji = (h6.textContent || '').trim();
      if (!kanji || kanji.length > 2) continue;

      // Next sibling <p> has readings + meaning
      let nextEl = h6.nextElementSibling;
      if (!nextEl || nextEl.tagName !== 'P') continue;

      const readingText = (nextEl.textContent || '').trim();

      // Parse: 音読み：{on}訓読み：{kun}【意思】{meaning}
      const onMatch = readingText.match(/音読み?：([^訓【]*)/);
      const kunMatch = readingText.match(/訓読み：([^【]*)/);
      const meaningMatch = readingText.match(/【意思】(.+)/);

      const onReadings = onMatch ? onMatch[1].trim() : '';
      const kunReadings = kunMatch ? kunMatch[1].trim() : '';
      const meaning = meaningMatch ? meaningMatch[1].trim() : '';

      results.push({ kanji, onReadings, kunReadings, meaning });
    }

    return results;
  });

  console.log(`  Extracted ${raw.length} kanji entries`);

  // Deduplicate by kanji character (page may repeat entries)
  const seen = new Set<string>();
  const processed: RawKanji[] = [];

  for (const r of raw) {
    if (seen.has(r.kanji)) continue;
    seen.add(r.kanji);

    // Combine on + kun readings
    const readings = [r.onReadings, r.kunReadings]
      .filter(s => s && s !== '-')
      .join('、');

    processed.push({
      word: r.kanji,
      reading: readings,
      meaning_en: '',
      meaning_zh_CN: t2s(r.meaning),
      category: 'general',
      jlptLevel: level,
    });
  }

  console.log(`  After dedup: ${processed.length} unique kanji`);
  return processed;
}

function mergeIntoKanjiAll(newEntries: RawKanji[]): void {
  const kanjiPath = resolve(DATA_DIR, 'jlpt_kanji_all.json');
  const existing: KanjiEntry[] = loadJson(kanjiPath);

  console.log(`\n── Merging into jlpt_kanji_all.json ──`);
  console.log(`Existing: ${existing.length} entries`);
  console.log(`New: ${newEntries.length} entries`);

  // Build index of existing kanji
  const existingKeys = new Set<string>();
  for (const e of existing) {
    existingKeys.add(`${e.kanji}|${e.jlptLevel}`);
  }

  let added = 0;
  const toAdd: KanjiEntry[] = [];

  for (const raw of newEntries) {
    const key = `${raw.word}|${raw.jlptLevel}`;
    if (existingKeys.has(key)) continue;

    toAdd.push({
      kanji: raw.word,
      readings: raw.reading ? raw.reading.split('、').map(s => s.trim()).filter(Boolean) : [],
      meaning_en: raw.meaning_en,
      meaning_zh_CN: raw.meaning_zh_CN,
      category: raw.category,
      jlptLevel: raw.jlptLevel,
    });

    existingKeys.add(key);
    added++;
  }

  const merged = [...existing, ...toAdd];

  // Sort by level
  const levelOrder: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };
  merged.sort((a, b) => (levelOrder[a.jlptLevel] ?? 5) - (levelOrder[b.jlptLevel] ?? 5));

  saveJson(kanjiPath, merged);

  console.log(`Added: ${added} new kanji`);
  console.log(`Total: ${merged.length} entries`);

  const perLevel: Record<string, number> = {};
  for (const e of merged) {
    perLevel[e.jlptLevel] = (perLevel[e.jlptLevel] || 0) + 1;
  }
  console.log('Per level:', perLevel);
}

function updateRawCombined(newEntries: RawKanji[]): void {
  const rawPath = resolve(RAW_DIR, 'all_kanji.json');
  const existing = loadJson<RawKanji[]>(rawPath);
  const combined = [...existing, ...newEntries];
  saveJson(rawPath, combined);
  console.log(`\nUpdated all_kanji.json: ${existing.length} → ${combined.length}`);
}

async function main() {
  console.log('=== Scrape N3 & N1 Kanji (non-table format) ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const allNew: RawKanji[] = [];

  for (const { level, url } of [
    { level: 'N3', url: 'https://www.jsmori.com/jlpt-n3-kanji-list/' },
    { level: 'N1', url: 'https://www.jsmori.com/jlpt-n1-kanji-list/' },
  ]) {
    const entries = await scrapeKanjiPage(page, level, url);
    allNew.push(...entries);

    // Save per-level raw file
    saveJson(resolve(RAW_DIR, `${level.toLowerCase()}_kanji_h6.json`), entries);
  }

  await browser.close();

  // Update raw combined file
  updateRawCombined(allNew);

  // Merge into jlpt_kanji_all.json
  mergeIntoKanjiAll(allNew);

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
