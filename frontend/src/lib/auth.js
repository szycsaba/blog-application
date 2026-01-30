// Simple authentication helpers for the frontend.
// This project uses Bearer tokens returned by the backend login endpoint.

const DEFAULT_API_BASE_URL = "http://localhost:8000";
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const API_BASE_URL = RAW_BASE_URL.endsWith("/")
  ? RAW_BASE_URL.slice(0, -1)
  : RAW_BASE_URL;

export async function login(email, password) {
  // Backend response example:
  // { success: true/false, message: string, data: { ...userFields, token } }
  const res = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(payload?.message || "Login failed.");
  }

  if (!payload?.success) {
    throw new Error(payload?.message || "Login failed.");
  }

  const data = payload?.data;
  const token = data?.token;

  if (!token) {
    throw new Error("Backend did not return a token for login.");
  }

  // Persist token and user (without token) in localStorage.
  localStorage.setItem("token", token);

  const { token: _ignored, ...user } = data;
  localStorage.setItem("user", JSON.stringify(user));

  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
