"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealFrom = "up" | "left" | "right";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Stagger delay in ms — use for lists of cards/items revealing in sequence. */
  delay?: number;
  /** Render as a different element (e.g. "h2", "li") to keep valid, semantic markup. */
  as?: ElementType;
  /**
   * Entrance direction. `"up"` is the default (fade + rise).
   * `"left"` / `"right"` slide in from that side — for zigzag / checkerboard lists.
   */
  from?: RevealFrom;
}

const hiddenTransform: Record<RevealFrom, string> = {
  up: "opacity-0 translate-y-8 sm:translate-y-10",
  left: "opacity-0 -translate-x-8 sm:-translate-x-16 md:-translate-x-24",
  right: "opacity-0 translate-x-8 sm:translate-x-16 md:translate-x-24",
};

function getScrollRoot(el: HTMLElement): HTMLElement | null {
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const style = getComputedStyle(node);
    const overflow = `${style.overflowY} ${style.overflow}`;
    if (
      /(auto|scroll|overlay)/.test(overflow) &&
      node.scrollHeight > node.clientHeight + 8
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function viewportBox(root: HTMLElement | null) {
  if (root) {
    const rect = root.getBoundingClientRect();
    return { top: rect.top, height: rect.height, bottom: rect.bottom };
  }
  const height = window.visualViewport?.height ?? window.innerHeight;
  return { top: 0, height, bottom: height };
}

function isInView(el: HTMLElement, root: HTMLElement | null) {
  const rect = el.getBoundingClientRect();
  const vp = viewportBox(root);
  return rect.top < vp.top + vp.height * 0.86 && rect.bottom > vp.top + vp.height * 0.1;
}

/**
 * Fades + slides content the first time it enters the visible scroll area.
 * Works with window scroll and nested scrollers (Cursor preview).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
  as: Tag = "div",
  from = "up",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const root = getScrollRoot(el);
    let shown = false;
    let frame = 0;

    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      cleanup();
    };

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (el && isInView(el, root)) show();
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      {
        root,
        threshold: 0.08,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(el);

    const scrollTarget: EventTarget = root ?? window;
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScroll);

    const poll = window.setInterval(() => {
      if (el && isInView(el, root)) show();
    }, 160);

    if (el && isInView(el, root)) show();

    function cleanup() {
      observer.disconnect();
      window.clearInterval(poll);
      if (frame) cancelAnimationFrame(frame);
      scrollTarget.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    }

    return cleanup;
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : hiddenTransform[from]
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Staggers child blocks so titles land first and copy follows, Framer-style. */
export function RevealStack({
  children,
  step = 120,
  className = "",
  from = "up",
}: {
  children: ReactNode;
  step?: number;
  className?: string;
  from?: RevealFrom;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, index) => (
        <Reveal key={index} delay={index * step} from={from}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
