"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ListShevitsa } from "@/components/icons/ListShevitsa";

const MARKS = [
  {
    pair: 1,
    shift: "-translate-x-[36%]",
    overlap: "",
    dx: "-2.5rem",
    dy: "-2.25rem",
    spin: "12deg",
    delay: "0ms",
  },
  {
    pair: 0,
    shift: "translate-x-[28%]",
    overlap: "-mt-[6%]",
    dx: "3rem",
    dy: "1.5rem",
    spin: "-10deg",
    delay: "80ms",
  },
  {
    pair: 1,
    shift: "translate-x-[4%]",
    overlap: "-mt-[6%]",
    dx: "2rem",
    dy: "2.75rem",
    spin: "8deg",
    delay: "140ms",
  },
] as const;

/**
 * Three shevitsas in a staggered vertical cluster on the right —
 * same colors as the rest of the site, middle one cropped by the edge.
 */
export function GoalShevitsaField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = ref.current;
    const section = document.getElementById("nas-goal-section");
    if (!field || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        field.classList.add("is-assembled");
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="shevitsa-cta-scatter shevitsa-cluster pointer-events-none absolute top-1/2 right-0 z-[1] hidden w-[min(34vw,20rem)] -translate-y-1/2 translate-x-[18%] sm:block md:w-[min(32vw,22rem)] lg:w-[min(30vw,23rem)]"
    >
      {MARKS.map((mark, index) => (
        <span
          key={index}
          className={`shevitsa-piece block aspect-square w-full ${mark.overlap}`}
          style={
            {
              "--piece-dx": mark.dx,
              "--piece-dy": mark.dy,
              "--piece-spin": mark.spin,
              animationDelay: mark.delay,
            } as CSSProperties
          }
        >
          <span className={`block h-full w-full ${mark.shift}`}>
            <ListShevitsa pair={mark.pair} className="h-full w-full" />
          </span>
        </span>
      ))}
    </div>
  );
}
