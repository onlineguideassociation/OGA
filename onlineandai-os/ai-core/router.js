import { callOpenAI } from "./providers/openai.js";
import { callGemini } from "./providers/gemini.js";
import { findToursByInterest } from "../database.js"; // Import the new database function

// This function is now defined locally to avoid import issues.
function buildReviewReplyPrompt({ review, tone, language }) {
  return `
    As a reputation manager for a tourism business, write a professional and empathetic reply to the following customer review.
    - The reply should be in ${language || 'English'}.
    - The tone should be ${tone || 'friendly and professional'}.
    - Address the key points mentioned in the review.
    - If the review is negative, apologize and offer a solution or follow-up.
    - If the review is positive, thank the customer and highlight the positive aspects.

    Customer Review:
    """
    ${review}
    """

    Your Reply:
  `;
}

// Core AI features based on the SDK strategy
const routingMap = {
  tour_description: "openai",
  social_ad: "gemini",
  review_reply: "openai",
  smart_itinerary: "gemini"
};

const promptBuilders = {
  tour_description: ({ name, features }) =>
    `Generate a high-converting tour description for a tour named '${name}'. Emphasize these features: ${features}. Make it exciting for tourists and optimize for conversion.`,
  social_ad: ({ productName, audience, platform }) =>
    `Create a viral ${platform} ad for a product: '${productName}'. The target audience is ${audience}. The ad should have a strong call-to-action and 3-5 relevant hashtags.`,
  review_reply: buildReviewReplyPrompt, // This now refers to the local function
  smart_itinerary: ({ location, duration, interests }) =>
    `Create a smart travel itinerary for ${location} for ${duration} days, focusing on these interests: ${interests.join(", ")}. Return as a JSON object with a 'daily_plan' array.`
};

export async function aiRouter(task) {
  const { type, payload = {}, priority = "normal" } = task;
  const provider = routingMap[type];

  if (!provider) {
    throw new Error(`Unsupported task type: ${type}`);
  }

  const promptBuilder = promptBuilders[type];
  if (!promptBuilder) {
    throw new Error(`No prompt builder defined for task type: ${type}`);
  }

  const prompt = promptBuilder(payload);

  let aiResult;
  if (provider === "openai") {
    aiResult = await callOpenAI({ prompt: `[priority:${priority}] ${prompt}`});
  }

  if (provider === "gemini") {
    aiResult = await callGemini({ prompt: `[priority:${priority}] ${prompt}` });
  }

  if (!aiResult) {
      throw new Error(`Provider not implemented: ${provider}`);
  }

  // Enhance Smart Itinerary with tour suggestions from the database
  if (type === 'smart_itinerary' && payload.interests) {
      let suggested_tours = [];
      for (const interest of payload.interests) {
          const tours = await findToursByInterest(interest);
          suggested_tours.push(...tours);
      }
      // Remove duplicates
      suggested_tours = [...new Map(suggested_tours.map(item => [item['id'], item])).values()];
      
      try {
        // Attempt to parse the AI result as JSON and merge
        const itinerary = JSON.parse(aiResult);
        itinerary.suggested_tours = suggested_tours;
        return itinerary;
      } catch (e) {
        // If AI result is not JSON, return a combined object
        return { itinerary_text: aiResult, suggested_tours };
      }
  }

  return aiResult;
}
