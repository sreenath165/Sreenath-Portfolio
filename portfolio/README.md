# Portfolio — editing guide

Quick reference for updating content. For the architecture, chatbot and deployment, see the [root README](../README.md).

```bash
npm install
npm run dev      # http://localhost:5173 (set GROQ_API_KEY in .env for the chatbot)
npm run build    # type-check + production build
npm run lint
```

## Where things live

Almost everything you will want to change is in **`src/data/profile.ts`**. Sections and pages only render that data.

| To change… | Edit in `src/data/profile.ts` |
|---|---|
| Name, role, email, socials, current employer | `profile` |
| Hero subtitle, summary, "open to" badge | `profile.hero` |
| The three numbers under the hero | `proofStats` |
| About summary, 4 key strengths, beyond-code line | `profile.about` |
| Core skills with proof, and the 5 skill groups | `coreSkills`, `skillGroups` |
| Jobs, bullets (bold number = `highlight`), per-role project details | `experience` |
| Projects, their filter categories and section (`tier`) | `projects` |
| Case study text and architecture diagram | `projects[].caseStudy` (only for `tier: 'featured'`) |
| Certifications vs courses | `certifications` (`kind`) |
| Education | `education` (`primary: true` is the main card) |

### Projects

- `tier: 'featured'` → case-study card on Home/Projects and a page at `/projects/<slug>`.
- `tier: 'main'` → **Other projects**. `tier: 'more'` → the collapsed **More projects** section.
- `categories` drive the 5 filters: `AI`, `Full-Stack`, `Cloud`, `ML`, `Other`.
- Images that do not exist yet are simply not shown, so you can add `public/images/projects/<name>.jpg` later without code changes.

### Links still to add

Links that still start with `[` (for example `"[ADD GITHUB LINK]"`) are hidden on the site until you replace them:

- Propello and ProdSync `github` / `demo`
- The three Coursera `verifyLink`s

### Images

| File | Used for |
|---|---|
| `public/images/profile-portrait.webp` (680×850) | Hero photo on desktop |
| `public/images/profile-headshot.webp` (320×320) | Hero avatar on phones |
| `public/images/og-image.png` (1200×630) | LinkedIn/WhatsApp link preview — regenerate with `node scripts/og-image/render.cjs` |
| `public/resume/SaiSreenath_Resume.pdf` | Resume (downloads as `Sai-Sreenath-Reddy-Yarradoddi-Resume.pdf`) |

To replace the photo, overwrite the two profile files with the same names and sizes, then regenerate the preview image.

## Design system

Colors, spacing and radius are tokens in `src/styles/globals.css` (light and dark). Use the existing utilities instead of raw colors:

- `text-foreground` / `text-muted-foreground` for text, `text-brand` for accent text and links
- `Button` (default = amber primary, `outline` = secondary), `Card`, and the `.chip` class for tags
- `Section` (home sections) and `PageHeader` (standalone pages) for consistent spacing

## Contact form

`src/sections/ContactSection.tsx` validates input but does **not** deliver messages yet (`onSubmit` only simulates a send). Wire it to an email API before relying on it.
