"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type PatternState = {
  visible: boolean;
  clipTop: number;
  clipBottom: number;
  scale: number;
  opacity: number;
  parallaxY: number;
};

const MIN_SCALE = 0.65;
const MAX_SCALE = 1;
const PARALLAX_MAX_PX = 10;
const FADE_BAND = 0.18;

const HIDDEN: PatternState = {
  visible: false,
  clipTop: 0,
  clipBottom: 0,
  scale: MIN_SCALE,
  opacity: 0,
  parallaxY: 0,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function opacityFromProgress(progress: number): number {
  if (progress < FADE_BAND) {
    return 0.4 + 0.6 * (progress / FADE_BAND);
  }
  if (progress > 1 - FADE_BAND) {
    return 1 - (progress - (1 - FADE_BAND)) / FADE_BAND;
  }
  return 1;
}

/**
 * Fixed embroidery on the viewport’s right edge. CTA (green) and tagline
 * (cream) scroll “behind” it; each colorway is clipped to that section’s
 * on-screen box.
 *
 * Clip / transform / opacity are written straight to the DOM in the same
 * animation frame as scroll — no React state — so fast scrolling can’t
 * leave the motif one frame outside the band.
 */
export function EmbroideryOverlay() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ctaClipRef = useRef<HTMLDivElement>(null);
  const ctaMotifRef = useRef<HTMLDivElement>(null);
  const taglineClipRef = useRef<HTMLDivElement>(null);
  const taglineMotifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const ctaClip = ctaClipRef.current;
    const ctaMotif = ctaMotifRef.current;
    const taglineClip = taglineClipRef.current;
    const taglineMotif = taglineMotifRef.current;
    if (!wrapper || !ctaClip || !ctaMotif || !taglineClip || !taglineMotif) {
      return;
    }

    let frame = 0;

    function computeState(sectionId: string): PatternState {
      const section = document.getElementById(sectionId);
      if (!section || !wrapper) return HIDDEN;

      const sectionRect = section.getBoundingClientRect();
      const patternRect = wrapper.getBoundingClientRect();

      if (
        sectionRect.bottom <= patternRect.top ||
        sectionRect.top >= patternRect.bottom
      ) {
        return HIDDEN;
      }

      // +0.5px inset hides subpixel compositor bleed on the section edge.
      const clipTop = Math.max(0, sectionRect.top - patternRect.top) + 0.5;
      const clipBottom =
        Math.max(0, patternRect.bottom - sectionRect.bottom) + 0.5;

      const travelDistance = window.innerHeight + sectionRect.height;
      const progress = clamp01(
        (window.innerHeight - sectionRect.top) / travelDistance,
      );
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress;
      const opacity = opacityFromProgress(progress);
      const parallaxY = (0.5 - progress) * 2 * PARALLAX_MAX_PX;

      return {
        visible: true,
        clipTop,
        clipBottom,
        scale,
        opacity,
        parallaxY,
      };
    }

    function apply(
      clipEl: HTMLDivElement,
      motifEl: HTMLDivElement,
      state: PatternState,
    ) {
      if (!state.visible) {
        clipEl.style.opacity = "0";
        clipEl.style.clipPath = "inset(0 0 100% 0)";
        return;
      }

      clipEl.style.opacity = String(state.opacity);
      clipEl.style.clipPath = `inset(${state.clipTop}px 0px ${state.clipBottom}px 0px)`;
      motifEl.style.transform = `translateY(${state.parallaxY}px) scale(${state.scale})`;
    }

    function update() {
      frame = 0;
      apply(ctaClip!, ctaMotif!, computeState("cta-section"));
      apply(taglineClip!, taglineMotif!, computeState("tagline-section"));
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none fixed right-0 top-1/2 z-10 hidden w-[364px] -translate-y-1/2 translate-x-[30%] sm:block sm:w-[440px] md:w-[743px] lg:w-[874px]"
    >
      <div className="relative aspect-[708.98/726.03] w-full">
        <div
          ref={ctaClipRef}
          className="absolute inset-0"
          style={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        >
          <div
            ref={ctaMotifRef}
            className="absolute inset-0 origin-bottom will-change-transform"
          >
            <Image
              src="/images/embroidery-4.svg"
              alt=""
              fill
              className="object-contain"
              sizes="874px"
            />
          </div>
        </div>
        <div
          ref={taglineClipRef}
          className="absolute inset-0"
          style={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        >
          <div
            ref={taglineMotifRef}
            className="absolute inset-0 origin-bottom will-change-transform"
          >
            <Image
              src="/images/embroidery-3.svg"
              alt=""
              fill
              className="object-contain"
              sizes="874px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
