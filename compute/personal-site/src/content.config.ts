import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/**
 * Blog posts are markdown files in `src/content/blog/`.
 * The filename becomes the URL: `photographing-fog.md` → `/blog/photographing-fog`.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    /** Drafts never appear on the site. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
