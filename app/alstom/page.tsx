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
      quote: "Lucas did a few good things, and a lot of ... let's say creative things.",
    },
    fr: {
      role: "Tuteur / Production Manager",
      quote: "Lucas à pu faire quelques choses de bien, et de nombreuses erreurs intéressantes.",
    },
    initials: "FN",
    picture: "/alstom/recommendations/fred.jpg",
    href: "https://www.linkedin.com/in/your-tutor-linkedin",
  },
  {
    name: "Loïk TRAMOIS",
    en: {
      role: "Methods / Robotics Technician",
      quote: "Example texts.",
    },
    fr: {
      role: "Méthodes / Technicien Robotique",
      quote: "Ces textes sont des exemples, je les traduirais.",
    },
    initials: "LT",
    picture: "/alstom/recommendations/loik.jpeg",
    href: "https://www.linkedin.com/in/collaborator-linkedin",
  },
  {
    name: "Emelyne LATHUILLERE",
    en: {
      role: "Industrial Expert",
      quote: "And maybe other people ?",
    },
    fr: {
      role: "Experte Industrielle",
      quote: "D'autres personnes avec qui j'ai pu travailler ?",
    },
    initials: "EL",
    href: "https://www.linkedin.com/in/collaborator-linkedin",
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
            DISPEN is the part of Alstom that makes train dampers, for Alstom and other brand&apos;s trains.
          </p>
          <h2>Overview</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            After discovering the whole production line with the operators, I focused on issues with the robotic &quot;Adjustment cell&quot;, to understand, measure, and mitigate them.
            I implemented a machine performance tracker, solved technical issues with Loïk, a technician, and began reflecting on a new layout to allow masked time activities.
            Communications with other employees (presenting the performance tracker, industrial experts), and external bodies (robotic cell&apos;s integrators, commercials).
          </p>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Reduced issues occurrences by * % <br/>
            Implemented
            <a href="https://teeptrak.com/fr/perftrak-suivi-performance-industrielle/" className="flex flex-row inline shrink-0 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              TeepTrak
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>, with prepared automated issues reporting and tracking of ~80 different products references/types.
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
              <div>
                <p>Small, public presentation of the machine</p>
              </div>
              <figure>
                <img
                  src="/alstom/adjustment_cell.jpg"
                  alt="Wide view of the cell"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Wide view of the cell
                </figcaption>
              </figure>
            </MasonryGrid>
          </section>

          <section>
            <h2>Role &amp; Responsibilities</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Placeholder for day-to-day activities: process observation and mapping, data collection
              and analysis, facilitation of Kaizen workshops, standard work development, etc.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Another paragraph for cross-functional collaboration notes (production, quality,
              engineering, supply chain) or any specific projects ownership.
            </p>
          </section>

          <section>
            <h2>Key Projects &amp; Contributions</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Placeholder area for 1–3 concrete improvement initiatives. Include what was measured,
              what changed, and any quantified impact (even directional for now).
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              This section is intentionally left open so you can later add before/after descriptions,
              simple diagrams, or links to supporting material.
            </p>
          </section>

          <section>
            <h2>Photos &amp; Documentation</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Placeholder for on-site photos: shop floor observations, Kaizen workshops, VSMs,
              standard work sheets, Gemba walks, and team activities. Drop real images into
              <code className="font-mono text-[13px]"> public/alstom/</code>.
            </p>

            {/* MasonryGrid gallery migrated directly from the super-heavy-catch (and experiments)
               page pattern. Responsive 1-col / 2-col round-robin layout. Images use the exact
               same figure + border + caption treatment for visual consistency. */}
            <MasonryGrid className="mt-6 gap-8">
              <figure>
                <img
                  src="/alstom/placeholder1.jpg"
                  alt="Placeholder — replace with a real internship photo (e.g. shop floor)"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Placeholder caption — e.g. production line or work cell
                </figcaption>
              </figure>

              <figure>
                <img
                  src="/alstom/placeholder2.jpg"
                  alt="Placeholder — replace with a real internship photo (e.g. Kaizen board)"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Placeholder caption — e.g. improvement event or data review
                </figcaption>
              </figure>

              <figure>
                <img
                  src="/alstom/placeholder3.jpg"
                  alt="Placeholder — replace with a real internship photo (e.g. before/after)"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Placeholder caption — e.g. standard work or metric board
                </figcaption>
              </figure>
            </MasonryGrid>
          </section>

          <section>
            <h2>Tools, Methods &amp; Skills</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              FANUC&apos;s roboguide for offline prototyping programs.
              TIA Portal for PLC monitoring / programming 
            </p>
          </section>

          <section>
            <h2>Takeaways &amp; Next Steps</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              This internship was full of work, and needed me in multiple domains : multiple technical domains
              (FANUC Robotics, Siemens PLCs, mechanical issues), communications (inside when presenting to colleagues, outside when
              quoting for interventions/implementing a new module).
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              I learned some life lessons, working with multiple people, finding the person I needed that was on site for each steps (FANUCs, TeepTrak, Maintenance).
              I also found that my skills were needed for more than an internship, I&apos;m sure I can come back later and have some important work to do.
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
