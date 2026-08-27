"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Header";
import { ProfileMenu } from "@/components/ProfileMenu";
import { Button } from "@/components/ui/Button";
import { FullWidth } from "@/components/ui/Container";
import { login, useMockAuth } from "@/lib/authMock";

/** Same primary nav links as the public marketing header (`Header.tsx`). */
const navLinks = [
  { label: "За Нас", href: "/about" },
  { label: "Въпросници", href: "/questionnaires" },
  { label: "Ресурси", href: "/resources" },
];

export function DashboardTopBar() {
  const loggedIn = useMockAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="relative z-50 w-full">
      <FullWidth className="flex items-center justify-between gap-3 py-3">
        <Link href="/" aria-label="Растежник начало" className="min-w-0 shrink">
          <Logo variant="header" tone="green" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-11">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-nav font-medium text-primary transition-colors hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
          {loggedIn ? (
            <ProfileMenu />
          ) : (
            <div className="flex items-center gap-3">
              <Button
                showArrow={false}
                onClick={() => {
                  login();
                  router.push("/dashboard");
                }}
              >
                Вход
              </Button>
              <Button showArrow={false} href="/questionnaires">
                Регистрация
              </Button>
            </div>
          )}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls="dashboard-mobile-nav"
          aria-label={menuOpen ? "Затвори менюто" : "Отвори менюто"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative block h-4 w-5" aria-hidden>
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-primary transition-transform duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-primary transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-primary transition-transform duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </FullWidth>

      <div
        id="dashboard-mobile-nav"
        className={`md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <button
          type="button"
          aria-label="Затвори менюто"
          className={`fixed inset-0 z-40 bg-primary-dark/25 transition-opacity duration-200 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />
        <nav
          className={`absolute inset-x-0 top-full z-50 border-t border-border-green bg-white px-2.5 py-6 shadow-[0_16px_40px_rgba(31,66,35,0.12)] transition-[opacity,transform] duration-200 md:px-4 ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-2 py-3 text-nav font-medium text-primary transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3 border-t border-border-green pt-5 sm:flex-row">
            {loggedIn ? (
              <div onClick={closeMenu}>
                <ProfileMenu />
              </div>
            ) : (
              <>
                <Button
                  showArrow={false}
                  className="w-full sm:w-auto"
                  onClick={() => {
                    closeMenu();
                    login();
                    router.push("/dashboard");
                  }}
                >
                  Вход
                </Button>
                <Button
                  showArrow={false}
                  href="/questionnaires"
                  className="w-full sm:w-auto"
                  onClick={closeMenu}
                >
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
