# AGENTS.md — site-niccolopiccioli

## Commands

All commands run from `frontend/`:

```bash
cd frontend
npm run dev      # start dev server (port 5173)
npm run build    # production build
npm run preview  # preview production build locally
```

Firebase deploy runs from repo root:

```bash
firebase deploy
```

There are **no tests, linter, or formatter configured**. Do not run `npm test`, `npm run lint`, etc.

## Architecture

- **Single-page React 18 + TypeScript + Vite app.** No router — all "routes" are anchor-scrolled sections in a single page.
- **Build output is `frontend/build/`** (not the Vite default `dist/`). Customized in `vite.config.ts` because Firebase Hosting (`firebase.json`) expects `frontend/build/`.
- **Components in `src/components/`** — one file per section (Hero, TechTicker, About, Skills, Experience, Projects, Hobbies, Contact, Navbar, Footer, ScrollWords, ToTop). The `effects/` dir has ambient background/cursor/scroll-progress effects. Styling is a single `index.css` of vanilla CSS with custom properties.
- **Animations via framer-motion** (dependency). Shared `EASE`, section/directional variants and stagger helpers live in `src/motion/shared.ts`. `useFadeIn` only toggles the `fade-in-visible` class used for CSS decorations (h2 underline, kicker line) — movement is owned by framer-motion. Extra hooks: `useMagnetic` (magnetic buttons), `useScrollY` (`--sy` parallax var).
- **Smooth scroll via Lenis** (`lenis` dependency, `initSmoothScroll()` in `src/utils/scroll.ts`). All programmatic scrolls go through `scrollToSection` (Lenis when active, custom ease fallback otherwise). Never call `window.scrollTo` directly.
- **Vercel `frontend/vercel.json`** is also configured to deploy from `build/`. Both Firebase and Vercel target the same build output.

## Environment

EmailJS requires a `.env` file in `frontend/` with `VITE_`-prefixed vars:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

The app uses `import.meta.env.VITE_*` (Vite convention).

## Conventions

- **i18n**: Italian (`it`) and English (`en`) via React context (`LanguageContext`), no library. Translation strings live in the `TRANSLATIONS` object in `src/translations.ts`. Language choice persisted in `localStorage`, `<html lang>` kept in sync.
- **Projects data**: `src/data/projects.ts` is the single source of truth for the 13 live Vercel projects (title/desc per language, tags, demo/github URLs, category, featured flag). Never hardcode parallel link arrays — add fields to `ProjectRecord` instead.
- **Theming**: Dark-first (default `dark`), light/dark via CSS custom properties toggled by `data-theme` on `<html>`. Preference stored in `localStorage`.
- **No CSS framework** — all styles are hand-written vanilla CSS with custom properties.
- **Motion rules**: Apple-like ease `[0.22, 1, 0.36, 1]`, durations < 0.8s, transform/opacity only, `useReducedMotion` respected. Never put CSS `transition`/`transform` on elements framer-motion animates. `overflow-x: clip` on `html`+`body` is load-bearing (off-screen entrances must not create horizontal scroll).
- **Sticky scenes** (`StickyScene` in About/Experience/Hobbies): pinned 200–340vh storytelling. Ancestors of a sticky stage must have NO transform/filter/perspective (use the `fadeOnly` variant for those sections, and never restore `perspective` on `.container`).
- **Google Fonts**: Inter (body) + Space Grotesk (display) loaded from CDN in `frontend/index.html` (the real entry point, not `frontend/public/index.html` which appears to be an unused stale file).
