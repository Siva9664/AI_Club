export class ApiError extends Error {
  public status: number;
  public data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const isMockMode = (): boolean => {
  const envVal = import.meta.env.VITE_USE_MOCK;
  if (envVal === undefined || envVal === null) return true;
  return envVal !== 'false' && envVal !== false;
};

export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || '/api/v1';
};

/**
 * Simulates a realistic network roundtrip delay in mock mode
 */
export const simulateDelay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  params?: Record<string, any>
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = new URL(`${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        url.searchParams.append(key, String(val));
      }
    });
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  try {
    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }

      let message = `API Request failed with status ${response.status}`;
      if (response.status === 400) {
        message = errorBody?.message || 'Bad Request: Please check your query parameters.';
      } else if (response.status === 401) {
        message = 'Unauthorized: Authentication required.';
      } else if (response.status === 404) {
        message = errorBody?.message || 'Resource not found.';
      } else if (response.status === 422) {
        message = errorBody?.message || 'Unprocessable entity: Validation error.';
      } else if (response.status === 429) {
        message = 'Too many requests. Please try again in a few moments.';
      } else if (response.status >= 500) {
        message = 'Internal server error. Please try again shortly.';
      }

      throw new ApiError(message, response.status, errorBody);
    }

    return (await response.json()) as T;
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(err?.message || 'Network connection error', 0, err);
  }
}

export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, any>) => request<T>(endpoint, { method: 'GET' }, params),
  post: <T>(endpoint: string, body: any) => request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: any) => request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: any) => request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};