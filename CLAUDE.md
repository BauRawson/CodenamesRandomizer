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

## Known issues / open items

- **Samsung TV blank screen**: open bug, error beacon added in `js/index.html` (pre-portal, may be resolved now that games are separate entry points)
- **Cat mascot**: SVG placeholder only, no real art yet
- **Auth UI**: login/signup modal wired to Supabase but not tested end-to-end
- **Leaderboard / achievements**: schema exists, UI is stubbed
- **`js/` folder**: still named `js/` for historical reasons; conceptually it's `games/`
