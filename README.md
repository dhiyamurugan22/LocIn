LockIn
🎓 Student Learning Hub

A unified learning platform designed for students to improve their programming, problem-solving, language skills, and academic knowledge in one place.

The main idea is to bring the useful features of platforms like GeeksforGeeks, LeetCode, and Duolingo into a single student-friendly application.

🚀 Project Overview

Students often use multiple applications and websites to learn different skills.

For example:

- GeeksforGeeks → Programming concepts and tutorials
- LeetCode → Coding problems and problem-solving
- Duolingo → Language learning

Instead of switching between multiple platforms, this project aims to provide a single learning dashboard where students can access different learning resources and track their progress.

🎯 Objectives

- Provide students with a centralized learning platform
- Improve programming and problem-solving skills
- Make learning interactive and engaging
- Track learning progress
- Encourage students to maintain a consistent learning habit
- Reduce the need to switch between multiple learning platforms

✨ Key Features

1. 📚 Learning Resources

Students can access learning materials based on different categories:

- Programming
- Data Structures & Algorithms
- Web Development
- Computer Science Fundamentals
- Languages
- Other academic resources

2. 💻 Coding Practice

A dedicated coding section can provide:

- Programming problems
- Difficulty levels
- Topic-wise questions
- Practice challenges
- Problem-solving progress

The system can integrate or redirect users to existing coding platforms such as LeetCode and GeeksforGeeks.

3. 🌎 Language Learning

A language-learning section inspired by applications such as Duolingo can include:

- Vocabulary practice
- Daily lessons
- Quizzes
- Pronunciation practice
- Streak tracking
- Progress tracking

4. 📊 Student Dashboard

The dashboard gives students an overview of their learning activity.

It can display:

- Daily learning time
- Completed lessons
- Coding problems solved
- Current streak
- Overall progress
- Learning goals

5. 🔥 Streak & Motivation System

To encourage consistency, the application can include:

- Daily streaks
- XP points
- Badges
- Achievement levels
- Daily goals

6. 🎯 Personalized Learning

The application can recommend learning activities based on:

- Student interests
- Previous performance
- Completed topics
- Difficulty level
- Learning goals

🏗️ Basic System Structure

                    STUDENT
                       │
                       ▼
              ┌─────────────────┐
              │    Dashboard    │
              └────────┬────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Programming      Languages      Academics
        │              │              │
        ▼              ▼              ▼
   Coding Practice   Lessons       Resources
        │
        ▼
 External Platforms
 ┌───────────┬──────────────┐
 │ LeetCode  │ GeeksforGeeks│
 └───────────┴──────────────┘

🛠️ Technologies

The technology stack can be selected based on the project requirements.

Frontend

- HTML
- CSS
- JavaScript
- React.js (optional)

Backend

- Java / Python / Node.js

Database

- MySQL / MongoDB

APIs & Integrations

The application can use APIs or official integration methods where available to connect external learning services.

«Note: External platforms should be integrated only through their available official APIs, links, or permitted methods.»

👥 Target Users

This application is mainly designed for:

- College students
- School students
- Programming beginners
- Competitive programming learners
- Students preparing for placements
- Students learning new languages

🌟 Future Enhancements

Future versions can include:

- AI-based learning recommendations
- AI doubt-solving assistant
- Resume-building section
- Placement preparation
- Mock interviews
- Leaderboards
- Study groups
- Peer-to-peer learning
- Gamified challenges
- College-specific learning communities
- Notifications and reminders

📌 Expected Outcome

The final application will act as a centralized student learning hub, helping students manage multiple learning activities from a single platform.

Instead of using separate applications for coding, programming concepts, language learning, and progress tracking, students can access these features through one unified interface.

📄 Conclusion

Student Learning Hub aims to make learning more organized, interactive, and consistent.

By combining coding practice, educational resources, language learning, progress tracking, and gamification, the project provides students with a single platform to develop their skills and achieve their learning goals.

---

# Course Learning Module

A structured, personalized, mastery-based learning experience: every student sees
the same complete course content, but picks **Easy / Medium / Hard** teaching depth
independently for each module, must clear an **80% mastery bar** on a fill-in-the-answer
assessment to unlock the next module, and is asked to pick a level again every time
they revisit a module.

Stack: **React** (frontend) · **Spring Boot** (backend) · **MongoDB** (database).

## How the spec maps to the code

| Requirement | Where it lives |
|---|---|
| Same content for every student, level only changes depth | `CourseModule.contentByLevel` holds all 3 levels for every module; nothing is ever filtered by level, only which variant is *served* changes (`ModuleService.getContent`) |
| Level chosen per-module, independently | `StudentModuleProgress` is one document per `(studentId, moduleId)`; `selectedLevel` lives there, not on the student or course |
| Fill-in-the-answer assessment | `AssessmentQuestion.prompt` + `acceptableAnswers`; graded in `AssessmentService.submit` (case-insensitive, trimmed match) |
| 80% mastery to unlock next module | `app.mastery-threshold` in `application.properties` (default `0.8`), enforced in `AssessmentService.submit` and checked by `ModuleService.isModuleUnlocked` |
| Below 80% ⇒ stay locked, can retry | Failing an attempt just doesn't flip `masteryAchieved`; the module stays open for review and re-attempts (attempts are appended to history, not overwritten) |
| Revisiting a module re-asks the level | The level selector is shown every time a module is opened, regardless of completion status; `ModuleService.getContent` overwrites `selectedLevel` on every visit |

## Project layout

```
course-learning-module/
├── backend/     Spring Boot + MongoDB REST API
└── frontend/    React app
```

## Running it locally

### 1. MongoDB

Have a MongoDB instance reachable (local install, Docker, or Atlas). By default the
backend points at `mongodb://localhost:27017/course_learning_module` — change
`spring.data.mongodb.uri` in `backend/src/main/resources/application.properties`
if yours is different.

```bash
docker run -d -p 27017:27017 --name clm-mongo mongo:7
```

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run   # or: mvn spring-boot:run
```

Starts on `http://localhost:8080`. On first run, `DataSeeder` seeds one demo course
("Data Structures Fundamentals") with three modules — Arrays, Linked Lists, Stacks —
each fully authored at all three levels, so the whole flow (level pick → content →
assessment → mastery gating → unlock) works immediately with no manual setup.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Starts on `http://localhost:3000` and talks to the backend at
`http://localhost:8080/api` by default. To point at a different backend, create
`frontend/.env.local` with:

```
REACT_APP_API_BASE=http://your-backend-host:8080/api
```

## API summary

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/courses` | List all courses |
| GET | `/api/courses/{courseId}/modules?studentId=` | Modules with lock/mastery status for this student |
| GET | `/api/modules/{moduleId}/content?studentId=&level=EASY\|MEDIUM\|HARD` | Content at the chosen level; records the choice |
| GET | `/api/modules/{moduleId}/assessment/questions?studentId=` | Fill-in-the-answer prompts (no answers) |
| POST | `/api/modules/{moduleId}/assessment/submit` | `{ studentId, answers: { questionId: answer } }` → score + mastery result |

A locked module returns HTTP `423 Locked` with an explanatory message.

## Notes / MVP simplifications

- There's no login system in this build — each browser gets a random, persistent
  `studentId` in `localStorage` (see `frontend/src/api/client.js`). Swap in real
  auth by replacing that one function; nothing else needs to change.
- Only one demo course is seeded. Add more by extending `DataSeeder`, or wiring up
  an admin/authoring API on top of the existing `Course` / `CourseModule` models.

