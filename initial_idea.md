Project Documentation: Redesign of lucas-david-ry.com Personal Website
Version 1.0 – Created 19 April 2026
Author: Grok (in collaboration with user LucasDaRiYv)

1. Project Overview and Conversation Summary
This document consolidates the complete discussion between you and Grok regarding the redesign of your personal website.
**Your original request**
You sought to modernise your existing GitHub-Pages-hosted portfolio (lucas-david-ry.com) to make it more visually appealing while preserving its professional character and robotics/space theme. Specific visual inspirations included:

A rotating Mars sphere in the background.
A spaceship passing across the viewpoint.
An animated industrial robot performing light interactions (e.g., moving UI elements).

Key technical and operational constraints:

Use shadcn/ui components and styling.
Integrate Three.js (via React Three Fiber) for 3D animations.
Remain a lightweight personal site: core textual content must appear immediately; heavier 3D assets load asynchronously.
Deploy exclusively to GitHub Pages (your domain already redirects there).
Enable tight integration with your X account (@LucasDaRiYv) so that updates to your X bio or recent activity automatically reflect on the site.

Core project philosophy

The website must be great-looking and functional within less than one full workday of development.
You retain full ownership of the codebase at every step.
Development proceeds iteratively and transparently: each major feature is implemented, tested by you locally, and approved before the next step advances.
Documentation is deliberately simple at first, with clearly marked pathways for future algorithmic or library-specific improvements.
The goal is not only a polished product but also to deepen your understanding of the technologies used.


2. Selected Technical Stack and Rationale
Framework

Next.js 15 (App Router) with static export (output: 'export').
Why? Produces pure static files compatible with GitHub Pages; excellent built-in performance optimisations; supports React Server Components and Suspense for lazy-loading 3D content.

Styling & UI

Tailwind CSS + shadcn/ui (copy-paste React components).
Why? Delivers the exact clean, accessible, modern aesthetic you requested with zero runtime bloat.

3D Graphics

React Three Fiber + @react-three/drei (declarative wrapper for Three.js).
Why? Allows complex 3D scenes (Mars rotation, spaceship trajectory, robot animation) to be written as React components while keeping bundle size and runtime cost minimal.

Additional minimal dependencies (only what is strictly necessary):

@react-three/fiber, @react-three/drei
lucide-react (for icons)
next-themes (optional dark/light mode)
zod + react-hook-form (for future contact form)

No server required – the entire site will be statically generated.

3. Development Principles and Workflow

Start in project root directory (git init'd).
Minimal local tooling: Only Node.js (v20+) and a code editor are required. No global installations beyond what the project itself installs via npm.
Iterative implementation (one feature at a time):
Create the basic Next.js scaffold.
Add shadcn/ui and Tailwind.
Implement core layout and sections.
Add the 3D hero canvas (Mars + spaceship + robot).
Integrate X account data fetching.
Final polish, performance audit, and deployment.

Verification gates: After each major step you will run the development server (npm run dev), inspect the site, and confirm it meets your expectations before proceeding.
Documentation-first: Every new file or component will contain inline comments explaining its purpose and potential future enhancements.


4. High-Level Content Structure (MVP)
The site will contain the following sections (all present in your current website plus targeted enhancements):

Hero (full-viewport 3D background with overlaid name, tagline, and primary actions).
About / Currently Doing (interactive timeline or cards).
Projects (filterable grid with previews).
Experience & Education (modern timeline).
Skills (icon grid with optional interactive robot demo).
X Feed / Bio Integration (dynamically pulled from your @LucasDaRiYv profile).
Contact (simple form + links).

All text will be available in both French and English (implemented via simple state or a lightweight i18n setup if desired).

5. X Account Integration Details

A read-only X API v2 bearer token (free tier) will be used client-side to fetch:
Your current bio.
Profile picture, follower count, location.
Most recent posts (optional embedded timeline).

Updating your X bio will automatically appear on the website on next page load (cached for 5–10 minutes to respect rate limits).
No authentication beyond the public token is required.


6. Performance & Lightness Guarantees

Core HTML/CSS/JS loads in < 300 ms.
3D canvas uses low-poly models, procedural geometry where possible, and is mounted only after the rest of the page is interactive.
Total initial bundle target: < 150 KB gzipped (excluding 3D assets).
Images optimised via Next.js built-in optimiser (with unoptimized: true for static export compatibility).


7. Initial Setup Instructions (to be executed by the coding model)
When the coding model begins work, it must follow these exact steps:
```bash
# 1. Initialise Next.js 15 in root dir (App Router, TypeScript, Tailwind, ESLint)
npx create-next-app@latest . --typescript --tailwind --eslint --app --yes

# 2. Install shadcn/ui and required 3D dependencies
npx shadcn@latest init
npm install @react-three/fiber @react-three/drei three lucide-react

# 3. Configure next.config.mjs for static export
# (exact content provided in subsequent steps)
```
Subsequent steps will be issued one at a time, each accompanied by:

The exact files to create or modify.
The command(s) to run.
A checklist for you to verify functionality before continuing.


8. Future Improvement Pathways (documented for later iterations)
Once the MVP is live and you have gained familiarity with the codebase, the following enhancements are explicitly planned and can be tackled in any order:

Algorithmic: More sophisticated robot inverse-kinematics animation, orbital mechanics for the spaceship, or procedural terrain on Mars.
Performance: Implement @react-three/drei's useGLTF preloading with DRACO compression; add GPU-friendly shaders.
Language/Library tweaks: Migrate to Framer Motion 3D for hybrid 2D/3D transitions; add TypeScript strict mode refinements; explore Next.js 15 partial prerendering once static-export limitations are lifted.
Feature additions: Blog section, live 3D project previews, dark-mode 3D lighting adjustments.


9. Success Criteria for the MVP
The final product must satisfy:

Visually striking yet professional appearance that you are proud to share publicly.
Full functionality on desktop and mobile.
Deployment to GitHub Pages with zero downtime.
X bio synchronisation working correctly.
Complete ownership and understanding of every line of code you approve.

10. Confirmed Details (Version 1.1 – 19 April 2026)
- Content: Bilingual scaffold from previous_website/index.html (Hero, Currently Doing, Flagship Proj, Experiences, Education, Sports, Programming Exps, Local Interests). User to personalize post-MVP.
- X Integration: Optional/placeholder. Later: Free client-side X v2 API (/users/by, /tweets/search/recent pinned). No cost, rate-limited cache.
- i18n: Simple React Context state toggle (FR/EN). Minimal load impact.
- 3D MVP: Procedural sphere (Mars rot), cube flyby (ship), cylinder robot arm pick/place. Slots for user textures/models.
- Setup: Use root dir (git init'd). No subdir mkdir.
- Sections Map:
  | Previous | New |
  |----------|-----|
  | Left: Profile/Occupations/Contacts | Hero + About/Currently |
  | Right: Proj/Exp/Edu/Sports/Prog/Interests | Projects, Timeline Exp/Edu, Skills (Prog/Sports), Interests |
- Performance: Core text <100ms, 3D async.

11. Lessons from Failed Attempt (Version 1.2 – 19 April 2026)
- ONE STEP AT A TIME: Next.js scaffold → test dev → approve → shadcn → test → approve.
- Explain EVERY change: Purpose, how, why.
- Test locally after each, user verifies.
- No multi-deps without test.
- Restore temporary debug (e.g., OrbitControls).
- User ownership: Guide line-by-line, no monolith dumps.
- Ask approval before next.

Next session: Start zero, follow strictly.

