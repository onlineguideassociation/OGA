/**
 * WooCommerce REST API v3 Integration
 * Site: onlineguideassociation.org
 * Auth: Consumer Key + Consumer Secret (Basic Auth over HTTPS)
 *
 * Keys are generated at:
 *   WP Admin > WooCommerce > Settings > Advanced > REST API
 *   Set permission to Read/Write for full access.
 *
 * Core endpoints used:
 *   /wp-json/wc/v3/products          — Tour listings
 *   /wp-json/wc/v3/orders            — Booking orders
 *   /wp-json/wc/v3/customers         — Guest profiles
 *   /wp-json/wc/v3/products/categories
 *   /wp-json/wc/v3/coupons
 *   /wp-json/wc/v3/reports/sales
 */
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const WC_BASE = () => {
  const base = (process.env.WP_URL || "https://onlineguideassociation.org").replace(/\/$/, "");
  return `${base}/wp-json/wc/v3`;
};

function wcHeaders() {
  const key = process.env.WC_CONSUMER_KEY || "";
  const secret = process.env.WC_CONSUMER_SECRET || "";
  const token = Buffer.from(`${key}:${secret}`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

async function wcFetch(path, method = "GET", body = null) {
  const opts = { method, headers: wcHeaders() };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${WC_BASE()}${path}`, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WooCommerce API ${res.status}: ${err}`);
  }
  return res.json();
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

export async function listProducts({ page = 1, perPage = 20, category, status = "publish", search } = {}) {
  let qs = `?page=${page}&per_page=${perPage}&status=${status}`;
  if (category) qs += `&category=${category}`;
  if (search) qs += `&search=${encodeURIComponent(search)}`;
  return wcFetch(`/products${qs}`);
}

export async function getProduct(id) {
  return wcFetch(`/products/${id}`);
}

/**
 * Create a WooCommerce product from a tour definition.
 * @param {object} opts
 * @param {string} opts.name
 * @param {string} opts.description
 * @param {string} opts.shortDescription
 * @param {number} opts.price           — Regular price (USD)
 * @param {number|null} opts.salePrice  — Optional sale price
 * @param {string[]} opts.images        — Array of image URLs
 * @param {number[]} opts.categories    — WC category IDs
 * @param {object}  opts.meta           — Custom meta fields
 */
export async function createProduct({
  name,
  description = "",
  shortDescription = "",
  price,
  salePrice = null,
  images = [],
  categories = [],
  tags = [],
  sku = "",
  meta = {},
}) {
  return wcFetch("/products", "POST", {
    name,
    type: "simple",
    status: "publish",
    description,
    short_description: shortDescription,
    regular_price: String(price),
    ...(salePrice ? { sale_price: String(salePrice) } : {}),
    images: images.map((src) => ({ src })),
    categories: categories.map((id) => ({ id })),
    tags: tags.map((id) => ({ id })),
    sku,
    meta_data: Object.entries(meta).map(([key, value]) => ({ key, value })),
    manage_stock: false,
    sold_individually: false,
  });
}

export async function updateProduct(id, fields) {
  return wcFetch(`/products/${id}`, "PUT", fields);
}

export async function deleteProduct(id, force = false) {
  return wcFetch(`/products/${id}?force=${force}`, "DELETE");
}

export async function listProductCategories({ page = 1, perPage = 50 } = {}) {
  return wcFetch(`/products/categories?page=${page}&per_page=${perPage}`);
}

export async function createProductCategory({ name, description = "", parent = 0 }) {
  return wcFetch("/products/categories", "POST", { name, description, parent });
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────

/**
 * List orders with optional filters.
 * status: pending | processing | on-hold | completed | cancelled | refunded | failed | any
 */
export async function listOrders({ page = 1, perPage = 20, status, customerId, search } = {}) {
  let qs = `?page=${page}&per_page=${perPage}`;
  if (status) qs += `&status=${status}`;
  if (customerId) qs += `&customer=${customerId}`;
  if (search) qs += `&search=${encodeURIComponent(search)}`;
  return wcFetch(`/orders${qs}`);
}

export async function getOrder(id) {
  return wcFetch(`/orders/${id}`);
}

export async function updateOrderStatus(id, status) {
  return wcFetch(`/orders/${id}`, "PUT", { status });
}

export async function addOrderNote(orderId, note, customerNote = false) {
  return wcFetch(`/orders/${orderId}/notes`, "POST", {
    note,
    customer_note: customerNote,
  });
}

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────

export async function listCustomers({ page = 1, perPage = 20, search, role = "customer" } = {}) {
  let qs = `?page=${page}&per_page=${perPage}&role=${role}`;
  if (search) qs += `&search=${encodeURIComponent(search)}`;
  return wcFetch(`/customers${qs}`);
}

export async function getCustomer(id) {
  return wcFetch(`/customers/${id}`);
}

export async function getCustomerOrders(customerId) {
  return listOrders({ customerId });
}

// ─── COUPONS ─────────────────────────────────────────────────────────────────

export async function createCoupon({
  code,
  discountType = "percent",
  amount,
  description = "",
  usageLimit = 1,
  expiryDate = null,
  productIds = [],
}) {
  return wcFetch("/coupons", "POST", {
    code,
    discount_type: discountType,
    amount: String(amount),
    description,
    usage_limit: usageLimit,
    ...(expiryDate ? { date_expires: expiryDate } : {}),
    ...(productIds.length ? { product_ids: productIds } : {}),
    free_shipping: false,
  });
}

export async function listCoupons({ page = 1, perPage = 20 } = {}) {
  return wcFetch(`/coupons?page=${page}&per_page=${perPage}`);
}

// ─── REPORTS ─────────────────────────────────────────────────────────────────

export async function getSalesReport({ period = "month", dateMin, dateMax } = {}) {
  let qs = `?period=${period}`;
  if (dateMin) qs += `&date_min=${dateMin}`;
  if (dateMax) qs += `&date_max=${dateMax}`;
  return wcFetch(`/reports/sales${qs}`);
}

export async function getTopSellers({ period = "month", perPage = 10 } = {}) {
  return wcFetch(`/reports/top_sellers?period=${period}&per_page=${perPage}`);
}

// ─── WEBHOOKS ────────────────────────────────────────────────────────────────

export async function createWebhook({ name, topic, deliveryUrl, secret = "" }) {
  return wcFetch("/webhooks", "POST", {
    name,
    topic,
    delivery_url: deliveryUrl,
    secret,
    status: "active",
  });
}

export async function listWebhooks() {
  return wcFetch("/webhooks");
}

// ─── TOUR-SPECIFIC HELPERS ────────────────────────────────────────────────────

/**
 * Sync a tour bundle to WooCommerce as a product.
 * meta stores tour-specific data as WC product meta.
 */
export async function syncTourToWooCommerce({
  tourName,
  description,
  shortDescription,
  priceUsd,
  durationDays,
  guideIncluded = false,
  driverIncluded = false,
  imageUrls = [],
  categoryIds = [],
  bookingRef = null,
}) {
  return createProduct({
    name: tourName,
    description,
    shortDescription,
    price: priceUsd,
    images: imageUrls,
    categories: categoryIds,
    sku: bookingRef || `TOUR-${Date.now()}`,
    meta: {
      duration_days: durationDays,
      guide_included: guideIncluded,
      driver_included: driverIncluded,
      tour_type: "angkor_wat",
    },
  });
}

/**
 * Verify WooCommerce webhook payload using HMAC-SHA256.
 * WC sends X-WC-Webhook-Signature header.
 */
import crypto from "crypto";
export function verifyWCWebhook(rawBody, receivedSignature) {
  const secret = process.env.WC_WEBHOOK_SECRET || "";
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedSignature));
  } catch {
    return false;
  }
}
