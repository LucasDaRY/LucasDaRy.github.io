import { cn } from "@/lib/utils";

/**
 * Lucas DAVID RY mark.
 *
 * Processed from public/icons/logo.svg:
 * - All hardcoded fill="black" replaced with fill="currentColor" so the logo
 *   automatically follows the surrounding text color (light/dark mode).
 * - The internal detail stroke (originally white) is inverted via Tailwind
 *   dark variant so it remains visible and high-contrast in both themes.
 *
 * Usage:
 *   <Logo className="h-10 w-10" />
 *
 * This is the single definition. Import from components/Logo in any page.
 * No <img> or external SVG import (avoids the currentColor limitation you saw).
 */
export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
      {...props}
    >
      <g clipPath="url(#logo-mark)">
        <path
          d="M278.275 274.9L15.6997 313.375L440.5 46.0751L340.656 484.094L424.188 68.125L63.3997 295.825L280.75 270.625L278.275 274.9Z"
          fill="currentColor"
        />
        <path
          d="M349.375 170.95L340.656 484.094L361.75 148.281L150.812 288.344L349.375 170.95Z"
          fill="currentColor"
        />
        <path
          d="M340.656 484.094L361.75 148.281L424.188 68.125L340.656 484.094Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="logo-mark">
          <rect width="512" height="512" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
