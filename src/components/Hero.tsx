import { Header } from "./Header";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const HERO_VIDEO = "/videos/hero-video.mp4";
const HERO_POSTER = "/images/hero.jpg";

export function Hero() {
  return (
    <section className="relative h-[92dvh] min-h-[600px] max-h-[900px] w-full overflow-hidden">
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
        className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.58)] via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.18)]"
        aria-hidden
      />

      <Header />

      <Container className="relative flex flex-col items-center justify-center pb-20 pt-32 text-center md:pt-40 lg:h-[92dvh] lg:min-h-[600px] lg:max-h-[900px]">
        <Reveal className="flex flex-col items-center">
          <h1 className="max-w-[710px] text-[clamp(2.5rem,5vw,4.875rem)] font-medium leading-[1.04] text-white">
            Помагаме на децата да разцъфтят
          </h1>
          <Button className="mt-10">Направи Теста Безплатно</Button>
        </Reveal>
      </Container>
    </section>
  );
}
