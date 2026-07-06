# Personal Website Refresh TODO

## Project Overview
Redesigning lucas-david-ry.com with Next.js 16, shadcn/ui, Tailwind 4, React Three Fiber. Content adapted from previous_website/index.html (user will wordsmith). Bilingual FR/EN. 3D hero elements: Mars sphere, spaceship flyby, robot arm. The site must stay deployable either as a static export (GitHub Pages, matching your current/old site's hosting) **or** later as a small Node server on your HomeLab — we deliberately keep early phases dual-path friendly and avoid premature `output: 'export'`. See PROJECT.md for vision, audience, principles, and success criteria. See the approved implementation plan for full collaboration process, rationale, and the explicit hosting decision checkpoint (Phase 7+).
The website should be "responsive", and may work with multiple distinctive sub-sections like "Hero", "Experience", "Contact"...

## Collaboration Rules (summary)
One micro-step at a time. Explain purpose + exact files + verification command *before* editing. User runs `npm run dev` (and build when configured), inspects, and gives explicit approval ("Approved for next", "Good, continue") before any next increment. User can scrap at any time. No multi-dep installs or big rewrites without gates.

## Phased Checklist (with explicit user checkpoints)

**Phase 0 — Alignment (done)**
- [x] Review understanding + this plan with user
- [x] User explicit approval of plan + answers to open questions (or "approved as-is")

**Phase 1 — Documentation & Project Foundation**
- [x] Create PROJECT.md (vision, audience, principles, content map, success criteria)
- [x] Extend AGENTS.md (collaboration rules + Next 16 / Tailwind 4 / shadcn notes)
- [x] Refine this TODO.md (granular phases + gates)
- [ ] Minor accurate metadata in app/layout.tsx (title/desc/OG/twitter from original site)
- **User checkpoint after Phase 1**: Review the three new/updated docs + any layout metadata change. Run `npm run dev`. Check tab title and page source meta. Reply with "approved — continue to Phase 2" (or requested tweaks).

**Phase 2 — Deployment-flexible baseline + Clean shell**
- [ ] Review and lightly configure next.config.ts only as needed for flexibility (keep it minimal; do **not** set `output: 'export'` yet). Document in comments/README how to switch to static export later (or run as HomeLab server).
- [ ] Decide image strategy for dual compatibility (standard Next Image for server path; note the unoptimized/export path for static GH Pages continuity).
- [ ] Remove starter noise from page.tsx + globals.css (keep clean minimal shell).
- [ ] Test both: `npm run dev` (unchanged) and `npm run build` (standard `.next` output succeeds). Optionally smoke-test a static export as a non-committing check only.
- [ ] Add any neutral hosting notes (example nginx/Docker snippets can come later when hosting is chosen).
- **User checkpoint**: The baseline works cleanly for both a future static GH Pages deploy and a future small HomeLab Node server. You are confident the skeleton does not paint us into a corner. "Approved for shadcn work."

**Phase 3 — shadcn/ui + LanguageToggle Foundation**
- [ ] Run current shadcn init for this stack (`npx shadcn@latest init` — confirm exact command at time)
- [ ] Add only lucide-react if icons are immediately useful
- [ ] Bring in the first real primitives we will use (Button, Card, Toggle/switch primitives)
- [ ] Language switcher + bilingual content implemented with react-i18next (JSON files in app/locales/{en,fr}/common.json, dynamic per-lang loading). Switcher moved to real header (outside the testing zone). DIY context removed.
- [ ] Verify toggle renders cleanly, no surprising bundle growth
- **User checkpoint**: "shadcn installed cleanly? Toggle mechanism feels right? Ready to bring in real bilingual content?"

**Phase 4 — Bilingual Data Model + Core Sections Shell (content first, minimal style)**
- [ ] Define trivial bilingual content source (TS objects / small data file or component props — easy for you to edit)
- [ ] Basic page sections in priority order: Hero (text), About/Currently Doing, Flagship Project (prominent), Experiences, Education, Skills/Programming, Sports & Local Involvement, Contact/X
- [ ] Wire LanguageToggle so the entire page switches (FR/EN versions co-located)
- [ ] Port/adapt raw text from previous_website/index.html (you will wordsmith later)
- [ ] Verify: instant full bilingual switch, all content visible and scannable on desktop + mobile viewport, no layout shift on toggle
- **User checkpoint**: "Does the information architecture support a 5–10 second HR scan? Is the flagship project prominent enough? Any sections to reorder, combine, or de-emphasize before we add visual polish or 3D?"

**Phase 5 — Visual Foundation & Layout Polish (pre-3D lock-in)**
- [ ] Document final design decisions (colors, typography scale, spacing, single vs dark/light) in PROJECT.md
- [ ] Responsive header/nav/footer with contacts + language toggle
- [ ] Beautiful but still simple sections (shadcn Card where helpful, excellent typography, subtle structure, strong contrast)
- [ ] Profile image slot with graceful fallback
- [ ] Verify: site feels "simple but beautiful" and professional to you. Fast first paint. Excellent scan. Good on mobile.
- **User checkpoint (major)**: Visual direction is locked. "Looks right for the job goal. Proceed to 3D."

**Phase 6 — 3D Hero (incremental, Mars first)**
- [ ] Install 3D deps as *one* group only after Phase 5 approval: `@react-three/fiber @react-three/drei three`
- [ ] Client-only ThreeHero component (dynamic import, no SSR, Suspense + loading state)
- [ ] Start with single element: procedural or low-poly rotating Mars sphere + basic lighting
- [ ] Integrate behind or with hero text. Temporary debug controls (e.g. OrbitControls) allowed then removed.
- [ ] Verify: core text still paints instantly, 3D appears after, acceptable FPS on your hardware + simulated constrained device, language toggle does not break the canvas, zero WebGL/console errors
- **User checkpoint**: "3D delight level vs distraction/perf cost is acceptable? Ready to add spaceship or robot arm?"

**Phase 7+ — Remaining 3D elements, X, final polish, deploy**
- [ ] Spaceship flyby (simple geometry + trajectory) — only after Mars approval
- [ ] Minimal robot arm (articulated parts + simple motion) — only after previous
- [ ] X section (realistic scope per Phase 1 decision: static snapshot, embed, or prominent link)
- [ ] CV links (once you add the PDFs to public/cv/)
- [ ] Final polish: accessibility, SEO, OG image (you supply), perf audit (Lighthouse on the built output — works for both static and server)
- [ ] **Hosting decision checkpoint (explicit)**: Decide and document whether to launch on GitHub Pages (static export, matching current site — good for "it might only be a start") or move to HomeLab self-host. Configure accordingly (export + .nojekyll etc. for GH Pages, or server deployment config, Docker, reverse proxy, etc.).
- [ ] Deploy instructions (and optional CI) for the chosen target.
- Each sub-element or major polish item gets its own mini description + verification + explicit user approval before the next

## Notes
- Started: 4/19/2026, 2:32 PM (original); refreshed plan & process 2026-06-12
- 2026-06-13: Bilingual switched from DIY React LanguageContext + inline objects to react-i18next (i18n-0 step). Translations now live in app/locales/en/common.json and app/locales/fr/common.json. Dynamic imports ensure only the needed language is loaded. PROJECT.md guardrail updated. This was the first explicit deviation from the original "no heavy i18n" rule because the DIY approach was becoming more complex than a small, standard library.
- User: LucasDaRiYv
- One step at a time, explain purpose/how/why, test locally after each. **Explicit user approval required between phases.**
- Content: Extract/adapt from previous_website/index.html (Hero/About, Flagship, Experiences, Education, Sports, Programming, Local Involvement). You own all final wording and will supply images + CVs.
- Perf targets: Core text <100–150 ms perceived, 3D fully async, initial bundle lightweight.
- Lessons (do not repeat): No multi-deps without test gate; restore debug tools temporarily when helpful; user must retain full ownership and understanding at every step; follow the collaboration rules in AGENTS.md.
- Full context & detailed phases: see the current approved implementation plan in the session folder and PROJECT.md.