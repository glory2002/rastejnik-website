"use client";

import { useRef, type InputHTMLAttributes } from "react";
import { FormChevron } from "@/components/icons/FormChevron";

const fieldClassName =
  "number-input-plain w-full border-[1.5px] border-border-green bg-white py-3 pl-4 pr-11 text-base text-primary-dark outline-none transition-colors focus:border-primary";

function toFinite(value: string | number | undefined): number | undefined {
  if (value === "" || value == null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function NumberInput({
  className = "",
  min,
  max,
  step = 1,
  value,
  onChange,
  disabled,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const inputRef = useRef<HTMLInputElement>(null);
  const stepSize = toFinite(step) ?? 1;
  const minValue = toFinite(min);
  const maxValue = toFinite(max);
  const current = toFinite(value as string | number | undefined);
  const canDown = !disabled && (minValue == null || (current ?? minValue) > minValue);
  const canUp = !disabled && (maxValue == null || (current ?? maxValue) < maxValue);

  function nudge(delta: number) {
    const input = inputRef.current;
    if (!input) return;

    let next =
      current == null
        ? delta > 0
          ? (minValue ?? 0)
          : (maxValue ?? minValue ?? 0)
        : current + delta;
    if (minValue != null) next = Math.max(minValue, next);
    if (maxValue != null) next = Math.min(maxValue, next);

    const descriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    );
    descriptor?.set?.call(input, String(next));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  return (
    <div className={`relative ${className}`}>
      <input
        {...props}
        ref={inputRef}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={fieldClassName}
      />
      <div className="absolute inset-y-0 right-2.5 flex flex-col justify-center">
        <button
          type="button"
          tabIndex={-1}
          aria-label="Увеличи"
          disabled={!canUp}
          className="flex h-4 items-center justify-center text-primary transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-30"
          onClick={() => nudge(stepSize)}
        >
          <FormChevron direction="up" />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Намали"
          disabled={!canDown}
          className="flex h-4 items-center justify-center text-primary transition-opacity hover:opacity-70 disabled:pointer-events-none disabled:opacity-30"
          onClick={() => nudge(-stepSize)}
        >
          <FormChevron direction="down" />
        </button>
      </div>
    </div>
  );
}
