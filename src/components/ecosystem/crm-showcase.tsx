"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/heading";
import { arpexCrm } from "@/data/products";
import { waLink } from "@/data/social-links";

const pipelineColumns = [
  { name: "Leads", dotClass: "bg-muted" },
  { name: "Qualificação", dotClass: "bg-champagne" },
  { name: "Proposta", dotClass: "bg-system-soft" },
  { name: "Fechado", dotClass: "bg-system" },
];

/**
 * Fragmentos de dados dispersos (planilha, WhatsApp, tarefas soltas, e-mail)
 * que convergem para o pipeline na entrada da seção — o mesmo material
 * narrativo dos fragmentos do Hero, reaparecendo aqui em menor escala para
 * fechar o arco "disperso → sistema" no produto próprio da ArpeX.
 */
const dataChips = [
  { label: "Planilha", top: "6%", left: "-6%", dx: -46, dy: -22, rotate: -8 },
  { label: "WhatsApp", top: "-4%", left: "58%", dx: 40, dy: -30, rotate: 6 },
  { label: "Tarefas soltas", top: "48%", left: "-10%", dx: -50, dy: 10, rotate: -5 },
  { label: "E-mail", top: "88%", left: "64%", dx: 42, dy: 28, rotate: 5 },
];

/**
 * Representação abstrata da anatomia do ArpeX CRM (colunas reais do produto:
 * Leads, Qualificação, Proposta, Fechado), com acabamento de produto real
 * (barra de topo, contagem por coluna, indicador de status). Sem dados,
 * nomes de cliente ou métricas inventadas — placeholder honesto até
 * recebermos screenshots reais do produto para substituir por captura real.
 */
function PipelineAnatomy() {
  return (
    <div className="overflow-hidden rounded-xl border border-smoke bg-graphite shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-smoke px-6 py-4">
        <span className="text-sm font-semibold text-ivory">ArpeX CRM — pipeline</span>
        <span className="flex items-center gap-2 text-xs font-semibold text-system">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-system" />
          Conectado
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 p-6">
        {pipelineColumns.map((col, ci) => {
          const count = ci === 3 ? 1 : 3 - ci;
          return (
            <div key={col.name} className="space-y-2">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${col.dotClass}`} />
                {col.name}
              </p>
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="h-10 rounded-md border border-smoke bg-black/40" aria-hidden />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CrmShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const chips = chipRefs.current.filter((el): el is HTMLDivElement => !!el);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce || !pipelineRef.current) {
        gsap.set(chips, { autoAlpha: 0 });
        return;
      }

      gsap.set(pipelineRef.current, { opacity: 0, y: 14 });
      gsap.set(chips, {
        opacity: 0,
        scale: 0.85,
        filter: "blur(3px)",
        x: (i) => dataChips[i].dx,
        y: (i) => dataChips[i].dy,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(chips, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      })
        .to(pipelineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.25")
        .to(chips, { opacity: 0, scale: 0.7, duration: 0.4, stagger: 0.05, ease: "power2.in" }, "+=0.35");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="overflow-hidden bg-black py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        <div>
          <Label>Ecossistema ArpeX</Label>
          <h2 className="mt-4 text-[length:var(--text-h2)] font-semibold text-ivory">{arpexCrm.name}</h2>
          <p className="mt-3 text-[length:var(--text-body-lg)] text-system">{arpexCrm.tagline}</p>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-muted">{arpexCrm.description}</p>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {arpexCrm.features.map((f) => (
              <li key={f.title} className="text-sm text-ivory/80">
                <span className="text-system">·</span> {f.title}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              href={waLink("Olá! Vim pelo site e quero conhecer o ArpeX CRM.")}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              Conhecer o ArpeX CRM
            </Button>
          </div>
        </div>

        <div ref={stageRef} className="relative">
          {dataChips.map((chip, i) => (
            <div
              key={chip.label}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              aria-hidden
              style={{ top: chip.top, left: chip.left, rotate: `${chip.rotate}deg` }}
              className="pointer-events-none absolute z-10 rounded-full border border-smoke bg-graphite px-3 py-1 text-xs font-semibold text-champagne"
            >
              {chip.label}
            </div>
          ))}

          <div ref={pipelineRef}>
            <PipelineAnatomy />
          </div>
        </div>
      </div>
    </section>
  );
}
