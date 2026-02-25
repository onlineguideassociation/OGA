export function buildReviewReplyPrompt(payload) {
  const { reviewText, tone = "professional and warm", language = "English" } = payload;
  return `Write a ${tone} ${language} response to this tourism review:\n${reviewText}`;
}
