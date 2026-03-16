
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Seeds the database with initial guides and tours data.
 */
async function seedDatabase() {
  // Check if guides table is empty
  const guidesCount = await pool.query("SELECT COUNT(*) FROM guides");
  if (parseInt(guidesCount.rows[0].count, 10) === 0) {
    const guides = [
      { name: 'Sokun', location: 'Siem Reap', specialties: ['temple history', 'photography'], bio: 'An experienced guide with a passion for Khmer history and photography.' },
      { name: 'Lina', location: 'Phnom Penh', specialties: ['food tours', 'city life'], bio: 'A foodie who loves showing visitors the best culinary spots in the capital.' },
      { name: 'Chen', location: 'Siem Reap', specialties: ['adventure travel', 'jungle treks'], bio: 'Loves exploring the hidden temples and jungles around Angkor.' },
      { name: 'Vannak', location: 'Siem Reap', specialties: ['cultural immersion', 'local markets'], bio: 'Connects travelers with local artisans and community projects.' }
    ];

    for (const guide of guides) {
      await pool.query(
        "INSERT INTO guides (name, location, specialties, bio) VALUES ($1, $2, $3, $4)",
        [guide.name, guide.location, guide.specialties, guide.bio]
      );
    }
    console.log("Table 'guides' seeded.");
  }

  // Check if tours table is empty
  const toursCount = await pool.query("SELECT COUNT(*) FROM tours");
  if (parseInt(toursCount.rows[0].count, 10) === 0) {
    const tours = [
      { name: 'Angkor Wat Sunrise Discovery', location: 'Siem Reap', description: 'Witness the breathtaking sunrise over Angkor Wat and explore the main temple complex.', features: ['sunrise', 'temple', 'photography', 'history'], price: 150.00, guide_id: 1 },
      { name: 'Siem Reap Street Food Safari', location: 'Siem Reap', description: 'A guided tour through the best street food stalls and local restaurants in Siem Reap.', features: ['food', 'local culture', 'nightlife'], price: 50.00, guide_id: 2 },
      { name: 'Jungle Temple Adventure: Beng Mealea & Koh Ker', location: 'Siem Reap', description: 'Explore the unrestored, jungle-enveloped temples of Beng Mealea and the remote pyramid of Koh Ker.', features: ['adventure', 'temple', 'trekking', 'off-the-beaten-path'], price: 120.00, guide_id: 3 },
      { name: 'Floating Village & Tonle Sap Lake', location: 'Siem Reap', description: 'Visit the unique floating villages on the Tonle Sap lake and learn about the local way of life.', features: ['local culture', 'boat tour', 'nature'], price: 75.00, guide_id: 4 },
      { name: 'Phnom Penh Historical Crossroads', location: 'Phnom Penh', description: 'Discover the history of Cambodia with visits to the Royal Palace, Silver Pagoda, and Tuol Sleng Museum.', features: ['history', 'city tour', 'museum'], price: 90.00, guide_id: 2 }
    ];

    for (const tour of tours) {
      await pool.query(
        "INSERT INTO tours (name, location, description, features, price, guide_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [tour.name, tour.location, tour.description, tour.features, tour.price, tour.guide_id]
      );
    }
    console.log("Table 'tours' seeded.");
  }
}


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

  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      tour_id INTEGER REFERENCES tours(id) NOT NULL,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      booking_date DATE NOT NULL,
      status VARCHAR(50) DEFAULT 'confirmed',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createGuidesTable);
    console.log("Table 'guides' is ready.");
    await pool.query(createToursTable);
    console.log("Table 'tours' is ready.");
    await pool.query(createBookingsTable);
    console.log("Table 'bookings' is ready.");
    await seedDatabase(); // Seed the database with initial data
    return { status: "ok", message: "Schema initialized and seeded successfully." };
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

/**
 * Retrieves all guides from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of guides.
 */
export async function getAllGuides() {
  try {
    const { rows } = await pool.query("SELECT id, name, location, specialties, bio FROM guides ORDER BY name");
    return rows;
  } catch (error) {
    console.error("Error getting all guides:", error);
    throw new Error("Failed to query guides from database.");
  }
}

/**
 * Creates a new booking in the database.
 * @param {object} bookingData - The booking data.
 * @returns {Promise<object>} A promise that resolves to the newly created booking.
 */
export async function createBooking(bookingData) {
  const { tour_id, customer_name, customer_email, booking_date } = bookingData;
  try {
    const { rows } = await pool.query(
      "INSERT INTO bookings (tour_id, customer_name, customer_email, booking_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [tour_id, customer_name, customer_email, booking_date]
    );
    return rows[0];
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking in database.");
  }
}

/**
 * Retrieves a single guide by their ID.
 * @param {number} id - The ID of the guide.
 * @returns {Promise<object>} A promise that resolves to the guide object.
 */
export async function getGuideById(id) {
  try {
    const { rows } = await pool.query("SELECT * FROM guides WHERE id = $1", [id]);
    return rows[0];
  } catch (error) {
    console.error(`Error getting guide with ID ${id}:`, error);
    throw new Error("Failed to query guide from database.");
  }
}

/**
 * Retrieves all tours by a specific guide.
 * @param {number} guideId - The ID of the guide.
 * @returns {Promise<Array>} A promise that resolves to an array of tours.
 */
export async function getToursByGuideId(guideId) {
  try {
    const { rows } = await pool.query("SELECT * FROM tours WHERE guide_id = $1 ORDER BY name", [guideId]);
    return rows;
  } catch (error) {
    console.error(`Error getting tours for guide with ID ${guideId}:`, error);
    throw new Error("Failed to query tours from database.");
  }
}
