import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealStack } from "@/components/ui/Reveal";
import { cardGapClass } from "@/components/ui/cardSurface";
import {
  Body,
  Display,
  Label,
  Meta,
  Title,
} from "@/components/ui/Typography";
import {
  getNewsBySlug,
  getRelatedNews,
  news,
  type NewsBlock,
} from "@/data/news";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "Новина — Растежник" };
  return {
    title: `${article.title} — Растежник`,
    description: article.excerpt,
  };
}

function NewsBody({ blocks }: { blocks: NewsBlock[] }) {
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

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const related = getRelatedNews(article.slug);

  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <LinkButton href="/news" icon="back" className="mb-8 sm:mb-10">
            Всички новини
          </LinkButton>

          <RevealStack className="flex flex-col items-center text-center">
            <Meta className="mb-4">{article.date}</Meta>
            <Display className="max-w-[820px] text-balance">
              {article.title}
            </Display>
          </RevealStack>
        </Container>
      </section>

      <article className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-cream sm:mb-12">
                <Image
                  src={article.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, 720px"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <NewsBody blocks={article.body} />
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 border-t border-border-green pt-6 sm:mt-10 sm:pt-8">
                <LinkButton href="/news" icon="back">
                  Всички новини
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="w-full bg-white py-12 sm:py-16 md:py-24">
          <Container>
            <Reveal>
              <Title>Още новини</Title>
            </Reveal>
            <ul className={`mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 ${cardGapClass}`}>
              {related.map((item, index) => (
                <li key={item.slug} className="h-full">
                  <Reveal delay={Math.min(index * 70, 210)} className="h-full">
                    <NewsCard
                      href={`/news/${item.slug}`}
                      date={item.date}
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
