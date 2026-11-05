import Link from "next/link";
import { featuredProjects, listedProjects } from "@/data/projects";
import { Arrow } from "@/components/ui/button";
import ProjectChapter from "./project-chapter";

/** Cases como evidência: dois ou três capítulos completos; o restante fica em /projetos. */
export default function SelectedProjects() {
  const first = featuredProjects[0];
  const last = featuredProjects[featuredProjects.length - 1];
  const others = listedProjects.filter((p) => !p.featured);
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative scroll-mt-[var(--header-height)]">
      {/* abertura no fundo do primeiro capítulo, para a passagem de cor continuar igual */}
      <div style={{ background: first.palette.bg, color: first.palette.fg }}>
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-[var(--gutter)] pt-24 md:grid-cols-12 md:gap-x-6 md:pt-36">
          <div className="md:col-span-7">
            <p className="font-kicker text-signal">Projetos</p>
            <h2 id="projetos-title" className="font-display mt-4 text-balance text-[length:var(--text-h2)]">
              O que construímos e o que isso resolveu.
            </h2>
          </div>
          <p className="max-w-[60ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] md:col-span-5 md:self-end">
            Trabalhos entregues para negócios reais: o que cada cliente precisava resolver e o que foi construído.
          </p>
        </div>
      </div>
      {featuredProjects.map((project, i) => (
        <ProjectChapter
          key={project.slug}
          project={project}
          index={i}
          previousBg={i === 0 ? first.palette.bg : featuredProjects[i - 1].palette.bg}
        />
      ))}
      <div style={{ background: last.palette.bg, color: last.palette.fg }}>
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-6 border-t border-black/10 px-[var(--gutter)] py-10">
          <p className="max-w-[60ch] text-pretty" style={{ color: last.palette.muted }}>
            No arquivo também: {others.map((p) => p.title).join(", ")}.
          </p>
          <Link
            href="/projetos"
            className="focus-ring group/btn inline-flex min-h-12 items-center gap-2.5 rounded-full border border-black/20 px-6 text-[15px] font-semibold transition-colors hover:border-black/60"
          >
            Ver todos os projetos
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
