import type { VercelRequest, VercelResponse } from '@vercel/node';

// ─── Portfolio Context ───────────────────────────────────────────────
// All portfolio data embedded directly — no vector DB needed
const PORTFOLIO_CONTEXT = `
# Sai Sreenath Reddy Yarradoddi — Full Portfolio

## PROFILE
- Name: Sai Sreenath Reddy Yarradoddi
- Short Name: Sai Sreenath
- Role: Software Engineer — Python | AI/ML | Agentic AI | AWS | React
- Email: saisreenathreddyy@gmail.com
- Phone: +91 8688718090
- Location: Hyderabad, India
- LinkedIn: https://in.linkedin.com/in/sreenathreddy165
- GitHub: https://github.com/sreenath165
- YouTube: https://www.youtube.com/@thescramblershooter
- Instagram: https://www.instagram.com/sai._.sreenathh/
- Portfolio: https://sreenath-portfolio-ten.vercel.app/

## SUMMARY
A software engineer specializing in Agentic AI, LLM-powered applications, and RAG pipelines. AWS & Azure certified with expertise in Python backend development and cloud-native deployments.

## ABOUT
I am a passionate Software Engineer specializing in Artificial Intelligence and Machine Learning, with a focus on building production-ready Agentic AI systems. My expertise lies in developing LLM-powered applications that solve real-world business problems. With hands-on experience across the full AI development lifecycle, I bring ideas from concept to deployment, ensuring scalability and reliability at every step.

## CAREER OBJECTIVE
To leverage my expertise in AI/ML and cloud technologies to build innovative solutions that drive business transformation. I aim to work on challenging projects that push the boundaries of what's possible with artificial intelligence while delivering measurable impact.

## KEY STRENGTHS
- Building production-ready Agentic AI systems
- Designing scalable RAG pipelines and multi-agent architectures
- Python-based backend development
- Cloud-native deployments on AWS and Azure
- Translating complex AI concepts into practical solutions
- Strong communication and team collaboration
- Problem-solving and analytical thinking
- End-to-end solution delivery

## PERSONAL
Beyond coding, content creator running a YouTube channel for motovlogging adventures. Passionate motorcyclist who loves exploring new places.

---

## TECHNICAL SKILLS

### Programming & Software Engineering
Python, JavaScript, TypeScript, Java, C++, SQL, HTML/CSS, Backend API Development, Object-Oriented Programming, Data Structures & Algorithms

### Artificial Intelligence
LLMs (Large Language Models), RAG (Retrieval Augmented Generation), Agentic AI Systems, Multi-Agent Architectures, LangChain, LangGraph, n8n, Flowise, Prompt Engineering

### Backend & Frontend Development
Flask, FastAPI, REST APIs, React, TypeScript, Android Studio, Figma

### Frameworks & Libraries
TensorFlow, Scikit-Learn, NumPy, Pandas, OpenPyXL

### DevOps & Cloud
AWS (Amazon Web Services), Azure, Docker, Kubernetes, Git, CI/CD Pipelines

### Databases
MongoDB, SQL, VectorDB (ChromaDB, FAISS), Cassandra

---

## WORK EXPERIENCE

### 1. Senior Associate — DES — App Dev
Company: Sutherland Global Services Pvt. Ltd.
Location: Hyderabad, Telangana, India
Period: November 2025 — Present
Type: Full-time
Technologies: Python, FastAPI, React, TypeScript, AWS Bedrock, MongoDB

Responsibilities:
- Worked in the development of an Agentic AI-powered proposal platform for IT service teams named Propello, reducing proposal creation time by ~60%.
- Built and integrated an end-to-end RAG-based Q&A AI Agent and led backend/API integrations across the platform.

Project A: Propello — AI Proposal Builder
- Developed an Agentic AI-powered proposal platform for IT service teams
- Automates the entire proposal creation workflow using RAG pipelines and LLM orchestration
- Generates high-quality proposals from templates and historical data
- Tools: Python, FastAPI, React, TypeScript, AWS Bedrock, MongoDB, LangChain
- Key Achievement: Reduced proposal creation time by approximately 60%

Project B: RAG-based Q&A Agent
- Built end-to-end RAG-based Q&A AI Agent with context-aware responses
- Retrieves relevant information from document stores and generates accurate answers
- Tools: Python, LangChain, AWS Bedrock, Vector Database, FastAPI
- Key Achievement: Enabled instant, accurate responses to complex proposal-related queries

### 2. AI/ML Engineer
Company: Versalence Infocomm Pvt. Ltd.
Location: Bengaluru, Karnataka, India
Period: April 2025 — October 2025
Type: Full-time
Technologies: Python, Gemini LLM, Pandas, OpenPyXL, RAG, Android

Responsibilities:
- Built an industry-first Agentic AI system using custom RAG + LLM orchestration to automate QRF-to-BOQ generation, reducing manual effort by ~70%.
- Delivered an AI-powered Android & iOS application with a native-language voice assistant for the Telangana Government.

Project A: QRF-to-BOQ Automation System
- Industry-first Agentic AI system for converting Quotation Request Forms to Bill of Quantities
- Tools: Python, Gemini LLM, Pandas, OpenPyXL, RAG, Custom LLM Orchestration
- Key Achievement: Reduced manual effort by approximately 70%
- Client: Enterprise Clients

Project B: Telangana Government Voice Assistant App
- AI-powered Android & iOS app with native-language voice assistant
- Enables citizens to interact with government services using voice commands in Telugu and regional languages
- Tools: Android Studio, Firebase, Gemini LLM, Speech-to-Text, Text-to-Speech
- Key Achievement: Enabled multilingual voice-based access to government services
- Client: Telangana State Government

---

## PROJECTS (14 Total)

### Featured Projects

1. Propello — AI Proposal Builder (Featured)
   Scalable backend integrations using Python, Agentic AI, RAG, FastAPI, React, and MongoDB for end-to-end AI-driven proposal workflows.
   Technologies: Python, FastAPI, React, MongoDB, Agentic AI, RAG
   Features: End-to-end workflow automation, LLM-based AI logic, Intelligent agent orchestration

2. ProdSync — Deployment Orchestration (Featured)
   Automated deployment orchestration platform with AI-driven intelligence, natural language processing, and DevOps integration.
   Technologies: Python, FastAPI, React, TypeScript, AWS Bedrock, Tailwind CSS
   Features: Natural language deployment, JIRA integration, Real-time monitoring, Intelligent rollback

3. Smart Weed Detection Robot (Featured)
   Mobile-controlled robot using YOLOv5 and CNN for weed detection and targeted herbicide spraying with Android app integration.
   Technologies: Python, YOLOv5, CNN, Android, Bluetooth, TensorFlow
   Features: Real-time weed detection, Soil moisture analysis, Live video streaming, Mobile control

### Other Projects

4. AI-Powered FAQ Assistant — GPT-3.5-based with LangChain & FAISS for context-aware FAQ responses (Streamlit interface)
   GitHub: https://github.com/sreenath165/AI-Powered-FAQ-Assistant-with-Context-Aware-Memory

5. Customer Support Ticket Analyzer — Agentic AI for intelligent classification/routing using multi-agent architecture
   GitHub: https://github.com/sreenath165/Customer-Support-Ticket-Analyzer-And-Router

6. E-Commerce Sales & Inventory Management — Full-stack platform with analytics dashboard
   GitHub: https://github.com/sreenath165/E-Commerce-Sales-and-Inventory-Management

7. Blockchain Hospital Record Management — Blockchain-based tamper-proof medical data storage
   GitHub: https://github.com/sreenath165/Blockchain-based-Hospital-Record-management

8. Post-Quantum Lattice-Based RSA — Lightweight post-quantum cryptographic implementation
   GitHub: https://github.com/sreenath165/A-Lightweight-Post-Quantum-Lattice-Based-RSA-for-Secure-Communications

9. Fertilizer Prediction using ML — ML model for optimal fertilizer recommendations
   GitHub: https://github.com/sreenath165/Fertilizer-Prediction-using-ML

10. Freelance Platform — Web-based freelance marketplace
    GitHub: https://github.com/sreenath165/Freelance-Platform

11. 2D Bee Run Game — Unity endless runner game
    GitHub: https://github.com/sreenath165/2D-Bee-run-game-using-Unity

12. 3D Ball Game — Unity physics-based 3D game
    GitHub: https://github.com/sreenath165/3D-Ball-game-using-Unity

13. Immersive 3D Environment — Unity realistic 3D environment
    GitHub: https://github.com/sreenath165/Immersive-Realistic-3D-Environment-using-Unity

14. Weed Detection & Plucking Robot (Hybrid CNN) — Autonomous robot with Hybrid CNN
    GitHub: https://github.com/sreenath165/Weed-Detection-And-Plucking-Robot-Using-Hybrid-CNN

---

## CERTIFICATIONS

1. AWS Certified Cloud Practitioner — Amazon Web Services, December 2024
   Verification: https://cp.certmetrics.com/amazon/en/public/verify/credential/PEYGKJGDS14Q1L3T

2. AWS Generative AI and AI Agents with Amazon Bedrock — Coursera, 2024

3. AI Agents and Agentic AI with Python — Coursera, 2024

4. RAG by Deep Learning.AI — Coursera, 2024

5. Microsoft Certified: Azure Administrator Associate (AZ-104) — Microsoft, October 2024
   Verification: https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/572c716e8633f085

6. Microsoft Certified: Azure AI Fundamentals (AI-900) — Microsoft, September 2024
   Verification: https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/94e29beb87903a3f

---

## EDUCATION

1. B.Tech in Computer Science and Engineering
   Institution: Vellore Institute of Technology (VIT), Chennai
   Period: September 2021 — April 2025
   CGPA: 7.56/10
   Focus: Software engineering, AI/ML, cloud computing

2. Intermediate (Higher Secondary)
   Institution: FIITJEE Junior College, Vijayawada
   Period: June 2019 — July 2021
   Score: 965/1000

3. SSC (Secondary School Certificate)
   Institution: Government High School, Piler
   Period: June 2018 — May 2019
   GPA: 10/10

---

## ROLE FIT ANALYSIS

Based on the above profile, Sai Sreenath is an excellent fit for:
- AI/ML Engineer roles (Agentic AI, RAG, LLM systems)
- Python Backend Developer roles (FastAPI, Flask, REST APIs)
- Full-Stack Developer roles (React + Python backend)
- Cloud Engineer / DevOps roles (AWS, Azure, Docker, Kubernetes)
- Software Engineer roles (general software development)
- AI Solutions Architect roles (end-to-end AI solution design)
- Data Engineer roles (data pipelines, ML infrastructure)
- Research Engineer roles (NLP, Computer Vision)

He is available for freelancing, contract work, and full-time opportunities.
`;

// ─── System Prompt ───────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are "Sree AI", the friendly and professional portfolio assistant for Sai Sreenath Reddy Yarradoddi.

## YOUR IDENTITY
You represent Sai Sreenath Reddy Yarradoddi — a Software Engineer specializing in AI/ML, Agentic AI, RAG pipelines, and cloud technologies (AWS, Azure). You are embedded in his portfolio website.

## HOW TO ANSWER
- Use the PORTFOLIO CONTEXT below as your ONLY source of truth.
- Be conversational, warm, enthusiastic, and professional about Sai's work.
- Keep responses concise and well-structured (2-4 paragraphs max).
- Use bullet points (•) for lists.
- Do NOT use markdown formatting like **bold**, __underline__, or \`code\`.
- Do NOT use headers (#), code blocks, or any rich formatting.
- Write in plain text only.

## WHAT YOU CAN ANSWER
1. Questions about Sai's profile, skills, experience, projects, certifications, education, contact info
2. Questions about what roles/jobs Sai is a good fit for — analyze based on his skills and experience
3. Questions about Sai's availability for freelancing or contract work
4. Questions about specific technologies Sai knows
5. Greetings and introductions — introduce yourself warmly
6. Questions about this portfolio website

## WHAT YOU MUST REJECT (POLITELY)
If a question is NOT related to any of the above topics, respond ONLY with this exact message:
"I appreciate your curiosity! However, I'm Sree AI — Sai Sreenath's portfolio assistant, and I can only help with questions about his professional background. Feel free to ask me about his projects, skills, experience, certifications, or what roles he'd be a great fit for!"

Examples of what to reject:
- General knowledge questions (history, science, geography, etc.)
- Current events, politics, news
- Coding help or debugging unrelated to Sai's projects
- Personal opinions, advice, or recommendations unrelated to career
- Harmful, offensive, or inappropriate content
- Weather, sports, entertainment

## PORTFOLIO CONTEXT
${PORTFOLIO_CONTEXT}

## IMPORTANT RULES
- Never make up information not present in the portfolio context.
- Always be enthusiastic about Sai's achievements.
- When discussing role fit, cite specific projects and certifications.
- Encourage visitors to explore the portfolio website, GitHub, or reach out via contact page.
- Keep responses under 300 words unless the question requires detailed analysis.`;


// ─── Rate Limiting ───────────────────────────────────────────────────
// Best-effort, per serverless instance: caps how fast one visitor can spend Groq quota.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const requestLog = new Map<string, number[]>();

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const first = Array.isArray(fwd) ? fwd[0] : fwd;
  return (first?.split(',')[0].trim()) || (req.headers['x-real-ip'] as string) || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  if (requestLog.size > 5000) {
    for (const [key, times] of requestLog) {
      if (times.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

// ─── Conversation History ────────────────────────────────────────────
// The widget sends recent turns so follow-up questions ("tell me more about that") work.
const MAX_HISTORY_TURNS = 8;
const MAX_HISTORY_CHARS = 1500;

function sanitizeHistory(history: unknown): Array<{ role: 'user' | 'assistant'; content: string }> {
  if (!Array.isArray(history)) return [];
  return history
    .filter((m): m is { role: 'user' | 'assistant'; content: string } =>
      !!m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim().length > 0)
    .slice(-MAX_HISTORY_TURNS)
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_HISTORY_CHARS) }));
}

// ─── Main Handler ────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Same-origin only: the widget calls /api/chat from this site, so no CORS headers are sent.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(getClientIp(req))) {
    res.setHeader('Retry-After', String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    return res.status(429).json({ error: 'Too many messages. Please wait a minute and try again.' });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error: API key not set. Please add GROQ_API_KEY to Vercel environment variables.' });
  }

  try {
    const candidateModels = [
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'groq/compound-mini',
    ];

  let answer = '';
  let lastError = '';

  for (const model of candidateModels) {
    try {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...sanitizeHistory(history),
            { role: 'user', content: message.trim() },
          ],
          temperature: 0.3,
          max_tokens: 1024,
          stream: false,
        }),
      });

      if (groqResponse.ok) {
        const data = await groqResponse.json() as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        answer = data.choices?.[0]?.message?.content || '';
        if (answer) break;
      } else {
        lastError = await groqResponse.text();
        console.warn(`Model ${model} failed with status ${groqResponse.status}: ${lastError}`);
      }
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(`Error calling model ${model}: ${lastError}`);
    }
  }

  if (!answer) {
    console.error('All model candidates failed. Last error:', lastError);
    return res.status(502).json({ error: 'AI service temporarily unavailable. Please try again.' });
  }

  return res.status(200).json({
    answer: cleanResponse(answer),
    sources: [],
    relevant: true,
  });
} catch (error: unknown) {
  const errMsg = error instanceof Error ? error.message : String(error);
  console.error('Chat handler error:', errMsg);
  return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
}
}

// ─── Clean Response ──────────────────────────────────────────────────
function cleanResponse(text: string): string {
  let cleaned = text.replace(/\*\*/g, '').replace(/__/g, '');

  const lines = cleaned.split('\n');
  const cleanedLines = lines.map(line => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('* ')) {
      return line.replace('* ', '• ');
    }
    if (trimmed.startsWith('- ')) {
      return line.replace('- ', '• ');
    }
    return line;
  });
  cleaned = cleanedLines.join('\n');

  cleaned = cleaned.replace(/```/g, '');
  cleaned = cleaned.replace(/^#+\s/gm, '');

  while (cleaned.includes('  ')) {
    cleaned = cleaned.replace(/  /g, ' ');
  }

  return cleaned.trim();
}
