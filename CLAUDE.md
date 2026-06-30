# Michicho – Project Guide

Live site: **michicho.com** (GitHub Pages, served from `docs/`)

---

## What this is

A game portal (think Poki / CrazyGames) built with React. The homepage lists games; each game opens in a fullscreen iframe. Three family party games (Código Secreto, Trivia, Mímica) are hosted directly in this repo. Future games will be separate projects linked by URL.

---

## Repo structure

```
CodenamesRandomizer/
  portal/        ← React portal app (the website shell)
  js/            ← Family games (Código Secreto, Trivia, Mímica)
  docs/          ← Built output → GitHub Pages serves this
    index.html     portal
    404.html       SPA routing redirect
    play/          built game entry points
      codigo-secreto.html
      trivia.html
      mimica.html
  package.json   ← root scripts to build both
```

---

## Tech stack

### Portal (`portal/`)
| Thing | What |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| Routing | React Router v6 (browser history, real URLs) |
| Styling | Tailwind CSS v3 + Google Fonts (Nunito) |
| Backend | Supabase (free tier) — auth, games DB, scores |
| Language | JavaScript (JSX), no TypeScript |

### Games (`js/`)
| Thing | What |
|---|---|
| Bundler | Vite 5 (multi-page build) |
| Multiplayer | PeerJS (WebRTC, peer-to-peer, no server) |
| Legacy | `@vitejs/plugin-legacy` targets Chrome ≥47 (Samsung TV support) |
| Language | Vanilla JS (no framework) |

---

## Build commands

```bash
# Install everything (run once after cloning)
cd portal && npm install --legacy-peer-deps
cd js     && npm install --legacy-peer-deps

# Build both for production → outputs to docs/
npm run build              # from repo root (runs both)
npm run build:portal       # portal only
npm run build:games        # games only

# Dev server (portal only, with hot reload)
npm run dev                # from repo root → http://localhost:5174
```

> Always rebuild before pushing. GitHub Pages serves `docs/` directly.

---

## Deployment

Push `docs/` to `main` on GitHub. GitHub Pages detects it automatically and publishes within ~60 seconds. CNAME file at `portal/public/CNAME` (copied to `docs/CNAME` on build) points GitHub Pages to michicho.com.

**SPA routing**: GitHub Pages doesn't support client-side routing natively. `docs/404.html` encodes the path into a query param and redirects to `index.html`, which decodes it and feeds it to React Router. This makes real URLs like `/games/trivia` work.

---

## Supabase

**Project ID**: `glaucokoxmfybkhqtlnl`  
**Dashboard**: supabase.com → project → SQL Editor

Credentials live in `portal/.env` (gitignored). Copy from `portal/.env.example`:
```
VITE_SUPABASE_URL=https://glaucokoxmfybkhqtlnl.supabase.co
VITE_SUPABASE_ANON_KEY=<anon/publishable key>
```

The anon/publishable key is **intentionally public** — it's safe in client-side code. Row Level Security (RLS) policies in the DB enforce access control. Never put the `service_role` key here.

If `VITE_SUPABASE_URL` is not set, the app falls back to mock data in `portal/src/data/mockGames.js` silently.

### Schema (already applied)
Tables: `games`, `user_games`, `scores`. Schema source: `portal/supabase-schema.sql`. Run this in the Supabase SQL Editor when setting up a fresh project.

---

## Portal pages & routes

| Route | Page | Notes |
|---|---|---|
| `/` | `HomePage` | Hero, trending, new games, categories, familia strip |
| `/games` | `GamesPage` | Full catalog, search + category filter |
| `/games/:slug` | `GameDetailPage` | Info, tags, play button |
| `/play/:slug` | `GamePlayPage` | Fullscreen iframe, no nav/footer |
| `/familia` | `FamiliaPage` | Family games in Spanish, how-it-works |
| `/categories` | `CategoriesPage` | Category browser |
| `/categories/:slug` | `CategoriesPage` | Filtered by category |

---

## How games work

Each game is a standalone HTML page served at `michicho.com/play/<game>.html`. The portal embeds it in an iframe on `/play/:slug`. No communication between portal and iframe is needed.

**Family games** (TV + phone multiplayer):
- Screen size determines mode: landscape ≥768px → TV mode, else → phone mode
- Override with `?mode=tv` or `?mode=phone` in URL
- PeerJS handles WebRTC signaling; players connect via 4-digit room code
- No server needed — data flows peer-to-peer

---

## Adding a new game

**If the game lives in this repo:**
1. Create `js/<game-name>.html` and `js/src/entry-<game-name>.js`
2. Add the entry to `rollupOptions.input` in `js/vite.config.js`
3. Add game metadata to `portal/src/data/mockGames.js`
4. Insert a row in Supabase `games` table (or re-run seed)
5. Rebuild both (`npm run build`)

**If the game is a separate project/repo:**
1. Deploy it somewhere (its own GitHub Pages, Vercel, etc.)
2. Its `play_url` in the `games` table is just its full URL
3. No changes to this repo needed

---

## Key files

| File | Purpose |
|---|---|
| `portal/src/data/mockGames.js` | Game registry (fallback when Supabase is not configured) |
| `portal/src/lib/supabase.js` | Supabase client init |
| `portal/src/lib/useGames.js` | Data hooks (tries Supabase, falls back to mock) |
| `portal/src/components/MascotSVG.jsx` | SVG cat mascot (placeholder, no art yet) |
| `portal/supabase-schema.sql` | DB schema + seed data |
| `js/vite.config.js` | Multi-page game build config |
| `docs/404.html` | GitHub Pages SPA routing fix |

---

## SEO — non-negotiable rules

Every piece of code written for this site must be SEO-friendly. These are hard requirements, not suggestions.

### Rendering & indexing
- The portal is a client-side SPA (GitHub Pages). Google can render JS but it's slow and unreliable — **every game detail page (`/games/:slug`) must have its title, description, and text content in the initial HTML**, not injected by JS after load. Use `react-helmet-async` (or equivalent) to set `<title>` and `<meta>` server-side or statically per route.
- Each game must live at its own real crawlable URL (`/games/slug-name`). Never put game identity behind a query param (`?id=4827`) or a JS-only state change.
- URLs: **short, lowercase, hyphenated slugs only** — `/games/codigo-secreto` not `/games/id=3` or `/games/CodigoSecreto`.

### Page metadata (every page, no exceptions)
- Unique `<title>` per page — human-readable, not keyword-stuffed. Format: `Game Name – Play Free | Michicho`.
- Unique `<meta name="description">` per page — 1–2 sentences, written for a human clicking a search result.
- One `<h1>` per page — the game name or page title.
- Canonical `<link rel="canonical">` on every page to prevent duplicate-content issues from URL variants.
- Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing.

### Structured data
- Add `schema.org` JSON-LD on game detail pages using the `VideoGame` or `Game` type. Include `name`, `description`, `genre`, `url`, `image`. This enables rich results in Google.
- Homepage and category pages can use `ItemList` schema.

### Images & performance (Core Web Vitals)
- All thumbnail images: use **WebP or AVIF** format, include explicit `width` and `height` attributes to prevent CLS, and use `loading="lazy"` on any image below the fold.
- Above-the-fold images (hero, first visible thumbnails): do **not** lazy-load — they're the LCP candidate.
- Game iframe/embed: **lazy-load it** (don't instantiate the game engine until the user clicks Play or the iframe scrolls into view). The surrounding page content (title, description, tags) must be in the initial HTML.
- Keep Core Web Vitals green: LCP < 2.5s, CLS < 0.1, INP < 200ms. Don't defer visible text — use `font-display: swap` for Google Fonts.

### Content per game page
- Every game detail page must have a **real text description** — what the game is, how to play it, and controls. At least 2–3 sentences, written uniquely (not copy-pasted from a distributor blurb — duplicate content across licensed-game sites is a known ranking penalty in this niche).
- Tags/genre on each game feed category and related-game links, which distribute authority.

### Site architecture & internal linking
- Every page must be reachable via clean internal links: related games section, genre/tag pages, trending strip. This distributes PageRank to deeper pages and helps Googlebot discover them.
- XML sitemap at `/sitemap.xml` — must update automatically when games are added (generate it at build time from the games list).
- `robots.txt` at `/robots.txt` — allow all, point to sitemap.
- Google Search Console: verify the site and submit the sitemap. Don't leave this as an afterthought.

### Mobile
- **Mobile-first always.** The majority of casual gaming traffic is mobile. Google indexes mobile-first. Every layout must work and look good at 375px before being designed for desktop.

### When adding a new game
Add these to the checklist in "Adding a new game" above:
- Write a unique description (stored in the `games` table / `mockGames.js`)
- Choose a short hyphenated slug
- Confirm the game's `<title>` and `<meta description>` are populated from game data
- Add JSON-LD structured data for the game
- Add the game URL to the sitemap

---

## Known issues / open items

- **Samsung TV blank screen**: open bug, error beacon added in `js/index.html` (pre-portal, may be resolved now that games are separate entry points)
- **Cat mascot**: SVG placeholder only, no real art yet
- **Auth UI**: login/signup modal wired to Supabase but not tested end-to-end
- **Leaderboard / achievements**: schema exists, UI is stubbed
- **`js/` folder**: still named `js/` for historical reasons; conceptually it's `games/`
