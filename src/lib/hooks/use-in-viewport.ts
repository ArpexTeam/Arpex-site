"use client";

import { useEffect, useState } from "react";

/**
 * true somente quando o elemento está visível na tela E a aba está em foco —
 * usado para pausar o loop de render do Canvas fora do viewport / aba oculta.
 */
export function useInViewport<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [inViewport, setInViewport] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);

    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return inViewport && tabVisible;
}
