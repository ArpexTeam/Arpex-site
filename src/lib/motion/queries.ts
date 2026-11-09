/**
 * Três modos de apresentação das cenas:
 * - completa (FULL_SCENE_QUERY): computador e tablet deitado; seções altas,
 *   área fixada e timeline ligada à rolagem;
 * - compacta (COMPACT_SCENE_QUERY): celular, tablet em pé e telas baixas; a
 *   mesma intenção em composições curtas, com estados e controles próprios;
 * - movimento reduzido: as mesmas composições compactas, paradas, com todo o
 *   conteúdo à vista.
 *
 * FULL_SCENE_QUERY é a mesma condição da media query das cenas sticky em
 * src/styles/motion.css. Se uma mudar sem a outra, a seção fica alta/sticky
 * sem a timeline completa (ou o contrário).
 */
export const FULL_SCENE_QUERY =
  "(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)";

/** Complemento de FULL_SCENE_QUERY entre quem aceita movimento. */
export const COMPACT_SCENE_QUERY =
  "(prefers-reduced-motion: no-preference) and (max-width: 1023.98px), (prefers-reduced-motion: no-preference) and (max-height: 619.98px)";

export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export function matches(query: string) {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

/** WebGL2 disponível (Three.js r163+ exige WebGL2). */
export function supportsWebGL2() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    const ok = !!gl;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return ok;
  } catch {
    return false;
  }
}
