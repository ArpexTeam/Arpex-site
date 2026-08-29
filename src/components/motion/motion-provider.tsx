"use client";

import { createContext, useContext, useEffect, useState } from "react";

type MotionCapability = "full" | "reduced";

type MotionContextValue = {
  /** true quando o usuário pediu menos movimento (SO/navegador) */
  reducedMotion: boolean;
  /** heurística simples de capacidade do dispositivo, usada pelas fases de WebGL/GSAP */
  capability: MotionCapability;
};

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  capability: "full",
});

export function useMotionPreference() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<MotionContextValue>({
    reducedMotion: false,
    capability: "full",
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const cores = navigator.hardwareConcurrency ?? 8;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const capability: MotionCapability = cores <= 4 || coarsePointer ? "reduced" : "full";

    const update = () => {
      setValue({ reducedMotion: media.matches, capability });
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
