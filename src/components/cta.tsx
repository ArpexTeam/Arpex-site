import Section from "./ui/section";
import { Button } from "./ui/button";
import Image from "next/image";
import bigLogo from "@/images/LOGOPNG 4.png";

const waLink = `https://wa.me/5519988935849?text=${encodeURIComponent(
  "Olá! Vim pelo site e quero falar sobre uma solução personalizada para a minha empresa."
)}`;

export default function CTA() {
  return (
    <Section className="relative overflow-hidden bg-[#101010] py-16 md:py-24">
      <Image
        src={bigLogo}
        alt=""
        aria-hidden
        priority={false}
        className="pointer-events-none absolute bottom-0 left-0 select-none w-[520px] sm:w-[680px] md:w-[900px] lg:w-[1200px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-24">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h2 className="text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl">
              Leve sua empresa para outro nível com
              <br className="md:block" />
              tecnologia feita para a sua realidade.
            </h2>
          </div>

          <div className="w-full text-center md:w-auto md:text-left">
            <p className="w-fit text-white/80 md:ml-auto">
              Clareza de escopo, execução forte e foco no que gera valor de verdade.
            </p>
            <div className="mx-auto mt-4 w-fit md:mx-0 md:ml-auto">
              <Button href={waLink} className="rounded-sm px-8 font-semibold" target="_blank">
                Falar sobre minha operação
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
