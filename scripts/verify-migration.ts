import { connectDB } from '../src/config/database.js';
import { User as MongoUser } from '../src/models/User.js';
import { prisma } from '../src/config/prisma.js';

/**
 * Verify data integrity after migration
 * Run with: npx tsx scripts/verify-migration.ts
 */

interface VerificationResult {
  passed: boolean;
  mongoCount: number;
  postgresCount: number;
  missingUsers: string[];
  mismatchedUsers: string[];
}

async function verifyUserMigration(): Promise<VerificationResult> {
  const result: VerificationResult = {
    passed: true,
    mongoCount: 0,
    postgresCount: 0,
    missingUsers: [],
    mismatchedUsers: [],
  };

  try {
    // Count users in both databases
    result.mongoCount = await MongoUser.countDocuments();
    result.postgresCount = await prisma.user.count();

    console.log(`MongoDB users: ${result.mongoCount}`);
    console.log(`PostgreSQL users: ${result.postgresCount}`);

    // Get all MongoDB users
    const mongoUsers = await MongoUser.find().sort({ email: 1 });

    for (const mongoUser of mongoUsers) {
      // Check if user exists in PostgreSQL
      const pgUser = await prisma.user.findUnique({
        where: { email: mongoUser.email },
      });

      if (!pgUser) {
        result.missingUsers.push(mongoUser.email);
        result.passed = false;
        continue;
      }

      // Verify critical fields match
      const emailMatch = pgUser.email === mongoUser.email;
      const usernameMatch = pgUser.username === mongoUser.name;

      if (!emailMatch || !usernameMatch) {
        result.mismatchedUsers.push(mongoUser.email);
        result.passed = false;
      }
    }

    return result;
  } catch (error) {
    console.error('Verification failed:', error);
    throw error;
  }
}

async function verifyIndividualUser(email: string) {
  console.log(`\nVerifying user: ${email}`);

  const mongoUser = await MongoUser.findOne({ email });
  const pgUser = await prisma.user.findUnique({ where: { email } });

  if (!mongoUser) {
    console.log('❌ User not found in MongoDB');
    return;
  }

  if (!pgUser) {
    console.log('❌ User not found in PostgreSQL');
    return;
  }

  console.log('\nMongoDB:');
  console.log(`  Email: ${mongoUser.email}`);
  console.log(`  Name: ${mongoUser.name}`);
  console.log(`  Provider: ${mongoUser.provider}`);
  console.log(`  Created: ${mongoUser.createdAt}`);

  console.log('\nPostgreSQL:');
  console.log(`  Email: ${pgUser.email}`);
  console.log(`  Username: ${pgUser.username}`);
  console.log(`  Provider: ${pgUser.provider}`);
  console.log(`  Created: ${pgUser.createdAt}`);
  console.log(`  Tier: ${pgUser.subscriptionTier}`);
  console.log(`  Credits: ${pgUser.credits}`);

  console.log('\n✅ User found in both databases');
}

async function main() {
  console.log('Starting migration verification...\n');

  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB\n');

    // Check if specific user email provided
    const userEmail = process.argv[2];
    if (userEmail) {
      await verifyIndividualUser(userEmail);
      process.exit(0);
    }

    // Run full verification
    const result = await verifyUserMigration();

    console.log('\n=== Verification Results ===');
    console.log(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`MongoDB count: ${result.mongoCount}`);
    console.log(`PostgreSQL count: ${result.postgresCount}`);

    if (result.missingUsers.length > 0) {
      console.log(`\n❌ Missing users (${result.missingUsers.length}):`);
      result.missingUsers.forEach((email) => console.log(`  - ${email}`));
    }

    if (result.mismatchedUsers.length > 0) {
      console.log(`\n⚠️  Mismatched users (${result.mismatchedUsers.length}):`);
      result.mismatchedUsers.forEach((email) => console.log(`  - ${email}`));
    }

    if (result.passed) {
      console.log('\n✅ All users migrated successfully!');
    } else {
      console.log('\n❌ Verification failed. Check errors above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error during verification:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
