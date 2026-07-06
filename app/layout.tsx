import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import Link from "next/link";
import "./globals.css";
import { Logo } from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Custom fonts (D-DIN for future Super Heavy / SpaceX shout-out)
 *
 * The D-DIN variants are kept in public/fonts/ (as you placed them).
 * This is a perfectly fine location for raw font files.
 *
 * IMPORTANT BEST PRACTICES (to avoid performance issues):
 * - We will NEVER load all 8 .otf files at once. That would be abusive (extra bandwidth + slower FOUT).
 * - When we decide to use D-DIN (e.g. for the Super Heavy section later), we will only declare
 *   the specific weights/styles we actually need using next/font/local.
 * - Fonts are lazy-loaded by the browser: the .otf file is only requested when a CSS rule using
 *   that font-family is applied to visible text.
 * - We always set font-display: 'swap' (default in next/font/local).
 *
 * Example of how we will activate it later (commented so nothing loads now):
 *
 * import localFont from 'next/font/local';
 *
 * const dDin = localFont({
 *   src: [
 *     { path: '../public/fonts/D-DIN.otf', weight: '400', style: 'normal' },
 *     { path: '../public/fonts/D-DIN-Bold.otf', weight: '700', style: 'normal' },
 *     // only add Italic / Condensed / Exp variants if/when you actually use them
 *   ],
 *   variable: '--font-d-din',
 *   display: 'swap',
 * });
 *
 * Then in a component or the root: className={dDin.variable}
 * And apply font-family: var(--font-d-din) only to the elements/sections that need the SpaceX shout-out.
 *
 * We keep Geist as the main font (as you requested). D-DIN will be a deliberate, scoped accent later.
 */

const dDin = localFont({
  src: [
    { path: '../public/fonts/D-DIN.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/D-DIN-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-d-din',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Lucas DAVID RY | Robotics Engineering",
  description: "Personal portfolio of Lucas DAVID Rino Yves — Robotics Engineering student at Polytech Dijon. Flagship project: reverse-engineering the Super Heavy Booster catch maneuver (simulation + real FANUC robotic cell). FANUC Olympiads, control systems, C++, ROS, MATLAB.",
  icons: {
    // SVG favicon from the processed logo. Falls back to app/favicon.ico for old clients.
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    title: "Lucas DAVID RY | Robotics Engineering",
    description: "Student in Robotics Engineering at Polytech Dijon. Working on hardware-in-the-loop simulations, FANUC Olympiads, and the Super Heavy Catch maneuver.",
    images: [{ url: "https://www.lucas-david-ry.com/assets/img/pp_web.jpg" }], // replace when you add local assets
    url: "https://www.lucas-david-ry.com/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas DAVID Rino Yves",
    creator: "@LucasDaRiYv",
    description: "Student in Robotics, working on hardware-in-the-loop simulations, FANUC, and the Super Heavy Catch maneuver!",
    images: ["https://www.lucas-david-ry.com/assets/img/pp_web.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dDin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Persistent brand mark — top right corner on every page.
            Uses fixed positioning so it stays in the screen corner
            regardless of page-specific containers or full-bleed heroes.
            Links to homepage. Color follows the light/dark theme. */}
        <Link
          href="/"
          className="fixed top-6 right-6 z-50 text-zinc-950 dark:text-zinc-50 transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 rounded"
          aria-label="Go to homepage"
        >
          <Logo className="h-8 w-8" />
        </Link>

        {children}
      </body>
    </html>
  );
}
