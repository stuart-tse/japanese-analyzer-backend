/**
 * Seed script: Generate vocabulary packs for N4–N1 levels.
 * Reads jlpt_vocabulary_all.json, groups by level + POS, creates packs of ~12–15 words.
 * Existing packs (by packId) are skipped.
 *
 * Usage: npx tsx scripts/seed-all-vocab-packs.ts
 */

import { prisma } from '../src/config/prisma.js';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface VocabEntry {
  word: string;
  furigana: string;
  romaji: string;
  meaning_zh_CN: string;
  jlptLevel: string;
  pos: string;
}

const POS_LABELS: Record<string, { zh: string; en: string }> = {
  noun: { zh: '名词', en: 'Nouns' },
  verb: { zh: '动词', en: 'Verbs' },
  adj: { zh: '形容词', en: 'Adjectives' },
  adverb: { zh: '副词', en: 'Adverbs' },
  katakana: { zh: '外来语', en: 'Katakana Words' },
  other: { zh: '其他', en: 'Other' },
};

const PACK_SIZE = 13; // target words per pack

function buildPacks(level: string, words: VocabEntry[]) {
  // Group by POS
  const groups: Record<string, VocabEntry[]> = {};
  for (const w of words) {
    const pos = w.pos || 'other';
    if (groups[pos] === undefined) groups[pos] = [];
    groups[pos].push(w);
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

  for (const [pos, posWords] of Object.entries(groups)) {
    const label = POS_LABELS[pos] || POS_LABELS.other;
    const totalChunks = Math.ceil(posWords.length / PACK_SIZE);

    for (let i = 0; i < posWords.length; i += PACK_SIZE) {
      const chunk = posWords.slice(i, i + PACK_SIZE);
      const chunkIndex = Math.floor(i / PACK_SIZE) + 1;
      const suffix = totalChunks > 1 ? ` (${chunkIndex})` : '';

      packs.push({
        packId: `${levelLower}-${pos}-${chunkIndex}`,
        name_zh_CN: `${level} ${label.zh}${suffix}`,
        name_en: `${level} ${label.en}${suffix}`,
        description_zh_CN: `${level}级${label.zh}词汇，共${chunk.length}词`,
        category: pos,
        jlptLevel: level,
        words: chunk.map(w => w.word),
        order: orderCounter++,
      });
    }
  }

  return packs;
}

async function main() {
  const allVocab: VocabEntry[] = JSON.parse(
    readFileSync(resolve(__dirname, '../data/jlpt_vocabulary_all.json'), 'utf-8')
  );

  const levels = ['N4', 'N3', 'N2', 'N1'];
  let totalCreated = 0;
  let totalSkipped = 0;

  for (const level of levels) {
    const words = allVocab.filter(w => w.jlptLevel === level);
    const packs = buildPacks(level, words);

    console.log(`\n${level}: ${words.length} words → ${packs.length} packs`);

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
          type: 'vocabulary',
          words: pack.words,
          order: pack.order,
        },
      });

      console.log(`  Created ${pack.packId} (${pack.words.length} words)`);
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
