# personal-site

A simple personal site template built with [Astro](https://astro.build). No database, no CMS — your identity lives in one config file and your posts are markdown files. The whole site builds to static HTML you can host anywhere.

It ships fully populated with a fictional persona (**Riley Nakamura**, a photographer) so you can see everything working before you make it yours.

## Pages

| Route | What it shows |
|---|---|
| `/` | Intro, featured projects, recent writing |
| `/blog` | All published posts |
| `/blog/[slug]` | A single post, rendered from markdown |
| `/projects` | All projects |

## Run locally

```bash
bun install
bun run dev
```

Then open http://localhost:4321.

## Make it yours

1. **Your identity and projects** — edit `src/site.config.ts` (name, role, bio, email, social links, and the projects list).
2. **Your writing** — replace the markdown files in `src/content/blog/`. The filename becomes the URL (`my-post.md` → `/blog/my-post`). Each file needs `title`, `description`, and `publishedAt` in its frontmatter; add `draft: true` to keep a post hidden — the template includes one draft as an example.
3. **Your look** — colors and typography are CSS custom properties in `src/layouts/Base.astro`; page styles are scoped in each `.astro` file.

## Deploy

```bash
bun run build
```

The site is output to `dist/` as plain static files — deploy them to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or a plain web server).

## Project layout

| Path | Purpose |
|---|---|
| `src/site.config.ts` | Your name, bio, links, and projects — the one file to edit first |
| `src/content/blog/` | Blog posts as markdown files |
| `src/content.config.ts` | Frontmatter schema for posts |
| `src/layouts/Base.astro` | Shared layout, nav, footer, and design tokens |
| `src/pages/` | The pages themselves |
