import { Router } from "express";
import { handleChat, aiRouter } from "../ai-core/router.js";
import { classifyIntent } from "../ai-core/intent-classifier.js";

export const chatRouter = Router();

chatRouter.post("/", async (req, res) => {
  try {
    const { message, context = {} } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });
    const result = await handleChat(message, context);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

chatRouter.post("/classify", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });
    const intent = await classifyIntent(message);
    res.json({ intent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

chatRouter.post("/brain/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { payload = {}, priority = "normal" } = req.body;
    const result = await aiRouter({ type, payload, priority });
    res.json({ type, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
