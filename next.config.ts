import type { NextConfig } from "next";

/**
 * Deployment strategy note (Phase 2 baseline — updated 2026-06-12)
 *
 * This config is intentionally kept *minimal*.
 *
 * The goal is to keep the project "dual-path friendly":
 * - Static export (output: 'export') remains possible at any time for GitHub Pages
 *   (this matches exactly how your current/old website is deployed).
 * - A small persistent Node.js server on your HomeLab is also a realistic future path
 *   (nginx reverse proxy, Docker, PM2, etc.).
 *
 * Therefore we deliberately do **not** set `output: 'export'` here yet.
 * We also avoid patterns that would make one path painful later.
 *
 * Image handling will be decided with comments when we reach actual assets
 * (standard next/image optimization works great with a server; static export
 * usually needs `unoptimized: true` or an external image loader).
 *
 * How to switch later (documented so you always control it):
 *   - For GitHub Pages static: set `output: 'export'`, add `images: { unoptimized: true }`,
 *     and usually a `public/.nojekyll` file + possible assetPrefix.
 *   - For HomeLab server: leave as default (or add server-specific things like
 *     rewrites, headers, etc. only at that time).
 *
 * We will only make the final choice explicit in Phase 7+ (hosting decision checkpoint).
 * Until then the project must `npm run build` cleanly in the standard mode.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  allowedDevOrigins: ['192.168.1.15'],
};

export default nextConfig;
