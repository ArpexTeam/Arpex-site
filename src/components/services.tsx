// components/services.tsx
import Image from "next/image";
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import NetworkBg2 from "@/components/decor/networkbg2";
import laptop from "@/images/laptop.png";

export default function Services() {
  return (
    <Section className="relative overflow-hidden bg-black py-24 md:py-44">
      {/* rede de fundo */}
      <div className="hidden md:block">
        <NetworkBg2 strength="medium" />
      </div>

      {/* wrapper interno — mantém seu baseline (container do Section + este max-w) */}
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="grid items-center gap-10 md:gap-12 md:grid-cols-2">
          {/* texto */}
          <div>
            <H2 className="text-white text-3xl md:text-4xl">
              Desenvolvimento de sites
            </H2>

            <Sub className="mt-8 md:mt-12 text-white/80 text-base md:text-lg">
              Sites personalizados, desenvolvidos para impulsionar os
              resultados do seu negócio.
            </Sub>

            <div className="mt-8 md:mt-12 space-y-4 text-zinc-300/90 leading-relaxed text-[15px] ">
              <p>
                Em um mercado cada vez mais digital, um site bem planejado é
                mais do que um simples canal — é a porta de entrada para novos
                clientes e o elo entre sua empresa e o público.
              </p>
              <p>
                Criamos sites sob medida, desenvolvidos para refletir a
                identidade e os valores da sua marca, ao mesmo tempo em que
                entregam uma experiência intuitiva e envolvente.
              </p>
              <p>
                Nossa equipe transforma ideias em realidade com técnicas
                inovadoras e estratégias focadas nos seus objetivos, colocando
                seu negócio à frente.
              </p>
            </div>
          </div>

          {/* imagem + shapes de fundo */}
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* shapes — só em md+ pra não poluir no mobile */}
            <div
              aria-hidden
              className="hidden md:block absolute -z-10 right-[-24px] top-[-16px] h-[320px] w-[360px] rounded-[56px] bg-[#0b382c]/70"
            />
            <div
              aria-hidden
              className="hidden md:block absolute -z-10 right-[16px] top-[32px] h-[260px] w-[300px] rounded-[44px] bg-[#134c3d]/70 ring-1 ring-white/10"
            />

            {/* garantir altura > 0 para o Image fill */}
            <div className="relative aspect-[4/3]">
              <Image
                src={laptop}
                alt="Mock de site em notebook"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 520px"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
