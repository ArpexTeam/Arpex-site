import Image from "next/image";
import Section from "@/components/ui/section";
import { H1, H2 } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import mosaic from "@/images/Formas.png";
import arpexFachada from "@/images/aboutusarpex 1.png";

const waLink = `https://wa.me/5519988935849?text=${encodeURIComponent(
  "Olá! Vim pela página sobre e quero entender como a ArpeX pode ajudar meu negócio."
)}`;

const principles = [
  {
    title: "Diagnóstico",
    desc: "Entendemos o contexto antes de propor tecnologia, para construir a solução certa para o momento da empresa.",
  },
  {
    title: "Execução",
    desc: "Desenvolvemos software com clareza técnica, robustez, estética visual e foco em valor operacional real.",
  },
  {
    title: "Parceria",
    desc: "Atuamos lado a lado com o cliente para que escopo, prioridades e evolução façam sentido para o negócio.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative">
      <Section className="relative overflow-hidden bg-gradient-to-b from-surface to-bg">
        <div className="mx-auto mt-10 flex w-full max-w-[1200px] items-center justify-between gap-6 px-4 md:gap-10 md:mt-0">
          <div className="w-[400px] max-w-full md:w-auto">
            <p className="mb-4 text-xs uppercase tracking-widest text-white">
              Fábrica de software com atendimento consultivo
            </p>
            <H1 className="text-white">
              Muito mais do que uma
              <br /> empresa de sites.
            </H1>
            <p className="mt-5 max-w-[44ch] text-white/75">
              A ArpeX desenvolve sistemas, automações, aplicativos, soluções
              financeiras e ativos digitais para empresas que precisam crescer com
              mais estrutura.
            </p>
          </div>

          <div className="relative hidden h-[300px] w-[400px] md:block md:h-[360px] md:w-[360px] lg:h-[420px] lg:w-[420px]">
            <Image src={mosaic} alt="Formas" className="h-full w-auto" />
          </div>
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-gradient-to-r from-[#1A1A1A] to-black py-22 md:py-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 500px at 70% 20%, rgba(255,255,255,0.06), transparent 55%), linear-gradient(180deg, #0f0f0f, #0b0b0b)",
          }}
        />

        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-10 px-4 md:grid-cols-2">
          <div className="max-w-[56ch]">
            <H2 className="text-white">Um pouco sobre nós</H2>

            <p className="mt-4 text-white/80">
              A ArpeX Technology é uma fábrica de software focada em soluções
              personalizadas. Nosso trabalho começa antes do desenvolvimento:
              entendemos o contexto do cliente, identificamos gargalos e definimos a
              tecnologia que faz sentido para o momento do negócio.
            </p>
            <p className="mt-4 text-white/80">
              Criamos sistemas internos, automações, aplicativos, portais,
              integrações, soluções financeiras e experiências digitais para ajudar
              empresas a ganhar controle, eficiência e capacidade de evolução.
            </p>
            <p className="mt-4 text-white/80">
              Mais do que executar, buscamos construir com direção, clareza de escopo
              e proximidade real com quem vai usar a solução no dia a dia.
            </p>

            <div className="mt-6">
              <Button href={waLink} className="rounded-sm px-8 font-semibold" target="_blank">
                Conversar com a ArpeX
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-white/[0.06]">
              <Image
                src={arpexFachada}
                alt="Fachada da ArpeX Technology"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 560px, 92vw"
                priority={false}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-[1200px] gap-4 px-4 md:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-sm border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {item.title}
              </p>
              <p className="mt-4 leading-relaxed text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
