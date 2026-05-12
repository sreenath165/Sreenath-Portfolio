# Sai Sreenath Reddy Y - Portfolio

A modern, professional multi-page portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Icons:** Lucide React + React Icons
- **UI Components:** Radix UI + Custom ShadCN-style components
- **Forms:** React Hook Form + Zod validation
- **Fonts:** Space Grotesk (headings) + DM Sans (body)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── common/          # PageHeader, SectionWrapper, ScrollToTop, ChatbotButton
│   │   ├── layout/          # Navbar, Footer, Layout
│   │   └── ui/              # Button, Card, Badge, Input, etc.
│   ├── data/
│   │   └── profile.ts       # ⭐ MAIN DATA FILE - All portfolio content
│   ├── pages/               # All page components
│   ├── styles/
│   │   └── globals.css      # Global styles, colors, fonts
│   └── App.tsx              # Routing configuration
├── public/
│   ├── images/
│   │   ├── profile.jpg      # Your profile photo
│   │   ├── projects/        # Project screenshots
│   │   └── certifications/  # Certificate images
│   └── resume/
│       └── SaiSreenath_Resume.pdf
└── index.html               # Meta tags, fonts, favicon
```

## 🛠️ Quick Start

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📝 SECTION-WISE EDITABLE ITEMS (Exact File Paths)

### 1. PROFILE INFORMATION
**File:** `src/data/profile.ts`

| Item | Line | What to Edit |
|------|------|--------------|
| Full Name | Line 2 | `name: "Sai Sreenath Reddy Yarradoddi"` |
| Short Name | Line 3 | `shortName: "Sai Sreenath"` |
| Role/Title | Line 4 | `role: "Software Engineer - Python | AI/ML..."` |
| Email | Line 5 | `email: "saisreenathreddyy@gmail.com"` |
| Phone | Line 6 | `phone: "+91 8688718090"` |
| Location | Line 7 | `location: "Hyderabad, India"` |
| LinkedIn URL | Line 9 | `linkedin: "https://in.linkedin.com/..."` |
| GitHub URL | Line 10 | `github: "https://github.com/..."` |
| Summary | Line 12 | `summary: \`Your summary text...\`` |

### 2. PROFILE PHOTO
**File:** `public/images/profile.jpg`
- Replace this file with your photo
- Recommended: Square image, at least 400x400px
- Referenced in: `src/data/profile.ts` Line 8

### 3. ABOUT SECTION
**File:** `src/data/profile.ts` (Lines 14-31)

| Item | Line | What to Edit |
|------|------|--------------|
| Introduction | Line 15 | `introduction: \`...\`` |
| Career Objective | Line 17 | `careerObjective: \`...\`` |
| Strengths | Lines 19-28 | Array of strength strings |
| Personal Intro | Line 30 | `personalIntro: \`...\`` |

### 4. SKILLS
**File:** `src/data/profile.ts` (Lines 34-63)

```typescript
// To add a new skill category, add after line 62:
newCategory: {
  title: "Category Name",
  items: ["Skill 1", "Skill 2", "Skill 3"]
}
```

| Category | Lines | Edit Items Array |
|----------|-------|------------------|
| Programming | 35-38 | `items: ["Python", "JavaScript", ...]` |
| AI | 39-46 | `items: ["LLMs", "RAG", ...]` |
| Backend & Frontend | 47-50 | `items: ["Flask", "FastAPI", ...]` |
| Frameworks | 51-54 | `items: ["TensorFlow", ...]` |
| DevOps & Cloud | 55-58 | `items: ["AWS", "Azure", ...]` |
| Databases | 59-62 | `items: ["MongoDB", "SQL", ...]` |

### 5. WORK EXPERIENCE
**File:** `src/data/profile.ts` (Lines 65-92)

To add new experience, add to the `experience` array:
```typescript
{
  id: 3,  // Increment ID
  title: "Job Title",
  company: "Company Name",
  location: "City, Country",
  period: "Month Year - Present",
  type: "Full-time",
  description: [
    "Achievement 1",
    "Achievement 2"
  ],
  technologies: ["Tech1", "Tech2"]
}
```

### 6. PROJECTS
**File:** `src/data/profile.ts` (Lines 94-147)

| Project | Lines | Image Path |
|---------|-------|------------|
| Propello | 95-105 | `public/images/projects/propello.jpg` |
| ProdSync | 106-116 | `public/images/projects/prodsync.jpg` |
| Weed Detection | 117-126 | `public/images/projects/weed-detection.jpg` |
| FAQ Assistant | 127-136 | `public/images/projects/faq-assistant.jpg` |
| Ticket Analyzer | 137-146 | `public/images/projects/ticket-analyzer.jpg` |

**To add a new project:**
```typescript
{
  id: 6,
  title: "Project Name",
  description: "Description...",
  technologies: ["Tech1", "Tech2"],
  features: ["Feature 1", "Feature 2"],
  image: "/images/projects/your-project.jpg",  // Add image to public/images/projects/
  github: "https://github.com/...",
  demo: "https://demo-url.com",  // Optional
  featured: true  // Shows on home page if true
}
```

**Pending Project Updates:**
| Item | Line | Current Value |
|------|------|---------------|
| Propello GitHub | 102 | `"[ADD GITHUB LINK]"` |
| Propello Demo | 103 | `"[ADD PROJECT DEMO]"` |
| ProdSync GitHub | 113 | `"[ADD GITHUB LINK]"` |
| ProdSync Demo | 114 | `"[ADD PROJECT DEMO]"` |

### 7. CERTIFICATIONS
**File:** `src/data/profile.ts` (Lines 149-204)

| Certification | Lines | Image Path |
|---------------|-------|------------|
| AWS CCP | 150-158 | `public/images/certifications/aws-ccp.jpg` |
| AWS Bedrock | 159-167 | `public/images/certifications/aws-bedrock.jpg` |
| Agentic AI | 168-176 | `public/images/certifications/agentic-ai.jpg` |
| RAG | 177-185 | `public/images/certifications/rag.jpg` |
| Azure Admin | 186-194 | `public/images/certifications/azure-admin.jpg` |
| Azure AI | 195-203 | `public/images/certifications/azure-ai.jpg` |

**Pending Verify Links:**
| Certification | Line | Current Value |
|---------------|------|---------------|
| AWS Bedrock | 166 | `"[ADD VERIFY LINK]"` |
| Agentic AI | 175 | `"[ADD VERIFY LINK]"` |
| RAG | 184 | `"[ADD VERIFY LINK]"` |

**To add a new certification:**
```typescript
{
  id: 7,
  title: "Certification Name",
  issuer: "Issuing Organization",
  date: "Month Year",
  description: "What this certification covers.",
  image: "/images/certifications/cert-name.jpg",
  verifyLink: "https://verify-url.com"
}
```

### 8. EDUCATION
**File:** `src/data/profile.ts` (Lines 206-234)

| Education | Lines |
|-----------|-------|
| B.Tech VIT | 207-215 |
| Intermediate | 216-224 |
| SSC | 225-233 |

**To add new education:**
```typescript
{
  id: 4,
  degree: "Degree Name",
  institution: "Institution Name",
  location: "City",
  period: "Start - End",
  score: "Score/GPA",
  description: "Description..."
}
```

### 9. HOME PAGE STATS
**File:** `src/pages/Home.tsx` (Lines 53-66)

| Stat | Line | Current Value |
|------|------|---------------|
| Years Professional | 55 | `"~1"` |
| Years AI/ML Skills | 59 | `"2-3"` |
| Certifications Count | 63 | `"6+"` |

### 10. RESUME PAGE STATS
**File:** `src/pages/Resume.tsx` (Lines 72-89)

Same stats as Home page - update both files to keep consistent.

### 11. RESUME PDF
**File:** `public/resume/SaiSreenath_Resume.pdf`
- Replace this file with your updated resume
- Keep the same filename OR update path in `src/pages/Resume.tsx` Line 10

### 12. FOOTER NAME
**File:** `src/components/layout/Footer.tsx`

| Item | Line | Current Value |
|------|------|---------------|
| Name (top) | 15 | `"Sai Sreenath Reddy Y"` |
| Copyright | 90 | `"Sai Sreenath Reddy Y"` |

### 13. NAVBAR
**File:** `src/components/layout/Navbar.tsx`
- Logo/Icon: Lines 20-25
- Navigation Links: Lines 10-18

### 14. CHATBOT BUTTON
**File:** `src/components/layout/Layout.tsx` Line 17

Change status: `"online"` | `"connecting"` | `"offline"`
```typescript
<ChatbotButton status="offline" />
```

**Chatbot Messages:**
**File:** `src/components/common/ChatbotButton.tsx` (Lines 13-28)

### 15. COLORS & THEME
**File:** `src/styles/globals.css` (Lines 5-51)

| Theme | Lines | Colors |
|-------|-------|--------|
| Light Mode | 6-27 | White bg, dark navy text, orange accent |
| Dark Mode | 30-51 | Dark navy bg, white text, orange accent |

Primary color (orange): `--primary: 37 100% 50%`

### 16. FONTS
**File:** `index.html` Line 35
**File:** `src/styles/globals.css` Lines 68-74

Current fonts:
- Headings: Space Grotesk
- Body: DM Sans

### 17. META TAGS & SEO
**File:** `index.html` (Lines 7-27)

| Item | Line |
|------|------|
| Page Title | 8 |
| Description | 10 |
| Keywords | 11 |
| OG Image | 19 |
| Theme Color | 38 |

### 18. SOCIAL PREVIEW IMAGE
**File:** `public/images/og-image.jpg`
- Recommended size: 1200x630px
- Shows when sharing on social media

---

## 📋 PENDING ITEMS CHECKLIST

### Images to Add:
- [ ] `public/images/profile.jpg` - Your profile photo
- [ ] `public/images/og-image.jpg` - Social media preview
- [ ] `public/images/projects/propello.jpg`
- [ ] `public/images/projects/prodsync.jpg`
- [ ] `public/images/projects/weed-detection.jpg`
- [ ] `public/images/projects/faq-assistant.jpg`
- [ ] `public/images/projects/ticket-analyzer.jpg`
- [ ] `public/images/certifications/aws-ccp.jpg`
- [ ] `public/images/certifications/aws-bedrock.jpg`
- [ ] `public/images/certifications/agentic-ai.jpg`
- [ ] `public/images/certifications/rag.jpg`
- [ ] `public/images/certifications/azure-admin.jpg`
- [ ] `public/images/certifications/azure-ai.jpg`

### Links to Update in `src/data/profile.ts`:
- [ ] Line 102: Propello GitHub link
- [ ] Line 103: Propello Demo link
- [ ] Line 113: ProdSync GitHub link
- [ ] Line 114: ProdSync Demo link
- [ ] Line 166: AWS Bedrock verify link
- [ ] Line 175: Agentic AI verify link
- [ ] Line 184: RAG verify link

### Files to Replace:
- [ ] `public/resume/SaiSreenath_Resume.pdf` - Your resume

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```
Vercel auto-deploys on push.

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

---

## 📄 License

MIT License

---

Built with ❤️ by Sai Sreenath Reddy Y
