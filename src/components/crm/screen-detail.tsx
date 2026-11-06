import Image from "next/image";
import type { CrmDetail } from "@/data/crm";

const RATIO = 1.6; // recortes em 16:10

/**
 * Trecho de uma tela real, ampliado em 16:10, com o contorno verde na ação
 * que o passo explica. Só posicionamento em %: a captura é a mesma da galeria.
 */
export default function ScreenDetail({ detail, sizes }: { detail: CrmDetail; sizes: string }) {
  const { screen, crop, ring } = detail;
  const W = screen.src.width;
  const H = screen.src.height;
  const h = crop.w / RATIO;
  const pct = (v: number) => `${v * 100}%`;
  return (
    <div className="frame relative aspect-[16/10]">
      <div
        className="absolute"
        style={{ width: pct(W / crop.w), height: pct(H / h), left: pct(-crop.x / crop.w), top: pct(-crop.y / h) }}
      >
        <Image src={screen.src} alt="" fill sizes={sizes} className="object-cover" />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-md ring-2 ring-signal"
        style={{ left: pct((ring.x - crop.x) / crop.w), top: pct((ring.y - crop.y) / h), width: pct(ring.w / crop.w), height: pct(ring.h / h) }}
      />
    </div>
  );
}
