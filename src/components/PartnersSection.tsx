import Image from "next/image";
import { Display } from "@/components/ui/Typography";
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
  {
    name: "Gloria",
    src: "/images/GL-logo.svg",
    width: 200,
    height: 83,
  },
];

export function PartnersSection() {
  return (
    <section className="w-full bg-[#fefefc] py-12 sm:py-16 md:py-24">
      <Container>
        <Reveal className="mx-auto mb-10 max-w-[1000px] text-center sm:mb-12 md:mb-16">
          <Display weight="medium" as="h2">
            Партньори
          </Display>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-16 sm:gap-y-10">
          {partners.map((partner, index) => {
            const isSvg = partner.src.endsWith(".svg");
            return (
              <Reveal key={partner.name} delay={index * 60}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  unoptimized={isSvg}
                  className="h-[52px] w-auto object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 ease-out hover:opacity-100 hover:grayscale-0 sm:h-[72px]"
                />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
