import { Button } from "@/components/ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { FaqList } from "./FaqList";
import { faqQuestions, FAQ_PREVIEW_LIMIT } from "@/data/faq";
import { Lead, Title } from "@/components/ui/Typography";

export function FaqSection() {
  const visibleQuestions = faqQuestions.slice(0, FAQ_PREVIEW_LIMIT);

  return (
    <section id="questionnaires" className="w-full bg-cream py-section">
      <Container>
        <div className="grid gap-block lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <Title className="text-balance">
                Бързи отговори на най-честите въпроси
              </Title>
            </Reveal>

            <Reveal delay={120}>
              <Lead className="mt-stack max-w-[360px]">
                Физическо и моторно развитие
                <br />
                Социално развитие
                <br />
                Език и говор, и др.
              </Lead>
            </Reveal>

            <Reveal delay={220}>
              <Button
                href="/faq"
                variant="secondary"
                size="l"
                className="mt-cluster w-fit max-w-full"
              >
                Разгледай всички въпроси
              </Button>
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
