// components/cta-band.tsx
import Section from "@/components/ui/section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import bigLogo from "@/images/LOGOPNG 3.png";

export default function CtaBand() {
  return (
    <Section className="relative overflow-hidden py-16 md:py-24 bg-bg">
      {/* Logo decorativo de fundo */}
      <Image
        src={bigLogo}
        alt=""                         // decorativo
        aria-hidden
        priority={false}
        className="
          pointer-events-none select-none
          absolute left-0 bottom-0
          w-[520px] sm:w-[720px] lg:w-[1000px]
          
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4">
        <div className="grid items-center gap-8 md:grid-cols-2 text-center md:text-left">
          {/* Esquerda: título grande */}
          <h2 className="text-white font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Aqui nascem projetos que
            <br className="" />
            fazem a diferença.
          </h2>

          {/* Direita: texto + botão */}
          <div className="md:justify-self-end">
            <p className="text-white/80 max-w-[38ch]">
              Uma parceria que transforma<br /> projetos em grandes realizações.
            </p>
            <div className="mt-4">
       <Button
  href={`https://wa.me/5519988935849?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')}`}
  className="px-8 font-semibold rounded-sm"
  target="_blank"
>
  Faça um orçamento
</Button>

            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
