import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLead } from "./ui/SectionLead";
import { FaqList } from "./FaqList";
import { faqQuestions, FAQ_PREVIEW_LIMIT } from "@/data/faq";

const motion = "duration-200 ease-out motion-reduce:transition-none";

export function FaqSection() {
  const visibleQuestions = faqQuestions.slice(0, FAQ_PREVIEW_LIMIT);

  return (
    <section id="questionnaires" className="w-full bg-cream py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[25%_45%] lg:gap-[10%]">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.04] text-primary">
              Бързи отговори на най-честите въпроси
            </h2>

            <SectionLead className="mt-4 max-w-[360px]">
              Физическо и моторно развитие, Социално развитие, Език и говор,
              и др.
            </SectionLead>

            <Link
              href="/faq"
              className={`group mt-20 inline-flex w-fit items-center gap-1.5 rounded-full border-[1.5px] border-secondary px-6 py-3.5 text-[15px] font-bold uppercase text-primary transition-colors ${motion} hover:border-primary`}
            >
              Разгледай всички въпроси
              <Image
                src="/images/arrow-link.svg"
                alt=""
                width={14}
                height={22}
                className={`shrink-0 transition-transform ${motion} group-hover:translate-x-1`}
              />
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <FaqList items={visibleQuestions} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
