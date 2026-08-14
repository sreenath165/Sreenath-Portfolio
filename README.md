<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/LangChain-0.3-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

# 🚀 Sai Sreenath Reddy — Portfolio

A **full-stack developer portfolio** with an integrated **AI-powered chatbot** (Sree AI) built using RAG (Retrieval-Augmented Generation). The frontend is a modern React + TypeScript SPA featuring smooth animations, dark/light theming, and a responsive design. The backend is a Python FastAPI server that powers the AI chatbot with LangChain, ChromaDB, and Groq's LLaMA 3.3 70B model.

> **Live Site:** Hosted on [Vercel](https://vercel.com) (Frontend) + [Render](https://render.com) (Backend)

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🖥️ Frontend Deep Dive](#️-frontend-deep-dive)
- [🤖 Backend Deep Dive (AI Chatbot)](#-backend-deep-dive-ai-chatbot)
- [⚡ Getting Started](#-getting-started)
- [🚀 Deployment](#-deployment)
- [🔧 Environment Variables](#-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎨 Frontend — Portfolio Website

| Feature | Description |
|---|---|
| **Home Page** | Hero section with animated profile image, floating tech badges (AI/ML, Agents, Python, AWS, RAG, LLMs), and call-to-action buttons |
| **About Page** | Introduction, career objectives, key strengths, and personal interests presented in animated cards |
| **Skills Page** | Categorized skills — Programming, AI/ML, Backend/Frontend, Frameworks, DevOps & Cloud, Databases |
| **Experience Page** | Timeline-style work history with expandable modal details, project breakdowns, tools used, and key achievements |
| **Projects Page** | Searchable & filterable project gallery (14 projects) with featured tags, video/PDF media modals, and GitHub links |
| **Certifications Page** | AWS, Azure, and Coursera certifications with verification links and certificate images |
| **Education Page** | Academic timeline — B.Tech (VIT Chennai), Intermediate, SSC |
| **Resume Page** | Downloadable resume viewer |
| **Contact Page** | Contact form with Zod validation, social media links (GitHub, LinkedIn, YouTube, Instagram) |
| **Dark/Light Theme** | Animated theme toggle with system preference detection and localStorage persistence |
| **Responsive Design** | Fully responsive across mobile, tablet, and desktop with a hamburger menu for mobile navigation |
| **Framer Motion Animations** | Page transitions, scroll-triggered reveals, floating badges, spring-based hover effects, and modal animations |
| **Glassmorphism Navbar** | Fixed navbar with blur effect and animated active-link indicator |
| **SEO Optimized** | Open Graph, Twitter Card meta tags, semantic HTML, proper heading hierarchy |
| **Custom Scrollbar** | Styled scrollbar matching the theme colors |

### 🤖 AI Chatbot — "Sree AI"

| Feature | Description |
|---|---|
| **RAG-Powered Q&A** | Retrieval-Augmented Generation using ChromaDB vector store and BGE embeddings for accurate, context-aware answers |
| **Streaming Responses** | Real-time word-by-word streaming via Server-Sent Events (SSE) with typing cursor animation |
| **Relevance Guardrails** | LLM-based relevance check rejects off-topic questions (politics, general knowledge, harmful content) with a polite refusal message |
| **Auto Health Checks** | Periodic connectivity checks (every 30s) with online/connecting/offline status indicators |
| **Session Isolation** | Stateless backend — each browser session maintains its own chat history client-side |
| **Typewriter Bubble** | Animated greeting bubble with typewriter effect when the chatbot is minimized |
| **Clear Chat** | One-click conversation reset |
| **Markdown Cleanup** | Response sanitization strips markdown artifacts (`**`, `` ``` ``), converts bullets to `•` for clean display |

---

## 🏗️ Architecture

```
┌─────────────────────────┐         ┌─────────────────────────┐
│                         │         │                         │
│   Vercel (Frontend)     │  HTTPS  │   Render (Backend)      │
│                         │◄───────►│                         │
│  ┌───────────────────┐  │         │  ┌───────────────────┐  │
│  │  React + TS + Vite│  │         │  │  FastAPI           │  │
│  │  TailwindCSS      │  │         │  │  ├── RAG Pipeline  │  │
│  │  Framer Motion    │  │         │  │  │   ├── Ingest    │  │
│  │  Radix UI         │  │         │  │  │   ├── Embed     │  │
│  │  React Router     │  │         │  │  │   ├── Retrieve  │  │
│  └───────────────────┘  │         │  │  │   └── Generate  │  │
│                         │         │  │  ├── ChromaDB      │  │
│  Chat API Service ──────│─── SSE ─│──│► │  Groq LLM       │  │
│  (Streaming Client)     │         │  │  └── LangChain     │  │
│                         │         │  └───────────────────┘  │
└─────────────────────────┘         └─────────────────────────┘
```

**Request Flow (Chatbot):**

1. User sends a message → Frontend streams a `POST /api/chat/` request
2. Backend checks question **relevance** via a quick LLM classification call
3. If relevant → **Retriever** performs similarity search on ChromaDB vector store (top-k=5)
4. Retrieved documents are formatted as context → sent to **Groq LLM** (LLaMA 3.3 70B) with system prompt
5. Response is **streamed** word-by-word via SSE back to the frontend
6. Frontend renders each word with a typing cursor animation

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **TypeScript 5** | Type-safe development |
| **Vite 5** | Build tool & dev server |
| **TailwindCSS 3.4** | Utility-first CSS framework |
| **Framer Motion 12** | Animations and transitions |
| **React Router 7** | Client-side routing (9 routes) |
| **Radix UI** | Accessible UI primitives (Dialog, Tabs, Tooltip, Navigation Menu, etc.) |
| **Lucide React** | Icon library |
| **React Icons** | Social media icons (GitHub, LinkedIn, YouTube, Instagram) |
| **React Hook Form + Zod** | Form handling with schema validation |
| **Embla Carousel** | Carousel/slider component |
| **Google Fonts** | Space Grotesk (headings) + DM Sans (body) |

### Backend

| Technology | Purpose |
|---|---|
| **Python 3.11** | Runtime |
| **FastAPI 0.115** | Async web framework |
| **LangChain 0.3** | LLM orchestration and RAG pipeline |
| **LangChain-Groq** | Groq LLM integration |
| **ChromaDB 0.5** | Vector database for document embeddings |
| **Sentence-Transformers** | BGE embedding model (`BAAI/bge-small-en-v1.5`) |
| **Groq API** | LLM inference (LLaMA 3.3 70B Versatile) |
| **SSE-Starlette** | Server-Sent Events for streaming |
| **Pydantic 2** | Settings management and request/response validation |
| **Docker** | Containerized deployment |

### Deployment

| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting (Vite build) |
| **Render** | Backend hosting (Docker container) |
| **GitHub** | Source control and CI/CD triggers |

---

## 📁 Project Structure

```
Portfolio/
├── README.md                          # ← You are here
├── DEPLOYMENT.md                      # Deployment guide
├── .gitignore                         # Root gitignore
├── profile pic.png                    # Profile photo asset
│
├── portfolio/                         # 🎨 FRONTEND (React + Vite)
│   ├── index.html                     # HTML entry point (SEO meta tags)
│   ├── package.json                   # Dependencies & scripts
│   ├── vite.config.ts                 # Vite config with @ alias
│   ├── tsconfig.json                  # TypeScript config
│   ├── tailwind.config.js             # Tailwind theme (HSL color system)
│   ├── postcss.config.js              # PostCSS config
│   ├── .env                           # Local environment (VITE_API_URL)
│   ├── .env.example                   # Environment template
│   ├── .env.production                # Production environment
│   │
│   ├── public/                        # Static assets (images, favicon)
│   │
│   └── src/
│       ├── main.tsx                   # React entry point
│       ├── App.tsx                    # Root component (Router + Routes)
│       ├── App.css                    # App-level styles
│       ├── index.css                  # Base CSS imports
│       ├── vite-env.d.ts              # Vite type declarations
│       │
│       ├── components/
│       │   ├── common/                # Shared components
│       │   │   ├── ChatbotButton.tsx   # 🤖 AI Chatbot widget (371 lines)
│       │   │   ├── CursorFollower.tsx  # Custom cursor effect
│       │   │   ├── PageHeader.tsx      # Reusable page header
│       │   │   ├── ScrollToTop.tsx     # Scroll-to-top button
│       │   │   ├── ScrollToTopOnNavigate.tsx  # Auto-scroll on route change
│       │   │   └── SectionWrapper.tsx  # Page section wrapper
│       │   │
│       │   ├── layout/                # Layout components
│       │   │   ├── Layout.tsx          # Root layout (Navbar + Outlet + Footer + Chatbot)
│       │   │   ├── Navbar.tsx          # Navigation bar with theme toggle
│       │   │   ├── Footer.tsx          # Footer with social links
│       │   │   └── index.ts           # Barrel export
│       │   │
│       │   └── ui/                    # UI primitives (Radix-based)
│       │       ├── button.tsx          # Button (CVA variants)
│       │       ├── card.tsx            # Card, CardHeader, CardContent, CardFooter
│       │       ├── badge.tsx           # Badge component
│       │       ├── input.tsx           # Input field
│       │       ├── textarea.tsx        # Textarea field
│       │       ├── label.tsx           # Form label
│       │       ├── separator.tsx       # Visual separator
│       │       ├── media-modal.tsx     # Video/PDF modal viewer
│       │       └── video-thumbnail.tsx # Video thumbnail with play overlay
│       │
│       ├── pages/                     # Route pages
│       │   ├── Home.tsx               # Hero + floating tech badges
│       │   ├── About.tsx              # Introduction, objectives, strengths
│       │   ├── Skills.tsx             # Categorized skills grid
│       │   ├── Experience.tsx         # Timeline + project detail modals
│       │   ├── Projects.tsx           # Searchable project gallery
│       │   ├── Certifications.tsx     # Certification cards
│       │   ├── Education.tsx          # Academic timeline
│       │   ├── Resume.tsx             # Resume download
│       │   ├── Contact.tsx            # Contact form + social links
│       │   └── index.ts              # Barrel export
│       │
│       ├── data/
│       │   └── profile.ts            # 📋 All portfolio data (376 lines)
│       │                              #    profile, skills, experience,
│       │                              #    projects, certifications, education
│       │
│       ├── services/
│       │   └── chatApi.ts             # Chat API client (streaming + fallback)
│       │
│       ├── hooks/
│       │   └── useTheme.ts            # Dark/light theme hook
│       │
│       ├── lib/
│       │   └── utils.ts               # Utility (cn - class merge)
│       │
│       └── styles/
│           └── globals.css            # Global styles (HSL theme tokens,
│                                      #   glassmorphism, gradient text,
│                                      #   custom scrollbar, animations)
│
├── backend/                           # 🤖 BACKEND (FastAPI + RAG)
│   ├── Dockerfile                     # Production Docker image
│   ├── render.yaml                    # Render deployment config
│   ├── requirements.txt               # Python dependencies
│   ├── .env                           # Local environment (GROQ_API_KEY)
│   ├── .env.example                   # Environment template
│   ├── .gitignore                     # Backend gitignore
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI app (lifespan, CORS, routes)
│   │   ├── config.py                  # Pydantic settings (env vars)
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── chat.py                # POST /api/chat/ (streaming + non-streaming)
│   │   │                              # GET  /api/chat/health
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── groq_service.py        # Groq LLM wrapper (relevance check + generation)
│   │   │
│   │   ├── rag/                       # RAG Pipeline
│   │   │   ├── __init__.py
│   │   │   ├── ingest.py              # Document ingestion (22KB — portfolio data → chunks)
│   │   │   ├── embeddings.py          # BGE embedding model (LangChain-compatible wrapper)
│   │   │   ├── vectorstore.py         # ChromaDB vector store management
│   │   │   ├── retriever.py           # Similarity search retriever
│   │   │   ├── chain.py               # RAG chain orchestrator
│   │   │   └── prompt.py              # System prompt + relevance prompt + refusal message
│   │   │
│   │   ├── data/                      # Data directory
│   │   └── utils/
│   │       └── __init__.py
│   │
│   └── chroma_db/                     # ChromaDB persistence (auto-generated)
│
├── Certificates/                      # Certificate images
│   ├── AWS CP Certificate.png
│   ├── Azure AI-900 Certificate.png
│   └── Azure Administrator AZ-104 Certificate.png
│
├── Resume/                            # Resume files
│   ├── SaiSreenath_Resume.pdf
│   └── SaiSreenath_Resume1.pdf
│
└── Project Details document/          # Project media files
    ├── 3d-environment-demo.mp4
    ├── ball-game-demo.mp4
    ├── bee-run-demo.mp4
    ├── smart weed detection robot.HEIC
    └── Post-Quantum Lattice-Based RSA.pdf
```

---

## 🖥️ Frontend Deep Dive

### Routing

The app uses **React Router v7** with a layout route pattern:

| Route | Page Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with hero section |
| `/about` | `About` | Introduction & career objectives |
| `/skills` | `Skills` | Technical skills grid |
| `/experience` | `Experience` | Work history timeline |
| `/projects` | `Projects` | Project gallery with search/filter |
| `/certifications` | `Certifications` | Professional certifications |
| `/education` | `Education` | Academic background |
| `/resume` | `Resume` | Resume download |
| `/contact` | `Contact` | Contact form & social links |

### Theming System

- **HSL-based color tokens** defined in `globals.css` (light & dark variants)
- **Theme toggle** with animated sun/moon icon transition (Framer Motion)
- **System preference detection** via `prefers-color-scheme` media query
- **Persistence** via `localStorage`
- Colors: Warm orange/amber primary (`#f9a825`), navy dark mode, cream light mode

### Data Layer

All portfolio content is centralized in [`profile.ts`](portfolio/src/data/profile.ts):
- **Profile info** — name, role, email, location, social links, profile image
- **Skills** — 6 categories with individual items
- **Experience** — 2 positions with nested project details
- **Projects** — 14 projects with technologies, features, media links, GitHub repos
- **Certifications** — 6 certifications with verification links
- **Education** — 3 entries (B.Tech, Intermediate, SSC)

### Key UI Components

- **`ChatbotButton`** — Full-featured chat widget with streaming support, status indicators, typewriter effect, and session management
- **`Navbar`** — Glassmorphism fixed header with animated active-link indicator, custom SVG logo, mobile hamburger menu
- **`MediaModal`** — Modal viewer for video and PDF project demos
- **`VideoThumbnail`** — Thumbnail preview with play overlay for video projects

---

## 🤖 Backend Deep Dive (AI Chatbot)

### RAG Pipeline

```
Portfolio Data (ingest.py)
       │
       ▼
  Text Chunking (500 chars, 100 overlap)
       │
       ▼
  BGE Embeddings (BAAI/bge-small-en-v1.5)
       │
       ▼
  ChromaDB Vector Store (persistent)
       │
       ▼
  Similarity Search (top-k=5)
       │
       ▼
  Context Formatting
       │
       ▼
  Groq LLM (LLaMA 3.3 70B)
       │
       ▼
  Streamed Response (SSE)
```

### Key Backend Components

| Module | File | Purpose |
|---|---|---|
| **Entry Point** | `main.py` | FastAPI app with lifespan (auto-ingestion on startup), CORS middleware |
| **Configuration** | `config.py` | Pydantic Settings — all config via environment variables |
| **Chat Routes** | `routes/chat.py` | `POST /api/chat/` (streaming & non-streaming), `GET /api/chat/health` |
| **Groq Service** | `services/groq_service.py` | LLM wrapper — relevance checking & response generation |
| **Ingestion** | `rag/ingest.py` | Converts portfolio data into chunked documents (22KB of structured data) |
| **Embeddings** | `rag/embeddings.py` | Custom LangChain-compatible BGE embedding wrapper with lazy loading |
| **Vector Store** | `rag/vectorstore.py` | ChromaDB client, document storage, batched insertion, persistence |
| **Retriever** | `rag/retriever.py` | Similarity search with configurable top-k |
| **RAG Chain** | `rag/chain.py` | Orchestrates: relevance check → retrieval → generation |
| **Prompts** | `rag/prompt.py` | System prompt with identity, boundaries, and formatting rules |

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API info and available endpoints |
| `GET` | `/health` | Global health check (document count) |
| `POST` | `/api/chat/` | Send chat message (streaming or non-streaming) |
| `GET` | `/api/chat/health` | Chat service health check |
| `GET` | `/docs` | Auto-generated Swagger API documentation |

### System Prompt & Guardrails

The AI assistant ("Sree AI") operates with strict boundaries:
- ✅ **Allowed:** Questions about projects, skills, experience, education, certifications, contact info, greetings
- ❌ **Blocked:** Politics, general knowledge, unrelated coding help, harmful content
- Uses a **two-step process**: quick relevance classification → full RAG response
- Clean output: no markdown formatting, bullet points use `•`, no code blocks

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.11
- **Groq API Key** — Get one at [console.groq.com](https://console.groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/sreenath165/Sreenath-Portfolio.git
cd Portfolio
```

### 2. Frontend Setup

```bash
cd portfolio
npm install

# Create .env from template
cp .env.example .env
# Edit .env → set VITE_API_URL=http://localhost:10000

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env from template
cp .env.example .env
# Edit .env → set GROQ_API_KEY=your_key_here

# Start backend server
uvicorn app.main:app --reload --port 10000
```

Backend runs at: `http://localhost:10000`  
API Docs at: `http://localhost:10000/docs`

> **Note:** On first startup, the backend downloads the BGE embedding model (~130MB) and ingests portfolio data into ChromaDB. This takes 1-2 minutes.

---

## 🚀 Deployment

### Frontend → Vercel

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Root Directory** | `portfolio` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Environment Variable** | `VITE_API_URL` = `https://your-backend.onrender.com` |

### Backend → Render

| Setting | Value |
|---|---|
| **Name** | `portfolio-ai-backend` |
| **Root Directory** | `backend` |
| **Environment** | Docker |
| **Instance Type** | Free |
| **Environment Variable** | `GROQ_API_KEY` = your API key |

> See [DEPLOYMENT.md](DEPLOYMENT.md) for the full step-by-step deployment guide.

### ⚠️ Render Free Tier Notes

- Backend **sleeps after 15 min of inactivity** — first request after sleep takes ~30-60s
- The chatbot shows "Connecting..." status during cold starts
- 512MB RAM limit — BGE-small model fits comfortably

---

## 🔧 Environment Variables

### Frontend (`portfolio/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:10000` |

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `GROQ_API_KEY` | Groq API key (required) | — |
| `LLM_MODEL` | LLM model name | `llama-3.3-70b-versatile` |
| `EMBEDDING_MODEL` | Sentence-transformers model | `BAAI/bge-small-en-v1.5` |
| `CHROMA_PERSIST_DIR` | ChromaDB storage directory | `./chroma_db` |
| `COLLECTION_NAME` | ChromaDB collection name | `portfolio_docs` |
| `RETRIEVAL_K` | Number of documents to retrieve | `5` |
| `CHUNK_SIZE` | Text chunk size (chars) | `500` |
| `CHUNK_OVERLAP` | Chunk overlap (chars) | `100` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `10000` |

---

## 📜 Available Scripts

### Frontend (`portfolio/`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 📊 Project Highlights

- **14 projects** showcased — from Agentic AI platforms to Unity games
- **6 certifications** — AWS Cloud Practitioner, Azure Administrator (AZ-104), Azure AI Fundamentals (AI-900), and more
- **2 professional roles** — Sutherland Global Services, Versalence Infocomm
- **AI Chatbot** powered by Groq LLaMA 3.3 70B via Vercel Serverless Functions
- **Custom HSL color system** — seamless dark/light theme transitions
- **Zero external UI kit** — all components built with Radix primitives + Tailwind

---

## 🆕 Recently Added Features

### 1. 🎯 Typewriter Rotating Roles (Home Page)
The hero section now features a **typewriter animation** that cycles through role titles:
- AI/ML Engineer → Python Developer → Agentic AI Specialist → Cloud Architect → Full-Stack Developer → RAG Pipeline Expert
- Smooth type-and-delete animation with a blinking cursor

### 2. 📊 Scroll Progress Bar
A **gradient progress bar** appears below the navbar as you scroll, showing how far down the page you've read. Uses Framer Motion's `useScroll` for butter-smooth performance.

### 3. 🚫 Custom 404 Page
Invalid URLs now show a **styled 404 page** with:
- Large gradient "404" text
- Friendly error message
- "Back to Home" and "Go Back" buttons

### 4. 🏷️ Technology Filter Chips (Projects Page)
The Projects page now has **clickable technology filter chips**:
- All unique technologies extracted from projects, sorted by frequency
- Click any chip to filter projects by that technology
- Multi-select support — click multiple chips to narrow results
- Clicking tech badges inside project cards also toggles filters
- "Clear All" button to reset filters

### 5. 📧 Contact Form Backend
The contact form now **actually sends emails** via Resend API:
- Vercel serverless function at `/api/contact` handles submissions
- Sends a beautifully styled HTML email to `saisreenathreddyy@gmail.com`
- Reply-to is set to the visitor's email for easy responses
- Server-side validation + client-side error/success feedback
- Requires `RESEND_API_KEY` in Vercel Environment Variables

### 6. ✨ Animated Page Transitions
Smooth **fade + slide animations** between all pages using Framer Motion `AnimatePresence`:
- Pages fade in with a subtle upward slide on entry
- Pages fade out with a downward slide on exit
- `mode="wait"` ensures clean transitions with no layout flashing

---

## 🔮 Future Enhancements

Features that can be added to further improve the portfolio:

| Feature | Description | Complexity |
|---|---|---|
| **Blog / Articles Page** | Write and publish technical blog posts (MDX-based) with syntax highlighting, tags, and reading time | Medium |
| **Testimonials Section** | Carousel of client/colleague testimonials with profile photos and LinkedIn links | Low |
| **GitHub Activity Feed** | Real-time GitHub contribution graph and recent commit activity via GitHub API | Medium |
| **Project Demo Deployments** | Live demo links for select projects (deployed on Vercel/Netlify) instead of just GitHub links | Medium |
| **Multi-language Support** | i18n support for Telugu, Hindi, and English using `react-i18next` | Medium |
| **Analytics Dashboard** | Visitor count, page views, and geographic data using Vercel Analytics or Plausible | Low |
| **PWA Support** | Service worker + manifest for installable Progressive Web App with offline access | Low |
| **Project Case Studies** | Detailed case study pages for featured projects with problem/solution/results format | High |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available for personal use and learning purposes.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/sreenath165">Sai Sreenath Reddy Yarradoddi</a>
</p>
