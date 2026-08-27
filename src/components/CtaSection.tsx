import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { DisplayBanner } from "@/components/ui/Typography";

export function CtaSection() {
  return (
    <section
      id="cta-section"
      className="relative w-full overflow-hidden bg-primary py-14 sm:py-20 md:py-40"
    >
      <Container className="relative z-20">
        <Reveal className="max-w-[950px] text-left">
          <DisplayBanner as="p" tone="white">
            Развитието не е състезание. Растежник помага да го наблюдавате, а не
            да го сравнявате.
          </DisplayBanner>
        </Reveal>
      </Container>
    </section>
  );
}
