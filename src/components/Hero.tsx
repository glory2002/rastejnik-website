import { Header } from "./Header";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLead } from "./ui/SectionLead";
import { DisplayHero } from "@/components/ui/Typography";

const HERO_VIDEO = "/videos/hero-video.mp4";
const HERO_POSTER = "/images/hero.jpg";

export function Hero() {
  return (
    <section className="relative w-full">
      <Header variant="framed" />

      <div className="bg-cream px-2.5 pb-1.5 md:px-4 md:pb-2.5 lg:px-8 lg:pb-3.5">
        <div className="relative h-hero min-h-hero w-full overflow-hidden sm:min-h-hero-sm md:min-h-hero-md">
          <div className="absolute inset-0 bg-primary-dark">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HERO_POSTER}
              className="h-full w-full object-cover object-center"
              aria-hidden
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </div>
          <div className="hero-video-scrim" aria-hidden />

          <Container className="relative flex h-full flex-col items-start justify-end pb-hero-block text-left sm:pb-hero-block-md lg:pb-hero-block-lg">
            <Reveal className="flex w-full max-w-hero-copy flex-col items-start gap-block lg:ml-hero-inset">
              <div className="flex w-full flex-col items-start gap-cluster">
                <DisplayHero className="max-w-hero-display">
                  Помагаме
                  <br />
                  на децата
                  <br />
                  да разцъфтят
                </DisplayHero>
                <SectionLead
                  tone="light"
                  size="hero"
                  className="hero-lead max-w-hero-lead"
                >
                  Кратки валидирани оценки на развитието - какво работи в
                  реалния живот: ритуали, граници, разговори, ежедневни.
                </SectionLead>
              </div>
              <Button className="max-w-full" href="/questionnaires">
                Направи Въпросника Безплатно
              </Button>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
