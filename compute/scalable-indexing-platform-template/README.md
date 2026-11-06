# DevShelf 📚

> High-performance, SEO-optimized search engine indexing 1M+ open-source learning resources, tutorials, and system architecture blueprints.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Base_UI-neutral?style=flat)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## ⚡ Overview

**DevShelf** is an engineering-first discovery portal built to index, organize, and surface verified open-source developer guides, system design blueprints, machine learning models, and tutorials. 

Designed with modern Web Vitals best practices, semantic markup, and an adaptive workbench interface, DevShelf avoids generic AI templates in favor of crisp, purposeful engineering ergonomics.

---

## ✨ Features

- **Sub-Second Full-Text Discovery:** Instant query filtering across titles, summaries, and technology tags.
- **Adaptive Workbench (Grid vs. List):**
  - **Grid View:** Visual cards with category badges, 2-line clamped technical summaries, and difficulty ratings.
  - **Compact List View:** High-density inspector table for rapid scanning with inline authors, stars, tags, and repo links.
- **Faceted Multi-Dimensional Filtering:**
  - **Categories:** `Web Dev`, `Machine Learning`, `DevOps`, `Cybersecurity`, `Cloud Computing`, `Mobile Dev`.
  - **Difficulty Levels:** `Beginner`, `Intermediate`, `Advanced`.
  - **Sorting:** By `Most Stars`, `Newest First`, `Difficulty`, or `Title (A-Z)`.
- **Keyboard Ergonomics:**
  - Press `/` anywhere on the page to focus the search bar.
  - Press `Esc` to clear query and blur.
- **Theme Preference System:**
  - Seamless Dark / Light / System device preference toggle powered by `next-themes`.
  - Zero flash of unstyled content (FOUC) and strict semantic color tokens.
- **Production SEO & Structured Data:**
  - Semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`).
  - Strict heading hierarchy (`H1` for Hero title, `H2` for sections, `H3` for resources).
  - OpenGraph (OG) image metadata, Twitter card configuration, and canonical links.
  - Structured JSON-LD script embedding `WebSite` (with `SearchAction`), `DataCatalog`, and `ItemPage` / `ItemList` schemas.
- **Resilient App Router States:**
  - `loading.tsx`: Instant Next.js Suspense skeleton placeholders using shadcn `Skeleton`.
  - `error.tsx`: Client-side error boundary with error digests, retry (`reset()`), and home navigation.
  - `not-found.tsx`: Custom 404 page with quick recovery category shortcuts.

---

## 🛠️ Tech Stack & Typography

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router with React Server Components) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/turbopack`) |
| **Component System** | shadcn/ui backed by `@base-ui/react` |
| **Icons** | `lucide-react` |
| **Theme** | `next-themes` (HTML class injection, system mode detection) |
| **Primary Typography** | **Plus Jakarta Sans** (clean, authoritative modern geometric display) |
| **Code Typography** | **JetBrains Mono** (developer telemetry, tags, stats, keyboard keys) |

---

## 📁 Repository Structure

```text
dev-shelf/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: fonts, SEO metadata, ThemeProvider, TooltipProvider
│   │   ├── page.tsx               # RSC entry point coordinating DevShelf dashboard & newsletter
│   │   ├── loading.tsx            # Next.js App Router instant loading skeleton state
│   │   ├── error.tsx              # Next.js App Router error boundary with retry action
│   │   ├── not-found.tsx          # Next.js 404 page with active index discovery links
│   │   └── globals.css            # Tailwind v4 theme variables, font mappings & color tokens
│   │
│   ├── components/
│   │   ├── ui/                    # Official shadcn/ui components ONLY
│   │   │   ├── avatar.tsx         # User avatar & fallback
│   │   │   ├── badge.tsx          # Badge variants (default, secondary, outline)
│   │   │   ├── button.tsx         # Base UI button with render prop & nativeButton handling
│   │   │   ├── card.tsx           # Full Card composition (Header, Title, Content, Footer)
│   │   │   ├── input.tsx          # Accessible text input
│   │   │   ├── select.tsx         # Accessible select primitive
│   │   │   ├── separator.tsx      # Semantic separator
│   │   │   ├── skeleton.tsx       # Loading skeleton placeholder
│   │   │   ├── tabs.tsx           # Accessible tab sets
│   │   │   ├── toggle.tsx         # Accessible toggle
│   │   │   └── tooltip.tsx        # Tooltip provider & content
│   │   │
│   │   ├── common/                # Reusable global layout & shell components
│   │   │   ├── navbar.tsx         # Sticky header with D/S glyph, nav links & Anas badge
│   │   │   ├── footer.tsx         # 3-column architectural footer with stack badges
│   │   │   ├── pagination.tsx     # shadcn Button-driven accessible pagination
│   │   │   ├── theme-provider.tsx # next-themes provider wrapper
│   │   │   ├── theme-toggle.tsx   # Hydration-safe light/dark/system switcher
│   │   │   └── structured-data.tsx# JSON-LD schema (WebSite, DataCatalog, ItemList)
│   │   │
│   │   └── features/              # Modular, domain-driven feature components
│   │       └── resources/         # Resource catalog domain
│   │           ├── devshelf-dashboard.tsx  # Dashboard coordinator (search, filters, state)
│   │           ├── search-section.tsx      # Command search bar with keyboard shortcut
│   │           ├── resource-grid.tsx       # Adaptive catalog with view switch & sorting
│   │           ├── resource-card.tsx       # Semantic <article> resource card
│   │           ├── resource-list-item.tsx  # Dense inspector table row for rapid scanning
│   │           └── newsletter-section.tsx  # Weekly index digest subscription
│   │
│   └── lib/                       # Core utilities, types, and datasets
│       ├── data.ts                # 20 verified open-source learning repositories
│       ├── types.ts               # Strict TypeScript definitions (Resource, Category, etc.)
│       └── utils.ts               # Tailwind merge & clsx utility (cn)
│
├── components.json                # shadcn configuration (srcDirectory: true)
├── next.config.ts                 # Turbopack Next.js configuration
├── tsconfig.json                  # Path aliases mapping ("@/*": ["./src/*"])
└── package.json                   # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm, pnpm, yarn, or bun

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dev-shelf.git
cd dev-shelf
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm run start
```

### 5. Run linting

```bash
npm run lint
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `/` | Focus search input from anywhere on the page |
| `Esc` | Clear search query and blur input |

---

## 📝 Database & Resource Schema

Each indexed resource conforms to the following schema (`src/lib/types.ts`):

```typescript
export type Category =
  | "All Categories"
  | "Web Dev"
  | "Machine Learning"
  | "DevOps"
  | "Cybersecurity"
  | "Cloud Computing"
  | "Mobile Dev";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: Exclude<Category, "All Categories">;
  difficulty: Difficulty;
  tags: string[];
  createdAt: string; // ISO 8601
  stars?: number;
  author?: string;
}
```

---

## 👤 Author

Built with craft by **Anas**.

- Website: [devshelf.io](https://devshelf.io)
- GitHub: [anas20023](https://github.com/anas20023)
- LinkedIn: [anasibelal004](https://www.linkedin.com/in/anasibelal004/)
- Facebook: [anasib2000004](https://www.facebook.com/anasib2000004)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
