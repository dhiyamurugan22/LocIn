/**
 * LocIn Centralized API Configuration & Microservice Gateway Setup
 * Standardizes backend API endpoints, JWT authorization headers, and request handling.
 */

export const API_ENDPOINTS = {
  USER_SERVICE: '/api/user',
  AUTH_LOGIN: '/api/user/login',
  AUTH_REGISTER: '/api/user/register',
  AI_SERVICE: '/api/ai',
  AI_CHAT: '/api/ai/chat',
  ALGO_SERVICE: '/api/algo',
  ALGO_LIST: '/api/algo/algorithms',
};

/**
 * Returns authorization header with JWT bearer token if available.
 */
export function getAuthHeaders() {
  const token = localStorage.getItem('locin_auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Unified fetch wrapper with error handling and status code verification.
 */
export async function apiRequest(endpoint, options = {}) {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status}: ${response.statusText || errorText}`);
  }

  return await response.json();
}

export default {
  API_ENDPOINTS,
  getAuthHeaders,
  apiRequest,
};
