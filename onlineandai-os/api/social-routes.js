import { Router } from "express";
import {
  sendText, sendBookingConfirmation, sendSunriseReminder, sendUpsellOffer,
} from "../integrations/whatsapp.js";
import {
  createPagePost, getPagePosts, getCampaigns, getAdInsights,
} from "../integrations/facebook.js";
import { getCampaigns as getTTCampaigns, getCampaignMetrics } from "../integrations/tiktok.js";
import { listReviews, replyToReview, createPost as gbpCreatePost } from "../integrations/gbp.js";
import { aiRouter } from "../ai-core/router.js";

export const socialRouter = Router();

// WhatsApp
socialRouter.post("/whatsapp/send", async (req, res) => {
  try {
    const { to, text } = req.body;
    res.json(await sendText(to, text));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/whatsapp/booking-confirm", async (req, res) => {
  try {
    const { to, ...data } = req.body;
    res.json(await sendBookingConfirmation(to, data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/whatsapp/sunrise-reminder", async (req, res) => {
  try {
    const { to, ...data } = req.body;
    res.json(await sendSunriseReminder(to, data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/whatsapp/upsell", async (req, res) => {
  try {
    const { to, ...data } = req.body;
    res.json(await sendUpsellOffer(to, data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.get("/whatsapp/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.status(403).json({ error: "Verification failed" });
});

socialRouter.post("/whatsapp/webhook", (req, res) => {
  const entry = req.body?.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];
  if (message) console.log("WhatsApp message:", message.from, message.text?.body);
  res.json({ received: true });
});

// Facebook
socialRouter.post("/facebook/post", async (req, res) => {
  try {
    const { message, link } = req.body;
    res.json(await createPagePost(message, link));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.get("/facebook/posts", async (req, res) => {
  try {
    res.json(await getPagePosts(+(req.query.limit || 10)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.get("/facebook/campaigns", async (req, res) => {
  try {
    res.json(await getCampaigns(req.query.adAccountId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.get("/facebook/insights/:campaignId", async (req, res) => {
  try {
    res.json(await getAdInsights(req.params.campaignId, { datePreset: req.query.datePreset }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/facebook/ad-copy", async (req, res) => {
  try {
    const { productName, audience, platform = "Facebook" } = req.body;
    const result = await aiRouter({ type: "social_ad", payload: { productName, audience, platform } });
    res.json({ copy: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TikTok
socialRouter.get("/tiktok/campaigns", async (req, res) => {
  try {
    res.json(await getTTCampaigns());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/tiktok/metrics", async (req, res) => {
  try {
    const { campaignIds, startDate, endDate } = req.body;
    res.json(await getCampaignMetrics(campaignIds, { startDate, endDate }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GBP
socialRouter.get("/gbp/reviews/:accountId/:locationId", async (req, res) => {
  try {
    const { accountId, locationId } = req.params;
    res.json(await listReviews(accountId, locationId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/gbp/reviews/:accountId/:locationId/:reviewId/reply", async (req, res) => {
  try {
    const { accountId, locationId, reviewId } = req.params;
    const { reply } = req.body;
    res.json(await replyToReview(accountId, locationId, reviewId, reply));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/gbp/reviews/:accountId/:locationId/:reviewId/ai-reply", async (req, res) => {
  try {
    const { review, tone, language } = req.body;
    const reply = await aiRouter({ type: "review_reply", payload: { review, tone, language } });
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

socialRouter.post("/gbp/posts/:accountId/:locationId", async (req, res) => {
  try {
    const { accountId, locationId } = req.params;
    res.json(await gbpCreatePost(accountId, locationId, req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
