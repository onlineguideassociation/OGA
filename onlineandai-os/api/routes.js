import { Router } from "express";
import { aiRouter } from "../ai-core/router.js";
import {
  findToursByInterest,
  getAllGuides,
  createBooking,
  getGuideById,
  getToursByGuideId,
} from "../database.js";
import { wordpressRouter } from "./wordpress-routes.js";
import { socialRouter } from "./social-routes.js";
import { paymentRouter } from "./payment-routes.js";
import { chatRouter } from "./chat-routes.js";
import { wooRouter } from "./woocommerce-routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (req, res) => {
  res.json({ ok: true, service: "onlineandai-os", version: "0.3.0" });
});

apiRouter.use("/wordpress", wordpressRouter);
apiRouter.use("/social", socialRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/chat", chatRouter);
apiRouter.use("/woo", wooRouter);

apiRouter.post("/ai/run", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task?.type || !task?.payload) {
      return res.status(400).json({ error: "task.type and task.payload are required" });
    }
    const result = await aiRouter(task);
    res.json({ taskType: task.type, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/tours/search", async (req, res) => {
  try {
    const { interest } = req.query;
    if (!interest) return res.status(400).json({ error: "Interest parameter is required" });
    const tours = await findToursByInterest(interest);
    res.json({ tours });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/guides", async (req, res) => {
  try {
    res.json({ guides: await getAllGuides() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post("/bookings", async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/guides/:id", async (req, res) => {
  try {
    const guide = await getGuideById(req.params.id);
    if (!guide) return res.status(404).json({ error: "Guide not found" });
    const tours = await getToursByGuideId(req.params.id);
    res.json({ guide, tours });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
