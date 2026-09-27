import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TipCard } from "@/components/TipCard";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cardGapClass } from "@/components/ui/cardSurface";
import { Body, Display, Label, Title } from "@/components/ui/Typography";
import {
  getRelatedTips,
  getTipBySlug,
  getTipCategory,
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
    <Body as="div" className="flex flex-col gap-6">
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
  const category = getTipCategory(tip.categorySlug);

  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <LinkButton
            href={category ? `/tips#${category.slug}` : "/tips"}
            icon="back"
            className="mb-8 sm:mb-10"
          >
            {category
              ? `Назад към ${category.title}`
              : "Назад към полезната информация"}
          </LinkButton>

          <Reveal className="flex flex-col items-center text-center">
            <Display className="max-w-[820px] text-balance">{tip.title}</Display>
          </Reveal>
        </Container>
      </section>

      <article className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <TipBody blocks={tip.body} />
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-10 text-[15px] leading-[1.4] text-primary-dark/60 sm:mt-12">
                Растежник не замества медицински или терапевтичен съвет. При
                притеснение за здравето или развитието на детето се обърнете към
                специалист.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 border-t border-border-green pt-6 sm:mt-10 sm:pt-8">
                <LinkButton
                  href={category ? `/tips#${category.slug}` : "/tips"}
                  icon="back"
                >
                  {category
                    ? `Назад към ${category.title}`
                    : "Към полезната информация"}
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
          <Container>
            <Reveal>
              <Title>Още материали</Title>
            </Reveal>
            <ul className={`mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 ${cardGapClass}`}>
              {related.map((item, index) => (
                <li key={item.slug} className="h-full">
                  <Reveal delay={Math.min(index * 70, 210)} className="h-full">
                    <TipCard
                      href={`/tips/${item.slug}`}
                      title={item.title}
                      excerpt={item.excerpt}
                      index={index}
                    />
                  </Reveal>
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
