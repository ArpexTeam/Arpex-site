// components/ui/button.tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center px-5 py-3 text-sm font-medium transition " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-60 disabled:pointer-events-none";

const styles = {
  primary: "bg-brand text-black hover:opacity-90",
  ghost: "border border-white/20 text-white/80 hover:text-white hover:bg-white/5",
} as const;

type BaseProps = {
  children: React.ReactNode;
  variant?: keyof typeof styles;
  className?: string; // <- permite estilos personalizados
};

// Botão real
type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

// Link estilizado como botão
type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", className, ...rest } = props as any;
  const cls = cn(base, styles[variant], className);

  if ("href" in props && props.href) {
    // Link do Next (aceita className e a maioria dos attrs de <a>)
    return (
      <Link href={props.href} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
