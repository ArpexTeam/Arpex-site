"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsap";
import { useMotionPreference } from "@/components/motion/motion-provider";

/**
 * Cursor contextual "Abrir case": segue o ponteiro e aparece só sobre
 * elementos marcados com data-cursor="open-case", só em dispositivos
 * com ponteiro fino e hover real (mouse), nunca em touch/reduced-motion.
 *
 * useEffect (não useGSAP) de propósito: useGSAP com dependency array não
 * reverte o contexto entre re-execuções (a menos que revertOnUpdate seja
 * passado), então a classList/listeners ficariam presos ao alternar
 * reducedMotion. useEffect tem semântica de cleanup-antes-de-rerun padrão.
 */
export default function CaseCursor() {
  const pillRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreference();

  useEffect(() => {
    if (reducedMotion || !pillRef.current) return;
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
    ).matches;
    if (!canHover) return;

    const el = pillRef.current;
    document.documentElement.classList.add("has-case-cursor");

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    function onMove(e: PointerEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
    }

    function onOver(e: PointerEvent) {
      const target = (e.target as HTMLElement).closest?.('[data-cursor="open-case"]');
      if (target) gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "power2.out" });
    }

    function onOut(e: PointerEvent) {
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest?.('[data-cursor="open-case"]')) return;
      gsap.to(el, { autoAlpha: 0, scale: 0.8, duration: 0.2, ease: "power2.in" });
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);

    return () => {
      document.documentElement.classList.remove("has-case-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={pillRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden -translate-x-1/2 -translate-y-1/2 scale-[0.8] opacity-0 lg:block"
    >
      <span className="font-label flex items-center gap-2 rounded-full bg-system px-4 py-2 text-xs tracking-[0.18em] whitespace-nowrap text-ink shadow-[0_8px_24px_rgba(0,229,122,0.35)]">
        Abrir case
      </span>
    </div>
  );
}
