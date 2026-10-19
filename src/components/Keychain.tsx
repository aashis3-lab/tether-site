/** Simple illustration of the Tether keychain button: a rounded fob on a split ring. */
export function Keychain({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 300" className={className} role="img" aria-label="Tether keychain button">
      <defs>
        <linearGradient id="kc-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7aa6" />
          <stop offset="1" stopColor="#ff4f8b" />
        </linearGradient>
        <radialGradient id="kc-btn" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f3e9ec" />
        </radialGradient>
        <linearGradient id="kc-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9d4d6" />
          <stop offset="0.5" stopColor="#9b9598" />
          <stop offset="1" stopColor="#ece8ea" />
        </linearGradient>
        <filter id="kc-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#ff4f8b" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* split ring */}
      <circle cx="100" cy="52" r="34" fill="none" stroke="url(#kc-ring)" strokeWidth="7" />
      <circle cx="100" cy="52" r="34" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="40 180" />
      {/* loop */}
      <rect x="88" y="78" width="24" height="34" rx="12" fill="none" stroke="#2a282d" strokeWidth="7" />
      {/* fob */}
      <g filter="url(#kc-shadow)">
        <rect x="38" y="100" width="124" height="170" rx="56" fill="url(#kc-body)" />
      </g>
      <rect x="38" y="100" width="124" height="170" rx="56" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
      {/* button */}
      <circle cx="100" cy="190" r="38" fill="url(#kc-btn)" />
      <circle cx="100" cy="190" r="38" fill="none" stroke="#ffd2e1" strokeWidth="3" />
      <text x="100" y="197" textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="700" fontSize="20" fill="#ff4f8b" letterSpacing="1">
        SOS
      </text>
      {/* status light */}
      <circle cx="100" cy="128" r="4" fill="#fff" fillOpacity="0.9" />
    </svg>
  );
}
