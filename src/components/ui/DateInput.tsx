"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FormChevron } from "@/components/icons/FormChevron";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"] as const;

const MONTHS = [
  "януари",
  "февруари",
  "март",
  "април",
  "май",
  "юни",
  "юли",
  "август",
  "септември",
  "октомври",
  "ноември",
  "декември",
] as const;

const MIN_YEAR = 1920;
const POPUP_WIDTH = 320;

const triggerClassName =
  "flex w-full items-center justify-between gap-3 border-[1.5px] border-border-green bg-white px-4 py-3 text-left text-base outline-none transition-colors hover:border-primary focus-visible:border-primary data-[open=true]:border-primary disabled:pointer-events-none disabled:opacity-40";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function maxYear() {
  return new Date().getFullYear() + 1;
}

function toIso(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseIso(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function formatBg(date: Date) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function monthTitle(date: Date) {
  const name = MONTHS[date.getMonth()];
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${date.getFullYear()}`;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function shiftDay(date: Date, days: number) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return next;
}

function daysInView(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
  return Array.from({ length: 42 }, (_, index) => shiftDay(start, index));
}

function shiftMonth(date: Date, delta: number) {
  const target = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  const day = Math.min(
    date.getDate(),
    new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate(),
  );
  return clampDate(new Date(target.getFullYear(), target.getMonth(), day));
}

function clampDate(date: Date) {
  const min = new Date(MIN_YEAR, 0, 1);
  const max = new Date(maxYear(), 11, 31);
  if (date < min) return min;
  if (date > max) return max;
  return date;
}

export function DateInput({
  value = "",
  onChange,
  disabled = false,
  name,
  required = false,
  className = "",
  "aria-label": ariaLabel = "Дата",
}: {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const dialogId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const selected = parseIso(value);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"days" | "years">("days");
  const [cursor, setCursor] = useState<Date>(() => selected ?? new Date());
  const [yearPage, setYearPage] = useState(() =>
    Math.floor((selected ?? new Date()).getFullYear() / 12) * 12,
  );
  const [box, setBox] = useState<{ top: number; left: number } | null>(null);

  function updateBox() {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const gutter = 8;
    const popupHeight = 360;
    const spaceBelow = window.innerHeight - rect.bottom - gutter;
    const openUp = spaceBelow < popupHeight && rect.top > spaceBelow;
    const left = Math.min(
      Math.max(gutter, rect.left),
      window.innerWidth - POPUP_WIDTH - gutter,
    );
    setBox({
      top: openUp ? rect.top - popupHeight - 4 : rect.bottom + 4,
      left,
    });
  }

  function openPicker() {
    if (disabled) return;
    const initial = selected ?? new Date();
    setCursor(new Date(initial.getFullYear(), initial.getMonth(), initial.getDate()));
    setYearPage(Math.floor(initial.getFullYear() / 12) * 12);
    setView("days");
    setOpen(true);
  }

  function closePicker(focusTrigger = true) {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }

  function choose(date: Date) {
    onChange?.(toIso(clampDate(date)));
    closePicker();
  }

  useLayoutEffect(() => {
    if (!open) return;
    updateBox();
  }, [open, view]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || popupRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function onReposition() {
      updateBox();
    }

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open || view !== "days") return;
    const day = popupRef.current?.querySelector<HTMLElement>("[data-cursor='true']");
    day?.focus({ preventScroll: true });
  }, [open, view, cursor]);

  const today = new Date();
  const days = daysInView(cursor);
  const atMinMonth =
    cursor.getFullYear() === MIN_YEAR && cursor.getMonth() === 0;
  const atMaxMonth =
    cursor.getFullYear() === maxYear() && cursor.getMonth() === 11;
  const years = Array.from({ length: 12 }, (_, index) => yearPage + index);

  function moveCursor(daysDelta: number) {
    setCursor((current) => clampDate(shiftDay(current, daysDelta)));
  }

  function onDayKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      closePicker();
      return;
    }
    const delta =
      event.key === "ArrowLeft"
        ? -1
        : event.key === "ArrowRight"
          ? 1
          : event.key === "ArrowUp"
            ? -7
            : event.key === "ArrowDown"
              ? 7
              : 0;
    if (delta) {
      event.preventDefault();
      moveCursor(delta);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(cursor);
    }
  }

  const popup =
    open && box && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={popupRef}
            id={dialogId}
            role="dialog"
            aria-label={ariaLabel}
            className="z-[70] border-[1.5px] border-border-green bg-white p-4 shadow-[0_8px_24px_rgba(56,93,48,0.12)]"
            style={{
              position: "fixed",
              top: box.top,
              left: box.left,
              width: POPUP_WIDTH,
            }}
          >
            {view === "days" ? (
              <>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    aria-label="Предишен месец"
                    disabled={atMinMonth}
                    className="flex h-8 w-8 items-center justify-center text-primary transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-30"
                    onClick={() => setCursor((current) => shiftMonth(current, -1))}
                  >
                    <FormChevron direction="left" />
                  </button>
                  <button
                    type="button"
                    className="text-base font-medium text-primary-dark transition-colors hover:text-primary"
                    onClick={() => {
                      setYearPage(Math.floor(cursor.getFullYear() / 12) * 12);
                      setView("years");
                    }}
                  >
                    {monthTitle(cursor)}
                  </button>
                  <button
                    type="button"
                    aria-label="Следващ месец"
                    disabled={atMaxMonth}
                    className="flex h-8 w-8 items-center justify-center text-primary transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-30"
                    onClick={() => setCursor((current) => shiftMonth(current, 1))}
                  >
                    <FormChevron direction="right" />
                  </button>
                </div>
                <div className="grid grid-cols-7">
                  {WEEKDAYS.map((day) => (
                    <span
                      key={day}
                      className="py-1 text-center text-[0.7rem] font-bold uppercase tracking-[0.04em] text-primary/70"
                    >
                      {day}
                    </span>
                  ))}
                  {days.map((day) => {
                    const inMonth = day.getMonth() === cursor.getMonth();
                    const isSelected = selected ? sameDay(day, selected) : false;
                    const isToday = sameDay(day, today);
                    const isCursor = sameDay(day, cursor);
                    return (
                      <button
                        key={toIso(day)}
                        type="button"
                        data-cursor={isCursor ? "true" : undefined}
                        aria-pressed={isSelected}
                        aria-label={formatBg(day)}
                        className={`flex h-9 items-center justify-center text-base transition-colors ${
                          isSelected
                            ? "bg-primary text-white"
                            : inMonth
                              ? "text-primary-dark hover:bg-primary-light-solid"
                              : "text-primary-dark/35 hover:bg-primary-light-solid"
                        } ${!isSelected && isToday ? "ring-1 ring-inset ring-primary" : ""}`}
                        onClick={() => choose(day)}
                        onKeyDown={onDayKeyDown}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    aria-label="По-ранни години"
                    disabled={yearPage <= MIN_YEAR}
                    className="flex h-8 w-8 items-center justify-center text-primary transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-30"
                    onClick={() => setYearPage((page) => Math.max(MIN_YEAR, page - 12))}
                  >
                    <FormChevron direction="left" />
                  </button>
                  <button
                    type="button"
                    className="text-base font-medium text-primary-dark transition-colors hover:text-primary"
                    onClick={() => setView("days")}
                  >
                    {yearPage} – {yearPage + 11}
                  </button>
                  <button
                    type="button"
                    aria-label="По-късни години"
                    disabled={yearPage + 11 >= maxYear()}
                    className="flex h-8 w-8 items-center justify-center text-primary transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-30"
                    onClick={() =>
                      setYearPage((page) =>
                        Math.min(Math.floor(maxYear() / 12) * 12, page + 12),
                      )
                    }
                  >
                    <FormChevron direction="right" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {years.map((year) => {
                    const inRange = year >= MIN_YEAR && year <= maxYear();
                    const isSelected = cursor.getFullYear() === year;
                    return (
                      <button
                        key={year}
                        type="button"
                        disabled={!inRange}
                        className={`py-3 text-base transition-colors disabled:pointer-events-none disabled:opacity-30 ${
                          isSelected
                            ? "bg-primary text-white"
                            : "text-primary-dark hover:bg-primary-light-solid"
                        }`}
                        onClick={() => {
                          setCursor((current) => {
                            const day = Math.min(
                              current.getDate(),
                              new Date(year, current.getMonth() + 1, 0).getDate(),
                            );
                            return clampDate(new Date(year, current.getMonth(), day));
                          });
                          setView("days");
                        }}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={className}>
      {name ? <input type="hidden" name={name} value={value} required={required} /> : null}
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-required={required || undefined}
        disabled={disabled}
        data-open={open}
        className={triggerClassName}
        onClick={() => (open ? closePicker(false) : openPicker())}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            closePicker();
          }
        }}
      >
        <span className={selected ? "text-primary-dark" : "text-primary-dark/40"}>
          {selected ? formatBg(selected) : "ДД.ММ.ГГГГ"}
        </span>
        <img src="/images/calendar.svg" alt="" width={16} height={16} />
      </button>
      {popup}
    </div>
  );
}
