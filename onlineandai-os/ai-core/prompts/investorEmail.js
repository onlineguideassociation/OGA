export function buildInvestorEmailPrompt(payload) {
  const { investorName, tractionSummary, ask } = payload;
  return `Draft a concise investor outreach email to ${investorName}. Include this traction summary: ${tractionSummary}. Capital ask: ${ask}.`;
}
