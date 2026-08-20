import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { Action, Body, Display, Heading, Meta } from "@/components/ui/Typography";
import { resources, type ResourceItem } from "@/data/resources";

export const metadata: Metadata = {
  title: "Ресурси — Растежник",
  description:
    "Видеа и PDF материали за родители — ранно детско развитие, игра, сън и ежедневна грижа.",
};

function PlayMark() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-[0_4px_20px_rgba(31,66,35,0.18)] transition-transform duration-200 ease-out group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" aria-hidden>
        <path fill="currentColor" d="M8 5.14v13.72L19 12 8 5.14Z" />
      </svg>
    </span>
  );
}

function BookMark() {
  return (
    <svg viewBox="0 0 80 100" className="h-[72px] w-auto" aria-hidden>
      <rect x="12" y="8" width="56" height="84" fill="#6d954b" />
      <rect x="18" y="14" width="44" height="72" fill="#fdf8f0" />
      <polygon points="40,28 52,40 40,52 28,40" fill="#e9b063" />
      <rect
        x="32"
        y="56"
        width="16"
        height="16"
        fill="#1f4fa1"
        transform="rotate(45 40 64)"
      />
    </svg>
  );
}

function ResourceCard({ item }: { item: ResourceItem }) {
  const isVideo = item.kind === "video";

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col"
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden ${
          isVideo ? "bg-cream" : "flex items-center justify-center bg-cream"
        }`}
      >
        {isVideo ? (
          <>
            {item.youtubeId ? (
              <Image
                src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
              />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/15 transition-colors group-hover:bg-primary-dark/25">
              <PlayMark />
            </div>
          </>
        ) : (
          <BookMark />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-5">
        <Meta>{isVideo ? "Видео" : "PDF"}</Meta>
        <Heading>{item.title}</Heading>
        <p className="text-base leading-[1.35] text-primary-dark">
          {item.excerpt}
        </p>
        <Action className="mt-auto inline-flex items-center gap-1.5 pt-4 transition-opacity group-hover:opacity-80">
          {isVideo ? "Гледай в YouTube" : "Отвори PDF"}
          <Image
            src="/images/arrow-link.svg"
            alt=""
            width={14}
            height={22}
            className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
          />
        </Action>
      </div>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <nav
            aria-label="Пътека"
            className="mb-6 flex flex-wrap items-center gap-2 text-label font-medium text-primary-dark/60"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Начало
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">Ресурси</span>
          </nav>

          <div>
            <Display className="max-w-[800px]">Ресурси</Display>
            <Body className="mt-4 max-w-[620px]">
              Видеа и PDF материали за ежедневието с малко дете — отворете
              видеото в YouTube или изтеглете книгата.
            </Body>
          </div>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {resources.map((item) => (
              <li key={item.id}>
                <ResourceCard item={item} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FeaturesSection />

      <Footer />
    </main>
  );
}
