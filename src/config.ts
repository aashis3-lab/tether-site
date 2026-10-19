// Site-wide settings. Swap EARLY_ACCESS_ENDPOINT for your real list provider
// (Formspree, Loops, ConvertKit, a Supabase function...). It receives POST { email, source }.
export const EARLY_ACCESS_ENDPOINT =
  process.env.NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT ?? "https://example.com/api/early-access";

export const CONTACT_EMAIL = "hello@tether.app";

// Absolute base for Open Graph images. Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
