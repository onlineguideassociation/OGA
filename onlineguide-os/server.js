import "dotenv/config";
import express from "express";
import { apiRouter } from "./api/routes.js";
import { healthcheckDatabase } from "./database.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.json({
    product: "OnlineGuide.io",
    system: "AI Tourism Operating System",
    region: "Cambodia (Siem Reap, Phnom Penh, Angkor Wat)"
  });
});

app.get("/health/database", async (req, res) => {
  try {
    const dbStatus = await healthcheckDatabase();
    res.json({ ok: true, db: dbStatus });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`OnlineGuide OS API running on port ${port}`);
});
