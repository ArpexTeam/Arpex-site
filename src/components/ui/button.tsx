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
  className?: string;
};

// Botão real
type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined; // não permite href neste ramo
  };

// Link estilizado como botão
type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonAsButton): JSX.Element;
export function Button(props: ButtonAsLink): JSX.Element;
export function Button(props: ButtonProps): JSX.Element {
  const { children, variant = "primary", className } = props;
  const cls = cn(base, styles[variant], className);

  // Link (tem href:string)
  if (typeof (props as ButtonAsLink).href === "string") {
    const { href, ...restLinkAll } = props as ButtonAsLink;
    const { /* remove internos */ variant: _v, className: _c, children: _ch, ...anchorProps } = restLinkAll;
    return (
      <Link href={href} className={cls} {...anchorProps}>
        {children}
      </Link>
    );
  }

  // Botão (sem href)
  const { variant: _v, className: _c, children: _ch, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={cls} {...buttonProps}>
      {children}
    </button>
  );
}
