# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`knot-dev` is a personal portfolio + blog site built with Next.js 16 (App Router, React 19) and Tailwind CSS v4. Blog content is authored as MDX files. The project uses **Bun** as the package manager and runtime (see `bun.lock`).

## Commands

```bash
bun dev      # Start dev server with Turbopack (http://localhost:3000)
bun run build  # Production build
bun start    # Serve production build
bun run lint   # next lint (ESLint flat config)
```

There is no test suite in this project.

## Environment

- `NEXT_PUBLIC_BASE_URL` — site origin used to build canonical URLs and absolute OpenGraph image URLs across `generateMetadata` functions and `app/sitemap.ts` / `app/robots.ts`. Without it, those URLs render `undefined`. See `.env.example`.

## Architecture

### Routing (App Router)
- `app/page.tsx` — home page; composes section components from `components/pages/home/`.
- `app/blog/page.tsx` — blog index; filters `getAllPosts()` to `published` posts, renders `PostsWithSearch`.
- `app/blog/[slug]/page.tsx` — individual post; statically generated via `generateStaticParams` (reads filenames from `content/blogs/`). Dynamically `import()`s the MDX module for both rendered content and its exported `metadata`.
- `app/projects/page.tsx` — projects listing from `data/project.ts`.
- `app/layout.tsx` — root layout wrapping everything in `next-view-transitions` `ViewTransitions`, `Providers` (theme), `Navbar`, `Footer`. Uses Noto Sans Thai font.
- `app/sitemap.ts`, `app/robots.ts` — SEO endpoints.

### Blog / MDX system (the core non-obvious part)
Each post is a `.mdx` file in `content/blogs/` that **exports a `metadata` object** at the top (title, publishDate, description, published, category, image, tags). There is no separate frontmatter parser — metadata is a real ES export consumed via `import()`/`require()`.

- `lib/posts.ts`:
  - `getAllPosts(limit?)` — reads `content/blogs/`, `require()`s each file's `metadata`, sorts by `publishDate` descending.
  - `getHeadings(slug)` — reads the raw `.mdx` text and regex-extracts `##`/`###` lines to build the table of contents. **Heading IDs must match** the IDs generated in `mdx-components.tsx`; both call `slugify()` from `lib/utils.ts`. If you change heading-ID logic, change it in both places or the TOC anchor links break.
- `mdx-components.tsx` — the global MDX component overrides (`useMDXComponents`). Defines styling for `code`/`pre`/`a`/`table`, injects `id` attributes on `h2`/`h3` for TOC anchors, and exposes custom components usable inside MDX (`Counter`, `FileName`).
- `next.config.ts` — wires up `@next/mdx` with `remark-gfm` and `rehype-pretty-code` (theme `one-dark-pro`) for syntax highlighting. `pageExtensions` includes `md`/`mdx`.

To add a blog post: create `content/blogs/<slug>.mdx`, export a `metadata` object (set `published: true`), write content. The slug is the filename. Related-posts logic on the post page matches by `metadata.category`.

### Data layer
Static site data lives in `data/` as typed TS arrays — `project.ts` (`Projects[]`), `career.ts`, `skills.ts`. Types are in `types/`. Edit these files directly rather than any CMS.

### Components
- `components/ui/` — shadcn/ui components (style "new-york", base color neutral). Configured in `components.json`; also wired to the `@magicui` registry.
- `components/pages/<route>/` — page-specific section components.
- `components/layout/` — Navbar, Footer, ThemeToggle.
- `components/motion/`, `components/mdx/` — animation and MDX-embeddable components.
- Theming via `next-themes` (`app/providers.tsx`), default light, class-based dark mode.

### Conventions
- Path aliases: `@/*` → repo root, plus `@/components/*`, `@/content/*` (see `tsconfig.json`).
- `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for class composition.
- `slugify()` keeps Thai characters (`฀-๿`) — the site is bilingual (Thai/English), `locale: "th_TH"` in OG metadata.
- ESLint: `@typescript-eslint/no-explicit-any` is disabled project-wide (`eslint.config.mjs`).
