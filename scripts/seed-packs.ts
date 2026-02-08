import { prisma } from '../src/config/prisma.js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface PackSeedData {
  packId: string;
  name_zh_CN: string;
  name_en: string;
  description_zh_CN: string;
  category: string;
  jlptLevel: string;
  words: string[];
  order: number;
}

async function seedPacks() {
  const packsData: PackSeedData[] = JSON.parse(
    readFileSync(resolve(__dirname, '../data/n5_packs_seed.json'), 'utf-8')
  );

  console.log(`Found ${packsData.length} packs to seed`);

  let created = 0;
  let skipped = 0;

  for (const pack of packsData) {
    const existing = await prisma.wordPack.findUnique({
      where: { packId: pack.packId },
    });

    if (existing) {
      console.log(`  Skipping ${pack.packId} (already exists)`);
      skipped++;
      continue;
    }

    await prisma.wordPack.create({
      data: {
        packId: pack.packId,
        nameZhCN: pack.name_zh_CN,
        nameEn: pack.name_en,
        descriptionZhCN: pack.description_zh_CN || '',
        category: pack.category,
        jlptLevel: pack.jlptLevel,
        words: pack.words,
        order: pack.order,
      },
    });

    console.log(`  Created ${pack.packId} (${pack.words.length} words)`);
    created++;
  }

  const totalWords = packsData.reduce((s, p) => s + p.words.length, 0);
  console.log(`\nDone: ${created} created, ${skipped} skipped (${totalWords} total words)`);
}

seedPacks()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
