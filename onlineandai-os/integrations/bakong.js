/**
 * Bakong — National Bank of Cambodia (NBC) payment system
 * KHQR standard: all Cambodian banks support scanning Bakong QR codes.
 * API: https://api-bakong.nbc.gov.kh
 *
 * Flow:
 *   1. Merchant creates a KHQR string (EMVCo QR + Cambodian tags)
 *   2. Customer scans with ABA, ACLEDA, Wing, Chip Mong, or any Bakong-linked app
 *   3. Webhook / polling confirms payment
 */
import crypto from "crypto";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const BAKONG_BASE = "https://api-bakong.nbc.gov.kh/v1";
const TOKEN = () => process.env.BAKONG_API_TOKEN || "";

async function bakongFetch(path, method = "GET", body = null) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN()}`,
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BAKONG_BASE}${path}`, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Bakong API ${res.status}: ${err}`);
  }
  return res.json();
}

// ─── KHQR string builder (EMVCo-compatible) ─────────────────────────────────

function tlv(tag, value) {
  const v = String(value);
  const len = String(v.length).padStart(2, "0");
  return `${tag}${len}${v}`;
}

function crc16(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return ((crc & 0xffff) >>> 0).toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Build a KHQR payload string that any Bakong-connected app can scan.
 *
 * @param {object} opts
 * @param {string} opts.bakongAccountId  - Merchant Bakong ID (e.g. "merchant@ababank")
 * @param {string} opts.merchantName     - Display name (max 25 chars)
 * @param {string} opts.merchantCity     - City (e.g. "Siem Reap")
 * @param {number} opts.amount           - Amount in USD or KHR
 * @param {string} opts.currency         - "USD" or "KHR"
 * @param {string} opts.transactionId    - Your unique reference
 * @param {string} [opts.billNumber]     - Optional bill/invoice number
 */
export function buildKHQR({
  bakongAccountId,
  merchantName,
  merchantCity = "Siem Reap",
  amount,
  currency = "USD",
  transactionId,
  billNumber = "",
}) {
  const currencyCode = currency === "KHR" ? "116" : "840";
  const countryCode = "KH";
  const merchantCategoryCode = "5999"; // Miscellaneous retail; use 7011 for hotels/tourism

  // Point of initiation: 12 = dynamic QR
  let qr = tlv("00", "01");
  qr += tlv("01", "12");

  // Merchant account information (tag 29 — Bakong)
  const bakongPayload = tlv("00", "dev.bakong.khqr") + tlv("01", bakongAccountId);
  qr += tlv("29", bakongPayload);

  qr += tlv("52", merchantCategoryCode);
  qr += tlv("53", currencyCode);

  if (amount) qr += tlv("54", Number(amount).toFixed(2));

  qr += tlv("58", countryCode);
  qr += tlv("59", merchantName.slice(0, 25));
  qr += tlv("60", merchantCity.slice(0, 15));

  // Additional data
  const addData = tlv("05", transactionId.slice(0, 25)) + (billNumber ? tlv("01", billNumber.slice(0, 25)) : "");
  qr += tlv("62", addData);

  // CRC (tag 63, always last, value = CRC of everything up to and including "6304")
  const forCRC = qr + "6304";
  qr += tlv("63", crc16(forCRC));

  return qr;
}

// ─── Bakong REST API ─────────────────────────────────────────────────────────

/**
 * Create a Bakong payment request via NBC API.
 * NBC issues a transaction hash and QR data.
 */
export async function createBakongPayment({
  amount,
  currency = "USD",
  description,
  transactionId,
  bakongAccountId,
  merchantName,
  merchantCity = "Siem Reap",
}) {
  const txnId = transactionId || `OG-BK-${Date.now()}`;

  const qrString = buildKHQR({
    bakongAccountId: bakongAccountId || process.env.BAKONG_MERCHANT_ID,
    merchantName: merchantName || process.env.BAKONG_MERCHANT_NAME || "OnlineGuide Tours",
    merchantCity,
    amount,
    currency,
    transactionId: txnId,
    billNumber: txnId,
  });

  // Also call the NBC API to register and track the transaction
  let apiResult = null;
  try {
    apiResult = await bakongFetch("/merchant/payment/create", "POST", {
      transactionId: txnId,
      amount: Number(amount).toFixed(2),
      currency,
      description: description || "Tour Payment",
      qrCode: qrString,
    });
  } catch {
    // NBC API registration is optional; QR string works standalone
  }

  return { transactionId: txnId, qrString, apiResult };
}

/**
 * Poll the Bakong API for transaction status.
 */
export async function checkBakongTransaction(transactionId) {
  return bakongFetch(`/merchant/payment/check?transactionId=${encodeURIComponent(transactionId)}`);
}

/**
 * Verify a Bakong webhook via HMAC-SHA256 signature.
 */
export function verifyBakongWebhook(rawBody, receivedSignature) {
  const secret = process.env.BAKONG_WEBHOOK_SECRET || "";
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(receivedSignature, "hex"));
  } catch {
    return false;
  }
}

/**
 * Convenience: KHQR for a tour booking.
 */
export async function createBakongTourPayment({ tourName, price, bookingRef, currency = "USD" }) {
  return createBakongPayment({
    amount: price,
    currency,
    description: `${tourName} — ${bookingRef}`,
    transactionId: bookingRef,
    merchantName: process.env.BAKONG_MERCHANT_NAME || "OnlineGuide Tours",
  });
}
