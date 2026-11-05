import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/** Identificador curto acima de títulos, em caixa normal. */
export const Eyebrow = ({ children, className }: Props) => (
  <p className={cn("font-kicker text-accent", className)}>{children}</p>
);

/** Índice de capítulo: "01 —". */
export const ChapterIndex = ({ children, className }: Props) => (
  <span className={cn("font-label inline-flex items-center gap-3 text-accent", className)}>
    {children}
    <span aria-hidden className="h-px w-8 bg-current" />
  </span>
);

export const H1 = ({ children, className, id }: Props) => (
  <h1 id={id} className={cn("font-display text-balance text-[length:var(--text-display)] text-fg", className)}>
    {children}
  </h1>
);

export const H2 = ({ children, className, id }: Props) => (
  <h2 id={id} className={cn("font-title text-balance text-[length:var(--text-h2)] text-fg", className)}>
    {children}
  </h2>
);

export const H3 = ({ children, className, id }: Props) => (
  <h3 id={id} className={cn("font-heading text-[length:var(--text-h3)] text-fg", className)}>
    {children}
  </h3>
);

export const Lead = ({ children, className }: Props) => (
  <p className={cn("max-w-[60ch] text-pretty text-[length:var(--text-lead)] leading-[1.55] text-fg", className)}>{children}</p>
);
