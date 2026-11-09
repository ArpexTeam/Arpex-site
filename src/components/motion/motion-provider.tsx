"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap/gsap";
import { MOTION_QUERY } from "@/lib/motion/queries";
import { NavigationSettler } from "./transition-link";

type MotionCapability = "full" | "reduced";

type MotionContextValue = {
  /** usuário pediu menos movimento (sistema/navegador) */
  reducedMotion: boolean;
  /** heurística de capacidade: decide se cenas WebGL rodam ou ficam no poster */
  capability: MotionCapability;
};

const MotionContext = createContext<MotionContextValue>({ reducedMotion: false, capability: "reduced" });

export function useMotionPreference() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<MotionContextValue>({ reducedMotion: false, capability: "reduced" });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    // Só sinais explícitos de aparelho limitado. Tela de toque e número de
    // núcleos não decidem mais: com eles, nenhum celular rodava as cenas. O
    // custo real é medido na própria cena (src/lib/three/stage.ts), que reduz
    // a resolução e, se ainda pesar, devolve a vez à versão em HTML.
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 2;
    const saveData = nav.connection?.saveData === true;
    const capability: MotionCapability = lowMemory || saveData ? "reduced" : "full";

    const update = () => setValue({ reducedMotion: media.matches, capability });
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // A fonte final muda a altura dos títulos (e das seções em volta das cenas):
  // recalcula início e fim de todas as timelines uma vez, quando ela chega.
  useEffect(() => {
    if (document.fonts.status === "loaded") return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Entradas discretas dos conteúdos secundários ([data-reveal]): só o que
  // está abaixo da dobra espera; o resto (acima, ou já visto) nunca é escondido.
  // Ao sair da página, tudo volta ao normal.
  const pathname = usePathname();
  useEffect(() => {
    if (!window.matchMedia(MOTION_QUERY).matches) return;
    const fold = window.innerHeight * 0.92;
    const waiting = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > fold
    );
    const reveal = (el: HTMLElement) => {
      el.classList.add("reveal-in");
      el.classList.remove("reveal-wait");
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting && e.boundingClientRect.top > 0) continue;
          reveal(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    waiting.forEach((el) => {
      el.classList.add("reveal-wait");
      io.observe(el);
    });
    const showAll = () => waiting.forEach(reveal);
    window.addEventListener("beforeprint", showAll);
    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", showAll);
      waiting.forEach((el) => el.classList.remove("reveal-wait", "reveal-in"));
    };
  }, [pathname]);

  return (
    <MotionContext.Provider value={value}>
      <NavigationSettler />
      {children}
    </MotionContext.Provider>
  );
}
