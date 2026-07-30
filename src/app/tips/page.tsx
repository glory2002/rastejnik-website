import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { tips } from "@/data/tips";

export const metadata: Metadata = {
  title: "Полезни съвети — Растежник",
  description:
    "Кратки, практични съвети за ежедневието с малко дете — на прост език, без паника и без сравнения.",
};

/**
 * Shared fixed background for every card cover — the sukman stays still in
 * the viewport; each cream “window” only reveals the portion that aligns
 * with that card as you scroll (same idea as the home embroidery, but
 * masked to the image frames).
 */
const sukmanCoverStyle = {
  backgroundImage: "url(/images/sukman.png)",
  backgroundAttachment: "fixed" as const,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "center center",
  // Larger than the viewport so the figure reads big through the windows.
  backgroundSize: "auto min(180vh, 1600px)",
};

export default function TipsListingPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <nav
            aria-label="Пътека"
            className="mb-6 flex flex-wrap items-center gap-2 text-[14px] font-medium text-primary-dark/60"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">Полезни съвети</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Image
              src="/images/icon-rub-04.svg"
              alt=""
              width={165}
              height={110}
              className="h-[70px] w-auto shrink-0 object-contain"
            />
            <div>
              <h1 className="max-w-[800px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
                Полезни съвети
              </h1>
              <p className="mt-4 max-w-[620px] text-lg leading-[1.3] text-primary-dark">
                Кратки, практични идеи за сън, хранене, игра и връзка —
                написани за родителския ден, не за идеален свят.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="tips-listing" className="w-full bg-white py-16 md:py-24">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {tips.map((tip) => (
              <li key={tip.slug}>
                <Link
                  href={`/tips/${tip.slug}`}
                  className="group flex h-full flex-col transition-colors"
                >
                  <div
                    className="aspect-[16/10] overflow-hidden bg-cream"
                    style={sukmanCoverStyle}
                    role="img"
                    aria-hidden
                  />

                  <div className="flex flex-1 flex-col gap-3 pt-5">
                    <h2 className="text-[22px] font-bold leading-[1.2] text-primary md:text-[24px]">
                      {tip.title}
                    </h2>
                    <p className="text-base leading-[1.35] text-primary-dark">
                      {tip.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-start gap-4 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase text-primary transition-opacity group-hover:opacity-80">
                        Прочети
                        <Image
                          src="/images/arrow-link.svg"
                          alt=""
                          width={14}
                          height={22}
                          className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
