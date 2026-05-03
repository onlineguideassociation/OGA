import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const GBP_BASE = "https://mybusiness.googleapis.com/v4";

function gbpHeaders() {
  return {
    Authorization: `Bearer ${process.env.GBP_ACCESS_TOKEN || ""}`,
    "Content-Type": "application/json",
  };
}

async function gbpFetch(path, options = {}) {
  const res = await fetch(`${GBP_BASE}${path}`, {
    ...options,
    headers: { ...gbpHeaders(), ...(options.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GBP API ${res.status}: ${body}`);
  }
  return res.json();
}

export async function listAccounts() {
  return gbpFetch("/accounts");
}

export async function listLocations(accountId) {
  return gbpFetch(`/accounts/${accountId}/locations`);
}

export async function getLocation(accountId, locationId) {
  return gbpFetch(`/accounts/${accountId}/locations/${locationId}`);
}

export async function listReviews(accountId, locationId, { pageSize = 20 } = {}) {
  return gbpFetch(`/accounts/${accountId}/locations/${locationId}/reviews?pageSize=${pageSize}`);
}

export async function replyToReview(accountId, locationId, reviewId, replyText) {
  return gbpFetch(`/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`, {
    method: "PUT",
    body: JSON.stringify({ comment: replyText }),
  });
}

export async function deleteReviewReply(accountId, locationId, reviewId) {
  return gbpFetch(`/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`, {
    method: "DELETE",
  });
}

export async function createPost(accountId, locationId, { summary, callToActionType, callToActionUrl, mediaUrl } = {}) {
  const body = { languageCode: "en-US", summary };
  if (callToActionType) body.callToAction = { actionType: callToActionType, url: callToActionUrl };
  if (mediaUrl) body.media = [{ mediaFormat: "PHOTO", sourceUrl: mediaUrl }];
  return gbpFetch(`/accounts/${accountId}/locations/${locationId}/localPosts`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
