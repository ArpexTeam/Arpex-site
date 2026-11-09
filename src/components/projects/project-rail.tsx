"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/motion/transition-link";
import { Arrow } from "@/components/ui/button";
import { REDUCED_MOTION_QUERY, matches } from "@/lib/motion/queries";
import type { Project } from "@/data/projects";

/**
 * Celular: os projetos numa faixa horizontal, um cartão por vez com o próximo
 * à vista. Desliza com o dedo (a rolagem vertical continua livre: a faixa só
 * rola na horizontal) ou pelos botões. O cartão em foco fica inteiro; os
 * vizinhos recuam um pouco, acompanhando o deslize.
 */
export default function ProjectRail({ projects, className }: { projects: Project[]; className?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = projects.length + 1;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-rail-card]"));
    const still = matches(REDUCED_MOTION_QUERY);
    let raf = 0;
    const update = () => {
      raf = 0;
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth;
      const pos = rail.scrollLeft / step;
      setIndex(Math.min(cards.length - 1, Math.max(0, Math.round(pos))));
      if (still) return;
      cards.forEach((card, i) => {
        const d = Math.min(1, Math.abs(i - pos));
        card.style.transform = `scale(${1 - d * 0.06})`;
        card.style.opacity = String(1 - d * 0.35);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function go(delta: number) {
    const rail = railRef.current;
    const cards = rail?.querySelectorAll<HTMLElement>("[data-rail-card]");
    if (!rail || !cards?.length) return;
    // a posição real (o toque pode chegar no meio de um deslize que ainda está assentando)
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth;
    const current = Math.round(rail.scrollLeft / step);
    const target = cards[Math.min(cards.length - 1, Math.max(0, current + delta))];
    // o encaixe fica suspenso durante a rolagem do botão; senão o navegador
    // pode reencaixar no cartão mais próximo e interromper o movimento
    rail.style.scrollSnapType = "none";
    rail.scrollTo({ left: target.offsetLeft - cards[0].offsetLeft, behavior: matches(REDUCED_MOTION_QUERY) ? "auto" : "smooth" });
    const restore = () => {
      rail.style.scrollSnapType = "";
      rail.removeEventListener("scrollend", restore);
    };
    rail.addEventListener("scrollend", restore);
    window.setTimeout(restore, 900);
  }

  return (
    <div className={className}>
      <div
        ref={railRef}
        role="region"
        aria-label="Projetos selecionados"
        className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-[var(--gutter)] px-[var(--gutter)] pb-1"
      >
        {projects.map((p) => {
          const mobile = p.gallery.find((m) => m.kind === "mobile");
          return (
            <div key={p.slug} data-rail-card className="w-[84%] shrink-0 snap-start origin-left transition-none">
              <TransitionLink
                href={`/projetos/${p.slug}`}
                data-link-host
                className="focus-ring block h-full overflow-hidden rounded-[var(--radius-frame)]"
                style={
                  {
                    background: p.palette.bg,
                    color: p.palette.fg,
                    "--fg": p.palette.fg,
                    "--fg-muted": p.palette.muted,
                  } as React.CSSProperties
                }
              >
                <div className="relative p-3 pb-0">
                  <div className="frame relative aspect-[16/10]" style={{ viewTransitionName: `rail-${p.slug}` }}>
                    {p.cover && <Image src={p.cover.src} alt={p.cover.alt} fill sizes="80vw" className="object-cover object-top" />}
                  </div>
                  {mobile && (
                    <div className="frame absolute -bottom-6 right-6 aspect-[390/844] w-[24%] rounded-[14px] ring-[3px] ring-black/70">
                      <Image src={mobile.src} alt="" fill sizes="22vw" className="object-cover object-top" />
                    </div>
                  )}
                </div>
                <div className="px-4 pb-5 pt-4">
                  <p className="font-kicker pr-[28%]" style={{ color: p.palette.muted }}>
                    {p.type}
                  </p>
                  <h3 className="font-title mt-1 text-[length:var(--text-project)] leading-tight">{p.title}</h3>
                  {p.context && (
                    <p className="mt-2 text-pretty text-[15px] leading-relaxed" style={{ color: p.palette.muted }}>
                      {p.context}
                    </p>
                  )}
                  <span className="link link-action mt-1">
                    <span className="link-label">Ver o case</span>
                    <Arrow />
                  </span>
                </div>
              </TransitionLink>
            </div>
          );
        })}
        <div data-rail-card className="w-[84%] shrink-0 snap-start origin-left">
          <TransitionLink
            href="/projetos"
            data-link-host
            className="focus-ring flex h-full min-h-64 flex-col justify-end rounded-[var(--radius-frame)] border border-rule p-5"
          >
            <p className="font-title text-[length:var(--text-project)] text-fg">Todos os projetos</p>
            <p className="mt-2 text-pretty text-fg-muted">Também a carta de vinhos 3D da Toricelli e o ArpeX CRM, com o desafio e a entrega de cada um.</p>
            <span className="link link-action mt-2 text-fg">
              <span className="link-label">Ver todos os projetos</span>
              <Arrow />
            </span>
          </TransitionLink>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="font-label text-fg-muted" aria-live="polite">
          {index + 1} de {total}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Projeto anterior" className="icon-btn disabled:opacity-35">
            <Arrow className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={index === total - 1} aria-label="Próximo projeto" className="icon-btn disabled:opacity-35">
            <Arrow className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
