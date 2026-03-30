import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import ProjectCard from "@/components/projects/card";
import honorattoImg from "@/images/2026-02-14_12h19_46.png";
import florImg from "@/images/2026-02-14_12h20_01.png";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  external?: boolean;
  imageSrc?: StaticImageData;
  imageAlt?: string;
};

const projects: Project[] = [
  {
    id: "honoratto",
    title: "Honoratto Tattoo",
    subtitle: "Site para portfólio e posicionamento",
    href: "https://honoratto.vercel.app",
    external: true,
    imageSrc: honorattoImg,
    imageAlt: "Preview do projeto Honoratto",
  },
  {
    id: "flor-de-maria",
    title: "Flor de Maria VIP",
    subtitle: "Landing page com foco em conversão",
    href: "https://flordemariavip.com.br",
    external: true,
    imageSrc: florImg,
    imageAlt: "Preview do projeto Flor de Maria VIP",
  },
];

const targetCards = 6;

export default function ProjectsGrid() {
  const placeholders = Math.max(0, targetCards - projects.length);

  return (
    <Section className="relative overflow-hidden bg-[#101010] py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--color-surface)] to-[color:var(--color-bg)]" />

      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="mb-6 flex flex-col items-end justify-between md:flex-row">
          <div className="text-center md:text-left">
            <H2 className="text-white">Recortes de entregas digitais da ArpeX</H2>
            <Sub className="mt-1 text-white/70">
              Alguns projetos visíveis que mostram a qualidade de execução da ArpeX.
              Nossa atuação também inclui software sob medida, automação, apps e operação.
            </Sub>
          </div>

          <Link
            href="/servicos"
            className="mx-auto mt-14 text-sm text-white/70 transition hover:text-brand md:mx-0 md:mt-0"
          >
            Conheça a atuação completa
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              href={project.href}
              external={project.external}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              ariaLabel={project.title ? `Abrir ${project.title}` : "Abrir projeto"}
            />
          ))}

          {Array.from({ length: placeholders }).map((_, index) => (
            <ProjectCard key={`ph-${index}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}
