const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

export async function askDoubt({ studentId, courseId, question, languageOverride }) {
  const res = await fetch(`${BASE_URL}/chat/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, courseId, question, languageOverride }),
  });
  if (!res.ok) throw new Error("Failed to get an answer");
  return res.json();
}

export async function simplifyAnswer({ studentId, messageId }) {
  const res = await fetch(`${BASE_URL}/chat/simplify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, messageId }),
  });
  if (!res.ok) throw new Error("Failed to simplify the answer");
  return res.json();
}

export async function getHistory(studentId) {
  const res = await fetch(`${BASE_URL}/chat/history/${studentId}`);
  if (!res.ok) throw new Error("Failed to load history");
  return res.json();
}

export async function getPreferredLanguage(studentId) {
  const res = await fetch(`${BASE_URL}/settings/language/${studentId}`);
  if (!res.ok) throw new Error("Failed to load language setting");
  return res.json();
}

export async function updatePreferredLanguage(studentId, language) {
  const res = await fetch(`${BASE_URL}/settings/language/${studentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language }),
  });
  if (!res.ok) throw new Error("Failed to update language setting");
  return res.json();
}
