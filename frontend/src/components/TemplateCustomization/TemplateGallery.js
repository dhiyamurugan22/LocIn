import React from "react";
import { useTemplate } from "../../context/TemplateContext";
import TemplateCard from "./TemplateCard";
import "./TemplateCustomization.css";

export default function TemplateGallery({ onCustomize }) {
  const { allTemplates, activeTemplate, selectTemplate, restoreDefault, loading, error } = useTemplate();

  if (loading) return <div className="tc-status">Loading templates…</div>;
  if (error) return <div className="tc-status tc-status--error">Couldn't load templates. Please try again.</div>;

  const defaultTemplate = allTemplates.find((t) => t.type === "DEFAULT");
  const suggested = allTemplates.filter((t) => t.type === "SUGGESTED");
  const custom = allTemplates.filter((t) => t.type === "CUSTOM");

  return (
    <div className="tc-gallery">
      <div className="tc-gallery__header">
        <h2>Choose your interface</h2>
        <p>Pick the default look, a ready-made template, or your own saved template. You can customize any of them.</p>
        {activeTemplate && activeTemplate.type !== "DEFAULT" && (
          <button type="button" className="tc-btn tc-btn--link" onClick={() => restoreDefault()}>
            Restore original default template
          </button>
        )}
      </div>

      {defaultTemplate && (
        <section className="tc-gallery__section">
          <h3>Default</h3>
          <div className="tc-gallery__grid">
            <TemplateCard
              template={defaultTemplate}
              isActive={activeTemplate?.id === defaultTemplate.id}
              onSelect={selectTemplate}
              onCustomize={onCustomize}
            />
          </div>
        </section>
      )}

      {custom.length > 0 && (
        <section className="tc-gallery__section">
          <h3>Your saved template</h3>
          <div className="tc-gallery__grid">
            {custom.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                isActive={activeTemplate?.id === t.id}
                onSelect={selectTemplate}
                onCustomize={onCustomize}
              />
            ))}
          </div>
        </section>
      )}

      <section className="tc-gallery__section">
        <h3>Suggested templates</h3>
        <div className="tc-gallery__grid">
          {suggested.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              isActive={activeTemplate?.id === t.id}
              onSelect={selectTemplate}
              onCustomize={onCustomize}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
