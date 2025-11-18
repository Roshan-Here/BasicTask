import { ApiError } from "@/types/client";


function buildQuery(params?: Record<string, any>): string {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    const err: ApiError = { message, status: res.status };
    throw err;
  }
  return res.json();
}

export const apiClient = {
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const fullUrl = `${url}${buildQuery(params)}`;
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    return handleResponse<T>(res);
  },

  async post<T>(url: string, body: any): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  },
};
