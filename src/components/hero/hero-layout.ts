/**
 * Composição da abertura em frações da viewport, compartilhada pela cena
 * WebGL e pelo poster HTML (que aparece antes do 3D e quando ele não roda).
 * fx/fy: centro aparente · fw: largura aparente · z: profundidade (3D).
 */
export type HeroPose = {
  fx: number;
  fy: number;
  fw: number;
  z: number;
  ry: number;
  rx: number;
  opacity: number;
  dim: number;
};

export function heroPoses(w: number, h: number): HeroPose[] {
  // telas mais estreitas (4:3) afastam a composição do texto, para a direita
  const wide = Math.min(1, Math.max(0, (w / h - 1.3) / 0.5));
  return [
    { fx: 0.735 - 0.045 * wide, fy: 0.55, fw: 0.4 + 0.04 * wide, z: 0, ry: -0.42, rx: 0.05, opacity: 1, dim: 0 },
    // a tela de trás nunca começa à esquerda da principal: o limite do texto
    // (--hero-copy-max em motion.css) só precisa considerar a principal
    { fx: 0.68 - 0.06 * wide, fy: 0.22 + 0.03 * wide, fw: 0.24 + 0.02 * wide, z: -2.6, ry: -0.3, rx: 0.04, opacity: 1, dim: 0.42 },
    { fx: 0.95, fy: 0.8, fw: 0.28 + 0.02 * wide, z: -1.4, ry: -0.52, rx: 0.02, opacity: 1, dim: 0.34 },
  ];
}

export function gutterFor(w: number) {
  return w >= 1280 ? 48 : w >= 768 ? 32 : 16;
}

/** Largura final (px) da tela principal ao fim da expansão. */
export function heroFinalWidth(w: number, h: number) {
  const byHeight = h * 0.66 * 1.6;
  return Math.min(byHeight, w - gutterFor(w) * 2, 1400);
}

/** Centro final em fração da altura — o mesmo da cena (fy 0.45). */
export const HERO_FINAL_FY = 0.45;
