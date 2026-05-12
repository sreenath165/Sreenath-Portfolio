# Portfolio Deployment Guide

Complete step-by-step guide to deploy your portfolio with the AI chatbot backend.

---

## 📋 Prerequisites

1. **GitHub Account** - For hosting your code
2. **Vercel Account** - For frontend deployment (free tier)
3. **Render Account** - For backend deployment (free tier)
4. **Groq API Key** - Already configured in your `.env`

---

## 🚀 Step 1: Push to GitHub

### 1.1 Initialize Git (if not already done)

```bash
cd c:\Users\Sreenath\Desktop\Portfolio
git init
```

### 1.2 Create .gitignore at root

Create a `.gitignore` file in the root `Portfolio` folder:

```gitignore
# Dependencies
node_modules/
__pycache__/
*.py[cod]
venv/
.venv/

# Environment files (IMPORTANT: Don't commit secrets!)
.env
backend/.env

# Build outputs
dist/
build/

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# ChromaDB (will be regenerated)
backend/chroma_db/

# Logs
*.log
```

### 1.3 Add and Commit

```bash
git add .
git commit -m "Initial commit: Portfolio with AI chatbot"
```

### 1.4 Push to GitHub

```bash
# If you already have a repo created on GitHub:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended for easy repo access)

### 2.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `portfolio-ai-backend` |
| **Root Directory** | `backend` |
| **Environment** | `Docker` |
| **Branch** | `main` |
| **Instance Type** | `Free` |

### 2.3 Add Environment Variables

In the Render dashboard, go to **Environment** tab and add:

| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | `API KEY type it here` |

> ⚠️ **Security Note**: For production, create a new Groq API key and keep it secret.

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for the build to complete (first build takes ~5-10 minutes)
3. Note your backend URL: `https://portfolio-ai-backend.onrender.com`

### 2.5 Verify Backend

Visit: `https://YOUR-BACKEND-URL.onrender.com/health`

You should see:
```json
{
  "status": "healthy",
  "documents_indexed": 50
}
```

---

## 🌐 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub

### 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Configure:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `portfolio` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 3.3 Add Environment Variables

In Vercel project settings → **Environment Variables**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND-URL.onrender.com` |

Replace `YOUR-BACKEND-URL` with your actual Render URL.

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Your site is live at: `https://your-project.vercel.app`

### 3.5 Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

---

## 🔄 Step 4: Verify Everything Works

### 4.1 Test the Chatbot

1. Visit your deployed frontend
2. Click the chat button (bottom right)
3. Wait for status to show **"Online"** (green dot)
4. Ask a question like: "What are Sai's skills?"

### 4.2 Expected Behavior

- ✅ Chat opens with greeting
- ✅ Status shows "Online" with green indicator
- ✅ Messages stream in word-by-word (typing effect)
- ✅ Responses are clean without weird symbols
- ✅ Off-topic questions are politely refused

---

## ⚠️ Important Notes

### Render Free Tier Limitations

- **Cold Starts**: After 15 minutes of inactivity, the service sleeps. First request after sleep takes ~30-60 seconds.
- **Solution**: The chatbot shows "Connecting..." during this time.

### First Deployment

- First backend deployment downloads the embedding model (~130MB)
- This is cached for subsequent deployments
- Initial startup may take 1-2 minutes

### Updating Content

When you update your portfolio content:

1. Update `backend/app/rag/ingest.py` with new content
2. Push to GitHub
3. Render auto-deploys
4. New embeddings are generated on startup

---

## 🔧 Troubleshooting

### Chatbot Shows "Offline"

1. Check Render dashboard for errors
2. Visit backend `/health` endpoint
3. Check browser console for CORS errors

### Slow First Response

- Normal for Render free tier (cold start)
- Wait 30-60 seconds for first response

### CORS Errors

Add your frontend URL to `backend/app/config.py`:

```python
frontend_urls: list[str] = [
    "https://your-site.vercel.app",
    # ... other URLs
]
```

### Embedding Model Download Fails

- Check Render logs for memory issues
- Free tier has 512MB RAM limit
- BGE-small model should work fine

---

## 📊 Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│  Vercel         │  HTTPS  │  Render         │
│  (Frontend)     │◄───────►│  (Backend)      │
│                 │         │                 │
│  - React        │         │  - FastAPI      │
│  - TypeScript   │         │  - LangChain    │
│  - Vite         │         │  - ChromaDB     │
│                 │         │  - Groq LLM     │
└─────────────────┘         └─────────────────┘
```

---

## 🎉 You're Done!

Your portfolio with AI chatbot is now live! 

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://portfolio-ai-backend.onrender.com`
- **API Docs**: `https://portfolio-ai-backend.onrender.com/docs`

---

## 📝 Quick Commands Reference

```bash
# Local Development
cd portfolio && npm run dev          # Frontend
cd backend && uvicorn app.main:app --reload --port 10000  # Backend

# Git Commands
git add .
git commit -m "Your message"
git push origin main

# Check TypeScript
cd portfolio && npx tsc --noEmit
```
