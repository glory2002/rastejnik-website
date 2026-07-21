import { Header } from "./Header";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionLead } from "./ui/SectionLead";

const HERO_VIDEO = "/videos/hero-video.mp4";
const HERO_POSTER = "/images/hero.jpg";

export function Hero() {
  return (
    <section className="relative w-full">
      <Header variant="framed" />

      <div className="bg-cream px-2.5 pb-1.5 md:px-4 md:pb-2.5 lg:px-8 lg:pb-3.5">
        <div className="relative h-[85dvh] min-h-[560px] max-h-[860px] w-full overflow-hidden">
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
            className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.28)] to-[rgba(0,0,0,0.02)]"
            aria-hidden
          />

          <Container className="relative flex h-full flex-col items-start justify-center pb-10 text-left lg:pl-[130px]!">
            <Reveal className="flex flex-col items-start">
              <h1 className="max-w-[600px] text-[clamp(2.5rem,6.4vw,88px)] font-medium leading-[1] text-white">
                Помагаме на децата да разцъфтят
              </h1>
              <SectionLead tone="light" className="mt-6 max-w-[440px]">
                Кратки валидирани оценки на развитието - какво работи в
                реалния живот: ритуали, граници, разговори, ежедневни.
              </SectionLead>
              <Button className="mt-10">Направи Въпросника Безплатно</Button>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
