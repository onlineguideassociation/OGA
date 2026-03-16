import { Router } from "express";
import { aiRouter } from "../ai-core/router.js";
import { 
  findToursByInterest, 
  getAllGuides, 
  createBooking,
  getGuideById,
  getToursByGuideId
} from "../database.js";

export const apiRouter = Router();

apiRouter.get("/health", async (req, res) => {
  res.json({ ok: true, service: "onlineandai-os" });
});

apiRouter.post("/ai/run", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task?.type || !task?.payload) {
      return res.status(400).json({ error: "task.type and task.payload are required" });
    }

    const result = await aiRouter(task);
    res.json({ taskType: task.type, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/tours/search", async (req, res) => {
  try {
    const { interest } = req.query;
    if (!interest) {
      return res.status(400).json({ error: "Interest parameter is required" });
    }
    const tours = await findToursByInterest(interest);
    res.json({ tours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/guides", async (req, res) => {
  try {
    const guides = await getAllGuides();
    res.json({ guides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/bookings", async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/guides/:id", async (req, res) => {
  try {
    const guide = await getGuideById(req.params.id);
    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }
    const tours = await getToursByGuideId(req.params.id);
    res.json({ guide, tours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
