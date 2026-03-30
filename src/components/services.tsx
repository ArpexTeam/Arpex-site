import Image from "next/image";
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import NetworkBg2 from "@/components/decor/networkbg2";
import laptop from "@/images/laptop.png";

export default function Services() {
  return (
    <Section id="servicos" className="relative overflow-hidden bg-black py-24 md:py-44">
      <div className="hidden md:block">
        <NetworkBg2 strength="medium" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <H2 className="text-3xl text-white md:text-4xl">
              Fábrica de software para operação, crescimento e escala
            </H2>

            <Sub className="mt-8 text-base text-white/80 md:mt-12 md:text-lg">
              Sistemas sob medida, automações, aplicativos, integrações, soluções
              financeiras e ativos digitais construídos para a realidade da sua empresa.
            </Sub>

            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-zinc-300/90 md:mt-12">
              <p>
                Em muitas empresas, a operação cresce mais rápido do que a estrutura.
                Planilhas, mensagens e ferramentas soltas começam a travar o fluxo,
                reduzir previsibilidade e limitar a tomada de decisão.
              </p>
              <p>
                A ArpeX entra nesse contexto para desenhar e desenvolver a tecnologia
                certa para o momento do negócio, seja um sistema interno, uma automação,
                um app, um portal, uma lógica financeira ou uma experiência digital.
              </p>
              <p>
                Nosso foco não é empurrar um formato pronto. O foco é construir uma
                solução que organize a operação, gere ganho real de tempo e acompanhe
                a evolução da empresa com robustez.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              aria-hidden
              className="absolute right-[-24px] top-[-16px] -z-10 hidden h-[320px] w-[360px] rounded-[56px] bg-[#0b382c]/70 md:block"
            />
            <div
              aria-hidden
              className="absolute right-[16px] top-[32px] -z-10 hidden h-[260px] w-[300px] rounded-[44px] bg-[#134c3d]/70 ring-1 ring-white/10 md:block"
            />

            <div className="relative aspect-[4/3]">
              <Image
                src={laptop}
                alt="Estrutura digital e software sob medida"
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
