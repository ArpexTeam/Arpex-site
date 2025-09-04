// components/cta.tsx
import Section from "./ui/section";
import { Button } from "./ui/button";
import Image from "next/image";
import bigLogo from "@/images/LOGOPNG 4.png";

export default function CTA() {
  return (
    <Section className="relative overflow-hidden bg-[#101010] py-16 md:py-24">
      {/* Logo decorativo de fundo — posicionado e dimensionado de forma responsiva */}
      <Image
        src={bigLogo}
        alt=""                 // decorativo
        aria-hidden
        priority={false}
        className="
          pointer-events-none select-none
          absolute left-0 bottom-0
          w-[520px] sm:w-[680px] md:w-[900px] lg:w-[1200px]
          
        "
      />

      {/* conteúdo acima do logo */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4">
        <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between gap-8 md:gap-24">
          {/* Esquerda: título forte */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-white font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
              Eleve sua marca com um 
              <br className="md:block" />
              site feito para impressionar!
            </h2>
          </div>

          {/* Direita: texto + botão */}
          <div className="w-full md:w-auto text-center md:text-left">
            <p className="text-white/80 md:ml-auto w-fit">
              Uma parceria que transforma projetos em grandes realizações.
            </p>
            <div className="mt-4 md:ml-auto w-fit md:w-auto mx-auto md:mx-0">
         <Button
  href={`https://wa.me/5519989812774?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')}`}
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
