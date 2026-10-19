import {
  ArrivalsScreen,
  CheckInCard,
  ClaimAlertCard,
  ClaimedCard,
  GroupListScreen,
  GuardianScreen,
  HelpSentScreen,
  LeftAloneMapScreen,
  LockScreen,
  MapPeekScreen,
  MessagesScreen,
  MorningScreen,
} from "@/components/app/screens";
import { AppScope } from "@/components/app/primitives";
import { EmailCapture } from "@/components/EmailCapture";
import { Keychain } from "@/components/Keychain";
import { LogoMark } from "@/components/Logo";
import { Parallax, Reveal } from "@/components/motion";
import { Phone } from "@/components/Phone";
import { MarkDivider } from "@/components/SiteChrome";
import { setupScreens } from "@/screens";

function Copy({ eyebrow, title, line, note }: { eyebrow: string; title: React.ReactNode; line: string; note?: string }) {
  return (
    <Reveal className="max-w-md">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[38px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-[52px]">{title}</h2>
      <p className="mt-5 text-[17px] leading-relaxed text-ink-soft sm:text-lg">{line}</p>
      {note && <p className="mt-4 inline-block rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-soft">{note}</p>}
    </Reveal>
  );
}

/** Two-column section. `flip` puts the visual on the left (on desktop). */
function Split({ copy, visual, flip, className = "" }: { copy: React.ReactNode; visual: React.ReactNode; flip?: boolean; className?: string }) {
  return (
    <section className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
        <div className={flip ? "lg:order-2 lg:pl-8" : ""}>{copy}</div>
        <div className={`relative flex justify-center ${flip ? "lg:order-1" : ""}`}>{visual}</div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] font-semibold tracking-[0.12em] text-pink uppercase">{children}</p>;
}

export default function Home() {
  return (
    <main id="top">
      {/* ---------- Hero ---------- */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-16 lg:pb-28">
        <div>
          <Reveal>
            <h1 className="text-[44px] leading-[1.04] font-semibold tracking-[-0.055em] sm:text-[60px] lg:text-[54px] xl:text-[58px]">
              Go out together.
              <br />
              <span className="text-gradient">Stay tether.</span>
              <br />
              Come home together.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">The group chat that actually has your back.</p>
          </Reveal>
          <Reveal delay={220} className="mt-9">
            <EmailCapture source="hero" />
            <p className="mt-4 pl-4 text-[13px] text-ink-soft/80">Free in beta. Works on iPhone and Android.</p>
          </Reveal>
        </div>

        <div className="relative mx-auto flex h-[560px] w-full max-w-[460px] items-center justify-center sm:h-[640px]">
          {/* the logo as the hero's backdrop */}
          <Parallax speed={-6} className="absolute inset-0 flex items-center justify-center">
            <LogoMark id="hero-bg" className="h-[520px] w-auto opacity-[0.13] sm:h-[600px] dark:opacity-[0.2]" />
          </Parallax>
          <div className="blob top-1/4 left-1/4 size-[300px]" />
          <Parallax speed={10} rotate={-5} className="relative">
            <Phone className="w-[250px] sm:w-[285px]" fullBleed alt="Tether party map: five friends together at Park Bar">
              <MapPeekScreen />
            </Phone>
          </Parallax>
        </div>
      </section>

      {/* ---------- 1. Before you go ---------- */}
      <Split
        flip
        copy={<Copy eyebrow="Before you go" title="Set up before the first drink." line="Pick the spot, the end time, and who's at home. Share the code." />}
        visual={
          <div className="relative h-[520px] w-full max-w-[460px] sm:h-[600px]">
            <Parallax speed={5} rotate={-6} className="absolute top-0 left-0 sm:left-4">
              <Phone className="w-[210px] sm:w-[255px]" src={setupScreens.when.src} srcDark={setupScreens.when.dark} alt="Choosing when the night ends" sizes="260px" />
            </Parallax>
            <Parallax speed={12} rotate={4} className="absolute top-16 right-0 sm:right-4">
              <Phone className="w-[210px] sm:w-[255px]" src={setupScreens.guardian.src} srcDark={setupScreens.guardian.dark} alt="Choosing tonight's guardian" sizes="260px" />
            </Parallax>
          </div>
        }
      />

      {/* ---------- 2. While you're out ---------- */}
      <Split
        className="bg-paper-2"
        copy={<Copy eyebrow="While you're out" title="See your group at a glance." line="5 of 5 together, with everyone's distance and battery right there." />}
        visual={
          <Parallax speed={8}>
            <Phone className="w-[270px] sm:w-[300px]" alt="Group list with distance and battery for each friend">
              <GroupListScreen />
            </Phone>
          </Parallax>
        }
      />

      <MarkDivider id="div-1" />

      {/* ---------- 3. It watches ---------- */}
      <Split
        flip
        copy={<Copy eyebrow="Stay present. No constant surveillance" title="It watches, so you don't have to." line="Tether alerts you when something's off, so nobody spends the night checking a map." />}
        visual={
          <div className="relative">
            <div className="blob -top-10 -left-10 size-[320px]" />
            <Parallax speed={9} rotate={3}>
              <Phone className="w-[270px] sm:w-[300px]" noStatus alt="Lock screen with Tether notifications">
                <LockScreen />
              </Phone>
            </Parallax>
          </div>
        }
      />

      {/* ---------- 4. Leaves alone ---------- */}
      <Split
        className="bg-paper-2"
        copy={
          <Copy
            eyebrow="If someone gets separated"
            title="Notices when someone leaves alone."
            line="A friend walks out with nobody near them, or their phone is dying: Tether asks them first, then tells the closest friend."
          />
        }
        visual={
          <div className="relative w-full max-w-[460px] pb-44 sm:pb-0">
            <Parallax speed={6} className="flex justify-center sm:justify-start sm:pl-6">
              <Phone className="w-[260px] sm:w-[290px]" fullBleed alt="Map with one friend outside the venue, highlighted">
                <LeftAloneMapScreen />
              </Phone>
            </Parallax>
            <Parallax speed={-12} className="absolute right-0 bottom-0 w-[240px] sm:top-36 sm:bottom-auto sm:w-[270px]">
              <Reveal delay={150}>
                <p className="mb-2 ml-3 inline-block rounded-full bg-paper px-3 py-1 text-[12px] font-medium text-ink-soft ring-1 ring-line">On Jake&apos;s phone, first</p>
                <AppScope>
                  <CheckInCard />
                </AppScope>
              </Reveal>
            </Parallax>
          </div>
        }
      />

      {/* ---------- 5. I'm on it (cards, no phone) ---------- */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rounded-[40px] bg-gradient-to-br from-[var(--tint-a)] via-[var(--tint-b)] to-[var(--tint-c)] px-5 py-14 sm:px-14 sm:py-20">
            <Reveal className="mx-auto max-w-xl text-center">
              <Eyebrow>No group-chat chaos</Eyebrow>
              <h2 className="mt-3 text-[38px] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-[52px]">Someone says &ldquo;I&apos;m on it.&rdquo;</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft sm:text-lg">One friend claims the alert, so everyone else knows it&apos;s handled.</p>
            </Reveal>
            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 md:flex-row md:justify-center md:gap-8">
              <Reveal className="w-full max-w-[330px]">
                <AppScope>
                  <ClaimAlertCard />
                </AppScope>
              </Reveal>
              <Reveal delay={150}>
                <svg viewBox="0 0 24 24" className="size-8 rotate-90 text-pink md:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </Reveal>
              <Reveal delay={300} className="w-full max-w-[330px]">
                <AppScope>
                  <ClaimedCard />
                </AppScope>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 6. One press ---------- */}
      <Split
        flip
        copy={
          <Copy
            eyebrow="If you need help"
            title="One press reaches your people."
            line="Squeeze the keychain or tap HELP. Friends hear first, then your guardian, with 911 one hold away."
            note="Keychain works with Android; iPhone uses Back Tap."
          />
        }
        visual={
          <div className="relative flex items-center justify-center">
            <Parallax speed={7}>
              <Phone className="w-[260px] sm:w-[290px]" alt="Help screen after pressing HELP">
                <HelpSentScreen />
              </Phone>
            </Parallax>
            <Parallax speed={-10} rotate={-14} className="absolute -bottom-8 -left-4 sm:-left-20">
              <Keychain className="w-[100px] sm:w-[150px]" />
            </Parallax>
          </div>
        }
      />

      {/* ---------- 7. Guardian ---------- */}
      <Split
        className="bg-paper-2"
        copy={<Copy eyebrow="The person at home" title="Your guardian gets one clear instruction." line="No map, no app, no login. Just a text that says exactly what to do." />}
        visual={
          <div className="relative h-[520px] w-full max-w-[460px] sm:h-[600px]">
            <Parallax speed={4} rotate={-4} className="absolute top-0 left-0 sm:left-2">
              <Phone className="w-[210px] sm:w-[250px]" alt="The text a guardian receives">
                <MessagesScreen />
              </Phone>
            </Parallax>
            <Parallax speed={12} rotate={3} className="absolute top-20 right-0 sm:right-2">
              <Phone className="w-[210px] sm:w-[250px]" alt="Guardian page with one Call Jake button">
                <GuardianScreen />
              </Phone>
            </Parallax>
          </div>
        }
      />

      <MarkDivider id="div-2" />

      {/* ---------- 8. Getting home ---------- */}
      <Split
        flip
        copy={<Copy eyebrow="Getting home" title="Did everyone make it home?" line="Tether tracks arrivals and checks in if someone isn't home by their ETA." />}
        visual={
          <Parallax speed={8} rotate={-3}>
            <Phone className="w-[270px] sm:w-[300px]" alt="Arrivals list with checkmarks as friends get home">
              <ArrivalsScreen />
            </Phone>
          </Parallax>
        }
      />

      {/* ---------- 9. Next morning ---------- */}
      <section className="relative overflow-hidden bg-paper-2 py-20 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 sm:px-8">
          <Reveal className="max-w-xl text-center">
            <Eyebrow>The next morning</Eyebrow>
            <h2 className="mt-3 text-[38px] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-[52px]">Gone by morning.</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft sm:text-lg">The night ends, sharing stops, and the location data is deleted.</p>
          </Reveal>
          <div className="relative mt-14">
            <div className="blob top-1/3 left-1/2 size-[360px] -translate-x-1/2 opacity-30" />
            <Parallax speed={6}>
              <Phone className="w-[270px] sm:w-[300px]" alt="Morning summary: everyone made it home, data deleted">
                <MorningScreen />
              </Phone>
            </Parallax>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section id="join" className="relative overflow-hidden py-28 sm:py-36">
        <div className="blob top-1/2 left-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2 opacity-30 sm:size-[520px]" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
          <Reveal>
            <LogoMark id="cta" className="mx-auto mb-8 h-14 w-auto" />
            <h2 className="text-[46px] leading-[1] font-semibold tracking-[-0.05em] text-balance sm:text-[72px]">
              Never lose your <span className="text-gradient">people.</span>
            </h2>
            <p className="mt-5 text-lg text-ink-soft">Be first to bring Tether on your next night out.</p>
          </Reveal>
          <Reveal delay={120} className="mt-10 flex w-full justify-center">
            <EmailCapture source="footer-cta" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
