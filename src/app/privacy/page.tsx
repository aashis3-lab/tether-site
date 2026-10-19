import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/config";

export const metadata: Metadata = {
  title: "Privacy",
};

// Placeholder until the full policy is written. Keep it to what the app actually does.
export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 pt-14 pb-24 sm:pt-20">
      <h1 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.045em] sm:text-[52px]">Privacy</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        The full policy is on its way. The short version: Tether shares your location with your group only during a night out, and when the
        night ends your locations, pins, alerts and check-ins are deleted.
      </p>
      <p className="mt-6 text-ink-soft">
        Questions:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-ink underline decoration-pink decoration-2 underline-offset-4">
          {CONTACT_EMAIL}
        </a>
      </p>
    </main>
  );
}
