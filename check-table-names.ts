import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com')
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
});

async function checkTableNames() {
  try {
    // Check exact table name for Course
    const result = await pool.query(`
      SELECT table_name, table_schema
      FROM information_schema.tables
      WHERE table_name ILIKE 'course'
      ORDER BY table_name;
    `);

    console.log('Course table(s) found:');
    result.rows.forEach(row => {
      console.log(`  Schema: ${row.table_schema}, Table: "${row.table_name}"`);
    });

    // Try querying the Course table
    try {
      const countResult = await pool.query('SELECT COUNT(*) FROM "Course"');
      console.log(`\n✅ Query with "Course" succeeded: ${countResult.rows[0].count} rows`);
    } catch (error: any) {
      console.log(`\n❌ Query with "Course" failed: ${error.message}`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

checkTableNames();
