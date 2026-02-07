import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com')
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
});

async function listTables() {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('Tables in database:');
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    console.log(`\nTotal: ${result.rows.length} tables`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

listTables();
