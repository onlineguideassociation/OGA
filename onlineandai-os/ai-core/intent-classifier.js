import { callClaudeHaiku } from "./providers/anthropic.js";

const INTENTS = [
  "pass_inquiry",
  "guide_request",
  "itinerary_request",
  "culture_question",
  "driver_request",
  "booking_action",
  "review_reply",
  "social_ad",
  "tour_description",
  "seo_article",
  "upsell_trigger",
  "support_request",
  "unknown",
];

const SYSTEM = `You are an intent classifier for an Angkor Wat tourism platform.
Classify the user message into exactly ONE of these intent keys:
${INTENTS.join(", ")}

Respond with ONLY the intent key — no explanation, no punctuation.`;

export async function classifyIntent(userMessage) {
  const intent = await callClaudeHaiku({ prompt: userMessage, system: SYSTEM, maxTokens: 32 });
  const key = intent.trim().toLowerCase();
  return INTENTS.includes(key) ? key : "unknown";
}
