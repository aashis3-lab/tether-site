"use client";

import { useState } from "react";
import { EARLY_ACCESS_ENDPOINT } from "@/config";

type State = "idle" | "sending" | "done" | "error";

export function EmailCapture({ source, className = "" }: { source: string; className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(EARLY_ACCESS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className={`flex h-14 items-center text-[15px] font-medium text-ink ${className}`} role="status">
        <span className="mr-2 inline-grid size-6 place-items-center rounded-full bg-pink text-white">✓</span>
        You&apos;re on the list. We&apos;ll text you before your next night out.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={`w-full max-w-md ${className}`}>
      <div className="flex rounded-full bg-paper-2 p-1.5 lift ring-1 ring-line focus-within:ring-2 focus-within:ring-pink/60">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-ink outline-none placeholder:text-ink-soft/60"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-11 shrink-0 rounded-full bg-ink px-5 text-[15px] font-medium text-paper transition hover:opacity-85 disabled:opacity-60"
        >
          {state === "sending" ? "Joining…" : "Get early access"}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-3 pl-4 text-sm text-ink-soft" role="alert">
          That didn&apos;t go through. Try again in a moment.
        </p>
      )}
    </form>
  );
}
