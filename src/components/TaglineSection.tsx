import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { DisplayBanner } from "@/components/ui/Typography";

export function TaglineSection() {
  return (
    <section
      id="tagline-section"
      className="relative w-full overflow-hidden bg-cream py-24 md:py-40"
    >
      <Container className="relative z-20">
        <Reveal className="max-w-[950px]">
          <DisplayBanner as="p">
            Всяко дете има свое темпо. Ние сме тук, за да ви помогнем да го
            разберете.
          </DisplayBanner>
        </Reveal>
      </Container>
    </section>
  );
}
