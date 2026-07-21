"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  createDashboardChild,
  dashboardChildren as initialDashboardChildren,
  resultTierColor,
  resultTierColorLight,
  type DashboardCell,
  type DashboardChild,
  type DashboardTable,
  type EarlyDevelopmentBand,
  type ParentalQuestionnaireResult,
} from "@/data/dashboardMock";
import { feedbackForScore } from "@/data/questionBank";
import type { QuestionnaireAccent } from "@/data/questionnaires";
import {
  BoyAvatar,
  GirlAvatar,
} from "@/components/icons/ChildAvatarIcons";
import { Button } from "@/components/ui/Button";

const formInputClassName =
  "w-full border-[1.5px] border-border-green bg-white px-4 py-3 text-base text-primary-dark outline-none transition-colors focus:border-primary";

const formSelectClassName =
  "w-full border-[1.5px] border-border-green py-3 pl-4 pr-11 text-base text-primary-dark outline-none transition-colors focus:border-primary";

const ageAccentTabActive: Record<QuestionnaireAccent, string> = {
  pink: "border-accent-pink bg-accent-pink text-white",
  orange: "border-accent-orange bg-accent-orange text-white",
  green: "border-primary bg-primary text-white",
  blue: "border-accent-blue bg-accent-blue text-white",
};

/** Same chevron mark as the primary button / link arrow (`arrow-link.svg`). */
function ButtonArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14.2411 22"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.74702 1.56625L2.71633e-07 6.30549L4.74702 10.9553L6.82041e-07 15.6945L4.74702 20.4337L14.2411 10.9553L4.74702 1.56625Z"
        fill="currentColor"
      />
    </svg>
  );
}

type GuidancePayload = {
  domain: string;
  intervalLabel: string;
  percentage: number;
};

function GuidancePopup({
  payload,
  onClose,
}: {
  payload: GuidancePayload;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const feedback = feedbackForScore(payload.domain, payload.percentage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/40 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guidance-popup-title"
        className="relative w-full max-w-[440px] bg-white p-6 shadow-[0_16px_48px_rgba(31,66,35,0.2)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Затвори"
          className="absolute right-4 top-4 text-[22px] leading-none text-primary-dark/50 transition-opacity hover:opacity-70"
        >
          ×
        </button>

        <div className="flex flex-col gap-4 pr-6">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-primary/70">
              {payload.intervalLabel}
            </p>
            <h3
              id="guidance-popup-title"
              className="text-[20px] font-bold leading-[1.2] text-primary-dark"
            >
              {payload.domain}
            </h3>
          </div>

          <div
            className="inline-flex w-fit items-center px-3.5 py-2"
            style={{
              backgroundColor: resultTierColorLight(payload.percentage),
            }}
          >
            <span
              className="text-[18px] font-bold"
              style={{ color: resultTierColor(payload.percentage) }}
            >
              {payload.percentage}%
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-bold uppercase text-primary">
              Насоки
            </p>
            <p className="text-[15px] leading-[1.45] text-primary-dark">
              {feedback}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChildTabs({
  childList,
  activeId,
  onSelect,
  onAddChild,
}: {
  childList: DashboardChild[];
  activeId: string;
  onSelect: (id: string) => void;
  onAddChild: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {childList.map((child) => {
        const isActive = child.id === activeId;
        const accentHoverClasses =
          child.gender === "girl"
            ? "hover:border-accent-pink hover:text-accent-pink"
            : "hover:border-accent-blue hover:text-accent-blue";
        const activeColorClasses =
          child.gender === "girl"
            ? "border-accent-pink bg-white text-accent-pink"
            : "border-accent-blue bg-white text-accent-blue";
        const Avatar = child.gender === "girl" ? GirlAvatar : BoyAvatar;
        return (
          <button
            key={child.id}
            type="button"
            onClick={() => onSelect(child.id)}
            className={`group flex items-center gap-3 rounded-full border-[1.5px] py-2.5 pl-3.5 pr-6 transition-colors ${
              isActive
                ? activeColorClasses
                : `border-border-green bg-white text-primary-dark ${accentHoverClasses}`
            }`}
          >
            <Avatar className="baby-avatar-blink h-12 w-12 shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[19px] font-bold">{child.name}</span>
              <span className="text-[15px] font-medium opacity-70">
                {child.ageLabel}
              </span>
            </span>
          </button>
        );
      })}

      <Button
        size="l"
        iconSide="left"
        className="ml-auto"
        onClick={onAddChild}
      >
        Добави дете
      </Button>
    </div>
  );
}

function AddChildModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (child: DashboardChild) => void;
}) {
  const [name, setName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [gender, setGender] = useState("");
  const [birthOrder, setBirthOrder] = useState("");
  const [fullTerm, setFullTerm] = useState("");
  const [childcare, setChildcare] = useState("");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const canSave =
    name.trim().length > 0 &&
    birthMonth.length > 0 &&
    (gender === "Момче" || gender === "Момиче");

  function handleSave() {
    if (!canSave) return;
    onSave(
      createDashboardChild({
        name,
        birthMonth,
        gender: gender as "Момче" | "Момиче",
      }),
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/40 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-child-title"
        className="relative max-h-[min(90dvh,720px)] w-full max-w-[520px] overflow-y-auto bg-white p-6 shadow-[0_16px_48px_rgba(31,66,35,0.2)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Затвори"
          className="absolute right-4 top-4 text-[22px] leading-none text-primary-dark/50 transition-opacity hover:opacity-70"
        >
          ×
        </button>

        <div className="flex flex-col gap-6 pr-4">
          <div className="flex flex-col gap-1">
            <h3
              id="add-child-title"
              className="text-[20px] font-bold leading-[1.2] text-primary md:text-[22px]"
            >
              Добави дете
            </h3>
            <p className="text-[15px] leading-[1.4] text-primary-dark/70">
              Въведете данните за детето — после можете да попълвате тестове от
              таблото.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-[14px] font-bold text-primary-dark">
                Име / псевдоним
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={formInputClassName}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[14px] font-bold text-primary-dark">
                Месец и година на раждане
              </span>
              <input
                required
                type="month"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className={formInputClassName}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[14px] font-bold text-primary-dark">Пол</span>
              <select
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={formSelectClassName}
              >
                <option value="" disabled hidden>
                  Изберете&hellip;
                </option>
                <option value="Момче">Момче</option>
                <option value="Момиче">Момиче</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[14px] font-bold text-primary-dark">
                Кое поред дете
              </span>
              <input
                type="number"
                min={1}
                value={birthOrder}
                onChange={(e) => setBirthOrder(e.target.value)}
                className={formInputClassName}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[14px] font-bold text-primary-dark">
                Родено на термин
              </span>
              <select
                value={fullTerm}
                onChange={(e) => setFullTerm(e.target.value)}
                className={formSelectClassName}
              >
                <option value="" disabled hidden>
                  Изберете&hellip;
                </option>
                <option value="Да">Да</option>
                <option value="Не">Не</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-[14px] font-bold text-primary-dark">
                Посещава ли детско заведение
              </span>
              <select
                value={childcare}
                onChange={(e) => setChildcare(e.target.value)}
                className={formSelectClassName}
              >
                <option value="" disabled hidden>
                  Изберете&hellip;
                </option>
                <option value="Да">Да</option>
                <option value="Не">Не</option>
                <option value="Понякога">Понякога</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-[14px] font-bold uppercase text-primary-dark transition-opacity hover:opacity-70"
            >
              Отказ
            </button>
            <Button size="l" disabled={!canSave} onClick={handleSave}>
              Запази
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A single status marker inside a table cell — one child cell can hold
 * more than one (e.g. two tests recorded close together in the same
 * column), so this only renders the circle itself. */
function StatusCircle({
  cell,
  onTogglePending,
  pendingOpen,
  domain,
  intervalLabel,
  onOpenGuidance,
}: {
  cell: DashboardCell;
  onTogglePending?: () => void;
  pendingOpen?: boolean;
  domain?: string;
  intervalLabel?: string;
  onOpenGuidance?: (payload: GuidancePayload) => void;
}) {
  const box = "inline-flex min-w-[64px] px-3.5 py-2";

  if (cell.kind === "na") {
    return (
      <div className={`${box} shrink-0 items-center justify-center`}>
        <span className="text-[11px] font-bold uppercase text-primary-dark/40">
          Няма
        </span>
      </div>
    );
  }

  if (cell.kind === "upcoming") {
    return (
      <div className={`${box} shrink-0 items-center justify-center`}>
        <span className="text-[11px] font-bold uppercase text-primary-dark/40">
          Предстои
        </span>
      </div>
    );
  }

  if (cell.kind === "done") {
    const canOpen =
      Boolean(domain && intervalLabel && onOpenGuidance);

    return (
      <div className="flex shrink-0 items-center gap-2">
        {cell.values.map((value, i) => {
          if (!canOpen) {
            return (
              <div
                key={i}
                className={`${box} shrink-0 items-center justify-center gap-1.5`}
                style={{ backgroundColor: resultTierColorLight(value) }}
              >
                <span
                  className="text-[15px] font-bold"
                  style={{ color: resultTierColor(value) }}
                >
                  {value}%
                </span>
              </div>
            );
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() =>
                onOpenGuidance?.({
                  domain: domain!,
                  intervalLabel: intervalLabel!,
                  percentage: value,
                })
              }
              aria-label={`Насоки за ${domain}, ${intervalLabel}: ${value}%`}
              className={`group relative ${box} shrink-0 cursor-pointer items-center justify-center gap-1.5 transition-[filter,transform] duration-150 hover:brightness-[0.96] hover:ring-2 hover:ring-secondary/50 active:scale-[0.98]`}
              style={{ backgroundColor: resultTierColorLight(value) }}
            >
              <span
                className="text-[15px] font-bold"
                style={{ color: resultTierColor(value) }}
              >
                {value}%
              </span>
              <ButtonArrowIcon className="h-[14px] w-[9px] shrink-0 text-primary-dark/40 transition-colors duration-150 group-hover:text-secondary" />
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap bg-primary-dark px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-white opacity-0 shadow-[0_6px_16px_rgba(31,66,35,0.18)] transition-opacity duration-150 group-hover:opacity-100"
              >
                Насоки
                <span
                  aria-hidden
                  className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary-dark"
                />
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // pending — always looks like a link (underline), not hover-only
  return (
    <PendingFillControl
      prompt={cell.prompt}
      href={cell.href}
      open={Boolean(pendingOpen)}
      onToggle={onTogglePending}
    />
  );
}

/** Portaled popover so the table's overflow-x scroll doesn't clip it. */
function PendingFillControl({
  prompt,
  href,
  open,
  onToggle,
}: {
  prompt: string;
  href: string;
  open: boolean;
  onToggle?: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }

    function updatePosition() {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2,
      });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      onToggle?.();
    }

    // Defer so the opening click doesn't immediately close it.
    const id = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointerDown);
    }, 0);

    return () => {
      window.clearTimeout(id);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onToggle]);

  return (
    <div className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="text-[13px] font-bold uppercase text-accent-blue underline underline-offset-2 transition-opacity hover:opacity-80"
      >
        Попълни
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            ref={popoverRef}
            className="fixed z-50 w-[220px] -translate-x-1/2 bg-primary-dark px-4 py-3 text-center text-white shadow-[0_12px_32px_rgba(31,66,35,0.25)]"
            style={{ top: coords.top, left: coords.left }}
          >
            <p className="text-[14px] leading-[1.3]">{prompt}</p>
            <Link
              href={href}
              className="mt-2 inline-block text-[13px] font-bold uppercase text-secondary underline-offset-2 hover:underline"
            >
              Започни сега
            </Link>
            <span
              aria-hidden
              className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary-dark"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

const LABEL_COLUMN_WIDTH = 176;

/**
 * Columns where every domain cell is the same status label/action
 * (Няма / Предстои / Попълни) — one questionnaire or one state covers all
 * rows, so we shouldn't repeat the label four times.
 */
function cellsMatchUniform(a: DashboardCell, b: DashboardCell): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "na" || a.kind === "upcoming") return true;
  if (a.kind === "pending" && b.kind === "pending") {
    return a.href === b.href && a.prompt === b.prompt;
  }
  return false;
}

function getUniformStatusColumns(table: DashboardTable): Set<number> {
  const result = new Set<number>();
  const { domains, columns, rows } = table;
  if (domains.length === 0) return result;

  for (let col = 0; col < columns.length; col++) {
    const cells = domains.map((domain) => rows[domain]?.[col]);
    const first = cells[0];
    if (!first) continue;
    if (first.kind !== "na" && first.kind !== "upcoming" && first.kind !== "pending") {
      continue;
    }
    if (cells.every((cell) => cell != null && cellsMatchUniform(first, cell))) {
      result.add(col);
    }
  }
  return result;
}

function ResultsTable({
  table,
  resetKey,
}: {
  table: DashboardTable;
  /** Resets horizontal scroll when the active child changes. */
  resetKey: string;
}) {
  const [openPending, setOpenPending] = useState<string | null>(null);
  const [guidance, setGuidance] = useState<GuidancePayload | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollMetrics, setScrollMetrics] = useState({
    scrollLeft: 0,
    scrollWidth: 1,
    clientWidth: 1,
  });
  const columnCount = table.columns.length;
  const domainCount = table.domains.length;
  const uniformStatusColumns = getUniformStatusColumns(table);
  const maxScroll = Math.max(
    0,
    scrollMetrics.scrollWidth - scrollMetrics.clientWidth,
  );
  const showScrollbar = maxScroll > 2;
  const thumbRatio = Math.min(
    1,
    scrollMetrics.clientWidth / scrollMetrics.scrollWidth,
  );
  const thumbWidthPct = Math.max(thumbRatio * 100, 10);
  const thumbLeftPct =
    maxScroll > 0
      ? (scrollMetrics.scrollLeft / maxScroll) * (100 - thumbWidthPct)
      : 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    function updateScrollHints() {
      const node = scrollRef.current;
      if (!node) return;
      const { scrollLeft, scrollWidth, clientWidth } = node;
      setScrollMetrics({ scrollLeft, scrollWidth, clientWidth });
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }

    updateScrollHints();
    el.addEventListener("scroll", updateScrollHints, { passive: true });
    const observer = new ResizeObserver(updateScrollHints);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollHints);
      observer.disconnect();
    };
  }, [resetKey, columnCount]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
    setOpenPending(null);
    setGuidance(null);
  }, [resetKey]);

  function scrollByThumbDelta(clientX: number, startX: number, startScroll: number) {
    const track = trackRef.current;
    const scroller = scrollRef.current;
    if (!track || !scroller || maxScroll <= 0) return;
    const trackWidth = track.clientWidth;
    const thumbWidth = (thumbWidthPct / 100) * trackWidth;
    const scrollableTrack = Math.max(1, trackWidth - thumbWidth);
    const dx = clientX - startX;
    scroller.scrollLeft = startScroll + (dx / scrollableTrack) * maxScroll;
  }

  function onThumbPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startScroll = scrollRef.current?.scrollLeft ?? 0;
    const thumb = event.currentTarget;
    thumb.setPointerCapture(event.pointerId);

    function onMove(ev: PointerEvent) {
      scrollByThumbDelta(ev.clientX, startX, startScroll);
    }
    function onUp(ev: PointerEvent) {
      thumb.releasePointerCapture(ev.pointerId);
      thumb.removeEventListener("pointermove", onMove);
      thumb.removeEventListener("pointerup", onUp);
    }
    thumb.addEventListener("pointermove", onMove);
    thumb.addEventListener("pointerup", onUp);
  }

  function onTrackPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const track = trackRef.current;
    const scroller = scrollRef.current;
    if (!track || !scroller || maxScroll <= 0) return;
    const rect = track.getBoundingClientRect();
    const clickRatio = (event.clientX - rect.left) / rect.width;
    const thumbWidth = (thumbWidthPct / 100) * rect.width;
    const targetCenter =
      clickRatio * rect.width - thumbWidth / 2;
    const scrollableTrack = Math.max(1, rect.width - thumbWidth);
    scroller.scrollLeft = (targetCenter / scrollableTrack) * maxScroll;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-1.5">
        <div className="relative w-full border-[1.5px] border-border-green bg-white">
          <div
            ref={scrollRef}
            className="results-table-scroll w-full overflow-x-auto"
          >
            <div
              className="grid w-full"
              style={{
                // Grow columns to fill the desktop width; keep a 120px floor so
                // many months still overflow and scroll on narrower viewports.
                minWidth: LABEL_COLUMN_WIDTH + columnCount * 120,
                gridTemplateColumns: `${LABEL_COLUMN_WIDTH}px repeat(${columnCount}, minmax(120px, 1fr))`,
                gridTemplateRows: `auto repeat(${domainCount}, auto)`,
              }}
            >
              <div
                className="sticky left-0 z-10 bg-primary-light-solid"
                style={{
                  width: LABEL_COLUMN_WIDTH,
                  gridRow: 1,
                  gridColumn: 1,
                }}
              />
              {table.columns.map((label, columnIndex) => (
                <div
                  key={label}
                  className="bg-primary-light-solid px-3 py-4 text-center text-[15px] font-bold text-primary"
                  style={{ gridRow: 1, gridColumn: columnIndex + 2 }}
                >
                  {label}
                </div>
              ))}

              {table.domains.map((domain, domainIndex) => (
                <div
                  key={`${domain}-label`}
                  className={`sticky left-0 z-10 flex items-center bg-white px-4 py-2.5 text-left text-[16px] font-bold leading-[1.3] text-primary-dark ${
                    domainIndex > 0 ? "border-t border-border-green/30" : ""
                  }`}
                  style={{
                    width: LABEL_COLUMN_WIDTH,
                    gridRow: domainIndex + 2,
                    gridColumn: 1,
                  }}
                >
                  {domain}
                </div>
              ))}

              {table.domains.map((domain, domainIndex) =>
                (table.rows[domain] ?? []).map((cell, columnIndex) => {
                  const key = `${domain}-${columnIndex}`;
                  const isUniformStatus =
                    uniformStatusColumns.has(columnIndex);

                  if (isUniformStatus && domainIndex > 0) {
                    return null;
                  }

                  const isUniformAnchor =
                    isUniformStatus && domainIndex === 0;

                  return (
                    <div
                      key={key}
                      className={
                        isUniformAnchor
                          ? "flex self-stretch items-stretch justify-center px-1.5 py-1.5"
                          : `flex items-center justify-center px-2 py-2.5 ${
                              domainIndex > 0
                                ? "border-t border-border-green/30"
                                : ""
                            }`
                      }
                      style={
                        isUniformAnchor
                          ? {
                              gridRow: `2 / span ${domainCount}`,
                              gridColumn: columnIndex + 2,
                            }
                          : {
                              gridRow: domainIndex + 2,
                              gridColumn: columnIndex + 2,
                            }
                      }
                    >
                      {isUniformAnchor ? (
                        <div className="flex h-full w-full items-center justify-center border border-dashed border-border-green/40 bg-[rgba(109,149,75,0.03)]">
                          <StatusCircle
                            cell={cell}
                            domain={domain}
                            intervalLabel={table.columns[columnIndex]}
                            pendingOpen={openPending === key}
                            onTogglePending={() =>
                              setOpenPending((current) =>
                                current === key ? null : key,
                              )
                            }
                            onOpenGuidance={setGuidance}
                          />
                        </div>
                      ) : (
                        <StatusCircle
                          cell={cell}
                          domain={domain}
                          intervalLabel={table.columns[columnIndex]}
                          pendingOpen={openPending === key}
                          onTogglePending={() =>
                            setOpenPending((current) =>
                              current === key ? null : key,
                            )
                          }
                          onOpenGuidance={setGuidance}
                        />
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          {/* Soft edge fades when more months are off-screen. */}
          {showScrollbar && (
            <>
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 z-20 w-10 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${
                  canScrollLeft ? "opacity-100" : "opacity-0"
                }`}
                style={{ left: LABEL_COLUMN_WIDTH }}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-14 bg-gradient-to-l from-white via-white/85 to-transparent transition-opacity duration-200 ${
                  canScrollRight ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
        </div>

        {showScrollbar && (
          <div
            ref={trackRef}
            role="scrollbar"
            aria-orientation="horizontal"
            aria-controls="results-table-scroll"
            aria-valuenow={Math.round(scrollMetrics.scrollLeft)}
            aria-valuemin={0}
            aria-valuemax={Math.round(maxScroll)}
            className="relative h-2 w-full cursor-pointer bg-primary-light-solid"
            onPointerDown={onTrackPointerDown}
          >
            <div
              className="absolute top-0 h-full cursor-grab active:cursor-grabbing"
              style={{
                width: `${thumbWidthPct}%`,
                left: `${thumbLeftPct}%`,
                backgroundImage:
                  "linear-gradient(90deg, var(--color-primary-light-solid) 0%, var(--color-primary) 72%, color-mix(in srgb, var(--color-primary) 55%, var(--color-primary-dark) 45%) 100%)",
              }}
              onPointerDown={onThumbPointerDown}
            />
          </div>
        )}
      </div>

      {guidance && (
        <GuidancePopup
          payload={guidance}
          onClose={() => setGuidance(null)}
        />
      )}
    </>
  );
}

/**
 * Lightweight dashboard tile — same identity as the questionnaires page
 * (icon + title), without marketing copy or large promo padding.
 */
function ParentalQuestionnaireCard({
  item,
}: {
  item: ParentalQuestionnaireResult;
}) {
  const [pendingOpen, setPendingOpen] = useState(false);
  const [guidance, setGuidance] = useState<GuidancePayload | null>(null);

  return (
    <div className="flex h-full items-center gap-3 border-[1.5px] border-border-green bg-white px-4 py-4">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <Image
          src={item.icon}
          alt=""
          width={40}
          height={40}
          className={`h-10 w-10 ${item.iconClass ?? ""}`}
        />
      </div>
      <h2 className="min-w-0 flex-1 text-[20px] font-bold leading-[1.2] text-primary md:text-[22px]">
        {item.title}
      </h2>
      <div className="shrink-0">
        <StatusCircle
          cell={item.cell}
          domain={item.title}
          intervalLabel="Резултат"
          pendingOpen={pendingOpen}
          onTogglePending={() => setPendingOpen((open) => !open)}
          onOpenGuidance={setGuidance}
        />
      </div>

      {guidance && (
        <GuidancePopup
          payload={guidance}
          onClose={() => setGuidance(null)}
        />
      )}
    </div>
  );
}

/** Age-group tabs, then the detail table for the selected band. */
function EarlyDevelopmentSection({
  bands,
  currentAgeGroupSlug,
  childId,
}: {
  bands: EarlyDevelopmentBand[];
  currentAgeGroupSlug: string;
  childId: string;
}) {
  const [activeSlug, setActiveSlug] = useState(currentAgeGroupSlug);

  useEffect(() => {
    setActiveSlug(currentAgeGroupSlug);
  }, [childId, currentAgeGroupSlug]);

  const activeBand =
    bands.find((band) => band.slug === activeSlug) ?? bands[0];
  const currentIndex = bands.findIndex(
    (band) => band.slug === currentAgeGroupSlug,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {bands.map((band, index) => {
          const isActive = band.slug === activeSlug;
          const isFuture = index > currentIndex;
          return (
            <button
              key={band.slug}
              type="button"
              onClick={() => setActiveSlug(band.slug)}
              className={`border-[1.5px] px-4 py-2 text-[14px] font-bold transition-colors ${
                isActive
                  ? ageAccentTabActive[band.accent]
                  : isFuture
                    ? "border-border-green/50 bg-white text-primary-dark/35 hover:border-border-green hover:text-primary-dark/55"
                    : "border-border-green bg-white text-primary-dark hover:border-primary hover:text-primary"
              }`}
            >
              {band.shortTitle}
            </button>
          );
        })}
      </div>

      <ResultsTable
        table={activeBand.table}
        resetKey={`${childId}-${activeBand.slug}`}
      />
    </div>
  );
}

export function DashboardView() {
  const [children, setChildren] = useState(initialDashboardChildren);
  const [activeId, setActiveId] = useState(initialDashboardChildren[0].id);
  const [addOpen, setAddOpen] = useState(false);
  const activeChild =
    children.find((child) => child.id === activeId) ?? children[0];

  function handleSaveChild(child: DashboardChild) {
    setChildren((current) => [...current, child]);
    setActiveId(child.id);
    setAddOpen(false);
  }

  return (
    <div className="flex w-full flex-col gap-8 text-left">
      <ChildTabs
        childList={children}
        activeId={activeId}
        onSelect={setActiveId}
        onAddChild={() => setAddOpen(true)}
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-bold leading-[1.2] text-primary md:text-[22px]">
          Ранно детско развитие
        </h2>
        <EarlyDevelopmentSection
          bands={activeChild.earlyDevelopmentBands}
          currentAgeGroupSlug={activeChild.currentAgeGroupSlug}
          childId={activeChild.id}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {activeChild.parentalQuestionnaires.map((item) => (
          <ParentalQuestionnaireCard key={item.slug} item={item} />
        ))}
      </div>

      {addOpen && (
        <AddChildModal
          onClose={() => setAddOpen(false)}
          onSave={handleSaveChild}
        />
      )}
    </div>
  );
}
