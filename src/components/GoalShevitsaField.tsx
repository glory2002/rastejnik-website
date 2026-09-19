"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ListShevitsa } from "@/components/icons/ListShevitsa";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

const MARKS = [
  {
    pair: 1,
    place: "absolute top-[0%] right-[26%]",
    size: "w-[min(18vw,14.5rem)]",
    dx: "-2rem",
    dy: "-1.75rem",
    spin: "12deg",
    delay: "0ms",
    moveX: 8,
    moveY: -40,
    moveRot: 3,
  },
  {
    pair: 0,
    place: "absolute top-[40%] right-[-18%]",
    size: "w-[min(21vw,16rem)]",
    dx: "2.25rem",
    dy: "0px",
    spin: "-10deg",
    delay: "80ms",
    moveX: 32,
    moveY: 0,
    moveRot: -3,
  },
  {
    pair: 1,
    place: "absolute bottom-[0%] right-[28%]",
    size: "w-[min(17vw,13rem)]",
    dx: "1.5rem",
    dy: "1.75rem",
    spin: "8deg",
    delay: "140ms",
    moveX: 10,
    moveY: 40,
    moveRot: 2,
  },
] as const;

/**
 * Three shevitsas in the right field. Each tracks scroll through the
 * green band on its own path (and reverses when you scroll back).
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
    let running = true;

    function apply() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = rect.bottom > 0 && rect.top < vh;
      field.classList.toggle("is-assembled", visible);

      const progress = clamp01((vh - rect.top) / (vh + rect.height));

      field
        .querySelectorAll<HTMLElement>(".shevitsa-goal-drift")
        .forEach((el, index) => {
          const mark = MARKS[index];
          if (!mark) return;
          el.style.transform = `translate3d(${mark.moveX * progress}px, ${mark.moveY * progress}px, 0) rotate(${mark.moveRot * progress}deg)`;
        });
    }

    function tick() {
      if (!running) return;
      apply();
      frame = requestAnimationFrame(tick);
    }

    apply();
    frame = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="shevitsa-cta-scatter shevitsa-cluster pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[min(50%,32rem)] sm:block"
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
          <span className="shevitsa-goal-drift">
            <ListShevitsa pair={mark.pair} className="h-full w-full" />
          </span>
        </span>
      ))}
    </div>
  );
}
