import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export async function callGemini({ prompt }) {
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
  return model.generateContent(prompt);
}
