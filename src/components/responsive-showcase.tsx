import Image from "next/image";
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import devices from "@/images/devices.png";
import bigLogo from "@/images/LOGOPNG 2.png";

function XBackdrop() {
  return (
    <div aria-hidden className="absolute inset-y-0 left-0 -z-10 w-[55vw]">
      <div className="absolute left-[-8rem] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rotate-45 rounded-3xl bg-white/5" />
      <div className="absolute left-[-4rem] top-1/2 h-[520px] w-[520px] -translate-y-1/2 -rotate-45 rounded-3xl bg-white/5" />
    </div>
  );
}

export default function ResponsiveShowcase() {
  return (
    <Section className="relative overflow-hidden bg-black py-22 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a221b] to-[#04150E]" />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-1/2 -z-10 h-[680px] w-[680px] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,207,119,0.28), transparent 65%)",
        }}
      />

      <XBackdrop />

      <div className="mx-auto w-full max-w-[1200px] px-4">
        <Image
          src={bigLogo}
          className="absolute left-0 -top-24 float-left w-[500px]"
          alt="Ecossistema digital em diferentes dispositivos"
        />
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <H2 className="text-3xl text-white md:text-4xl">
              Tecnologia que acompanha a complexidade do negócio
            </H2>
            <Sub className="mt-6 max-w-[56ch] text-white/80">
              Quando a empresa cresce, ela precisa de processos mais claros,
              informação centralizada e ferramentas que funcionem como parte da operação.
            </Sub>

            <div className="mt-6 space-y-6 leading-relaxed text-white/80">
              <p>
                É nesse ponto que sistemas sob medida, automações, aplicativos,
                dashboards, portais e integrações passam a fazer sentido. Eles deixam
                de ser acessórios e se tornam base para a empresa operar melhor.
              </p>
              <p>
                A ArpeX atua exatamente nessa virada: entende o contexto, define a
                arquitetura da solução e constrói a tecnologia certa para dar mais
                clareza, velocidade e consistência ao crescimento.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative aspect-[4/3]">
              <Image
                src={devices}
                alt="Ecossistema digital em diferentes dispositivos"
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
