import React from "react";
import TemplateCustomizationPage from "./components/TemplateCustomization/TemplateCustomizationPage";

// In the real platform, replace this with the actual logged-in student's id
// (e.g. from your auth context).
const DEMO_STUDENT_ID = "demo-student-1";

function App() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <TemplateCustomizationPage studentId={DEMO_STUDENT_ID} />
    </div>
  );
}

export default App;
