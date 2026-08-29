"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsap";
import { useMotionPreference } from "@/components/motion/motion-provider";

/**
 * Blur direcional leve nas imagens dos projetos, ligado à velocidade do
 * scroll. Um único gsap.ticker cobre todas as imagens da página em vez de um
 * ScrollTrigger por card, e decai suavemente para 0 quando o scroll para.
 *
 * useEffect (não useGSAP) de propósito: mesmo motivo do CaseCursor — com
 * dependency array, useGSAP só reverte no unmount real, não a cada troca
 * de reducedMotion/capability.
 */
export default function ScrollBlur() {
  const { reducedMotion, capability } = useMotionPreference();

  useEffect(() => {
    if (reducedMotion || capability !== "full") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-blur]"));
    if (!els.length) return;

    let current = 0;

    // ScrollTrigger.getVelocity() só existe em instâncias, não como método
    // estático — criamos uma cobrindo a página inteira só para ler a
    // velocidade de scroll a cada frame via gsap.ticker.
    const tracker = ScrollTrigger.create({ start: 0, end: "max" });

    function onTick() {
      const velocity = Math.abs(tracker.getVelocity());
      const target = gsap.utils.clamp(0, 5, velocity / 3000);
      current += (target - current) * 0.15;
      const px = current < 0.05 ? 0 : current;
      const value = px ? `blur(${px.toFixed(2)}px)` : "";
      els.forEach((el) => {
        el.style.filter = value;
      });
    }

    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
      tracker.kill();
      els.forEach((el) => {
        el.style.filter = "";
      });
    };
  }, [reducedMotion, capability]);

  return null;
}
