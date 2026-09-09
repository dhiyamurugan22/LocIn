# AI Chat Assistant Module 🤖

A connected **AI Chat Assistant + Translation** module for an e-learning platform.

## Features

- 💬 Students can ask doubts to the AI.
- 🧠 AI explains concepts clearly.
- 💻 Clears programming & algorithm doubts.
- 📚 Helps with course-related doubts.
- 🔄 Re-explains in a simpler way when the student doesn't understand.
- 🎓 Adapts explanation to the student's learning level/background.
- 🌐 Translates the AI response into the student's selected language.
- ⚙️ Uses the language already saved in settings — no need to pick it every time.
- 🔁 Language can be changed anytime from settings.

## Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | React                              |
| Backend     | Spring Boot (Java)                 |
| Database    | MongoDB                            |
| AI Provider | Google Gemini API / OpenAI API (switchable) |

## Project Structure

```
ai-chat-assistant-module/
├── backend/
│   └── src/main/java/com/eduapp/aichat/
│       ├── AiChatAssistantApplication.java
│       ├── config/AiConfig.java
│       ├── controller/ChatController.java
│       ├── dto/ (request & response DTOs)
│       ├── model/ (ChatMessage, StudentProfile, LanguagePreference)
│       ├── repository/ (Mongo repositories)
│       └── service/ (AIService, GeminiService, OpenAiService, TranslationService, ChatService)
├── frontend/
│   └── src/
│       ├── components/ChatAssistant/ (ChatAssistant.jsx, ChatAssistant.css, LanguageSelector.jsx)
│       └── services/chatApi.js
└── README.md
```

## Backend Setup

1. `cd backend`
2. Set environment variables (or edit `application.properties`):
   ```
   MONGODB_URI=mongodb://localhost:27017/aichatdb
   AI_PROVIDER=gemini          # or openai
   GEMINI_API_KEY=your_gemini_key
   OPENAI_API_KEY=your_openai_key
   ```
3. Run: `./mvnw spring-boot:run`
4. API runs on `http://localhost:8080`

### Key Endpoints

| Method | Endpoint                          | Description                              |
|--------|-------------------------------------|-------------------------------------------|
| POST   | `/api/chat/ask`                    | Ask a doubt, get AI answer (translated if language is set) |
| POST   | `/api/chat/simplify`               | Re-explain the last answer in a simpler way |
| GET    | `/api/chat/history/{studentId}`    | Get chat history for a student            |
| GET    | `/api/settings/language/{studentId}` | Get saved translation language           |
| PUT    | `/api/settings/language/{studentId}` | Update translation language               |

## Frontend Setup

1. `cd frontend`
2. `npm install`
3. `npm start`
4. Set `REACT_APP_API_BASE_URL` in `.env` (defaults to `http://localhost:8080/api`)

## Push This Module to GitHub

```bash
cd ai-chat-assistant-module
git init
git add .
git commit -m "Add AI Chat Assistant + Translation module"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If this module needs to go into an **existing** repo as a folder instead of its own repo:

```bash
cd your-existing-repo
cp -r /path/to/ai-chat-assistant-module ./ai-chat-assistant-module
git add ai-chat-assistant-module
git commit -m "Add AI Chat Assistant + Translation module"
git push
```
