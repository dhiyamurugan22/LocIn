# Template Customization Module

A self-contained module for the EduApp learning platform that gives every
student a personalized application interface — without ever touching
learning content, courses, assessments, or academic functionality.

Part of the same platform as the AI Chat Assistant and Algorithm Learning
modules, and built with the same stack: **React + Spring Boot + MongoDB**.

## What it does

- **Default template** — every student automatically gets a consistent
  default interface from day one.
- **Suggested templates** — a gallery of pre-designed templates (layout,
  color theme, density, etc.) that a student can use as-is.
- **Customization** — a student can personalize the default or any
  suggested template: layout style, navigation position, dashboard view,
  color theme, primary/accent/background colors, font size, card density,
  and more.
- **Personal template** — customizations are saved as the student's own
  template and automatically re-applied whenever they log back in.
- **Switch anytime** — students can swap between suggested templates,
  tweak their saved customization further, or restore the original
  default with one click.
- **Appearance-only** — the module only ever modifies presentation. It
  has no access to, and makes no changes to, courses, assessments, or
  any other academic data.

## Project structure

```
template-customization-module/
├── backend/                Spring Boot service (Java 17, Maven)
│   └── src/main/java/com/eduapp/templatecustomization/
│       ├── model/           Template, TemplateSettings, TemplateType,
│       │                    StudentTemplatePreference
│       ├── repository/      Spring Data MongoDB repositories
│       ├── service/         TemplateService — all business logic
│       ├── controller/      TemplateController — REST API
│       ├── dto/             Request/response payloads
│       ├── config/          Seeding of default+suggested templates, CORS, auditing
│       └── exception/       Centralized error handling
└── frontend/                React app (Create React App)
    └── src/
        ├── components/TemplateCustomization/
        │   ├── TemplateCustomizationPage.js   Top-level entry component
        │   ├── TemplateGallery.js             Browse default/suggested/own templates
        │   ├── TemplateCard.js                Single template preview card
        │   ├── TemplateCustomizer.js          Personalization form
        │   └── TemplateCustomization.css
        ├── context/TemplateContext.js         Loads + applies active template as CSS vars
        └── services/templateApi.js            API client
```

## Backend API

Base path: `/api/templates`

| Method | Endpoint                                    | Description                                                        |
|--------|----------------------------------------------|----------------------------------------------------------------------|
| GET    | `/default`                                   | The single system default template                                 |
| GET    | `/suggested`                                 | The gallery of pre-designed templates                               |
| GET    | `/student/{studentId}`                       | All templates available to a student, flagged with which is active  |
| GET    | `/student/{studentId}/active`                | The student's currently active template                             |
| POST   | `/student/{studentId}/select`                | Activate the default, a suggested template, or the student's own custom template, as-is |
| PUT    | `/student/{studentId}/customize`             | Save personalization as the student's own template and activate it  |
| POST   | `/student/{studentId}/restore-default`       | Switch the student back to the original default template            |

### Example: personalize a template

```http
PUT /api/templates/student/stu_123/customize
Content-Type: application/json

{
  "name": "My Study Theme",
  "basedOnTemplateId": "<default-or-suggested-template-id>",
  "settings": {
    "layoutStyle": "compact",
    "navigationPosition": "left",
    "dashboardView": "grid",
    "colorTheme": "dark",
    "primaryColor": "#818CF8",
    "accentColor": "#34D399",
    "backgroundColor": "#111827",
    "fontFamily": "Inter",
    "fontSize": "medium",
    "cardDensity": "comfortable",
    "showWelcomeBanner": true
  }
}
```

The base default/suggested template is **never modified** — only the
student's own personal (`CUSTOM`) copy is created or updated.

## Running locally

### Backend
```bash
cd backend
# requires MongoDB running locally (or set MONGODB_URI)
mvn spring-boot:run
```
Runs on `http://localhost:8083`.

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm start
```
Runs on `http://localhost:3000`.

## Integrating into the wider platform

The frontend piece is a single component:

```jsx
import TemplateCustomizationPage from "./components/TemplateCustomization/TemplateCustomizationPage";

<TemplateCustomizationPage studentId={currentUser.id} />
```

Drop it into a "Personalize" / "Appearance" tab in student settings.
`TemplateProvider` (used internally) also applies the active template as
CSS custom properties (`--primary-color`, `--accent-color`, etc.) and
`data-*` attributes on `<html>`, so the rest of the app's stylesheets can
react to the student's chosen template without any extra wiring.

The backend module can either run as its own Spring Boot service (as
scaffolded here) or have its packages merged into an existing Spring Boot
monolith alongside the AI Chat Assistant and Algorithm Learning modules —
it has no dependency on either of those modules.
