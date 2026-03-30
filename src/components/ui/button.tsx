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

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps): React.ReactElement {
  const { children, variant = "primary", className } = props;
  const cls = cn(base, styles[variant], className);

  if (typeof (props as ButtonAsLink).href === "string") {
    const {
      href,
      variant: linkVariant,
      className: linkClassName,
      children: linkChildren,
      ...anchorProps
    } = props as ButtonAsLink;

    void linkVariant;
    void linkClassName;
    void linkChildren;

    return (
      <Link href={href} className={cls} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const {
    variant: buttonVariant,
    className: buttonClassName,
    children: buttonChildren,
    ...buttonProps
  } = props as ButtonAsButton;

  void buttonVariant;
  void buttonClassName;
  void buttonChildren;

  return (
    <button className={cls} {...buttonProps}>
      {children}
    </button>
  );
}
