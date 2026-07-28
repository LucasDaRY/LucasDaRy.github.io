/**
 * Phase 2 — Minimal clean shell (Deployment-flexible baseline)
 *
 * This file intentionally replaces the default create-next-app marketing content
 * with the absolute smallest professional starting point for your portfolio.
 *
 * Goals for this shell (per the revised plan):
 * - Immediate visual identity: your name must be prominent and scannable.
 * - The tagline and core context ("Robotics Engineering at Polytech Dijon") are present.
 * - Everything is extremely lightweight — no images, no 3D, no shadcn components yet,
 *   no real bilingual data model (Phase 4), no LanguageToggle component (Phase 3).
 * - The page must look and behave correctly whether we later choose:
 *     • Static export → GitHub Pages (current behavior of your old site), or
 *     • A small Node server on your HomeLab.
 * - Heavy comments are here on purpose (you mentioned you prefer descriptive context
 *   while we build together). The rendered result stays clean and quiet.
 *
 * What this is NOT:
 * - Not the final design (Phase 5 will polish typography, spacing, colors, etc.).
 * - Not the real content (we port/adapt from previous_website/index.html in Phase 4).
 * - Not the hero with 3D (Phase 6).
 *
 * After you approve this baseline we will move to Phase 3 (shadcn + LanguageToggle foundation).
 */

'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { useState, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * Reverted from the react-i18next / custom I18nProvider + LanguageSwitcher experiment.
 * This file now contains only hardcoded English text (sourced from the previous
 * app/locales/en/{common,homepage}.json files). All translation machinery has been
 * removed per request.
 *
 * The page stays as the Phase 2 minimal clean shell baseline. The testing zone
 * (yellow dashed) remains for shadcn experiments only and does not affect the
 * portfolio content above it.
 */

/**
 * To go around Tailwind hell of class duplications, it's possible to use the CSS @apply property as follows:
 * .class_name {
 *  @apply text-3xl text-blue-500 ...*other class names*
 * }
 */

/**
 * Experiences & Education data for the interactive list.
 *
 * Each item keeps a very short summary for the homepage (minimal visual weight)
 * and richer details rendered only inside the Dialog. This keeps the list
 * scannable while allowing extra depth without bloating the page.
 *
 * "Tell me more" uses shadcn Tooltip (hover hint) + Dialog (full overlay card).
 * Data is colocated for now; easy to lift to lib/ later.
 */
type ExperienceItem = {
  id: string
  title: string
  period?: string
  short: string
  details: ReactNode
}

const experienceItems: ExperienceItem[] = [
  {
    id: "fanuc-olympiads",
    title: "FANUC Olympiads",
    period: "Sept. 2025 - Jan. 2026",
    short: "ROBOGUIDE simulation for robotic cell",
    details: (
      <>
        <figure className="mt-4">
          <video
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
            controls
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          >
            <source src="/FANUC_olympiads/cell_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <figcaption className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-500">
            ROBOGUIDE cell simulation
          </figcaption>
        </figure>

        <p>In a team of three, we simulate a complete robotic cell in Roboguide while respecting cycle time, safety for workers and other specifications.</p>
        <p>This study case was for a mobile cell, to align incoming 3x4 glass jars into a single output conveyor.</p>
        <p className="mt-2">I was responsible for building the simulation in FANUC&apos;s proprietary ROBOGUIDE software and its programming.</p>
        <ul className="mt-2 list-disc pl-5">
          I was in group with 
          <li>Clément LAMOULLER : Main designer of the cell and the vacuum End Of Arm Tool</li>
          <li>Rassil MAHJOUB : Documentation, Project Manager</li>
        </ul>
      </>
    ),
  },
  {
    id: "imvia",
    title: "ImVia Lab internship",
    period: "July 2025",
    short: "Flagship project : GUI + CFD + FANUC dynamic pathing from scratch",
    details: (
      <>
        <p>One-month internship at ImVia Lab. Presented the Super Heavy Catch flagship project to representatives from MIT France and Safran Tech.</p>
        <p className="mt-2">Implemented user interfaces to ProxSim (my simulation software) and began computational fluid dynamics work for aerodynamics studies on the project.</p>
        <p className="mt-2">Also developed and ran a custom Remote Dynamic Pathing algorithm on a real FANUC R-30iA Mate controller. The open-source library is planned for publication.</p>
      </>
    ),
  },
  {
    id: "polytech",
    title: "Polytech Dijon — Robotics Engineering",
    period: "Ongoing",
    short: "Delegate • Embedded controllers, industrial robotics, automation, C++, math",
    details: (
      <>
        <p>Student in Robotics Engineering at Polytech Dijon (Le Creusot). Delegate for two years.</p>
        <p className="mt-2">Core topics: electronics, automation/control theory, C++ programming, algebra and mathematical optimization.</p>
        <p className="mt-2">TOEIC 970/990 (Feb 2025)</p>
      </>
    ),
  },
  {
    id: "prepa",
    title: "Preparatory class for engineering schools MP2I/MPI",
    period: "Gay-Lussac, Limoges",
    short: "Intensive program : Maths, Physics, Computer Science",
    details: (
      <>
        <p>Two-year intensive preparatory class for engineering school national exams (MP2I then MPI track).</p>
        <p className="mt-2">Heavy schedule of fundamental Maths, Physics, theoretical Computer Science, plus English and Philosophy. Assessments every Saturday, Weekly oral exams.</p>
      </>
    ),
  },
]

export default function PortfolioBaseline() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null)

  const openDetails = (item: ExperienceItem) => {
    setSelectedItem(item)
    setDialogOpen(true)
  }

  const closeDetails = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      // delay clearing to allow exit animation
      setTimeout(() => setSelectedItem(null), 200)
    }
  }
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Full-viewport hero — modeled directly on the Super Heavy Catch page hero.
          Uses the same background image (/sh_catch/hero.jpeg) for now.
          Dimming layer is theme-aware (user edit): white tint in light mode, black in dark mode.
          This gives good contrast for the fixed top-right logo (black on light, white on dark).
          Contains: name (with logo at end), current occupation, slogan, and "Portfolio refresh" status. */}
      <header className="relative h-svh w-full overflow-hidden">
        {/* Background layer */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-position-[right_35%_center]"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        {/* Dimming overlay — matches the one edited on the project page */}
        <div className="absolute inset-0 dark:bg-black/65 bg-white/80" />

        {/* Content layer */}
        <div className="relative z-10 flex h-full flex-col px-6">
          {/* Vertically centered, left-aligned, cinematic spacing (same pattern as project page) */}
          <div className="flex flex-1 flex-col items-start justify-center text-left pl-6 md:pl-10 lg:pl-14 max-w-6xl">
            {/* Name block with logo at the end (keeps your recent flex row treatment) */}
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <div>
                <div
                  role="heading"
                  aria-level={1}
                  className="text-6xl md:text-8xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-white drop-shadow-lg font-[var(--font-d-din)]"
                >
                  Lucas DAVID
                </div>
                <p className="text-3xl md:text-4xl font-semibold tracking-tighter text-zinc-800 dark:text-white/95 font-[var(--font-d-din)]">
                  Rino Yves
                </p>
              </div>
            </div>

            {/* Current occupation */}
            <p className="mt-6 text-xl md:text-2xl text-zinc-700 dark:text-white/90 font-[var(--font-d-din)]">
              Robotics Engineering student at{" "}
              <a
                href="https://polytech.ube.fr/"
                className="underline decoration-zinc-400/70 dark:decoration-white/40 underline-offset-4 hover:decoration-zinc-600 dark:hover:decoration-white/70 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Polytech Dijon
              </a>
            </p>

            {/* Slogan */}
            <p className="mt-3 text-lg md:text-xl text-zinc-600 dark:text-white/80">
              Civilization has been in V1 for too long.
            </p>

            {/* Status hint — adapted for hero overlay contrast */}
            <div className="mt-6 inline-flex items-center rounded-full border border-zinc-400 dark:border-white/30 px-3 py-1 text-xs tracking-widest text-zinc-600 dark:text-white/70 animate-pulse">
              PORTFOLIO REFRESH IN PROGRESS
            </div>
          </div>

          {/* Scroll indicator at bottom (same as project page) */}
          <div className="flex justify-center pb-10">
            <div className="flex flex-col items-center text-zinc-600 dark:text-white/60">
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
        </div>
      </header>

      {/* Content below the hero — same container rhythm as before */}
      <div className="mx-auto max-w-3xl px-6 py-16 md:max-w-5xl md:px-8 lg:px-12">

        {/* === Very light section placeholders ===
             These exist only so the page feels like a portfolio skeleton.
             They will be replaced with real adapted content in Phase 4.
             Order and emphasis will be discussed at the Phase 4 checkpoint. */}
        <div className="space-y-16 text-[15px] leading-relaxed">
          {/* Current / Recent */}
          <h2 className="w-full self">What I’m currently doing</h2>
          <section className="flex flex-col-reverse justify-between items-center md:flex-row">
            <div>
              <p className="visible md:hidden mt-4">And more : </p>
              <ul className="mt-2 list-disc pl-5 text-zinc-600 dark:text-zinc-400">
                <li>Flagship project</li>
                <li>Website/portfolio refresh</li>
                <li>FANUC line demonstration</li>
              </ul>
            </div>
            {/* Alstom featured card — small, full-width, before the list.
              Uses the hero image + constrained left dim layer + bottom fade
              directly adapted from app/alstom/page.tsx. Compact height. */}
            <div className="md:ml-8 lg:ml-12 overflow-hidden rounded-lg">
              <div className="relative h-44 sm:h-48 md:h-52">
                {/* Base image layer (full bleed) — /alstom/hero.jpg */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/alstom/hero.jpg')" }}
                />

                {/* Constrained dimming layer — copied/adapted from alstom hero.
                    Keeps the heavy tint only on the left/content area. */}
                <div className="absolute inset-y-0 left-0 w-full max-w-3xl md:max-w-4xl bg-gradient-to-r from-white/95 via-white/82 via-55% to-transparent dark:from-zinc-950/95 dark:via-zinc-950/75 dark:via-55% to-transparent" />

                {/* Bottom fade for transition (lighter than full hero) */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-white/75 dark:to-zinc-950/75" />

                {/* Content layer */}
                <div className="relative z-10 flex h-full items-center px-6 md:px-8 lg:px-12">
                  <div className="w-full max-w-3xl flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="flex-1">
                      <div className="uppercase tracking-[2px] text-[10px] text-black/60 dark:text-white/70 mb-0.5">
                        Current Internship
                      </div>
                      <div className="text-xl font-semibold tracking-[-0.015em] text-black dark:text-white">
                        Alstom — Continuous Improvement
                      </div>
                      <div className="text-sm text-black/70 dark:text-white/70 mt-0.5">
                        March 30 — July 24 2026 • Le Creusot
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="group border-zinc-950 transition-all duration-200 dark:border-zinc-200 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 dark:hover:border-white"
                      >
                        <Link href="/alstom">
                          See internship details{" "}
                          <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Flagship (prominent full-width section)
          Uses the exact same overlay treatment (constrained left dim + bottom fade)
          as the compact Internship card above, but full viewport width and tall.
          min-h-[50vh] kept on the section per spec; inner min-h ensures image fills vertical. */}
      <section className="min-h-[50vh] w-full">
        <div className="relative min-h-[50vh] overflow-hidden">
          {/* Base image layer (full bleed) */}
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out opacity-100`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/sh_catch/hero.jpeg"
          >
            <source src="/sh_catch/mockup-4_demo_cropped.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Constrained dimming layer — identical treatment to the Internship card.
              Keeps heavy tint only over the left/content area for text contrast. */}
          <div className="absolute inset-y-0 left-0 w-full max-w-3xl md:max-w-4xl bg-gradient-to-r from-white/95 via-white/82 via-55% to-transparent dark:from-zinc-950/95 dark:via-zinc-950/75 dark:via-55% to-transparent" />

          {/* Bottom fade (same style as Internship card) */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-white/75 dark:to-zinc-950/75" />

          {/* Content layer */}
          <div className="relative z-10 flex min-h-[50vh] items-center px-6 md:px-8 md:max-w-5xl md:mx-auto">
            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex-1">
                <div className="uppercase tracking-[2px] text-sm text-black/60 dark:text-white/70 mb-0.5">
                  Flagship project
                </div>
                <div className="text-2xl font-semibold tracking-[-0.015em] text-black dark:text-white">
                  Super Heavy Catch
                </div>
                <div className="text-sm text-black/70 dark:text-white/70 mt-0.5">
                  2.5-year project to catch a rocket booster • Hardware-in-the-loop simulation
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group border-zinc-950 transition-all duration-200 dark:border-zinc-200 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 dark:hover:border-white"
                >
                  <Link href="/super-heavy-catch">
                    See project details{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content below the hero — same container rhythm as before */}
      <div className="mx-auto max-w-3xl px-6 py-16 md:max-w-5xl md:px-8 lg:px-12">

        {/* === Very light section placeholders ===
             These exist only so the page feels like a portfolio skeleton.
             They will be replaced with real adapted content in Phase 4.
             Order and emphasis will be discussed at the Phase 4 checkpoint. */}
        <div className="space-y-16 text-[15px] leading-relaxed">

          {/* Experiences & Education — interactive list
               Compact summaries only. "Tell me more" opens a shadcn Dialog
               with richer details. (Alstom is now promoted to its own card above.) */}
          <section>
            <h2>Experiences &amp; Education</h2>
            <TooltipProvider delayDuration={150}>
              <ul className="mt-2 list-disc pl-5 text-zinc-600 dark:text-zinc-400">
                {experienceItems.map((item) => (
                  <li key={item.id} className="py-0.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => openDetails(item)}
                          className="cursor-pointer font-medium text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                        >
                          {item.title}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={6} className="text-xs">
                        Tell me more
                      </TooltipContent>
                    </Tooltip>
                    {item.period && (
                      <span className="ml-1.5 text-xs opacity-60">• {item.period}</span>
                    )}
                    <div className="pl-1 text-xs text-zinc-500 dark:text-zinc-500">{item.short}</div>
                  </li>
                ))}
              </ul>
            </TooltipProvider>
          </section>

          <div className="space-y-16 md:grid md:grid-cols-2 md:gap-10">
            <section>
              <h2>Skills &amp; Programming</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                C++ (sockets, ImGui), Web interfaces, ROS2, MATLAB/Simulink.
              </p>
            </section>
            <section>
              <h2>Local involvement</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Village des sciences (x2)
              </p>
            </section>
          </div>

          {/* Resume section — opens English CV in a new tab (public/Resume/CV_English.pdf).
              Plain <a> (not Next <Link>) because this is a static asset, not a route. */}
          <section>
            <h2>Resume</h2>
            <div className="mt-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-zinc-950 transition-all duration-200 dark:border-zinc-200 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 dark:hover:border-white"
              >
                <a
                  href="/Resume/CV_English.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download my Resume{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </Button>
            </div>
          </section>
        </div>

        {/* Dialog rendered here (controlled, single instance).
            Renders as a centered card overlay using shadcn primitives.
            Content is the expanded details for whichever item was clicked. */}
        <Dialog open={dialogOpen} onOpenChange={closeDetails}>
          <DialogContent className="max-w-[92vw] sm:max-w-lg">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl tracking-tighter">{selectedItem.title}</DialogTitle>
                  {selectedItem.period && (
                    <DialogDescription>{selectedItem.period}</DialogDescription>
                  )}
                </DialogHeader>
                <div className="mt-1 space-y-3 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {selectedItem.details}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* === Minimal footer / contacts (will be refined later) === */}
        <footer className="mt-20 border-t border-zinc-100 pt-8 text-sm text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="https://x.com/LucasDaRiYv" className="hover:text-zinc-700 dark:hover:text-zinc-200">
              𝕏 {/* X icon here, instead of ascii letter */} @LucasDaRiYv
            </a>
            <a href="mailto:lucas@lucas-david-ry.com" className="hover:text-zinc-700 dark:hover:text-zinc-200">lucas@lucas-david-ry.com</a>
          </div>

          {/* Small credit note — "this website was made with you" + Grok logo icon (provided by you).
              Logo sits at the far right using justify-between. */}
          <div className="mt-6 flex items-center justify-between text-[10px] text-zinc-200 dark:text-zinc-100">
            <div className="flex items-center gap-1.5">
              <span>Made with</span>
              <a href="https://grok.com" className="inline-flex items-center gap-1 hover:underline">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0.36 0.5 33.33 32" 
                  className="h-[1.2em] w-auto"
                  aria-hidden="true"
                >
                  <path d="M13.2371 21.0407L24.3186 12.8506C24.8619 12.4491 25.6384 12.6057 25.8973 13.2294C27.2597 16.5185 26.651 20.4712 23.9403 23.1851C21.2297 25.8989 17.4581 26.4941 14.0108 25.1386L10.2449 26.8843C15.6463 30.5806 22.2053 29.6665 26.304 25.5601C29.5551 22.3051 30.562 17.8683 29.6205 13.8673L29.629 13.8758C28.2637 7.99809 29.9647 5.64871 33.449 0.844576C33.5314 0.730667 33.6139 0.616757 33.6964 0.5L29.1113 5.09055V5.07631L13.2343 21.0436" fill="currentColor" />
                  <path d="M10.9503 23.0313C7.07343 19.3235 7.74185 13.5853 11.0498 10.2763C13.4959 7.82722 17.5036 6.82767 21.0021 8.2971L24.7595 6.55998C24.0826 6.07017 23.215 5.54334 22.2195 5.17313C17.7198 3.31926 12.3326 4.24192 8.67479 7.90126C5.15635 11.4239 4.0499 16.8403 5.94992 21.4622C7.36924 24.9165 5.04257 27.3598 2.69884 29.826C1.86829 30.7002 1.0349 31.5745 0.36364 32.5L10.9474 23.0341" fill="currentColor" />
                </svg>
                Grok
              </a>
            </div>

            {/* Your logo at the far right of the same line */}
            <Link href="/" aria-label="Go to homepage">
              <Logo className="h-5 w-5" />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

