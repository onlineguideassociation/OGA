import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const GRAPH = "https://graph.facebook.com/v19.0";
const TOKEN = () => process.env.META_PAGE_TOKEN || "";
const PAGE_ID = () => process.env.META_PAGE_ID || "";
const AD_ACCOUNT = () => process.env.META_AD_ACCOUNT_ID || "";

async function graphFetch(path, method = "GET", body = null) {
  const url = `${GRAPH}${path}${path.includes("?") ? "&" : "?"}access_token=${TOKEN()}`;
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Meta Graph API ${res.status}: ${err}`);
  }
  return res.json();
}

export async function createPagePost(message, link = null) {
  const body = { message };
  if (link) body.link = link;
  return graphFetch(`/${PAGE_ID()}/feed`, "POST", body);
}

export async function getPagePosts(limit = 10) {
  return graphFetch(`/${PAGE_ID()}/feed?fields=id,message,created_time&limit=${limit}`);
}

export async function getAdAccounts() {
  return graphFetch("/me/adaccounts?fields=id,name,account_status");
}

export async function getCampaigns(adAccountId) {
  const id = adAccountId || AD_ACCOUNT();
  return graphFetch(`/${id}/campaigns?fields=id,name,status,objective`);
}

export async function createCampaign({ name, objective, status = "PAUSED" }) {
  return graphFetch(`/${AD_ACCOUNT()}/campaigns`, "POST", {
    name,
    objective,
    status,
    special_ad_categories: [],
  });
}

export async function getAdInsights(campaignId, { datePreset = "last_7d" } = {}) {
  return graphFetch(`/${campaignId}/insights?fields=impressions,clicks,spend,cpc,cpm&date_preset=${datePreset}`);
}

export async function getIGAccount() {
  return graphFetch(`/${PAGE_ID()}?fields=instagram_business_account`);
}

export async function createIGMediaContainer(igAccountId, { imageUrl, caption }) {
  return graphFetch(`/${igAccountId}/media`, "POST", { image_url: imageUrl, caption });
}

export async function publishIGMedia(igAccountId, creationId) {
  return graphFetch(`/${igAccountId}/media_publish`, "POST", { creation_id: creationId });
}
