#!/usr/bin/env tsx

import { prisma } from '../src/config/prisma.js';

async function testConnection() {
  try {
    console.log('Testing database connection...');

    // Test basic query
    const userCount = await prisma.user.count();
    console.log(`✓ Connected successfully! User count: ${userCount}`);

    // Test feature access seeding
    const featureCount = await prisma.featureAccess.count();
    console.log(`✓ Feature access records: ${featureCount}`);

    // List all features
    const features = await prisma.featureAccess.findMany({
      select: {
        featureType: true,
        minTier: true,
        creditCost: true,
      },
    });

    console.log('\n✓ Feature Access Configuration:');
    features.forEach(f => {
      const creditInfo = f.creditCost ? ` (or ${f.creditCost} credits)` : '';
      console.log(`  - ${f.featureType}: ${f.minTier}${creditInfo}`);
    });

    console.log('\n✓ Database is fully operational!');

  } catch (error) {
    console.error('✗ Database connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
