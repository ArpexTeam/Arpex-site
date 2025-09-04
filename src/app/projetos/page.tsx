// app/projetos/page.tsx
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import ScrollRail from "@/components/projects/scroll-rail";
import StickyCta from "@/components/projects/sticky-cta";
import ProjectCard from "@/components/projects/card";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#101010] pt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#121514] to-[#0b0b0b]" />

      <Section className="relative pt-8 pb-28">
        <div className="relative mx-auto w-full max-w-[1200px] px-4 md:pl-6">
          {/* Wrapper relativo para posicionar o trilho */}
          <div className="relative">
            {/* ✅ ScrollRail agora observa o SCROLLER interno */}
            <ScrollRail targetId="projects-scroller" easing={1.8} /* trackOffset={8} */ />

            {/* Header (fora do scroller) */}
            <header className="mb-4">
              <H2 className="text-white">Nossos projetos</H2>
              <Sub className="mt-1 text-white/70">
                Cada site com propósito, estratégia e excelência.
              </Sub>
            </header>

            {/* ✅ Container que rola por dentro */}
            <div
              id="projects-scroller"
              className="relative h-[70vh] overflow-y-auto overscroll-contain pr-4 no-scrollbar"
            >
              {/* Grid dentro do scroller */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-6">
                {Array.from({ length: 27 }).map((_, i) => (
                  <ProjectCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA igual ao da home (fixo) */}
      <StickyCta />
    </main>
  );
}
