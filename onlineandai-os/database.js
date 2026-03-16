
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Initializes the database schema, creating tables for guides and tours.
 * This function is idempotent and can be safely run multiple times.
 */
export async function initializeSchema() {
  const createGuidesTable = `
    CREATE TABLE IF NOT EXISTS guides (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      specialties TEXT[],
      bio TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createToursTable = `
    CREATE TABLE IF NOT EXISTS tours (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      description TEXT,
      features TEXT[],
      price NUMERIC(10, 2),
      guide_id INTEGER REFERENCES guides(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createGuidesTable);
    console.log("Table 'guides' is ready.");
    await pool.query(createToursTable);
    console.log("Table 'tours' is ready.");
    return { status: "ok", message: "Schema initialized successfully." };
  } catch (error) {
    console.error("Error initializing schema:", error);
    throw new Error("Failed to initialize database schema.");
  }
}

/**
 * Performs a health check on the database.
 */
export async function healthcheckDatabase() {
  try {
    const result = await pool.query("SELECT NOW()");
    return {
      status: "ok",
      timestamp: result.rows[0].now,
    };
  } catch (error) {
    console.error("Database healthcheck failed:", error);
    throw new Error("Database connection error");
  }
}

/**
 * Finds tours based on a specific interest or keyword.
 * @param {string} interest - The interest or keyword to search for.
 * @returns {Promise<Array>} A promise that resolves to an array of tours.
 */
export async function findToursByInterest(interest) {
  try {
    const query = `
      SELECT t.id, t.name, t.location, t.description, t.price, g.name as guide_name
      FROM tours t
      LEFT JOIN guides g ON t.guide_id = g.id
      WHERE $1 = ANY(t.features) OR t.description ILIKE '%' || $1 || '%' OR t.name ILIKE '%' || $1 || '%';
    `;
    const { rows } = await pool.query(query, [interest]);
    return rows;
  } catch (error) {
    console.error(`Error finding tours for interest "${interest}":`, error);
    throw new Error("Failed to query tours from database.");
  }
}
