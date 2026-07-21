"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/lib/authMock";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Профилно меню"
        className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-border-green bg-primary-light-solid transition-colors hover:border-primary"
      >
        <Image
          src="/images/profile.svg"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[160px] border-[1.5px] border-border-green bg-white p-1 text-left shadow-[0_12px_32px_rgba(31,66,35,0.12)]">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-[15px] font-medium text-primary-dark transition-colors hover:bg-primary-light hover:text-primary"
          >
            Табло
          </Link>
          <Link
            href="#"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-[15px] font-medium text-primary-dark transition-colors hover:bg-primary-light hover:text-primary"
          >
            Профил
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
              // Full navigation so every header remounts with guest buttons.
              window.location.assign("/");
            }}
            className="block w-full px-4 py-2.5 text-left text-[15px] font-medium text-primary-dark transition-colors hover:bg-primary-light hover:text-primary"
          >
            Изход
          </button>
        </div>
      )}
    </div>
  );
}
