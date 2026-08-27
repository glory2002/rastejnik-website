"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfileMenu } from "@/components/ProfileMenu";
import { login, useMockAuth } from "@/lib/authMock";
import { Button } from "./ui/Button";
import { FullWidth } from "./ui/Container";

const navLinks = [
  { label: "За Нас", href: "/about" },
  { label: "Въпросници", href: "/questionnaires" },
  { label: "Ресурси", href: "/resources" },
];

function LogoMark({
  className = "",
  clipId,
}: {
  className?: string;
  clipId: string;
}) {
  return (
    <svg
      viewBox="0 0 246 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M23.2658 23.6333C23.2658 29.8213 19.1253 34.6928 12.8159 34.6928C10.7128 34.6928 8.74112 34.1003 7.09805 32.9812V40.9467H0V13.0345H5.98076L6.24365 14.9436C8.01817 13.4953 10.3185 12.6395 12.8159 12.6395C18.9281 12.6395 23.2658 17.2477 23.2658 23.6991V23.6333ZM16.2335 23.6333C16.2335 20.9342 14.3275 18.9593 11.6329 18.9593C8.93828 18.9593 7.03233 20.8684 7.03233 23.6333C7.03233 26.3981 8.93828 28.3072 11.6329 28.3072C14.3275 28.3072 16.2335 26.3981 16.2335 23.6333Z"
          fill="currentColor"
        />
        <path
          d="M44.0999 13.0345H50.0807V34.2978H44.0999L43.7713 32.3887C41.9968 33.9028 39.7622 34.6928 37.2648 34.6928C30.9554 34.6928 26.7491 29.953 26.7491 23.6332C26.7491 17.3135 31.2183 12.5737 37.2648 12.5737C39.828 12.5737 42.1283 13.4295 43.837 14.9436L44.0999 13.0345ZM42.9826 23.6332C42.9826 20.9342 41.0767 18.9593 38.3821 18.9593C35.6874 18.9593 33.7815 20.8683 33.7815 23.6332C33.7815 26.3981 35.6874 28.3072 38.3821 28.3072C41.0767 28.3072 42.9826 26.3981 42.9826 23.6332Z"
          fill="currentColor"
        />
        <path
          d="M54.747 23.6333C54.747 17.116 59.479 12.5079 66.1827 12.5079C72.1635 12.5079 76.5669 16.2602 77.2899 21.79H70.4547C69.7975 20.0784 68.1544 18.9593 66.2485 18.9593C63.5538 18.9593 61.7793 20.8684 61.7793 23.6333C61.7793 26.3982 63.5538 28.3072 66.2485 28.3072C68.2201 28.3072 69.7318 27.1881 70.4547 25.4765H77.2899C76.5012 31.0063 72.0978 34.7587 66.117 34.7587C59.4133 34.7587 54.6813 30.0847 54.6813 23.6333H54.747Z"
          fill="currentColor"
        />
        <path
          d="M100.687 13.0345V19.4859H93.9177V34.2978H86.8197V19.4859H80.0502V13.0345H100.687Z"
          fill="currentColor"
        />
        <path
          d="M110.48 25.674C111.071 27.6489 112.649 28.7022 114.949 28.7022C116.329 28.7022 117.644 28.1756 118.367 27.4514H125.662C124.15 31.9279 119.944 34.6928 114.883 34.6928C108.311 34.6928 103.447 30.0188 103.447 23.5674C103.447 17.116 108.245 12.442 114.883 12.442C122.31 12.442 127.239 18.1035 126.056 25.6082H110.48V25.674ZM119.484 21.5925C118.958 19.6834 117.381 18.4984 115.015 18.4984C112.649 18.4984 111.203 19.6834 110.546 21.5925H119.484Z"
          fill="currentColor"
        />
        <path
          d="M186.455 13.0345H193.553V34.2978H186.455V26.8589H180.212V34.2978H173.179V13.0345H180.212V20.0784H186.455V13.0345Z"
          fill="currentColor"
        />
        <path
          d="M214.256 13.0345H219.842V34.2978H212.81V28.4389L212.941 24.2916L205.252 34.2978H199.665V13.0345H206.698V18.8935L206.566 22.975L214.322 12.9687L214.256 13.0345Z"
          fill="currentColor"
        />
        <path
          d="M239.099 23.2382L246 33.5737V34.232H237.982L232.987 26.2006V34.232H225.889V13.0345H232.987V20.8025L237.653 13.0345H245.408V13.6928L239.099 23.2382Z"
          fill="currentColor"
        />
        <path
          d="M169.023 40.1568V42.0659H161.531V39.4327C161.531 33.5737 157.653 28.5706 152.264 26.9906V42.0659H144.772V26.9906C139.448 28.5706 135.505 33.5737 135.505 39.4327V42.0659H128.013V40.1568C128.013 40.1568 128.013 39.8935 128.013 39.7618C128.013 39.6301 128.013 39.5643 128.013 39.4327C128.013 35.6803 129.13 32.1913 130.97 29.1631C132.153 27.1881 133.73 25.4107 135.505 23.9624C137.674 22.185 140.237 20.8026 143.063 20.0784C141.42 17.116 138.725 14.812 135.505 13.6928C134.059 13.232 132.547 12.9029 130.97 12.9029V4.87152C132.547 5.00318 134.059 5.33234 135.505 5.85898C141.683 7.96556 146.481 12.9687 148.387 19.2884H148.649C150.49 13.0345 155.353 7.96556 161.531 5.85898C162.911 5.39817 164.357 5.06901 165.803 4.87152V12.837C164.291 12.837 162.846 13.1004 161.531 13.5612C158.311 14.6803 155.616 16.9844 153.973 19.9468C156.799 20.7367 159.362 22.0533 161.531 23.8308C163.24 25.2132 164.686 26.859 165.803 28.7022C167.775 31.7963 168.892 35.417 168.958 39.301C168.958 39.4326 168.958 39.4985 168.958 39.6301C168.958 39.7618 168.958 39.8935 168.958 40.0251L169.023 40.1568Z"
          fill="#E9B063"
        />
        <path
          d="M155.485 3.48903L152.001 0L148.584 3.48903L145.1 0L141.617 3.48903L148.584 10.4671L155.485 3.48903Z"
          fill="#D8727F"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="246" height="42" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Logo({
  variant = "header",
  tone = "light",
}: {
  variant?: "header" | "footer";
  tone?: "light" | "dark" | "green";
}) {
  const isHeader = variant === "header";
  const toneClass =
    tone === "light"
      ? "text-white"
      : tone === "green"
        ? "text-primary"
        : "text-primary-dark";

  return (
    <div
      className={`relative shrink-0 ${toneClass} ${
        isHeader
          ? "h-[28px] w-[164px] sm:h-[33px] sm:w-[194px]"
          : "h-[36px] w-[210px] sm:h-[42px] sm:w-[246px]"
      }`}
    >
      <LogoMark
        clipId={`logo-clip-${variant}`}
        className="block h-full w-full"
      />
      <span className="sr-only">растежник</span>
    </div>
  );
}

export function Header({
  variant = "overlay",
}: {
  /** "overlay" sits transparently on top of dark hero media with white text.
   * "light" is the inverted palette for use on light page backgrounds.
   * "framed" is a static cream header that sits above an inset hero block
   * (video framed with margins below it) rather than overlaying it. */
  variant?: "overlay" | "light" | "framed";
}) {
  const isLight = variant === "light";
  const isFramed = variant === "framed";
  const isStatic = isLight || isFramed;
  const loggedIn = useMockAuth();
  const router = useRouter();

  // Hide on scroll down, show on the first scroll up — while the bar
  // keeps the same in-flow slot at the top of the page (spacer + fixed).
  const [hidden, setHidden] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isStatic) return;
    const el = headerRef.current;
    if (!el) return;
    const sync = () => setHeaderHeight(el.offsetHeight);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isStatic]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;

      setElevated(y > 40);

      if (y < 8) {
        setHidden(false);
      } else if (delta > 0) {
        setHidden(true);
      } else if (delta < 0) {
        setHidden(false);
      }

      ticking = false;
    }

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isWhiteSurface = !isStatic && elevated;
  const logoTone = isFramed
    ? "green"
    : isLight
      ? "dark"
      : isWhiteSurface || menuOpen
        ? "green"
        : "light";
  const linkTone = isFramed
    ? "text-primary"
    : isLight
      ? "text-primary-dark"
      : isWhiteSurface || menuOpen
        ? "text-primary"
        : "text-white";
  const burgerTone = isFramed
    ? "bg-primary"
    : isLight
      ? "bg-primary-dark"
      : isWhiteSurface || menuOpen
        ? "bg-primary"
        : "bg-white";

  function closeMenu() {
    setMenuOpen(false);
  }

  const hideClass =
    hidden && !menuOpen
      ? "-translate-y-full pointer-events-none duration-200 ease-out"
      : "translate-y-0 duration-200 ease-out";

  return (
    <>
      <header
        ref={headerRef}
        className={
          isStatic
            ? `fixed inset-x-0 top-0 z-50 w-full transition-transform will-change-transform ${
                isFramed
                  ? "bg-cream"
                  : "border-b border-border-green bg-primary-light"
              } ${hideClass}`
            : `fixed inset-x-0 top-0 z-50 w-full transition-[background-color,transform,box-shadow] will-change-transform ${
                isWhiteSurface || menuOpen ? "bg-white shadow-sm" : "bg-transparent"
              } ${hideClass}`
        }
      >
      <FullWidth className="flex items-center justify-between gap-3 py-3">
        <Link href="/" aria-label="Растежник начало" className="min-w-0 shrink">
          <Logo variant="header" tone={logoTone} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-11">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-nav font-medium transition-colors hover:opacity-80 ${linkTone}`}
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
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Затвори менюто" : "Отвори менюто"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Меню</span>
          <span className="relative block h-4 w-5" aria-hidden>
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 transition-transform duration-200 ${burgerTone} ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 transition-opacity duration-200 ${burgerTone} ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 transition-transform duration-200 ${burgerTone} ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </FullWidth>

      <div
        id="mobile-nav"
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
          className={`absolute inset-x-0 top-full z-50 border-t border-border-green bg-white px-2.5 py-6 shadow-[0_16px_40px_rgba(31,66,35,0.12)] transition-[opacity,transform] duration-200 md:px-4 lg:px-8 ${
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
      {isStatic ? (
        <div aria-hidden className="w-full" style={{ height: headerHeight }} />
      ) : null}
    </>
  );
}

export { Logo };
