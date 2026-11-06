import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import TransitionLink from "@/components/motion/transition-link";
import PageScrollFrame from "@/components/projects/page-scroll-frame";
import { Arrow, Button } from "@/components/ui/button";
import { getNextProject, getProjectBySlug, projects, type ProjectMedia } from "@/data/projects";
import { contactHref } from "@/data/contact";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.listed ? `${project.title} — case` : project.title,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
    robots: project.listed ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${project.title} | ArpeX Technology`,
      description: project.summary,
      url: `/projetos/${project.slug}`,
      images: project.cover ? [{ url: project.cover.src.src, width: project.cover.src.width, height: project.cover.src.height }] : undefined,
    },
  };
}

function GalleryItem({ m }: { m: ProjectMedia }) {
  if (m.kind === "mobile") {
    return (
      <figure className="mx-auto w-full max-w-[300px]">
        <div className="frame relative aspect-[390/844] rounded-[var(--radius-device)] ring-[6px] ring-black/80">
          <Image src={m.src} alt={m.alt} fill sizes="300px" className="object-cover object-top" />
        </div>
        {m.caption && <figcaption className="mt-4 text-sm text-[color:var(--fg-muted)]">{m.caption}</figcaption>}
      </figure>
    );
  }
  if (m.kind === "cutout") {
    return (
      <figure className="mx-auto w-full max-w-[420px]">
        <Image src={m.src} alt={m.alt} sizes="(min-width: 768px) 30vw, 80vw" className="h-auto w-full" />
        {m.caption && <figcaption className="mt-4 text-sm text-[color:var(--fg-muted)]">{m.caption}</figcaption>}
      </figure>
    );
  }
  if (m.kind === "print") {
    return (
      <figure className="mx-auto w-full max-w-[360px]">
        <div className="frame relative aspect-[3/4] bg-white">
          <Image src={m.src} alt={m.alt} fill sizes="360px" className="object-cover" />
        </div>
        {m.caption && <figcaption className="mt-4 text-sm text-[color:var(--fg-muted)]">{m.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure>
      <div className="frame relative aspect-[16/10]">
        <Image src={m.src} alt={m.alt} fill sizes="(min-width: 768px) 60vw, 92vw" className="object-cover object-top" />
      </div>
      {m.caption && <figcaption className="mt-4 text-sm text-[color:var(--fg-muted)]">{m.caption}</figcaption>}
    </figure>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { palette } = project;
  const next = getNextProject(project.slug);
  const external = project.status.url?.startsWith("http");
  const desktops = project.gallery.filter((m) => m.kind === "desktop");
  const others = project.gallery.filter((m) => m.kind !== "desktop");

  const vars = {
    "--fg": palette.fg,
    "--fg-muted": palette.muted,
    "--rule": palette.dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)",
    "--accent": palette.accent,
    background: palette.bg,
    color: palette.fg,
  } as React.CSSProperties;

  return (
    <main style={vars} data-top={palette.dark ? "dark" : "light"}>
      <section className="pt-[calc(var(--header-height)+56px)] pb-12 md:pt-[calc(var(--header-height)+88px)] md:pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
          <TransitionLink href="/projetos" className="link link-muted inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
            <Arrow className="h-3.5 w-3.5 rotate-180" />
            Todos os projetos
          </TransitionLink>

          <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-8">
              <p className="font-kicker text-accent">{project.type}</p>
              <h1 className="font-display mt-5 text-balance text-[length:var(--text-display)]">{project.title}</h1>
              {project.client !== project.title && <p className="mt-4 text-[length:var(--text-lead)] text-fg-muted">{project.client}</p>}
            </div>
            <div className="md:col-span-4 md:self-end">
              <p className="text-pretty text-[length:var(--text-lead)] leading-[1.55]">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.status.url && (
                  <Button href={project.status.url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} arrow>
                    {project.status.urlLabel ?? "Visitar"}
                  </Button>
                )}
                <Button href={contactHref(undefined, { projeto: project.slug })} variant="secondary">
                  Quero algo assim
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.cover ? (
        <section aria-label="Capa" className="pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
            <div className="frame relative aspect-[16/10]" style={{ viewTransitionName: `case-${project.slug}` }}>
              <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(min-width: 1440px) 1340px, 94vw" className="object-cover object-top" />
            </div>
          </div>
        </section>
      ) : (
        <section className="pb-24">
          <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
            <p className="max-w-[52ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">
              As imagens e a descrição deste trabalho serão publicadas quando o material for liberado pelo cliente. Enquanto
              isso, veja outros projetos ou converse com a ArpeX.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/projetos" arrow>
                Ver projetos
              </Button>
              <Button href="/contato" variant="secondary">
                Conversar com a ArpeX
              </Button>
            </div>
          </div>
        </section>
      )}

      {project.challenge && (
        <section aria-label="Desafio e solução" className="pb-20 md:pb-28">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-5">
              <p className="font-kicker text-accent">Desafio</p>
              <p className="font-heading mt-3 text-pretty text-[length:var(--text-h3)]">{project.challenge}</p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="font-kicker text-accent">Solução</p>
              <p className="mt-3 max-w-[62ch] text-pretty text-[length:var(--text-lead)] leading-[1.55]">{project.solution}</p>
            </div>
          </div>
        </section>
      )}

      {(project.gallery.length > 0 || project.pageScroll) && (
        <section aria-labelledby="demo-title" className="border-t border-rule py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
            <h2 id="demo-title" className="font-kicker text-accent">
              Demonstração
            </h2>
            <div className="mt-10 grid gap-x-6 gap-y-16 md:grid-cols-12">
              {project.pageScroll && (
                <div className="md:col-span-5">
                  <PageScrollFrame
                    media={project.pageScroll}
                    url={project.status.url?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    className="aspect-[4/5]"
                  />
                  <p className="mt-4 text-sm text-fg-muted">A página inicial inteira, rolando com você.</p>
                </div>
              )}
              {desktops.map((m, i) => (
                <div key={m.alt} className={project.pageScroll && i === 0 ? "md:col-span-7" : i % 3 === 2 ? "md:col-span-8 md:col-start-3" : "md:col-span-6"}>
                  <GalleryItem m={m} />
                </div>
              ))}
              {others.length > 0 && (
                <div className="grid items-end gap-12 sm:grid-cols-2 md:col-span-12 md:grid-cols-3">
                  {others.map((m) => (
                    <GalleryItem key={m.alt} m={m} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {project.deliverables.length > 0 && (
        <section aria-labelledby="entregas-title" className="border-t border-rule py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
            <h2 id="entregas-title" className="font-title text-[length:var(--text-h2)] md:col-span-4">
              Entregas
            </h2>
            <ul className="md:col-span-7 md:col-start-6">
              {project.deliverables.map((d, i) => (
                <li key={d} className="grid grid-cols-[3rem_1fr] border-t border-rule py-4 last:border-b">
                  <span className="font-label pt-1 text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-pretty leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="resultado-title" className="border-t border-rule py-20 md:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-[var(--gutter)] md:grid-cols-12 md:gap-x-6">
          <h2 id="resultado-title" className="font-kicker text-accent md:col-span-4">
            Situação atual
          </h2>
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-heading text-[length:var(--text-h3)]">{project.status.label}</p>
            {project.status.url && external && (
              <p className="mt-3 text-fg-muted">
                <a href={project.status.url} target="_blank" rel="noopener noreferrer" className="link-inline">
                  {project.status.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </p>
            )}
            {project.note && <p className="mt-4 max-w-[60ch] text-pretty text-sm leading-relaxed text-fg-muted">{project.note}</p>}
          </div>
        </div>
      </section>

      {project.listed && next && next.slug !== project.slug && (
        <section aria-label="Próximo case" className="surface-ink">
          <TransitionLink href={`/projetos/${next.slug}`} className="focus-ring group/next block">
            <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-[var(--gutter)] py-16 md:grid-cols-12 md:gap-x-6 md:py-24">
              <div className="md:col-span-6">
                <p className="font-kicker text-fg-muted">Próximo case</p>
                <p className="font-title mt-4 text-[length:var(--text-h2)] text-fg transition-colors group-hover/next:text-signal">
                  {next.title}
                </p>
                <p className="mt-3 text-fg-muted">{next.type}</p>
              </div>
              {next.cover && (
                <div className="frame relative aspect-[16/10] transition-transform duration-500 group-hover/next:scale-[1.015] md:col-span-5 md:col-start-8">
                  <Image src={next.cover.src} alt="" fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover object-top" />
                </div>
              )}
            </div>
          </TransitionLink>
        </section>
      )}
    </main>
  );
}
