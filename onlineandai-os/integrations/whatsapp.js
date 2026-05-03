import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const WA_BASE = "https://graph.facebook.com/v19.0";
const PHONE_ID = () => process.env.WHATSAPP_PHONE_ID || "";
const TOKEN = () => process.env.WHATSAPP_TOKEN || "";

async function waFetch(path, body) {
  const res = await fetch(`${WA_BASE}/${PHONE_ID()}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WhatsApp API ${res.status}: ${err}`);
  }
  return res.json();
}

export async function sendText(to, text) {
  return waFetch("/messages", {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  });
}

export async function sendTemplate(to, templateName, languageCode = "en_US", components = []) {
  return waFetch("/messages", {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: { name: templateName, language: { code: languageCode }, components },
  });
}

export async function sendBookingConfirmation(to, { tourName, date, time, guideId, bookingRef }) {
  return sendText(
    to,
    `✅ Booking Confirmed!\n\nTour: ${tourName}\nDate: ${date} at ${time}\nGuide: ${guideId}\nRef: ${bookingRef}\n\nReply HELP for support.`
  );
}

export async function sendSunriseReminder(to, { tourName, pickupTime, pickupLocation }) {
  return sendText(
    to,
    `🌅 Sunrise Reminder!\n\nYour ${tourName} is tomorrow.\nPickup: ${pickupTime} at ${pickupLocation}\n\nPlease be ready 5 min early. Reply HELP for support.`
  );
}

export async function sendUpsellOffer(to, { guestName, offerName, price, link }) {
  return sendText(
    to,
    `Hi ${guestName}! 🎉 Loved your tour?\n\nUpgrade with ${offerName} — only $${price}!\n\nBook here: ${link}\n\nOffer valid 48h.`
  );
}

export async function markAsRead(messageId) {
  return waFetch("/messages", {
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  });
}
