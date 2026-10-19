/*
 * HTML mockups of Tether screens, drawn in app points inside <Phone> (see `.app-ui`).
 * Layouts and copy follow the real app (Material 3, src/screens in the app repo);
 * the group and numbers are fictional.
 */
import { LogoTile } from "../Logo";
import { MapArt } from "./MapArt";
import { ava, group, jake, maya, PARTY, priya, sam, type Person } from "./people";
import { AppLogo, Avatar, Battery, Icon } from "./primitives";

/* ---------- shared pieces ---------- */

function Pin({ p, x, y, size = 9, highlight }: { p: Person; x: number; y: number; size?: number; highlight?: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${x}%`, top: `${y}%` }}>
      <div className="relative flex flex-col items-center">
        {highlight && <span className="pulse-ring absolute top-0 size-10 rounded-full bg-app-warn/60" />}
        <Avatar p={p} size={size} ring className={`shadow-md ${highlight ? "ring-app-warn" : ""}`} />
        <span className={`-mt-0.5 size-2 rotate-45 ${highlight ? "bg-app-warn" : "bg-app-card"}`} />
      </div>
    </div>
  );
}

function MeDot({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      <span className="grid size-11 place-items-center rounded-full bg-app-me/20">
        <span className="size-4 rounded-full border-[calc(var(--u)*2.5)] border-white bg-app-me shadow" />
      </span>
    </div>
  );
}

function VenuePin({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <div className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center" style={{ left: `${x}%`, top: `${y}%` }}>
      <span className="grid size-8 place-items-center rounded-full bg-app-primary text-white shadow-md">
        <Icon name="pin" size={4} stroke={2} />
      </span>
      <span className="mt-0.5 rounded-full bg-app-card/90 px-1.5 text-[calc(var(--u)*11)] font-semibold text-app-pink-ink">{label}</span>
    </div>
  );
}

function StatusChip({ tone, children }: { tone: "ok" | "warn" | "alert"; children: React.ReactNode }) {
  const t = {
    ok: "bg-app-safe/15 text-app-ok",
    warn: "bg-app-warn/15 text-app-warn",
    alert: "bg-app-danger/15 text-app-danger",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${t}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function PartyCard({ status, tone = "ok" }: { status: string; tone?: "ok" | "warn" }) {
  return (
    <div className="absolute inset-x-3 top-13 z-10">
      <div className="flex items-center gap-3 rounded-full bg-app-card py-2 pr-2 pl-3.5 shadow-lg">
        <AppLogo className="h-7 w-auto" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base leading-tight font-medium">{PARTY.name}</p>
          <p className="truncate text-xs text-app-dim">
            {PARTY.venue} · Ends {PARTY.ends}
          </p>
        </div>
        <StatusChip tone={tone}>{status}</StatusChip>
        <Avatar p={maya} size={9} />
      </div>
      <div className="mt-2 flex gap-2">
        {[
          ["shield", "Safety card"],
          ["people", "Invite"],
          ["plus", "Add place"],
        ].map(([i, t]) => (
          <span key={t} className="flex items-center gap-1.5 rounded-full bg-app-card px-3 py-1.5 text-sm whitespace-nowrap shadow">
            <Icon name={i as "shield"} size={4} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function AvatarStack({ people, size = 8 }: { people: Person[]; size?: number }) {
  return (
    <span className="flex -space-x-2">
      {people.map((p) => (
        <Avatar key={p.name} p={p} size={size} ring />
      ))}
    </span>
  );
}

function HelpButton() {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-app-danger py-3 text-white shadow-md">
      <Icon name="alert" size={7} stroke={2.2} />
      <div>
        <p className="text-2xl leading-none font-bold tracking-wide">HELP</p>
        <p className="mt-1 text-xs opacity-90">Alerts your group and guardian</p>
      </div>
    </div>
  );
}

/* ---------- Hero: the live party map ---------- */

export function MapPeekScreen() {
  return (
    <>
      <MapArt variant="union" />
      <PartyCard status="5 of 5 together" />
      <VenuePin x={44} y={44} label={PARTY.venue} />
      <Pin p={jake} x={36} y={50} />
      <Pin p={priya} x={53} y={49} />
      <Pin p={sam} x={44} y={56} />
      <Pin p={ava} x={58} y={56.5} />
      <MeDot x={49} y={60} />
      <span className="absolute right-4 bottom-[34%] grid size-12 place-items-center rounded-2xl bg-app-card text-app-me shadow-md">
        <Icon name="locate" size={6} />
      </span>
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-app-low px-4 pt-2 pb-6 shadow-[0_-4px_24px_rgb(0_0_0/0.12)]">
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-app-dim/40" />
        <div className="flex items-center gap-3">
          <AvatarStack people={group} />
          <div>
            <p className="text-lg leading-tight font-medium">5 of 5 together</p>
            <p className="text-xs text-app-dim">5 people · all within 50 ft · updated now</p>
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2.5">
          <span className="flex items-center justify-center gap-2 rounded-full bg-app-findme py-3 text-base font-medium">
            <Icon name="send" size={5} /> Find me
          </span>
          <span className="flex items-center justify-center gap-2 rounded-full bg-app-orange-box py-3 text-base font-medium text-app-on-orange-box">
            <Icon name="status" size={5} /> Status
          </span>
        </div>
        <div className="mt-2.5">
          <HelpButton />
        </div>
      </div>
    </>
  );
}

/* ---------- See your group: the expanded friend list ---------- */

const listRows: { p: Person; you?: boolean; dist: string; batt: number; seen: string }[] = [
  { p: maya, you: true, dist: "You", batt: 82, seen: "just now" },
  { p: jake, dist: "30 ft N", batt: 64, seen: "just now" },
  { p: priya, dist: "45 ft E", batt: 91, seen: "1 min ago" },
  { p: sam, dist: "20 ft S", batt: 23, seen: "just now" },
  { p: ava, dist: "50 ft W", batt: 57, seen: "just now" },
];

export function GroupListScreen() {
  return (
    <div className="px-4 pt-3">
      <div className="flex items-center gap-3">
        <Icon name="back" size={6} />
        <p className="text-xl">{PARTY.name}</p>
      </div>
      <div className="mt-4 rounded-2xl bg-app-pink-box p-4 text-app-on-pink-box">
        <p className="text-xs opacity-80">Right now · {PARTY.venue}</p>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-4xl leading-none font-semibold tracking-tight">5 of 5</p>
          <AvatarStack people={group} size={7} />
        </div>
        <p className="mt-1.5 text-sm">together · all within 50 ft</p>
      </div>
      <div className="mt-5 flex items-center justify-between px-1">
        <p className="text-sm font-medium text-app-pink-ink">In this group · 5</p>
        <p className="flex items-center gap-1 text-sm font-medium text-app-pink-ink">
          <Icon name="plus" size={4} /> Invite
        </p>
      </div>
      <div className="mt-2 overflow-hidden rounded-2xl bg-app-card">
        {listRows.map((r) => (
          <div key={r.p.name} className="flex items-center gap-3 border-b border-app-line/60 px-3.5 py-3 last:border-0">
            <Avatar p={r.p} size={10} />
            <div className="min-w-0 flex-1">
              <p className="text-base leading-tight">
                {r.p.name}
                {r.you && <span className="text-app-dim"> (you)</span>}
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-xs text-app-dim">
                <span className={r.you ? "" : "font-medium text-app-ink"}>{r.dist}</span>
                <Battery pct={r.batt} />
                <span>{r.seen}</span>
              </p>
            </div>
            {!r.you && (
              <span className="flex gap-1.5">
                <span className="grid size-9 place-items-center rounded-full bg-app-mid">
                  <Icon name="phone" size={4} />
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-app-mid">
                  <Icon name="nav" size={4} />
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 px-1 text-sm font-medium text-app-pink-ink">Tonight</p>
      <div className="mt-2 overflow-hidden rounded-2xl bg-app-card">
        {[
          ["pin", "Add a place", "1 on the map · or long-press the map"],
          ["shield", "Safety card", "Emergency contact, guardian and medical info"],
          ["home", "End my night", "Get home safely · party ends " + PARTY.ends],
        ].map(([i, t, d]) => (
          <div key={t} className="flex items-center gap-3 border-b border-app-line/60 px-3.5 py-3 last:border-0">
            <span className="grid size-9 place-items-center rounded-full bg-app-orange-box text-app-on-orange-box">
              <Icon name={i as "pin"} size={4.5} />
            </span>
            <div>
              <p className="text-base leading-tight">{t}</p>
              <p className="text-xs text-app-dim">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- It watches: lock screen notification stack ---------- */

const notes = [
  { title: "Jake left Park Bar alone", body: "640 ft NE · Tether asked if he's okay", time: "now" },
  { title: "Maya's phone is at 8%", body: "Stay with her. Her last location stays on the map.", time: "4m ago" },
  { title: "Sam is heading home", body: "With Priya · ETA 1:40 AM", time: "12m ago" },
];

export function LockScreen() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1a0f1a] text-white">
      <div className="absolute -top-20 -left-24 size-96 rounded-full bg-[#ff4f8b] opacity-50 blur-[calc(var(--u)*70)]" />
      <div className="absolute -right-24 bottom-10 size-96 rounded-full bg-[#ff8a3d] opacity-40 blur-[calc(var(--u)*80)]" />
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-black/10 to-black/45" />
      <div className="relative flex flex-col items-center pt-16">
        <Icon name="lock" size={5} />
        <p className="mt-2 text-lg font-medium opacity-90">Saturday, October 24</p>
        <p className="text-[calc(var(--u)*88)] leading-none font-semibold tracking-tight">1:12</p>
      </div>
      <div className="relative mt-auto flex flex-col gap-2 px-3 pt-56">
        <p className="mb-1 px-2 text-sm font-medium opacity-80">Notification Center</p>
        {notes.map((n, i) => (
          <div
            key={n.title}
            className="flex gap-3 rounded-3xl bg-white/20 p-3.5 backdrop-blur-xl"
            style={{ opacity: 1 - i * 0.12 }}
          >
            <LogoTile id={`lock-${i}`} className="size-9" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-semibold">{n.title}</p>
                <span className="shrink-0 text-xs opacity-70">{n.time}</span>
              </div>
              <p className="text-sm leading-snug opacity-90">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <span className="h-1.5 w-36 rounded-full bg-white/80" />
      </div>
    </div>
  );
}

/* ---------- Leaves alone: map with one friend outside the venue ---------- */

export function LeftAloneMapScreen() {
  return (
    <>
      <MapArt variant="river" />
      <PartyCard status="1 on their own" tone="warn" />
      {/* venue radius */}
      <div
        className="absolute size-[calc(var(--u)*150)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[calc(var(--u)*2)] border-dashed border-app-primary/60 bg-app-primary/10"
        style={{ left: "38%", top: "57%" }}
      />
      <VenuePin x={38} y={57} label={PARTY.venue} />
      <Pin p={priya} x={30} y={60} />
      <Pin p={sam} x={44} y={62} />
      <Pin p={ava} x={35} y={67} />
      <MeDot x={46} y={66} />
      {/* path to the friend who left */}
      <svg viewBox="0 0 390 891" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M190 560 C230 470, 250 420, 296 360" stroke="rgb(var(--a-warn))" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" fill="none" />
      </svg>
      <span className="absolute rounded-full bg-app-card px-2 py-0.5 text-xs font-semibold text-app-warn shadow" style={{ left: "55%", top: "47%" }}>
        640 ft
      </span>
      <Pin p={jake} x={76} y={41} size={10} highlight />
      {/* snackbar, as the app shows it */}
      <div className="absolute inset-x-3 bottom-6 rounded-xl bg-app-inverse p-3 pl-4 text-app-on-inverse shadow-xl">
        <p className="text-lg font-medium">Jake is on their own</p>
        <p className="mt-0.5 text-xs opacity-80">640 ft NE of you · their pin is highlighted on the map</p>
        <div className="mt-2 flex justify-end gap-1 text-sm font-medium">
          <span className="px-3 py-2 opacity-90">Not now</span>
          <span className="px-3 py-2 text-[#ffb1c8] dark:text-[#b80054]">I&apos;m on it</span>
        </div>
      </div>
    </>
  );
}

/** Jake's check-in card (shown on his phone). Lives outside a phone as a close-up. */
export function CheckInCard() {
  return (
    <div className="rounded-3xl bg-app-card p-5 shadow-2xl ring-1 ring-app-line/50">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-app-warn/15 text-app-warn">
          <Icon name="status" size={6} />
        </span>
        <div>
          <p className="text-xs text-app-dim">Check-in · just now</p>
          <p className="text-2xl leading-tight font-medium">Are you okay?</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-app-dim">You left Park Bar and nobody from your group is near you.</p>
      <div className="mt-4 flex flex-col gap-2">
        <span className="flex items-center gap-2.5 rounded-full bg-app-primary px-4 py-3 text-base font-medium text-white">
          <Icon name="home" size={5} /> Heading home
        </span>
        <span className="flex items-center gap-2.5 rounded-full bg-app-mid px-4 py-3 text-base font-medium">
          <Icon name="nav" size={5} /> Going somewhere else
        </span>
        <span className="flex items-center gap-2.5 rounded-full bg-app-danger/12 px-4 py-3 text-base font-medium text-app-danger">
          <Icon name="alert" size={5} /> I need help
        </span>
      </div>
    </div>
  );
}

/* ---------- I'm on it: before and after ---------- */

export function ClaimAlertCard() {
  return (
    <div className="rounded-2xl bg-app-inverse p-4 pl-5 text-app-on-inverse shadow-2xl">
      <div className="flex items-center gap-3">
        <Avatar p={ava} size={10} />
        <div>
          <p className="text-lg leading-tight font-medium">Ava is on their own</p>
          <p className="mt-0.5 text-xs opacity-80">420 ft SW of you · nobody has answered yet</p>
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2 text-sm font-medium">
        <span className="px-3 py-2 opacity-80">Not now</span>
        <span className="rounded-full bg-app-primary px-4 py-2 text-white">I&apos;m on it</span>
      </div>
    </div>
  );
}

export function ClaimedCard() {
  return (
    <div className="rounded-2xl bg-app-card p-4 shadow-2xl ring-1 ring-app-line/50">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-app-safe/15 text-app-ok">
          <Icon name="check" size={5} stroke={2.6} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg leading-tight font-medium">Jake is on it</p>
          <p className="mt-0.5 text-xs text-app-dim">Heading to Ava · 420 ft SW · 1 min ago</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-app-low px-3 py-2.5 text-sm text-app-dim">
        <AvatarStack people={[priya, sam, maya]} size={6} />
        Everyone else can stand down
      </div>
    </div>
  );
}

/* ---------- One press: HELP sent ---------- */

export function HelpSentScreen() {
  return (
    <div className="flex h-full flex-col px-5 pt-4 pb-8">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-app-danger text-white">
          <Icon name="alert" size={5} stroke={2.2} />
        </span>
        <p className="text-2xl font-medium">Help</p>
      </div>
      <p className="mt-4 text-3xl leading-tight font-semibold tracking-tight">Your group has your location.</p>
      <div className="mt-5 overflow-hidden rounded-2xl bg-app-card">
        {[
          { done: true, title: "Friends alerted", sub: "Jake, Priya, Sam and Ava · 11:48 PM" },
          { done: true, title: "Jake is on it", sub: "200 ft away · heading to you" },
          { done: false, title: "Guardian next", sub: "Mom gets a text if nobody reaches you" },
        ].map((s) => (
          <div key={s.title} className="flex items-center gap-3 border-b border-app-line/60 px-4 py-3 last:border-0">
            <span className={`grid size-8 place-items-center rounded-full ${s.done ? "bg-app-safe/15 text-app-ok" : "bg-app-mid text-app-dim"}`}>
              <Icon name={s.done ? "check" : "phone"} size={4} stroke={2.4} />
            </span>
            <div>
              <p className="text-base leading-tight">{s.title}</p>
              <p className="text-xs text-app-dim">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-app-pink-box px-4 py-3 text-app-on-pink-box">
        <span className="relative grid size-3 place-items-center">
          <span className="pulse-ring absolute size-3 rounded-full bg-app-primary" />
          <span className="size-3 rounded-full bg-app-primary" />
        </span>
        <div>
          <p className="text-sm font-medium">Sharing your live location</p>
          <p className="text-xs opacity-80">Near Park Bar · updated now</p>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2.5">
        <div className="rounded-2xl border-[calc(var(--u)*2)] border-app-danger px-4 py-3.5 text-center text-app-danger">
          <p className="text-xl font-semibold">Call 911</p>
          <p className="text-xs">Press and hold 2 seconds</p>
        </div>
        <span className="flex items-center justify-center gap-2 rounded-full bg-app-mid py-3.5 text-base font-medium">
          <Icon name="phone" size={5} /> Call Mom · your guardian
        </span>
        <span className="py-2 text-center text-sm font-medium text-app-pink-ink">I&apos;m OK now, cancel alert</span>
      </div>
    </div>
  );
}

/* ---------- Guardian: the text and the one-instruction page ---------- */

export function MessagesScreen() {
  return (
    <div className="flex h-full flex-col bg-app-card">
      <div className="flex flex-col items-center border-b border-app-line/60 pt-2 pb-3">
        <LogoTile id="msg" className="size-12" />
        <p className="mt-1 flex items-center text-xs">
          Tether <Icon name="chevron" size={3} />
        </p>
      </div>
      <div className="flex-1 px-3 pt-4">
        <p className="text-center text-[calc(var(--u)*11)] text-app-dim">Text Message · Today 11:48 PM</p>
        <div className="mt-2 max-w-[82%] rounded-[calc(var(--u)*18)] rounded-bl-[calc(var(--u)*6)] bg-app-high px-3.5 py-2.5 text-base leading-snug">
          Tether: Maya pressed HELP. Call Jake, he&apos;s 200 ft from her. <span className="text-app-me underline">tether.app/g/k7Qx</span>
        </div>
      </div>
      <div className="mx-3 mb-6 rounded-full border border-app-line px-4 py-2 text-sm text-app-dim">Text Message</div>
    </div>
  );
}

export function GuardianScreen() {
  return (
    <div className="flex h-full flex-col px-5 pt-3 pb-8">
      <div className="flex items-center gap-2 text-sm text-app-dim">
        <AppLogo className="h-5 w-auto" /> Tether · Guardian view
      </div>
      <span className="mt-5 inline-flex w-fit"><StatusChip tone="alert">Help requested · 11:48 PM</StatusChip></span>
      <p className="mt-3 text-3xl leading-tight font-semibold tracking-tight">Call Jake, he&apos;s 200 ft from Maya.</p>
      <p className="mt-2 text-sm text-app-dim">Maya pressed HELP near Park Bar. Jake is the closest friend.</p>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-app-card p-3">
        <Avatar p={jake} size={11} />
        <div className="flex-1">
          <p className="text-base">Jake</p>
          <p className="text-xs text-app-dim">200 ft from Maya · updated now</p>
        </div>
      </div>
      <div className="relative mt-3 h-40 overflow-hidden rounded-2xl">
        <MapArt variant="east" />
        <div className="absolute top-[42%] left-[38%]">
          <Avatar p={maya} size={9} ring />
        </div>
        <div className="absolute top-[30%] left-[62%]">
          <Avatar p={jake} size={8} ring />
        </div>
        <span className="absolute bottom-2 left-2 rounded-full bg-app-card/90 px-2 py-0.5 text-[calc(var(--u)*11)] text-app-dim">Updated now</span>
      </div>
      <span className="mt-auto flex items-center justify-center gap-2.5 rounded-full bg-app-safe py-5 text-xl font-semibold text-black">
        <Icon name="phone" size={6} stroke={2.2} /> Call Jake
      </span>
      <p className="mt-3 text-center text-xs text-app-dim">No app or login needed</p>
    </div>
  );
}

/* ---------- Getting home ---------- */

const arrivals: { p: Person; home?: string; eta?: string; with?: string; progress?: number }[] = [
  { p: maya, home: "1:42 AM" },
  { p: priya, home: "1:55 AM" },
  { p: sam, home: "2:01 AM" },
  { p: jake, eta: "2:05", progress: 72 },
  { p: ava, eta: "2:10", with: "with Jake", progress: 58 },
];

export function ArrivalsScreen() {
  return (
    <div className="px-4 pt-3">
      <div className="flex items-center gap-3">
        <Icon name="back" size={6} />
        <p className="text-xl">Getting home</p>
      </div>
      <div className="mt-4 flex items-center gap-4 rounded-2xl bg-app-card p-4">
        <div className="relative grid size-16 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--a-high))" strokeWidth="3.5" />
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--a-safe))" strokeWidth="3.5" strokeDasharray="58.4 97.4" strokeLinecap="round" />
          </svg>
          <span className="text-lg font-semibold">3/5</span>
        </div>
        <div>
          <p className="text-lg leading-tight font-medium">3 of 5 home</p>
          <p className="text-xs text-app-dim">2 on the way · we&apos;ll check in if anyone runs late</p>
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl bg-app-card">
        {arrivals.map((a) => (
          <div key={a.p.name} className="flex items-center gap-3 border-b border-app-line/60 px-3.5 py-3 last:border-0">
            <Avatar p={a.p} size={10} />
            <div className="min-w-0 flex-1">
              <p className="text-base leading-tight">{a.p.name}</p>
              {a.home ? (
                <p className="text-xs text-app-ok">Home {a.home}</p>
              ) : (
                <>
                  <p className="text-xs text-app-dim">
                    Heading home {a.with ? `${a.with} ` : ""}· ETA {a.eta}
                  </p>
                  <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-app-high">
                    <span className="block h-full rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d]" style={{ width: `${a.progress}%` }} />
                  </span>
                </>
              )}
            </div>
            {a.home ? (
              <span className="grid size-8 place-items-center rounded-full bg-app-safe text-white">
                <Icon name="check" size={4} stroke={2.8} />
              </span>
            ) : (
              <Icon name="car" size={5} className="text-app-dim" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-app-orange-box p-3.5 text-app-on-orange-box">
        <Icon name="status" size={5} />
        <p className="text-xs leading-snug">If Jake isn&apos;t home by 2:20 AM, Tether checks in with him, then lets the group know.</p>
      </div>
    </div>
  );
}

/* ---------- Morning summary ---------- */

export function MorningScreen() {
  return (
    <div className="flex h-full flex-col items-center px-6 pt-10 pb-8 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-app-safe/15 text-app-ok">
        <Icon name="check" size={10} stroke={2.4} />
      </span>
      <p className="mt-5 text-xs tracking-wide text-app-dim uppercase">
        {PARTY.name} · Sat, Oct 24
      </p>
      <p className="mt-2 text-3xl leading-tight font-semibold tracking-tight">Everyone made it home.</p>
      <p className="mt-2 text-sm text-app-dim">Your location data has been deleted.</p>
      <div className="mt-6 w-full overflow-hidden rounded-2xl bg-app-card text-left">
        {[
          [maya, "1:42 AM"],
          [priya, "1:55 AM"],
          [sam, "2:01 AM"],
          [jake, "2:04 AM"],
          [ava, "2:09 AM"],
        ].map(([p, t]) => (
          <div key={(p as Person).name} className="flex items-center gap-3 border-b border-app-line/60 px-3.5 py-2.5 last:border-0">
            <Avatar p={p as Person} size={8} />
            <p className="flex-1 text-base">{(p as Person).name}</p>
            <span className="text-xs text-app-dim">Home {t as string}</span>
            <Icon name="check" size={4.5} stroke={2.6} className="text-app-ok" />
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-app-dim">
        <Icon name="trash" size={4} /> Locations, pins and alerts deleted at 9:00 AM
      </p>
      <span className="mt-auto w-full rounded-full bg-app-primary py-3.5 text-base font-medium text-white">Done</span>
    </div>
  );
}
