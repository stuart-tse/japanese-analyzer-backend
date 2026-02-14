/**
 * One-time migration script: populate `roles` array from legacy `role` field.
 *
 * Usage: npx tsx scripts/migrate-roles.ts
 *
 * - role="admin" → roles=["student", "admin"]
 * - role="user"  → roles=["student"]
 */

import { Pool } from "pg";
import "dotenv/config";

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Migrate admins: role='admin' → roles=["student","admin"]
    const adminResult = await pool.query(
      `UPDATE "User" SET roles = ARRAY['student','admin'] WHERE role = 'admin' AND (roles IS NULL OR array_length(roles, 1) IS NULL OR roles = ARRAY['student'])`,
    );
    console.log(
      `Updated ${adminResult.rowCount} admin users → ["student","admin"]`,
    );

    // Migrate regular users: role='user' → roles=["student"]
    const userResult = await pool.query(
      `UPDATE "User" SET roles = ARRAY['student'] WHERE role = 'user' AND (roles IS NULL OR array_length(roles, 1) IS NULL)`,
    );
    console.log(`Updated ${userResult.rowCount} regular users → ["student"]`);

    // Verify
    const counts = await pool.query(
      `SELECT roles, COUNT(*)::int as count FROM "User" GROUP BY roles ORDER BY count DESC`,
    );
    console.log("\nRoles distribution after migration:");
    for (const row of counts.rows) {
      console.log(`  ${JSON.stringify(row.roles)} → ${row.count} users`);
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
