<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Collaboration Rules (for this personal website project)

This repo follows an extremely tight, user-owned iterative process. The user (Lucas) must be able to understand, oversee, review, locally test, and confidently scrap any work at any time.

**Non-negotiable workflow**:
1. **Small visible increments only** — a change must be reviewable (intent + actual diff) in < 2 minutes.
2. **Explain before you edit** (in the conversation): state the exact files, the purpose of the change, which checkpoint it enables, what the verification command + observations should be, and that nothing else is touched.
3. **Local test gate after every meaningful change**: user runs the dev server (and later build), inspects in browser (desktop + mobile viewport), checks console, first paint, toggle behavior, 3D perf, etc. Only explicit "looks good / proceed / approved for next" allows marking the item complete.
4. **Explicit approval language required**: "Approved for next", "Good, continue to Phase X", "Hold and change Y first", or "Scrap this". No assumption of approval from silence.
5. **Ownership & revertability**: Every step must be trivial to undo (small targeted edits preferred). User is explicitly invited to `git checkout -- .` or delete work.
6. **One logical concern per step**: Never bundle unrelated deps, never do a full page rewrite, never install multiple things without an intervening test gate.
7. **Checkpoints are real discussion points**: After layout/metadata, after bilingual shell, before any 3D, before X work, before "polish". Discuss "Does this serve the HR/job goal? Is the flagship prominent enough? Any copy changes now?"
8. **Use tools responsibly**: Use todo_write for internal tracking (visible). Read-only subagents only for exploration with summaries returned. Never run mass or destructive operations without prior description + user green light.
9. **Pace is set by the user**: If a proposed step feels too large even if "technically one thing", split it further.

**Every step must include**:
- Purpose / how / why explanation.
- Exact verification ritual (usually `npm run dev` + specific things to look at + `npm run build` once export is configured).
- Clear pause for user feedback before the next increment.

**Documentation locations the agent must respect**:
- PROJECT.md = vision, audience, principles, success criteria, content map ("the why").
- This AGENTS.md = how the agent must behave on this repo.
- TODO.md = actionable granular checklist with explicit user-gate markers.
- Current implementation plan (in .grok session) during active work.
- Code comments: 3–5 lines on every new major component or section explaining purpose + fit with perf/ownership goals.

Violating the small-step + explicit approval + local verification discipline makes the project "doomed" per the user. When in doubt, ask a narrow clarifying question or propose an even smaller split.

---

## 🚫 CRITICAL: NEVER EDIT LIBRARIES OR node_modules

**YOU ARE NOT SUPPOSED TO EDIT LIBRARIES.**

If the user later runs `npm update`, `npx shadcn@latest`, `npm install`, or any other dependency refresh: **EVERYTHING WOULD BREAK 110%**.

Editing files under `node_modules/`, patching vaul, Radix UI, Next.js internals, or directly mutating the shadcn/ui primitives in `components/ui/` (the installed library copies) is **strictly forbidden**.

**This is equivalent of sending me to fuck myself and is a serious insult to the project's maintainability.**

**Why this is non-negotiable**:
- Library updates overwrite or conflict with hand-edits.
- The project becomes un-mergeable, un-updatable, and full of landmines.
- Future you (or a future agent) will have no idea what is custom vs what is supposed to come from the package.
- It destroys long-term ownership and reproducibility.

**Correct ways to customize library components**:
- Pass props, `className`, `children`, or use the component's extension points.
- Wrap the primitive in your own component (e.g. `MyDrawer.tsx` that uses `<Drawer ...>` internally).
- For deep changes you truly need to own: copy the entire component file out of `components/ui/` into a project path (e.g. `components/custom/Drawer.tsx`) and import from there. Never touch the original in `components/ui/`.
- Use CSS overrides, `@theme` variables, or global styles.
- When shadcn or the library publishes an update to a component, review the upstream diff and manually port *only* the safe parts.

**If you ever feel the urge to run `search_replace` on anything inside `node_modules`, or to "just tweak" a file under `components/ui/` to fix something in the library itself — STOP.**

Ask the user. The answer will almost always be "no, customize around it instead".

Any future agent or script that violates this rule is actively harming the project.

---

## Tech Notes for Next.js 16 + Tailwind 4 + shadcn/ui

- Tailwind is v4 (CSS-first via `@tailwindcss/postcss`, no traditional `tailwind.config.js` in many setups; theming lives in CSS `@theme`).
- shadcn init must be the current version (`npx shadcn@latest init`). It will add the `components/ui/` primitives and any necessary CSS updates.
- Static export (`output: 'export'` in next.config.ts) + `images: { unoptimized: true }` is required for GitHub Pages. Test `npm run build` early and often.
- Use `<Link>` from `next/link` for **all internal navigation** (routes within this site such as `/`, `/super-heavy-catch`, future project pages, etc.). Plain `<a>` is only allowed for external URLs. When using external `<a>` that opens a new tab, always include `target="_blank" rel="noopener noreferrer"`.
- 3D (React Three Fiber) must be client-only (use `dynamic` import with `{ ssr: false }` or equivalent + Suspense). Never SSR WebGL canvases.
- Always prefer the minimal working solution first. Add complexity only after the user has seen and approved the simpler version locally.
- Read `node_modules/next/dist/docs/` (or the official site) for any App Router / Server Components / static export behavior before using advanced features.
