"use client";

import { useEffect, useRef } from "react";
import { ShevitsaAssembleIcon } from "@/components/icons/ShevitsaAssembleIcon";

const MIN_SCALE = 0.65;
const MAX_SCALE = 1;
const PARALLAX_MAX_PX = 10;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Large shevitsa inside a band (`overflow-hidden` crops it to the box).
 * Pieces assemble while the band is on screen and scatter again when
 * you scroll past. After they lock, the motif tracks scroll gently.
 */
export function CtaShevitsa({
  tone = "onPrimary",
}: {
  tone?: "cream" | "onPrimary";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fieldEl = ref.current;
    const motifEl = motifRef.current;
    const sectionEl = fieldEl?.closest("section");
    if (!fieldEl || !motifEl || !sectionEl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    fieldEl.querySelectorAll<HTMLElement>(".shevitsa-piece").forEach((piece) => {
      const delay = piece.style.animationDelay;
      if (delay) piece.style.setProperty("--piece-delay", delay);
    });

    if (reduceMotion) {
      fieldEl.classList.add("is-assembled");
      return;
    }

    let assembled = false;
    let frame = 0;

    function sectionInView() {
      if (!sectionEl) return false;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight;
      return rect.top < vh * 0.72 && rect.bottom > vh * 0.28;
    }

    function applyParallax() {
      if (!assembled || !sectionEl || !motifEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const travelDistance = window.innerHeight + sectionRect.height;
      const progress = clamp01(
        (window.innerHeight - sectionRect.top) / travelDistance,
      );
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress;
      const parallaxY = (0.5 - progress) * 2 * PARALLAX_MAX_PX;
      motifEl.style.transform = `translateY(${parallaxY}px) scale(${scale})`;
    }

    function update() {
      frame = 0;
      const visible = sectionInView();
      if (visible === assembled) {
        if (visible) applyParallax();
        return;
      }

      assembled = visible;
      fieldEl?.classList.toggle("is-assembled", visible);
      if (visible) applyParallax();
      else if (motifEl) motifEl.style.transform = "";
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="shevitsa-cta-scatter pointer-events-none absolute top-1/2 right-0 z-[1] hidden w-[min(92%,28rem)] -translate-y-1/2 translate-x-[22%] sm:block sm:w-[min(80%,36rem)] md:w-[min(72%,46rem)] lg:w-[min(68%,54rem)]"
    >
      <div ref={motifRef} className="origin-bottom will-change-transform">
        <ShevitsaAssembleIcon
          tone={tone}
          className="h-auto w-full overflow-visible"
        />
      </div>
    </div>
  );
}
