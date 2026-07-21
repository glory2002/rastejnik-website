import Image from "next/image";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const partners = [
  {
    name: "Зеленият морски двор на Варна",
    src: "/images/partner-zeleniyat-morski-dvor.png",
    width: 220,
    height: 76,
  },
  {
    name: "Медицински университет Варна",
    src: "/images/partner-mu-varna.png",
    width: 110,
    height: 110,
  },
  {
    name: "Морско казино Варна",
    src: "/images/partner-morsko-kazino-varna.png",
    width: 200,
    height: 90,
  },
];

export function PartnersSection() {
  return (
    <section className="w-full bg-[#fefefc] py-16 md:py-24">
      <Container>
        <Reveal
          as="h2"
          className="mx-auto mb-16 max-w-[1000px] text-center text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.04] text-primary"
        >
          Партньори
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 60}>
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-auto w-auto max-h-[90px] object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 ease-out hover:opacity-100 hover:grayscale-0"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
