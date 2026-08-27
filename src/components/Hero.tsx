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
        <div className="relative h-[min(85dvh,860px)] min-h-[420px] w-full overflow-hidden sm:min-h-[520px] md:min-h-[560px]">
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
          <div
            className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.08)] sm:from-[rgba(0,0,0,0.65)] sm:via-[rgba(0,0,0,0.28)] sm:to-[rgba(0,0,0,0.02)]"
            aria-hidden
          />

          <Container className="relative flex h-full flex-col items-start justify-end pb-8 text-left sm:justify-center sm:pb-10 lg:pl-[130px]!">
            <Reveal className="flex w-full max-w-[600px] flex-col items-start">
              <DisplayHero className="max-w-[600px] text-balance">
                Помагаме на децата да разцъфтят
              </DisplayHero>
              <SectionLead tone="light" className="mt-4 max-w-[440px] sm:mt-6">
                Кратки валидирани оценки на развитието - какво работи в
                реалния живот: ритуали, граници, разговори, ежедневни.
              </SectionLead>
              <Button className="mt-8 max-w-full sm:mt-10" href="/questionnaires">
                Направи Въпросника Безплатно
              </Button>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
