import { Router } from "express";
import {
  getPosts, getPost, getPages, createPost, updatePost,
  getCategories, syncTourToWordPress, testConnection,
} from "../integrations/wordpress.js";

export const wordpressRouter = Router();

wordpressRouter.get("/status", async (req, res) => {
  try {
    const result = await testConnection();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.get("/posts", async (req, res) => {
  try {
    const { page = 1, perPage = 10, status = "publish" } = req.query;
    res.json(await getPosts({ page: +page, perPage: +perPage, status }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.get("/posts/:id", async (req, res) => {
  try {
    res.json(await getPost(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.post("/posts", async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.patch("/posts/:id", async (req, res) => {
  try {
    res.json(await updatePost(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.get("/pages", async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    res.json(await getPages({ page: +page, perPage: +perPage }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.get("/categories", async (req, res) => {
  try {
    res.json(await getCategories());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.post("/sync/tours", async (req, res) => {
  try {
    const result = await syncTourToWordPress(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wordpressRouter.post("/webhook", (req, res) => {
  const event = req.body;
  console.log("WordPress webhook:", event?.action, event?.post?.id);
  res.json({ received: true });
});
