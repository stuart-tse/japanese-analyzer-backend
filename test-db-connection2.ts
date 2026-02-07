// CRITICAL: Load .env BEFORE any imports
import dotenv from 'dotenv';
dotenv.config();

// Now import Prisma (pool will be created with correct DATABASE_URL)
import { prisma } from './src/config/prisma.js';
import { PaymentStatus, SubscriptionStatus } from './src/generated/prisma/index.js';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');

    // Test 1: Query existing data
    const courseCount = await prisma.course.count();
    const lessonCount = await prisma.lesson.count();
    const questionCount = await prisma.placementQuestion.count();

    console.log('\n✅ Existing data:');
    console.log(`  - Courses: ${courseCount}`);
    console.log(`  - Lessons: ${lessonCount}`);
    console.log(`  - Placement Questions: ${questionCount}`);

    // Test 2: Verify payment models exist
    const paymentCount = await prisma.payment.count();
    const subscriptionCount = await prisma.subscription.count();
    const creditTransactionCount = await prisma.creditTransaction.count();
    const analysisCount = await prisma.analysis.count();

    console.log('\n✅ Payment models:');
    console.log(`  - Payments: ${paymentCount}`);
    console.log(`  - Subscriptions: ${subscriptionCount}`);
    console.log(`  - Credit Transactions: ${creditTransactionCount}`);
    console.log(`  - Analyses: ${analysisCount}`);

    // Test 3: Verify enums are imported correctly
    console.log('\n✅ Enums imported successfully:');
    console.log(`  - PaymentStatus: ${Object.keys(PaymentStatus).join(', ')}`);
    console.log(`  - SubscriptionStatus: ${Object.keys(SubscriptionStatus).join(', ')}`);

    console.log('\n🎉 All database tests passed!');

  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
