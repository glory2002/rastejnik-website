import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLead } from "@/components/ui/SectionLead";
import { Action, Body, Display, Heading } from "@/components/ui/Typography";
import {
  questionnaireCategories,
  type QuestionnaireAccent,
} from "@/data/questionnaires";

const parentCategory = questionnaireCategories.find(
  (category) => category.slug === "ranno-detsko-razvitie",
)!;

const accentClasses: Record<QuestionnaireAccent, string> = {
  pink: "bg-accent-pink-light text-accent-pink",
  orange: "bg-accent-orange-light text-accent-orange",
  green: "bg-accent-green-light text-accent-green",
  blue: "bg-accent-blue-light text-accent-blue",
};

export const metadata: Metadata = {
  title: "Ранно детско развитие — Растежник",
  description: parentCategory.description,
};

export default function EarlyChildhoodCategoryPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-12 sm:py-16 md:py-24">
        <Container>
          <Action
            as={Link}
            href="/questionnaires"
            className="group mb-8 inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/arrow-link.svg"
              alt=""
              width={12}
              height={19}
              className="shrink-0 rotate-180"
            />
            Въпросници
          </Action>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <Image
              src={parentCategory.icon}
              alt=""
              width={70}
              height={70}
              className={`h-[70px] w-auto shrink-0 object-contain sm:h-[88px] ${
                parentCategory.iconClass ?? ""
              }`}
            />
            <div>
              <Display className="max-w-[800px]">
                {parentCategory.title}
              </Display>
              <SectionLead className="mt-5 max-w-[620px] sm:mt-6">
                {parentCategory.description}
              </SectionLead>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-white py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {parentCategory.subcategories!.map((sub, index) => (
              <Reveal key={sub.slug} delay={index * 60}>
                <Link
                  href={`/questionnaires/ranno-detsko-razvitie/${sub.slug}`}
                  className={`group flex h-full flex-col gap-4 p-5 transition-colors duration-200 ease-out hover:bg-[#fefefc] sm:gap-5 sm:p-8 ${accentClasses[sub.accent]}`}
                >
                  <div className="flex flex-col gap-2">
                    <Heading as="h2" size="sm" tone="inherit">
                      {sub.title}
                    </Heading>
                    <Body as="span">{sub.description}</Body>
                  </div>
                  <Button
                    className="mt-auto w-fit"
                    size="l"
                    interactive={false}
                  >
                    Към въпросника
                  </Button>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
