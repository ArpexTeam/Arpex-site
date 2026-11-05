"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap/gsap";
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
    const cores = nav.hardwareConcurrency ?? 8;
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
    const saveData = nav.connection?.saveData === true;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const capability: MotionCapability = cores <= 4 || lowMemory || saveData || coarse ? "reduced" : "full";

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

  return (
    <MotionContext.Provider value={value}>
      <NavigationSettler />
      {children}
    </MotionContext.Provider>
  );
}
