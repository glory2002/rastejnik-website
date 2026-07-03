"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PatternState = {
  visible: boolean;
  clipTop: number;
  clipBottom: number;
  scale: number;
};

const MIN_SCALE = 0.65;
// Capped at 1 — the canvas itself (the wrapper's width/height below) is
// sized to the fully-grown look, so scale never needs to overshoot past
// the canvas edge, which is what was causing shapes to be clipped at the
// top and sides once they outgrew their own box.
const MAX_SCALE = 1;

const HIDDEN: PatternState = {
  visible: false,
  clipTop: 0,
  clipBottom: 0,
  scale: MIN_SCALE,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * One embroidery motif, pinned to the viewport's right edge. It never
 * moves — instead, as the page scrolls, the green CTA section and the
 * white tagline section pass behind it. Each colorway is clipped in real
 * time to the current on-screen bounds of its own section, so the motif
 * only ever "shows through" inside the green or white background — cut
 * cleanly flush with the section's edge.
 *
 * On top of that, the motif keeps "growing" for as long as its section is
 * on screen: it starts small the moment the section peeks in from the
 * bottom and keeps scaling up continuously — echoing the brand's
 * "growth" theme — right until the section has fully scrolled away.
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
      // scrolled away past the top. That keeps the motif continuously
      // growing for as long as the section is being scrolled through,
      // instead of settling into a static size partway through.
      const travelDistance = window.innerHeight + sectionRect.height;
      const progress = clamp01(
        (window.innerHeight - sectionRect.top) / travelDistance
      );
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress;

      return { visible: true, clipTop, clipBottom, scale };
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
      className="pointer-events-none fixed right-0 top-1/2 z-10 hidden w-[568px] translate-x-[30%] -translate-y-1/2 md:block md:w-[743px] lg:w-[874px]"
    >
      <div className="relative aspect-[708.98/726.03] w-full">
        {/*
          The outer layer owns the clip-path, computed from real, unscaled
          screen coordinates — it always cuts exactly flush with the
          section's edge. The inner layer owns the growth scale; because
          it's nested inside the clipped parent, it can never render
          outside that boundary no matter how it's transformed.
        */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ctaState.visible ? 1 : 0,
            clipPath: `inset(${ctaState.clipTop}px 0px ${ctaState.clipBottom}px 0px)`,
          }}
        >
          <div
            className="absolute inset-0 origin-bottom"
            style={{ transform: `scale(${ctaState.scale})` }}
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
            opacity: taglineState.visible ? 1 : 0,
            clipPath: `inset(${taglineState.clipTop}px 0px ${taglineState.clipBottom}px 0px)`,
          }}
        >
          <div
            className="absolute inset-0 origin-bottom"
            style={{ transform: `scale(${taglineState.scale})` }}
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
