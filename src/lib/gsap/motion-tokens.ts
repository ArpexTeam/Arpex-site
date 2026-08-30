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

/**
 * Timeline da cena "Fragment Flow" (mapa operacional) em unidades de tempo
 * arbitrárias (total = 10) que correspondem 1:1 ao progresso do scroll
 * (0–100%) por causa do scrub — usar como posições/labels da timeline em
 * vez de espalhar as porcentagens do briefing como números soltos.
 */
export const FRAGMENT_FLOW_TIMELINE = {
  total: 10,
  fragments: 0,
  approach: 1.8,
  alignment: 4.8,
  connection: 6.8,
  integrated: 8.6,
  end: 10,
} as const;
