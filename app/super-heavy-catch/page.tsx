/**
 * Super Heavy Catch — Flagship project page
 *
 * Features developed in this session:
 * - Sticky left navigation pane (ToC) that is independently scrollable on large screens.
 * - Navigation pane is hidden on small screens (content prioritized on mobile).
 * - <Chapter> component: normal visible sections on desktop + Wikipedia-style
 *   collapsible chapters on mobile (no content duplication).
 * - <CollapsibleSection> for opt-in technical depth inside chapters.
 * - Small length/navigation recommendation note under Overview.
 *
 * Content is still placeholder. Real writing by the human.
 * Media wired to /public/sh_catch.
 */

'use client'

import Link from "next/link"
import { useState, useEffect } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ChevronDown } from 'lucide-react'

import { MasonryGrid } from '@/components/MasonryGrid'

// Small self-contained LaTeX renderer (kept local to this page only for the current increment).
// Uses KaTeX renderToString. Pass LaTeX via the `math` prop (recommended) or as children string.
// Set display={true} for block/display equations.
function Latex({
  math,
  children,
  display = false,
}: {
  math?: string
  children?: string
  display?: boolean
}) {
  const latex = math ?? children ?? ''
  const html = katex.renderToString(latex, {
    displayMode: display,
    throwOnError: false,
    strict: false,
  })

  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

// Minimal scoped code block component (C++ only for now).
// Uses react-syntax-highlighter + Prism with a dark theme for good contrast.
// Monospace font pulled from the project's Geist Mono variable.
function CodeBlock({ code, language = 'cpp' }: { code: string; language?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-1.5 text-[10px] text-zinc-400">
        <span>{language.toUpperCase()}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.8125rem',
          lineHeight: '1.45',
          fontFamily: 'var(--font-geist-mono)',
          background: 'transparent',
        }}
        codeTagProps={{
          style: { fontFamily: 'var(--font-geist-mono)' },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

// CollapsibleSection
// Reusable wrapper for opt-in technical / deep content at the end of a chapter.
// Uses native <details> + Tailwind. Content provided via children.
function CollapsibleSection({
  children,
  label = "Technical details",
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <details className="group mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-zinc-700 select-none hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900/60 transition-colors">
        <span>{label}</span>
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-zinc-200 px-4 py-4 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        {children}
      </div>
    </details>
  )
}

// Chapter
// Wikipedia-inspired collapsible chapter for *mobile* navigation.
// - On large screens (lg+): renders a normal visible <section> with <h2>.
//   This keeps the existing desktop experience + sidebar ToC working perfectly.
// - On small screens: renders a <details> where the chapter title itself is the
//   large clickable header. Clicking expands the full content.
// - Content is written only once (no duplication in source).
// - Design is deliberately different from <CollapsibleSection>.
function Chapter({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      {/* Desktop version — always visible, matches previous section structure */}
      <section id={id} className="hidden lg:block">
        <h2>{title}</h2>
        {children}
      </section>

      {/* Mobile-only version — Wikipedia-style collapsible navigation */}
      <details
        className="group lg:hidden border-b border-zinc-200 dark:border-zinc-800"
        id={id}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-3.5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 select-none active:bg-zinc-100 dark:active:bg-zinc-900">
          <span>{title}</span>
          <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="pb-8 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
      </details>
    </>
  )
}

export default function SuperHeavyCatchPage() {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    // This runs only on the client after the initial render/hydration.
    // We deliberately start with `false` so the server HTML and first client
    // render are identical (no video element). This prevents hydration mismatch.
    // The video is an enhancement that we opt into after mount if conditions allow.

    // The Network Information API is not included in TypeScript's default
    // Navigator type (it's experimental + has prefixed legacy versions).
    // We augment the type locally with an intersection so we don't need `any`.
    type Connection = {
      effectiveType?: string
      saveData?: boolean
    }

    const nav = navigator as Navigator & {
      connection?: Connection
      mozConnection?: Connection
      webkitConnection?: Connection
    }

    const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection

    const saveData = connection?.saveData === true
    const effectiveType = connection?.effectiveType || '4g'

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const isSlow =
      saveData ||
      effectiveType === 'slow-2g' ||
      effectiveType === '2g' ||
      effectiveType === '3g'

    // Optimistic: load video on unknown/fast connections.
    // Use requestAnimationFrame so the setState is not synchronous
    // inside the effect body (avoids "cascading renders" warning).
    if (!prefersReduced && !isSlow) {
      requestAnimationFrame(() => setShouldLoadVideo(true))
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Full-viewport hero — layered approach */}
      {/* Static JPEG base (always instant, ~1.5 MB).
         Video is a client-only enhancement: we start without it so server and
         first client render match (avoids hydration mismatch), then add it
         after mount if the connection is decent. */}
      <header className="relative h-screen w-full overflow-hidden">
        {/* Background base layer — the JPEG always shows immediately */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/sh_catch/hero.jpeg')" }}
        />

        {/* Video layer — only added on the client (after hydration) when
           connection is good. Starts transparent and fades in. */}
        {shouldLoadVideo && (
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/sh_catch/hero.jpeg"
            onCanPlay={() => setIsVideoReady(true)}
          >
            <source src="/sh_catch/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Dimming overlay — applied at render time for reliable contrast */}
        <div className="absolute inset-0 dark:bg-black/65 bg-white/80" />

        {/* Content layer */}
        <div className="relative z-10 flex h-full flex-col px-6">
          {/* Back to portfolio — kept prominent but adapted for dark hero */}
          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white underline dark:decoration-white/30 underline-offset-4 dark:hover:decoration-white/60 transition-colors"
            >
              ← Back to portfolio
            </Link>
          </div>

          {/* Vertically centered hero message — left-aligned and left-padded for a more heroic, cinematic feel */}
          {/* All typography now comes from Tailwind utilities + the D-DIN variable (via @theme / root).
             Using a <div role="heading"> instead of <h1> so the global h1 rule in globals.css doesn't apply. */}
          <div className="flex flex-1 flex-col items-start justify-center text-left pl-6 md:pl-10 lg:pl-14 max-w-6xl">
            <div
              role="heading"
              aria-level={1}
              className="text-6xl md:text-8xl font-bold tracking-[-0.03em] text-black/80 dark:text-white drop-shadow-lg font-[var(--font-d-din)]"
            >
              Super Heavy Catch
            </div>
            <p className="mt-4 text-xl text-black/80 dark:text-white/90 font-[var(--font-d-din)]">
              Hardware-in-the-loop simulation of the booster catch maneuver
            </p>
            <p className="mt-2 text-lg text-black/80 dark:text-white/80 font-[var(--font-d-din)]">
              Real-time control software running against a physical mock-up mounted on a FANUC robotic arm.
            </p>

          </div>

          {/* Scroll indicator — simple centered arrow at bottom of hero */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <img src="/logos/spacex.svg" alt="SpaceX" className="h-13 w-auto dark:invert" />
              <p className="-mt-3 text-xs opacity-70">Not affiliated</p>
            </div>
            <div className="flex flex-col items-center text-white/60">
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
            <div className="flex flex-col md:flex-row gap-8">
              <img src="/logos/polytech.png" alt="Polytech Dijon" className="w-40 h-auto md:h-15 md:w-auto" />
              <img src="/logos/ube.png" alt="Université Bourgogne Europe" className="w-40 h-auto md:h-15 md:w-auto" />
            </div>
          </div>
          
        </div>
      </header>

      {/* Main content area with navigation */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-10">
          {/* Vertical navigation pane (Table of Contents)
             - Hidden on screens smaller than `lg` (using `hidden lg:block`).
             - On lg+ screens: sticky, independently scrollable (`overflow-y-auto`)
               when the list of sections is taller than the viewport.
             - IMPORTANT: The navigation pane completely disappears on mobile
               and narrow viewports. This is a deliberate tradeoff to keep the
               overview + main content prioritized on small screens.
             - This solution is acceptable for now (people reading very detailed
               technical material are unlikely to do so on a phone), but the
               lack of mobile navigation must be addressed before publishing
               the final website. Future options to consider: a collapsible
               top "Contents" menu, a slide-in drawer, or prominent in-page
               jump links. */}
          <nav
            className="hidden lg:block lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pb-8 lg:pr-2"
            aria-label="Table of contents"
          >
            <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.5px] text-zinc-500 dark:text-zinc-500">
              On this page
            </div>
            <ul className="space-y-px text-sm">
              <li><a href="#overview" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Overview</a></li>
              <li><a href="#simulation-and-control-software" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Simulation &amp; Control Software : ProxSim</a></li>
              <li><a href="#hardware-in-the-loop-architecture" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Hardware-in-the-Loop Architecture</a></li>
              <li><a href="#fanuc-integration" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">FANUC Integration</a></li>
              <li><a href="#mockups" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Physical mockups</a></li>
              <li><a href="#visual-documentation" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Visual Documentation</a></li>
              <li><a href="#real-world-challenges" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Real-World Challenges</a></li>
              <li><a href="#control-approach" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Control Approach</a></li>
              <li><a href="#current-status-and-next-steps" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Current Status &amp; Next Steps</a></li>
            </ul>
            <div className="mt-4 pt-4 border-t flex flex-col gap-8 border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500  dark:text-zinc-500">Click “Technical details” in each section for opt-in depth.</p>
            </div>
          </nav>

          {/* Main content column (keeps readable width) */}
          <div className="min-w-0">
            <div className="space-y-16 text-[15px] leading-relaxed">

          {/* Overview */}
          <section id="overview">
            <h2>Overview</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              This project explores the development of <u>autonomous control software</u> for the Super Heavy booster
              to perform a precise catch maneuver, by <u>reverse-engineering</u> the real system (looking at how it works, at public materials, and proving this solution is plausible).
              The simulation environment models the booster dynamics, atmospheric effects, and the mechanical behavior of the catch mechanism.
              But going above a simple simulation, the manoeuver wil happen, live, in a FANUC robotic cell with human-sized mockups, equipped with noisy sensors and actuators : a <u>hardware-in-the-loop simulation</u>. This makes the simulation susceptible to real noise, drift, and imprecisions.
              It also allows me to interest people into my project, it is much more entertaining to see a rocket fly than a cylinder move on a screen.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              This is a robotics engineering study project in Polytech Dijon. Robotics is everything that has sensors, actuators, and compute so even rockets fall into our field.
              This study project is perfect for me as it gathers passion, advanced theoretical fields, as well as real-world applications. Crazy as it is, my tutor accepted my project in only a few minutes.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Space Exploration is awe inspiring, and is becoming the obvious next civilization step. The innovations a system like Starship is bringing is crucial for a meaningful adventure into space, for humans and for the economy.
              Man used to work on cathedrals they would never see completed, and I qualify Space Exploration as today&quot;s cathedral, and I want to be part of it.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Starting at 40km altitude (~130k ft.) on a ballistic trajectory a small distance short of the launch site, the booster will go though 3 phases : 
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
              <li>Descent at high speeds (up to Mach 4)</li>
              <li>Decelerate using 13 engines</li>
              <li>Rest itself on two arms mounted on the launch tower with 5 engines</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400">
              This requires multiple guidance methods (aerodynamic surfaces and thrust vector control), and a solid control system.
            </p>
          </section>

          {/* Simulation & Control Software */}
          <Chapter id="simulation-and-control-software" title="Simulation &amp; Control Software : ProxSim">
            <p className="text-zinc-600 dark:text-zinc-400">
              I need an environment where the physics simulation happens, and where it can send movements/receive sensor data.
              This is why I made my own software in C++, using MuJoCo for the physical simulation, and ImGui or the interface.
              MuJoCo is an open-source simulation engine that is widely used in AI Robotics at Nvidia and Google Deepmind, and ImGui is a widely used open-source library for building user interfaces in C++.
              Applying multiple Meganewtons of force on rotating engines and keeping the simulation stable was a difficult job.
            </p>
            <figure>
              <img
                src="/sh_catch/proxsim.png"
                alt="Simulation software, combining physics simulation and communications"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Screenshot of ProxSim while a simulation was running with a Super Heavy V2. Camera control, telemetry, data collection, robotic cell control center.
              </figcaption>
            </figure>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              The whole goal of &quot;Control&quot; is to tell the booster what to do by itself.
              This problem is unpredictable and it needs to work even if an engine can&apos;t start, if there is cross-wind, if a grid fin is stuck, it is a sort of sentience.
              As of today, a simple controller (PID) is implemented to hold the booster upright, far from the end-goal : <u>Model Predictive Control</u>.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Model Predictive Control (MPC) is a state representation of a system, and an optimization algorithm. Given a state X of the system, its model (A,B,C,D) (physical model like mass, inertia, response to commands), it estimates the future to reach a setpoint.
            </p>
            <div className="my-3 text-center text-base">
              <Latex display math="\begin{cases} \dot X = A X + BU \\ Y = C X + D U  \end{cases}" />
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              A is the free-response of the system (given no command, the booster simply falls).
              B is how the system behaves to commands (torque, force, fuel consumption).
              C is what is measurable (the position of the booster is measurable, and is a goal/setpoint of the controller.
              D is often 0 (the command has no direct consequences)
            </p>
            <CollapsibleSection label="Details about MPC">
              <article>
                <p>Where I should think next : about the convergence, Lossless Convexification and Lars Blackmore&apos;s work, comparison with a raw G-FOLD algorithm found somewhere.</p>
              </article>
            </CollapsibleSection>
          </Chapter>

          {/* Hardware-in-the-Loop Architecture */}
          <Chapter id="hardware-in-the-loop-architecture" title="Hardware-in-the-Loop Architecture">
            {/* Add FANUC logo here */}
            <p className="text-zinc-600 dark:text-zinc-400">
              For this mockup, I need both aesthetic (to be appealing to people) and be a solid work horse.
              The Super Heavy mockup needs to have 3 actionable grid fins, a way to measure its position relative to the Tower mockup, wireless communications, onboard compute, and be attached to the FANUC arm.
              I made multiple booster mockups and here is the current one
              Instead of a pure software simulation, the booster mock-up is physically mounted to the
              end of a FANUC industrial robotic arm. The arm executes the exact trajectory that the
              simulated catch maneuver would require, providing realistic inertial loads and kinematics.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Sensor data from the physical setup (encoders, force/torque if available) is fed back
              into the simulation loop. This closes the loop between the virtual vehicle dynamics
              and real mechanical hardware, exposing issues that pure simulation would miss.
            </p>
            <CollapsibleSection>
              <article>
                <p>The Pythagorean theorem for any right triangle with legs a, b and hypotenuse c:</p>
                <div className="my-3 text-center text-lg">
                  <Latex display math="a^2 + b^2 = c^2" />
                </div>
                <p className="mt-2 text-xs opacity-70">
                  Placeholder technical content. The real depth (equations, code, derivations, etc.) will be provided later.
                </p>
              </article>
            </CollapsibleSection>
          </Chapter>

          {/* FANUC Integration */}
          <Chapter id="fanuc-integration" title="FANUC Integration">
            <img src="/logos/fanuc.svg" alt="FANUC" className="h-7 w-auto my-4 dark:invert" />
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">
              FANUC is a global leader in Industrial Robotics manipulators, and we have two FANUC arms at Polytech : a small one for education purpose, and a large one that had no real usage yet.
              I planned to participate to FANUC&apos;s National Olympiads, so I needed experience with their systems anyway.
              I am working with a R-30iA Mate controller, with an M-10iA/12S arm (V7.70 software).
              However, <u>I need to make it work so I can stream real-time positions</u> of the Super Heavy booster from ProxSim,
              following the exact same trajectory, without any delay nor jerk, and this is not what industrial robots are for : they are made for pre-programmed trajectories and logic.
            </p>
            <MasonryGrid className="gap-8 mb-8">
              <figure>
                <img
                  src="/sh_catch/cell_before.jpg"
                  alt="Wide view of the unused cell (mounted for a welding trajectory demo)"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Wide view of the unused cell (mounted for a welding trajectory demo)
                </figcaption>
              </figure>

              <figure>
                <img
                  src="/sh_catch/cell_after.jpg"
                  alt="Wide view of the cell after a rework : a platform for usual robotics educational applications, and a lower strut to fix my Launch Tower mockup"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Wide view of the cell after a rework : a platform for usual robotics educational applications, and a lower strut to fix my Launch Tower mockup
                </figcaption>
              </figure>
            </MasonryGrid>
            {/* Make "fanucpy" a clickable link to https://github.com/torayeff/fanucpy */}
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">
              I found a great library : fanucpy. It gives drivers (KAREL programs) to add to the robot, directions to setup a HTTP server on the controller, and a small python program to run on a local computer.
              While it was a very good starting point, multiple features were missing : no continuous options as all movements were executed individually (and not chained like in a regular FANUC program),
              commands could start multiple seconds after they were sent, no management of user frames...
              So I reworked the whole library, from the low-level KAREL for the FANUC to the low-level C++ for the ProxSim library, to add a new Spline functionality.
              The Spline functionality is currently working on select test cases, but is yet to prove reliability once integrated into ProxSim, more testing is needed.
            </p>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">
              Here, I&apos;m sending random positions, at random intervals to the robot, and see how it handles. Comparison between the first and the second (latest) version.
            </p>
            <MasonryGrid className="gap-8">

              <figure className="mb-8">
                <video
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="/sh_catch/fanuc_bezier.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  FANUC Spline V1 (Bézier curves). Stops are when no command arrives when the current one ends. Speed X2
                </figcaption>
              </figure>

              {/* Issue here, the video is not loading */}
              <figure className="mb-8">
                <video
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="/sh_catch/fanuc_hermite.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  FANUC Spline V2 (Hermite curves)
                </figcaption>
              </figure>

            </MasonryGrid>

            <CollapsibleSection>
              <article>
                <h2>How to have a continuous motion</h2>
                <p className="mb-8 text-zinc-600 dark:text-zinc-400">
                  The delay of multiple seconds is caused by the FANUC&apos;s own motion system. The brakes have to be released fist, and then it can move.
                  The brakes automatically activates a few seconds after the last motion concluded.
                  The way fanucpy works by default is with a stack approach : each instructions (position, movement type, speed) have to be processed by the KAREL server and executed from a called TP program for the next to happen.
                  I tried to use SKIP commands, but SKIPs are always stopping the robot before proceeding.
                  My solution : have a TP program running continuously, waiting for instructions sent from the KAREL program. To manage interrupts (when the server receives a new command while the last one is not completed, I use two memory spaces, so KAREL can work on one while the TP program is looping on the other. Once KAREL finished to process it, I make the TP program switch memory space.)
                </p>

                <h2>About curves</h2>
                <p className="mb-8 text-zinc-600 dark:text-zinc-400">
                  This is where I ramble about interpolation and splines, and why velocities are important compared to simple geometry, and how I made the FANUC understand what I wanted.
                  If I asked the FANUC to reach each points every milliseconds, the server wouldn&apos;t handle it, I needed better quality on lower resolution, and it comes to interpolation : filling thr blanks.
                  The movement of the Super Heavy is smooth (as it is a system with a large inertia), so I thought about curves. Current curves interpolation systems use Bézier cures : it is practical for geometry.
                </p>
                <p className="mb-8 text-zinc-600 dark:text-zinc-400">
                  As you can see in the videos above, the results of V1 are not very smooth, at some places, the arm accelerated and decelerated suddenly.
                  This is because Bézier curves were not meant for movement, it only is for geometry. A better alternative : Hermite curves.
                  Instead of joining multiple points, it takes the start and end position, as well as the velocities at both points.
                  To ensure the robot catches up with the continuous flow of commands, the position of the beginning of the movement and it speed can be the robot&apos;s.
                  If it is late, the interpolation will push the robot faster to catch up.
                  I then calculate in the robot, the interpolation intermediate positions/speeds, write it to PRs and sends the signal to switch memories 
                </p>
                
                <MasonryGrid className="mb-8 gap-8">

                  <figure>
                    <img
                      src="/sh_catch/bezier-def.svg"
                      alt="Wide view of the unused cell (mounted for a welding trajectory demo)"
                      className="w-full rounded-lg border bg-white border-zinc-200 dark:border-zinc-800 object-cover"
                    />
                    <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      Bezier curves : intermediate physically meaningless points (but easy to compute, draw : foundations of computer graphics)
                    </figcaption>
                  </figure>

                  <figure>
                    <img
                      src="/sh_catch/hermite-def.png"
                      alt="Wide view of the unused cell (mounted for a welding trajectory demo)"
                      className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                    />
                    <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      Hermite curves : only physically representative variables
                    </figcaption>
                  </figure>

                </MasonryGrid>

                <p>
                  Finally, here is the KAREL code
                </p>
                <CodeBlock
                language="KAREL"
                code={`FUNCTION dothis(arg: integer):
CONST
  var1: string
BEGIN
  haha
END`}/>
                <p className="my-8 text-zinc-600 dark:text-zinc-400">
                  TP programs are interpreted, that means I can edit PRs at run time, yes. However, FANUC&apos;s motion systems reads ahead in the program, to plan the trajectory.
                  The &quot;ahead&quot; number of position depends on the movement options, an &quot;ACC&quot; option makes the &quot;ahead&quot; count increase by one, so does &quot;CNT&quot; when non-zero.
                  So I keep track of the current movement index in the memory, and start the next motion as if ahead by ~2 positions. This is the secret sauce to make the trajectory butter smooth and not have small hiccups/slowdowns.
                </p>
              </article>
            </CollapsibleSection>
          </Chapter>

          {/* Physical mockups, CAD design and design choices */}
          <Chapter id="mockups" title="Physical mockups">
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">
              The goal of this project is to reverse engineer a complex system, but also to prove to people the tech exists for revolutionary transports,
              I need to interest people into my project, for visitors of sciences fairs, school visits...
              This means I have to make a mockup both practical, easy to 3D print (this is my only available manufacturing solution), and make it appealing.
            </p>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              As my project evolved, so did the Super Heavy booster&apos;s real design. Accounting to usual iterations, I made 4 different versions.
            </p>

            <MasonryGrid className="mb-8 gap-8">

              <figure>
                <img
                  src="/sh_catch/mockup-3.jpg"
                  alt="Wide view of the unused cell (mounted for a welding trajectory demo)"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Mockup 3 : Super Heavy V2
                </figcaption>
              </figure>

              <figure>
                <img
                  src="/sh_catch/mockup-4-standing.jpg"
                  alt="Wide view of the unused cell (mounted for a welding trajectory demo)"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Mockup 4 : Super Heavy V3 : featuring rotating grid fins, twist-and-lock and good coloring.
                </figcaption>
              </figure>

            </MasonryGrid>

            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              It stands ~70cm high, made in three sections (actuators, logic/comms, and battery).
              The three parts assemble using a twist-and-lock contraption after the screws were too ugly and unreliable with heavy parts swinging around for hours.
            </p>

            <CollapsibleSection>
              <article>
                <p>
                  Features an ESP32 (used both for communications, and IMU processing with low-pass filters (Kalmann filters might come later))
                  Made to fit and hold a whole breadboard, big battery to have autonomy, tight servos holder. 
                </p>
                <p>Printed on a BambuLab A1 printer, using 0.2 and 0.4 nozzles, with PLA.</p>
              </article>
            </CollapsibleSection>
          </Chapter>

          {/* Visual Documentation */}
          <Chapter id="visual-documentation" title="Visual Documentation">
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Early visuals from the simulation environment, cell programming, and hardware setup.
              These assets will be replaced or expanded with higher-quality captures, diagrams,
              and annotated footage in later iterations.
            </p>

            {/* Media gallery — uses generic MasonryGrid (CSS columns) so tall images
               don't create big empty holes. Video kept as a prominent full-width block. */}
            <MasonryGrid className="gap-8">
              <figure>
                <img
                  src="/sh_catch/sh_catch_far.jpg"
                  alt="Wide view of the Super Heavy catch simulation setup"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Overall view of the test cell and catch envelope (temporary caption)
                </figcaption>
              </figure>

              <figure>
                <img
                  src="/sh_catch/starship_full-stack.jpeg"
                  alt="Full stack Starship reference"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Reference full-stack vehicle (temporary)
                </figcaption>
              </figure>

              <figure>
                <img
                  src="/sh_catch/prog_fanuc.jpeg"
                  alt="FANUC robot programming interface"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
                />
                <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Programming the FANUC arm motion profile (temporary caption)
                </figcaption>
              </figure>
            </MasonryGrid>

            {/* Video as prominent full-width block (outside masonry) */}
            <figure className="mt-8">
              <video
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                controls
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src="/sh_catch/ift5_recap.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                IFT-5 recap footage used for maneuver reference and timing (temporary)
              </figcaption>
            </figure>
            <CollapsibleSection>
              <article>
                <p>The Pythagorean theorem for any right triangle with legs a, b and hypotenuse c:</p>
                <div className="my-3 text-center text-lg">
                  <Latex display math="a^2 + b^2 = c^2" />
                </div>
                <p className="mt-2 text-xs opacity-70">
                  Placeholder technical content. The real depth (equations, code, derivations, etc.) will be provided later.
                </p>
              </article>
            </CollapsibleSection>
          </Chapter>

          {/* Real-World Challenges (temporary placeholder) */}
          <Chapter id="real-world-challenges" title="Real-World Challenges">
            <p className="text-zinc-600 dark:text-zinc-400">
              Integrating the simulation timestep with the physical robot’s control loop introduced
              timing and determinism problems. Small delays in the communication bridge could
              destabilize the closed-loop behavior.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Mechanical compliance in the mock-up mount, robot joint flexibility, and sensor
              noise all affect the fidelity of the HIL test. Safety systems and emergency stops
              had to be designed so that a software fault would not damage the arm or cell.
            </p>

            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              A simplified excerpt from the real-time communication bridge shows the kind of
              timing-sensitive C++ that had to be carefully bounded for determinism:
            </p>
            <div className="mt-3">
              <CodeBlock
                code={`// Real-time bridge loop (simplified, temporary example)
void control_loop() {
    while (running) {
        auto desired = simulate_descent();

        auto start = std::chrono::steady_clock::now();

        if (!send_to_fanuc(desired)) {
            trigger_emergency_stop();
            return;
        }

        Feedback fb = receive_feedback();   // source of jitter
        apply_correction(fb);

        auto elapsed = std::chrono::steady_clock::now() - start;
        if (elapsed > std::chrono::milliseconds(12)) {
            log_determinism_violation(elapsed);
        }

        std::this_thread::sleep_until(start + std::chrono::milliseconds(10));
    }
}`}
              />
            </div>
            <CollapsibleSection>
              <article>
                <p>The Pythagorean theorem for any right triangle with legs a, b and hypotenuse c:</p>
                <div className="my-3 text-center text-lg">
                  <Latex display math="a^2 + b^2 = c^2" />
                </div>
                <p className="mt-2 text-xs opacity-70">
                  Placeholder technical content. The real depth (equations, code, derivations, etc.) will be provided later.
                </p>
              </article>
            </CollapsibleSection>
          </Chapter>

          {/* Control Approach & Future Math (temporary placeholder) */}
          <Chapter id="control-approach" title="Control Approach">
            <p className="text-zinc-600 dark:text-zinc-400">
              The booster uses a combination of attitude control via grid fins / thrust vectoring
              and precise vertical positioning during the final meters. Early tests focus on
              attitude hold and descent rate tracking.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              The dynamics of the booster near the catch point can be locally approximated by a linear
              state-space model. A simplified continuous-time representation is:
            </p>
            <div className="my-3 text-center text-base">
              <Latex display math="\dot{\mathbf{x}} = A \mathbf{x} + B \mathbf{u}" />
            </div>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Here <Latex math="\mathbf{x}" /> is the state vector (attitude, rates, position, velocity),
              <Latex math="\mathbf{u}" /> contains the control inputs (thrust vectoring, grid fin
              deflections), and the matrices A and B are identified or derived from the simulation
              model. Full derivation and discretization for the flight software will be added in
              a future pass.
            </p>
            <CollapsibleSection>
              <article>
                <p>The Pythagorean theorem for any right triangle with legs a, b and hypotenuse c:</p>
                <div className="my-3 text-center text-lg">
                  <Latex display math="a^2 + b^2 = c^2" />
                </div>
                <p className="mt-2 text-xs opacity-70">
                  Placeholder technical content. The real depth (equations, code, derivations, etc.) will be provided later.
                </p>
              </article>
            </CollapsibleSection>
          </Chapter>

          {/* Current Status */}
          <Chapter id="current-status-and-next-steps" title="Current Status &amp; Next Steps">
            <p className="text-zinc-600 dark:text-zinc-400">
              The basic HIL loop is running and the arm can replay representative trajectories.
              Current work focuses on improving synchronization, adding better instrumentation,
              and validating that the flight software branch produces stable catch behavior.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Next milestones include logging full state traces, running Monte-Carlo style
              variations on the physical hardware, and gradually increasing the fidelity of
              the mock-up and sensor models.
            </p>
            <CollapsibleSection>
              <article>
                <p>The Pythagorean theorem for any right triangle with legs a, b and hypotenuse c:</p>
                <div className="my-3 text-center text-lg">
                  <Latex display math="a^2 + b^2 = c^2" />
                </div>
                <p className="mt-2 text-xs opacity-70">
                  Placeholder technical content. The real depth (equations, code, derivations, etc.) will be provided later.
                </p>
              </article>
            </CollapsibleSection>
          </Chapter>
            </div>

            {/* Minimal project footer — same spirit as the homepage footer */}
            <footer className="mt-20 border-t border-zinc-100 pt-8 text-sm text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200">← Back to home</Link>
                <a href="https://x.com/LucasDaRiYv" className="hover:text-zinc-700 dark:hover:text-zinc-200">𝕏 @LucasDaRiYv</a>
                <a href="mailto:lucas@lucas-david-ry.com" className="hover:text-zinc-700 dark:hover:text-zinc-200">lucas@lucas-david-ry.com</a>
              </div>
              <p className="mt-3 text-[10px] opacity-60">
                Flagship project page. Navigation patterns (desktop sidebar + mobile Chapter collapsibles) and technical details are experimental.
              </p>
            </footer>
          </div> {/* end content column */}
        </div> {/* end grid */}
      </div> {/* end outer container */}
    </div>
  );
}
