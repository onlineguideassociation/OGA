/**
 * ABA PayWay — Cambodian merchant payment gateway
 * Docs: https://developer.payway.com.kh
 * Supported: QR code payments, card, Bakong, ACLEDA, Chip Mong, etc.
 */
import crypto from "crypto";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const PAYWAY_BASE = "https://checkout.payway.com.kh/api/payment-gateway/v1/payments";
const MERCHANT_ID = () => process.env.ABA_MERCHANT_ID || "";
const API_KEY = () => process.env.ABA_API_KEY || "";

function generateHash(params) {
  // ABA uses HMAC-SHA512 of the sorted param string
  const str = Object.keys(params)
    .sort()
    .filter((k) => params[k] !== "" && params[k] !== null && params[k] !== undefined)
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHmac("sha512", API_KEY()).update(str).digest("base64");
}

function generateTransactionId() {
  return `OG-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

/**
 * Create a PayWay checkout session.
 * Returns { paymentUrl, transactionId, qrCode } for the customer to complete.
 */
export async function createABAPayment({
  amount,
  currency = "USD",
  description,
  returnUrl,
  cancelUrl,
  firstName = "",
  lastName = "",
  email = "",
  phone = "",
  items = [],
  transactionId = null,
}) {
  const txnId = transactionId || generateTransactionId();
  const reqTime = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);

  const params = {
    req_time: reqTime,
    merchant_id: MERCHANT_ID(),
    tran_id: txnId,
    amount: Number(amount).toFixed(2),
    currency,
    return_param: JSON.stringify({ tran_id: txnId }),
    payment_option: "abapay,cards,bakong,abapay_deeplink",
    ...(description && { note: description }),
    ...(returnUrl && { return_url: returnUrl }),
    ...(cancelUrl && { cancel_url: cancelUrl }),
    ...(firstName && { firstname: firstName }),
    ...(lastName && { lastname: lastName }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(items.length > 0 && { items: JSON.stringify(items) }),
  };

  params.hash = generateHash(params);

  const res = await fetch(`${PAYWAY_BASE}/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ABA PayWay ${res.status}: ${err}`);
  }

  const data = await res.json();
  if (data.status?.code !== "00") {
    throw new Error(`ABA PayWay error: ${data.status?.message || JSON.stringify(data)}`);
  }

  return {
    transactionId: txnId,
    paymentUrl: data.checkout_url || `https://checkout.payway.com.kh/${txnId}`,
    qrCode: data.qr_code || null,
    abapayDeeplink: data.abapay_deeplink || null,
    raw: data,
  };
}

/**
 * Create a tour booking payment via ABA PayWay.
 */
export async function createABATourPayment({ tourName, price, bookingRef, returnUrl, cancelUrl, guest = {} }) {
  return createABAPayment({
    amount: price,
    currency: "USD",
    description: `${tourName} — Booking ${bookingRef}`,
    returnUrl,
    cancelUrl,
    firstName: guest.firstName,
    lastName: guest.lastName,
    email: guest.email,
    phone: guest.phone,
    transactionId: bookingRef,
    items: [{ name: tourName, quantity: 1, price: Number(price).toFixed(2) }],
  });
}

/**
 * Verify ABA PayWay webhook callback.
 * ABA sends a hash in the callback; compare against your computed hash.
 */
export function verifyABACallback(params) {
  const receivedHash = params.hash;
  const paramsWithoutHash = { ...params };
  delete paramsWithoutHash.hash;
  const expected = generateHash(paramsWithoutHash);
  return receivedHash === expected;
}

/**
 * Query transaction status.
 */
export async function queryABATransaction(transactionId) {
  const reqTime = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const params = {
    req_time: reqTime,
    merchant_id: MERCHANT_ID(),
    tran_id: transactionId,
  };
  params.hash = generateHash(params);

  const res = await fetch(`${PAYWAY_BASE}/check-transaction-2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error(`ABA PayWay query ${res.status}: ${await res.text()}`);
  return res.json();
}
