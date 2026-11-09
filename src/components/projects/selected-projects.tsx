import Link from "next/link";
import { featuredProjects, getProjectBySlug, listedProjects, type Project } from "@/data/projects";
import { Arrow } from "@/components/ui/button";
import ProjectChapter from "./project-chapter";
import ProjectRail from "./project-rail";

// Celular: sites e um sistema lado a lado, para equilibrar presença e operação.
const railProjects = ["chef-bruno", "flor-de-maria-vip", "lux-bar", "honoratto-tattoo"]
  .map((slug) => getProjectBySlug(slug))
  .filter((p): p is Project => p !== undefined);

/**
 * Cases como evidência. Do tablet em diante, três capítulos completos; no
 * celular, uma faixa horizontal com um cartão por projeto, para a home não
 * empilhar páginas de clientes. O restante fica em /projetos.
 */
export default function SelectedProjects() {
  const first = featuredProjects[0];
  const last = featuredProjects[featuredProjects.length - 1];
  const others = listedProjects.filter((p) => !p.featured);
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative scroll-mt-[var(--header-height)]">
      {/* celular */}
      <div className="surface-ink py-16 md:hidden">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <h2 id="projetos-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
            Projetos selecionados
          </h2>
          <p className="mt-3 max-w-[40ch] text-pretty text-fg-muted">Sites, sistemas e uma carta em 3D. Deslize para ver os outros.</p>
          <ProjectRail projects={railProjects} className="mt-8" />
        </div>
      </div>

      {/* tablet e computador: abertura no fundo do primeiro capítulo, para a passagem de cor continuar igual */}
      <div className="hidden md:block">
        <div style={{ background: first.palette.bg, color: first.palette.fg }}>
          <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)] pt-20 md:pt-28">
            {/* um título por largura; só um fica visível (o rótulo da seção é o do celular) */}
            <h2 id="projetos-title-wide" className="font-title text-balance text-[length:var(--text-h2)]">
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
      </div>
    </section>
  );
}
