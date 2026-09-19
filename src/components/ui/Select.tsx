"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FormChevron } from "@/components/icons/FormChevron";
import { Label } from "@/components/ui/Typography";

const triggerClassName =
  "flex w-full items-center justify-between gap-3 border-[1.5px] border-border-green bg-white px-4 py-3 text-left text-base outline-none transition-colors hover:border-primary focus-visible:border-primary data-[open=true]:border-primary disabled:pointer-events-none disabled:opacity-40";


export function Select({
  value,
  onChange,
  options,
  placeholder = "Изберете…",
  required = false,
  name,
  disabled = false,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  className?: string;
}) {
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, options.indexOf(value)),
  );
  const [menuBox, setMenuBox] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const selectedIndex = options.indexOf(value);

  function updateMenuBox() {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const gutter = 8;
    const spaceBelow = window.innerHeight - rect.bottom - gutter;
    const spaceAbove = rect.top - gutter;
    const wanted = Math.min(options.length * 48 + 8, 280);
    const openUp = spaceBelow < 120 && spaceAbove > spaceBelow;
    const maxHeight = Math.max(96, Math.min(wanted, openUp ? spaceAbove : spaceBelow));
    setMenuBox({
      top: openUp ? rect.top - maxHeight - 4 : rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      maxHeight,
    });
  }

  useLayoutEffect(() => {
    if (!open) return;
    updateMenuBox();
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => {
          const delta = event.key === "ArrowDown" ? 1 : -1;
          return (current + delta + options.length) % options.length;
        });
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const next = options[activeIndex];
        if (next != null) {
          onChange(next);
          setOpen(false);
          triggerRef.current?.focus();
        }
      }
    }

    function onReposition() {
      updateMenuBox();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, options, activeIndex, onChange]);

  useEffect(() => {
    if (!open) return;
    const option = menuRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    option?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  function choose(next: string) {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  }

  const menu =
    open && menuBox && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={menuRef}
            id={listId}
            role="listbox"
            className="z-[70] overflow-y-auto border-[1.5px] border-border-green bg-white py-1 shadow-[0_8px_24px_rgba(56,93,48,0.12)]"
            style={{
              position: "fixed",
              top: menuBox.top,
              left: menuBox.left,
              width: menuBox.width,
              maxHeight: menuBox.maxHeight,
            }}
          >
            {options.map((option, index) => {
              const selected = option === value;
              const active = index === activeIndex;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  data-index={index}
                  aria-selected={selected}
                  className={`flex w-full px-4 py-3 text-left text-base transition-colors ${
                    selected
                      ? "bg-primary-light-solid font-medium text-primary-dark"
                      : "text-primary-dark"
                  } ${active ? "bg-primary-light-solid" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={className}>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-required={required || undefined}
        disabled={disabled}
        data-open={open}
        className={triggerClassName}
        onClick={() => {
          if (disabled) return;
          setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
          setOpen((current) => !current);
        }}
      >
        <span className={value ? "text-primary-dark" : "text-primary-dark/50"}>
          {value || placeholder}
        </span>
        <FormChevron
          direction={open ? "up" : "down"}
          className="transition-transform duration-200"
        />
      </button>
      {menu}
    </div>
  );
}

export function FormSelect({
  label,
  options,
  className = "",
  value,
  onChange,
  required,
  name,
  disabled,
}: {
  label: string;
  options: string[];
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  name?: string;
  disabled?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label>{label}</Label>
      <Select
        value={value ?? ""}
        options={options}
        onChange={(next) => onChange?.(next)}
        required={required}
        name={name}
        disabled={disabled}
      />
    </div>
  );
}
