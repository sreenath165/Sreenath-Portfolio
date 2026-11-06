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

| Feature | Description |
|---|---|
| **Home Page** | Hero section with typewriter rotating roles, animated profile image, floating tech badges (AI/ML, Agents, Python, AWS, RAG, LLMs), and call-to-actions |
| **About Page** | Introduction, career objectives, key strengths, and personal interests presented in animated cards |
| **Skills Page** | Categorized skills — Programming, AI/ML, Backend & Frontend, Frameworks, DevOps & Cloud, Databases |
| **Experience Page** | Timeline-style work history with expandable modal details, project breakdowns, tools used, and key achievements |
| **Projects Page** | Searchable & filterable project gallery (14 projects) with multi-select technology filter chips, video/PDF media modals, and GitHub links |
| **Certifications Page** | AWS, Azure, and Coursera certifications with verification links and certificate images |
| **Education Page** | Academic timeline — B.Tech (VIT Chennai), Intermediate, SSC |
| **Resume Page** | Interactive PDF viewer and one-click resume download |
| **Contact Page** | Contact form with Zod schema validation, animated submission state, and direct social media links |
| **Animated Page Transitions** | Smooth `AnimatePresence` fade + slide transitions between routes |
| **Scroll Progress Bar** | Gradient progress indicator positioned beneath the navbar showing reading progress |
| **Custom 404 Page** | Dedicated not-found page with gradient typography and quick navigation buttons |
| **Dark/Light Theme** | Animated theme toggle with system preference detection and localStorage persistence |
| **Responsive Design** | Fully responsive across mobile, tablet, and desktop with a mobile navigation drawer |
| **Glassmorphism Navbar** | Fixed blur-effect navigation bar with active-link indicators |
| **SEO Optimized** | Open Graph, Twitter Card meta tags, semantic HTML, and proper heading hierarchy |

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
    │   │   ├── profile.png            # Main profile photo
    │   │   ├── projects/              # Screenshots and media assets
    │   │   └── certifications/        # Certificate badges & credentials
    │   ├── resume/                    # Resume PDF files
    │   │   └── SaiSreenath_Resume.pdf
    │   └── videos/                    # Project video demo recordings
    │
    └── src/                           # Frontend source code
        ├── main.tsx                   # React root entry point
        ├── App.tsx                    # Route definitions & router setup
        ├── index.css                  # Global CSS & HSL theme definitions
        │
        ├── components/
        │   ├── common/                # Shared UI widgets
        │   │   ├── ChatbotButton.tsx  # Sree AI floating chatbot widget
        │   │   ├── AnimatedOutlet.tsx # Route transition wrapper
        │   │   ├── ScrollProgress.tsx # Scroll progress indicator bar
        │   │   ├── ScrollToTop.tsx    # Smooth scroll to top button
        │   │   ├── PageHeader.tsx     # Standardized page title component
        │   │   └── SectionWrapper.tsx # Framer Motion animated container
        │   │
        │   ├── layout/                # Page layout components
        │   │   ├── Layout.tsx         # Master layout (Navbar, Outlet, Footer, Chatbot)
        │   │   ├── Navbar.tsx         # Glassmorphism header with theme toggle
        │   │   └── Footer.tsx         # Footer with copyright and social links
        │   │
        │   └── ui/                    # Base UI components
        │       ├── button.tsx         # Button with CVA variants
        │       ├── card.tsx           # Card containers
        │       ├── badge.tsx          # Tag and status badges
        │       ├── input.tsx          # Text input components
        │       ├── textarea.tsx       # Textarea component
        │       ├── media-modal.tsx    # Video/PDF preview modal
        │       └── video-thumbnail.tsx# Video player thumbnail
        │
        ├── pages/                     # Route pages
        │   ├── Home.tsx               # Hero page with typewriter role
        │   ├── About.tsx              # Background and bio
        │   ├── Skills.tsx             # Categorized technical skill matrix
        │   ├── Experience.tsx         # Work history and achievements
        │   ├── Projects.tsx           # Searchable & filterable project gallery
        │   ├── Certifications.tsx     # Professional credentials
        │   ├── Education.tsx          # Educational qualifications
        │   ├── Resume.tsx             # Interactive resume viewer
        │   ├── Contact.tsx            # Contact form
        │   └── NotFound.tsx           # Custom 404 page
        │
        ├── data/
        │   └── profile.ts             # Central source of truth for portfolio data
        │
        ├── services/
        │   └── chatApi.ts             # Chat service client (fetch & typing simulation)
        │
        ├── hooks/
        │   └── useTheme.ts            # Dark/light theme toggle hook
        │
        └── lib/
            └── utils.ts               # Utility helpers (cn class merging)
```

---

## 🖥️ Frontend Deep Dive

### Routing

The application uses **React Router v7** with nested routes and animated transitions:

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home` | Hero section, animated headline, floating badges |
| `/about` | `About` | Bio, career objectives, strengths, personal intro |
| `/skills` | `Skills` | Categorized tech stack cards with skill badges |
| `/experience` | `Experience` | Career timeline with detailed modals |
| `/projects` | `Projects` | Filterable project showcase with video/PDF modals |
| `/certifications` | `Certifications` | Verified credential cards with direct verification links |
| `/education` | `Education` | Academic milestones |
| `/resume` | `Resume` | Embedded PDF preview & download options |
| `/contact` | `Contact` | Contact form with validation and social links |
| `*` | `NotFound` | Custom 404 page for unmatched URLs |

### Theming System

- **HSL CSS Variables** in `index.css` for instant theme toggling without stylesheet reloads.
- **Persistent Selection** stored in `localStorage` and automatically synchronized with the user's OS preference (`prefers-color-scheme`).
- Primary brand accent: Warm Amber/Gold (`--primary: 37 100% 50%`).

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

### 1. 🎯 Typewriter Rotating Roles (Home Page)
The hero section dynamically types and deletes role titles:
- *AI/ML Engineer → Python Developer → Agentic AI Specialist → Cloud Architect → Full-Stack Developer → RAG Pipeline Expert*

### 2. 📊 Scroll Progress Bar
A smooth, hardware-accelerated gradient bar beneath the navigation bar reflecting current page scroll depth.

### 3. 🚫 Custom 404 Not Found Page
A dedicated 404 page styled with gradient typography, friendly messaging, and intuitive navigation links.

### 4. 🏷️ Multi-Select Technology Filter Chips (Projects Page)
Interactive technology chips on the Projects page extracted directly from project data, allowing instant filtering by specific tools and stacks.

### 5. ✨ Animated Page Transitions
Framer Motion `AnimatePresence` wrapper delivering smooth entry and exit transitions across all route changes.

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
