"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/motion/use-in-view";
import { crmStory } from "@/data/crm";
import ScreenPan from "@/components/ui/screen-pan";

/**
 * Celular, tablet e movimento reduzido: uma tela por vez, em três estados
 * (Hoje → Modo foco → Pipeline), com a explicação curta logo abaixo. Troca
 * pelas abas (toque, clique, setas, Home/End) ou deslizando o quadro na
 * horizontal; a rolagem vertical da página continua livre (touch-action:
 * pan-y). Ao aparecer, o quadro se aproxima da ação de cada tela.
 * No celular, as telas são as capturas de celular (ou um recorte legível da
 * tela de computador); do tablet em diante, a tela inteira em 16:10.
 */
export default function CrmStates({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [live, setLive] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const inView = useInView(stageRef, { threshold: 0.45 });
  const uid = useId();

  useEffect(() => {
    if (!inView) {
      setLive(false);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setLive(true)));
    return () => cancelAnimationFrame(id);
  }, [inView]);

  function select(i: number, focus = false) {
    const n = (i + crmStory.length) % crmStory.length;
    if (n !== active) {
      setDir(n > active ? 1 : -1);
      setActive(n);
    }
    if (focus) tabRefs.current[n]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(i + 1, true),
      ArrowLeft: () => select(i - 1, true),
      Home: () => select(0, true),
      End: () => select(crmStory.length - 1, true),
    };
    const fn = keys[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label="Telas do ArpeX CRM" className="flex gap-1 border-b border-rule">
        {crmStory.map((s, i) => (
          <button
            key={s.key}
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

      <div
        ref={stageRef}
        className="mt-6 grid touch-pan-y [grid-template-areas:'tela'] md:mt-8"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const s = swipe.current;
          swipe.current = null;
          if (!s) return;
          const dx = e.clientX - s.x;
          const dy = e.clientY - s.y;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) select(active + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          swipe.current = null;
        }}
      >
        {crmStory.map((s, i) => {
          const selected = i === active;
          const alt = `${s.name} — tela do ArpeX CRM (dados de demonstração)`;
          return (
            <div
              key={s.key}
              id={`${uid}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${i}`}
              inert={!selected}
              className={cn("[grid-area:tela]", selected ? "visible" : "invisible")}
            >
              <div
                className={cn(selected && "motion-safe:animate-[screen-in_520ms_cubic-bezier(0.22,1,0.36,1)_both]")}
                style={selected ? ({ "--swap-x": `${dir * 18}%`, "--swap-ry": `${dir * -14}deg` } as React.CSSProperties) : undefined}
              >
                <ScreenPan
                  spec={s.compact}
                  aspect={4 / 5}
                  live={selected && live}
                  alt={alt}
                  sizes={`(min-width: 768px) 1px, ${s.compact.src.width > 1000 ? "260vw" : "90vw"}`}
                  className="mx-auto w-[min(100%,340px)] md:hidden"
                />
                <ScreenPan spec={s.wide} aspect={1.6} live={selected && live} alt={alt} sizes="(min-width: 768px) 92vw, 1px" className="hidden md:block" />
              </div>
              <p
                className={cn(
                  "mx-auto mt-5 max-w-[340px] text-pretty leading-relaxed text-fg-muted md:mx-0 md:max-w-[52ch]",
                  selected && "motion-safe:animate-[panel-swap_440ms_cubic-bezier(0.22,1,0.36,1)_90ms_both]"
                )}
                style={selected ? ({ "--swap-x": `${dir * 14}px` } as React.CSSProperties) : undefined}
              >
                <span className="font-heading text-fg">{s.name}.</span> {s.text}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mx-auto mt-4 max-w-[340px] text-[length:var(--text-small)] text-fg-muted md:mx-0 md:max-w-none">
        Telas reais do ArpeX CRM, com dados de demonstração.
      </p>
    </div>
  );
}
