"use client";

import { useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/motion/transition-link";
import { Arrow } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { solutions } from "@/data/solutions";
import type { Project } from "@/data/projects";

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
      <div className={cn("mt-4", feature && "md:mt-7")}>
        <p className="font-kicker text-fg-muted">{project.type}</p>
        <h2 className={cn("font-title mt-1.5 text-fg", feature ? "text-[length:var(--text-h2)]" : "text-[length:var(--text-project)]")}>
          {project.title}
        </h2>
        {project.context && <p className="mt-2 max-w-[52ch] text-pretty leading-relaxed text-fg-muted">{project.context}</p>}
        {/* aparência de link; o alvo é o item inteiro */}
        <span className="link link-action mt-1 text-fg">
          <span className="link-label">Ver o case</span>
          <Arrow />
        </span>
      </div>
    </TransitionLink>
  );
}

const filters = [{ slug: "todos", name: "Todos", examples: [] as string[] }, ...solutions];

/**
 * O portfólio com um filtro pelas três frentes (as mesmas de Soluções, com os
 * mesmos exemplos). Em "Todos", a carta Toricelli em destaque e os demais em
 * duas colunas; filtrado, só os projetos daquela frente, em duas colunas. Os
 * itens entram juntos na troca, sem mudar a posição do filtro.
 */
export default function ProjectsExplorer({ projects, children }: { projects: Project[]; children?: React.ReactNode }) {
  const [filter, setFilter] = useState("todos");
  const active = filters.find((f) => f.slug === filter)!;
  const shown = filter === "todos" ? projects : projects.filter((p) => active.examples.includes(p.slug));
  const [feature, ...rest] = shown;
  const featured = filter === "todos";

  return (
    <>
      <div role="group" aria-label="Filtrar por frente" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.slug}
            type="button"
            aria-pressed={f.slug === filter}
            onClick={() => setFilter(f.slug)}
            className={cn("step-btn min-h-11 rounded-[var(--radius-choice)] px-4 text-[15px] font-medium", f.slug === filter && "is-current")}
          >
            {f.name}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} projetos
      </p>

      <div key={filter} className="mt-8 motion-safe:animate-[panel-in_420ms_cubic-bezier(0.22,1,0.36,1)] md:mt-12">
        {featured && feature && <PortfolioItem project={feature} feature priority />}
        <div className={cn("grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-20", featured && "mt-14 md:mt-24")}>
          {(featured ? rest : shown).map((p, i) => (
            <PortfolioItem key={p.slug} project={p} priority={i < 2} />
          ))}
          {children}
        </div>
      </div>
    </>
  );
}
