import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function callOpenAI({ prompt, responseFormat = null }) {
  const request = {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  };

  if (responseFormat) {
    request.response_format = responseFormat;
  }

  return openai.chat.completions.create(request);
}
