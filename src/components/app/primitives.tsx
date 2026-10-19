import type { Person } from "./people";

/** Initials avatar. `size` is in app points (Tailwind spacing units ×4). */
export function Avatar({ p, size = 10, ring, className = "" }: { p: Person; size?: number; ring?: boolean; className?: string }) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full font-semibold text-white ${ring ? "ring-[calc(var(--u)*2.5)] ring-app-card" : ""} ${className}`}
      style={{
        width: `calc(var(--u) * ${size * 4})`,
        height: `calc(var(--u) * ${size * 4})`,
        fontSize: `calc(var(--u) * ${size * 1.6})`,
        background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
      }}
    >
      {p.initial}
    </span>
  );
}

export function Battery({ pct }: { pct: number }) {
  const low = pct <= 15;
  return (
    <span className={`inline-flex items-center gap-1 ${low ? "font-medium text-app-danger" : ""}`}>
      <svg viewBox="0 0 26 12" className="h-[calc(var(--u)*10)] w-auto" aria-hidden="true">
        <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
        <rect x="2.5" y="2.5" width={Math.max(1.5, (18 * pct) / 100)} height="7" rx="1.5" fill="currentColor" />
        <path d="M24 4.5v3a1.5 1.5 0 0 0 0-3Z" fill="currentColor" fillOpacity="0.55" />
      </svg>
      {pct}%
    </span>
  );
}

type IconName =
  | "pin"
  | "people"
  | "plus"
  | "shield"
  | "send"
  | "status"
  | "alert"
  | "phone"
  | "nav"
  | "check"
  | "home"
  | "chevron"
  | "back"
  | "locate"
  | "trash"
  | "car"
  | "lock";

const paths: Record<IconName, React.ReactNode> = {
  pin: <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.5A6.5 6.5 0 0 1 21.5 20" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  shield: <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />,
  send: <path d="m21 3-9.5 18-2-8-7.5-2.5L21 3ZM9.5 13 21 3" />,
  status: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 11-4.7M15 18l2.2 2.2L22 15.5" />
    </>
  ),
  alert: <path d="M12 3 2 20h20L12 3Zm0 6v5m0 3v.01" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  nav: <path d="M12 2 4.5 20.5 12 17l7.5 3.5L12 2Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  home: <path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4v-9.5Z" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  back: <path d="M19 12H5m6-7-7 7 7 7" />,
  locate: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
    </>
  ),
  trash: <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  car: <path d="M5 16v3h3v-3m8 0v3h3v-3M3 16h18v-4l-2-6H5l-2 6v4Zm2-4h14" />,
  lock: <path d="M6 11h12v10H6V11Zm2.5 0V8a3.5 3.5 0 0 1 7 0v3" />,
};

export function Icon({ name, size = 5, stroke = 1.9, className = "" }: { name: IconName; size?: number; stroke?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      style={{ width: `calc(var(--u) * ${size * 4})`, height: `calc(var(--u) * ${size * 4})` }}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/** The app's small pin-and-tether logo, used in its floating party card. */
export function AppLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 260" className={className} aria-hidden="true">
      <path d="M110 238C76 202 30 160 30 108a80 80 0 0 1 160 0c0 52-46 94-80 130Z" fill="none" stroke="#ff5f84" strokeWidth="16" />
      <path d="M110 192C88 170 66 146 66 112a44 44 0 0 1 88 0c0 34-22 58-44 80Z" fill="none" stroke="#ff7a62" strokeWidth="15" />
      <circle cx="50" cy="52" r="22" fill="#ff5a88" />
      <circle cx="182" cy="156" r="22" fill="#ff8a3d" />
      <circle cx="110" cy="238" r="22" fill="#ff6878" />
    </svg>
  );
}

/** Wraps app-point content that lives outside a phone (cropped close-up cards). */
export function AppScope({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`[container-type:inline-size] ${className}`}>
      <div className="app-ui !static !overflow-visible !bg-transparent">{children}</div>
    </div>
  );
}
