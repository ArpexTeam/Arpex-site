"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { FRAGMENT_FLOW_TIMELINE as T } from "@/lib/gsap/motion-tokens";
import Container from "@/components/ui/container";
import { H2, Label, Sub } from "@/components/ui/heading";

const nodes = [
  { title: "Leads", desc: "Captação dispersa vira entrada única." },
  { title: "Processo", desc: "Tarefas soltas viram fluxo com dono e etapa." },
  { title: "Dados", desc: "Planilhas paralelas viram uma fonte só." },
  { title: "Decisão", desc: "Decisões por memória viram decisão por dado." },
];

/** Posição de cada fragmento no palco espacial (quadrantes), só ativa ≥900px. */
const quadrants: React.CSSProperties[] = [
  { top: "2%", left: "0%" }, // Leads — superior esquerdo
  { top: "2%", left: "54%" }, // Processo — superior direito
  { top: "58%", left: "0%" }, // Dados — inferior esquerdo
  { top: "58%", left: "54%" }, // Decisão — inferior direito
];

/** Deslocamento "disperso" inicial de cada fragmento — fixo, não randômico. */
const scatter = [
  { x: -22, y: -14, rotate: -5, scale: 0.95, opacity: 0.62, blur: 1.4 },
  { x: 20, y: -10, rotate: 4, scale: 0.97, opacity: 0.72, blur: 1.0 },
  { x: -18, y: 16, rotate: 5, scale: 0.94, opacity: 0.56, blur: 1.5 },
  { x: 18, y: 12, rotate: -4, scale: 0.96, opacity: 0.76, blur: 0.8 },
];

/** Loop que conecta os quatro quadrantes — viewBox 0 0 400 400. */
const LOOP_PATH = "M120,120 L280,120 L280,280 L120,280 Z";
const CORNERS = [
  { x: 120, y: 120 },
  { x: 280, y: 120 },
  { x: 280, y: 280 },
  { x: 120, y: 280 },
];

/**
 * Cena "Fragment Flow": os quatro fragmentos da operação (Leads, Processo,
 * Dados, Decisão) começam espalhados e se organizam em um sistema conectado
 * conforme o usuário rola a página. Em desktop (≥900px, sem reduced-motion,
 * ponteiro fino, dispositivo capaz) o palco fica `position: sticky` (CSS,
 * não GSAP pin — ver .fragment-flow-* em motion.css) e uma timeline com
 * `scrub` acompanha o scroll nos dois sentidos. Fora dessas condições, os
 * fragmentos ficam em fluxo normal, empilhados, com uma revelação simples
 * de scroll (uma vez, sem pin) — nunca um container de 210svh.
 */
export default function OperationalMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLLIElement | null>>([]);
  const cornerDotRefs = useRef<Array<SVGCircleElement | null>>([]);
  const connectorPathRef = useRef<SVGPathElement | null>(null);
  const pulseRef = useRef<SVGCircleElement | null>(null);
  const systemFrameRef = useRef<HTMLDivElement>(null);
  const systemResultRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = nodeRefs.current.filter(Boolean) as HTMLLIElement[];
      const corners = cornerDotRefs.current.filter(Boolean) as SVGCircleElement[];
      const connector = connectorPathRef.current;
      const pulse = pulseRef.current;
      const frame = systemFrameRef.current;
      const glow = glowRef.current;
      const result = systemResultRef.current;
      const bg = backgroundRef.current;
      const mobileLine = mobileLineRef.current;

      function setFinalStateInstantly() {
        gsap.set(items, { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: "none" });
        gsap.set(corners, { opacity: 1 });
        gsap.set([frame, glow], { opacity: 1, scale: 1 });
        gsap.set(result, { opacity: 1, y: 0 });
        gsap.set(bg, { yPercent: 0 });
        gsap.set(mobileLine, { scaleY: 1 });
        if (connector) gsap.set(connector, { strokeDashoffset: 0 });
        if (pulse) gsap.set(pulse, { opacity: 0 });
      }

      if (reduce) {
        setFinalStateInstantly();
        return;
      }

      /** Timeline completa, ligada ao scroll (scrub), para o palco sticky de desktop. */
      function buildFullTimeline() {
        if (!connector) return null;

        const pathLength = connector.getTotalLength();

        gsap.set(items, {
          opacity: (i: number) => scatter[i].opacity,
          x: (i: number) => scatter[i].x,
          y: (i: number) => scatter[i].y,
          rotate: (i: number) => scatter[i].rotate,
          scale: (i: number) => scatter[i].scale,
          filter: (i: number) => `blur(${scatter[i].blur}px)`,
        });
        gsap.set(connector, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.set(corners, { opacity: 0 });
        gsap.set(pulse, { opacity: 0, attr: { cx: CORNERS[0].x, cy: CORNERS[0].y } });
        gsap.set([frame, glow], { opacity: 0, scale: 0.92 });
        gsap.set(result, { opacity: 0, y: 10 });
        gsap.set(bg, { yPercent: -2 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=72",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });

        tl.addLabel("fragments", T.fragments);
        // 0%–18%: a cena já faz sentido no primeiro frame — só o fundo deriva muito devagar.
        tl.to(bg, { yPercent: 1.5, duration: T.approach - T.fragments }, "fragments");

        tl.addLabel("approach", T.approach);
        // 18%–48%: fragmentos se aproximam em velocidades diferentes (delay escalonado por índice).
        items.forEach((el, i) => {
          tl.to(
            el,
            {
              x: scatter[i].x * 0.3,
              y: scatter[i].y * 0.3,
              rotate: scatter[i].rotate * 0.25,
              scale: 0.985,
              opacity: 0.96,
              filter: "blur(0.3px)",
              duration: (T.alignment - T.approach) * 0.75,
              ease: "power1.inOut",
            },
            "approach+=" + i * 0.18
          );
        });
        tl.to(bg, { yPercent: 3.5, duration: T.alignment - T.approach }, "approach");

        tl.addLabel("alignment", T.alignment);
        // 48%–68%: posição final, conector desenha, pontos de conexão acendem em sequência.
        tl.to(
          items,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: (T.connection - T.alignment) * 0.85,
            ease: "power2.out",
            stagger: 0.12,
          },
          "alignment"
        )
          .to(connector, { strokeDashoffset: 0, duration: (T.connection - T.alignment) * 0.9, ease: "power2.inOut" }, "alignment")
          .to(corners, { opacity: 1, duration: 0.25, stagger: 0.18 }, "alignment+=0.5")
          .to([frame, glow], { opacity: 1, scale: 1, duration: (T.connection - T.alignment) * 0.8, ease: "power2.out" }, "alignment+=0.4");

        tl.addLabel("connection", T.connection);
        // 68%–86%: pulso percorre o loop; superfície comum já visível por trás dos cards.
        tl.set(pulse, { opacity: 1 }, "connection")
          .to(
            pulse,
            {
              motionPath: { path: connector, align: connector, alignOrigin: [0.5, 0.5], autoRotate: false },
              duration: (T.integrated - T.connection) * 0.85,
              ease: "power1.inOut",
            },
            "connection"
          )
          .to(pulse, { opacity: 0, duration: 0.3 }, "connection+=" + (T.integrated - T.connection - 0.3))
          .to([frame, glow], { scale: 1.03, duration: T.integrated - T.connection }, "connection");

        tl.addLabel("integrated", T.integrated);
        // 86%–100%: rótulo final some, glow se estabiliza, cena segura o estado por um instante.
        tl.to(result, { opacity: 1, y: 0, duration: (T.end - T.integrated) * 0.7, ease: "power2.out" }, "integrated");

        return tl;
      }

      /**
       * Revelação simples (uma vez, sem pin) para tablet/mobile — a conexão
       * aqui é a linha vertical (mobileLine), não o loop SVG do palco
       * espacial (escondido via CSS abaixo de 900px).
       */
      function buildCompactTimeline() {
        gsap.set(items, { opacity: 0, y: 18 });
        gsap.set([frame, glow], { opacity: 0 });
        gsap.set(result, { opacity: 0, y: 8 });
        gsap.set(mobileLine, { scaleY: 0, transformOrigin: "top center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        tl.to(items, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.12 }).to(
          mobileLine,
          { scaleY: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.35"
        );
        tl.to([frame, glow], { opacity: 1, duration: 0.5 }, "-=0.3").to(
          result,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.25"
        );

        return tl;
      }

      const mm = gsap.matchMedia(sectionRef.current ?? undefined);

      mm.add(
        {
          isDesktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
        },
        (context) => {
          const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
          const useFull = Boolean(context.conditions?.isDesktop) && !lowPower;

          const tl = useFull ? buildFullTimeline() : buildCompactTimeline();
          let cleanupMouse = () => {};

          if (useFull && tl && visualWrapRef.current) {
            const el = visualWrapRef.current;
            const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

            function onMove(e: PointerEvent) {
              if (tl && tl.scrollTrigger && !tl.scrollTrigger.isActive) return;
              const rect = el.getBoundingClientRect();
              const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
              const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
              xTo(gsap.utils.clamp(-6, 6, relX * 6));
              yTo(gsap.utils.clamp(-6, 6, relY * 6));
            }

            window.addEventListener("pointermove", onMove);
            cleanupMouse = () => {
              window.removeEventListener("pointermove", onMove);
              gsap.set(el, { x: 0, y: 0 });
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
    <section ref={sectionRef} data-scene="fragment-flow" className="fragment-flow-section bg-ink">
      <div ref={stageRef} className="fragment-flow-stage w-full">
        <Container className="w-full py-20 md:py-24">
          <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
            <div ref={copyRef} className="max-w-[46ch]">
              <Label>Mapa operacional</Label>
              <H2 className="mt-4">Do fragmento ao fluxo único.</H2>
              <Sub className="mt-4">
                Quatro frentes que hoje vivem soltas na operação — e que a ArpeX conecta em um
                sistema só.
              </Sub>

              <div
                ref={systemResultRef}
                data-integrated-system
                className="mt-10 border-l-2 border-system pl-5"
              >
                <p className="font-label text-system">Sistema integrado</p>
                <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-ivory/85">
                  Leads, processos, dados e decisões trabalhando no mesmo fluxo.
                </p>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden">
              <div ref={backgroundRef} aria-hidden className="pointer-events-none absolute inset-[-12%] -z-10">
                <div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background: "radial-gradient(closest-side, rgba(0,207,119,0.14), transparent 70%)",
                  }}
                />
                <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <path d="M-20,90 L420,150" stroke="var(--color-smoke)" strokeWidth="1" />
                  <path d="M-20,330 L420,270" stroke="var(--color-smoke)" strokeWidth="1" />
                </svg>
              </div>

              <div ref={visualWrapRef} className="relative h-full w-full">
                <div
                  ref={glowRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-[18%] rounded-full opacity-0 blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(0,207,119,0.35), transparent 72%)" }}
                />

                <div
                  ref={systemFrameRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-[13%] rounded-[28px] border border-system/25 opacity-0"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,207,119,0.10), transparent 70%)" }}
                />

                <svg
                  viewBox="0 0 400 400"
                  className="fragment-flow-connector pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden
                  data-connector-path
                >
                  <path d={LOOP_PATH} stroke="var(--color-smoke)" strokeWidth="1.5" fill="none" />
                  <path ref={connectorPathRef} d={LOOP_PATH} stroke="var(--color-system)" strokeWidth="1.5" fill="none" />
                  {CORNERS.map((c, i) => (
                    <circle
                      key={`${c.x}-${c.y}`}
                      ref={(el) => {
                        cornerDotRefs.current[i] = el;
                      }}
                      cx={c.x}
                      cy={c.y}
                      r="4"
                      fill="var(--color-system-soft)"
                    />
                  ))}
                  <circle ref={pulseRef} r="5" fill="var(--color-system-soft)" />
                </svg>

                <div
                  className="fragment-flow-mobile-line pointer-events-none absolute bottom-2 left-0 top-2 w-px bg-smoke"
                  aria-hidden
                >
                  <div
                    ref={mobileLineRef}
                    className="h-full w-full origin-top bg-system shadow-[0_0_10px_rgba(0,207,119,0.6)]"
                  />
                </div>

                <ol className="fragment-flow-list relative flex h-full flex-col gap-4" aria-label="Fragmentos da operação">
                  {nodes.map((node, i) => (
                    <li
                      key={node.title}
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      data-fragment-node
                      className="fragment-node rounded-xl border border-smoke bg-graphite p-6"
                      style={quadrants[i]}
                    >
                      <span className="font-label text-system">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 text-lg font-semibold text-ivory">{node.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{node.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
