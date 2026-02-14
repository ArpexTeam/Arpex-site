// components/projects-grid.tsx
import Section from "@/components/ui/section";
import { H2, Sub } from "@/components/ui/heading";
import Link from "next/link";
import type { StaticImageData } from "next/image";

import ProjectCard from "@/components/projects/card";

// ✅ IMPORT DAS IMAGENS (coloque os arquivos em /public/projects/)

import honorattoImg from "@/images/2026-02-14_12h19_46.png";
import florImg from "@/images/2026-02-14_12h20_01.png";
// adicione mais imports aqui...

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  external?: boolean;
  imageSrc?: StaticImageData;
  imageAlt?: string;
};

const PROJECTS: Project[] = [
  {
    id: "honoratto",
    title: "Honoratto Tattoo",
    subtitle: "Portfólio",
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
  // adicione os seus aqui...
];

// Quantidade alvo de cards na grade (completa com placeholders)
const TARGET_CARDS = 6;

export default function ProjectsGrid() {
  const placeholders = Math.max(0, TARGET_CARDS - PROJECTS.length);

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
          {/* projetos reais */}
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

          {/* placeholders (quadrados vazios) */}
          {Array.from({ length: placeholders }).map((_, i) => (
            <ProjectCard key={`ph-${i}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}