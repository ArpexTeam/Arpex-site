"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { CRM_STORY_TIMELINE as T } from "@/lib/gsap/motion-tokens";
import { Button } from "@/components/ui/button";
import { Label, H2 } from "@/components/ui/heading";
import { arpexCrm } from "@/data/products";
import { waLink } from "@/data/social-links";

const pipelineColumns = [
  { name: "Leads", dotClass: "bg-muted", ghosts: 3 },
  { name: "Qualificação", dotClass: "bg-champagne", ghosts: 2 },
  { name: "Proposta", dotClass: "bg-system-soft", ghosts: 1 },
  { name: "Fechado", dotClass: "bg-system", ghosts: 1 },
];

/**
 * Fragmentos de dados dispersos (mesmo material narrativo do Hero e do Mapa
 * Operacional) que convergem para a entrada do pipeline. Coordenadas em %
 * dentro de .crm-story-visual — usadas tanto para posicionar os chips via
 * CSS (top/left) quanto como coordenadas do SVG de rotas (viewBox 0 0 100
 * 100 com preserveAspectRatio="none", para casar 1:1 com as porcentagens).
 */
const dataChips = [
  { label: "Planilha", top: 6, left: -4, rotate: -6 },
  { label: "WhatsApp", top: -6, left: 62, rotate: 5 },
  { label: "Tarefas soltas", top: 48, left: -10, rotate: -4 },
  { label: "E-mail", top: 88, left: 64, rotate: 4 },
] as const;

/** Ponto de entrada comum (borda da coluna "Leads") para onde os chips convergem. */
const ENTRY = { top: 46, left: 6 };

/** Posições (% dentro de .crm-board-columns) por onde a oportunidade passa. */
const OPP_POSITION = {
  full: { left: [4, 29, 54, 79], top: 64 },
  compact: { left: 8, top: [4, 29, 54, 79] },
} as const;

const stateTexts = [
  "Informação dispersa.",
  "Tudo entra no mesmo fluxo.",
  "Cada oportunidade passa a ter contexto.",
  "O próximo passo deixa de depender da memória.",
  "Pipeline, cadência e follow-up em um único fluxo.",
];

export default function CrmShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const routeRefs = useRef<Array<SVGPathElement | null>>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const columnsTrackRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const columnAccentRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const opportunityRef = useRef<HTMLDivElement>(null);
  const nextStepRef = useRef<HTMLDivElement>(null);
  const continuityRef = useRef<HTMLDivElement>(null);
  const stateTextRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const chips = chipRefs.current.filter(Boolean) as HTMLDivElement[];
      const routes = routeRefs.current.filter(Boolean) as SVGPathElement[];
      const columns = columnRefs.current.filter(Boolean) as HTMLDivElement[];
      const accents = columnAccentRefs.current.filter(Boolean) as HTMLSpanElement[];
      const stateTextEls = stateTextRefs.current.filter(Boolean) as HTMLParagraphElement[];
      const board = boardRef.current;
      const bg = backgroundRef.current;
      const opportunity = opportunityRef.current;
      const nextStep = nextStepRef.current;
      const continuity = continuityRef.current;

      function neutralizeColumns() {
        gsap.set(columns, { borderColor: "var(--color-smoke)", backgroundColor: "rgba(255,255,255,0)" });
        gsap.set(accents, { scaleX: 0 });
      }

      function setFinalStateInstantly() {
        gsap.set(chips, { opacity: 0 });
        gsap.set(routes, { strokeDashoffset: 0 });
        gsap.set(board, { opacity: 1, scale: 1 });
        gsap.set(bg, { yPercent: 0 });
        neutralizeColumns();
        gsap.set(columns[3], { borderColor: "var(--color-system)", backgroundColor: "rgba(0,207,119,0.08)" });
        gsap.set(accents[3], { scaleX: 1 });
        gsap.set(opportunity, {
          opacity: 1,
          left: `${OPP_POSITION.full.left[3]}%`,
          top: `${OPP_POSITION.full.top}%`,
        });
        gsap.set(nextStep, { opacity: 0 });
        gsap.set(continuity, { opacity: 1 });
        gsap.set(stateTextEls, { opacity: 0 });
        gsap.set(stateTextEls[stateTextEls.length - 1], { opacity: 1 });
      }

      if (reduce) {
        setFinalStateInstantly();
        return;
      }

      /** Timeline completa, ligada ao scroll (scrub), para o palco sticky de desktop. */
      function buildFullTimeline() {
        if (!board || !opportunity) return null;

        gsap.set(chips, {
          opacity: 1,
          top: (i: number) => `${dataChips[i].top}%`,
          left: (i: number) => `${dataChips[i].left}%`,
          rotate: (i: number) => dataChips[i].rotate,
        });
        routes.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(board, { opacity: 0.55, scale: 0.97 });
        gsap.set(bg, { yPercent: -1.5 });
        neutralizeColumns();
        gsap.set(opportunity, { opacity: 0, left: `${OPP_POSITION.full.left[0]}%`, top: `${OPP_POSITION.full.top}%` });
        gsap.set(nextStep, { opacity: 0 });
        gsap.set(continuity, { opacity: 0 });
        gsap.set(stateTextEls, { opacity: 0, y: 6 });
        gsap.set(stateTextEls[0], { opacity: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=72",
            end: "bottom bottom",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });

        function swapState(index: number, at: string) {
          const prev = stateTextEls[index - 1];
          const next = stateTextEls[index];
          if (prev) tl.to(prev, { opacity: 0, y: -6, duration: 0.35 }, at);
          if (next) tl.to(next, { opacity: 1, y: 0, duration: 0.35 }, at);
        }

        function activateColumn(index: number, at: string) {
          const prevIndex = index - 1;
          if (prevIndex >= 0) {
            tl.to(columns[prevIndex], { borderColor: "var(--color-smoke)", backgroundColor: "rgba(255,255,255,0)", duration: 0.35 }, at);
            tl.to(accents[prevIndex], { scaleX: 0, duration: 0.3 }, at);
          }
          tl.to(columns[index], { borderColor: "var(--color-system)", backgroundColor: "rgba(0,207,119,0.08)", duration: 0.35 }, at);
          tl.to(accents[index], { scaleX: 1, duration: 0.35 }, at + "+=0.05");
        }

        // Estado 1 — Dispersão (0–18%): a leitura já funciona no frame zero;
        // só o fundo deriva bem devagar para dar profundidade editorial.
        tl.addLabel("dispersion", T.dispersion);
        tl.to(bg, { yPercent: 0.5, duration: T.convergence - T.dispersion }, "dispersion");

        // Estado 2 — Convergência (18–38%): chips viajam até a entrada comum,
        // as rotas desenham por trás deles (stroke-dashoffset).
        tl.addLabel("convergence", T.convergence);
        swapState(1, "convergence");
        chips.forEach((chip, i) => {
          tl.to(
            chip,
            {
              top: `${ENTRY.top}%`,
              left: `${ENTRY.left}%`,
              rotate: 0,
              scale: 0.9,
              duration: (T.entry - T.convergence) * 0.85,
              ease: "power1.inOut",
            },
            "convergence+=" + i * 0.12
          );
        });
        routes.forEach((path, i) => {
          tl.to(path, { strokeDashoffset: 0, duration: (T.entry - T.convergence) * 0.8, ease: "power2.inOut" }, "convergence+=" + i * 0.12);
        });
        tl.to(bg, { yPercent: 1.5, duration: T.entry - T.convergence }, "convergence");

        // Estado 3 — Entrada organizada (38–57%): chips são absorvidos, o
        // quadro ganha definição, "Leads" acende e a primeira oportunidade aparece.
        tl.addLabel("entry", T.entry);
        swapState(2, "entry");
        tl.to(chips, { opacity: 0, scale: 0.6, duration: (T.trackingA - T.entry) * 0.5, ease: "power1.in" }, "entry")
          .to(board, { opacity: 1, scale: 1, duration: (T.trackingA - T.entry) * 0.8, ease: "power2.out" }, "entry");
        activateColumn(0, "entry+=0.15");
        tl.to(opportunity, { opacity: 1, duration: 0.4, ease: "power2.out" }, "entry+=0.25");
        tl.to(nextStep, { opacity: 1, duration: 0.3 }, "entry+=0.4");

        // Estado 4 — Acompanhamento (57–79%): a oportunidade percorre
        // Leads → Qualificação → Proposta, coluna ativa muda a cada chegada.
        tl.addLabel("trackingA", T.trackingA);
        swapState(3, "trackingA");
        tl.to(opportunity, { left: `${OPP_POSITION.full.left[1]}%`, duration: T.trackingB - T.trackingA, ease: "power2.inOut" }, "trackingA");
        activateColumn(1, "trackingA+=" + (T.trackingB - T.trackingA) * 0.7);

        tl.addLabel("trackingB", T.trackingB);
        tl.to(opportunity, { left: `${OPP_POSITION.full.left[2]}%`, duration: T.closing - T.trackingB, ease: "power2.inOut" }, "trackingB");
        activateColumn(2, "trackingB+=" + (T.closing - T.trackingB) * 0.7);

        // Estado 5 — Fechamento e continuidade (79–92%): chega a "Fechado",
        // indicador de continuidade aparece — o processo não termina na venda.
        tl.addLabel("closing", T.closing);
        swapState(4, "closing");
        tl.to(opportunity, { left: `${OPP_POSITION.full.left[3]}%`, duration: (T.final - T.closing) * 0.75, ease: "power2.inOut" }, "closing");
        activateColumn(3, "closing+=" + (T.final - T.closing) * 0.55);
        tl.to(nextStep, { opacity: 0, duration: 0.25 }, "closing+=" + (T.final - T.closing) * 0.55);
        tl.to(continuity, { opacity: 1, duration: 0.35, ease: "power2.out" }, "closing+=" + (T.final - T.closing) * 0.7);

        // Estado 6 — Quadro final (92–100%): hold real, nada mais se move.
        tl.addLabel("final", T.final);
        tl.to({}, { duration: T.end - T.final });

        if (process.env.NODE_ENV !== "production") {
          console.assert(
            Math.abs(tl.duration() - T.end) < 0.001,
            `Pipeline Vivo timeline duration (${tl.duration()}) não corresponde ao planejado (${T.end}).`
          );
        }

        return tl;
      }

      /**
       * Mobile/tablet: sem sticky, sem scrub. Um reveal curto (uma vez) e a
       * oportunidade avança uma única vez pelas quatro etapas empilhadas
       * verticalmente (ver .crm-board-columns em motion.css).
       */
      function buildCompactTimeline() {
        gsap.set(chips, { opacity: 0 });
        gsap.set(board, { opacity: 0, y: 16 });
        neutralizeColumns();
        gsap.set(opportunity, { opacity: 0, left: `${OPP_POSITION.compact.left}%`, top: `${OPP_POSITION.compact.top[0]}%` });
        gsap.set(nextStep, { opacity: 0 });
        gsap.set(continuity, { opacity: 0 });
        gsap.set(stateTextEls, { opacity: 0 });
        gsap.set(stateTextEls[0], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        tl.to(board, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
          .to(opportunity, { opacity: 1, duration: 0.35 }, "-=0.2")
          .to(stateTextEls[0], { opacity: 0, duration: 0.2 }, "+=0.15")
          .to(stateTextEls[stateTextEls.length - 1], { opacity: 1, duration: 0.2 }, "<");

        [1, 2, 3].forEach((i) => {
          tl.to(columns[i - 1], { borderColor: "var(--color-smoke)", backgroundColor: "rgba(255,255,255,0)", duration: 0.25 })
            .to(columns[i], { borderColor: "var(--color-system)", backgroundColor: "rgba(0,207,119,0.08)", duration: 0.25 }, "<")
            .to(opportunity, { top: `${OPP_POSITION.compact.top[i]}%`, duration: 0.4, ease: "power2.inOut" }, "<");
        });
        tl.to(columns[0], { borderColor: "var(--color-system)", backgroundColor: "rgba(0,207,119,0.08)", duration: 0.25 }, 0);
        tl.to(continuity, { opacity: 1, duration: 0.3 });

        return tl;
      }

      const mm = gsap.matchMedia(sectionRef.current ?? undefined);

      // isFull/isCompact precisam casar, termo a termo, com a media query de
      // .crm-story-stage / .crm-board-columns em motion.css — a mesma regra
      // já usada no Fragment Flow (ver operational-map.tsx), para nunca ter
      // um palco sticky sem a timeline completa (ou o inverso).
      mm.add(
        {
          isFull: "(min-width: 900px) and (pointer: fine)",
          isCompact: "(max-width: 899.98px), (pointer: coarse)",
        },
        (context) => {
          const useFull = Boolean(context.conditions?.isFull);
          const tl = useFull ? buildFullTimeline() : buildCompactTimeline();
          let cleanupMouse = () => {};

          if (useFull && tl && visualRef.current) {
            const el = visualRef.current;
            const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
            const rTo = gsap.quickTo(el, "rotate", { duration: 0.6, ease: "power3" });

            function onMove(e: PointerEvent) {
              if (tl && tl.scrollTrigger && !tl.scrollTrigger.isActive) return;
              const rect = el.getBoundingClientRect();
              const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
              const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
              xTo(gsap.utils.clamp(-6, 6, relX * 6));
              yTo(gsap.utils.clamp(-6, 6, relY * 6));
              rTo(gsap.utils.clamp(-0.6, 0.6, relX * 0.6));
            }

            window.addEventListener("pointermove", onMove);
            cleanupMouse = () => {
              window.removeEventListener("pointermove", onMove);
              gsap.set(el, { x: 0, y: 0, rotate: 0 });
            };
          }

          return () => {
            cleanupMouse();
          };
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} data-scene="crm-story" className="crm-story-section bg-black">
      <div ref={stageRef} className="crm-story-stage w-full">
        <div className="crm-story-pad mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-14 px-5 md:grid-cols-2 md:px-8">
          <div className="max-w-[46ch]">
            <Label>Ecossistema ArpeX</Label>
            <H2 className="mt-4">{arpexCrm.name}</H2>
            <p className="mt-3 text-[length:var(--text-body-lg)] text-system">{arpexCrm.tagline}</p>
            <p className="mt-5 leading-relaxed text-muted">{arpexCrm.description}</p>

            <div className="relative mt-8 min-h-[3.25rem]" aria-live="polite">
              {stateTexts.map((text, i) => (
                <p
                  key={text}
                  ref={(el) => {
                    stateTextRefs.current[i] = el;
                  }}
                  data-crm-state
                  className="absolute inset-0 text-lg font-semibold text-ivory"
                >
                  {text}
                </p>
              ))}
            </div>

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

          <div className="crm-story-visual relative mx-auto w-full max-w-[620px]">
            {/* Wrapper próprio, recortado nos limites da coluna visual — o glow
                sangra (inset negativo) para dar profundidade, mas sem essa borda
                de corte ele extrapola a largura da página no layout mobile de
                coluna única (onde não há a folga do grid de duas colunas). */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div
                ref={backgroundRef}
                className="absolute inset-[-14%] rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(0,207,119,0.12), transparent 70%)" }}
              />
            </div>

            <div ref={visualRef} className="relative">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="crm-story-routes pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden
              >
                {dataChips.map((chip, i) => (
                  <path
                    key={chip.label}
                    ref={(el) => {
                      routeRefs.current[i] = el;
                    }}
                    d={`M${chip.left + 4},${chip.top + 4} L${ENTRY.left},${ENTRY.top}`}
                    stroke="var(--color-system)"
                    strokeWidth="0.4"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {dataChips.map((chip, i) => (
                <div
                  key={chip.label}
                  ref={(el) => {
                    chipRefs.current[i] = el;
                  }}
                  data-crm-chip
                  aria-hidden
                  className="crm-story-chip pointer-events-none absolute z-10 rounded-full border border-smoke bg-graphite px-3 py-1 text-xs font-semibold text-champagne"
                  style={{ top: `${chip.top}%`, left: `${chip.left}%`, rotate: `${chip.rotate}deg` }}
                >
                  {chip.label}
                </div>
              ))}

              <div
                ref={boardRef}
                data-crm-board
                className="relative overflow-hidden rounded-xl border border-smoke bg-graphite shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center justify-between border-b border-smoke px-6 py-4">
                  <span className="text-sm font-semibold text-ivory">ArpeX CRM — pipeline</span>
                  <span className="flex items-center gap-2 text-xs font-semibold text-system">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-system" />
                    Conectado
                  </span>
                </div>

                <div ref={columnsTrackRef} className="crm-board-columns relative grid gap-3 p-6">
                  {pipelineColumns.map((col, i) => (
                    <div
                      key={col.name}
                      ref={(el) => {
                        columnRefs.current[i] = el;
                      }}
                      data-crm-column
                      className="relative space-y-2 rounded-lg border border-smoke p-2"
                    >
                      <span
                        ref={(el) => {
                          columnAccentRefs.current[i] = el;
                        }}
                        aria-hidden
                        className="absolute inset-x-2 top-0 h-[2px] origin-left bg-system"
                      />
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${col.dotClass}`} />
                        {col.name}
                      </p>
                      {Array.from({ length: col.ghosts }).map((_, gi) => (
                        <div key={gi} className="h-9 rounded-md border border-smoke bg-black/40" aria-hidden />
                      ))}
                    </div>
                  ))}

                  <div
                    ref={opportunityRef}
                    data-crm-opportunity
                    className="absolute z-20 w-[19%] min-w-[92px] rounded-md border border-system/50 bg-black px-2 py-2 text-center text-[11px] font-semibold leading-tight text-ivory shadow-[0_0_16px_rgba(0,207,119,0.25)]"
                  >
                    Nova oportunidade
                  </div>

                  <div
                    ref={nextStepRef}
                    className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-system/40 bg-black/80 px-2.5 py-1 text-[10px] font-semibold text-system"
                    aria-hidden
                  >
                    Próximo passo
                  </div>

                  <div
                    ref={continuityRef}
                    className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-system/40 bg-black/80 px-2.5 py-1 text-[10px] font-semibold text-system"
                    aria-hidden
                  >
                    <span aria-hidden>✓</span> Follow-up contínuo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
