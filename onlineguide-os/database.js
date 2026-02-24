import pg from "pg";

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

export async function healthcheckDatabase() {
  const result = await db.query("SELECT NOW() AS now");
  return result.rows[0];
}
