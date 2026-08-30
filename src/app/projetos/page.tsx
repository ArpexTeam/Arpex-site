import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { H1, Label, Sub } from "@/components/ui/heading";
import ProjectArchive from "@/components/projects/project-archive";
import ScrollRail from "@/components/projects/scroll-rail";
import ScrollRailMobile from "@/components/projects/scroll-rail-mobile";

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
          <div className="relative">
            <ScrollRail targetId="projects-scroller" easing={1.8} />
            <ScrollRailMobile targetId="projects-scroller" easing={1.8} />

            <div
              id="projects-scroller"
              className="no-scrollbar relative pl-4 md:h-[70vh] md:overflow-y-auto md:overscroll-contain md:pl-0 md:pr-4"
            >
              <ProjectArchive />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
