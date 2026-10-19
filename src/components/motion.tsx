"use client";

import { useEffect, useRef } from "react";

/** Fades children up the first time they scroll into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/**
 * Gentle scroll-linked drift. `speed` is pixels of travel per 100px scrolled past the
 * element's center; negative moves against the scroll. Off for reduced motion.
 */
export function Parallax({
  children,
  speed = 8,
  rotate = 0,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  rotate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const mover = inner.current;
    if (!el || !mover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      const y = Math.max(-48, Math.min(48, (-offset * speed) / 100));
      mover.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) rotate(${rotate}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, rotate]);
  return (
    // Measure the still outer box, move the inner one, so the transform never feeds back.
    <div ref={ref} className={className}>
      <div ref={inner} className="will-change-transform" style={{ transform: `rotate(${rotate}deg)` }}>
        {children}
      </div>
    </div>
  );
}
