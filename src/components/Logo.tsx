/**
 * The Tether mark: a location pin inside a looping tether with three friends on it.
 * Vector redraw of the app icon, so it stays crisp and works on light and dark.
 * `id` keeps gradient ids unique when the mark appears more than once on a page.
 */
export function LogoMark({ id, className = "", title }: { id: string; className?: string; title?: string }) {
  const g = `tm-${id}`;
  return (
    <svg viewBox="0 0 220 260" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#ff4f8b" />
          <stop offset="1" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>
      <path d="M110 238C76 202 30 160 30 108a80 80 0 0 1 160 0c0 52-46 94-80 130Z" fill="none" stroke={`url(#${g})`} strokeWidth="13" strokeLinejoin="round" />
      <path d="M110 192C88 170 66 146 66 112a44 44 0 0 1 88 0c0 34-22 58-44 80Z" fill="none" stroke={`url(#${g})`} strokeWidth="12" strokeLinejoin="round" />
      <circle cx="50" cy="52" r="20" fill="#ff5a88" />
      <circle cx="182" cy="156" r="20" fill="#ff8a3d" />
      <circle cx="110" cy="238" r="20" fill="#ff6878" />
    </svg>
  );
}

/** Mark + lowercase wordmark. Text follows the theme's ink color. */
export function Wordmark({ id, className = "" }: { id: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-[-0.04em] text-ink ${className}`}>
      <LogoMark id={id} className="h-[1.25em] w-auto" />
      tether
    </span>
  );
}

/**
 * The app-icon tile. It inverts with the theme: a dark tile on the light site,
 * a light tile on the dark site.
 */
export function LogoTile({ id, className = "" }: { id: string; className?: string }) {
  return (
    <span className={`inline-grid place-items-center rounded-[28%] bg-[#1b1a1d] dark:bg-white ${className}`}>
      <LogoMark id={id} className="h-[64%] w-auto" />
    </span>
  );
}
