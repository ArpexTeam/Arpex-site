/**
 * Contraparte em JS dos tokens de src/styles/motion.css — mantém GSAP e CSS
 * falando a mesma língua de duração/easing em vez de repetir números soltos
 * em cada componente.
 */
export const DURATION = {
  fast: 0.2,
  base: 0.32,
  slow: 0.7,
  peel: 0.8,
} as const;

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  scrub: "none",
} as const;
