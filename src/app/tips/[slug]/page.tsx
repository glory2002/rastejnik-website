import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import {
  getRelatedTips,
  getTipBySlug,
  tips,
  type TipBlock,
} from "@/data/tips";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tips.map((tip) => ({ slug: tip.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip) return { title: "Съвет — Растежник" };
  return {
    title: `${tip.title} — Растежник`,
    description: tip.excerpt,
  };
}

function TipBody({ blocks }: { blocks: TipBlock[] }) {
  return (
    <div className="flex flex-col gap-6 text-lg leading-[1.55] text-primary-dark">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={index}>{block.text}</p>;
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-[3px] border-secondary bg-cream px-6 py-5"
            >
              <p className="text-lg italic leading-[1.5] text-primary-dark">
                {block.text}
              </p>
              {block.cite ? (
                <cite className="mt-3 block text-[14px] font-bold not-italic text-primary">
                  {block.cite}
                </cite>
              ) : null}
            </blockquote>
          );
        }
        return (
          <div
            key={index}
            className="bg-primary-light-solid px-6 py-5 text-base font-bold leading-[1.4] text-primary-dark"
          >
            {block.text}
          </div>
        );
      })}
    </div>
  );
}

export default async function TipArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip) notFound();

  const related = getRelatedTips(tip.slug);

  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container className="flex flex-col items-center text-center">
          <nav
            aria-label="Пътека"
            className="mb-8 flex flex-wrap items-center justify-center gap-2 text-[14px] font-medium text-primary-dark/60"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/tips"
              className="transition-opacity hover:opacity-80"
            >
              Полезни съвети
            </Link>
          </nav>

          <h1 className="max-w-[820px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            {tip.title}
          </h1>
        </Container>
      </section>

      <article className="w-full bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <div className="relative mb-12 flex aspect-[16/9] items-center justify-center overflow-hidden bg-cream">
              <Image
                src={tip.coverImage}
                alt=""
                width={420}
                height={260}
                className={`max-h-[75%] w-auto object-contain ${tip.coverClass ?? ""}`}
                priority
              />
            </div>

            <TipBody blocks={tip.body} />

            <p className="mt-12 text-[15px] leading-[1.4] text-primary-dark/60">
              Растежник не замества медицински или терапевтичен съвет. При
              притеснение за здравето или развитието на детето се обърнете към
              специалист.
            </p>

            <div className="mt-10 border-t border-border-green pt-8">
              <Link
                href="/tips"
                className="inline-flex items-center gap-1.5 text-[15px] font-bold uppercase text-primary transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/arrow-link.svg"
                  alt=""
                  width={14}
                  height={22}
                  className="shrink-0 rotate-180"
                />
                Към всички съвети
              </Link>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="w-full bg-cream py-16 md:py-24">
          <Container>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] text-primary">
              Още съвети
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/tips/${item.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-white">
                      <Image
                        src={item.coverImage}
                        alt=""
                        width={220}
                        height={140}
                        className={`max-h-[65%] w-auto object-contain transition-transform duration-200 ease-out group-hover:scale-105 ${item.coverClass ?? ""}`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 pt-4">
                      <h3 className="text-[20px] font-bold leading-[1.2] text-primary">
                        {item.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[15px] font-bold uppercase text-primary transition-opacity group-hover:opacity-80">
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
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
