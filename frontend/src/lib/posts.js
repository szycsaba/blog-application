// Simple posts/comments helpers for the frontend.
// Backend envelope: { success: true/false, message: string, data: ... }

const DEFAULT_API_BASE_URL = "http://localhost:8000";
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const API_BASE_URL = RAW_BASE_URL.endsWith("/")
  ? RAW_BASE_URL.slice(0, -1)
  : RAW_BASE_URL;

function getToken() {
  return localStorage.getItem("token");
}

async function parsePayload(res) {
  return await res.json().catch(() => null);
}

function assertOk(res, payload) {
  if (!res.ok || !payload?.success) {
    throw new Error(payload?.message || "");
  }
}

export async function getPosts() {
  const res = await fetch(`${API_BASE_URL}/posts`, { method: "GET" });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || [];
}

export async function getPost(id) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, { method: "GET" });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || null;
}

export async function getPostForEdit(id) {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_BASE_URL}/posts/${id}/edit`, {
    method: "GET",
    headers,
  });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || null;
}

export async function createPost(title, content) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ title, content }),
  });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || null;
}

export async function updatePost(id, title, content) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ title, content }),
  });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || null;
}

export async function deletePost(id) {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers,
  });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || null;
}

// Public endpoint (guest allowed). If token exists, we send it too.
export async function createComment(postId, comment) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify({ comment }),
  });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || null;
}

export async function deleteComment(id) {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: "DELETE",
    headers,
  });
  const payload = await parsePayload(res);
  assertOk(res, payload);
  return payload?.data || null;
}

