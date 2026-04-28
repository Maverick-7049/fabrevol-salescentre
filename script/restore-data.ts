/**
 * One-time data restore script.
 * Reads migration/fabrevol_data_export.sql and imports all leads, products,
 * and suppliers into the connected Postgres database.
 *
 * Usage:
 *   DATABASE_URL="postgresql://..." npx tsx script/restore-data.ts
 *
 * Get DATABASE_URL from: Vercel → your project → Settings → Environment Variables
 */

import { readFileSync } from "fs";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("\n❌  DATABASE_URL is not set.");
  console.error(
    "    Usage: DATABASE_URL=\"postgresql://...\" npx tsx script/restore-data.ts"
  );
  console.error(
    "    Copy the value from Vercel → your project → Settings → Environment Variables\n"
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  console.log("\n✅  Connected to database");

  try {
    const sql = readFileSync("migration/fabrevol_data_export.sql", "utf-8");

    // ── 1. Run schema (CREATE TABLE IF NOT EXISTS) ──────────────────────────
    const createStatements = sql
      .split(/;\s*\n/)
      .map((s) => s.trim())
      .filter((s) => s.toUpperCase().startsWith("CREATE TABLE"));

    for (const stmt of createStatements) {
      await client.query(stmt);
    }
    console.log(`   Schema ensured (${createStatements.length} tables)`);

    // ── 2. Run INSERT statements, skipping duplicates by id ─────────────────
    const insertStatements = sql
      .split(/;\s*\n/)
      .map((s) => s.trim())
      .filter((s) => s.toUpperCase().startsWith("INSERT INTO"));

    let leads = 0,
      products = 0,
      suppliers = 0,
      skipped = 0;

    for (const stmt of insertStatements) {
      // Append ON CONFLICT so re-running is safe
      const safe = stmt + " ON CONFLICT (id) DO NOTHING";
      const result = await client.query(safe);
      const inserted = result.rowCount ?? 0;

      if (stmt.includes("INSERT INTO leads")) leads += inserted;
      else if (stmt.includes("INSERT INTO products")) products += inserted;
      else if (stmt.includes("INSERT INTO suppliers")) suppliers += inserted;

      if (inserted === 0) skipped++;
    }

    console.log(`   Inserted: ${leads} leads, ${products} products, ${suppliers} suppliers`);
    if (skipped > 0) console.log(`   Skipped (already existed): ${skipped} rows`);

    // ── 3. Reset sequences so new rows get correct auto-increment ids ────────
    await client.query(
      `SELECT setval('leads_id_seq',    COALESCE((SELECT MAX(id) FROM leads),    1));`
    );
    await client.query(
      `SELECT setval('products_id_seq', COALESCE((SELECT MAX(id) FROM products), 1));`
    );
    await client.query(
      `SELECT setval('suppliers_id_seq',COALESCE((SELECT MAX(id) FROM suppliers),1));`
    );
    console.log("   Sequences reset ✓");

    console.log("\n🎉  Restore complete! Refresh salescentre.fabrevol.com to see your data.\n");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("\n❌  Error:", err.message, "\n");
  process.exit(1);
});
