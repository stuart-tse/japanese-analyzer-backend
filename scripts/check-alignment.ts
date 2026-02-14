import { prisma } from '../src/config/prisma.js';

async function main() {
  const item = await prisma.contentItem.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { sections: { orderBy: { orderIndex: 'asc' } } },
  });
  if (!item) return;

  for (const s of item.sections) {
    const jp = s.text.slice(0, 60).replace(/\n/g, ' ');
    const zh = (s.translationZh || '').slice(0, 60).replace(/\n/g, ' ');
    console.log(`[${s.orderIndex}] ${s.type}`);
    console.log(`  JP: ${jp}`);
    console.log(`  ZH: ${zh}`);
    console.log();
  }
}

main().finally(() => prisma.$disconnect());
