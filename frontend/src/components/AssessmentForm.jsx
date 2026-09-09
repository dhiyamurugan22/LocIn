import React, { useState } from "react";

export default function AssessmentForm({ questions, onSubmit, submitting }) {
  const [answers, setAnswers] = useState({});

  const allAnswered = questions.every((q) => (answers[q.questionId] || "").trim().length > 0);

  return (
    <div>
      {questions.map((q, i) => (
        <div className="assessment-question" key={q.questionId}>
          <p>
            {i + 1}. {q.prompt}
          </p>
          <input
            type="text"
            placeholder="Your answer"
            value={answers[q.questionId] || ""}
            onChange={(e) => setAnswers({ ...answers, [q.questionId]: e.target.value })}
          />
        </div>
      ))}
      <button
        className="primary-btn"
        disabled={!allAnswered || submitting}
        onClick={() => onSubmit(answers)}
      >
        {submitting ? "Grading…" : "Submit assessment"}
      </button>
    </div>
  );
}
