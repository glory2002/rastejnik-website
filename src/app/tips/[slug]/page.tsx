import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TipCard } from "@/components/TipCard";
import { Container } from "@/components/ui/Container";
import {
  Action,
  Body,
  Display,
  Label,
  Title,
} from "@/components/ui/Typography";
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
    <Body as="div" size="relaxed" className="flex flex-col gap-6">
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
                <Label
                  as="cite"
                  tone="primary"
                  className="mt-3 block not-italic"
                >
                  {block.cite}
                </Label>
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
    </Body>
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

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container className="flex flex-col items-center text-center">
          <nav
            aria-label="Пътека"
            className="mb-6 flex flex-wrap items-center justify-center gap-2 text-label font-medium text-primary-dark/60 sm:mb-8"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/tips"
              className="transition-opacity hover:opacity-80"
            >
              Полезна информация
            </Link>
          </nav>

          <Display className="max-w-[820px] text-balance">{tip.title}</Display>
        </Container>
      </section>

      <article className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <TipBody blocks={tip.body} />

            <p className="mt-10 text-[15px] leading-[1.4] text-primary-dark/60 sm:mt-12">
              Растежник не замества медицински или терапевтичен съвет. При
              притеснение за здравето или развитието на детето се обърнете към
              специалист.
            </p>

            <div className="mt-8 border-t border-border-green pt-6 sm:mt-10 sm:pt-8">
              <Link
                href="/tips"
                className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/arrow-link.svg"
                  alt=""
                  width={14}
                  height={22}
                  className="shrink-0 rotate-180"
                />
                <Action>Към полезната информация</Action>
              </Link>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
          <Container>
            <Title>Още материали</Title>
            <ul className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {related.map((item, index) => (
                <li key={item.slug}>
                  <TipCard
                    href={`/tips/${item.slug}`}
                    title={item.title}
                    excerpt={item.excerpt}
                    index={index}
                  />
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
