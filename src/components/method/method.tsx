"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import Container from "@/components/ui/container";
import { H2, Label } from "@/components/ui/heading";
import { methodSteps, type MethodStepIcon } from "@/data/method";

const iconPaths: Record<MethodStepIcon, React.ReactElement> = {
  plan: <path d="M6 6h12v12H6zM9 3v3M15 3v3M9 10h6" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  content: <path d="M6 7h12M6 11h12M6 15h8" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  fe: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  dev: <path d="M8 7h8v10H8zM10 9h4M10 12h4" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  qa: <path d="M10 14l2 2 4-4M12 5a7 7 0 100 14 7 7 0 000-14z" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  ship: <path d="M12 3v4M6 7h12M8 11h8M7 15h10M9 19h6" stroke="currentColor" strokeWidth="1.5" fill="none" />,
};

function GlowIcon({
  icon,
  dotRef,
  ringRef,
}: {
  icon: MethodStepIcon;
  dotRef: (el: HTMLDivElement | null) => void;
  ringRef: (el: SVGCircleElement | null) => void;
}) {
  return (
    <div ref={dotRef} className="relative h-14 w-14">
      <div aria-hidden className="absolute inset-0 rounded-full bg-system/25 blur-[18px]" />
      <div aria-hidden className="absolute inset-0 rounded-full bg-ink ring-1 ring-smoke" />
      <svg
        viewBox="0 0 56 56"
        className="absolute inset-0 z-10 h-full w-full text-system"
        aria-hidden
        focusable="false"
      >
        <circle
          ref={ringRef}
          cx="28"
          cy="28"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute inset-0 z-10 m-auto h-6 w-6 text-system" aria-hidden>
        {iconPaths[icon]}
      </svg>
    </div>
  );
}

/**
 * Metodologia restaurada do site original: seis etapas com ícone próprio,
 * anel verde desenhando (stroke-dasharray) e "pop" ao entrar em viewport,
 * ligadas a uma linha de progresso (horizontal no desktop, vertical no
 * mobile) cujo avanço acompanha a posição de cada etapa na linha — o
 * delay de cada dot/anel é proporcional à sua posição, como no componente
 * antigo (não um stagger uniforme).
 */
export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ringRefs = useRef<Array<SVGCircleElement | null>>([]);

  const lineDuration = 1.2;
  const lineDelay = 0.1;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[];
      const rings = ringRefs.current.filter(Boolean) as SVGCircleElement[];

      if (reduce || !lineRef.current) {
        gsap.set([lineRef.current, lineVerticalRef.current], { scaleX: 1, scaleY: 1 });
        gsap.set(dots, { scale: 1, opacity: 1 });
        gsap.set(rings, { strokeDashoffset: 0 });
        return;
      }

      rings.forEach((ring) => {
        const len = ring.getTotalLength();
        gsap.set(ring, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(lineVerticalRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(dots, { scale: 0.75, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(
        [lineRef.current, lineVerticalRef.current],
        { scaleX: 1, scaleY: 1, duration: lineDuration, ease: "power2.out" },
        0
      );

      methodSteps.forEach((_, i) => {
        const progress = i / Math.max(methodSteps.length - 1, 1);
        const delay = lineDelay + lineDuration * progress;
        if (dots[i]) {
          tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.42, ease: "back.out(2)" }, delay);
        }
        if (rings[i]) {
          tl.to(rings[i], { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, delay);
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-graphite py-24 md:py-32">
      <Container>
        <div className="mb-16 max-w-[52ch]">
          <Label>Método</Label>
          <H2 className="mt-4">Como a ArpeX conduz cada solução</H2>
        </div>

        <ol className="relative grid grid-cols-1 gap-y-10 md:grid-cols-6 md:gap-x-4" aria-label="Etapas da metodologia">
          {/* linha horizontal — desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-smoke md:block" aria-hidden />
          <div
            ref={lineRef}
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-system md:block"
          />

          {/* linha vertical — mobile */}
          <div className="pointer-events-none absolute left-7 top-7 bottom-7 w-px bg-smoke md:hidden" aria-hidden />
          <div
            ref={lineVerticalRef}
            aria-hidden
            className="pointer-events-none absolute left-7 top-7 bottom-7 w-px bg-system md:hidden"
          />

          {methodSteps.map((step, i) => (
            <li
              key={step.index}
              className="relative grid grid-cols-[56px_1fr] items-start gap-4 text-left md:block"
              role="listitem"
            >
              <GlowIcon
                icon={step.icon}
                dotRef={(el) => {
                  dotRefs.current[i] = el;
                }}
                ringRef={(el) => {
                  ringRefs.current[i] = el;
                }}
              />
              <div>
                <h3 className="mt-2 text-base font-semibold text-ivory md:mt-6">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:mt-3">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
