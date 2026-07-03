import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Header";
import { FullWidth } from "./ui/Container";

const navItems = [
  { label: "Програми", href: "#" },
  { label: "За нас", href: "/about" },
  { label: "Галерия", href: "#" },
  { label: "Блог", href: "#" },
];

const helpItems = [
  { label: "FAQs", href: "/faq" },
  { label: "Контакти", href: "/#contact" },
  { label: "Поверителност", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-primary-dark">
      <FullWidth className="py-16 md:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-[400px]">
            <Link href="/" aria-label="Растежник начало" className="inline-block">
              <Logo variant="footer" />
            </Link>
            <p className="mt-6 text-base leading-[1.4] text-footer-text">
              Образователна платформа за родители и специалисти, посветени на
              първите години от живота на детето.
            </p>
          </div>

          <div className="flex flex-wrap gap-16 lg:gap-30">
            <div>
              <h3 className="text-lg font-bold text-white">Навигация</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base text-footer-text transition-opacity hover:opacity-80"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Помощ</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {helpItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base text-footer-text transition-opacity hover:opacity-80"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[rgba(255,255,255,0.13)] pt-10 sm:flex-row sm:items-center">
          <p className="text-sm text-footer-text">
            © 2024 Растежник. Всички права запазени.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-80"
            >
              <Image src="/images/facebook.svg" alt="" width={20} height={20} />
            </a>
          </div>
        </div>
      </FullWidth>
    </footer>
  );
}
