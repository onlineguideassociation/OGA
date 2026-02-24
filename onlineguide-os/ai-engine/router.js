import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export async function aiRouter(taskType, input) {
  switch (taskType) {
    case "seo_blog":
      return openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: input }]
      });
    case "social_caption": {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      return model.generateContent(input);
    }
    case "review_sentiment":
      return openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Analyze tourism review tone and output JSON {tone, score, reason}:\n${input}`
          }
        ],
        response_format: { type: "json_object" }
      });
    default:
      throw new Error(`Unsupported task type: ${taskType}`);
  }
}
