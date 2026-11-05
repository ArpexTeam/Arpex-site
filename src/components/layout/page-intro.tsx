import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  surface?: "surface-ink" | "surface-mineral" | "surface-paper";
  children?: React.ReactNode;
  className?: string;
};

/** Abertura das páginas internas: título da página e, logo abaixo, um apoio curto. */
export default function PageIntro({ eyebrow, title, lead, surface = "surface-ink", children, className }: Props) {
  return (
    <section className={cn(surface, "pt-[calc(var(--header-height)+56px)] pb-12 md:pt-[calc(var(--header-height)+88px)] md:pb-16", className)}>
      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        <p className="font-kicker text-accent">{eyebrow}</p>
        <h1 className="font-display mt-4 max-w-[18ch] text-balance text-[length:var(--text-display)] text-fg">{title}</h1>
        {lead && <p className="mt-5 max-w-[56ch] text-pretty text-[length:var(--text-lead)] leading-[1.5] text-fg-muted">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
