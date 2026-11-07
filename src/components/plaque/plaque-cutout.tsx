import Image from "next/image";
import { cn } from "@/lib/cn";
import { plaquePhoto } from "@/data/plaque";
import placaReal from "@/assets/plaque/placa-real.webp";

export const PLAQUE_PHOTO_ALT =
  "Foto real da placa de avaliação em acrílico: em cima, faixa preta com a chamada para avaliar no Google; embaixo, parte branca com o ícone de aproximação do celular (NFC) e o QR Code.";

type Props = {
  className?: string;
  sizes: string;
  priority?: boolean;
  /** luz difusa atrás da placa, para o topo preto se separar do fundo escuro */
  glow?: boolean;
  /** classes extras da sombra e da placa (as animações ficam em elementos próprios) */
  shadowClassName?: string;
  plateClassName?: string;
};

/**
 * A placa real recortada (fundo transparente), com a sombra como elemento à
 * parte. O giro leve da foto original é desfeito na exibição. Sombra e placa
 * têm um invólucro próprio para movimento (data-shadow-move, data-plate-move),
 * separado das classes de entrada, para as transformações não se somarem.
 */
export default function PlaqueCutout({ className, sizes, priority, glow, shadowClassName, plateClassName }: Props) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[30%] bg-[radial-gradient(closest-side,rgba(210,232,220,0.13),rgba(210,232,220,0.04)_55%,transparent)]"
        />
      )}
      <div data-shadow-move aria-hidden className="absolute inset-0">
        <span className={cn("absolute inset-x-[9%] bottom-[-6%] top-[16%] rounded-[16px] bg-black/80 blur-2xl", shadowClassName)} />
      </div>
      <div data-plate-move className="relative [transform-style:preserve-3d]">
        <div className={plateClassName}>
          <Image
            src={placaReal}
            alt={PLAQUE_PHOTO_ALT}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
            style={{ transform: `rotate(${plaquePhoto.tiltDeg}deg)` }}
          />
        </div>
      </div>
    </div>
  );
}
