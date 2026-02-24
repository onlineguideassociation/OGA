import { Router } from "express";
import { aiRouter } from "../ai-engine/router.js";

export const apiRouter = Router();

apiRouter.get("/health", async (req, res) => {
  res.json({ ok: true, service: "onlineguide-os" });
});

apiRouter.post("/ai/run", async (req, res) => {
  try {
    const { taskType, input } = req.body;
    if (!taskType || !input) {
      return res.status(400).json({ error: "taskType and input are required" });
    }

    const result = await aiRouter(taskType, input);
    res.json({ taskType, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
