import Image from "next/image";
import Section from "@/components/ui/section";
import { H1, Sub } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import NetworkBg from "@/components/decor/networkbg";
import woman from "@/images/woman.png";

const waLink = `https://wa.me/5519988935849?text=${encodeURIComponent(
  "Olá! Vim pelo site e quero entender qual solução faz mais sentido para a operação do meu negócio."
)}`;

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <Section className="relative bg-gradient-to-br from-surface to-bg pt-24">
        <div className="hidden md:block">
          <NetworkBg />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-10 -top-24 h-[420px] w-[420px] rounded-full blur-3xl md:left-[200px] md:-top-20 md:h-[600px] md:w-[600px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,207,119,0.25), transparent 70%)",
          }}
        />

        <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-center gap-8 md:flex-row md:justify-between md:gap-10">
          <div className="relative z-10 w-full pb-12 text-center md:w-8/12 md:pb-24 md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Fábrica de software para empresas em crescimento
            </p>

            <H1 className="mt-4 text-white uppercase tracking-tight">
              Sistemas, automações e produtos digitais feitos sob medida para o seu negócio.
            </H1>

            <Sub className="mx-auto mt-4 max-w-[46ch] text-white md:mx-0">
              A ArpeX desenvolve software personalizado para organizar operações,
              automatizar processos, criar aplicativos, estruturar soluções financeiras
              e construir experiências digitais com impacto real.
            </Sub>

            <div className="mt-8 flex justify-center gap-4 md:justify-start">
              <Button href={waLink} className="rounded-sm px-8 font-semibold" target="_blank">
                Quero diagnosticar minha operação
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] md:w-8/12">
            <div className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[520px] lg:min-h-[560px]">
              <Image
                src={woman}
                alt="Profissional analisando soluções digitais"
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
