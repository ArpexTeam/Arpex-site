"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, type AnchorHTMLAttributes, type MouseEvent } from "react";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: React.ReactNode;
  };

/**
 * Link que, quando o navegador suporta a View Transitions API (e o usuário
 * não pediu menos movimento), envolve a navegação em document.startViewTransition
 * para permitir o morph de elementos com o mesmo view-transition-name
 * (usado na imagem do case, entre arquivo e página do projeto).
 * Fora isso, comporta-se como um next/link normal.
 */
export default function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const supportsViewTransitions = typeof document.startViewTransition === "function";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsViewTransitions || reduced) return;

    event.preventDefault();
    const target = typeof href === "string" ? href : href.pathname ?? "/";

    document.startViewTransition(() => {
      return new Promise<void>((resolve) => {
        startTransition(() => {
          router.push(target);
          resolve();
        });
      });
    });
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
