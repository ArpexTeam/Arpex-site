import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { H1, H2, Label, Sub } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { waLink } from "@/data/social-links";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Sistemas sob medida, automação e IA, apps e produtos, e experiências digitais — as quatro frentes que a ArpeX conecta em um único sistema.",
  alternates: { canonical: "/solucoes" },
};

export default function SolucoesPage() {
  return (
    <main className="bg-ink pt-[72px]">
      <section className="py-24 md:py-32">
        <Container>
          <Label>Soluções</Label>
          <H1 className="mt-6 max-w-[20ch]">Quatro frentes. Um sistema só.</H1>
          <Sub className="mt-6 max-w-[56ch]">
            Não vendemos serviços isolados. Cada frente existe para se conectar às
            outras dentro da operação do cliente — essa é a diferença entre contratar
            uma entrega e organizar um sistema.
          </Sub>
        </Container>
      </section>

      <section className="pb-28 md:pb-36">
        <Container>
          <ul className="border-t border-smoke">
            {services.map((service) => (
              <li key={service.slug} id={service.slug} className="border-b border-smoke py-14 md:py-16">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[80px_1fr] md:gap-10">
                  <span className="font-label text-muted">{service.index}</span>
                  <div className="max-w-[64ch]">
                    <H2>{service.name}</H2>
                    <p className="mt-4 text-[length:var(--text-body-lg)] leading-relaxed text-ivory">
                      {service.headline}
                    </p>
                    <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex justify-center">
            <Button
              href={waLink("Olá! Vim pela página de soluções e quero entender qual frente faz mais sentido para minha empresa.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mapear minha operação
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
