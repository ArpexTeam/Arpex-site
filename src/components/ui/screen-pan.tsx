import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

/** Recorte da captura, em pixels da imagem: canto superior esquerdo e largura (a altura sai da proporção do quadro). */
export type Crop = { x: number; y: number; w: number };
export type Ring = { x: number; y: number; w: number; h: number };
export type PanSpec = { src: StaticImageData; from: Crop; to: Crop; ring?: Ring };

/**
 * Uma captura real dentro de um quadro, com uma "câmera" em CSS: começa no
 * enquadramento `from` e, quando `live`, se aproxima de `to` (deslocamento e
 * escala, só transform) e acende o contorno na ação. Sem `live`, volta ao
 * início. Com movimento reduzido, a troca é imediata (motion.css).
 *
 * As porcentagens do translate são da própria imagem; a escala é a razão entre
 * as larguras dos dois recortes. Por isso a mesma regra serve a qualquer
 * proporção de quadro.
 */
export default function ScreenPan({
  spec,
  aspect,
  live,
  alt,
  sizes,
  className,
  duration = 2600,
}: {
  spec: PanSpec;
  /** largura / altura do quadro */
  aspect: number;
  live: boolean;
  alt: string;
  sizes: string;
  className?: string;
  duration?: number;
}) {
  const { src, from, to, ring } = spec;
  const W = src.width;
  const H = src.height;
  const k = from.w / to.w;
  const pct = (v: number) => `${+(v * 100).toFixed(4)}%`;
  // mesma lista de funções nos dois estados: a interpolação fica linear entre eles
  const start = `scale(1) translate(${pct(-from.x / W)}, ${pct(-from.y / H)})`;
  const end = `scale(${k.toFixed(4)}) translate(${pct(-to.x / W)}, ${pct(-to.y / H)})`;

  return (
    <div className={cn("frame relative", className)} style={{ aspectRatio: aspect }}>
      <div
        className="absolute left-0 top-0 origin-top-left transition-transform ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
        style={{
          width: pct(W / from.w),
          aspectRatio: `${W} / ${H}`,
          transform: live ? end : start,
          transitionDuration: `${live ? duration : 500}ms`,
          transitionDelay: live ? "250ms" : "0ms",
        }}
      >
        <Image src={src} alt={alt} sizes={sizes} className="block h-auto w-full" />
        {ring && (
          <span
            aria-hidden
            className="pointer-events-none absolute rounded-lg ring-2 ring-signal shadow-[0_0_0_9999px_rgba(11,14,12,0.42)] transition-opacity duration-500"
            style={{
              left: pct(ring.x / W),
              top: pct(ring.y / H),
              width: pct(ring.w / W),
              height: pct(ring.h / H),
              opacity: live ? 1 : 0,
              transitionDelay: live ? `${duration - 300}ms` : "0ms",
            }}
          />
        )}
      </div>
    </div>
  );
}
