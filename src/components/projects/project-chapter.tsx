"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import TransitionLink from "@/components/motion/transition-link";
import { Arrow } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { Project, ProjectMedia } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
  /** cor do capítulo anterior, para a transição de cor entre capítulos */
  previousBg: string;
  /** primeiro capítulo, logo abaixo do título da seção: menos espaço acima */
  first?: boolean;
};

const byKind = (p: Project, kind: ProjectMedia["kind"]) => p.gallery.filter((m) => m.kind === kind);

/** Link de case: ação em texto na cor do capítulo; a capa já é o alvo grande. */
function CaseLink({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <TransitionLink href={`/projetos/${project.slug}`} className="link link-action">
      <span className="link-label">{children}</span>
      <Arrow />
    </TransitionLink>
  );
}

/** Capa clicável com reenquadramento ligado à rolagem e resposta discreta ao hover/foco. */
function Cover({
  project,
  media,
  aspect,
  sizes,
  className,
  frameClassName,
  priority,
}: {
  project: Project;
  media: ProjectMedia;
  aspect: string;
  sizes: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
}) {
  return (
    <TransitionLink
      href={`/projetos/${project.slug}`}
      aria-label={`Abrir o case ${project.title}`}
      className={cn("focus-ring group/cover block rounded-[var(--radius-frame)]", className)}
    >
      <div
        data-chapter-frame
        className={cn("frame relative", aspect, frameClassName)}
        style={{ viewTransitionName: `case-${project.slug}` }}
      >
        <div data-chapter-zoom className="absolute inset-0 will-change-transform">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/cover:scale-[1.03] group-focus-visible/cover:scale-[1.03]"
          />
        </div>
        <span
          aria-hidden
          className="font-label absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-2 rounded-[var(--radius-choice)] bg-ink/85 px-4 py-2 text-ivory opacity-0 backdrop-blur transition-[opacity,transform] duration-300 group-hover/cover:translate-y-0 group-hover/cover:opacity-100 group-focus-visible/cover:translate-y-0 group-focus-visible/cover:opacity-100"
        >
          Abrir case
        </span>
      </div>
    </TransitionLink>
  );
}

function Cutout({ media, className, speed, sizes }: { media: ProjectMedia; className?: string; speed: number; sizes: string }) {
  return (
    <div data-parallax={speed} className={cn("pointer-events-none absolute will-change-transform", className)}>
      <Image src={media.src} alt={media.alt} sizes={sizes} className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]" />
    </div>
  );
}

function Phone({ media, className, sizes }: { media: ProjectMedia; className?: string; sizes: string }) {
  return (
    <div className={cn("frame relative aspect-[390/844] rounded-[var(--radius-device)] ring-[6px] ring-black/80", className)}>
      <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover object-top" />
    </div>
  );
}

function Media({ project }: { project: Project }) {
  const cover = project.cover!;
  const desktops = byKind(project, "desktop");
  const cutouts = byKind(project, "cutout");
  const mobile = byKind(project, "mobile")[0];
  const print = byKind(project, "print")[0];

  switch (project.slug) {
    case "carta-toricelli": {
      const book = desktops[0];
      return (
        <div className="relative">
          <div className="mb-10 md:mb-16">
            <Cover project={project} media={cover} aspect="aspect-[16/10]" sizes="(min-width: 1440px) 1340px, 94vw" />
          </div>
          <div className="relative grid grid-cols-12 items-end gap-y-10">
            <div className="col-span-12 md:col-span-8 md:col-start-2">
              <div className="rounded-[34px] bg-[#1c2a24] p-[10px] shadow-[0_50px_90px_-40px_rgba(28,42,36,0.6)] md:p-[14px]">
                <div data-chapter-frame className="frame relative aspect-[16/10] rounded-[24px]">
                  <div data-chapter-zoom className="absolute inset-0">
                    <Image src={book.src} alt={book.alt} fill sizes="(min-width: 768px) 62vw, 94vw" className="object-cover" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-[color:var(--case-muted)]">{book.caption}</p>
            </div>
            <Cutout media={cutouts[0]} speed={-0.18} sizes="(min-width: 768px) 30vw, 60vw" className="-right-2 bottom-24 w-[44%] md:right-0 md:w-[30%] lg:w-[27%]" />
            <Cutout media={cutouts[1]} speed={-0.32} sizes="16vw" className="-top-16 left-[-2%] hidden w-[15%] md:block" />
          </div>
        </div>
      );
    }
    case "chef-bruno":
      return (
        <div className="relative grid grid-cols-12 gap-y-8 md:gap-x-6">
          <Cover
            project={project}
            media={cover}
            aspect="aspect-[16/10] md:aspect-[21/10]"
            sizes="(min-width: 1440px) 1340px, 94vw"
            className="col-span-12"
          />
          <div className="relative col-span-6 -mt-24 ml-4 md:col-span-3 md:-mt-40 md:ml-10" data-parallax="-0.12">
            {mobile && <Phone media={mobile} sizes="(min-width: 768px) 22vw, 46vw" />}
          </div>
          {print && (
            <figure className="col-span-6 md:col-span-3 md:col-start-9 md:mt-10" data-parallax="0.08">
              <div className="frame relative aspect-[3/4] rotate-[2.5deg] bg-white">
                <Image src={print.src} alt={print.alt} fill sizes="(min-width: 768px) 22vw, 46vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 text-sm text-[color:var(--case-muted)]">{print.caption}</figcaption>
            </figure>
          )}
        </div>
      );
    case "lux-bar": {
      const config = desktops[1];
      return (
        <div className="relative grid grid-cols-12 gap-y-10 md:gap-x-6">
          <Cover project={project} media={cover} aspect="aspect-[16/10]" sizes="(min-width: 768px) 60vw, 94vw" className="col-span-12 md:col-span-8" />
          <figure className="col-span-12 md:col-span-4 md:mt-48">
            <div data-chapter-frame className="frame relative aspect-[16/10]">
              <Image src={config.src} alt={config.alt} fill sizes="(min-width: 768px) 30vw, 94vw" className="object-cover object-top" />
            </div>
            <figcaption className="mt-4 text-sm text-[color:var(--case-muted)]">{config.caption}</figcaption>
          </figure>
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
            <Cutout media={cutouts[0]} speed={-0.35} sizes="12vw" className="left-[58%] top-[40%] w-[11%]" />
            <Cutout media={cutouts[1]} speed={-0.2} sizes="12vw" className="left-[66%] top-[-6%] w-[10%]" />
            <Cutout media={cutouts[2]} speed={-0.5} sizes="10vw" className="left-[88%] top-[-3%] w-[8%]" />
          </div>
        </div>
      );
    }
    case "honoratto-tattoo": {
      const page = project.pageScroll!;
      return (
        <div className="grid grid-cols-12 items-center gap-y-10 md:gap-x-6">
          <Cover project={project} media={cover} aspect="aspect-[16/10]" sizes="(min-width: 768px) 56vw, 94vw" className="col-span-12 md:col-span-7" />
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="frame relative aspect-[4/5] bg-[#0b0b0b]">
              <div data-page-scroll className="absolute inset-x-0 top-0 will-change-transform">
                <Image src={page.src} alt={page.alt} sizes="(min-width: 768px) 30vw, 94vw" className="h-auto w-full" />
              </div>
            </div>
            <p className="mt-4 text-sm text-[color:var(--case-muted)]">A página inteira, rolando com você.</p>
          </div>
        </div>
      );
    }
    default:
      return <Cover project={project} media={cover} aspect="aspect-[16/10]" sizes="94vw" />;
  }
}

export default function ProjectChapter({ project, index, previousBg, first }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { palette } = project;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current!;
        // Reenquadramento: a moldura cresce e a imagem assenta enquanto entra na
        // tela. Só transform (composto na GPU) — clip-path repintaria a cada quadro.
        gsap.utils.toArray<HTMLElement>("[data-chapter-frame]", root).forEach((frame) => {
          const zoom = frame.querySelector<HTMLElement>("[data-chapter-zoom]");
          gsap.fromTo(
            frame,
            { scale: 0.9 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top 98%", end: "top 40%", scrub: 0.5 } }
          );
          if (zoom) {
            gsap.fromTo(zoom, { scale: 1.14 }, { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom 40%", scrub: 0.5 } });
          }
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]", root).forEach((el) => {
          const speed = Number(el.dataset.parallax) || 0;
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            { yPercent: speed * 50, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } }
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-page-scroll]", root).forEach((el) => {
          const frame = el.parentElement!;
          gsap.to(el, {
            y: () => -(el.offsetHeight - frame.clientHeight),
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 80%", end: "bottom 10%", scrub: 0.6, invalidateOnRefresh: true },
          });
        });
        gsap.from(gsap.utils.toArray<HTMLElement>("[data-chapter-line]", root), {
          yPercent: 105,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      aria-labelledby={`chapter-${project.slug}`}
      className={cn("relative overflow-hidden py-20 md:py-28", first && "pt-10 md:pt-14")}
      style={
        {
          "--fg": palette.fg,
          "--fg-muted": palette.muted,
          "--rule": palette.dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)",
          "--accent": palette.accent,
          "--fg-inverse": palette.bg,
          "--case-muted": palette.muted,
          color: palette.fg,
          // transição de cor entre capítulos: o topo herda o fundo anterior
          background: `linear-gradient(180deg, ${previousBg} 0, ${palette.bg} 220px)`,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        {/* nome, categoria e uma frase; desafio, escopo e detalhes ficam no case */}
        <header className="mb-8 md:mb-10">
          <p className="font-kicker flex flex-wrap items-center gap-x-3 gap-y-1" style={{ color: palette.accent }}>
            <span className="font-label">{num}</span>
            <span aria-hidden className="h-px w-8 bg-current" />
            <span style={{ color: palette.muted }}>{project.type}</span>
          </p>
          <h3 id={`chapter-${project.slug}`} className="font-title mt-3 text-balance text-[length:var(--text-project)]">
            <span className="line-mask">
              <span data-chapter-line className="block">
                {project.title}
              </span>
            </span>
          </h3>
          {project.context && (
            <p className="mt-2 max-w-[56ch] text-pretty text-[length:var(--text-lead)] leading-[1.45]" style={{ color: palette.muted }}>
              {project.context}
            </p>
          )}
        </header>

        <Media project={project} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 md:mt-14" style={{ borderColor: "var(--rule)" }}>
          <p className="text-[length:var(--text-small)]" style={{ color: palette.muted }}>
            <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full" style={{ background: palette.accent }} />
            {project.status.label}
          </p>
          <CaseLink project={project}>Ver o case</CaseLink>
        </div>
      </div>
    </article>
  );
}
