const DEFAULT_API_BASE_URL = "http://localhost:8000";
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const API_BASE_URL = RAW_BASE_URL.endsWith("/")
  ? RAW_BASE_URL.slice(0, -1)
  : RAW_BASE_URL;

export async function getPosts() {
  // Backend response envelope:
  // { success: true/false, message: string, data: [...] }
  const res = await fetch(`${API_BASE_URL}/posts`, { method: "GET" });
  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to load posts.");
  }

  if (!payload?.success) {
    throw new Error(payload?.message || "Failed to load posts.");
  }

  return payload?.data || [];
}
