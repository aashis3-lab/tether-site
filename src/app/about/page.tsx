import type { Metadata } from "next";
import Image from "next/image";
import { LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/motion";
import { CONTACT_EMAIL } from "@/config";
import { team, type TeamMember } from "@/data/team";

export const metadata: Metadata = {
  title: "About",
  description: "Tether started at a hackathon with a simple question about safe nights out.",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function MemberCard({ m, i }: { m: TeamMember; i: number }) {
  return (
    <Reveal delay={i * 80} className="h-full">
      <article className="flex h-full flex-col rounded-[28px] border border-line bg-paper-2 p-5 sm:p-6">
        <div className="relative size-16 overflow-hidden rounded-full sm:size-20">
          {m.photo ? (
            <Image src={m.photo} alt={m.name} fill sizes="80px" className="object-cover" />
          ) : (
            <span className="grid size-full place-items-center bg-gradient-to-br from-pink to-orange text-2xl font-semibold text-white" aria-hidden="true">
              {initials(m.name)}
            </span>
          )}
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{m.name}</h2>
        {m.role && <p className="text-sm font-medium text-pink">{m.role}</p>}
        {m.bio && <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{m.bio}</p>}
        <span className="flex-1" />
        {m.linkedin && (
          <a
            href={m.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${m.name} on LinkedIn`}
            className="mt-5 grid size-10 place-items-center rounded-full border border-line text-ink-soft transition hover:border-pink hover:text-pink"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.84-1.75 3.3-1.75 3.5 0 4.34 2.1 4.34 5.3v5.95h-4v-5.3c0-1.3-.02-2.9-1.8-2.9s-2.1 1.4-2.1 2.8v5.4h-4v-11Z" />
            </svg>
          </a>
        )}
      </article>
    </Reveal>
  );
}

export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-14 pb-24 sm:px-8 sm:pt-20">
      <Reveal className="max-w-2xl">
        <LogoMark id="about" className="h-12 w-auto" />
        <h1 className="mt-8 text-[44px] leading-[1.02] font-semibold tracking-[-0.05em] sm:text-[64px]">About Tether</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
          Tether started at a hackathon with a simple question: why does a safe night out depend on someone remembering to check a map?
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {team.map((m, i) => (
          <MemberCard key={i} m={m} i={i} />
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="text-ink-soft">
          Say hi at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-ink underline decoration-pink decoration-2 underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </p>
      </Reveal>
    </main>
  );
}
