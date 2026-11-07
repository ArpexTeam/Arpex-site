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
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)] pt-20 md:pt-28">
          <h2 id="projetos-title" className="font-title text-balance text-[length:var(--text-h2)]">
            Projetos selecionados
          </h2>
        </div>
      </div>
      {featuredProjects.map((project, i) => (
        <ProjectChapter
          key={project.slug}
          project={project}
          index={i}
          previousBg={i === 0 ? first.palette.bg : featuredProjects[i - 1].palette.bg}
          first={i === 0}
        />
      ))}
      <div
        style={
          {
            background: last.palette.bg,
            color: last.palette.fg,
            "--fg": last.palette.fg,
            "--fg-muted": last.palette.muted,
            "--accent": last.palette.accent,
            "--fg-inverse": last.palette.bg,
          } as React.CSSProperties
        }
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-6 border-t border-black/10 px-[var(--gutter)] py-10">
          <p className="max-w-[60ch] text-pretty" style={{ color: last.palette.muted }}>
            No arquivo também: {others.map((p) => p.title).join(", ")}.
          </p>
          <Link href="/projetos" className="link link-action">
            <span className="link-label">Ver todos os projetos</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
