import Image from "next/image";

type PhoneProps = {
  src: string;
  alt: string;
  /** Width of the whole device, e.g. "w-[260px]". */
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Status bar background; matches the app's surface color by default. */
  statusBg?: string;
  children?: React.ReactNode;
};

/**
 * A CSS-built iPhone frame. Everything scales with the wrapper's width.
 * The screenshot (390×844) sits under a 47pt status bar so the Dynamic Island never covers app UI.
 */
export function Phone({ src, alt, className = "", priority, sizes = "320px", statusBg = "#fff8f9", children }: PhoneProps) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-body">
        <div className="phone-screen" style={{ background: statusBg }}>
          <StatusBar />
          <div className="phone-content">
            <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
            {children}
          </div>
          <div className="phone-island" />
          <div className="phone-glare" />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="phone-status" aria-hidden="true">
      <span>9:41</span>
      <span className="flex items-center gap-[1.3cqw]">
        {/* signal */}
        <svg viewBox="0 0 18 12" className="h-[2.8cqw]">
          <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        {/* wifi */}
        <svg viewBox="0 0 16 12" className="h-[2.8cqw]">
          <path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0Z M2.8 6.3a7.4 7.4 0 0 1 10.4 0l-1.5 1.5a5.3 5.3 0 0 0-7.4 0Z M0 3.5a11.3 11.3 0 0 1 16 0l-1.5 1.5a9.2 9.2 0 0 0-13 0Z" fill="currentColor" />
        </svg>
        {/* battery */}
        <svg viewBox="0 0 27 12" className="h-[2.9cqw]">
          <rect x="0.5" y="0.5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
          <path d="M25 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </span>
    </div>
  );
}
