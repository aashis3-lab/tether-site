import Link from "next/link";
import { CONTACT_EMAIL } from "@/config";
import { LogoMark, Wordmark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-5 sm:px-8">
        <Link href="/" aria-label="Tether home" className="text-[22px]">
          <Wordmark id="nav" />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/about" className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:text-ink">
            About
          </Link>
          <ThemeToggle />
          <Link
            href="/#join"
            className="ml-1 rounded-full bg-ink px-4 py-2.5 text-sm font-medium whitespace-nowrap text-paper transition hover:opacity-85"
          >
            <span className="sm:hidden">Early access</span>
            <span className="hidden sm:inline">Get early access</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-ink-soft sm:flex-row sm:px-8">
        <div className="flex items-center gap-2.5">
          <LogoMark id="footer" className="h-6 w-auto" />
          <span className="font-medium text-ink">Stay tether.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/about" className="transition hover:text-ink">
            About
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-ink">
            Contact
          </a>
          <Link href="/privacy" className="transition hover:text-ink">
            Privacy
          </Link>
          <span>© 2026 Tether</span>
        </div>
      </div>
    </footer>
  );
}

/** Small centered mark used between sections. */
export function MarkDivider({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-line" />
      <LogoMark id={id} className="h-6 w-auto opacity-90" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-line" />
    </div>
  );
}
