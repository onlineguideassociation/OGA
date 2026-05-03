import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const WP_BASE = process.env.WP_URL
  ? `${process.env.WP_URL.replace(/\/$/, "")}/wp-json/wp/v2`
  : "https://onlineguideassociation.org/wp-json/wp/v2";

function authHeaders() {
  const user = process.env.WP_USERNAME || "";
  const pass = process.env.WP_APP_PASSWORD || "";
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

async function wpFetch(path, options = {}) {
  const res = await fetch(`${WP_BASE}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`WordPress API ${res.status}: ${body}`);
  }
  return res.json();
}

export async function getPosts({ page = 1, perPage = 10, status = "publish" } = {}) {
  return wpFetch(`/posts?page=${page}&per_page=${perPage}&status=${status}`);
}

export async function getPost(id) {
  return wpFetch(`/posts/${id}`);
}

export async function getPages({ page = 1, perPage = 10 } = {}) {
  return wpFetch(`/pages?page=${page}&per_page=${perPage}`);
}

export async function createPost({ title, content, status = "draft", categories = [], tags = [] }) {
  return wpFetch("/posts", {
    method: "POST",
    body: JSON.stringify({ title, content, status, categories, tags }),
  });
}

export async function updatePost(id, fields) {
  return wpFetch(`/posts/${id}`, {
    method: "POST",
    body: JSON.stringify(fields),
  });
}

export async function getCategories() {
  return wpFetch("/categories?per_page=100");
}

export async function syncTourToWordPress({ name, description, price, imageUrl, categoryId }) {
  return createPost({
    title: name,
    content: `<p>${description}</p><p><strong>Price:</strong> $${price}</p>${imageUrl ? `<img src="${imageUrl}" alt="${name}" />` : ""}`,
    status: "publish",
    categories: categoryId ? [categoryId] : [],
  });
}

export async function testConnection() {
  try {
    const data = await wpFetch("/posts?per_page=1");
    return { connected: true, endpoint: WP_BASE, posts: Array.isArray(data) ? data.length : 0 };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}
