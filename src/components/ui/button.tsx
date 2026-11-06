import Link from "next/link";
import { cn } from "@/lib/cn";

// Forma, cores e estados ficam em src/styles/controls.css.
const styles = {
  // verde da marca com texto ink, em qualquer fundo
  primary: "btn btn-primary",
  // contorno discreto na cor do texto da superfície
  secondary: "btn btn-secondary",
  // ação em texto: sublinhado fino aparece no hover
  link: "link inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-fg",
} as const;

type BaseProps = {
  children: React.ReactNode;
  variant?: keyof typeof styles;
  className?: string;
  /** seta → que avança 2px no hover */
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
      className={cn("btn-arrow h-4 w-4 shrink-0", className)}
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
  const cls = cn(styles[variant], className);
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
