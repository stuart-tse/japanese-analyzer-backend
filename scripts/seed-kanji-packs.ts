/**
 * Seed script: Generate kanji packs for N5–N1 levels.
 * Reads jlpt_kanji_all.json, groups by level + category, creates packs of ~15 kanji.
 * Existing packs (by packId) are skipped.
 *
 * Usage: npx tsx scripts/seed-kanji-packs.ts
 */

import { prisma } from '../src/config/prisma.js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface KanjiEntry {
  kanji: string;
  readings: string[];
  meaning_en: string;
  meaning_zh_CN: string;
  category: string;
  jlptLevel: string;
}

const PACK_SIZE = 15;

function buildPacks(level: string, entries: KanjiEntry[]) {
  // Group by category
  const groups: Record<string, KanjiEntry[]> = {};
  for (const e of entries) {
    const cat = e.category || 'general';
    if (groups[cat] === undefined) groups[cat] = [];
    groups[cat].push(e);
  }

  const packs: Array<{
    packId: string;
    name_zh_CN: string;
    name_en: string;
    description_zh_CN: string;
    category: string;
    jlptLevel: string;
    words: string[];
    order: number;
  }> = [];

  let orderCounter = 1;
  const levelLower = level.toLowerCase();

  for (const [category, catEntries] of Object.entries(groups)) {
    const totalChunks = Math.ceil(catEntries.length / PACK_SIZE);
    const catSlug = category
      .replace(/[；;]/g, '-')
      .replace(/\s+/g, '-')
      .substring(0, 20);

    for (let i = 0; i < catEntries.length; i += PACK_SIZE) {
      const chunk = catEntries.slice(i, i + PACK_SIZE);
      const chunkIndex = Math.floor(i / PACK_SIZE) + 1;
      const suffix = totalChunks > 1 ? ` (${chunkIndex})` : '';

      packs.push({
        packId: `${levelLower}-kanji-${catSlug}-${chunkIndex}`,
        name_zh_CN: `${level} 汉字 ${category}${suffix}`,
        name_en: `${level} Kanji ${category}${suffix}`,
        description_zh_CN: `${level}级汉字 - ${category}，共${chunk.length}字`,
        category: 'kanji',
        jlptLevel: level,
        words: chunk.map(e => e.kanji),
        order: orderCounter++,
      });
    }
  }

  return packs;
}

async function main() {
  const kanjiPath = resolve(__dirname, '../data/jlpt_kanji_all.json');
  const allKanji: KanjiEntry[] = JSON.parse(readFileSync(kanjiPath, 'utf-8'));

  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  let totalCreated = 0;
  let totalSkipped = 0;

  for (const level of levels) {
    const entries = allKanji.filter(e => e.jlptLevel === level);
    if (entries.length === 0) {
      console.log(`${level}: No kanji entries, skipping`);
      continue;
    }

    const packs = buildPacks(level, entries);
    console.log(`\n${level}: ${entries.length} kanji → ${packs.length} packs`);

    for (const pack of packs) {
      const existing = await prisma.wordPack.findUnique({
        where: { packId: pack.packId },
      });

      if (existing) {
        console.log(`  Skipping ${pack.packId} (exists)`);
        totalSkipped++;
        continue;
      }

      await prisma.wordPack.create({
        data: {
          packId: pack.packId,
          nameZhCN: pack.name_zh_CN,
          nameEn: pack.name_en,
          descriptionZhCN: pack.description_zh_CN,
          category: pack.category,
          jlptLevel: pack.jlptLevel,
          type: 'kanji',
          words: pack.words,
          order: pack.order,
        },
      });

      console.log(`  Created ${pack.packId} (${pack.words.length} kanji)`);
      totalCreated++;
    }
  }

  console.log(`\nDone: ${totalCreated} created, ${totalSkipped} skipped`);
}

main()
  .catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
