import React from "react";

const LEVELS = ["EASY", "MEDIUM", "HARD"];
const LABELS = { EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" };
const NOTES = {
  EASY: "Simple language and step-by-step examples — good for a first pass.",
  MEDIUM: "A balance of plain explanation and technical detail.",
  HARD: "Full technical depth, edge cases, and implementation detail.",
};

export default function LevelSelector({ level, onChange }) {
  return (
    <>
      <div className="level-select">
        {LEVELS.map((l) => (
          <button
            key={l}
            className={l === level ? "active" : ""}
            onClick={() => onChange(l)}
          >
            {LABELS[l]}
          </button>
        ))}
      </div>
      <p className="level-note">{NOTES[level]}</p>
    </>
  );
}
