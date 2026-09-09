import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import templateApi from "../services/templateApi";

const TemplateContext = createContext(null);

/**
 * Pushes a template's settings onto document.documentElement as CSS
 * custom properties, so any component in the app can just use
 * var(--primary-color) etc. without re-rendering the whole tree.
 */
function applySettingsToDocument(settings) {
  if (!settings) return;
  const root = document.documentElement;
  root.style.setProperty("--primary-color", settings.primaryColor);
  root.style.setProperty("--accent-color", settings.accentColor);
  root.style.setProperty("--background-color", settings.backgroundColor);
  root.style.setProperty("--font-family", settings.fontFamily);
  root.setAttribute("data-theme", settings.colorTheme);
  root.setAttribute("data-layout", settings.layoutStyle);
  root.setAttribute("data-nav-position", settings.navigationPosition);
  root.setAttribute("data-font-size", settings.fontSize);
  root.setAttribute("data-card-density", settings.cardDensity);
}

export function TemplateProvider({ studentId, children }) {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [allTemplates, setAllTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [active, templates] = await Promise.all([
        templateApi.getActiveTemplate(studentId),
        templateApi.getTemplatesForStudent(studentId),
      ]);
      setActiveTemplate(active);
      setAllTemplates(templates);
      applySettingsToDocument(active.settings);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const selectTemplate = useCallback(
    async (templateId) => {
      const updated = await templateApi.selectTemplate(studentId, templateId);
      setActiveTemplate(updated);
      applySettingsToDocument(updated.settings);
      await refresh();
      return updated;
    },
    [studentId, refresh]
  );

  const customizeTemplate = useCallback(
    async ({ name, basedOnTemplateId, settings }) => {
      const updated = await templateApi.customizeTemplate(studentId, {
        name,
        basedOnTemplateId,
        settings,
      });
      setActiveTemplate(updated);
      applySettingsToDocument(updated.settings);
      await refresh();
      return updated;
    },
    [studentId, refresh]
  );

  const restoreDefault = useCallback(async () => {
    const def = await templateApi.restoreDefault(studentId);
    setActiveTemplate(def);
    applySettingsToDocument(def.settings);
    await refresh();
    return def;
  }, [studentId, refresh]);

  const value = useMemo(
    () => ({
      activeTemplate,
      allTemplates,
      loading,
      error,
      selectTemplate,
      customizeTemplate,
      restoreDefault,
      refresh,
    }),
    [activeTemplate, allTemplates, loading, error, selectTemplate, customizeTemplate, restoreDefault, refresh]
  );

  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return ctx;
}
