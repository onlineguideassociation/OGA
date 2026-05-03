import { Router } from "express";
import express from "express";
import {
  createPaymentIntent, createCheckoutSession, createTourCheckout,
  retrieveSession, constructWebhookEvent,
} from "../integrations/stripe.js";

export const paymentRouter = Router();

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
    const session = await retrieveSession(req.params.sessionId);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = constructWebhookEvent(req.body, sig);
    } catch (err) {
      return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Payment succeeded:", event.data.object.id);
        break;
      case "checkout.session.completed":
        console.log("Checkout completed:", event.data.object.id, event.data.object.metadata);
        break;
      case "payment_intent.payment_failed":
        console.log("Payment failed:", event.data.object.id);
        break;
      default:
        console.log("Stripe event:", event.type);
    }

    res.json({ received: true });
  }
);
