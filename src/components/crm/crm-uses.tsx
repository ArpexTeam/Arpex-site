"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { crmUses } from "@/data/crm";

/**
 * Os três usos práticos como abas (mesmo padrão das frentes da home): cada
 * painel mostra duas telas inteiras. Os painéis dividem a mesma célula da
 * grade, então a seção não muda de altura na troca.
 */
export default function CrmUses() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();

  function focusTab(i: number) {
    const n = (i + crmUses.length) % crmUses.length;
    setActive(n);
    tabRefs.current[n]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(i + 1),
      ArrowLeft: () => focusTab(i - 1),
      Home: () => focusTab(0),
      End: () => focusTab(crmUses.length - 1),
    };
    const fn = keys[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  }

  return (
    <>
      <div role="tablist" aria-label="Usos do ArpeX CRM" className="no-scrollbar -mx-[var(--gutter)] flex gap-1 overflow-x-auto border-b border-rule px-[var(--gutter)] md:mx-0 md:px-0">
        {crmUses.map((u, i) => (
          <button
            key={u.key}
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
            className="tab shrink-0"
          >
            {u.tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid [grid-template-areas:'painel'] md:mt-10">
        {crmUses.map((u, i) => {
          const selected = i === active;
          return (
            <div
              key={u.key}
              id={`${uid}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${i}`}
              inert={!selected}
              className={cn(
                "[grid-area:painel]",
                selected ? "visible motion-safe:animate-[panel-in_360ms_cubic-bezier(0.22,1,0.36,1)]" : "invisible"
              )}
            >
              <p className="font-heading text-[length:var(--text-h3)] text-fg">{u.title}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-10 md:grid-cols-2">
                {u.screens.map((s) => (
                  <li key={s.key}>
                    <figure>
                      <div className="frame relative aspect-[16/10]">
                        <Image src={s.src} alt={`${s.name} — tela do ArpeX CRM (dados de demonstração)`} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover object-left-top" />
                      </div>
                      <figcaption className="mt-3">
                        <span className="font-heading block text-fg">{s.name}</span>
                        <span className="mt-1 block max-w-[48ch] text-pretty text-fg-muted">{s.text}</span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
