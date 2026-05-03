import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_KEY || "" });

export async function callClaude({ prompt, model = "claude-haiku-4-5-20251001", system = "", maxTokens = 1024 }) {
  const messages = [{ role: "user", content: prompt }];
  const params = { model, max_tokens: maxTokens, messages };
  if (system) params.system = system;
  const response = await client.messages.create(params);
  return response.content[0].text;
}

export async function callClaudeHaiku({ prompt, system = "", maxTokens = 512 }) {
  return callClaude({ prompt, model: "claude-haiku-4-5-20251001", system, maxTokens });
}

export async function callClaudeSonnet({ prompt, system = "", maxTokens = 2048 }) {
  return callClaude({ prompt, model: "claude-sonnet-4-6", system, maxTokens });
}
