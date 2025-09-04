// components/responsive-showcase.tsx
import Image from "next/image";
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import NetworkBg from "@/components/decor/networkbg";
import devices from "@/images/devices.png"; // troque se seu arquivo tiver outro nome
import bigLogo from "@/images/LOGOPNG 2.png";

function XBackdrop() {
  // “X” suave no fundo à esquerda
  return (
    <div aria-hidden className="absolute inset-y-0 left-0 -z-10 w-[55vw]">
      <div className="absolute left-[-8rem] top-1/2 -translate-y-1/2 h-[520px] w-[520px] rotate-45 rounded-3xl bg-white/5" />
      <div className="absolute left-[-4rem] top-1/2 -translate-y-1/2 h-[520px] w-[520px] -rotate-45 rounded-3xl bg-white/5" />
    </div>
  );
}

export default function ResponsiveShowcase() {
  return (
    <Section className="relative overflow-hidden bg-black py-22 md:py-32">
      {/* fundo escuro com leve gradiente */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a221b] to-[#04150E]" />

      {/* rede de linhas (um pouco sutil) */}

      {/* brilho verde à direita */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 right-[-15%] top-1/2 h-[680px] w-[680px] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,207,119,0.28), transparent 65%)",
        }}
      />

      {/* X decorativo à esquerda */}
      <XBackdrop />

      <div className="mx-auto w-full max-w-[1200px] px-4">
        <Image src={bigLogo} className="float-left absolute w-[500px] -top-24 left-0" alt="Layout responsivo em diferentes dispositivos"/>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Texto à esquerda */}
          <div className="relative">
            {/* ponto e linha que passam “atravessando” o título */}

            <H2 className="text-white text-3xl md:text-4xl">Design Responsivo</H2>
            <Sub className="mt-6 text-white/80 max-w-[56ch]">
              Garanta que seu site ofereça uma navegação impecável em qualquer
              dispositivo com um design responsivo que se ajusta a todas as telas.
            </Sub>

            <div className="mt-6 space-y-6 text-white/80 leading-relaxed">
              <p>
                Não se preocupe com o tipo de aparelho usado para acessar seu site;
                com um sistema responsivo, sua página se ajusta de forma ideal ao
                tamanho da tela, proporcionando uma usabilidade excepcional em
                qualquer plataforma.
              </p>
              <p>
                Além de ser favorecido pelos mecanismos de busca, um design
                responsivo melhora a performance e a velocidade de carregamento,
                garantindo uma única aplicação que se adapta perfeitamente a cada
                dispositivo.
              </p>
            </div>
          </div>

          {/* Imagem à direita com cenário/iluminação verde atrás */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative aspect-[4/3]">
              <Image
                src={devices}
                alt="Layout responsivo em diferentes dispositivos"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.40)]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
