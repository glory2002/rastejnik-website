import Link from "next/link";
import { ContactTrigger } from "@/components/ContactModal";
import { Logo } from "./Header";
import { FullWidth } from "./ui/Container";

const platformItems = [
  { label: "Въпросници", href: "/questionnaires" },
  { label: "Полезни съвети", href: "/tips" },
  { label: "Ресурси", href: "/resources" },
  { label: "Специалисти", href: "/specialists" },
];

const aboutItems = [
  { label: "За нас", href: "/about" },
  { label: "Новини", href: "/news" },
  { label: "FAQs", href: "/faq" },
];

const legalItems = [
  { label: "Поверителност", href: "/privacy" },
  { label: "Бисквитки", href: "/cookies" },
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
              <h3 className="text-lg font-bold text-white">Платформа</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {platformItems.map((item) => (
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
              <h3 className="text-lg font-bold text-white">За Растежник</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {aboutItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base text-footer-text transition-opacity hover:opacity-80"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <ContactTrigger className="text-left text-base text-footer-text transition-opacity hover:opacity-80">
                    Контакти
                  </ContactTrigger>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[rgba(255,255,255,0.13)] pt-10 sm:flex-row sm:items-center">
          <p className="text-sm text-footer-text">
            © 2024 Растежник. Всички права запазени.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-footer-text transition-opacity hover:opacity-80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FullWidth>
    </footer>
  );
}
