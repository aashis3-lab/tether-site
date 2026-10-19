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
| Page and all sections | `src/app/page.tsx` |
| iPhone frame (CSS only) | `src/components/Phone.tsx`, `.phone*` rules in `src/app/globals.css` |
| Scroll fades and parallax | `src/components/motion.tsx` (respects reduced motion) |
| Keychain illustration | `src/components/Keychain.tsx` |
| Email capture form | `src/components/EmailCapture.tsx` |
| **Email endpoint, contact email, site URL** | `src/config.ts` |
| Which screenshot goes where | `src/screens.ts` |
| App screenshots (390×844 @3x) | `public/screens/` |

## Email capture

The form POSTs `{ "email": "...", "source": "hero" | "footer-cta" }` as JSON to `EARLY_ACCESS_ENDPOINT`.
It is a placeholder (`https://example.com/api/early-access`) until you point it at a real list
(Formspree, Loops, a Supabase Edge Function...). Either edit `src/config.ts` or set
`NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` in Vercel. Any 2xx response shows the "You're on the list" state.

## Screenshots

`public/screens/` holds real screenshots of the deployed app, taken with Playwright in Chrome at
390×844 with a 3× device scale, signed in to a real account with a real party running. Phone numbers
were swapped for 555 numbers before capture. To refresh one, capture at the same size and drop it in
with the same file name.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework preset: Next.js. No build settings to change.
3. Optional env vars: `NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` (real signup endpoint) and
   `NEXT_PUBLIC_SITE_URL` (your custom domain, used for social previews; defaults to the Vercel URL).
4. Deploy. Add a custom domain under **Settings → Domains** if you have one.
