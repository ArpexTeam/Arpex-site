import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/container";
import { H1, H2, Label } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { waLink } from "@/data/social-links";
import arpexFachada from "@/images/aboutusarpex 1.png";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A ArpeX Technology é uma empresa de tecnologia sob medida que transforma processos improvisados em sistemas, automações e experiências digitais.",
  alternates: { canonical: "/sobre" },
};

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

export default function SobrePage() {
  return (
    <main className="bg-ink pt-[72px]">
      <section className="py-24 md:py-32">
        <Container>
          <Label>Sobre a ArpeX</Label>
          <H1 className="mt-6 max-w-[22ch]">
            O sistema já existia. Ele só estava espalhado.
          </H1>
        </Container>
      </section>

      <section className="pb-28 md:pb-36">
        <Container className="grid grid-cols-1 items-start gap-14 md:grid-cols-2">
          <div className="max-w-[56ch]">
            <H2>Um pouco sobre nós</H2>
            <p className="mt-5 leading-relaxed text-muted">
              A ArpeX Technology desenvolve software personalizado para organizar
              operações, automatizar processos, criar aplicativos, estruturar soluções
              financeiras e construir experiências digitais com impacto real.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Nosso trabalho começa antes do desenvolvimento: entendemos o contexto do
              cliente, identificamos gargalos e definimos a tecnologia que faz sentido
              para o momento do negócio.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Mais do que executar, buscamos construir com direção, clareza de escopo e
              proximidade real com quem vai usar a solução no dia a dia.
            </p>

            <div className="mt-8">
              <Button
                href={waLink("Olá! Vim pela página sobre e quero entender como a ArpeX pode ajudar meu negócio.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar com a ArpeX
              </Button>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-smoke bg-graphite">
            <Image
              src={arpexFachada}
              alt="Fachada da ArpeX Technology"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 560px, 92vw"
              priority
            />
          </div>
        </Container>

        <Container className="mt-16">
          <ul className="grid gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <li key={item.title} className="rounded-xl border border-smoke bg-graphite p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-system">{item.title}</p>
                <p className="mt-4 leading-relaxed text-muted">{item.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
