// components/ui/heading.tsx
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const H1 = ({ children, className }: Props) => (
  <h1 className={cn("text-3xl md:text-5xl font-bold leading-tight", className)}>
    {children}
  </h1>
);

export const H2 = ({ children, className }: Props) => (
  <h2 className={cn("text-2xl md:text-3xl font-semibold", className)}>
    {children}
  </h2>
);

export const Sub = ({ children, className }: Props) => (
  <p className={cn("text-zinc-300", className)}>
    {children}
  </p>
);
