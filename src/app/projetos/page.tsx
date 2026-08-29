import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { H1, Label, Sub } from "@/components/ui/heading";
import ProjectArchive from "@/components/projects/project-archive";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Arquivo editorial com os projetos reais da ArpeX: sites, sistemas e o produto próprio ArpeX CRM.",
  alternates: { canonical: "/projetos" },
};

export default function ProjetosPage() {
  return (
    <main className="bg-ink pt-[72px]">
      <section className="py-24 md:py-32">
        <Container>
          <Label>Arquivo</Label>
          <H1 className="mt-6 max-w-[22ch]">Entregas reais, não conceitos.</H1>
          <Sub className="mt-6 max-w-[56ch]">
            Cada projeto aqui já foi construído, publicado e usado. A atuação da
            ArpeX vai além de sites — inclui software sob medida, automação e
            operação.
          </Sub>
        </Container>
      </section>

      <section className="pb-28 md:pb-36">
        <Container>
          <ProjectArchive />
        </Container>
      </section>
    </main>
  );
}
