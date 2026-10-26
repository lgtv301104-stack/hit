import { getSession } from "@/lib/auth/session";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) throw new ApiError(0, "VITE_API_BASE_URL is not configured.");
  const token = getSession()?.token;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) throw new ApiError(res.status, (await res.text()) || res.statusText);
  return (await res.json()) as T;
}
