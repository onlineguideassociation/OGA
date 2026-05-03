/**
 * Wing Pay — Cambodia mobile money merchant API
 * Docs: https://developers.wingmoney.com
 * Supports: Wing account transfers, QR, merchant collections
 */
import crypto from "crypto";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const WING_BASE = "https://api.wingmoney.com/openapi/v1.1";
const MERCHANT_ID = () => process.env.WING_MERCHANT_ID || "";
const SECRET_KEY = () => process.env.WING_SECRET_KEY || "";
const ACCESS_TOKEN = () => process.env.WING_ACCESS_TOKEN || "";

function wingSignature(body) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  return crypto.createHmac("sha256", SECRET_KEY()).update(payload).digest("hex");
}

function wingHeaders(body = "") {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN()}`,
    "X-Merchant-ID": MERCHANT_ID(),
    "X-Signature": wingSignature(body),
    "X-Timestamp": Date.now().toString(),
  };
}

async function wingFetch(path, method = "GET", body = null) {
  const bodyStr = body ? JSON.stringify(body) : "";
  const res = await fetch(`${WING_BASE}${path}`, {
    method,
    headers: wingHeaders(bodyStr),
    ...(body ? { body: bodyStr } : {}),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Wing Pay ${res.status}: ${err}`);
  }

  const data = await res.json();
  if (data.errorCode && data.errorCode !== "00") {
    throw new Error(`Wing Pay error ${data.errorCode}: ${data.errorDescription || JSON.stringify(data)}`);
  }
  return data;
}

/**
 * Generate a Wing QR code for the customer to scan and pay.
 */
export async function createWingQR({ amount, currency = "USD", orderId, description }) {
  const txnId = orderId || `OG-WING-${Date.now()}`;
  const data = await wingFetch("/merchant/payment/qr/generate", "POST", {
    merchantId: MERCHANT_ID(),
    transactionId: txnId,
    amount: Number(amount).toFixed(2),
    currency,
    description: description || "Tour Payment",
    expiryMinutes: 30,
  });
  return { transactionId: txnId, qrString: data.qrString, qrImageUrl: data.qrImageUrl, raw: data };
}

/**
 * Request a direct payment collection from a Wing customer's phone number.
 * Customer receives a push notification to approve.
 */
export async function collectFromWingAccount({ customerPhone, amount, currency = "USD", orderId, description }) {
  const txnId = orderId || `OG-WING-${Date.now()}`;
  const data = await wingFetch("/merchant/payment/collect", "POST", {
    merchantId: MERCHANT_ID(),
    transactionId: txnId,
    customerPhone,
    amount: Number(amount).toFixed(2),
    currency,
    description: description || "Tour Payment",
  });
  return { transactionId: txnId, status: data.transactionStatus, raw: data };
}

/**
 * Check the status of a Wing transaction.
 */
export async function queryWingTransaction(transactionId) {
  return wingFetch(`/merchant/payment/transaction/${transactionId}`);
}

/**
 * Verify Wing webhook signature.
 * Wing sends X-Signature header with HMAC-SHA256 of the request body.
 */
export function verifyWingWebhook(rawBody, receivedSignature) {
  const expected = crypto.createHmac("sha256", SECRET_KEY()).update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(receivedSignature, "hex"));
}

/**
 * Convenience: create a tour payment QR via Wing.
 */
export async function createWingTourPayment({ tourName, price, bookingRef }) {
  return createWingQR({
    amount: price,
    currency: "USD",
    orderId: bookingRef,
    description: `${tourName} — Booking ${bookingRef}`,
  });
}
