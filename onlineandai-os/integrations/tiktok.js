import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const TT_BASE = "https://business-api.tiktok.com/open_api/v1.3";
const TOKEN = () => process.env.TIKTOK_ACCESS_TOKEN || "";
const ADVERTISER_ID = () => process.env.TIKTOK_ADVERTISER_ID || "";

async function ttFetch(path, method = "GET", body = null) {
  const url = `${TT_BASE}${path}`;
  const opts = {
    method,
    headers: {
      "Access-Token": TOKEN(),
      "Content-Type": "application/json",
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`TikTok API ${res.status}: ${err}`);
  }
  const data = await res.json();
  if (data.code !== 0) throw new Error(`TikTok API error ${data.code}: ${data.message}`);
  return data.data;
}

export async function getAdAccounts() {
  return ttFetch("/oauth2/advertiser/get/");
}

export async function getCampaigns() {
  return ttFetch(`/campaign/get/?advertiser_id=${ADVERTISER_ID()}&fields=["campaign_id","campaign_name","status","budget"]`);
}

export async function createCampaign({ name, objectiveType, budget, budgetMode = "BUDGET_MODE_TOTAL" }) {
  return ttFetch("/campaign/create/", "POST", {
    advertiser_id: ADVERTISER_ID(),
    campaign_name: name,
    objective_type: objectiveType,
    budget,
    budget_mode: budgetMode,
  });
}

export async function getCampaignMetrics(campaignIds, { startDate, endDate, metrics = ["spend", "impressions", "clicks"] } = {}) {
  return ttFetch("/report/integrated/get/", "POST", {
    advertiser_id: ADVERTISER_ID(),
    report_type: "CAMPAIGN",
    dimensions: ["campaign_id"],
    metrics,
    start_date: startDate,
    end_date: endDate,
    filtering: [{ field_name: "campaign_ids", filter_type: "IN", filter_value: JSON.stringify(campaignIds) }],
  });
}

export async function uploadVideo({ videoUrl, name }) {
  return ttFetch("/file/video/ad/upload/", "POST", {
    advertiser_id: ADVERTISER_ID(),
    video_url: videoUrl,
    video_name: name,
    upload_type: "VIDEO_BY_URL",
    auto_fix_enabled: true,
  });
}
