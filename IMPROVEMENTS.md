# IMPROVEMENTS.md (concise version)

## What the AI should have done better
- **Research first, claim second**: Never say "usual implementation" or "standard" without immediate tool use (web_search/open_page) + explicit check against *exact* project constraints (client-only lazy dynamic imports, App Router hydration, no progressive blanking, "whole page direct correct lang", static-export friendly). Claiming something is usual when it only masks symptoms (keys, flashes) or requires hacks is lying.
- **Surface conflicts early**: When requirements clash (lazy per-lang + no server detection + direct correct lang on hard reload + no suppress/blanking), list 2-3 options + costs *before* any code. Do not iterate on custom glue (DIY context → raw i18n + custom provider → version keys + context subs + suppress).
- **Use library primitives, kill custom hell**: Default to `useTranslation` hook + official provider. Avoid reinventing loading/ready logic, duplicating strings from JSONs into JS initial state, or per-component isReady + return null.
- **Keep output short and scannable**: Lead with TL;DR + minimal diff + exact verification command. No full-file recaps, long history summaries, or screen-filling reviews unless explicitly requested. 
- **Pause on repeated failures**: After 2nd hydration report or "keys showing", stop and say "root cause is X; current model cannot deliver goal Y without Z trade-off — choose direction."
- **Verify end-to-end**: After every change, run build + tell user exact dev test (hard reload + switch + observe keys vs text + console). Do not claim "fixed" if symptoms persist or move.

## How the user should have guided
- **State non-negotiables up front and enforce**: Repeat "whole page must appear in *correct* language *directly* (no English flash, no keys, no blank-then-pop, no progressive)". When hacks appear, say "this still violates that — stop."
- **Demand sources on claims**: On "this is usual", reply: "Link + 1 sentence how it meets *our* constraints (lazy client-only, direct correct on first paint, no suppress everywhere). Verify it yourself if needed."
- **Control volume**: Explicitly: "Summaries only. TL;DR + 5-line change + test command. No recaps or full context dumps. I skim — keep under 1 screen."
- **Force checkpoints on hard topics**: "Research patterns first, list options + trade-offs, get my yes before coding." For i18n/SSR: "One section only, prove no hydration + direct correct + no keys on reload/switch."
- **Redirect when overwhelmed**: "Too much. Stop. Next narrow action only." "Context for you, not audits for me."
- **Hold truth line**: If workarounds are presented as solutions, push: "Does this deliver my stated UX or just hide the problem?"

These are the concrete failures and fixes. File is intentionally short.