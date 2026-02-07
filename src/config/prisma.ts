import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Create PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://japanese_user:dev_password_2024@localhost:5432/japanese_analyzer',
  ssl: process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('rds.amazonaws.com')
    ? {
        rejectUnauthorized: false, // Required for AWS RDS
      }
    : undefined,
  max: 3,                        // Lambda: small pool (default is 10)
  idleTimeoutMillis: 60000,      // Close idle connections after 60s
  connectionTimeoutMillis: 10000, // Timeout after 10s
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Prevent multiple instances of Prisma Client in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  await pool.end();
});
