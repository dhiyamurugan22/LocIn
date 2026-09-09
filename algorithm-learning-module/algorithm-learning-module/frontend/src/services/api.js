const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

async function handleResponse(response) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with status ${response.status}`);
  }
  return response.json();
}

/** Every student receives this exact same list - never filtered by level. */
export function fetchAllAlgorithms() {
  return fetch(`${BASE_URL}/algorithms`).then(handleResponse);
}

/** Fetch one algorithm rendered at the given depth (EASY | MEDIUM | HARD). */
export function fetchAlgorithm(slug, level) {
  return fetch(`${BASE_URL}/algorithms/${slug}?level=${level}`).then(handleResponse);
}

export function fetchStudent(studentId) {
  return fetch(`${BASE_URL}/students/${studentId}`).then(handleResponse);
}

/** Can be called at any time to switch depth - no restriction on direction. */
export function updatePreferredLevel(studentId, level) {
  return fetch(`${BASE_URL}/students/${studentId}/preference`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preferredLevel: level }),
  }).then(handleResponse);
}
