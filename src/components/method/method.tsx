"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import Container from "@/components/ui/container";
import { H2, Label } from "@/components/ui/heading";
import { methodSteps } from "@/data/method";

/**
 * Progressão do método restaurada da metodologia antiga: linha horizontal
 * crescendo + anel verde desenhando (stroke-dasharray) + "pop" do ponto ao
 * entrar em viewport, em vez do círculo numerado estático.
 */
export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<Array<SVGCircleElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rings = ringRefs.current.filter(Boolean) as SVGCircleElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];

      if (reduce || !lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 1 });
        gsap.set(rings, { strokeDashoffset: 0 });
        gsap.set(dots, { scale: 1, opacity: 1 });
        return;
      }

      rings.forEach((ring) => {
        const len = ring.getTotalLength();
        gsap.set(ring, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dots, { scale: 0.7, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(lineRef.current, { scaleX: 1, duration: 1.2, ease: "power2.out" })
        .to(dots, { scale: 1, opacity: 1, duration: 0.42, ease: "power2.out", stagger: 0.28 }, 0.05)
        .to(rings, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out", stagger: 0.28 }, 0.05);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-graphite py-24 md:py-32">
      <Container>
        <div className="mb-16 max-w-[52ch]">
          <Label>Método</Label>
          <H2 className="mt-4">Clareza antes do código.</H2>
        </div>

        <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-[14px] hidden h-px bg-smoke md:block" />
          <div
            ref={lineRef}
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[14px] hidden h-px bg-system md:block"
          />

          {methodSteps.map((step, i) => (
            <li key={step.index} className="relative">
              <div className="flex items-center gap-3 md:block">
                <span
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  aria-hidden
                  className="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center text-center"
                >
                  <svg viewBox="0 0 28 28" className="absolute inset-0 h-full w-full text-system" aria-hidden>
                    <circle cx="14" cy="14" r="12" fill="var(--color-graphite)" stroke="var(--color-smoke)" strokeWidth="1.5" />
                    <circle
                      ref={(el) => {
                        ringRefs.current[i] = el;
                      }}
                      cx="14"
                      cy="14"
                      r="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <span className="font-label relative text-system">{step.index}</span>
                </span>
                <h3 className="text-lg font-semibold text-ivory md:mt-6">{step.title}</h3>
              </div>
              <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-muted md:mt-3">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
