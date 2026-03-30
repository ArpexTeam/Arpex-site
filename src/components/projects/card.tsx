import Link from "next/link";
import type { StaticImageData } from "next/image";

type ImageSrc = string | StaticImageData;

type ProjectCardProps = {
  href?: string;
  external?: boolean;
  title?: string;
  subtitle?: string;
  imageSrc?: ImageSrc;
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
  const resolvedSrc = typeof imageSrc === "string" ? imageSrc : imageSrc?.src;
  const isClickable = !!href;
  const label = ariaLabel ?? (title ? `Abrir ${title}` : "Abrir projeto");

  const root =
    "group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] " +
    "transition hover:border-white/20 focus-within:border-white/20 " +
    className;

  const overlay =
    "absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010]";

  const content = (
    <>
      {imageSrc ? (
        <img
          src={resolvedSrc}
          alt={imageAlt ?? title ?? ""}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          loading="lazy"
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
      <div className="absolute inset-0 bg-white/[0.03] opacity-0 transition group-hover:opacity-100" />

      {title || subtitle ? (
        <div className="absolute inset-x-0 bottom-0 z-[5] p-4">
          <div className="rounded-lg border border-white/10 bg-black/35 p-3">
            {title ? <h3 className="font-medium leading-tight text-white">{title}</h3> : null}
            {subtitle ? <p className="mt-1 text-sm text-white/70">{subtitle}</p> : null}
            {isClickable ? (
              <p className="mt-3 text-sm text-white/70 transition group-hover:text-white">
                Ver projeto -&gt;
              </p>
            ) : (
              <p className="mt-3 text-sm text-white/50">Em breve</p>
            )}
          </div>
        </div>
      ) : null}

      {!imageSrc ? (
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-4 top-4 h-2 w-24 rounded bg-white/10" />
          <div className="absolute left-4 top-8 h-2 w-16 rounded bg-white/10" />
        </div>
      ) : null}
    </>
  );

  if (!isClickable) {
    return <div className={root}>{content}</div>;
  }

  return (
    <div className={root}>
      {content}

      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={overlay} />
      ) : (
        <Link href={href} aria-label={label} className={overlay} />
      )}
    </div>
  );
}
