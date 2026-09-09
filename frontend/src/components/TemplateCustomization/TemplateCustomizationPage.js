import React, { useState } from "react";
import { TemplateProvider } from "../../context/TemplateContext";
import TemplateGallery from "./TemplateGallery";
import TemplateCustomizer from "./TemplateCustomizer";
import "./TemplateCustomization.css";

/**
 * Drop this component in wherever students manage their app appearance
 * (e.g. a "Personalize" tab in settings). It needs the logged-in
 * student's id; everything else — loading templates, tracking the
 * active one, saving customizations — is handled internally.
 *
 * Usage:
 *   <TemplateCustomizationPage studentId={currentUser.id} />
 */
export default function TemplateCustomizationPage({ studentId }) {
  return (
    <TemplateProvider studentId={studentId}>
      <TemplateCustomizationInner />
    </TemplateProvider>
  );
}

function TemplateCustomizationInner() {
  const [customizingTemplate, setCustomizingTemplate] = useState(null);

  if (customizingTemplate) {
    return (
      <TemplateCustomizer
        baseTemplate={customizingTemplate}
        onDone={() => setCustomizingTemplate(null)}
        onCancel={() => setCustomizingTemplate(null)}
      />
    );
  }

  return <TemplateGallery onCustomize={setCustomizingTemplate} />;
}
