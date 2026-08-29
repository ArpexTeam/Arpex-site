"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import Container from "@/components/ui/container";
import { H2, Label, Sub } from "@/components/ui/heading";

const nodes = [
  { title: "Leads", desc: "Captação dispersa vira entrada única." },
  { title: "Processo", desc: "Tarefas soltas viram fluxo com dono e etapa." },
  { title: "Dados", desc: "Planilhas paralelas viram uma fonte só." },
  { title: "Decisão", desc: "Decisões por memória viram decisão por dado." },
];

/** Deslocamento inicial "espalhado" de cada nó — fixo (não randômico a cada render). */
const scatter = [
  { x: -18, y: -12, rotate: -7 },
  { x: 16, y: 10, rotate: 5 },
  { x: -12, y: 14, rotate: -5 },
  { x: 20, y: -8, rotate: 6 },
];

const railDots = [8, 36, 64, 92];
const RAIL_PATH = "M8,12 L36,12 L64,12 L92,12";

/**
 * Mapa Operacional animado: os 4 nós entram espalhados (posição, rotação,
 * opacidade e um leve blur simulando "baixa definição") e se alinham quando a
 * seção entra em tela — animação única, não pinada, para que o usuário
 * continue rolando/lendo normalmente. O trilho abaixo dos cartões desenha o
 * caminho verde contínuo e um pulso percorre-o uma vez via MotionPathPlugin,
 * terminando no indicador "Sistema integrado".
 */
export default function OperationalMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<Array<HTMLLIElement | null>>([]);
  const fgPathRef = useRef<SVGPathElement | null>(null);
  const pulseRef = useRef<SVGCircleElement | null>(null);
  const systemBarRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = nodeRefs.current.filter(Boolean) as HTMLLIElement[];

      if (reduce || !fgPathRef.current) {
        gsap.set(items, { opacity: 1, x: 0, y: 0, rotate: 0, filter: "none" });
        gsap.set(fgPathRef.current, { autoAlpha: 1 });
        gsap.set(systemBarRef.current, { opacity: 1, y: 0 });
        return;
      }

      const pathLength = fgPathRef.current.getTotalLength();

      gsap.set(items, {
        opacity: 0.3,
        x: (i) => scatter[i].x,
        y: (i) => scatter[i].y,
        rotate: (i) => scatter[i].rotate,
        scale: 0.93,
        filter: "blur(2px)",
      });
      gsap.set(fgPathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      gsap.set(pulseRef.current, { opacity: 0 });
      gsap.set(systemBarRef.current, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(items, {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
      })
        .to(fgPathRef.current, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.45")
        .set(pulseRef.current, { opacity: 1 })
        .to(pulseRef.current, {
          motionPath: { path: RAIL_PATH },
          duration: 0.9,
          ease: "power1.inOut",
        })
        .to(pulseRef.current, { opacity: 0, duration: 0.25 }, "-=0.05")
        .to(systemBarRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink py-28 md:py-36">
      <Container>
        <div className="mb-16 max-w-[52ch]">
          <Label>Mapa operacional</Label>
          <H2 className="mt-4">Do fragmento ao fluxo único.</H2>
          <Sub className="mt-4">
            Quatro frentes que hoje vivem soltas na operação — e que a ArpeX conecta em
            um sistema só.
          </Sub>
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {nodes.map((node, i) => (
            <li
              key={node.title}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="relative rounded-xl border border-smoke bg-graphite p-7 transition-colors hover:border-system/40"
            >
              <span className="font-label text-system">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold text-ivory">{node.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{node.desc}</p>
            </li>
          ))}
        </ol>

        <div className="relative mt-6 h-10 rounded-lg border border-smoke bg-graphite md:h-12">
          <svg viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full">
            <path d={RAIL_PATH} stroke="var(--color-smoke)" strokeWidth="0.6" strokeDasharray="2 2" fill="none" />
            <path ref={fgPathRef} d={RAIL_PATH} stroke="var(--color-system)" strokeWidth="0.6" fill="none" />
            {railDots.map((x) => (
              <circle key={x} cx={x} cy={12} r="1.3" fill="var(--color-smoke)" />
            ))}
            <circle ref={pulseRef} cx={railDots[0]} cy={12} r="1.6" fill="var(--color-system-soft)" />
          </svg>
        </div>

        <div
          ref={systemBarRef}
          className="mt-4 flex items-center justify-center gap-4 rounded-lg border border-smoke bg-graphite px-8 py-6"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-system" />
          <p className="font-label text-system">Sistema integrado</p>
        </div>
      </Container>
    </section>
  );
}
