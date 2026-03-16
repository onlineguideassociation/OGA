import "dotenv/config";
import express from "express";
import { apiRouter } from "./api/routes.js";
import { healthcheckDatabase, initializeSchema } from "./database.js";

const app = express();
const port = process.env.PORT || 3000;

// Initialize database schema on startup
initializeSchema().catch(err => {
  console.error("Failed to initialize database schema on startup:", err);
  process.exit(1); // Exit if DB initialization fails
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use("/api", apiRouter);

app.get("/health/database", async (req, res) => {
  try {
    const dbStatus = await healthcheckDatabase();
    res.json({ ok: true, db: dbStatus });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`OnlineAndAi OS API running on port ${port}`);
});
