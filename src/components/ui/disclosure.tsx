"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/* Abrir: a altura cresce com partida suave e assentamento longo, e o conteúdo desce 6 px enquanto
   aparece. Fechar: o conteúdo some primeiro e a altura recolhe um pouco mais rápido. */
const EASE = "cubic-bezier(0.45, 0, 0.2, 1)";
const OPEN_MS = 560;
const CLOSE_MS = 440;

/**
 * Área expansível sobre details/summary nativos: teclado, leitor de tela,
 * busca do navegador e funcionamento sem JS. O JS só anima. Um clique no meio
 * da animação inverte a partir do ponto em que ela está.
 */
export default function Disclosure({
  summary,
  children,
  defaultOpen = false,
  className,
  summaryClassName,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  summaryClassName?: string;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const running = useRef<Animation[]>([]);

  function toggle(e: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!details || !panel || !content || !panel.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();

    const closing = details.hasAttribute("data-closing");
    const opening = !details.open || closing;
    const fromHeight = details.open ? panel.getBoundingClientRect().height : 0;
    const fromOpacity = details.open ? Number(getComputedStyle(content).opacity) : 0;
    running.current.forEach((a) => a.cancel());

    if (opening) {
      details.removeAttribute("data-closing");
      details.open = true;
      const toHeight = panel.getBoundingClientRect().height;
      running.current = [
        panel.animate([{ height: `${fromHeight}px` }, { height: `${toHeight}px` }], {
          duration: OPEN_MS,
          easing: EASE,
          fill: "forwards",
        }),
        content.animate(
          [
            { opacity: fromOpacity, transform: `translateY(${-6 * (1 - fromOpacity)}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 440, delay: fromOpacity > 0 ? 0 : 120, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "backwards" }
        ),
      ];
      running.current[0].onfinish = () => {
        running.current.forEach((a) => a.cancel());
        running.current = [];
      };
    } else {
      details.setAttribute("data-closing", "");
      running.current = [
        panel.animate([{ height: `${fromHeight}px` }, { height: "0px" }], {
          duration: CLOSE_MS,
          easing: EASE,
          fill: "forwards",
        }),
        content.animate(
          [
            { opacity: fromOpacity, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(-4px)" },
          ],
          { duration: 220, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" }
        ),
      ];
      running.current[0].onfinish = () => {
        // Fecha antes de soltar a altura, para não piscar o conteúdo inteiro.
        details.open = false;
        details.removeAttribute("data-closing");
        running.current.forEach((a) => a.cancel());
        running.current = [];
      };
    }
  }

  return (
    <details
      ref={detailsRef}
      open={defaultOpen}
      className={cn("group", className)}
      onToggle={(e) => {
        // Abertura pelo navegador (busca na página) com um fechamento em curso.
        if (e.currentTarget.open && running.current.length === 0) e.currentTarget.removeAttribute("data-closing");
      }}
    >
      <summary
        onClick={toggle}
        className={cn(
          "focus-ring group/q flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden",
          summaryClassName
        )}
      >
        {summary}
        <span aria-hidden className="relative h-4 w-4 shrink-0 text-fg-muted transition-colors group-hover/q:text-fg">
          <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
          {/* A barra vertical gira e deita sobre a horizontal: o + vira −, no ritmo da altura. */}
          <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-[560ms] ease-[cubic-bezier(0.45,0,0.2,1)] group-[[open]:not([data-closing])]:rotate-90 motion-reduce:transition-none" />
        </span>
      </summary>
      <div ref={panelRef} className="overflow-hidden">
        <div ref={contentRef}>{children}</div>
      </div>
    </details>
  );
}
