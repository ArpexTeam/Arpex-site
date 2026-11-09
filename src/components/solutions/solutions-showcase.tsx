"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { solutions } from "@/data/solutions";
import { Button } from "@/components/ui/button";
import SolutionDemoView from "./solution-demos";

/**
 * Presença, atendimento e operação como abas horizontais (padrão WAI-ARIA,
 * ativação automática): clique, toque, setas, Home/End. Cada painel explica
 * antes de demonstrar: a necessidade em linguagem simples, o exemplo, um
 * complemento curto e o caminho para a página Soluções. No computador o
 * exemplo fica à esquerda e o texto à direita, na mesma ordem de leitura.
 * Os três painéis ocupam a mesma célula da grade: a seção tem a altura do
 * maior e não salta na troca. Texto e exemplo entram juntos, vindos do lado
 * da aba escolhida.
 */
export default function SolutionsShowcase() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();

  function select(i: number) {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  }

  function focusTab(i: number) {
    const n = (i + solutions.length) % solutions.length;
    select(n);
    tabRefs.current[n]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(i + 1),
      ArrowLeft: () => focusTab(i - 1),
      Home: () => focusTab(0),
      End: () => focusTab(solutions.length - 1),
    };
    const fn = keys[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  }

  return (
    <section id="solucoes" aria-labelledby="solucoes-title" className="surface-mineral relative scroll-mt-[var(--header-height)] py-16 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        <h2 id="solucoes-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
          Presença, atendimento e operação.
        </h2>
        <p className="mt-3 text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">Comece pela necessidade do seu negócio.</p>

        {/* abas logo acima do painel; no celular dividem a largura em partes iguais */}
        <div role="tablist" aria-label="Frentes de solução" className="mt-8 flex gap-1 border-b border-rule md:mt-12">
          {solutions.map((s, i) => (
            <button
              key={s.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="tab flex-1 justify-center md:flex-none"
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mt-6 grid [grid-template-areas:'painel'] md:mt-10">
          {solutions.map((s, i) => {
            const selected = i === active;
            const enter = (delay: number) =>
              selected
                ? ({ animationDelay: `${delay}ms`, "--swap-x": `${dir * 22}px` } as React.CSSProperties)
                : undefined;
            const enterCls = selected && "motion-safe:animate-[panel-swap_440ms_cubic-bezier(0.22,1,0.36,1)_both]";
            return (
              <div
                key={s.slug}
                id={`${uid}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${i}`}
                inert={!selected}
                className={cn(
                  "grid content-start gap-5 [grid-area:painel] lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0",
                  selected ? "visible" : "invisible"
                )}
              >
                {/* 1. a necessidade, antes do exemplo */}
                <p
                  className={cn("font-heading text-balance text-[length:var(--text-h3)] text-fg lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:pt-14", enterCls)}
                  style={enter(0)}
                >
                  {s.promise}
                </p>
                {/* 2. o exemplo */}
                <div className={cn("lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1", enterCls)} style={enter(70)}>
                  <SolutionDemoView demo={s.demo} active={selected} />
                </div>
                {/* 3. complemento curto e 4. caminho para aprofundar */}
                <div className={cn("lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:pt-4", enterCls)} style={enter(140)}>
                  <p className="max-w-[46ch] text-pretty leading-relaxed text-fg-muted">{s.homeNote}</p>
                  <Button href={`/solucoes#${s.slug}`} variant="link" arrow className="mt-2">
                    Conhecer {s.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
