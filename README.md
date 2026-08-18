# COMPETENCYAI — Career Intelligence OS

> "Your Skills. Your Path. Your Career."

**CompetencyAI** is an AI-powered competency-based learning and career-readiness platform built with a bespoke "Career Intelligence OS" design system.

- 🌐 **Live Web Site**: [https://nsurendhark-byte.github.io/competencyAI/](https://nsurendhark-byte.github.io/competencyAI/)

---

## 🌟 Key Product Features

- **Public Product Portal**: Modern product landing pages (`/`, `/about`, `/features`, `/how-it-works`, `/careers`, `/our-team`, `/contact`, `/login`, `/register`).
- **100-Question 10-Level Diagnostic**: Real 100-question assessment evaluating syntax, debugging, output prediction, and scenario modeling across 10 discrete levels.
- **Interactive Knowledge Graph**: Skill dependency DAG rendering prerequisite nodes and mastery states (`LOCKED`, `AVAILABLE`, `IN_PROGRESS`, `MASTERED`, `VERIFIED`).
- **Isolated VM Coding Arena**: JavaScript code execution sandbox (`lib/code-runner.ts`) enforcing 2000ms timeouts and memory caps against test case harnesses.
- **AI Competency Gap & Aura AI Mentor**: Server-side Gemini API integration for gap analysis (`STRONG`, `PARTIAL`, `MISSING`) and real-time contextual mentoring.
- **Career Twin & Readiness Metric**: Algorithmic career readiness index derived from assessment scores, sandbox pass rate, and mock interview ratings.
- **Admin Control Center**: Content management & learning operations console (`/admin/*`) featuring real database telemetry, user directory management, status toggles, content publishing states (`DRAFT`, `IN_REVIEW`, `PUBLISHED`), and AI content generator.

---

## 🚀 Environment & Quick Start

### 1. Environment Setup
Copy `.env.example` to `.env` and supply your environment credentials:
```bash
cp .env.example .env
```

Set the following variables in `.env`:
- `DATABASE_URL`: Connection string for local SQLite or production PostgreSQL.
- `AUTH_SECRET`: Secret HMAC key for session token signing.
- `GEMINI_API_KEY`: Google Gemini AI key for server-side AI mentoring and gap analysis.
- `APP_URL`: Base application URL (`https://nsurendhark-byte.github.io/competencyAI` or local `http://localhost:3000`).

### 2. Seed Initial Database
Run the seed script to populate baseline career tracks, 10-level skills, questions, and default seed accounts:
```bash
node scripts/seed.js
```

### 3. Development / Production Server
```bash
# Run local development server
npm run dev

# Or build static export site for deployment
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment Options

### Option A: GitHub Pages (Static Deployment)
CompetencyAI is configured with Next.js static HTML export (`output: 'export'`) and `basePath: '/competencyAI'`.
GitHub Actions automatically builds `./out` and deploys the application bundle to [https://nsurendhark-byte.github.io/competencyAI/](https://nsurendhark-byte.github.io/competencyAI/).

### Option B: Full-Stack Vercel Server Deployment
To run dynamic Node.js server features (live database persistence, server-side API handlers, HTTP-only cookie sessions):
1. Connect repository `nsurendhark-byte/competencyAI` to **[Vercel](https://vercel.com)**.
2. Supply Environment Variables (`DATABASE_URL`, `AUTH_SECRET`, `GEMINI_API_KEY`, `APP_URL`).
3. Click **Deploy**.

---

## 🔐 Security & Access Control

- **Learner Accounts**: Users can register at `/register` or log in at `/login`. Passwords are encrypted using PBKDF2 hashing.
- **Admin Accounts**: Access to `/admin/*` requires administrator authorization (`role === 'ADMIN'`).

> 🛑 **SECURITY WARNING**: Never commit real passwords, API keys, or JWT secrets to Git. If any password or secret was previously pushed to a public repository, **change and rotate it immediately** in production.