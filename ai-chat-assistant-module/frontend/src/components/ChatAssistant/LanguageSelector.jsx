import React from "react";

const LANGUAGES = [
  "English",
  "Tamil",
  "Hindi",
  "Telugu",
  "Kannada",
  "Malayalam",
  "French",
  "Spanish",
];

/**
 * ⚙️ Shows the language saved in settings.
 * 🔁 Lets the student change it any time — change here updates settings
 *    so future chats use it automatically, without asking every time.
 */
export default function LanguageSelector({ value, onChange, compact = false }) {
  return (
    <div className={`language-selector ${compact ? "compact" : ""}`}>
      {!compact && <label htmlFor="language-select">Response language</label>}
      <select
        id="language-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
