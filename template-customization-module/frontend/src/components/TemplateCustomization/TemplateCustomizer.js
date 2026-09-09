import React, { useState } from "react";
import { useTemplate } from "../../context/TemplateContext";
import "./TemplateCustomization.css";

const LAYOUT_OPTIONS = ["standard", "compact", "spacious"];
const NAV_OPTIONS = ["left", "top", "right"];
const DASHBOARD_OPTIONS = ["grid", "list"];
const THEME_OPTIONS = ["light", "dark", "high-contrast", "custom"];
const FONT_SIZE_OPTIONS = ["small", "medium", "large"];
const DENSITY_OPTIONS = ["comfortable", "compact"];

export default function TemplateCustomizer({ baseTemplate, onDone, onCancel }) {
  const { customizeTemplate } = useTemplate();
  const [name, setName] = useState("My Template");
  const [settings, setSettings] = useState(baseTemplate.settings);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const update = (field, value) => setSettings((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await customizeTemplate({
        name,
        basedOnTemplateId: baseTemplate.id,
        settings,
      });
      onDone?.();
    } catch (e) {
      setSaveError("Couldn't save your customization. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="tc-customizer">
      <div className="tc-customizer__header">
        <h2>Customize your interface</h2>
        <p>Starting from: <strong>{baseTemplate.name}</strong>. This only changes appearance and layout — your courses and progress stay exactly as they are.</p>
      </div>

      <div className="tc-customizer__field">
        <label htmlFor="tc-name">Template name</label>
        <input
          id="tc-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />
      </div>

      <div className="tc-customizer__grid">
        <fieldset>
          <legend>Layout</legend>

          <label>Layout style</label>
          <select value={settings.layoutStyle} onChange={(e) => update("layoutStyle", e.target.value)}>
            {LAYOUT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>

          <label>Navigation position</label>
          <select value={settings.navigationPosition} onChange={(e) => update("navigationPosition", e.target.value)}>
            {NAV_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>

          <label>Dashboard view</label>
          <select value={settings.dashboardView} onChange={(e) => update("dashboardView", e.target.value)}>
            {DASHBOARD_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>

          <label className="tc-checkbox">
            <input
              type="checkbox"
              checked={settings.sidebarCollapsed}
              onChange={(e) => update("sidebarCollapsed", e.target.checked)}
            />
            Start with sidebar collapsed
          </label>
        </fieldset>

        <fieldset>
          <legend>Appearance</legend>

          <label>Color theme</label>
          <select value={settings.colorTheme} onChange={(e) => update("colorTheme", e.target.value)}>
            {THEME_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>

          <label>Primary color</label>
          <input type="color" value={settings.primaryColor} onChange={(e) => update("primaryColor", e.target.value)} />

          <label>Accent color</label>
          <input type="color" value={settings.accentColor} onChange={(e) => update("accentColor", e.target.value)} />

          <label>Background color</label>
          <input type="color" value={settings.backgroundColor} onChange={(e) => update("backgroundColor", e.target.value)} />

          <label>Font size</label>
          <select value={settings.fontSize} onChange={(e) => update("fontSize", e.target.value)}>
            {FONT_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </fieldset>

        <fieldset>
          <legend>Organization</legend>

          <label>Card density</label>
          <select value={settings.cardDensity} onChange={(e) => update("cardDensity", e.target.value)}>
            {DENSITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>

          <label className="tc-checkbox">
            <input
              type="checkbox"
              checked={settings.showWelcomeBanner}
              onChange={(e) => update("showWelcomeBanner", e.target.checked)}
            />
            Show welcome banner
          </label>
        </fieldset>
      </div>

      {saveError && <div className="tc-status tc-status--error">{saveError}</div>}

      <div className="tc-customizer__actions">
        <button type="button" className="tc-btn tc-btn--secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="button" className="tc-btn tc-btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save as my template"}
        </button>
      </div>
    </div>
  );
}
