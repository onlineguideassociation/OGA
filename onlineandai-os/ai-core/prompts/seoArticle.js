export function buildSeoArticlePrompt(payload) {
  const { topic, targetKeywords = [], city = "Cambodia", wordCount = 1000 } = payload;
  return `Write an SEO longform article about ${topic} for travelers in ${city}. Include these keywords naturally: ${targetKeywords.join(", ")}. Target length: ${wordCount} words.`;
}
