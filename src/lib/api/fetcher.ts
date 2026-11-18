import { envConfig } from "@/lib/env-config";

export class ApiError extends Error {
  status: number;
  /** Seconds until the client may retry, when the API sends Retry-After / RateLimit-Reset. */
  retryAfterSeconds?: number;

  constructor(message: string, status: number, retryAfterSeconds?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

function retryAfterFromHeaders(headers: Headers): number | undefined {
  const retryAfter = headers.get("Retry-After");
  if (retryAfter) {
    const asNumber = Number(retryAfter);
    if (Number.isFinite(asNumber) && asNumber >= 0) return Math.ceil(asNumber);
    const asDate = Date.parse(retryAfter);
    if (!Number.isNaN(asDate)) {
      return Math.max(0, Math.ceil((asDate - Date.now()) / 1000));
    }
  }

  const reset = headers.get("RateLimit-Reset") || headers.get("X-RateLimit-Reset");
  if (!reset) return undefined;

  const value = Number(reset);
  if (!Number.isFinite(value) || value < 0) return undefined;
  // draft-7 uses a unix timestamp; draft-6 uses remaining seconds.
  if (value > 1_000_000_000) return Math.max(0, Math.ceil(value - Date.now() / 1000));
  return Math.ceil(value);
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type NextFetchOptions = {
  url: string;
  method?: HttpMethod;
  payload?: unknown;
  /** Server-side Bearer token. Omit on the client; the HttpOnly cookie is sent with credentials. */
  token?: string | null;
  headers?: HeadersInit;
  /** Next.js fetch cache mode. Used when this runs on the server. */
  cache?: RequestCache;
  /** Next.js fetch revalidation. Used when this runs on the server. */
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  signal?: AbortSignal;
};

async function resolveUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const { apiBaseUrl } = await envConfig();
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${apiBaseUrl}${path}`;
}

export async function nextFetch<T = unknown>({
  url,
  method = "GET",
  payload,
  token,
  headers,
  cache,
  next,
  signal,
}: NextFetchOptions): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (payload !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(await resolveUrl(url), {
    method,
    headers: requestHeaders,
    credentials: "include",
    body: payload === undefined ? undefined : JSON.stringify(payload),
    cache,
    next,
    signal,
  });

  if (!response.ok) {
    let message = "An error occurred while fetching the data.";
    try {
      const body = await response.json();
      if (body && typeof body.message === "string") message = body.message;
    } catch {
      // The body was not JSON.
    }
    throw new ApiError(message, response.status, retryAfterFromHeaders(response.headers));
  }

  if (response.status === 204) return null as T;
  return response.json() as Promise<T>;
}

/** GET fetcher for `SWRConfig`. The cache key is the API path. */
export function swrFetcher<T>(key: string) {
  return nextFetch<T>({ url: key });
}
