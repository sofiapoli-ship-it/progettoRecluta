// lib/api/api.ts

const API_BASE_URL = "https://api.twitter.server.jetop.com/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function apiFetch<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
    token?: string;
  } = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // niente body (es. 204) → lascio data = null
  }

  if (!res.ok) {
    const message = data?.error || data?.message || `Errore API (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}