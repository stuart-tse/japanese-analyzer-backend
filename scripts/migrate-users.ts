import { connectDB } from '../src/config/database.js';
import { User as MongoUser } from '../src/models/User.js';
import { prisma } from '../src/config/prisma.js';
import { SubscriptionTier, AuthProvider } from '../src/generated/prisma/index.js';

/**
 * Migrate users from MongoDB to PostgreSQL
 * Run with: npx tsx scripts/migrate-users.ts
 */

interface MigrationStats {
  total: number;
  migrated: number;
  skipped: number;
  errors: number;
}

const providerMap: Record<string, AuthProvider> = {
  'credentials': AuthProvider.LOCAL,
  'google': AuthProvider.GOOGLE,
  'facebook': AuthProvider.FACEBOOK,
  'phone': AuthProvider.LOCAL, // Treat phone as LOCAL
};

async function migrateUsers(batchSize = 100): Promise<MigrationStats> {
  const stats: MigrationStats = {
    total: 0,
    migrated: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    // Get total user count
    stats.total = await MongoUser.countDocuments();
    console.log(`Found ${stats.total} users in MongoDB`);

    // Process users in batches
    let skip = 0;
    while (skip < stats.total) {
      const mongoUsers = await MongoUser.find()
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(batchSize);

      for (const mongoUser of mongoUsers) {
        try {
          // Check if user already exists in PostgreSQL
          const existingUser = await prisma.user.findUnique({
            where: { email: mongoUser.email },
          });

          if (existingUser) {
            console.log(`User ${mongoUser.email} already exists, skipping`);
            stats.skipped++;
            continue;
          }

          // Map MongoDB user to PostgreSQL format
          const provider = providerMap[mongoUser.provider] || AuthProvider.LOCAL;

          // Create user in PostgreSQL
          await prisma.user.create({
            data: {
              email: mongoUser.email,
              username: mongoUser.name,
              password: mongoUser.passwordHash || null,
              provider,
              providerId: mongoUser.providerId || null,
              subscriptionTier: SubscriptionTier.FREE,
              credits: 0,
              createdAt: mongoUser.createdAt,
              updatedAt: mongoUser.updatedAt,
              lastLoginAt: mongoUser.lastLoginAt,
            },
          });

          console.log(`Migrated user: ${mongoUser.email}`);
          stats.migrated++;
        } catch (error) {
          console.error(`Error migrating user ${mongoUser.email}:`, error);
          stats.errors++;
        }
      }

      skip += batchSize;
      console.log(`Progress: ${skip}/${stats.total} users processed`);
    }

    return stats;
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

async function main() {
  console.log('Starting user migration from MongoDB to PostgreSQL...\n');

  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Run migration
    const stats = await migrateUsers();

    console.log('\n=== Migration Complete ===');
    console.log(`Total users: ${stats.total}`);
    console.log(`Migrated: ${stats.migrated}`);
    console.log(`Skipped: ${stats.skipped}`);
    console.log(`Errors: ${stats.errors}`);
    console.log('========================\n');

    if (stats.errors > 0) {
      console.warn('⚠️  Some users failed to migrate. Check logs above.');
      process.exit(1);
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('Fatal error during migration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
