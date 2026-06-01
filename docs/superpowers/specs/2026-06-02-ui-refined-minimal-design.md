# UI Refinement — Refined Minimal

**Date:** 2026-06-02
**Status:** Approved (design)

## Goal

Polish the portfolio/blog UI so every page (home, blog index, blog post, projects) reads as one consistent theme, without changing layout, content, or the existing monochrome (neutral black/white/gray) aesthetic. Direction chosen: **Refined Minimal** — keep it clean, make it premium. No accent color introduced.

## Constraints

- No layout/structure changes; no content or MDX changes; no data-layer changes.
- No accent color. Stay monochrome on the existing neutral palette.
- Touch className/CSS only — no behavioral logic changes.
- Do not merge the two `Badge` components (custom `components/Badge.tsx` section label vs `components/ui/badge.tsx`); only align their visual style.
- Polish level calibrated and approved at "level A" (subtle lift shadow + refined type + hover affordance), not bolder.

## Problems being fixed

Discovered during review — these are the inconsistencies that make the site feel uneven:

1. **Mixed corner radii** — cards use `rounded-md`, `rounded-lg`, and `rounded-xl` in different places (Experience/UI sections `rounded-md`, project cards `rounded-xl`, blog cards `rounded-lg`).
2. **Mixed gray usage** — `text-gray` (custom `#898989`), `text-muted-foreground`, hardcoded `text-gray-700 dark:text-gray-400`, `bg-gray-100 dark:bg-gray-800`, `bg-slate-100/30` are used interchangeably, so light/dark don't stay in sync.
3. **Inconsistent shadows** — mix of `shadow`, `shadow-xs`, `shadow-none`.
4. **Inconsistent hover states** — home project cards have hover; the `/projects` page grid cards have none.
5. **Inconsistent micro-interactions** — varied transition durations/easings.

## Design

### 1. Foundation — `app/globals.css`
- Define a clear radius scale and use it everywhere: cards = `rounded-xl`, buttons/tags = `rounded-lg`. Adjust `--radius` so the scale is coherent. Retire ad-hoc `rounded-md` on cards.
- Define two standard shadow levels reused site-wide: a resting/subtle shadow and a hover/lift shadow. These should read well in both light and dark mode.
- Standardize one transition duration + easing for interactive elements.

### 2. Unify grays onto semantic tokens
Replace literal/custom grays with the existing semantic tokens so dark mode tracks automatically:
- `text-gray` → `text-muted-foreground`
- `text-gray-700 dark:text-gray-400` (blog post category chip) → `text-muted-foreground`
- `bg-gray-100 dark:bg-gray-800` → `bg-muted`
- borders → `border-border`

Affected: `app/blog/[slug]/page.tsx` (category chip), `components/layout/Footer.tsx`, blog/project cards. Keep semantics where `text-gray` is intentionally decorative (e.g. map time-zone overlay) only if changing it regresses the look.

### 3. Polish recurring components (level A)
- **Blog card** (`components/pages/blog/Post.tsx`): date as small uppercase muted label; title `font-bold tracking-tight`; description improved `line-height`; resting shadow → lift + slight `-translate-y` on hover; a hover-revealed arrow affordance indicating it's clickable. Unify radius to `rounded-xl`.
- **Project cards** — home (`components/pages/home/Projects.section.tsx`) and `/projects` (`app/projects/Projects.tsx`): same card surface, radius, shadow, and hover treatment. **Add the missing hover to the `/projects` grid cards.**
- **Skill cards** (`components/Cards.tsx`): keep grayscale→color reveal; smooth the hover transition to the standardized timing.
- **Section label badge** (`components/Badge.tsx`): refine to crisper, consistent styling aligned with the unified tokens.

### 4. Page header pattern
Ensure Blog, Projects, and Blog-post pages share the same heading pattern: title `text-xl font-extrabold` with standardized spacing below it.

### 5. Micro-interactions
Apply the standardized transition timing and consistent focus states (inputs/buttons) across the touched components.

## Files in scope

`app/globals.css`, `components/Cards.tsx`, `components/Badge.tsx`, `components/pages/blog/Post.tsx`, `app/projects/Projects.tsx`, `components/pages/home/Projects.section.tsx`, `app/blog/[slug]/page.tsx`, `components/layout/Footer.tsx`. (Other home sections touched only if needed for radius/shadow consistency.)

## Out of scope

- Accent color, layout/structure changes, MDX/content changes.
- Merging the two Badge components.
- Footer's hardcoded date and live-dot behavior (visual token cleanup only, no logic change).

## Success criteria

- One radius scale, one shadow system, one transition timing across all touched components.
- No hardcoded gray utilities left in touched files; semantic tokens drive light/dark.
- `/projects` cards have the same hover behavior as home project cards.
- `bun run build` and `bun run lint` pass.
- Visual check across home, blog index, a blog post, and projects in both light and dark mode shows a consistent theme.
