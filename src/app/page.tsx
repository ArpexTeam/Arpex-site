import Hero from "@/components/hero/hero";
import Manifesto from "@/components/manifesto";
import OperationalMap from "@/components/operational-map/operational-map";
import Solutions from "@/components/solutions/solutions";
import ProjectArchive from "@/components/projects/project-archive";
import CrmShowcase from "@/components/ecosystem/crm-showcase";
import Method from "@/components/method/method";
import CtaFinal from "@/components/cta-final";
import Container from "@/components/ui/container";
import { H2, Label, Sub } from "@/components/ui/heading";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <OperationalMap />
      <Solutions />

      <section className="bg-ink py-28 md:py-36">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-[52ch]">
              <Label>Projetos</Label>
              <H2 className="mt-4">Entregas reais, não conceitos.</H2>
            </div>
            <Sub className="max-w-[40ch]">
              Um recorte do que a ArpeX já construiu — sites, sistemas e o próprio
              produto interno.
            </Sub>
          </div>

          <ProjectArchive limit={4} />

          <div className="mt-14">
            <Link href="/projetos" className="text-sm font-semibold text-ivory transition-colors hover:text-system">
              Ver arquivo completo de projetos →
            </Link>
          </div>
        </Container>
      </section>

      <CrmShowcase />
      <Method />
      <CtaFinal />
    </main>
  );
}
