import { Router } from "express";
import express from "express";
import {
  createPaymentIntent, createCheckoutSession, createTourCheckout,
  retrieveSession, constructWebhookEvent,
} from "../integrations/stripe.js";
import {
  createABATourPayment, createABAPayment,
  verifyABACallback, queryABATransaction,
} from "../integrations/aba-pay.js";
import {
  createWingTourPayment, createWingQR,
  collectFromWingAccount, queryWingTransaction, verifyWingWebhook,
} from "../integrations/wing.js";
import {
  createBakongTourPayment, createBakongPayment,
  checkBakongTransaction, buildKHQR, verifyBakongWebhook,
} from "../integrations/bakong.js";

export const paymentRouter = Router();

// ─── Stripe ──────────────────────────────────────────────────────────────────

paymentRouter.post("/intent", async (req, res) => {
  try {
    const { amount, currency = "usd", metadata = {} } = req.body;
    if (!amount) return res.status(400).json({ error: "amount is required" });
    const intent = await createPaymentIntent({ amount, currency, metadata });
    res.json({ clientSecret: intent.client_secret, intentId: intent.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post("/checkout/tour", async (req, res) => {
  try {
    const { tourName, price, currency = "usd", bookingRef, successUrl, cancelUrl } = req.body;
    if (!tourName || !price || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: "tourName, price, successUrl, and cancelUrl are required" });
    }
    const session = await createTourCheckout({ tourName, price, currency, bookingRef, successUrl, cancelUrl });
    res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.get("/session/:sessionId", async (req, res) => {
  try {
    res.json(await retrieveSession(req.params.sessionId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = constructWebhookEvent(req.body, sig);
    } catch (err) {
      return res.status(400).json({ error: `Stripe signature failed: ${err.message}` });
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Stripe payment succeeded:", event.data.object.id);
        break;
      case "checkout.session.completed":
        console.log("Stripe checkout done:", event.data.object.id, event.data.object.metadata);
        break;
      default:
        console.log("Stripe event:", event.type);
    }
    res.json({ received: true });
  }
);

// ─── ABA PayWay ──────────────────────────────────────────────────────────────

paymentRouter.post("/aba/pay", async (req, res) => {
  try {
    const { amount, currency = "USD", description, returnUrl, cancelUrl, firstName, lastName, email, phone } = req.body;
    if (!amount || !returnUrl || !cancelUrl) {
      return res.status(400).json({ error: "amount, returnUrl, and cancelUrl are required" });
    }
    const result = await createABAPayment({ amount, currency, description, returnUrl, cancelUrl, firstName, lastName, email, phone });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post("/aba/tour", async (req, res) => {
  try {
    const { tourName, price, bookingRef, returnUrl, cancelUrl, guest = {} } = req.body;
    if (!tourName || !price || !returnUrl || !cancelUrl) {
      return res.status(400).json({ error: "tourName, price, returnUrl, and cancelUrl are required" });
    }
    res.json(await createABATourPayment({ tourName, price, bookingRef, returnUrl, cancelUrl, guest }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.get("/aba/status/:transactionId", async (req, res) => {
  try {
    res.json(await queryABATransaction(req.params.transactionId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ABA sends GET callback to return_url with hash param
paymentRouter.get("/aba/callback", (req, res) => {
  const params = req.query;
  const valid = verifyABACallback(params);
  console.log("ABA callback:", params.tran_id, params.status, valid ? "VALID" : "INVALID_HASH");
  // Redirect to your confirmation page
  const status = params.status === "0" ? "success" : "failed";
  res.redirect(`${process.env.FRONTEND_URL || "/"}/booking/${params.tran_id}?status=${status}`);
});

// ABA also sends POST callback for server-to-server confirmation
paymentRouter.post("/aba/webhook", (req, res) => {
  const valid = verifyABACallback(req.body);
  if (!valid) return res.status(400).json({ error: "Invalid ABA signature" });
  console.log("ABA webhook confirmed:", req.body.tran_id, req.body.status);
  res.json({ received: true });
});

// ─── Wing Pay ────────────────────────────────────────────────────────────────

paymentRouter.post("/wing/qr", async (req, res) => {
  try {
    const { amount, currency = "USD", orderId, description } = req.body;
    if (!amount) return res.status(400).json({ error: "amount is required" });
    res.json(await createWingQR({ amount, currency, orderId, description }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post("/wing/tour", async (req, res) => {
  try {
    const { tourName, price, bookingRef } = req.body;
    if (!tourName || !price) return res.status(400).json({ error: "tourName and price are required" });
    res.json(await createWingTourPayment({ tourName, price, bookingRef }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post("/wing/collect", async (req, res) => {
  try {
    const { customerPhone, amount, currency = "USD", orderId, description } = req.body;
    if (!customerPhone || !amount) return res.status(400).json({ error: "customerPhone and amount are required" });
    res.json(await collectFromWingAccount({ customerPhone, amount, currency, orderId, description }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.get("/wing/status/:transactionId", async (req, res) => {
  try {
    res.json(await queryWingTransaction(req.params.transactionId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post(
  "/wing/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["x-signature"] || "";
    if (!verifyWingWebhook(req.body, sig)) {
      return res.status(400).json({ error: "Invalid Wing signature" });
    }
    const event = JSON.parse(req.body.toString());
    console.log("Wing webhook:", event.transactionId, event.status);
    res.json({ received: true });
  }
);

// ─── Bakong / KHQR ───────────────────────────────────────────────────────────

paymentRouter.post("/bakong/qr", async (req, res) => {
  try {
    const { amount, currency = "USD", description, transactionId } = req.body;
    if (!amount) return res.status(400).json({ error: "amount is required" });
    res.json(await createBakongPayment({ amount, currency, description, transactionId }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post("/bakong/tour", async (req, res) => {
  try {
    const { tourName, price, bookingRef, currency = "USD" } = req.body;
    if (!tourName || !price) return res.status(400).json({ error: "tourName and price are required" });
    res.json(await createBakongTourPayment({ tourName, price, bookingRef, currency }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post("/bakong/khqr", (req, res) => {
  try {
    const { bakongAccountId, merchantName, merchantCity, amount, currency, transactionId, billNumber } = req.body;
    if (!bakongAccountId || !amount || !transactionId) {
      return res.status(400).json({ error: "bakongAccountId, amount, and transactionId are required" });
    }
    const qrString = buildKHQR({ bakongAccountId, merchantName, merchantCity, amount, currency, transactionId, billNumber });
    res.json({ qrString });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.get("/bakong/status/:transactionId", async (req, res) => {
  try {
    res.json(await checkBakongTransaction(req.params.transactionId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post(
  "/bakong/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["x-bakong-signature"] || "";
    if (!verifyBakongWebhook(req.body, sig)) {
      return res.status(400).json({ error: "Invalid Bakong signature" });
    }
    const event = JSON.parse(req.body.toString());
    console.log("Bakong webhook:", event.transactionId, event.status);
    res.json({ received: true });
  }
);

// ─── Unified tour payment endpoint ───────────────────────────────────────────
// Choose gateway: "stripe" | "aba" | "wing" | "bakong"

paymentRouter.post("/tour", async (req, res) => {
  try {
    const {
      gateway = "aba",
      tourName, price, bookingRef, currency = "USD",
      returnUrl, cancelUrl, guest = {},
    } = req.body;

    if (!tourName || !price) return res.status(400).json({ error: "tourName and price are required" });

    let result;
    switch (gateway) {
      case "stripe":
        result = await createTourCheckout({ tourName, price, currency, bookingRef, successUrl: returnUrl, cancelUrl });
        break;
      case "aba":
        result = await createABATourPayment({ tourName, price, bookingRef, returnUrl, cancelUrl, guest });
        break;
      case "wing":
        result = await createWingTourPayment({ tourName, price, bookingRef });
        break;
      case "bakong":
        result = await createBakongTourPayment({ tourName, price, bookingRef, currency });
        break;
      default:
        return res.status(400).json({ error: `Unknown gateway: ${gateway}. Use stripe, aba, wing, or bakong.` });
    }

    res.json({ gateway, ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
