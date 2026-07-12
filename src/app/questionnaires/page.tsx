import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLead } from "@/components/ui/SectionLead";
import { questionnaireCategories } from "@/data/questionnaires";

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
          <h1 className="max-w-[700px] text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-primary">
            Въпросници
          </h1>
          <SectionLead className="mt-6 max-w-[560px]">
            Кратки, валидирани въпросници, които ви помагат да разберете
            по-добре себе си като родител и развитието на детето — изберете
            категория по-долу.
          </SectionLead>
        </Container>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
            {questionnaireCategories.map((category, index) => {
              const hasSubcategories =
                category.subcategories && category.subcategories.length > 0;

              return (
                <Reveal
                  key={category.slug}
                  delay={index * 60}
                  className={`flex flex-col gap-6 bg-cream p-8 md:p-10 ${
                    hasSubcategories ? "lg:col-span-3" : ""
                  }`}
                >
                  <div className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center">
                    <Image
                      src={category.icon}
                      alt=""
                      width={70}
                      height={70}
                      className={`h-[70px] w-[70px] ${category.iconClass ?? ""}`}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h2 className="text-[24px] font-bold leading-[1.2] text-primary md:text-[28px]">
                      {category.title}
                    </h2>
                    <p className="max-w-[560px] text-lg leading-[1.3] text-primary-dark">
                      {category.description}
                    </p>
                  </div>

                  {hasSubcategories ? (
                    <div className="mt-2 grid gap-px overflow-hidden bg-border-green sm:grid-cols-2 lg:grid-cols-4">
                      {category.subcategories!.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/questionnaires/${category.slug}/${sub.slug}`}
                          className="group flex flex-col gap-2 bg-white p-6 transition-colors duration-200 ease-out hover:bg-[#fefefc]"
                        >
                          <span className="inline-flex items-center gap-1.5 text-[17px] font-bold text-primary">
                            {sub.title}
                            <Image
                              src="/images/arrow-link.svg"
                              alt=""
                              width={12}
                              height={19}
                              className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
                            />
                          </span>
                          <span className="text-base leading-[1.3] text-primary-dark">
                            {sub.description}
                          </span>
                          <span className="mt-1 inline-flex w-fit items-center rounded-full bg-cream px-3 py-1 text-[13px] font-bold uppercase text-primary-dark">
                            {sub.intervals.length} въпросника
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Button className="mt-auto w-fit">Към въпросника</Button>
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
