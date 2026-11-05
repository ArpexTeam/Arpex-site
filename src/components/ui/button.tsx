import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-semibold leading-none " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-out focus-ring active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-60";

const styles = {
  // verde de assinatura com texto ink (9.4:1)
  primary: "bg-signal text-ink hover:bg-signal-soft",
  // contorno que herda a cor de texto da superfície
  secondary: "border border-rule text-fg hover:border-fg",
  // sobre fundo claro: preenchimento grafite
  solid: "bg-graphite text-paper hover:bg-ink",
  text: "min-h-11 px-0 text-fg underline decoration-rule underline-offset-[6px] hover:decoration-fg",
} as const;

type BaseProps = {
  children: React.ReactNode;
  variant?: keyof typeof styles;
  className?: string;
  /** seta → que desliza no hover */
  arrow?: boolean;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn("h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button(props: ButtonProps): React.ReactElement {
  const { children, variant = "primary", className, arrow } = props;
  const cls = cn(base, styles[variant], className);
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (typeof props.href === "string") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, variant: _v, className: _c, children: _ch, arrow: _a, ...rest } = props as ButtonAsLink;
    const external = /^https?:|^mailto:|^tel:/.test(href);
    if (external) {
      return (
        <a href={href} className={cls} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, className: _c, children: _ch, arrow: _a, ...rest } = props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
