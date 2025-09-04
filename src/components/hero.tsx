// components/hero.tsx
import Image from "next/image";
import Section from "@/components/ui/section";
import { H1, Sub } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import NetworkBg from "@/components/decor/networkbg";
import woman from "@/images/woman.png";
// opcional: baseline perfeito 1:1
// import { useBaselineWidth } from "@/rwd/useBaselineWidth";

export default function Hero() {
  // useBaselineWidth(); // <- ative se quiser “congelar” o baseline automaticamente

  return (
    <div className="relative overflow-hidden">
      <Section className="relative bg-gradient-to-br from-surface to-bg pt-24">
        {/* rede sutil (oculta no mobile pra reduzir ruído visual) */}
        <div className="hidden md:block">
          <NetworkBg />
        </div>

        {/* brilho verde suave atrás — ajustado para não invadir no mobile */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-10 md:left-[200px] -top-24 md:-top-20 h-[420px] w-[420px] md:h-[600px] md:w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,207,119,0.25), transparent 70%)",
          }}
        />

        {/* 
          Wrapper principal:
          - Default (>= desktop): preserva seu layout atual (gap, max-w, etc)
          - Em telas < md: empilha e centraliza 
        */}
        <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-center gap-8 md:gap-10 md:flex-row md:justify-between">
          {/* Texto */}
          <div className="relative z-10 w-full md:w-8/12 pb-12 md:pb-24 text-center md:text-left">
            <H1 className="uppercase tracking-tight text-white ">
              Deixe sua marca na web com um site projetado exclusivamente{" "}
              <span className="text-brand">para você.</span>
            </H1>

            <Sub className="mt-4 max-w-[46ch] text-zinc-300 text-white mx-auto md:mx-0">
              Agência de criação de sites web, mobile e plataformas digitais
              para empresas, focada em inovação e resultados excepcionais.
            </Sub>

            <div className="mt-8 flex gap-4 justify-center md:justify-start">
      <Button
  href={`https://wa.me/5519989812774?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')}`}
  className="px-8 font-semibold rounded-sm"
  target="_blank"
>
  Faça um orçamento
</Button>

            </div>
          </div>

          {/* Imagem (mantive seu max-w 560px no desktop; no mobile dá respiro/ratio) */}
        <div className="relative mx-auto w-full md:w-8/12 max-w-[560px]">
  <div className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[520px] lg:min-h-[560px]">
    <Image
      src={woman}
      alt="Profissional sorrindo com notebook"
      fill
      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 560px"
      className="object-contain"
      priority
    />
  </div>
</div>
        </div>
      </Section>
    </div>
  );
}
