import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/layout/page-intro";
import TransitionLink from "@/components/motion/transition-link";
import { Arrow, Button } from "@/components/ui/button";
import { listedProjects, type Project } from "@/data/projects";
import { contactHref } from "@/data/contact";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "O que a ArpeX construiu: a carta de vinhos 3D da Toricelli, sites para Chef Bruno Sushi, Lux Bartenders e Honoratto Tattoo, o sistema Flor de Maria VIP e o ArpeX CRM.",
  alternates: { canonical: "/projetos" },
};

/**
 * Item do portfólio: a imagem grande e, abaixo, categoria, nome, uma frase e
 * o link. O item inteiro abre o case; a capa mantém o viewTransitionName da
 * transição para a página do case.
 */
function PortfolioItem({ project, feature, priority }: { project: Project; feature?: boolean; priority?: boolean }) {
  return (
    <TransitionLink href={`/projetos/${project.slug}`} data-link-host className="focus-ring group/item block rounded-[var(--radius-frame)]">
      {project.cover && (
        <div className="frame relative aspect-[16/10]" style={{ viewTransitionName: `case-${project.slug}` }}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes={feature ? "(min-width: 1440px) 1340px, 94vw" : "(min-width: 768px) 46vw, 94vw"}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/item:scale-[1.02] group-focus-visible/item:scale-[1.02]"
          />
        </div>
      )}
      <div className={cn("mt-5", feature && "md:mt-7")}>
        <p className="font-kicker text-fg-muted">{project.type}</p>
        <h2 className={cn("font-title mt-1.5 text-fg", feature ? "text-[length:var(--text-h2)]" : "text-[length:var(--text-project)]")}>
          {project.title}
        </h2>
        {project.context && <p className="mt-2 max-w-[52ch] text-pretty leading-relaxed text-fg-muted">{project.context}</p>}
        {/* aparência de link; o alvo é o item inteiro */}
        <span className="link link-action mt-2 text-fg">
          <span className="link-label">Ver o case</span>
          <Arrow />
        </span>
      </div>
    </TransitionLink>
  );
}

export default function ProjetosPage() {
  const [feature, ...rest] = listedProjects;
  return (
    <main>
      <PageIntro title="Projetos" lead="Sites, sistemas e uma carta digital em 3D. Em cada case, o desafio e o que foi entregue." />

      <section aria-label="Portfólio" className="surface-ink pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          {/* Carta Toricelli em destaque; os demais em duas colunas */}
          <PortfolioItem project={feature} feature priority />

          <div className="mt-16 grid gap-x-6 gap-y-14 md:mt-24 md:grid-cols-2 md:gap-y-20">
            {rest.map((p, i) => (
              <PortfolioItem key={p.slug} project={p} priority={i < 2} />
            ))}
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
          </div>
        </div>
      </section>
    </main>
  );
}
