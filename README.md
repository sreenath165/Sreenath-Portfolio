<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Groq-gpt--oss--120b-F55036?style=for-the-badge&logoColor=white" alt="Groq" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

# 🚀 Sai Sreenath Reddy — Portfolio

A modern, high-performance **full-stack developer portfolio** with an integrated **AI-powered assistant** (Sree AI). The frontend is a React + TypeScript SPA featuring fluid animations, dark/light theming, and a fully responsive design. The AI chatbot is powered by **Groq** (`openai/gpt-oss-120b`, with automatic fallback to `gpt-oss-20b` and `compound-mini`) running serverlessly on **Vercel Serverless Functions** with zero external backend dependencies.

> **Live Site:** Hosted on [Vercel](https://sreenath-portfolio-ten.vercel.app/)

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🖥️ Frontend Deep Dive](#️-frontend-deep-dive)
- [🤖 AI Chatbot Deep Dive](#-ai-chatbot-deep-dive)
- [⚡ Getting Started](#-getting-started)
- [🚀 Deployment on Vercel](#-deployment-on-vercel)
- [🔧 Environment Variables](#-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [🆕 Recently Added Features](#-recently-added-features)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎨 Frontend — Portfolio Website

The site is built for recruiters: one scrolling home page answers "what role, where now, what did they build, what stack, how do I reach them" in under 30 seconds.

| Feature | Description |
|---|---|
| **Home (single scroll)** | Hero with photo, one fixed role (AI Engineer), 2-line summary, *View projects* + *Download resume*, and a proof strip (~60% faster proposals, ~70% less manual effort, 6 certifications, current employer) |
| **Featured work** | Three case-study cards with a result line each |
| **Experience timeline** | Both roles visible without clicks: action + tech + result bullets with the outcome numbers in bold; per-role project details expand inline |
| **Skills** | Eight core skills with proof ("Python — Propello, QRF-to-BOQ"), then 5 groups split into *Core* and *Also worked with* |
| **Certifications & education** | AWS/Azure certifications (verify + certificate image preview) separated from Coursera courses; B.Tech as the main education card |
| **About & contact** | 90-word summary, 4 provable strengths, *Beyond code*; contact with email/LinkedIn/GitHub buttons, reply-time promise and a validated form |
| **Projects page** | 4 featured case studies, other projects, and a collapsed *More projects* section (college work, Unity games); 5 category filters, search, clickable tech chips, video/PDF modals |
| **Case studies** (`/projects/:slug`) | Problem, what I built, architecture diagram, stack, result, links |
| **Resume page** | Download, open in new tab, inline preview on larger screens; the header *Resume* button downloads the PDF directly |
| **Old URLs kept** | `/about`, `/skills`, `/experience`, `/certifications`, `/education`, `/contact` redirect to the matching home section |
| **Design system** | Tokens in `src/styles/globals.css`: navy/slate text, amber as a sparing accent, WCAG AA contrast in both themes, 12px cards, one chip style, 1100px max width |
| **Light by default** | Light theme first; dark is a remembered toggle with no flash on load |
| **Accessibility** | Skip link, visible keyboard focus, labelled controls and dialogs, alt text, `prefers-reduced-motion` respected |
| **SEO** | One name and title everywhere, canonical/og:url on the live domain, 1200×630 preview image, JSON-LD, `robots.txt`, `sitemap.xml` |
| **Performance** | Code-split pages and chat widget, vendor chunks, non-blocking fonts, WebP images, compressed demo videos (Lighthouse: 93 / 100 / 100 / 100) |

### 🤖 AI Chatbot — "Sree AI"

| Feature | Description |
|---|---|
| **Serverless Architecture** | Runs entirely on Vercel Serverless Functions — ultra-fast cold starts and high availability |
| **Context-Aware Knowledge** | Comprehensive portfolio context embedded into system instructions for precise Q&A |
| **Role Fit Analysis** | Intelligently analyzes how Sai's skills and projects map to AI Engineer, Backend Developer, or Cloud roles |
| **Relevance Guardrails** | Strict guardrails reject off-topic questions (politics, weather, general trivia) politely |
| **Client-Side Typing Stream** | Delivers responses with simulated real-time typing animation (25ms per word) |
| **Health Monitoring** | Automatic connectivity checks (`/api/health`, which reports offline if `GROQ_API_KEY` is missing) with Online/Connecting/Offline status dots |
| **Conversation Memory** | Stateless backend — the widget sends the last few turns with each message so follow-up questions work; one-click conversation reset |
| **Rate Limiting** | Best-effort per-IP limit (12 messages/minute) to protect the Groq quota; same-origin only (no CORS) |
| **Response Sanitization** | Automatically cleans markdown artifacts and formats lists into neat bullet points (`•`) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       VERCEL DEPLOYMENT                         │
│                                                                 │
│  ┌─────────────────────────┐       ┌─────────────────────────┐  │
│  │   Frontend (React SPA)  │       │  Serverless Functions   │  │
│  │                         │       │                         │  │
│  │  • React 18 + Vite      │ HTTP  │  • /api/chat.ts         │  │
│  │  • TailwindCSS + HSL    │──────►│  • /api/health.ts       │  │
│  │  • Framer Motion        │       │  • System Prompt +      │  │
│  │  • React Router 7       │       │    Portfolio Context    │  │
│  │  • Radix UI Primitives  │       │                         │  │
│  └─────────────────────────┘       └───────────┬─────────────┘  │
│                                                │                │
└────────────────────────────────────────────────┼────────────────┘
                                                 │ HTTPS
                                                 ▼
                                     ┌───────────────────────┐
                                     │    Groq Cloud API     │
                                     │  gpt-oss-120b (+fallbacks) │
                                     └───────────────────────┘
```

**Chat Request Flow:**
1. User types a question in the chat widget.
2. Frontend sends a `POST /api/chat` request with the user message.
3. Vercel Serverless Function combines system prompt, full portfolio context, and the user's message.
4. Request is sent to Groq's inference API (`openai/gpt-oss-120b`, falling back to `openai/gpt-oss-20b` then `groq/compound-mini`).
5. Output is sanitized and returned as clean JSON.
6. Frontend simulates real-time typing word-by-word with cursor feedback.

---

## 🛠️ Tech Stack

### Frontend & UI

| Technology | Purpose |
|---|---|
| **React 18** | Declarative component-based UI library |
| **TypeScript 5** | Static typing and interfaces |
| **Vite 5** | High-speed frontend build tool and dev server |
| **TailwindCSS 3.4** | Utility-first styling with custom HSL theming |
| **Framer Motion 12** | Page transitions, floating elements, micro-animations |
| **React Router 7** | Client-side routing with nested layout architecture |
| **Radix UI** | Accessible UI primitives (Dialog, Tabs, Tooltip, Navigation Menu) |
| **Lucide React & React Icons** | Modern icon set and social brand icons |
| **React Hook Form + Zod** | Form state management and schema validation |

### Serverless Backend & AI

| Technology | Purpose |
|---|---|
| **Vercel Serverless Functions** | Zero-config Node.js API routes (`/api/chat`, `/api/health`) |
| **Groq REST API** | Called directly with `fetch` (OpenAI-compatible endpoint) |
| **gpt-oss-120b on Groq** | LLM for conversational portfolio Q&A, with smaller fallback models |
| **TypeScript (Node.js)** | Typed serverless function handlers |

### Hosting & Infrastructure

| Service | Purpose |
|---|---|
| **Vercel** | Unified hosting for SPA frontend and Serverless API routes |
| **GitHub** | Version control and automated CI/CD deployments |

---

## 📁 Project Structure

```
Portfolio/
├── README.md                          # ← Project documentation
├── .gitignore                         # Git ignore rules
│
└── portfolio/                         # 🎨 Full-Stack Portfolio Application
    ├── vercel.json                    # Vercel routing & serverless config
    ├── package.json                   # Dependencies & scripts
    ├── vite.config.ts                 # Vite bundler config with /api proxy
    ├── tsconfig.json                  # TypeScript configuration
    ├── tailwind.config.js             # Tailwind CSS configuration & colors
    ├── postcss.config.js              # PostCSS plugin setup
    ├── .env                           # Local environment variables
    ├── .env.example                   # Environment variable template
    │
    ├── api/                           # ⚡ Vercel Serverless Functions
    │   ├── chat.ts                    # POST /api/chat — Groq LLM + context handler
    │   └── health.ts                  # GET /api/health — Health check endpoint
    │
    ├── public/                        # Static assets
    │   ├── favicon.svg                # Browser favicon
    │   ├── images/                    # Profile & project images
    │   │   ├── profile-portrait.webp  # Hero photo (desktop) — profile-headshot.webp on phones
    │   │   ├── og-image.png           # 1200x630 link preview
    │   │   ├── projects/              # Screenshots and media assets
    │   │   └── certifications/        # Certificate badges & credentials
    │   ├── resume/                    # Resume PDF files
    │   │   └── SaiSreenath_Resume.pdf
    │   └── videos/                    # Project video demo recordings
    │
    ├── scripts/og-image/              # Template + script for the 1200x630 link-preview image
    │
    └── src/                           # Frontend source code
        ├── main.tsx                   # React root entry point
        ├── App.tsx                    # Routes, lazy pages, old-URL redirects
        ├── styles/globals.css         # Design tokens (colors, spacing, radius) + base styles
        │
        ├── data/
        │   └── profile.ts             # ⭐ All content: hero, proof stats, skills, experience, projects, case studies, certs
        │
        ├── sections/                  # Home-page sections, in page order
        │   ├── Hero.tsx               # Photo, role, summary, CTAs, proof strip
        │   ├── FeaturedWork.tsx       # 3 case-study cards
        │   ├── ExperienceSection.tsx  # Timeline with outcome bullets
        │   ├── SkillsSection.tsx      # Core skills with proof + 5 groups
        │   ├── CredentialsSection.tsx # Certifications, courses, education
        │   ├── AboutSection.tsx       # Summary, strengths, beyond code
        │   └── ContactSection.tsx     # Email/LinkedIn/GitHub + form
        │
        ├── pages/
        │   ├── Home.tsx               # Composes the sections
        │   ├── Projects.tsx           # Filters, search, featured / other / more
        │   ├── CaseStudy.tsx          # /projects/:slug
        │   ├── Resume.tsx             # PDF download and preview
        │   └── NotFound.tsx           # Custom 404 page
        │
        ├── components/
        │   ├── common/                # Section, PageHeader, FadeIn, ChatbotButton, ScrollProgress, ScrollToTop…
        │   ├── layout/                # Layout, Navbar (4 links + Resume), Footer
        │   ├── projects/              # FeaturedProjectCard, ProjectCard, TechChips, ArchitectureDiagram
        │   └── ui/                    # Button, Card, Badge, Input, MediaModal, VideoThumbnail…
        │
        ├── services/chatApi.ts        # Chat client (history + typing simulation)
        ├── hooks/useTheme.ts          # Light-default theme toggle
        └── lib/utils.ts               # cn() class merging
```

---

## 🖥️ Frontend Deep Dive

### Routing

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home` | Single scrolling page: hero + proof strip, featured work, experience, skills, credentials, about, contact |
| `/projects` | `Projects` | Featured case studies, other projects, collapsible *More projects*, filters and search |
| `/projects/:slug` | `CaseStudy` | `propello`, `qrf-to-boq`, `prodsync`, `rag-faq-assistant` |
| `/resume` | `Resume` | PDF download and preview |
| `/about` … `/contact` | redirect | Old page URLs redirect to `/#section` so shared links keep working |
| `*` | `NotFound` | Custom 404 page |

### Theming System

- **Design tokens** (HSL CSS variables) live in `src/styles/globals.css`; Tailwind maps them to `bg-background`, `text-foreground`, `text-brand`, etc.
- **Light by default**; the dark toggle is stored in `localStorage` and applied before first paint by an inline script in `index.html`.
- Amber (`--primary: 38 92% 50%`) is used for filled buttons and accents only; buttons use navy text on amber (8.4:1). Link-coloured text uses the darker `--brand` token.

---

## 🤖 AI Chatbot Deep Dive

### Serverless Architecture & Context Injection
The chatbot utilizes a direct **Context Injection Architecture**:
- All verified portfolio data (experience, skills, projects, certifications, education, role-fit criteria) is embedded directly into the serverless prompt context.
- Eliminates the need for external vector databases or dedicated backend hosting instances.
- Zero cold-start lag and consistent sub-second responses powered by Groq's LPU inference engine.

### Strict Guardrails
- ✅ **Answers:** Questions regarding Sai's experience, technologies, specific project details, certifications, role fit, availability, and contact information.
- ❌ **Politely Rejects:** Generic off-topic queries (general trivia, unrelated code writing, politics, casual banter) with a friendly redirect back to Sai's background.

---

## ⚡ Getting Started

### Prerequisites
- **Node.js** (v18 or later)
- **npm** (v9 or later)
- **Groq API Key** — Obtain a free key at [console.groq.com](https://console.groq.com)

### 1. Clone the Repository
```bash
git clone https://github.com/sreenath165/Sreenath-Portfolio.git
cd Portfolio/portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `portfolio/` directory:
```bash
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🚀 Deployment on Vercel

Since both the React frontend and the API functions live inside `portfolio/`, deployment to Vercel is seamless:

### Step 1: Set Root Directory
In your Vercel Project Settings:
- **Root Directory:** `portfolio`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 2: Configure Environment Variable
In **Settings → Environment Variables**, add:
- **Key:** `GROQ_API_KEY`
- **Value:** `your_groq_api_key_here`
- **Target Environments:** Production, Preview, Development

### Step 3: Deploy
Push your code to GitHub:
```bash
git add .
git commit -m "Deploy portfolio with serverless AI chatbot"
git push origin main
```
Vercel will automatically trigger the build and deploy your site.

---

## 🔧 Environment Variables

| Variable | Required | Scope | Description |
|---|---|---|---|
| `GROQ_API_KEY` | **Yes** | Serverless API (Vercel) | Authentication key for Groq Cloud LLM API |

---

## 📜 Available Scripts

Run these commands from the root directory or inside `portfolio/`:

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local development server with HMR (`http://localhost:5173`) |
| `npm run build` | Runs TypeScript type checking and produces optimized production build |
| `npm run preview` | Locally preview the production build output |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 🆕 Recently Added Features

### Recruiter-focused redesign
Rebuilt the UI around the *Portfolio UI/UX Revamp Guide*: a single role (AI Engineer), proof above the fold, case studies with architecture diagrams, 4-link navigation plus a Resume button, a calmer navy/amber design system, light theme by default, and old URLs redirected to the new sections.

### Chatbot improvements
Sree AI now remembers the last few turns (follow-up questions work), is rate-limited per visitor, and shows offline when the Groq key is missing.

### Content updates
All page content lives in `portfolio/src/data/profile.ts`. To regenerate the link-preview image after changing the photo or headline, run `node scripts/og-image/render.cjs` from `portfolio/`.

---

## 🔮 Future Enhancements

| Feature | Description | Complexity |
|---|---|---|
| **Technical Blog / MDX** | Markdown-powered blog section for sharing articles on AI/ML and software engineering | Medium |
| **GitHub Activity Feed** | Live visualization of GitHub contributions and recent public repository activity | Medium |
| **Live Project Demos** | Embedded interactive iframe previews or hosted demo links for selected applications | Medium |
| **Multi-Language Support** | Internationalization (i18n) for multiple languages | Medium |
| **Visitor Analytics** | Privacy-focused analytics (Vercel Web Analytics or Plausible) | Low |
| **PWA Capabilities** | Service workers and manifest for offline reading and desktop/mobile installation | Low |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/sreenath165">Sai Sreenath Reddy Yarradoddi</a>
</p>
