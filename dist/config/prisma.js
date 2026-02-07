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
});
// Create Prisma adapter
const adapter = new PrismaPg(pool);
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
//# sourceMappingURL=prisma.js.map