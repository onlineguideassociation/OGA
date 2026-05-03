import { callOpenAI } from "./providers/openai.js";
import { callGemini } from "./providers/gemini.js";
import { callClaude, callClaudeSonnet } from "./providers/anthropic.js";
import { classifyIntent } from "./intent-classifier.js";
import { findToursByInterest } from "../database.js";

function buildReviewReplyPrompt({ review, tone, language }) {
  return `As a reputation manager for a tourism business, write a professional and empathetic reply to the following customer review.
- The reply should be in ${language || "English"}.
- The tone should be ${tone || "friendly and professional"}.
- Address the key points mentioned in the review.
- If the review is negative, apologize and offer a solution.
- If the review is positive, thank the customer.

Customer Review:
"""
${review}
"""

Your Reply:`;
}

const routingMap = {
  tour_description: "openai",
  social_ad: "gemini",
  review_reply: "openai",
  smart_itinerary: "gemini",
  pass_brain: "claude",
  guide_matcher: "claude",
  culture_brain: "claude_sonnet",
  driver_dispatch: "openai",
  upsell_brain: "claude_sonnet",
  support_brain: "claude_sonnet",
  seo_article: "openai",
  investor_email: "openai",
};

const promptBuilders = {
  tour_description: ({ name, features }) =>
    `Generate a high-converting tour description for a tour named '${name}'. Emphasize these features: ${features}. Make it exciting for tourists and optimize for conversion.`,
  social_ad: ({ productName, audience, platform }) =>
    `Create a viral ${platform} ad for a product: '${productName}'. The target audience is ${audience}. Strong call-to-action and 3-5 relevant hashtags.`,
  review_reply: buildReviewReplyPrompt,
  smart_itinerary: ({ location, duration, interests }) =>
    `Create a smart travel itinerary for ${location} for ${duration} days, focusing on: ${interests.join(", ")}. Return as JSON with a 'daily_plan' array.`,
  pass_brain: ({ question, passType = "Angkor Pass" }) =>
    `You are an expert on ${passType} tickets for Angkor Wat. Answer this visitor question clearly and helpfully: ${question}`,
  guide_matcher: ({ interests, language, budget, groupSize }) =>
    `Match a licensed Angkor guide for a group of ${groupSize} with interests: ${interests}. Language: ${language}. Budget: $${budget}/day. Recommend guide type and key qualities.`,
  culture_brain: ({ topic }) =>
    `You are an expert on Khmer history and Angkor Wat culture. Provide rich cultural context about: ${topic}. Include historical facts, significance, and visitor tips.`,
  driver_dispatch: ({ pickup, dropoff, passengers, date }) =>
    `Create a driver dispatch instruction for pickup at ${pickup}, dropoff at ${dropoff}, ${passengers} passengers on ${date}. Include timing, route suggestion, and driver notes.`,
  upsell_brain: ({ currentTour, guestProfile, previousPurchases }) =>
    `You are a tourism upsell specialist. The guest just completed: ${currentTour}. Profile: ${guestProfile}. Previous: ${previousPurchases}. Recommend 2-3 compelling upsell offers with pricing and messaging.`,
  support_brain: ({ issue, bookingRef }) =>
    `You are a customer support specialist for Angkor Wat tours. Resolve this issue for booking ${bookingRef}: ${issue}. Be empathetic, solution-focused, and offer concrete next steps.`,
  seo_article: ({ topic, keywords, wordCount = 800 }) =>
    `Write an SEO-optimized article about '${topic}' for a Cambodia tourism website. Target keywords: ${keywords}. Length: ~${wordCount} words. Include H2 headings.`,
  investor_email: ({ company, metric, ask }) =>
    `Write a compelling investor update email for ${company}. Key metric: ${metric}. Ask: ${ask}. Professional, data-driven, concise.`,
};

export async function aiRouter(task) {
  const { type, payload = {}, priority = "normal" } = task;
  const provider = routingMap[type];
  if (!provider) throw new Error(`Unsupported task type: ${type}`);

  const promptBuilder = promptBuilders[type];
  if (!promptBuilder) throw new Error(`No prompt builder for task type: ${type}`);

  const prompt = `[priority:${priority}] ${promptBuilder(payload)}`;

  let result;
  switch (provider) {
    case "openai":
      result = await callOpenAI({ prompt });
      break;
    case "gemini":
      result = await callGemini({ prompt });
      break;
    case "claude":
      result = await callClaude({ prompt });
      break;
    case "claude_sonnet":
      result = await callClaudeSonnet({ prompt });
      break;
    default:
      throw new Error(`Provider not implemented: ${provider}`);
  }

  if (type === "smart_itinerary" && payload.interests) {
    let suggested_tours = [];
    for (const interest of payload.interests) {
      const tours = await findToursByInterest(interest);
      suggested_tours.push(...tours);
    }
    suggested_tours = [...new Map(suggested_tours.map((t) => [t.id, t])).values()];
    try {
      const itinerary = JSON.parse(result);
      itinerary.suggested_tours = suggested_tours;
      return itinerary;
    } catch {
      return { itinerary_text: result, suggested_tours };
    }
  }

  return result;
}

export async function handleChat(userMessage, context = {}) {
  const intent = await classifyIntent(userMessage);

  const intentToTask = {
    pass_inquiry: { type: "pass_brain", payload: { question: userMessage } },
    guide_request: { type: "guide_matcher", payload: { interests: context.interests || "general", language: context.language || "English", budget: context.budget || 80, groupSize: context.groupSize || 2 } },
    itinerary_request: { type: "smart_itinerary", payload: { location: "Angkor Wat, Cambodia", duration: context.duration || 3, interests: context.interests ? [context.interests] : ["temples", "history"] } },
    culture_question: { type: "culture_brain", payload: { topic: userMessage } },
    driver_request: { type: "driver_dispatch", payload: { pickup: context.pickup || "Siem Reap Hotel", dropoff: "Angkor Wat", passengers: context.passengers || 2, date: context.date || "tomorrow" } },
    booking_action: { type: "support_brain", payload: { issue: userMessage, bookingRef: context.bookingRef || "N/A" } },
    review_reply: { type: "review_reply", payload: { review: userMessage, tone: "professional", language: "English" } },
    social_ad: { type: "social_ad", payload: { productName: "Angkor Wat Tour", audience: "adventure travelers", platform: context.platform || "Facebook" } },
    tour_description: { type: "tour_description", payload: { name: context.tourName || "Angkor Wat Sunrise Tour", features: userMessage } },
    seo_article: { type: "seo_article", payload: { topic: userMessage, keywords: context.keywords || "Angkor Wat, Cambodia tours" } },
    upsell_trigger: { type: "upsell_brain", payload: { currentTour: context.currentTour || "Angkor Sunrise", guestProfile: userMessage, previousPurchases: context.previousPurchases || "none" } },
    support_request: { type: "support_brain", payload: { issue: userMessage, bookingRef: context.bookingRef || "N/A" } },
    unknown: { type: "support_brain", payload: { issue: userMessage, bookingRef: context.bookingRef || "N/A" } },
  };

  const task = intentToTask[intent] || intentToTask.unknown;
  const reply = await aiRouter(task);
  return { intent, reply };
}
