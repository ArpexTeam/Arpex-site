"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap";
import PlaqueCutout from "./plaque-cutout";

/**
 * Abertura de Placas: a placa real entra (CSS, sem depender do JavaScript) e,
 * com a rolagem, sobe um pouco e inclina de leve, enquanto a sombra fica para
 * trás. Entrada, deslocamento e sombra ficam em elementos separados, para as
 * transformações não se somarem. Movimento reduzido: tudo parado.
 */
export default function PlaqueIntroPhoto() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: ref.current, start: "top 20%", end: "bottom top", scrub: 0.5 };
        gsap.to("[data-plate-move]", { yPercent: -8, rotationY: 8, rotationX: -3, ease: "none", scrollTrigger });
        gsap.to("[data-shadow-move]", { yPercent: 6, scale: 0.9, opacity: 0.55, ease: "none", scrollTrigger });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[400px]">
      <PlaqueCutout
        glow
        className="[perspective:1100px]"
        priority
        sizes="(min-width: 768px) 400px, 80vw"
        shadowClassName="motion-safe:animate-[plate-shadow-in_1100ms_cubic-bezier(0.22,1,0.36,1)_150ms_both]"
        plateClassName="motion-safe:animate-[plate-in_1100ms_cubic-bezier(0.22,1,0.36,1)_150ms_both]"
      />
    </div>
  );
}
