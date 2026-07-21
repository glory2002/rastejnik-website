"use client";

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
  { label: "Ресурси", href: "/#resources" },
];

export function DashboardTopBar() {
  const loggedIn = useMockAuth();
  const router = useRouter();

  return (
    <header className="relative w-full">
      <FullWidth className="flex items-center justify-between py-3">
        <Link href="/" aria-label="Растежник начало" className="shrink-0">
          <Logo variant="header" tone="green" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-11">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[21px] font-medium text-primary transition-colors hover:opacity-80"
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
      </FullWidth>
    </header>
  );
}
