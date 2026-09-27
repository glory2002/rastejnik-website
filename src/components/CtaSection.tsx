import { Container } from "./ui/Container";
import { CtaShevitsa } from "./CtaShevitsa";
import { Reveal } from "./ui/Reveal";
import { Display } from "@/components/ui/Typography";

export function CtaSection() {
  return (
    <div className="w-full bg-cream px-2.5 md:px-4 lg:px-8">
      <section
        id="cta-section"
        className="relative w-full overflow-hidden bg-primary py-section-emphasis"
      >
        <CtaShevitsa />
        <Container className="relative z-20">
          <Reveal className="max-w-[950px] text-left">
            <Display as="p" weight="medium" tone="white">
              Развитието не е състезание. Растежник помага да го наблюдавате, а
              не да го сравнявате.
            </Display>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
