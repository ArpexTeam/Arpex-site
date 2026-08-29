import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

type LabelProps = Props & { ref?: React.Ref<HTMLParagraphElement> };

export const Label = ({ children, className, ref }: LabelProps) => (
  <p ref={ref} className={cn("font-label text-system", className)}>
    {children}
  </p>
);

export const H1 = ({ children, className }: Props) => (
  <h1
    className={cn(
      "font-display text-[length:var(--text-display)] text-ivory",
      className
    )}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className }: Props) => (
  <h2
    className={cn(
      "font-heading text-[length:var(--text-h2)] text-ivory",
      className
    )}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className }: Props) => (
  <h3
    className={cn(
      "font-heading text-[length:var(--text-h3)] text-ivory",
      className
    )}
  >
    {children}
  </h3>
);

export const Sub = ({ children, className }: Props) => (
  <p className={cn("text-[length:var(--text-body-lg)] leading-relaxed text-muted", className)}>
    {children}
  </p>
);
