import type { Metadata } from "next";
import PageIntro from "@/components/layout/page-intro";
import ProjectsExplorer from "@/components/projects/projects-explorer";
import { Button } from "@/components/ui/button";
import { listedProjects } from "@/data/projects";
import { contactHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "O que a ArpeX construiu: a carta de vinhos 3D da Toricelli, sites para Chef Bruno Sushi, Lux Bartenders e Honoratto Tattoo, o sistema Flor de Maria VIP e o ArpeX CRM.",
  alternates: { canonical: "/projetos" },
};

export default function ProjetosPage() {
  return (
    <main>
      <PageIntro title="Projetos" lead="Sites, sistemas e uma carta digital em 3D. Em cada case, o desafio e o que foi entregue." />

      <section aria-label="Portfólio" className="surface-ink pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <ProjectsExplorer projects={listedProjects}>
            {/* fecha a grade: com número ímpar de projetos, ocupa a última célula */}
            <div className="flex flex-col justify-center border-t border-rule pt-8 md:border-0 md:pt-0">
              <p className="font-title max-w-[22ch] text-balance text-[length:var(--text-project)] text-fg">
                Tem uma necessidade parecida?
              </p>
              <p className="mt-3 max-w-[44ch] text-pretty leading-relaxed text-fg-muted">Conte o que está acontecendo na sua empresa.</p>
              <div className="mt-6">
                <Button href={contactHref("entender")}>Falar com a ArpeX</Button>
              </div>
            </div>
          </ProjectsExplorer>
        </div>
      </section>
    </main>
  );
}
