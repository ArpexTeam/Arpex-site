import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/container";
import { H1, Label } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/motion/transition-link";
import { getProjectBySlug, projects } from "@/data/projects";
import { waLink } from "@/data/social-links";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: `${project.title} | ArpeX Technology`,
      description: project.description,
      url: `/projetos/${project.slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const isProduct = project.slug === "arpex-crm";

  return (
    <main className="bg-ink pt-[72px]">
      <section className="py-16 md:py-24">
        <Container>
          <TransitionLink href="/projetos" className="text-sm font-semibold text-muted transition-colors hover:text-system">
            ← Todos os projetos
          </TransitionLink>

          <Label className="mt-10">{project.category}</Label>
          <H1 className="mt-4 max-w-[24ch]">{project.title}</H1>
          <p className="mt-6 max-w-[60ch] text-[length:var(--text-body-lg)] leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.externalUrl && (
              <Button href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                Visitar site
              </Button>
            )}
            {isProduct && (
              <Button href="/ecossistema" variant="ghost">
                Explorar o produto
              </Button>
            )}
            {project.assetsPending && (
              <Button
                href={waLink(`Olá! Vim pela página do case ${project.title} e quero saber mais.`)}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                Perguntar sobre este case
              </Button>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-28 md:pb-36">
        <Container>
          {project.image ? (
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-xl border border-smoke bg-graphite"
              style={{ viewTransitionName: `project-image-${project.slug}` }}
            >
              <Image
                src={project.image}
                alt={`Preview do projeto ${project.title}`}
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          ) : (
            <div
              className="flex max-w-[420px] items-center gap-4 rounded-xl border border-smoke bg-graphite p-6"
              style={{ viewTransitionName: `project-image-${project.slug}` }}
            >
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-system" />
              <p className="text-sm leading-relaxed text-muted">
                Assets reais deste case (screenshots, capturas) ainda estão em atualização.
                Fale com a gente para conhecer o projeto em detalhe.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
