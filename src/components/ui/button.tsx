import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-7 py-3 text-[15px] font-semibold " +
  "transition duration-200 focus-ring disabled:opacity-60 disabled:pointer-events-none";

const styles = {
  primary: "bg-system text-black hover:brightness-110 active:translate-y-px",
  ghost:
    "border border-champagne/40 text-ivory hover:border-system/60 hover:text-system",
  line: "px-0 py-0 min-h-0 text-ivory hover:text-system",
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

    const isInternal = href.startsWith("/");
    const Wrapper = isInternal ? Link : "a";

    return (
      <Wrapper href={href} className={cls} {...anchorProps}>
        {children}
      </Wrapper>
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
