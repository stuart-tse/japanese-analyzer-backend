import { prisma } from '../src/config/prisma.js';

interface TopicSeed {
  name: string;
  nameZh: string;
  nameJa: string;
  icon: string;
  sortOrder: number;
}

const TOPICS: TopicSeed[] = [
  { name: 'fashion', nameZh: '时尚', nameJa: 'ファッション', icon: '👗', sortOrder: 1 },
  { name: 'travel', nameZh: '旅行', nameJa: '旅行', icon: '✈️', sortOrder: 2 },
  { name: 'beauty', nameZh: '美容', nameJa: '美容', icon: '💄', sortOrder: 3 },
  { name: 'technology', nameZh: '科技', nameJa: 'テクノロジー', icon: '💻', sortOrder: 4 },
  { name: 'semiconductor', nameZh: '半导体', nameJa: '半導体', icon: '🔬', sortOrder: 5 },
  { name: 'business', nameZh: '商业', nameJa: 'ビジネス', icon: '💼', sortOrder: 6 },
  { name: 'food', nameZh: '美食', nameJa: 'グルメ', icon: '🍣', sortOrder: 7 },
  { name: 'culture', nameZh: '文化', nameJa: '文化', icon: '🎭', sortOrder: 8 },
  { name: 'entertainment', nameZh: '娱乐', nameJa: 'エンタメ', icon: '🎬', sortOrder: 9 },
  { name: 'sports', nameZh: '体育', nameJa: 'スポーツ', icon: '⚽', sortOrder: 10 },
  { name: 'science', nameZh: '科学', nameJa: '科学', icon: '🧪', sortOrder: 11 },
  { name: 'health', nameZh: '健康', nameJa: '健康', icon: '🏥', sortOrder: 12 },
];

async function seedTopics() {
  console.log(`Seeding ${TOPICS.length} topics...`);

  let created = 0;
  let updated = 0;

  for (const topic of TOPICS) {
    const result = await prisma.topic.upsert({
      where: { name: topic.name },
      update: {
        nameZh: topic.nameZh,
        nameJa: topic.nameJa,
        icon: topic.icon,
        sortOrder: topic.sortOrder,
      },
      create: {
        name: topic.name,
        nameZh: topic.nameZh,
        nameJa: topic.nameJa,
        icon: topic.icon,
        sortOrder: topic.sortOrder,
      },
    });

    const isNew = result.createdAt.getTime() === result.updatedAt.getTime();
    if (isNew) {
      console.log(`  ✅ Created: ${topic.name} (${topic.nameZh})`);
      created++;
    } else {
      console.log(`  🔄 Updated: ${topic.name} (${topic.nameZh})`);
      updated++;
    }
  }

  console.log(`\nDone! Created: ${created}, Updated: ${updated}`);
}

seedTopics()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
