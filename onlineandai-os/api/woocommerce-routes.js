/**
 * WooCommerce + AI Routes
 * Mount at: /api/woo
 *
 * AI-powered endpoints:
 *   POST /woo/ai/product-from-tour  — Claude generates a WC product from tour brief
 *   POST /woo/ai/description        — AI writes SEO product description
 *   POST /woo/ai/coupon-code        — AI names a contextual coupon
 *   GET  /woo/ai/order-insights     — AI summarizes recent order trends
 *   POST /woo/ai/upsell-for-order   — AI suggests upsells for a completed order
 */
import express, { Router } from "express";
import {
  listProducts, getProduct, createProduct, updateProduct, deleteProduct,
  listProductCategories, createProductCategory,
  listOrders, getOrder, updateOrderStatus, addOrderNote,
  listCustomers, getCustomer, getCustomerOrders,
  createCoupon, listCoupons,
  getSalesReport, getTopSellers,
  syncTourToWooCommerce, verifyWCWebhook,
} from "../integrations/woocommerce.js";
import { callClaudeSonnet } from "../ai-core/providers/anthropic.js";

export const wooRouter = Router();

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

wooRouter.get("/products", async (req, res) => {
  try {
    const { page, per_page, category, status, search } = req.query;
    res.json(await listProducts({ page, perPage: per_page, category, status, search }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.get("/products/:id", async (req, res) => {
  try {
    res.json(await getProduct(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.post("/products", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.put("/products/:id", async (req, res) => {
  try {
    res.json(await updateProduct(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.delete("/products/:id", async (req, res) => {
  try {
    res.json(await deleteProduct(req.params.id, req.query.force === "true"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.get("/products/categories", async (req, res) => {
  try {
    res.json(await listProductCategories());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.post("/products/categories", async (req, res) => {
  try {
    res.status(201).json(await createProductCategory(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sync a tour bundle to WooCommerce
wooRouter.post("/products/sync/tour", async (req, res) => {
  try {
    const { tourName, description, shortDescription, priceUsd, durationDays,
      guideIncluded, driverIncluded, imageUrls, categoryIds, bookingRef } = req.body;
    if (!tourName || !priceUsd) {
      return res.status(400).json({ error: "tourName and priceUsd are required" });
    }
    res.status(201).json(await syncTourToWooCommerce({
      tourName, description, shortDescription, priceUsd, durationDays,
      guideIncluded, driverIncluded, imageUrls, categoryIds, bookingRef,
    }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── ORDERS ──────────────────────────────────────────────────────────────────

wooRouter.get("/orders", async (req, res) => {
  try {
    const { page, per_page, status, customer, search } = req.query;
    res.json(await listOrders({ page, perPage: per_page, status, customerId: customer, search }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.get("/orders/:id", async (req, res) => {
  try {
    res.json(await getOrder(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.patch("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "status is required" });
    res.json(await updateOrderStatus(req.params.id, status));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.post("/orders/:id/notes", async (req, res) => {
  try {
    const { note, customer_note } = req.body;
    if (!note) return res.status(400).json({ error: "note is required" });
    res.status(201).json(await addOrderNote(req.params.id, note, customer_note));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────

wooRouter.get("/customers", async (req, res) => {
  try {
    const { page, per_page, search } = req.query;
    res.json(await listCustomers({ page, perPage: per_page, search }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.get("/customers/:id", async (req, res) => {
  try {
    res.json(await getCustomer(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.get("/customers/:id/orders", async (req, res) => {
  try {
    res.json(await getCustomerOrders(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── COUPONS ─────────────────────────────────────────────────────────────────

wooRouter.get("/coupons", async (req, res) => {
  try {
    res.json(await listCoupons());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.post("/coupons", async (req, res) => {
  try {
    res.status(201).json(await createCoupon(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── REPORTS ─────────────────────────────────────────────────────────────────

wooRouter.get("/reports/sales", async (req, res) => {
  try {
    const { period, date_min, date_max } = req.query;
    res.json(await getSalesReport({ period, dateMin: date_min, dateMax: date_max }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

wooRouter.get("/reports/top-sellers", async (req, res) => {
  try {
    const { period, per_page } = req.query;
    res.json(await getTopSellers({ period, perPage: per_page }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── AI-POWERED ENDPOINTS ─────────────────────────────────────────────────────

/**
 * POST /woo/ai/product-from-tour
 * Body: { tourBrief, priceUsd, durationDays, guideIncluded, driverIncluded, categoryIds[] }
 * Claude writes the product name, description, short_description, then creates the WC product.
 */
wooRouter.post("/ai/product-from-tour", async (req, res) => {
  try {
    const { tourBrief, priceUsd, durationDays = 1, guideIncluded = false,
      driverIncluded = false, categoryIds = [], imageUrls = [] } = req.body;
    if (!tourBrief || !priceUsd) {
      return res.status(400).json({ error: "tourBrief and priceUsd are required" });
    }

    const prompt = `You are a tourism copywriter for OnlineGuide.io, Cambodia's premier Angkor Wat platform.

Write a WooCommerce product listing for this tour brief:
"""${tourBrief}"""

Price: $${priceUsd} USD | Duration: ${durationDays} day(s) | Guide included: ${guideIncluded} | Driver/vehicle: ${driverIncluded}

Respond ONLY with valid JSON (no markdown), matching this shape exactly:
{
  "name": "...",
  "shortDescription": "2-3 sentence hook under 150 chars",
  "description": "HTML paragraph(s), 150-300 words, SEO-rich, include keywords: Angkor Wat, Siem Reap, cultural tour, Cambodia",
  "tags": ["...", "..."]
}`;

    const content = await callClaudeSonnet(prompt, 600);
    let parsed;
    try {
      parsed = JSON.parse(content.trim());
    } catch {
      return res.status(500).json({ error: "AI returned invalid JSON", raw: content });
    }

    const product = await syncTourToWooCommerce({
      tourName: parsed.name,
      description: parsed.description,
      shortDescription: parsed.shortDescription,
      priceUsd,
      durationDays,
      guideIncluded,
      driverIncluded,
      imageUrls,
      categoryIds,
    });

    res.status(201).json({ ai: parsed, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /woo/ai/description
 * Body: { productName, keyFeatures[], priceUsd, tone? }
 * Returns SEO-optimized HTML description for any WC product.
 */
wooRouter.post("/ai/description", async (req, res) => {
  try {
    const { productName, keyFeatures = [], priceUsd, tone = "inspiring" } = req.body;
    if (!productName) return res.status(400).json({ error: "productName is required" });

    const prompt = `Write an SEO-optimized WooCommerce product description for:
Product: ${productName}
Price: $${priceUsd || "?"} USD
Key features: ${keyFeatures.join(", ") || "none provided"}
Tone: ${tone}

Output only HTML (use <p> and <ul>/<li> tags), 150-250 words. Include keywords: Cambodia tourism, Angkor, Siem Reap.`;

    const description = await callClaudeSonnet(prompt, 400);
    res.json({ description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /woo/ai/coupon-code
 * Body: { context, discountPercent, occasion }
 * Returns a contextual coupon code and creates it in WooCommerce.
 */
wooRouter.post("/ai/coupon-code", async (req, res) => {
  try {
    const { context = "Cambodia tour", discountPercent = 10, occasion = "repeat guest",
      usageLimit = 50, expiryDate } = req.body;

    const prompt = `Generate a short, memorable coupon code (6-10 chars, uppercase, no spaces) for:
Context: ${context}
Occasion: ${occasion}
Discount: ${discountPercent}%

Respond ONLY with JSON: { "code": "...", "description": "one line" }`;

    const content = await callClaudeSonnet(prompt, 80);
    let parsed;
    try {
      parsed = JSON.parse(content.trim());
    } catch {
      return res.status(500).json({ error: "AI returned invalid JSON", raw: content });
    }

    const coupon = await createCoupon({
      code: parsed.code,
      discountType: "percent",
      amount: discountPercent,
      description: parsed.description,
      usageLimit,
      expiryDate,
    });

    res.status(201).json({ ai: parsed, coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /woo/ai/order-insights
 * Pulls last 30 days sales report + top sellers, runs Claude analysis.
 */
wooRouter.get("/ai/order-insights", async (req, res) => {
  try {
    const [salesReport, topSellers] = await Promise.all([
      getSalesReport({ period: "month" }),
      getTopSellers({ period: "month", perPage: 5 }),
    ]);

    const prompt = `You are a tourism revenue analyst. Analyze these WooCommerce stats for OnlineGuide.io (Cambodia Angkor Wat tours):

Sales Report (this month): ${JSON.stringify(salesReport, null, 2)}

Top 5 Sellers: ${JSON.stringify(topSellers, null, 2)}

Provide:
1. Revenue summary (2 sentences)
2. Top-performing tour insight (1 sentence)
3. One actionable growth recommendation (1-2 sentences)
4. Risk or opportunity to watch

Keep response under 200 words. Use plain text, no markdown headers.`;

    const insights = await callClaudeSonnet(prompt, 350);
    res.json({ insights, salesReport, topSellers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /woo/ai/upsell-for-order
 * Body: { orderId }
 * Fetches the order, runs Claude to suggest relevant upsell offers, optionally appends note.
 */
wooRouter.post("/ai/upsell-for-order", async (req, res) => {
  try {
    const { orderId, appendNote = false } = req.body;
    if (!orderId) return res.status(400).json({ error: "orderId is required" });

    const order = await getOrder(orderId);
    const items = order.line_items?.map((i) => i.name).join(", ") || "unknown";
    const total = order.total;
    const language = order.billing?.country || "unknown country";

    const prompt = `An Angkor Wat tourist just completed a WooCommerce order on OnlineGuide.io.

Order details:
- Items purchased: ${items}
- Total paid: $${total} USD
- Guest country: ${language}

Suggest 2 specific upsell offers with:
- Offer name
- Why it fits this guest
- Suggested WhatsApp message (under 60 words, friendly)

Format as JSON array: [{ "offer": "...", "reason": "...", "whatsappMessage": "..." }]`;

    const content = await callClaudeSonnet(prompt, 400);
    let upsells;
    try {
      upsells = JSON.parse(content.trim());
    } catch {
      upsells = [{ offer: "AI parse error", reason: content }];
    }

    if (appendNote && upsells.length > 0) {
      await addOrderNote(orderId, `AI upsell suggestions: ${upsells.map((u) => u.offer).join(", ")}`, false);
    }

    res.json({ orderId, upsells });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── WEBHOOK ─────────────────────────────────────────────────────────────────

wooRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["x-wc-webhook-signature"] || "";
    if (!verifyWCWebhook(req.body, sig)) {
      return res.status(400).json({ error: "Invalid WooCommerce webhook signature" });
    }
    const event = JSON.parse(req.body.toString());
    const topic = req.headers["x-wc-webhook-topic"] || "unknown";

    switch (topic) {
      case "order.created":
        console.log("WC new order:", event.id, event.status, "$" + event.total);
        break;
      case "order.updated":
        console.log("WC order updated:", event.id, "→", event.status);
        break;
      case "product.created":
        console.log("WC new product:", event.id, event.name);
        break;
      default:
        console.log("WC webhook:", topic, event.id);
    }

    res.json({ received: true });
  }
);
