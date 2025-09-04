// components/cta.tsx
import Section from "../ui/section";
import { Button } from "../ui/button";
import Image from "next/image";
import bigLogo from "@/images/LOGOPNG 4.png";

export default function CTA() {
  return (
    <Section className="relative overflow-hidden bg-bg py-12">
      {/* Logo decorativo de fundo (sem float; atrás do conteúdo) */}
      <Image
        src={bigLogo}
        alt=""
        aria-hidden
        priority={false}
        sizes="(max-width: 768px) 70vw, (max-width: 1024px) 50vw, 800px"
        className="
          pointer-events-none select-none
          absolute left-0 bottom-0
          w-[420px] sm:w-[560px] md:w-[680px] lg:w-[800px]
          opacity-10 md:opacity-20
          -z-10
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8 md:gap-24">
          {/* Esquerda: título forte */}
          <div className="w-full md:w-8/12 text-center md:text-left">
            <h2 className="text-white font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
              Vamos tirar seu projeto do papel!
              <br className="block" />
              <span className="hidden md:block">
              Fale conosco e inicie seu site!
              </span>
            </h2>
          </div>

          {/* Direita: botão */}
          <div className="mx-auto md:mx-0 md:w-auto">
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
    </Section>
  );
}
