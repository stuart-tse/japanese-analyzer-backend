/**
 * Seed script: Generate grammar packs for N5–N1 levels.
 * Reads jlpt_grammar_all.json, groups by level + category, creates packs of ~8–12 grammar points.
 * Seeds WordPack rows with type: "grammar".
 *
 * Usage: npx tsx scripts/seed-grammar-packs.ts
 */

import { prisma } from '../src/config/prisma.js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface GrammarPoint {
  id: string;
  pattern: string;
  meaning_zh_CN: string;
  explanation_zh_CN: string;
  example: string;
  example_meaning_zh_CN: string;
  jlptLevel: string;
  category: string;
}

const CATEGORY_LABELS: Record<string, { zh: string; en: string }> = {
  particles: { zh: '助词', en: 'Particles' },
  'verb-conjugation': { zh: '动词变形', en: 'Verb Conjugation' },
  'adjective-conjugation': { zh: '形容词变形', en: 'Adjective Conjugation' },
  'sentence-patterns': { zh: '句型', en: 'Sentence Patterns' },
  expressions: { zh: '表达', en: 'Expressions' },
  conjunctions: { zh: '接续词', en: 'Conjunctions' },
  honorifics: { zh: '敬语', en: 'Honorifics' },
  conditionals: { zh: '条件表达', en: 'Conditionals' },
  'passive-causative': { zh: '被动·使役', en: 'Passive & Causative' },
  'advanced-expressions': { zh: '高级表达', en: 'Advanced Expressions' },
  'formal-expressions': { zh: '书面表达', en: 'Formal Expressions' },
  'literary-expressions': { zh: '文语表达', en: 'Literary Expressions' },
};

const PACK_SIZE = 10; // target grammar points per pack

function buildGrammarPacks(level: string, points: GrammarPoint[]) {
  // Group by category
  const groups: Record<string, GrammarPoint[]> = {};
  for (const p of points) {
    const cat = p.category || 'sentence-patterns';
    if (groups[cat] === undefined) groups[cat] = [];
    groups[cat].push(p);
  }

  const packs: Array<{
    packId: string;
    name_zh_CN: string;
    name_en: string;
    description_zh_CN: string;
    category: string;
    jlptLevel: string;
    words: string[]; // grammar point IDs
    order: number;
  }> = [];

  let orderCounter = 1;
  const levelLower = level.toLowerCase();

  for (const [cat, catPoints] of Object.entries(groups)) {
    const label = CATEGORY_LABELS[cat] || { zh: cat, en: cat };
    const totalChunks = Math.ceil(catPoints.length / PACK_SIZE);

    for (let i = 0; i < catPoints.length; i += PACK_SIZE) {
      const chunk = catPoints.slice(i, i + PACK_SIZE);
      const chunkIndex = Math.floor(i / PACK_SIZE) + 1;
      const suffix = totalChunks > 1 ? ` (${chunkIndex})` : '';

      packs.push({
        packId: `${levelLower}-grammar-${cat}-${chunkIndex}`,
        name_zh_CN: `${level} ${label.zh}${suffix}`,
        name_en: `${level} ${label.en}${suffix}`,
        description_zh_CN: `${level}级${label.zh}文法，共${chunk.length}条`,
        category: cat,
        jlptLevel: level,
        words: chunk.map(p => p.id), // Store grammar point IDs
        order: orderCounter++,
      });
    }
  }

  return packs;
}

async function main() {
  const allGrammar: GrammarPoint[] = JSON.parse(
    readFileSync(resolve(__dirname, '../data/jlpt_grammar_all.json'), 'utf-8')
  );

  console.log(`Loaded ${allGrammar.length} grammar points total`);

  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  let totalCreated = 0;
  let totalSkipped = 0;

  for (const level of levels) {
    const points = allGrammar.filter(g => g.jlptLevel === level);
    const packs = buildGrammarPacks(level, points);

    console.log(`\n${level}: ${points.length} grammar points → ${packs.length} packs`);

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
          type: 'grammar',
          words: pack.words,
          order: pack.order,
        },
      });

      console.log(`  Created ${pack.packId} (${pack.words.length} points)`);
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
