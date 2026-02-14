/**
 * Test: Generate translations for an existing content item.
 * Runs only the translation step — no scraping or other AI calls.
 */
import { prisma } from '../src/config/prisma.js';
import { generateTranslations } from '../src/services/contentAI.js';

async function main() {
  console.log('\n=== Translation Generation Test ===\n');

  // Find the most recent content item
  const item = await prisma.contentItem.findFirst({
    orderBy: { createdAt: 'desc' },
    include: {
      sections: { orderBy: { orderIndex: 'asc' } },
    },
  });

  if (!item) {
    console.error('No content items found');
    process.exit(1);
  }

  console.log(`Content: ${item.id} — ${item.title}`);
  console.log(`Sections: ${item.sections.length}\n`);

  const sectionTexts = item.sections.map((s) => s.text);
  const sectionTypes = item.sections.map((s) => s.type);

  console.log('Calling generateTranslations()...');
  const start = Date.now();

  const translations = await generateTranslations(item.title, sectionTexts, sectionTypes);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`  Done in ${elapsed}s\n`);

  console.log(`  titleZh: ${translations.titleZh}`);
  console.log(`  summary: ${translations.summary}`);
  console.log(`  sectionTranslations: ${translations.sectionTranslations.length}\n`);

  // Show first 3 section translations
  for (let i = 0; i < Math.min(3, translations.sectionTranslations.length); i++) {
    const jpPreview = sectionTexts[i].slice(0, 50);
    const zhTranslation = translations.sectionTranslations[i];
    console.log(`  Section ${i}:`);
    console.log(`    JP: ${jpPreview}...`);
    console.log(`    ZH: ${zhTranslation.slice(0, 80)}...`);
    console.log();
  }

  // Save to database
  console.log('Saving translations to DB...');

  await prisma.contentItem.update({
    where: { id: item.id },
    data: {
      titleZh: translations.titleZh,
      summary: translations.summary,
    },
  });

  for (let i = 0; i < item.sections.length; i++) {
    const translationZh = translations.sectionTranslations[i] || '';
    if (translationZh) {
      await prisma.contentSection.update({
        where: { id: item.sections[i].id },
        data: { translationZh },
      });
    }
  }

  console.log('  Saved!\n');

  // Verify
  const updated = await prisma.contentItem.findUnique({
    where: { id: item.id },
    include: { sections: { orderBy: { orderIndex: 'asc' } } },
  });

  const translatedCount = updated!.sections.filter((s) => !!s.translationZh).length;
  console.log(`  titleZh: ${updated!.titleZh}`);
  console.log(`  summary: ${updated!.summary?.slice(0, 80)}...`);
  console.log(`  Translated sections: ${translatedCount}/${updated!.sections.length}`);

  console.log('\n=== TRANSLATION TEST PASSED ===\n');
  console.log(`View article: http://localhost:3001/library/${item.id}\n`);
}

main()
  .catch((err) => {
    console.error('Test failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
