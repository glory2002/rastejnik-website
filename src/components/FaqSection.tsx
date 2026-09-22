import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLead } from "./ui/SectionLead";
import { FaqList } from "./FaqList";
import { faqQuestions, FAQ_PREVIEW_LIMIT } from "@/data/faq";
import { Action, Display } from "@/components/ui/Typography";

const motion = "duration-200 ease-out motion-reduce:transition-none";

export function FaqSection() {
  const visibleQuestions = faqQuestions.slice(0, FAQ_PREVIEW_LIMIT);

  return (
    <section id="questionnaires" className="w-full bg-cream py-section">
      <Container>
        <div className="grid gap-block lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <Display weight="medium" as="h2" className="text-balance">
                Бързи отговори на най-честите въпроси
              </Display>
            </Reveal>

            <Reveal delay={120}>
              <SectionLead className="mt-stack max-w-[360px]">
                Физическо и моторно развитие
                <br />
                Социално развитие
                <br />
                Език и говор, и др.
              </SectionLead>
            </Reveal>

            <Reveal delay={220}>
              <Link
                href="/faq"
                className={`group mt-cluster inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border-[1.5px] border-secondary px-5 py-3 transition-colors sm:px-6 sm:py-3.5 ${motion} hover:border-primary`}
              >
                <Action className="inline-flex items-center gap-1.5">
                  Разгледай всички въпроси
                  <Image
                    src="/images/arrow-link.svg"
                    alt=""
                    width={14}
                    height={22}
                    className={`shrink-0 transition-transform ${motion} group-hover:translate-x-1`}
                  />
                </Action>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <FaqList items={visibleQuestions} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
