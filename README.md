# Tether marketing site

The scrolling landing page for [Tether](https://tether-gray.vercel.app): Next.js (App Router) + Tailwind v4,
static, deploys to Vercel as-is. The app itself lives in a separate repo.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Home page sections | `src/app/page.tsx` |
| About page / cofounders | `src/app/about/page.tsx`, **`src/data/team.ts`** (names, roles, bios, photos, LinkedIn) |
| Privacy placeholder | `src/app/privacy/page.tsx` |
| Nav, footer, section dividers | `src/components/SiteChrome.tsx` |
| Logo (SVG redraw of the app icon) | `src/components/Logo.tsx`, favicon `src/app/icon.svg` |
| Light/dark theme | tokens in `src/app/globals.css`, pre-paint script `src/lib/theme.ts`, toggle `src/components/ThemeToggle.tsx` |
| iPhone frame (CSS only) | `src/components/Phone.tsx`, `.phone*` rules in `globals.css` |
| App mockups (HTML/CSS) | `src/components/app/` (screens, map, the fictional group in `people.ts`) |
| Scroll fades and parallax | `src/components/motion.tsx` (respects reduced motion) |
| **Email endpoint, contact email, site URL** | `src/config.ts` |

## Cofounders

Edit `src/data/team.ts`. Only `name` is required; `role`, `bio`, `photo` and `linkedin` stay hidden
until you fill them in. Photos go in `public/team/` (square, e.g. `/team/maera.jpg`); initials show
until then.

## Theme

Light/dark follows the visitor's system setting until they use the sun/moon toggle. The choice is
saved in `localStorage` (`tether-site.theme`). An inline script sets `<html data-theme>` before first
paint, so there's no flash. Every mockup uses the app's own Material 3 light/dark palette.

## App mockups

Most phone screens are HTML/CSS rebuilds of real Tether screens with a fictional group (Maya, Jake,
Priya, Sam, Ava), authored in app points: inside `.app-ui`, Tailwind's `--spacing` and text sizes are
scaled to the phone's width, so `p-4` or `text-sm` mean the same as in the app at any mockup size.
The two setup screens are real screenshots (light and dark) in `public/screens/`.

## Email capture

The form POSTs `{ "email": "...", "source": "hero" | "footer-cta" }` as JSON to `EARLY_ACCESS_ENDPOINT`.
It is a placeholder (`https://example.com/api/early-access`) until you point it at a real list
(Formspree, Loops, a Supabase Edge Function...). Either edit `src/config.ts` or set
`NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` in Vercel. Any 2xx response shows the "You're on the list" state.

## Screenshots

`public/screens/` holds real screenshots of the deployed app (Playwright, Chrome, 390×844 @3x), light
and dark. Phone numbers were swapped for 555 numbers before capture. Invite codes and QR codes are
deliberately not shown, since they would let anyone join a live party.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework preset: Next.js. No build settings to change.
3. Optional env vars: `NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` (real signup endpoint) and
   `NEXT_PUBLIC_SITE_URL` (your custom domain, used for social previews; defaults to the Vercel URL).
4. Deploy. Add a custom domain under **Settings → Domains** if you have one.
