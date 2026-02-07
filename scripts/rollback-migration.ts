import { prisma } from '../src/config/prisma.js';
import readline from 'readline';

/**
 * Rollback migration - DANGER: This will delete all PostgreSQL data
 * Run with: npx tsx scripts/rollback-migration.ts
 */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function rollbackMigration() {
  console.log('⚠️  WARNING: This will delete ALL data from PostgreSQL!');
  console.log('This action cannot be undone.');
  console.log('MongoDB data will remain intact.\n');

  const confirmation = await askQuestion(
    'Type "DELETE ALL DATA" to proceed: '
  );

  if (confirmation !== 'DELETE ALL DATA') {
    console.log('\nRollback cancelled.');
    return false;
  }

  console.log('\nStarting rollback...\n');

  try {
    // Delete in reverse order of dependencies
    console.log('Deleting analyses...');
    const analysesDeleted = await prisma.analysis.deleteMany();
    console.log(`  Deleted ${analysesDeleted.count} analyses`);

    console.log('Deleting learning stats...');
    const statsDeleted = await prisma.learningStats.deleteMany();
    console.log(`  Deleted ${statsDeleted.count} learning stats`);

    console.log('Deleting vocabulary...');
    const vocabDeleted = await prisma.vocabulary.deleteMany();
    console.log(`  Deleted ${vocabDeleted.count} vocabulary entries`);

    console.log('Deleting user pack progress...');
    const progressDeleted = await prisma.userPackProgress.deleteMany();
    console.log(`  Deleted ${progressDeleted.count} progress records`);

    console.log('Deleting words...');
    const wordsDeleted = await prisma.word.deleteMany();
    console.log(`  Deleted ${wordsDeleted.count} words`);

    console.log('Deleting word packs...');
    const packsDeleted = await prisma.wordPack.deleteMany();
    console.log(`  Deleted ${packsDeleted.count} word packs`);

    console.log('Deleting feature access...');
    const featuresDeleted = await prisma.featureAccess.deleteMany();
    console.log(`  Deleted ${featuresDeleted.count} feature access records`);

    console.log('Deleting credit transactions...');
    const creditsDeleted = await prisma.creditTransaction.deleteMany();
    console.log(`  Deleted ${creditsDeleted.count} credit transactions`);

    console.log('Deleting payments...');
    const paymentsDeleted = await prisma.payment.deleteMany();
    console.log(`  Deleted ${paymentsDeleted.count} payments`);

    console.log('Deleting subscriptions...');
    const subsDeleted = await prisma.subscription.deleteMany();
    console.log(`  Deleted ${subsDeleted.count} subscriptions`);

    console.log('Deleting users...');
    const usersDeleted = await prisma.user.deleteMany();
    console.log(`  Deleted ${usersDeleted.count} users`);

    return true;
  } catch (error) {
    console.error('\nError during rollback:', error);
    throw error;
  }
}

async function main() {
  try {
    const success = await rollbackMigration();

    if (success) {
      console.log('\n✅ Rollback completed successfully!');
      console.log('All PostgreSQL data has been deleted.');
      console.log('MongoDB data remains intact.');
    }
  } catch (error) {
    console.error('Fatal error during rollback:', error);
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
