"use client";

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes } from "react";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Stagger delay in ms — use for lists of cards/items revealing in sequence. */
  delay?: number;
  /** Render as a different element (e.g. "h2", "li") to keep valid, semantic markup. */
  as?: ElementType;
}

/**
 * Fades + slides content up into place the first time it enters the
 * viewport. One shared observer-driven primitive so every section reveals
 * with the same rhythm instead of everything just snapping into view.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
