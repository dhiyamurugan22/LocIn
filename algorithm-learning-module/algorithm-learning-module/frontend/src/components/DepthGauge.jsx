import "./DepthGauge.css";

const LEVELS = [
  { key: "EASY", label: "Easy", detail: "Plain language" },
  { key: "MEDIUM", label: "Medium", detail: "+ pseudocode" },
  { key: "HARD", label: "Hard", detail: "+ edge cases" },
];

/**
 * Renders explanation depth as a literal gauge with three graduated
 * marks, rather than a generic pill/segmented toggle. Choosing a level
 * only changes the reading on this instrument - it never removes an
 * algorithm from the list above.
 */
export default function DepthGauge({ value, onChange }) {
  const activeIndex = LEVELS.findIndex((l) => l.key === value);

  return (
    <div className="depth-gauge" role="radiogroup" aria-label="Explanation depth">
      <div className="depth-gauge__track">
        <div
          className="depth-gauge__fill"
          style={{ width: `${(activeIndex / (LEVELS.length - 1)) * 100}%` }}
        />
        {LEVELS.map((level, i) => (
          <button
            key={level.key}
            type="button"
            role="radio"
            aria-checked={value === level.key}
            className={`depth-gauge__notch ${i <= activeIndex ? "is-filled" : ""} ${
              value === level.key ? "is-active" : ""
            }`}
            style={{ left: `${(i / (LEVELS.length - 1)) * 100}%` }}
            onClick={() => onChange(level.key)}
          >
            <span className="depth-gauge__dot" />
          </button>
        ))}
      </div>
      <div className="depth-gauge__labels">
        {LEVELS.map((level) => (
          <button
            key={level.key}
            type="button"
            className={`depth-gauge__label ${value === level.key ? "is-active" : ""}`}
            onClick={() => onChange(level.key)}
          >
            <span className="depth-gauge__label-name">{level.label}</span>
            <span className="depth-gauge__label-detail">{level.detail}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
