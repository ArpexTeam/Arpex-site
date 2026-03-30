import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import ScrollRail from "@/components/projects/scroll-rail";
import StickyCta from "@/components/projects/sticky-cta";
import ProjectCard from "@/components/projects/card";
import honorattoImg from "@/images/2026-02-14_12h19_46.png";
import florImg from "@/images/2026-02-14_12h20_01.png";
import type { StaticImageData } from "next/image";

type ImageSrc = string | StaticImageData;

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  external?: boolean;
  imageSrc?: ImageSrc;
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

const targetCards = 27;

export default function ProjectsPage() {
  const placeholders = Math.max(0, targetCards - projects.length);

  return (
    <main className="relative min-h-screen bg-[#101010] pt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#121514] to-[#0b0b0b]" />

      <Section className="relative pb-28 pt-8">
        <div className="relative mx-auto w-full max-w-[1200px] px-4 md:pl-6">
          <div className="relative">
            <ScrollRail targetId="projects-scroller" easing={1.8} />

            <header className="mb-4">
              <H2 className="text-white">Recortes visuais de entregas digitais</H2>
              <Sub className="mt-1 max-w-[64ch] text-white/70">
                Estes exemplos mostram uma parte visível do trabalho da ArpeX. A atuação da empresa
                vai além de sites e também inclui software sob medida, automação, apps e operação.
              </Sub>
            </header>

            <div
              id="projects-scroller"
              className="no-scrollbar relative h-[70vh] overflow-y-auto overscroll-contain pr-4"
            >
              <div className="grid gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </div>
      </Section>

      <StickyCta />
    </main>
  );
}
