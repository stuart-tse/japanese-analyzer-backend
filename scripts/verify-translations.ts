import { prisma } from '../src/config/prisma.js';

async function main() {
  const item = await prisma.contentItem.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { sections: { orderBy: { orderIndex: 'asc' } } },
  });

  if (!item) {
    console.log('No content found');
    return;
  }

  console.log(`Title: ${item.title}`);
  console.log(`Title (ZH): ${item.titleZh || '(none)'}`);
  console.log(`Summary: ${item.summary?.slice(0, 100) || '(none)'}`);
  console.log(`Sections: ${item.sections.length}`);

  const translated = item.sections.filter((s) => !!s.translationZh);
  console.log(`Translated: ${translated.length}/${item.sections.length}\n`);

  for (const s of translated.slice(0, 3)) {
    console.log(`Section ${s.orderIndex} (${s.type}):`);
    console.log(`  JP: ${s.text.slice(0, 60)}...`);
    console.log(`  ZH: ${s.translationZh!.slice(0, 60)}...`);
    console.log();
  }
}

main().finally(() => prisma.$disconnect());
