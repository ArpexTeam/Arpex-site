// app/projetos/page.tsx
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import ScrollRail from "@/components/projects/scroll-rail";
import StickyCta from "@/components/projects/sticky-cta";
import ProjectCard from "@/components/projects/card";
import honorattoImg from "@/images/2026-02-14_12h19_46.png";
import florImg from "@/images/2026-02-14_12h20_01.png";


type Project = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  external?: boolean;
  imageSrc?: any; // "/projects/x.jpg" (public) ou URL externa
  imageAlt?: string;
};

const PROJECTS: Project[] = [
  {
    id: "honoratto",
    title: "Honoratto Tatto",
    subtitle: "Portifólio",
    href: "https://honoratto.vercel.app",
    external: true,
    imageSrc: honorattoImg,
    imageAlt: "Preview do projeto Honoratto",
  },
  {
    id: "flor-de-maria",
    title: "Flor de Maria VIP",
    subtitle: "Landing + conversão",
    href: "https://flordemariavip.com.br",
    external: true,
    imageSrc: florImg,
    imageAlt: "Preview do projeto Flor de Maria VIP",
  },

  // Adicione mais projetos reais aqui
];

// Quantidade alvo de cards no grid (projetos reais + placeholders até completar)
const TARGET_CARDS = 27;

export default function ProjectsPage() {
  const placeholders = Math.max(0, TARGET_CARDS - PROJECTS.length);

  return (
    <main className="relative min-h-screen bg-[#101010] pt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#121514] to-[#0b0b0b]" />

      <Section className="relative pt-8 pb-28">
        <div className="relative mx-auto w-full max-w-[1200px] px-4 md:pl-6">
          <div className="relative">
            {/* ScrollRail observa o scroller interno */}
            <ScrollRail targetId="projects-scroller" easing={1.8} />

            {/* Header fora do scroller */}
            <header className="mb-4">
              <H2 className="text-white">Nossos projetos</H2>
              <Sub className="mt-1 text-white/70">
                Cada site com propósito, estratégia e excelência.
              </Sub>
            </header>

            {/* Container que rola por dentro */}
            <div
              id="projects-scroller"
              className="relative h-[70vh] overflow-y-auto overscroll-contain pr-4 no-scrollbar"
            >
              <div className="grid gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Projetos reais */}
                {PROJECTS.map((p) => (
                  <ProjectCard
                    key={p.id}
                    title={p.title}
                    subtitle={p.subtitle}
                    href={p.href}
                    external={p.external}
                    imageSrc={p.imageSrc}
                    imageAlt={p.imageAlt}
                    ariaLabel={p.title ? `Abrir ${p.title}` : "Abrir projeto"}
                  />
                ))}

                {/* Quadrados vazios (placeholders) para manter scroll/volume */}
                {Array.from({ length: placeholders }).map((_, i) => (
                  <ProjectCard key={`ph-${i}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA fixo */}
      <StickyCta />
    </main>
  );
}