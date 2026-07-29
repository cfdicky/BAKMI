# Bakmi Jakarta CC — Landing Page

React 19 + Vite + Tailwind CSS v4 landing page for Bakmi Jakarta CC, a Jakarta-style bakmi restaurant
in Kerobokan, Bali.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  data/                 <- all editable content lives here as JSON
    restaurant.json      (name, address, hours, phone, social links, About story/timeline)
    menus.json            featured menu items + categories
    gallery.json          gallery tiles
    testimonials.json     fallback Google reviews (used until you add a live API key)
    faq.json              FAQ questions & answers
  components/           <- one component per section, plus small reusable pieces
    icons/                 hand-drawn SVG illustrations (bowl, food icon)
  App.jsx                page composition + Lenis smooth scroll
  index.css              Tailwind v4 import + design tokens (@theme) + keyframes
```

Editing the site almost never requires touching a component — update the JSON files in `src/data/`
instead (menu prices, opening hours, FAQ answers, etc.).

## Design tokens

Colors and fonts are defined once in `src/index.css` under `@theme`, and Tailwind auto-generates
utility classes from them (this is the Tailwind v4 way — no `tailwind.config.js` needed):

| Token              | Value      | Utilities generated              |
|---------------------|------------|-----------------------------------|
| `--color-bg`         | `#FFF9F3`  | `bg-bg`, `text-bg`                |
| `--color-primary`    | `#E53935`  | `bg-primary`, `text-primary`      |
| `--color-accent`     | `#FFD101`  | `bg-accent`, `text-accent`        |
| `--color-dark`       | `#181818`  | `bg-dark`, `text-dark`            |
| `--font-serif`       | Playfair Display | `font-serif`                |
| `--font-sans`        | Inter      | `font-sans`                       |

## Live Google Reviews (optional)

The Testimonials section ships with 5 real reviews (rewritten in our own words) baked into
`src/data/testimonials.json`, so the section always looks complete out of the box.

To make it pull **live** reviews straight from Google Maps instead:

1. Copy `.env.example` to `.env`.
2. Create a Google Cloud project, enable **Maps JavaScript API** (billing required), create an API
   key, and restrict it to your real domain (HTTP referrer restriction).
3. Put the key in `.env` as `VITE_GOOGLE_MAPS_API_KEY=your-key-here`.
4. Restart `npm run dev` / rebuild.

This only works once the site is actually hosted on the domain your key is restricted to — it will
not fetch live data from `localhost` previews or from a sandboxed preview link. Without a key, the
static fallback reviews are shown and nothing breaks.

The Google Place ID used is `ChIJB4tGcaU50i0REntSMwWnmQg` (Bakmi CC Jakarta — Kerobokan), set in
`src/data/restaurant.json` as `googlePlaceId`.

## Honest notes / things to double-check before launch

- **The "About" story and timeline (1985 / 2011 / 2016) in `restaurant.json` is placeholder
  storytelling**, not verified history — swap it for the real founding story whenever you have it.
- **Address, phone, opening hours, Instagram handle, and the Google rating/review count** were
  pulled from the public Google Maps listing for "Bakmi CC Jakarta - Kerobokan" — double check
  they're still accurate before publishing.
- **Reservation and newsletter forms** currently just show a success message in the browser — they
  don't send anything anywhere yet. Wire them up to a real backend, a form service (e.g. Formspree,
  Web3Forms), or a WhatsApp deep link before relying on them.
- **Vegetarian/non-meat options and large-group policy** in `faq.json` are written conservatively
  since we don't have confirmed specifics — tighten the wording once you know the real answer.
- Icon names come from `lucide-react` — if `npm install` ever complains about a missing icon export,
  check the exact name at https://lucide.dev/icons and adjust the import.

## Dependencies

- `react`, `react-dom` — React 19
- `framer-motion` — scroll reveals & entrance animations
- `lenis` — smooth scrolling
- `swiper` — testimonial carousel
- `lucide-react` — icons
- `tailwindcss` v4 + `@tailwindcss/vite` — styling
