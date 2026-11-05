"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { solutions } from "@/data/solutions";
import { contactHref } from "@/data/contact";
import { getProjectBySlug } from "@/data/projects";
import { Arrow, Button } from "@/components/ui/button";
import SolutionDemoView from "./solution-demos";

/**
 * Presença, atendimento e operação como abas (padrão WAI-ARIA, ativação
 * automática): clique, toque, setas, Home/End. A demonstração troca ao lado;
 * nada depende de hover.
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
      ArrowDown: () => focusTab(i + 1),
      ArrowRight: () => focusTab(i + 1),
      ArrowUp: () => focusTab(i - 1),
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
        {/* a introdução só orienta; o que cada frente faz está nas abas */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="solucoes-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
              Presença, atendimento e operação.
            </h2>
            <p className="mt-3 text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">Comece pela necessidade do seu negócio.</p>
          </div>
          <Link
            href="/solucoes"
            className="focus-ring group/btn inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-fg underline decoration-rule underline-offset-[6px] hover:decoration-fg"
          >
            Ver as soluções em detalhe
            <Arrow />
          </Link>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-x-10">
          <div
            role="tablist"
            aria-label="Frentes de solução"
            aria-orientation="vertical"
            className="no-scrollbar -mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
          >
            {solutions.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`${uid}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "focus-ring group/tab relative shrink-0 snap-start rounded-full border px-4 py-3 text-left transition-colors duration-200",
                    "lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-6",
                    selected
                      ? "border-graphite bg-graphite text-paper lg:border-rule lg:bg-transparent lg:text-fg"
                      : "border-rule text-fg-muted hover:text-fg lg:border-rule"
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span className={cn("font-label hidden w-7 shrink-0 lg:inline-block", selected ? "text-accent" : "text-fg-muted")}>{s.index}</span>
                    <span className="font-heading whitespace-nowrap text-[15px] lg:text-[clamp(1.75rem,1.2rem+1vw,2.25rem)]">{s.name}</span>
                  </span>
                  <span
                    className={cn(
                      "hidden pl-[2.5rem] leading-relaxed lg:grid lg:transition-[grid-template-rows,opacity] lg:duration-300",
                      selected ? "lg:grid-rows-[1fr] lg:opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0"
                    )}
                  >
                    <span className="overflow-hidden pt-2 text-fg">{s.promise}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-[-1px] hidden h-[2px] origin-left bg-signal-ink transition-transform duration-500 lg:block",
                      selected ? "w-full scale-x-100" : "w-full scale-x-0"
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            {solutions.map((s, i) => {
              const selected = i === active;
              return (
                <div
                  key={s.slug}
                  id={`${uid}-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`${uid}-tab-${i}`}
                  hidden={!selected}
                  className="motion-safe:animate-[panel-in_420ms_cubic-bezier(0.22,1,0.36,1)]"
                >
                  <SolutionDemoView demo={s.demo} active={selected} />
                  {/* no celular a promessa da aba não aparece: entra aqui */}
                  <p className="font-heading mt-8 text-balance text-[length:var(--text-h3)] text-fg lg:hidden">{s.promise}</p>
                  {/* visão geral: uma frase e três entregas; o detalhe fica em /solucoes */}
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-8">
                    <p className="text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg">{s.summary}</p>
                    <div>
                      <ul aria-label="Entregas" className="space-y-2 leading-relaxed text-fg">
                        {s.highlights.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-current" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-rule pt-6">
                    <Button href={contactHref(s.interest)} variant="solid" arrow>
                      {s.cta}
                    </Button>
                    <p className="text-[length:var(--text-small)] text-fg-muted">
                      Exemplos:{" "}
                      {s.examples.map((slug, k) => {
                        const p = getProjectBySlug(slug);
                        if (!p) return null;
                        return (
                          <span key={slug}>
                            {k > 0 && ", "}
                            <Link href={`/projetos/${slug}`} className="focus-ring text-fg underline decoration-rule underline-offset-4 hover:decoration-fg">
                              {p.title}
                            </Link>
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
