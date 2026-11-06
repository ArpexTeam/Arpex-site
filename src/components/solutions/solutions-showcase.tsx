"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { solutions } from "@/data/solutions";
import { Button } from "@/components/ui/button";
import SolutionDemoView from "./solution-demos";

/**
 * Presença, atendimento e operação como abas horizontais (padrão WAI-ARIA,
 * ativação automática): clique, toque, setas, Home/End. Cada painel mostra o
 * exemplo, uma frase de benefício e o caminho para a página Soluções; as
 * listas de entregas ficam lá.
 * Os três painéis ocupam a mesma célula da grade: a seção tem a altura do
 * maior e não salta na troca.
 */
export default function SolutionsShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();

  function focusTab(i: number) {
    const n = (i + solutions.length) % solutions.length;
    setActive(n);
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
    <section id="solucoes" aria-labelledby="solucoes-title" className="surface-mineral relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        <h2 id="solucoes-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
          Presença, atendimento e operação.
        </h2>
        <p className="mt-3 text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">Comece pela necessidade do seu negócio.</p>

        {/* abas logo acima do painel, alinhadas à esquerda */}
        <div role="tablist" aria-label="Frentes de solução" className="mt-10 flex gap-1 border-b border-rule md:mt-12">
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
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="tab"
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid [grid-template-areas:'painel'] md:mt-10">
          {solutions.map((s, i) => {
            const selected = i === active;
            return (
              <div
                key={s.slug}
                id={`${uid}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${i}`}
                inert={!selected}
                className={cn(
                  "grid gap-8 [grid-area:painel] lg:grid-cols-12 lg:items-start lg:gap-x-10",
                  selected ? "visible motion-safe:animate-[panel-in_360ms_cubic-bezier(0.22,1,0.36,1)]" : "invisible"
                )}
              >
                {/* o exemplo primeiro; a explicação fica junto dele */}
                <div className="lg:col-span-7">
                  <SolutionDemoView demo={s.demo} active={selected} />
                </div>
                <div className="lg:col-span-4 lg:col-start-9 lg:pt-14">
                  <p className="font-heading text-balance text-[length:var(--text-h3)] text-fg">{s.promise}</p>
                  <Button href={`/solucoes#${s.slug}`} variant="link" arrow className="mt-4">
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
