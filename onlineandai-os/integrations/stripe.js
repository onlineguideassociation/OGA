import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function createPaymentIntent({ amount, currency = "usd", metadata = {} }) {
  return stripe.paymentIntents.create({ amount, currency, metadata });
}

export async function createCheckoutSession({
  lineItems,
  successUrl,
  cancelUrl,
  metadata = {},
  mode = "payment",
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
}

export async function createTourCheckout({ tourName, price, currency = "usd", bookingRef, successUrl, cancelUrl }) {
  return createCheckoutSession({
    lineItems: [
      {
        price_data: {
          currency,
          product_data: { name: tourName },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ],
    successUrl,
    cancelUrl,
    metadata: { booking_ref: bookingRef, tour: tourName },
  });
}

export async function retrieveSession(sessionId) {
  return stripe.checkout.sessions.retrieve(sessionId, { expand: ["payment_intent"] });
}

export function constructWebhookEvent(payload, sig) {
  return stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
}
