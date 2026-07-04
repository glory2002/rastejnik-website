import { Header } from "./Header";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const HERO_VIDEO = "/videos/hero-video.mp4";
const HERO_POSTER = "/images/hero.jpg";

export function Hero() {
  return (
    <section className="relative w-full">
      <Header variant="framed" />

      <div className="bg-cream px-5 pb-6 md:px-8 md:pb-10 lg:px-16 lg:pb-14">
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
              <h1 className="max-w-[600px] text-[clamp(2.5rem,6.4vw,88px)] font-medium leading-[1.04] text-white">
                Помагаме на децата да разцъфтят
              </h1>
              <p className="mt-6 max-w-[440px] text-lg leading-[1.3] text-white/85">
                Кратки валидирани оценки на развитието - какво работи в
                реалния живот: ритуали, граници, разговори, ежедневни.
              </p>
              <Button className="mt-10">Направи Теста Безплатно</Button>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
