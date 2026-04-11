# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev       # Start development server (localhost:3000)
bun build     # Production build
bun start     # Start production server
bun lint      # ESLint check
```

No test suite is configured.

## Architecture

**tebuk** is a Next.js 14 App Router application for Quranic verse memorization. It fetches random verses from the Quran.com public API and presents them with hide/reveal controls for practice.

### Data Flow

Verses are fetched via TanStack Query (`@tanstack/react-query`). The store lives in `app/store/index.ts` and exposes:
- `getRandomVerse(filter?)` — fetches a random verse, optionally filtered by chapter/page/juz
- `getSpecificVerse(key)` — fetches a verse by key (e.g. `"2:255"`)
- `getSurah()` — fetches all 114 chapter metadata from Quran.com

The home page (`app/page.tsx`) prefetches surah data server-side using `dehydrate`/`HydrationBoundary` from TanStack Query, then hands off to the client.

### Component Hierarchy

```
app/layout.tsx          — fonts, metadata, QueryClientProvider
  app/page.tsx          — server prefetch, HydrationBoundary
    app/components/Container.tsx   — main orchestrator (state for mode, filters, reveal)
      app/components/Settings.tsx  — tab UI for mode selection
        SurahSettings / PageSettings / JuzSettings
      app/components/Verse.tsx     — verse display with word-fade animation
      BottomBar                    — reveal toggles, shuffle button, next-verse peek
```

### Practice Modes

Three modes selectable via tabs in `Settings.tsx`:
1. **Surah** — pick a specific chapter (combobox from 114 surahs)
2. **Page** — enter a page range (1–604)
3. **Juz** — pick one of 30 juz sections

Mode state and filter values live in `Container.tsx` and are passed down as props.

### Key Files

| Path | Purpose |
|------|---------|
| `app/components/Container.tsx` | Top-level client orchestrator; owns all app state |
| `app/store/index.ts` | TanStack Query fetch functions (Quran.com API calls) |
| `app/font.js` | Loads 5 custom Arabic/Uthmanic fonts as Next.js local fonts |
| `lib/chapters.ts` | Static metadata for all 114 Quranic chapters |
| `data/page-to-chapter-mappings.json` | Maps Quran page numbers to chapter info |
| `data/QPC-V1.json` | Large (~5.4 MB) static data file for glyph rendering |
| `app/api/og/route.tsx` | OpenGraph image generation endpoint |
| `components/ui/` | Radix-based UI primitives (shadcn pattern) |
| `components/magicui/` | Framer Motion animation components |

### Styling

Tailwind CSS with custom font families: `arabic`, `arabicV1`, `ayah`, `first`, `surah`, `raleway`, `caveat`. Dark mode is class-based. Color tokens use HSL CSS variables defined in `app/globals.css`.

### Path Alias

`@/*` resolves to the repository root (not `src/`).
