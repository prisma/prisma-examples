"use client";

import { useEffect } from "react";

// The theme the last click chose. A view transition applies it a frame later,
// so a quick second click starts from it, not from the page.
let chosen: string | undefined;

/**
 * Points the browser's theme color (a phone's address bar) at `theme`: of the
 * two in layout.tsx, one per OS setting, only that theme's applies.
 */
function showThemeColor(theme: string) {
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.dataset.scheme ??= meta.media.includes("dark") ? "dark" : "light";
    meta.media = meta.dataset.scheme === theme ? "all" : "not all";
  }
}

/**
 * Switches between light and dark, starting from whichever is showing, and
 * remembers the choice in this browser. The script in layout.tsx applies it
 * before the first paint. The switch is a view transition: the browser
 * cross-fades the whole page at once, so the page and the scheduler, which
 * have color transitions of their own, change together instead of one by one.
 */
export function ThemeToggle() {
  // A theme chosen on an earlier visit, which the script has already applied to the page.
  useEffect(() => {
    const theme = document.documentElement.dataset.theme;
    if (theme === "light" || theme === "dark") showThemeColor(theme);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const current = chosen ?? root.dataset.theme;
    const dark = current === "dark" || (current !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
    const theme = dark ? "light" : "dark";
    chosen = theme;
    const apply = () => {
      if (chosen !== theme) return; // a later click's transition shows its theme
      root.dataset.theme = theme;
      showThemeColor(theme);
    };
    if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Storage blocked: the choice lasts until the page reloads.
    }
  }

  return (
    <button type="button" className="button icon" aria-label="Switch between light and dark theme" onClick={toggle}>
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
