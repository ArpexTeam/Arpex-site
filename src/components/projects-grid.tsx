// components/projects-grid.tsx
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import Link from "next/link";
import { projects } from "@/content/projects"; // os 6 itens (id/title) que você já tem

export default function ProjectsGrid() {
  return (
    <Section className="relative overflow-hidden bg-[#101010] py-32">
      {/* faixa escura da seção */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--color-surface)] to-[color:var(--color-bg)]" />

      <div className="mx-auto w-full max-w-[1200px] px-4">
        {/* header */}
        <div className="mb-6 flex items-end justify-between flex-col md:flex-row">
          <div className="text-center md:text-left">
            <H2 className="text-white">Nossos projetos</H2>
            <Sub className="mt-1 text-white/70">
              Confira alguns dos websites desenvolvidos recentemente por nós
            </Sub>
          </div>

          <Link
            href="#contato"
            className="text-sm text-white/70 hover:text-brand transition mt-14 mx-auto md:mx-0 md:mt-0"
          >
            Conheça mais projetos
          </Link>
        </div>

        {/* grid 3x2 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="aspect-[4/3] rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.08] transition"
              aria-label={p.title}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
