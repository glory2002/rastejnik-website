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
 * CTA motif lives inside the green band so overflow-hidden crops it
 * to that box — nothing paints into the cream gutters.
 * After the pieces assemble, the whole motif tracks scroll like the
 * tagline embroidery (gentle up/down + scale).
 */
export function CtaShevitsa() {
  const ref = useRef<HTMLDivElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = ref.current;
    const motif = motifRef.current;
    const section = document.getElementById("cta-section");
    if (!field || !motif || !section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let assembled = false;
    let frame = 0;

    function applyParallax() {
      frame = 0;
      if (!assembled || reduceMotion) return;

      const sectionRect = section.getBoundingClientRect();
      const travelDistance = window.innerHeight + sectionRect.height;
      const progress = clamp01(
        (window.innerHeight - sectionRect.top) / travelDistance,
      );
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress;
      const parallaxY = (0.5 - progress) * 2 * PARALLAX_MAX_PX;
      motif.style.transform = `translateY(${parallaxY}px) scale(${scale})`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        field.classList.add("is-assembled");
        assembled = true;
        observer.disconnect();
        applyParallax();
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);

    function onScroll() {
      if (frame || !assembled) return;
      frame = requestAnimationFrame(applyParallax);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
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
          tone="onPrimary"
          className="h-auto w-full overflow-visible"
        />
      </div>
    </div>
  );
}
