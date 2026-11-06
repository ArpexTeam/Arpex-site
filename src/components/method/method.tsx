"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import { methodSteps } from "@/data/method";

// cores literais: o GSAP precisa interpolar valores, não var()
const surfaceBg = {
  "surface-paper": "#f2efe8",
  "surface-mineral": "#e7e3da",
  "surface-ink": "#0b0e0c",
} as const;

/**
 * Entender, definir, construir e validar, acompanhar: a linha avança com a
 * rolagem e acende cada número. As etapas se explicam sozinhas, sem
 * introdução. `children` (opcional) liga as etapas a material concreto, abaixo.
 */
export default function Method({
  surface = "surface-paper",
  children,
}: {
  surface?: keyof typeof surfaceBg;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const dotBg = surfaceBg[surface];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fill = ref.current!.querySelector<HTMLElement>("[data-method-fill]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-method-dot]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "[data-method-list]", start: "top 78%", end: "bottom 55%", scrub: 0.6 },
        });
        tl.fromTo(fill, { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1 }, 0);
        dots.forEach((dot, i) => {
          tl.to(
            dot,
            { backgroundColor: "#00cf77", borderColor: "#00cf77", color: "#0b0e0c", duration: 0.06 },
            (i / Math.max(1, dots.length - 1)) * 0.94
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [dotBg] }
  );

  return (
    <section ref={ref} aria-labelledby="metodo-title" className={`${surface} py-20 md:py-28`}>
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        <h2 id="metodo-title" className="font-title text-balance text-[length:var(--text-h2)] text-fg">
          Como trabalhamos
        </h2>

        <ol data-method-list className="relative mt-10 grid gap-10 md:mt-14 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-rule md:left-0 md:right-0 md:top-[19px] md:bottom-auto md:h-px md:w-auto" />
          <span
            aria-hidden
            data-method-fill
            className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-signal-ink md:left-0 md:right-0 md:top-[19px] md:bottom-auto md:h-px md:w-auto md:origin-left"
          />
          {methodSteps.map((s) => (
            <li key={s.index} className="relative grid grid-cols-[40px_1fr] gap-5 md:block">
              <span
                data-method-dot
                className="font-label relative z-10 grid h-10 w-10 place-items-center rounded-full border border-rule text-fg-muted"
                style={{ background: dotBg }}
              >
                {s.index}
              </span>
              <div className="md:mt-8 md:pr-6">
                <h3 className="font-heading text-[length:var(--text-h3)] text-fg">{s.title}</h3>
                <p className="mt-2 max-w-[32ch] text-pretty leading-relaxed text-fg-muted">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {children}
      </div>
    </section>
  );
}
