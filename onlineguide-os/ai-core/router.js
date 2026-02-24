import { callOpenAI } from "./providers/openai.js";
import { callGemini } from "./providers/gemini.js";
import { buildReviewReplyPrompt } from "./prompts/reviewReply.js";
import { buildSeoArticlePrompt } from "./prompts/seoArticle.js";
import { buildInvestorEmailPrompt } from "./prompts/investorEmail.js";

const routingMap = {
  seo_longform: "openai",
  review_reply: "openai",
  social_short: "gemini",
  sentiment: "openai",
  financial_analysis: "openai",
  investor_email: "openai"
};

const promptBuilders = {
  seo_longform: buildSeoArticlePrompt,
  review_reply: buildReviewReplyPrompt,
  social_short: ({ text }) => text,
  sentiment: ({ reviewText }) =>
    `Analyze tourism review tone and output JSON {tone, score, reason}:\n${reviewText}`,
  financial_analysis: ({ financials, objective }) =>
    `Analyze tourism operator financial performance for objective: ${objective}. Data: ${JSON.stringify(financials)}`,
  investor_email: buildInvestorEmailPrompt
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

  if (provider === "openai") {
    const responseFormat = type === "sentiment" ? { type: "json_object" } : null;
    return callOpenAI({ prompt: `[priority:${priority}] ${prompt}`, responseFormat });
  }

  if (provider === "gemini") {
    return callGemini({ prompt: `[priority:${priority}] ${prompt}` });
  }

  throw new Error(`Provider not implemented: ${provider}`);
}
