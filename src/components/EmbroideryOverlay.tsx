"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PatternState = {
  visible: boolean;
  clipTop: number;
  clipBottom: number;
  scale: number;
  opacity: number;
  /** Subtle vertical parallax against scroll (px). */
  parallaxY: number;
};

const MIN_SCALE = 0.65;
// Capped at 1 — the canvas itself (the wrapper's width/height below) is
// sized to the fully-grown look, so scale never needs to overshoot past
// the canvas edge, which is what was causing shapes to be clipped at the
// top and sides once they outgrew their own box.
const MAX_SCALE = 1;
/** Peak vertical offset (±px) — enough for depth, not enough to feel floaty. */
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

/** Soft enter 0.4→1, hold, then soft exit 1→0. */
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
 * One embroidery motif, pinned to the viewport's right edge. It never
 * moves horizontally — instead, as the page scrolls, the green CTA section
 * and the white tagline section pass behind it. Each colorway is clipped
 * in real time to the current on-screen bounds of its own section.
 *
 * While a section is on screen the motif grows (scale), gently fades in/out
 * with that progress, and shifts a few pixels vertically against the scroll
 * for a light parallax depth cue.
 */
export function EmbroideryOverlay() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ctaState, setCtaState] = useState<PatternState>(HIDDEN);
  const [taglineState, setTaglineState] = useState<PatternState>(HIDDEN);

  useEffect(() => {
    let frame = 0;

    function computeState(sectionId: string): PatternState {
      const section = document.getElementById(sectionId);
      const wrapper = wrapperRef.current;
      if (!section || !wrapper) return HIDDEN;

      const sectionRect = section.getBoundingClientRect();
      const patternRect = wrapper.getBoundingClientRect();

      if (
        sectionRect.bottom <= patternRect.top ||
        sectionRect.top >= patternRect.bottom
      ) {
        return HIDDEN;
      }

      const clipTop = Math.max(0, sectionRect.top - patternRect.top);
      const clipBottom = Math.max(0, patternRect.bottom - sectionRect.bottom);

      // Progress spans the section's entire time on screen: 0 the instant
      // it starts entering from the bottom, 1 the instant it has fully
      // scrolled away past the top.
      const travelDistance = window.innerHeight + sectionRect.height;
      const progress = clamp01(
        (window.innerHeight - sectionRect.top) / travelDistance,
      );
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress;
      const opacity = opacityFromProgress(progress);
      // Scroll down → progress ↑ → motif drifts slightly up (against scroll).
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

    function update() {
      frame = 0;
      setCtaState(computeState("cta-section"));
      setTaglineState(computeState("tagline-section"));
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
      className="pointer-events-none fixed right-0 top-1/2 z-10 block w-[364px] translate-x-[30%] -translate-y-1/2 sm:w-[440px] md:w-[743px] lg:w-[874px]"
    >
      <div className="relative aspect-[708.98/726.03] w-full">
        {/*
          The outer layer owns the clip-path, computed from real, unscaled
          screen coordinates — it always cuts exactly flush with the
          section's edge. The inner layer owns growth + parallax; because
          it's nested inside the clipped parent, it can never render
          outside that boundary no matter how it's transformed.
        */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ctaState.visible ? ctaState.opacity : 0,
            clipPath: `inset(${ctaState.clipTop}px 0px ${ctaState.clipBottom}px 0px)`,
          }}
        >
          <div
            className="absolute inset-0 origin-bottom"
            style={{
              transform: `translateY(${ctaState.parallaxY}px) scale(${ctaState.scale})`,
            }}
          >
            <Image
              src="/images/embroidery-4.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            opacity: taglineState.visible ? taglineState.opacity : 0,
            clipPath: `inset(${taglineState.clipTop}px 0px ${taglineState.clipBottom}px 0px)`,
          }}
        >
          <div
            className="absolute inset-0 origin-bottom"
            style={{
              transform: `translateY(${taglineState.parallaxY}px) scale(${taglineState.scale})`,
            }}
          >
            <Image
              src="/images/embroidery-3.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
