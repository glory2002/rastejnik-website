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

function PartnerMark({
  partner,
}: {
  partner: (typeof partners)[number];
}) {
  const isSvg = partner.src.endsWith(".svg");

  return (
    <Image
      src={partner.src}
      alt={partner.name}
      width={partner.width}
      height={partner.height}
      unoptimized={isSvg}
      className="h-[52px] w-auto object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 ease-out hover:opacity-100 hover:grayscale-0 sm:h-[72px]"
    />
  );
}

export function PartnersSection() {
  return (
    <section className="w-full bg-[#fefefc] py-section-quiet">
      <Container>
        <Reveal className="mx-auto mb-block max-w-[1000px] text-center">
          <Display weight="medium" as="h2">
            Партньори
          </Display>
        </Reveal>
      </Container>

      <div className="overflow-hidden">
        <div className="partners-marquee flex w-max items-center">
          <ul className="flex items-center gap-x-10 px-5 sm:gap-x-16 sm:px-8">
            {partners.map((partner) => (
              <li key={partner.name}>
                <PartnerMark partner={partner} />
              </li>
            ))}
          </ul>
          <ul
            aria-hidden
            className="partners-marquee__copy flex items-center gap-x-10 px-5 sm:gap-x-16 sm:px-8"
          >
            {partners.map((partner) => (
              <li key={`copy-${partner.name}`}>
                <PartnerMark partner={partner} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
