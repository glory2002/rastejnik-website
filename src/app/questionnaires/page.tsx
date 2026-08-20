import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLead } from "@/components/ui/SectionLead";
import { Body, Display, Heading } from "@/components/ui/Typography";
import {
  questionnaireCategories,
  type QuestionnaireAccent,
} from "@/data/questionnaires";

const accentClasses: Record<QuestionnaireAccent, string> = {
  pink: "bg-accent-pink-light text-accent-pink",
  orange: "bg-accent-orange-light text-accent-orange",
  green: "bg-accent-green-light text-accent-green",
  blue: "bg-accent-blue-light text-accent-blue",
};

export const metadata: Metadata = {
  title: "Въпросници — Растежник",
  description:
    "Валидирани въпросници за родителска грамотност, родителска компетентност, взаимоотношения родител-специалист и ранно детско развитие.",
};

export default function QuestionnairesPage() {
  return (
    <main>
      <Header variant="framed" />

      <section className="w-full bg-cream py-16 md:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="flex flex-col justify-start">
              <Display>Въпросници</Display>
              <SectionLead className="mt-6">
                Кратки, валидирани въпросници, които ви помагат да разберете
                по-добре себе си като родител и развитието на детето —
                изберете категория по-долу.
              </SectionLead>
            </div>

            {questionnaireCategories.map((category, index) => {
              const hasSubcategories =
                category.subcategories && category.subcategories.length > 0;

              return (
                <Reveal
                  key={category.slug}
                  delay={index * 60}
                  className={`flex flex-col gap-6 bg-transparent p-8 transition-colors duration-200 ease-out md:p-10 ${
                    hasSubcategories
                      ? "lg:col-span-4"
                      : "group hover:bg-[#fefefc]"
                  }`}
                >
                  <div className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center">
                    <Image
                      src={category.icon}
                      alt=""
                      width={70}
                      height={70}
                      className={`h-[70px] w-[70px] origin-center transition-transform duration-200 ease-out motion-reduce:transition-none ${
                        hasSubcategories ? "" : "group-hover:scale-[1.3]"
                      } ${category.iconClass ?? ""}`}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Heading as="h2" size="lg">
                      {category.title}
                    </Heading>
                    <Body className="max-w-[560px]">{category.description}</Body>
                  </div>

                  {hasSubcategories ? (
                    <div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {category.subcategories!.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/questionnaires/${category.slug}/${sub.slug}`}
                          className={`group flex flex-col gap-5 p-8 transition-colors duration-200 ease-out hover:bg-[#fefefc] ${accentClasses[sub.accent]}`}
                        >
                          <div className="flex flex-col gap-2">
                            <Heading as="h3" size="sm" tone="inherit">
                              {sub.title}
                            </Heading>
                            <Body as="span">{sub.description}</Body>
                          </div>
                          {/*
                            The whole card is already the clickable <Link>, so
                            this is a decorative (non-interactive) Button — a
                            real nested <a>/<button> here would be invalid
                            HTML and would create a redundant focus stop.
                          */}
                          <Button
                            className="mt-auto w-fit"
                            size="l"
                            interactive={false}
                          >
                            Към въпросника
                          </Button>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Button
                      href={`/questionnaires/${category.slug}`}
                      className="mt-auto w-fit"
                      size="l"
                      hoverGroup={false}
                    >
                      Към въпросника
                    </Button>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
