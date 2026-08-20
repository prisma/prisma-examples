/**
 * Everything about *you* lives in this file.
 *
 * The template ships with a fictional persona ("Riley Nakamura") so you can
 * see the site fully populated. Replace the values below with your own, and
 * swap the posts in `src/content/blog/` for your own markdown files.
 */
export const site = {
  /** Used in the <title> tag and the header. */
  name: "Riley Nakamura",
  /** Short role line shown under your name. */
  role: "Photographer",
  location: "Portland, OR",
  /** One-sentence hero tagline. */
  tagline: "I photograph landscapes and working life in the Pacific Northwest.",
  /** A couple of short paragraphs for the intro section. */
  bio: [
    "I work mainly in long-form series — returning to the same places across seasons and years rather than chasing single images. Most of my projects are shot within a few hours of home.",
    "Alongside the series work, I write occasional field notes on technique and printing, and I teach a small darkroom workshop a few times a year.",
  ],
  email: "riley@example.com",
  /** Social links rendered in the footer. Remove any you don't use. */
  links: [
    { label: "GitHub", url: "https://github.com/your-username" },
    { label: "Bluesky", url: "https://bsky.app/profile/your-handle" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle" },
  ],
} as const;

export type Project = {
  name: string;
  summary: string;
  /** Optional link — the project name renders as plain text without one. */
  url?: string;
  year: number;
  /** Featured projects appear on the home page. */
  featured?: boolean;
};

/** Shown on `/projects`, newest first. */
export const projects: Project[] = [
  {
    name: "Fog Lines",
    summary:
      "An ongoing series on coastal fog along the Oregon coast — the same twelve headlands photographed across every season since 2024.",
    url: "https://example.com/fog-lines",
    year: 2026,
    featured: true,
  },
  {
    name: "Night Shift",
    summary:
      "Environmental portraits of people who work while the city sleeps: bakers, transit crews, harbor pilots, and ER staff, photographed on location between midnight and 5 a.m.",
    url: "https://example.com/night-shift",
    year: 2025,
    featured: true,
  },
  {
    name: "A Hundred Footbridges",
    summary:
      "A survey of pedestrian bridges across the Pacific Northwest, from park boardwalks to disused rail crossings, shot in large format black and white.",
    year: 2024,
    featured: true,
  },
  {
    name: "Cascade Meadows",
    summary:
      "Three summers of alpine wildflower meadows in the Cascades, documenting the same plots from first melt to first snow.",
    year: 2023,
  },
  {
    name: "First Light",
    summary:
      "A year of sunrises from the same rooftop — 365 consecutive mornings, one frame each, presented as a single grid.",
    url: "https://example.com/first-light",
    year: 2022,
  },
];
