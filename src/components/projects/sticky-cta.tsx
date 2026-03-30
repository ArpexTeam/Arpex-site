import Section from "../ui/section";
import { Button } from "../ui/button";
import Image from "next/image";
import bigLogo from "@/images/LOGOPNG 4.png";

const waLink = `https://wa.me/5519988935849?text=${encodeURIComponent(
  "Olá! Vim pela página de projetos e quero conversar sobre uma solução personalizada."
)}`;

export default function StickyCta() {
  return (
    <Section className="relative overflow-hidden bg-bg py-12">
      <Image
        src={bigLogo}
        alt=""
        aria-hidden
        priority={false}
        sizes="(max-width: 768px) 70vw, (max-width: 1024px) 50vw, 800px"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 w-[420px] select-none opacity-10 sm:w-[560px] md:w-[680px] md:opacity-20 lg:w-[800px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-24">
          <div className="w-full text-center md:w-8/12 md:text-left">
            <h2 className="text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl">
              Seu projeto pode ser o próximo case da ArpeX.
              <br className="block" />
              <span className="hidden md:block">Comece pelo diagnóstico certo.</span>
            </h2>
          </div>

          <div className="mx-auto md:mx-0 md:w-auto">
            <Button href={waLink} className="rounded-sm px-8 font-semibold" target="_blank">
              Conversar sobre uma solução
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
