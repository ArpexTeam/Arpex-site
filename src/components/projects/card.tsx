// components/projects/card.tsx
import Link from "next/link";
import type { StaticImageData } from "next/image";


type ImageSrc = string | StaticImageData;



type ProjectCardProps = {
  // quando não houver href, vira placeholder (não clicável)
  href?: string;
  external?: boolean;

  title?: string;
  subtitle?: string;

  imageSrc?: ImageSrc; // pode ser "/imgs/x.jpg" ou URL externa
  imageAlt?: string;

  ariaLabel?: string;
  className?: string;
};

export default function ProjectCard({
  href,
  external = false,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  ariaLabel,
  className = "",
}: ProjectCardProps) {

    const resolvedSrc =
    typeof imageSrc === "string" ? imageSrc : imageSrc?.src;

  const isClickable = !!href;
  const label = ariaLabel ?? (title ? `Abrir ${title}` : "Abrir projeto");

  const root =
    "group relative aspect-[4/3] rounded-xl border border-white/10 bg-white/[0.06] overflow-hidden " +
    "transition hover:border-white/20 focus-within:border-white/20 " +
    className;

  const overlay =
    "absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010]";

  const Content = (
    <>
      {/* Imagem de fundo (se existir) */}
      {imageSrc ? (
        <img
          src={resolvedSrc}
          alt={imageAlt ?? title ?? ""}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          loading="lazy"
        />
      ) : null}

      {/* highlight sutil (por cima da imagem) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />

      {/* hover leve */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/[0.03]" />

      {/* Legenda (opcional) */}
      {(title || subtitle) ? (
        <div className="absolute inset-x-0 bottom-0 z-[5] p-4">
          <div className="rounded-lg bg-black/35  border border-white/10 p-3">
            {title ? (
              <h3 className="text-white font-medium leading-tight">{title}</h3>
            ) : null}
            {subtitle ? (
              <p className="mt-1 text-sm text-white/70">{subtitle}</p>
            ) : null}
            {isClickable ? (
              <p className="mt-3 text-sm text-white/70 group-hover:text-white transition">
                Ver projeto →
              </p>
            ) : (
              <p className="mt-3 text-sm text-white/50">Em breve</p>
            )}
          </div>
        </div>
      ) : null}

      {/* Placeholder visual (se não tiver imagem) */}
      {!imageSrc ? (
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-4 top-4 h-2 w-24 rounded bg-white/10" />
          <div className="absolute left-4 top-8 h-2 w-16 rounded bg-white/10" />
        </div>
      ) : null}
    </>
  );

  // Placeholder (não clicável)
  if (!isClickable) {
    return <div className={root}>{Content}</div>;
  }

  // Clicável (interno/externo)
  return (
    <div className={root}>
      {Content}

      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={overlay}
        />
      ) : (
        <Link href={href} aria-label={label} className={overlay} />
      )}
    </div>
  );
}