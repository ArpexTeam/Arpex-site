"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type AnchorHTMLAttributes, type MouseEvent } from "react";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: React.ReactNode;
  };

let pendingResolve: (() => void) | null = null;

function settle() {
  pendingResolve?.();
  pendingResolve = null;
}

/** Montado uma vez (MotionProvider): conclui a transição quando a rota muda de fato. */
export function NavigationSettler() {
  const pathname = usePathname();
  useEffect(() => {
    // dois quadros: a nova página já pintou quando a captura "new" é feita
    const id = requestAnimationFrame(() => requestAnimationFrame(settle));
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}

/**
 * next/link com View Transitions quando o navegador suporta e o usuário não
 * pediu menos movimento. O href continua um link normal: abrir em nova aba,
 * copiar o endereço e navegar sem JS funcionam como sempre.
 */
export default function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (rest.target && rest.target !== "_self") return;

    const target = typeof href === "string" ? href : (href.pathname ?? "/");
    const targetPath = target.split(/[?#]/)[0];
    if (!targetPath || targetPath === pathname) return;

    const supports = typeof document.startViewTransition === "function";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supports || reduced) return;

    event.preventDefault();
    settle();
    document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          pendingResolve = resolve;
          // nunca segura a navegação: no pior caso conclui sozinho
          window.setTimeout(settle, 1500);
          router.push(target);
        })
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
