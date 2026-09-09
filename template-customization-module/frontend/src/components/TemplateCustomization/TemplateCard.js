import React from "react";
import "./TemplateCustomization.css";

export default function TemplateCard({ template, isActive, onSelect, onCustomize }) {
  const { name, description, previewImageUrl, settings, type } = template;

  return (
    <div className={`tc-card ${isActive ? "tc-card--active" : ""}`}>
      <div
        className="tc-card__preview"
        style={{
          background: settings?.backgroundColor,
          borderColor: settings?.primaryColor,
        }}
      >
        {previewImageUrl ? (
          <img src={previewImageUrl} alt={`${name} preview`} />
        ) : (
          <div className="tc-card__preview-placeholder">
            <span style={{ background: settings?.primaryColor }} />
            <span style={{ background: settings?.accentColor }} />
          </div>
        )}
        {isActive && <div className="tc-card__badge">Active</div>}
      </div>

      <div className="tc-card__body">
        <h4 className="tc-card__title">{name}</h4>
        {description && <p className="tc-card__desc">{description}</p>}
        <span className="tc-card__type">{type}</span>
      </div>

      <div className="tc-card__actions">
        <button
          type="button"
          className="tc-btn tc-btn--secondary"
          disabled={isActive}
          onClick={() => onSelect(template.id)}
        >
          {isActive ? "In use" : "Use as-is"}
        </button>
        <button
          type="button"
          className="tc-btn tc-btn--primary"
          onClick={() => onCustomize(template)}
        >
          Customize
        </button>
      </div>
    </div>
  );
}
