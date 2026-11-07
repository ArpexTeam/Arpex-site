"use client";

import { useRef, type MouseEvent } from "react";
import { faq, type FaqItem } from "@/data/faq";

/* Abrir: a altura cresce com partida suave e assentamento longo, e a resposta desce 6 px enquanto
   aparece. Fechar: a resposta some primeiro e a altura recolhe um pouco mais rápido. */
const EASE = "cubic-bezier(0.45, 0, 0.2, 1)";
const OPEN_MS = 560;
const CLOSE_MS = 440;

/** details/summary nativos: teclado, leitor de tela e funcionamento sem JS. O JS só anima. */
export default function FaqAccordion() {
  return (
    <div className="border-t border-rule">
      {faq.map((item, i) => (
        <FaqEntry key={item.q} item={item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

function FaqEntry({ item, defaultOpen }: { item: FaqItem; defaultOpen: boolean }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);
  const running = useRef<Animation[]>([]);

  function toggle(e: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const panel = panelRef.current;
    const answer = answerRef.current;
    if (!details || !panel || !answer || !panel.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();

    // Um clique no meio da animação inverte a partir do ponto em que ela está.
    const closing = details.hasAttribute("data-closing");
    const opening = !details.open || closing;
    const fromHeight = details.open ? panel.getBoundingClientRect().height : 0;
    const fromOpacity = details.open ? Number(getComputedStyle(answer).opacity) : 0;
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
        answer.animate(
          [
            { opacity: fromOpacity, transform: `translateY(${-6 * (1 - fromOpacity)}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 440, delay: fromOpacity > 0 ? 0 : 120, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "backwards" },
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
        answer.animate(
          [
            { opacity: fromOpacity, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(-4px)" },
          ],
          { duration: 220, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" },
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
      className="group border-b border-rule"
      onToggle={(e) => {
        // Abertura pelo navegador (busca na página) com um fechamento em curso.
        if (e.currentTarget.open && running.current.length === 0) e.currentTarget.removeAttribute("data-closing");
      }}
    >
      <summary
        onClick={toggle}
        className="focus-ring group/q flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden"
      >
        <span className="font-heading text-[1.2rem] text-fg">{item.q}</span>
        <span
          aria-hidden
          className="relative h-4 w-4 shrink-0 text-fg-muted transition-colors group-hover/q:text-fg"
        >
          <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
          {/* A barra vertical gira e deita sobre a horizontal: o + vira −, no ritmo da altura. */}
          <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-[560ms] ease-[cubic-bezier(0.45,0,0.2,1)] group-[[open]:not([data-closing])]:rotate-90 motion-reduce:transition-none" />
        </span>
      </summary>
      <div ref={panelRef} className="overflow-hidden">
        <p ref={answerRef} className="max-w-[64ch] pb-6 text-pretty leading-relaxed text-fg-muted">
          {item.a}
        </p>
      </div>
    </details>
  );
}
