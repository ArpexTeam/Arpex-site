"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Elemento visível na tela (IntersectionObserver). As demonstrações começam
 * quando aparecem e voltam ao início quando saem: funcionam igual ao avançar e
 * ao voltar pela rolagem, e não gastam trabalho fora da área visível.
 */
export function useInView(ref: RefObject<Element | null>, { threshold = 0.35, rootMargin = "0px" } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin]);
  return inView;
}
