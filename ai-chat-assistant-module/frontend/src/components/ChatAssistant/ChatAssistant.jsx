import React, { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import {
  askDoubt,
  simplifyAnswer,
  getHistory,
  getPreferredLanguage,
  updatePreferredLanguage,
} from "../../services/chatApi";
import "./ChatAssistant.css";

/**
 * 🤖 AI Chat Assistant Module + 🌐 Translation Module, connected.
 *
 * Props:
 *  - studentId (required)
 *  - courseId (optional) — scopes doubts to a specific course
 */
export default function ChatAssistant({ studentId, courseId }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef(null);

  // Load saved language + history once on mount
  useEffect(() => {
    if (!studentId) return;
    getPreferredLanguage(studentId)
      .then((res) => setLanguage(res.preferredLanguage || "English"))
      .catch(() => {});
    getHistory(studentId)
      .then((history) => setMessages(history.reverse()))
      .catch(() => {});
  }, [studentId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    try {
      const response = await askDoubt({
        studentId,
        courseId,
        question,
        // ⚙️ no languageOverride sent — backend uses saved settings automatically
      });
      setMessages((prev) => [...prev, { ...response, question }]);
      setQuestion("");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { question, answer: "⚠️ Something went wrong. Please try again.", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 "Puriyala" button — re-explain in a simpler way
  const handleSimplify = async (messageId) => {
    if (!messageId || loading) return;
    setLoading(true);
    try {
      const response = await simplifyAnswer({ studentId, messageId });
      setMessages((prev) => [
        ...prev,
        { ...response, question: "(Simplify: please explain this again more simply)" },
      ]);
    } catch (err) {
      // fail silently in UI, could show a toast in production
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Change language anytime from settings
  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    try {
      await updatePreferredLanguage(studentId, newLanguage);
    } catch (err) {
      // keep UI value even if save fails; next load will resync
    }
  };

  return (
    <div className="chat-assistant">
      <div className="chat-assistant__header">
        <h3>🤖 AI Chat Assistant</h3>
        <button
          className="chat-assistant__settings-btn"
          onClick={() => setShowSettings((s) => !s)}
          aria-label="Translation settings"
        >
          🌐 {language}
        </button>
      </div>

      {showSettings && (
        <div className="chat-assistant__settings-panel">
          <LanguageSelector value={language} onChange={handleLanguageChange} />
          <p className="chat-assistant__settings-hint">
            This language is saved automatically — you won't need to pick it every time.
          </p>
        </div>
      )}

      <div className="chat-assistant__messages">
        {messages.length === 0 && (
          <div className="chat-assistant__empty">
            Ask any doubt about your course, concepts, or code — I'll explain it for you.
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={msg.messageId || idx} className="chat-assistant__pair">
            <div className="chat-assistant__bubble chat-assistant__bubble--student">
              {msg.question}
            </div>
            <div
              className={`chat-assistant__bubble chat-assistant__bubble--ai ${
                msg.error ? "chat-assistant__bubble--error" : ""
              }`}
            >
              {msg.answer}
              {!msg.error && msg.messageId && (
                <button
                  className="chat-assistant__simplify-btn"
                  onClick={() => handleSimplify(msg.messageId)}
                  disabled={loading}
                >
                  🔄 Puriyala? Explain simpler
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form className="chat-assistant__input-row" onSubmit={handleAsk}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your doubt here..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !question.trim()}>
          {loading ? "..." : "Ask"}
        </button>
      </form>
    </div>
  );
}
