/**
 * Alstom — Continuous Improvement Internship (template page)
 *
 * This is a minimal dedicated page for the current internship.
 * Goal: provide the same clean visual baseline and "back to portfolio" pattern
 * as /super-heavy-catch, but as a lightweight template.
 *
 * All text is placeholder. You will replace it with your actual story, metrics,
 * projects, and details later.
 *
 * Includes a migrated MasonryGrid image gallery (same pattern as /super-heavy-catch).
 * Add real images under /public/alstom/ later. Page is now client for the grid
 * (small, self-contained, matches other project detail pages).
 */

'use client'

import Link from "next/link"
import { MasonryGrid } from '@/components/MasonryGrid'
import { useState, useEffect } from 'react'

/**
 * Data for the tabbed recommendations experiment.
 * Each entry becomes one tab. The first one (tutor) is the default / starting point.
 */
const tabbedRecommendations = [
  {
    name: "Frédéric NECTOUX",
    en: {
      role: "Tutor / Production Manager",
      quote: "The railway industry requires precision and trust, all the more so because our damper production is mainly dedicated to railway safety. Lucas helped us a great deal on our adjustment cell with technical issues, and studied the workstation as a whole to support a ramp-up in throughput. He did not hesitate to improve the machine, although some changes caused production stops — quickly resolved, admittedly, but avoidable. I am glad to have had Lucas as an intern.",
    },
    fr: {
      role: "Tuteur / Production Manager",
      quote: "Le ferroviaire est une industrie qui nécessite précision et confiance, d'autant plus que notre production d'amortisseurs sont principalement dédiés à la sécurité ferroviaire. Lucas nous a bien aidé sur notre cellule de réglage pour les problèmes techniques, et a étudié le poste detravail dans son ensemble pour une montée en cadence. Il n'hésitait pas à améliorer la machine, mais certains changements ont causé des arrêts de production, rapidement résolus certes, mais évitables. Je suis content d'avoir eu Lucas comme stagiaire.",
    },
    initials: "FN",
    picture: "/alstom/recommendations/fred.jpg",
    href: "https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-nectoux-66a102170/",
  },
]

export default function AlstomContinuousImprovementPage() {
  const [showMore, setShowMore] = useState(false)

  // === Tabbed recommendations experiment state ===
  const [activeTab, setActiveTab] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  // Auto-rotate every 10s. Stops permanently once the user clicks any tab.
  useEffect(() => {
    if (!autoRotate) return undefined

    const intervalId = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabbedRecommendations.length)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [autoRotate])

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Partial hero (3/4 viewport height).
          Background image + two dimming approaches:
          - Constrained left gradient panel (width-matched to content) so the dimming always covers the text
            area no matter the window width.
          - Bottom fade for smooth visual transition into the page background below. */}
      <header className="relative h-[75svh] w-full overflow-hidden">
        {/* Base image layer (full bleed) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/alstom/hero.jpg')" }}
        />

        {/* Constrained dimming layer — this is now "part of the hero content".
            It only spans the same max-width as the text, so on any resize the gradient
            reliably protects the titles instead of fading out too early. */}
        <div className="absolute inset-y-0 left-0 w-full max-w-3xl md:max-w-4xl bg-gradient-to-r from-white/96 via-white/82 via-55% to-transparent dark:from-zinc-950/96 dark:via-zinc-950/72 dark:via-55% to-transparent" />

        {/* Bottom fade (full width) — helps the hero image dissolve into the solid page bg below */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white dark:to-zinc-950" />

        {/* Content layer */}
        <div className="relative z-10 flex h-full flex-col px-6">
          {/* Back to portfolio — always near the top */}
          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white underline dark:decoration-white/30 underline-offset-4 dark:hover:decoration-white/60 transition-colors"
            >
              ← Back to portfolio
            </Link>
          </div>

          {/* Title block.
              Desktop (md+): vertically centered like the reference.
              Mobile: pushed to the bottom of the hero section (justify-end + extra bottom padding). */}
          <div className="flex flex-1 flex-col md:justify-center justify-end">
            <div className="max-w-3xl px-6 md:px-10 lg:px-14 pb-10 md:pb-0 text-left">
              <div className="uppercase tracking-[2px] text-xs text-black/60 dark:text-white/60 mb-1.5">
                Internship
              </div>
              <h1>
                <img
                  src="/logos/alstom.svg"
                  alt="Alstom"
                  className="h-11 w-auto md:h-14 dark:invert"
                />
              </h1>
              <p className="mt-1.5 text-2xl text-black/80 dark:text-white/90">
                Continuous Improvement - DISPEN
              </p>
              <p className="mt-1 text-sm text-black/60 dark:text-white/70">
                March 30th 2026 — July 24th 2026 • Le Creusot
              </p>
            </div>
          </div>

          {/* Scroll indicator — simple centered arrow at bottom of hero */}
          <div className="flex justify-center mb-10 text-zinc-600 dark:text-white/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main content (the former title/header block is now inside the hero above).
          Slightly tighter top padding since the hero provides visual separation. */}
      <div className="mx-auto max-w-3xl px-6 pt-10 pb-12 md:max-w-5xl md:px-8 lg:px-12">
        <section className="mb-16">
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            DISPEN is the part of Alstom that makes train dampers, for Alstom and for other brands&apos; trains.
          </p>
          <h2>Overview</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            After discovering the whole production line with the operators, I focused on the robotic &quot;Adjustment cell&quot; to understand, measure, and mitigate its technical issues.
            I implemented a machine performance tracker, solved technical issues with Loïk, a technician, and began working on a new layout to allow masked-time activities.
            I also handled communications with employees (presenting the performance tracker, industrial experts) and vendors (the robotic cell&apos;s integrators and sales contacts).
          </p>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            <span className="font-bold">Reduced issue occurrences by 62% between Week 13 and Week 25.</span><br/>
            Implemented{" "}
            <a href="https://teeptrak.com/fr/perftrak-suivi-performance-industrielle/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              TeepTrak
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            , with prepared automated issue reporting and tracking of about 80 different product references/types in Week 25. <br/>
            Built allocated-time charts (abacuses) for robot production, which helped production planning.
          </p>
        </section>

        {/* Prominent Recommendations section */}
        {/* ============================================================
             Tabbed recommendations with auto-rotation
             - Tabs on top of a card (like the featured one)
             - Auto changes every 10 seconds with slide animation
             - Clicking any tab stops the rotation permanently
           ============================================================ */}
        <section className="mb-16">
          <div className="mb-5">
            <div className="uppercase tracking-[2px] text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Direct feedback
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter">Recommendations</h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            {/* Tab bar - contains full profile.
               Responsive:
               - Desktop (md+): equal-width tabs like before (flex-1)
               - Mobile: horizontal scroll (overflow-x-auto + min-w) so names are readable + no more crushing.
                 overflow-y-hidden + touch-pan-x prevent unwanted vertical scroll / page scroll bleed when swiping horizontally. */}
            <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden snap-x snap-mandatory touch-pan-x border-b border-zinc-200 bg-zinc-50/60 text-sm dark:border-zinc-800 dark:bg-zinc-900/40 md:overflow-visible md:snap-none md:touch-auto">
              {tabbedRecommendations.map((rec, index) => (
                <div
                  key={index}
                  role="tab"
                  aria-selected={activeTab === index}
                  onClick={() => {
                    setActiveTab(index)
                    setAutoRotate(false)
                  }}
                  className={`flex-shrink-0 md:flex-1 min-w-[168px] md:min-w-0 flex items-center gap-x-3 px-3 py-3.5 cursor-pointer border-b-2 transition-colors -mb-px ${
                    activeTab === index
                      ? "border-zinc-950 bg-white/60 dark:bg-zinc-950/60 dark:border-white"
                      : "border-transparent hover:bg-white/40 dark:hover:bg-zinc-950/30"
                  }`}
                >
                  {/* Avatar — slightly smaller on mobile to leave room for text while scrolling */}
                  <div className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                    {rec.picture ? (
                      <img src={rec.picture} alt={rec.name} className="h-full w-full object-cover" />
                    ) : (
                      rec.initials
                    )}
                  </div>

                  {/* Name + Role */}
                  <div className="flex-1 min-w-0 leading-tight">
                    <div className={`font-medium text-zinc-950 dark:text-zinc-50 truncate ${activeTab === index ? '' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {rec.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      {rec.en.role}
                    </div>
                  </div>

                  {/* LinkedIn link - separate click target */}
                  <a
                    href={rec.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    aria-label={`View ${rec.name} on LinkedIn`}
                    title="View on LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>

            {/* Sliding panels */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeTab * 100}%)` }}
              >
                {tabbedRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 p-6 md:p-7 min-h-[5lh]" 
                  > {/* This min-h-[Xlh] should represent the max line number of the quote */}
                    <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {rec.en.quote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* Main content — placeholder sections only */}
        <div className="space-y-12 text-[15px] leading-relaxed">
          <section>
            <h2>Adjustment machine</h2>
            <MasonryGrid className="gap-8">
              <div className="text-zinc-600 dark:text-zinc-400">
                <p>This machine has two FANUC robots, and is tasked with screwing a valve holder that compresses a spring to a given preload on the piston/base.</p>
                <p>It takes the pre-assembled piston, verifies the spring&apos;s stiffness, and screws the valve holder.</p>
                <p>The parts are tiny, and the assembly was not originally designed for automated production. I helped reduce production stops by 62% by:</p>
                <ol className="list-decimal pl-5">
                  <li>Realigning taught positions</li>
                  <li>Editing the screwing processes</li>
                  <li>Implementing a new vision program</li>
                </ol>
              </div>
              <figure>
                <img
                  src="/alstom/dampers_stand.jpg"
                  alt="Picture of a display stand, with me and a machine operator 'Bélo'"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Picture of a display stand, with me and a machine operator &quot;Bello&quot;
                </figcaption>
              </figure>
            </MasonryGrid>
          </section>

          <section>
            <h2>Role &amp; Responsibilities</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Observed and studied technical issues as they happened, going from reported symptoms to root causes.
            </p>
          </section>

          <section>
            <h2>Key Projects &amp; Contributions</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              I collaborated closely with Loïk to adjust taught positions of saved recipes and to test new changes.
              I wrote instruction sheets so the solutions would stay maintainable.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              I implemented TeepTrak so the production unit manager can see machine performance (TRS, TRG) and has proper tracking of technical issues. Issues are reported by the operator for now, but automatic reports are almost functional (waiting for more PLC outputs). <br/>
              I made a new vision process so the screwdriver starts aligned with the valve holder.<br/>
              I improved a solution to greatly reduce cross-threading issues.
            </p>
          </section>

          <section>
            <h2>Tools, Methods &amp; Skills</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              FANUC ROBOGUIDE for offline program prototyping<br/>
              TIA Portal for PLC monitoring / programming<br/>
              Excel for issue-occurrence analysis
            </p>
          </section>

          <section>
            <h2>Takeaways &amp; Next Steps</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              This internship was full of work and required me in several domains: technical work
              (FANUC robotics, Siemens PLCs, mechanical issues) and communications (on site when presenting to colleagues, and externally when
              requesting vendor interventions or configuring a new module).
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              I learned some life lessons: working with many people, and finding the person on site I needed at each step (FANUC, TeepTrak, maintenance).
              I also found that my skills were needed beyond an internship; I am sure I can come back later and have important work to do.
            </p>
          </section>
        </div>

        {/* Footer — consistent with homepage and project pages */}
        <footer className="mt-20 border-t border-zinc-100 pt-8 text-sm text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200">← Back to portfolio</Link>
            <a href="https://x.com/LucasDaRiYv" className="hover:text-zinc-700 dark:hover:text-zinc-200">𝕏 @LucasDaRiYv</a>
            <a href="mailto:lucas@lucas-david-ry.com" className="hover:text-zinc-700 dark:hover:text-zinc-200">lucas@lucas-david-ry.com</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
