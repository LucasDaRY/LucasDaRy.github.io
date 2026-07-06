# lucas-david-ry.com — Project Vision & Principles

**Purpose of this document**: Single source of truth for *what* the site must achieve and *why*. Execution details, phased checklist, and collaboration process live in TODO.md and the current implementation plan.

Updated: 2026-06-13 (adopted react-i18next for bilingual implementation after DIY context evaluation; see i18n migration steps and updated guardrail below)

---

## 1. Goals (Why We Are Doing This)

Create a **simple but beautiful** professional portfolio that:

- **Passes HR / recruiter screens in seconds**: Name + title + flagship value prop + proof points (FANUC Olympiads, Super Heavy catch project, strong academics + TOEIC, C++/ROS/control work) are immediately visible and scannable.
- **Helps land the job**: Demonstrates real engineering substance (2.5-year solo flagship with sim + hardware validation, team competition experience, internship impact, programming depth, discipline via sports/outreach). Feels competent, ambitious, and human.
- **Reflects you**: Retains authentic voice (including the spirit of "Civilization has been in V1 for too long"), bilingual identity, and the robotics/space/hardware-in-the-loop personality from the original site.
- Stays lightweight and maintainable by *you* with full ownership.

Non-goals for MVP: complex blog, backend form handling, heavy custom interactions beyond the specified 3D accent, multi-project deep pages (link out to existing materials).

---

## 2. Target Audience & Success Criteria

**Primary readers** (in order of scanning priority):
1. HR / talent sourcers (very short attention, keyword + structure scan).
2. Hiring managers / senior engineers in robotics, mechatronics, controls, simulation, industrial automation, aerospace-adjacent.
3. Peers, professors, collaborators who know the FANUC / Super Heavy context.

**What "good" looks like**:
- In 5–10 seconds a reader can name your current studies, the flagship project, the competition, and one standout skill.
- The site feels modern, clean, and trustworthy (not corporate template, not toy/portfolio gimmick).
- Bilingual toggle is obvious and zero-friction.
- 3D elements (Mars sphere, spaceship, robot arm) provide instant "this person does space/robotics hardware" flavor without slowing the page or competing with the text.
- You are proud to share the URL and can explain every part of the site and its content.

MVP is successful when the above is true on desktop + mobile, the build exports cleanly for GitHub Pages, and you have full understanding/ownership of the code.

---

## 3. Content Priorities (Mapped from previous_website/index.html)

Raw material to be adapted by you later. Order below reflects job-getting priority.

- **Identity / Hero**: Full name, "Student in Robotics Engineering at Polytech Dijon", bilingual tagline, "What I'm currently doing" list (FANUC Olympiads, Flagship SH Catch project + links to viz + defense deck, ROS2 remote control on Raspi, Tower Defense C++, group projects).
- **Flagship Project** (highest emphasis): 2.5-year solo reverse-engineer of Super Heavy Booster catch. Sim environment + physical recreation on real FANUC cell with sensorized/actuated mockups. Explicit gains: FANUC programming, 3D CAD & printing, non-convex control theory.
- **Experiences** (timeline or clear cards): FANUC Olympiads (ROBOGUIDE sim lead), Erasmus Days video, physical robotic cell remodel (before/after images), ImVia Lab internship (MIT France + Safran presentation, GUI work, CFD start, custom dynamic pathing on FANUC R-30iA), older items (Club NSI, Intermarché).
- **Education**: Polytech Dijon Robotics (delegate 2 years), TOEIC 970/990 (Feb 2025), Prépa MP2I/MPI, BAC honors.
- **Skills / Programming Experience**: C++ (sockets, multithreading, ImGui, Boost Graph, SFML), Web dev for interfaces/graphs/3D/ROS control, MATLAB/Simulink/Simscape (control systems focus).
- **Sports & Character**: Volleyball (CVB regional middle blocker, serious training load), 2021 gym transformation, Taekwondo (European champion coach).
- **Local Involvement**: Village des Sciences volunteer (robots for kids, VR, live 2024 Super Heavy catch, 2025 project demo).
- **Contacts & Assets**: X @LucasDaRiYv, email, CV download (FR + EN PDFs — you will place in public/).

Old site also had images (profile, cell before/after, tooltips) and external project links. Those assets and any deep project pages (SHCatchPFR, MissionControl) remain your responsibility to host or link.

---

## 4. Design Principles

- **Simple first, beautiful second**: Clear visual hierarchy, generous whitespace, excellent typography, high contrast. Scannability > decoration.
- **Text is the product**. Core name, value prop, flagship description, proof points, and contacts must render instantly and read perfectly with zero 3D or JS.
- **3D is delight, not content**. Mars (rotating sphere), spaceship (flyby), robot arm (simple articulated motion) live in the hero or as subtle integrated element. Procedural/low-poly first. Always async (dynamic import + Suspense). Must not block text, must degrade gracefully on low-end devices or when WebGL fails.
- **Bilingual is first-class**. FR/EN toggle is always visible, switches instantly with no reload or layout jump, state is predictable. You own the copy — the site just makes switching trivial.
- **Professional warmth**. Clean modern tech aesthetic (Geist or mono flavor) with robotics/space flavor via 3D and careful accent, not dark sci-fi theater or neon.
- **Performance & ownership discipline**: Core textual experience < 100–150 ms perceived. Total initial gzipped budget respected. Every added dependency or complex component must be justified and tested locally by you. You must be able to explain (and revert) every line.
- **Mobile & accessibility matter**. Responsive from day one. Keyboard, screen-reader friendly where relevant. Good tap targets for toggle and links.

---

## 5. Technical Guardrails

- **Deployment flexibility (updated 2026-06-12)**: The site must remain easy to deploy as a static export (GitHub Pages, exactly matching how your current/old site works and "it might only be a start") **or** later as a small Node.js server on your HomeLab (nginx, Docker, PM2, etc.). We will not hard-commit to `output: 'export'` or server-only features in the early phases. The architecture and config must stay dual-path friendly.
- shadcn/ui + Tailwind 4 (CSS-first) for all UI components and styling. Copy-paste primitives, no runtime bloat.
- 3D exclusively via React Three Fiber + drei + three. Only the three specified elements for v1. Client-only.
- Bilingual: react-i18next + separate per-language JSON resources (app/locales/en/common.json and app/locales/fr/common.json). Only the active language's translations are loaded (via dynamic imports) so a French visitor does not receive the English bundle. Adopted after the initial DIY LanguageContext + inline objects proved limiting for clean separation and future content maintenance. The "limit dependencies" principle remains in force — this was added only once the concrete need (bundle size, ownership of strings, easy editing) was clear from the small test.
- X integration for MVP: realistic static-friendly approach (snapshot you maintain, embed, or prominent link). A future HomeLab server path would enable lightweight proxy/API routes for fresher data without CORS issues.
- Assets: All images, CV PDFs, and any custom 3D models/textures you provide go into `public/`. Site must handle graceful fallbacks while you add them. (Server path later unlocks proper Next.js Image optimization; static path uses unoptimized or external loader.)
- No multi-dep installs without a local test gate. One logical group per step.

See the current approved implementation plan (section on deployment flexibility) for the exact phased order, Phase 2 baseline approach, and the explicit hosting decision checkpoint in Phase 7+.

---

## 6. Success for the MVP (Before Polish & Deploy)

- All core content from the original bilingual site is present and switchable.
- Hero + flagship + proof sections allow a 5–10 s HR scan to extract the right story.
- 3D (at minimum Mars sphere) is live, attractive, and non-blocking.
- Bilingual toggle is obvious and flawless.
- `npm run build` succeeds cleanly in standard mode. The project stays easy to deploy either as a static site (GitHub Pages continuity) or as a Node server on HomeLab with only small later configuration.
- The site feels "simple but beautiful" and professional to you on real devices.
- You understand and own every file. You could walk someone through the 3D component and the language mechanism.

Post-MVP improvements (only after you request): richer 3D, better X surface, additional project case studies, etc.

---

## 7. Your Ownership Notes

- You will wordsmith and update all copy and provide images/CVs.
- You decide visual tweaks (colors, spacing, exact 3D fidelity) after seeing each increment locally.
- You can (and are encouraged to) edit PROJECT.md, TODO.md, and the code at any time.
- The entire history must remain easy to understand and to throw away.

**Deep page content ownership**: The real textual content of dedicated project pages (e.g. `/super-heavy-catch` and future case studies) will be written and maintained by the human. The AI (Grok) is expected to contribute only structural code, layout patterns, navigation/UX experiments, component scaffolding, and temporary in-context placeholder text that makes the structure testable. Placeholder text should be clearly marked as temporary and easy to locate/replace.

---

*This document is deliberately short and focused. When in doubt during implementation, return here for the "why".*
