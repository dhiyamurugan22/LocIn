# Algorithm Learning Module

Teaches the **full set of algorithms to every student**. Nothing is
gated or hidden by difficulty. Instead, each algorithm carries three
parallel explanations - **Easy**, **Medium**, **Hard** - and the
student's preferred level only changes *how deeply* an algorithm is
explained, never *which* algorithms they can see.

| Level  | What the student gets |
|--------|------------------------|
| Easy   | Plain language, a basic worked example, step-by-step walkthrough |
| Medium | + working principle, pseudocode, complexity analysis |
| Hard   | + implementation notes, edge cases, optimizations, deeper complexity analysis |

A student can switch levels at any time, in either direction. There is
no unlock/progression system - level is a preference, not a gate.

## Stack

- **Backend:** Java 17, Spring Boot 3, MongoDB
- **Frontend:** React 18, React Router

## Project structure

```
algorithm-learning-module/
├── backend/    Spring Boot REST API (Java)
│   └── src/main/java/com/lms/algolearn/
│       ├── model/         Algorithm, LevelContent, LearningLevel, Student
│       ├── repository/    Spring Data MongoDB repositories
│       ├── service/       AlgorithmService, StudentService
│       ├── controller/    REST endpoints
│       └── config/        CORS config + DataSeeder (sample content)
└── frontend/   React app
    └── src/
        ├── components/    Sidebar, DepthGauge (the level control)
        ├── pages/         AlgorithmDetailPage, EmptyState
        ├── hooks/         usePreferredLevel
        └── services/      api.js
```

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/algorithms` | Full algorithm list - identical for every student |
| GET | `/api/algorithms/{slug}?level=EASY\|MEDIUM\|HARD` | One algorithm, rendered at the requested depth |
| GET | `/api/students/{id}` | Fetch a student's profile (incl. preferred level) |
| PUT | `/api/students/{id}/preference` | Update preferred level, body: `{ "preferredLevel": "MEDIUM" }` |

## Running locally

### Backend

```bash
cd backend
# requires a local MongoDB on mongodb://localhost:27017, or set MONGODB_URI
./mvnw spring-boot:run
```

The API starts on `http://localhost:8080`. On first run, `DataSeeder`
populates three fully-authored sample algorithms (Bubble Sort, Binary
Search, Dijkstra's Algorithm) so the level-switching behavior is
demonstrable immediately.

### Frontend

```bash
cd frontend
cp .env.example .env.local   # adjust if the backend isn't on localhost:8080
npm install
npm start
```

Opens on `http://localhost:3000`.

## Adding a new algorithm

Add a new `Algorithm` document with a `contentByLevel` map covering
`EASY`, `MEDIUM`, and `HARD` (see `DataSeeder.java` for the pattern).
If a level is missing for a given algorithm, the API automatically
falls back to the nearest authored level rather than hiding the
algorithm - a student should never hit "not available" because of
their chosen depth.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Algorithm Learning Module: full algorithm set, level-adaptive depth"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
