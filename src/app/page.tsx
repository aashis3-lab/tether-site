import Image from "next/image";
import { EmailCapture } from "@/components/EmailCapture";
import { Keychain } from "@/components/Keychain";
import { Parallax, Reveal } from "@/components/motion";
import { Phone } from "@/components/Phone";
import { CONTACT_EMAIL } from "@/config";
import { screens } from "@/screens";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[22px] font-semibold tracking-[-0.04em] ${className}`}>
      <span className="relative inline-block size-3.5">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-pink to-orange" />
        <span className="absolute inset-[3.5px] rounded-full bg-paper" />
      </span>
      tether
    </span>
  );
}

/** The app's separation snackbar, drawn at screen scale (1 app px ≈ 0.256cqw). */
function DriftSnackbar() {
  return (
    <div className="absolute inset-x-[2.9cqw] bottom-[38%] z-[2] animate-[snack_900ms_cubic-bezier(.2,.7,.2,1)_both] rounded-[2.9cqw] bg-[#2f2b30] p-[2.9cqw] pl-[3.8cqw] text-white shadow-[0_2cqw_6cqw_rgb(0_0_0/0.35)]">
      <p className="text-[4.3cqw] leading-tight font-medium">Jake is on their own</p>
      <p className="mt-[0.6cqw] text-[2.9cqw] opacity-80">640 ft NE of you · their pin is highlighted on the map</p>
      <div className="mt-[1.9cqw] flex justify-end gap-[1cqw] text-[3.3cqw] font-medium">
        <span className="px-[2.9cqw] py-[1.6cqw] opacity-90">Not now</span>
        <span className="px-[2.9cqw] py-[1.6cqw] text-[#ffb1c8]">I&apos;m on it</span>
      </div>
    </div>
  );
}

function SectionHead({ title, line, align = "center" }: { title: React.ReactNode; line: string; align?: "center" | "left" }) {
  const a = align === "center" ? "mx-auto text-center" : "";
  return (
    <Reveal className={`max-w-xl ${a}`}>
      <h2 className="text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-[56px]">{title}</h2>
      <p className="mt-5 text-[17px] leading-relaxed text-ink-soft sm:text-lg">{line}</p>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      {/* 1. Nav */}
      <header className="sticky top-0 z-50 border-b border-transparent bg-paper/75 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/60">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" aria-label="Tether home">
            <Wordmark />
          </a>
          <a
            href="#join"
            className="rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink/85"
          >
            Get early access
          </a>
        </nav>
      </header>

      <main id="top">
        {/* 2. Hero */}
        <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-12 pb-24 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-32">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-medium text-ink-soft">
                <span className="size-1.5 rounded-full bg-pink" /> For nights out with your people
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[52px] leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-[76px]">
                Go out together. <span className="text-gradient">Come home together.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                Tether keeps your group synced on a night out and alerts you if someone drifts off.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-9">
              <EmailCapture source="hero" />
              <p className="mt-4 pl-4 text-[13px] text-ink-soft/80">Free in beta. Works on iPhone and Android.</p>
            </Reveal>
          </div>

          <div className="relative mx-auto h-[470px] w-full max-w-[460px] sm:h-[620px]">
            <div className="blob top-10 left-6 size-[380px] sm:size-[440px]" />
            <Parallax speed={6} rotate={-8} className="absolute top-6 left-0 sm:left-2">
              <Phone src={screens.mapExpanded} alt="Tether party screen with the friend list open" className="w-[190px] sm:w-[250px]" priority />
            </Parallax>
            <Parallax speed={14} rotate={6} className="absolute top-20 right-0 sm:right-2">
              <Phone src={screens.mapPeek} alt="Tether party map with the group summary" className="w-[200px] sm:w-[265px]" priority />
            </Parallax>
          </div>
        </section>

        {/* 3. Map at a glance, with a close-up of the bottom sheet */}
        <section className="relative overflow-hidden border-t border-line bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead title="See everyone at a glance." line="Your whole group on one live map, with distance, battery and last seen for each friend." />
            <div className="relative mx-auto mt-24 flex max-w-4xl items-center justify-center">
              <Parallax speed={5}>
                <Phone src={screens.mapPeek} alt="The live group map" className="w-[260px] sm:w-[300px]" sizes="300px" />
              </Parallax>
              <Parallax speed={-10} className="absolute right-0 bottom-6 hidden md:block">
                <Reveal delay={150}>
                  <div className="relative h-[250px] w-[340px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-20px_rgb(20_18_21/0.35)] ring-1 ring-line">
                    <Image
                      src={screens.mapPeek}
                      alt="Close-up of the group summary sheet"
                      fill
                      sizes="400px"
                      className="object-cover object-bottom"
                    />
                  </div>
                  <p className="mt-3 pl-2 text-[13px] text-ink-soft">The sheet: who&apos;s close, who isn&apos;t, one tap to HELP.</p>
                </Reveal>
              </Parallax>
            </div>
          </div>
        </section>

        {/* 4. Drift alert: phone breaking out of a tinted band */}
        <section className="relative py-24 sm:py-36">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="relative grid items-center gap-12 rounded-[40px] bg-gradient-to-br from-[#fff0f5] via-[#fff5ee] to-[#ffeede] px-6 py-14 sm:px-14 lg:grid-cols-2 lg:py-20">
              <div className="relative z-10">
                <SectionHead
                  align="left"
                  title={<>Know the moment someone <span className="text-gradient">drifts.</span></>}
                  line="If a friend wanders off alone, Tether checks on them first, then tells the person closest to them."
                />
              </div>
              <div className="relative flex justify-center lg:-my-40">
                <Parallax speed={12} rotate={3}>
                  <Phone src={screens.mapPeek} alt="A separation alert in Tether" className="w-[250px] sm:w-[290px]" sizes="300px">
                    <DriftSnackbar />
                  </Phone>
                </Parallax>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Keychain + guardian */}
        <section className="relative overflow-hidden border-t border-line bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead title="One press. Everyone knows." line="Squeeze the keychain or tap HELP, and your group and your guardian at home hear about it instantly." />
            <div className="relative mx-auto mt-24 flex max-w-4xl flex-col items-center justify-center gap-10 md:flex-row md:gap-4">
              <Reveal className="relative">
                <div className="blob -top-6 left-0 size-[260px] opacity-40" />
                <Parallax speed={-8} rotate={-14}>
                  <Keychain className="relative w-[150px] sm:w-[180px]" />
                </Parallax>
              </Reveal>

              <div className="relative">
                <Parallax speed={6}>
                  <Phone src={screens.home} alt="Tether home with your guardian and keychain ready" className="w-[260px] sm:w-[290px]" sizes="300px" />
                </Parallax>
                {/* Guardian notification */}
                <Parallax speed={-14} className="absolute -bottom-10 left-1/2 w-[300px] -translate-x-1/2 sm:w-[330px] md:bottom-auto md:left-auto md:-right-44 md:top-28 md:translate-x-0">
                  <Reveal delay={200}>
                    <div className="rounded-[22px] bg-white/85 p-3.5 shadow-[0_20px_40px_-12px_rgb(20_18_21/0.3)] ring-1 ring-black/5 backdrop-blur-xl">
                      <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                        <span className="grid size-5 place-items-center rounded-[6px] bg-gradient-to-b from-[#5ef777] to-[#25d143]">
                          <svg viewBox="0 0 20 20" className="size-3.5" aria-hidden="true">
                            <path d="M10 3c4.4 0 8 2.8 8 6.3s-3.6 6.2-8 6.2c-.8 0-1.6-.1-2.3-.3L4 17l.9-3.1C3.1 12.8 2 11.1 2 9.3 2 5.8 5.6 3 10 3Z" fill="#fff" />
                          </svg>
                        </span>
                        <span className="font-medium tracking-wide uppercase">Messages</span>
                        <span className="ml-auto">now</span>
                      </div>
                      <p className="mt-2 text-[14px] font-semibold">Tether</p>
                      <p className="text-[14px] leading-snug text-ink">
                        Maya pressed HELP. Jake is 200 ft from her. Tap to see where she is.
                      </p>
                    </div>
                  </Reveal>
                </Parallax>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Setup: three phones */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead title="Set up in seconds." line="Pick the spot, set when the night ends, choose who's watching from home. Share the code." />
            <div className="mt-24 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-6 sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
              {screens.setup.map((s, i) => (
                <Reveal key={s.src} delay={i * 120} className="shrink-0 snap-center">
                  <Parallax speed={i === 1 ? 10 : 4}>
                    <div className={i === 1 ? "sm:-translate-y-8" : ""}>
                      <Phone src={s.src} alt={s.label} className="w-[230px] lg:w-[260px]" sizes="260px" />
                      <p className="mt-5 text-center text-[14px] text-ink-soft">
                        <span className="mr-2 font-semibold text-ink">{i + 1}</span>
                        {s.label}
                      </p>
                    </div>
                  </Parallax>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Credibility */}
        <section className="border-y border-line bg-white">
          <Reveal className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-5 py-10 text-center sm:flex-row sm:gap-4">
            <span className="text-gradient text-[15px] font-semibold tracking-wide uppercase">1st place of 59 teams</span>
            <span className="hidden text-line sm:inline">|</span>
            <span className="text-[15px] font-medium text-ink-soft">Hack to the Future</span>
          </Reveal>
        </section>

        {/* 8. Final CTA */}
        <section id="join" className="relative overflow-hidden py-28 sm:py-40">
          <div className="blob top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
            <Reveal>
              <h2 className="text-[48px] leading-[1] font-semibold tracking-[-0.05em] text-balance sm:text-[72px]">
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

      {/* 9. Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-soft sm:px-8">
          <Wordmark className="text-[18px] text-ink" />
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-ink">
              Contact
            </a>
            <span>© 2026 Tether</span>
          </div>
        </div>
      </footer>
    </>
  );
}
