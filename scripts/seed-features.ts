import { prisma } from '../src/config/prisma.js';
import { FeatureType, SubscriptionTier } from '../src/generated/prisma/index.js';

/**
 * Seed feature access control data
 * Run with: npx tsx scripts/seed-features.ts
 */

interface FeatureConfig {
  featureType: FeatureType;
  minTier: SubscriptionTier;
  creditCost?: number;
  description: string;
  freeLimitDaily?: number;
  proLimitDaily?: number;
  premiumLimitDaily?: number;
}

const features: FeatureConfig[] = [
  {
    featureType: FeatureType.BASIC_VOCABULARY,
    minTier: SubscriptionTier.FREE,
    description: 'Basic Japanese vocabulary (N5 level)',
    freeLimitDaily: undefined, // Unlimited
    proLimitDaily: undefined,
    premiumLimitDaily: undefined,
  },
  {
    featureType: FeatureType.TRAVEL_PACKS,
    minTier: SubscriptionTier.PRO,
    creditCost: 200,
    description: 'Travel-themed vocabulary packs',
    freeLimitDaily: 0,
    proLimitDaily: undefined, // Unlimited for Pro
    premiumLimitDaily: undefined,
  },
  {
    featureType: FeatureType.MOVIE_PACKS,
    minTier: SubscriptionTier.PRO,
    creditCost: 200,
    description: 'Movie and cinema vocabulary packs',
    freeLimitDaily: 0,
    proLimitDaily: undefined,
    premiumLimitDaily: undefined,
  },
  {
    featureType: FeatureType.DRAMA_PACKS,
    minTier: SubscriptionTier.PRO,
    creditCost: 200,
    description: 'Japanese drama vocabulary packs',
    freeLimitDaily: 0,
    proLimitDaily: undefined,
    premiumLimitDaily: undefined,
  },
  {
    featureType: FeatureType.COMIC_PACKS,
    minTier: SubscriptionTier.PRO,
    creditCost: 200,
    description: 'Manga and comic vocabulary packs',
    freeLimitDaily: 0,
    proLimitDaily: undefined,
    premiumLimitDaily: undefined,
  },
  {
    featureType: FeatureType.JLPT_PREP,
    minTier: SubscriptionTier.PREMIUM,
    creditCost: 500,
    description: 'JLPT preparation materials (N5-N1)',
    freeLimitDaily: 0,
    proLimitDaily: 0,
    premiumLimitDaily: undefined, // Unlimited for Premium
  },
  {
    featureType: FeatureType.JLPT_MOCK_EXAMS,
    minTier: SubscriptionTier.PREMIUM,
    creditCost: 500,
    description: 'Full JLPT mock examinations',
    freeLimitDaily: 0,
    proLimitDaily: 0,
    premiumLimitDaily: undefined,
  },
  {
    featureType: FeatureType.SRS_SYSTEM,
    minTier: SubscriptionTier.FREE,
    description: 'Spaced Repetition System for vocabulary review',
    freeLimitDaily: 50, // 50 reviews per day for free
    proLimitDaily: undefined, // Unlimited
    premiumLimitDaily: undefined,
  },
  {
    featureType: FeatureType.ADVANCED_ANALYSIS,
    minTier: SubscriptionTier.FREE,
    description: 'AI-powered sentence analysis with morphology',
    freeLimitDaily: 100, // 100 analyses per day for free
    proLimitDaily: undefined, // Unlimited
    premiumLimitDaily: undefined,
  },
];

async function seedFeatures() {
  console.log('Seeding feature access data...\n');

  let created = 0;
  let updated = 0;

  for (const feature of features) {
    try {
      const existing = await prisma.featureAccess.findUnique({
        where: { featureType: feature.featureType },
      });

      if (existing) {
        await prisma.featureAccess.update({
          where: { featureType: feature.featureType },
          data: {
            minTier: feature.minTier,
            creditCost: feature.creditCost || null,
            description: feature.description,
            freeLimitDaily: feature.freeLimitDaily || null,
            proLimitDaily: feature.proLimitDaily || null,
            premiumLimitDaily: feature.premiumLimitDaily || null,
          },
        });
        console.log(`Updated: ${feature.featureType}`);
        updated++;
      } else {
        await prisma.featureAccess.create({
          data: {
            featureType: feature.featureType,
            minTier: feature.minTier,
            creditCost: feature.creditCost || null,
            description: feature.description,
            freeLimitDaily: feature.freeLimitDaily || null,
            proLimitDaily: feature.proLimitDaily || null,
            premiumLimitDaily: feature.premiumLimitDaily || null,
          },
        });
        console.log(`Created: ${feature.featureType}`);
        created++;
      }
    } catch (error) {
      console.error(`Error seeding ${feature.featureType}:`, error);
    }
  }

  console.log(`\n=== Seeding Complete ===`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Total features: ${features.length}`);
}

async function main() {
  try {
    await seedFeatures();
    console.log('\n✅ Feature access data seeded successfully!');
  } catch (error) {
    console.error('Fatal error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
