/**
 * Project Navigation Experiments (archived)
 *
 * This was the development scratchpad for the navigation system now merged
 * into /super-heavy-catch.
 *
 * Key patterns: desktop sticky/scrollable ToC, <Chapter> for mobile Wikipedia-style
 * collapsibles, <CollapsibleSection> for deep details.
 */

'use client'

import Link from "next/link"
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
        <span className="opacity-60">temporary example</span>
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
// Reusable wrapper for opt-in technical / deep content at the end of a section.
// - Uses native <details> + Tailwind for the accordion behavior (no extra JS).
// - The trigger label and the children (your actual technical content) are provided by the caller.
// - Intended usage:
//     <CollapsibleSection label="Technical details">
//       <p>Your equations, code, explanations...</p>
//     </CollapsibleSection>
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
// - Design is deliberately different from <CollapsibleSection> (which is for
//   small "technical details" blocks inside a chapter).
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
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Full-viewport hero — layered approach */}
      {/* Background image (full bleed) using /sh_catch/hero.jpeg */}
      {/* Dimming overlay for text contrast */}
      {/* Content: back link (top), left-padded D-DIN title + descriptions (vertically centered), scroll indicator (bottom) */}
      <header className="relative h-screen w-full overflow-hidden">
        {/* Background layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/sh_catch/hero.jpeg')" }}
        />

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
          <div className="flex justify-center pb-10">
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
          </div>
        </div>
      </header>

      {/* Main content area with vertical navigation experiment.
         - Sticky + scrollable left ToC on wide screens (see detailed comment on the nav).
         - Uses Tailwind grid for layout. The nav lists one link per <section id>.
         - CollapsibleSection (at the end of each section) uses native <details> + Tailwind. */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-5">
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
              <li><a href="#simulation-and-control-software" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Simulation &amp; Control Software</a></li>
              <li><a href="#hardware-in-the-loop-architecture" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Hardware-in-the-Loop Architecture</a></li>
              <li><a href="#physical-setup-and-fanuc-integration" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Physical Setup &amp; FANUC Integration</a></li>
              <li><a href="#visual-documentation" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Visual Documentation</a></li>
              <li><a href="#real-world-challenges" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Real-World Challenges</a></li>
              <li><a href="#control-approach" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Control Approach</a></li>
              <li><a href="#current-status-and-next-steps" className="block rounded px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors">Current Status &amp; Next Steps</a></li>
            </ul>
            <div className="mt-4 border-t border-zinc-200 pt-3 text-[10px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
              Click “Technical details” in each section for opt-in depth.
            </div>
          </nav>

          {/* Main content column (keeps readable width) */}
          <div className="min-w-0">
            <div className="space-y-16 text-[15px] leading-relaxed">
          {/* Overview */}
          <section id="overview">
            <h2>Overview</h2>
            {/* Small length + navigation warning — only appears under the first section.
               Intended to gently inform readers that this is a long page and that
               the sidebar navigation (desktop) is the recommended way to navigate. */}
            <p className="text-zinc-600 dark:text-zinc-400">
              This project explores the development of autonomous control software for the Super Heavy booster
              to perform a precise catch maneuver. The simulation environment models the booster dynamics,
              atmospheric effects, and the mechanical behavior of the catch mechanism.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              To increase realism and surface real-world integration issues early, the project uses a
              hardware-in-the-loop (HIL) architecture. The simulated vehicle exchanges real-time state
              and actuator commands with a physical test article.
            </p>
            <p className="mt-4 text-xs italic text-zinc-500 dark:text-zinc-400">
              Note: This is a long technical page. The left-hand navigation pane
              (available on wider screens) is recommended for jumping between sections.
            </p>
          </section>

          {/* Simulation & Control Software */}
          <Chapter id="simulation-and-control-software" title="Simulation & Control Software">
            <p className="text-zinc-600 dark:text-zinc-400">
              The core simulation runs a 6-DOF model of the booster during the terminal descent and catch
              phase. Control laws are implemented to stabilize attitude, manage thrust, and align the
              booster with the target catch envelope.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              A fundamental relation used for propellant budgeting and \Delta v calculations is the
              Tsiolkovsky rocket equation:
            </p>
            <div className="my-3 text-center text-base">
              <Latex display math="\Delta v = v_e \ln \left( \frac{m_0}{m_f} \right)" />
            </div>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              The software stack includes a real-time scheduler, sensor emulation, and a communication
              bridge that talks to the physical hardware at the required control frequency. The goal
              is to validate that the same flight software can later run on the actual vehicle.
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

          {/* Hardware-in-the-Loop Architecture */}
          <Chapter id="hardware-in-the-loop-architecture" title="Hardware-in-the-Loop Architecture">
            <p className="text-zinc-600 dark:text-zinc-400">
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

          {/* Physical Setup & FANUC Integration */}
          <Chapter id="physical-setup-and-fanuc-integration" title="Physical Setup & FANUC Integration">
            <p className="text-zinc-600 dark:text-zinc-400">
              A scaled or representative mock-up of the Super Heavy booster section is attached to
              the FANUC arm’s end effector. The arm is programmed to reproduce the high-speed,
              high-precision motion profile demanded by the catch sequence.
            </p>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Real-time synchronization between the simulation PC and the robot controller is critical.
              Latency, jitter, and safety interlocks are all part of the integration work. This setup
              also serves as a testbed for future robotic cell experiments and FANUC Olympiad work.
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

          {/* Minimal project footer — same spirit as the homepage footer.
             Kept inside the readable content column. */}
          <footer className="mt-20 border-t border-zinc-100 pt-8 text-sm text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200">← Back to home</Link>
              <a href="https://x.com/LucasDaRiYv" className="hover:text-zinc-700 dark:hover:text-zinc-200">𝕏 @LucasDaRiYv</a>
              <a href="mailto:lucas@lucas-david-ry.com" className="hover:text-zinc-700 dark:hover:text-zinc-200">lucas@lucas-david-ry.com</a>
            </div>
            <p className="mt-3 text-[10px] opacity-60">
              Navigation + opt-in details experiment. Content is placeholder.
            </p>
          </footer>
        </div> {/* end content column */}
      </div> {/* end grid */}
    </div> {/* end outer container */}
    </div>
  );
}
