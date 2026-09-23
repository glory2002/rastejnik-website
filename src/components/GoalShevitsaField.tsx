"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ListShevitsa } from "@/components/icons/ListShevitsa";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

const MARKS = [
  {
    pair: 1,
    place:
      "absolute top-[2%] right-[2%] md:top-[6%] md:right-[12%] lg:top-[8%] lg:right-[18%]",
    size: "w-[min(20vw,8.5rem)] md:w-[min(16vw,11.5rem)] lg:w-[min(17vw,13.5rem)]",
    dx: "-2rem",
    dy: "-1.75rem",
    spin: "12deg",
    delay: "0ms",
    moveX: -56,
    moveY: -36,
    moveRot: -4,
    grow: 0.32,
  },
  {
    pair: 0,
    place:
      "absolute top-[42%] right-[-14%] md:top-[40%] md:right-[-8%] lg:top-[38%] lg:right-[-4%]",
    size: "w-[min(22vw,9.5rem)] md:w-[min(18vw,13rem)] lg:w-[min(20vw,15.5rem)]",
    dx: "2.25rem",
    dy: "0px",
    spin: "-10deg",
    delay: "80ms",
    moveX: 48,
    moveY: 10,
    moveRot: 5,
    grow: 0.38,
  },
  {
    pair: 1,
    place:
      "absolute bottom-[3%] right-[8%] md:bottom-[8%] md:right-[18%] lg:bottom-[10%] lg:right-[26%]",
    size: "w-[min(18vw,8rem)] md:w-[min(15vw,11rem)] lg:w-[min(16vw,12.5rem)]",
    dx: "1.5rem",
    dy: "1.75rem",
    spin: "8deg",
    delay: "140ms",
    moveX: -44,
    moveY: 32,
    moveRot: -3,
    grow: 0.28,
  },
] as const;

/**
 * Three shevitsas on the right. They scale and drift on scroll,
 * and stay spaced on narrower widths.
 */
export function GoalShevitsaField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = ref.current;
    const section = document.getElementById("nas-goal-section");
    if (!field || !section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      field.classList.add("is-assembled");
      return;
    }

    let frame = 0;

    function apply() {
      frame = 0;
      if (!section || !field) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = rect.bottom > 0 && rect.top < vh;
      field.classList.toggle("is-assembled", visible);

      const start = vh * 0.92;
      const end = vh * 0.18;
      const progress = clamp01((start - rect.top) / (start - end));
      const compact = window.innerWidth < 1024;
      const motion = compact ? 0.72 : 1;

      field
        .querySelectorAll<HTMLElement>(".shevitsa-goal-drift")
        .forEach((el, index) => {
          const mark = MARKS[index];
          if (!mark) return;
          const scale = 1 + mark.grow * progress;
          el.style.transform = `translate3d(${mark.moveX * progress * motion}px, ${mark.moveY * progress * motion}px, 0) rotate(${mark.moveRot * progress}deg) scale(${scale})`;
        });
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    }

    apply();
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
      className="shevitsa-cta-scatter shevitsa-cluster pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[min(48%,28rem)] sm:block md:w-[min(52%,34rem)] lg:w-[min(54%,36rem)]"
    >
      {MARKS.map((mark, index) => (
        <span
          key={index}
          className={`shevitsa-piece aspect-square ${mark.place} ${mark.size}`}
          style={
            {
              "--piece-dx": mark.dx,
              "--piece-dy": mark.dy,
              "--piece-spin": mark.spin,
              "--piece-delay": mark.delay,
            } as CSSProperties
          }
        >
          <span className="shevitsa-goal-drift origin-center">
            <ListShevitsa pair={mark.pair} className="h-full w-full" />
          </span>
        </span>
      ))}
    </div>
  );
}
