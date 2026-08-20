# personal-site

A simple personal site template built with [Astro](https://astro.build) that deploys to Prisma Compute with Prisma Composer. No database, no CMS — your identity lives in one config file and your posts are markdown files.

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

## Deploy to Prisma Compute

Connect this repository to Prisma Cloud. Every push to the connected branch
then runs the included GitHub Actions workflow, which builds the site and
deploys it to Prisma Compute with Composer.

```bash
bun run compute:login
bun run compute:connect
```

After connecting, open the running service with:

```bash
bun run compute:open
```

The site builds with the [`@astrojs/node`](https://docs.astro.build/en/guides/integrations-guide/node/) adapter in standalone mode, so `bun run build` produces a Node server at `dist/server/entry.mjs`. To host it yourself instead, run that entrypoint with Node (or switch `astro.config.mjs` to `output: "static"` and serve `dist/` from any static host).

## Project layout

| Path | Purpose |
|---|---|
| `src/site.config.ts` | Your name, bio, links, and projects — the one file to edit first |
| `src/content/blog/` | Blog posts as markdown files |
| `src/content.config.ts` | Frontmatter schema for posts |
| `src/layouts/Base.astro` | Shared layout, nav, footer, and design tokens |
| `src/pages/` | The pages themselves |
