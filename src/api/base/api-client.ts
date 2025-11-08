/**
 * Base API Client - لایه پایه برای تمام API calls
 * Functional و SOLID design
 */

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiCallOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

/**
 * Get API base URL based on environment
 */
function getApiBase(): string {
  return import.meta.env.DEV ? "/api/discourse" : "https://aliasysdiscourse.ir";
}

/**
 * Get fetch options based on environment
 */
function getFetchOptions(options?: ApiCallOptions): RequestInit {
  const isDev = import.meta.env.DEV;

  return {
    method: options?.method || "GET",
    mode: isDev ? "same-origin" : "cors",
    credentials: "include",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    signal: options?.signal,
  };
}

/**
 * Base API call function
 * Generic function for all API calls with loading and error handling
 */
export async function apiCall<T>(
  endpoint: string,
  options?: ApiCallOptions
): Promise<ApiResponse<T>> {
  const apiBase = getApiBase();
  const url = `${apiBase}${endpoint}`;
  const fetchOptions = getFetchOptions(options);

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();

    return {
      data,
      loading: false,
      error: null,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "خطای ناشناخته در ارتباط با سرور";

    return {
      data: null,
      loading: false,
      error: errorMessage,
    };
  }
}

/**
 * Create abort controller for canceling requests
 */
export function createAbortController(): AbortController {
  return new AbortController();
}
