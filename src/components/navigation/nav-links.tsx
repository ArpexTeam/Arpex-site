// /ecossistema mantém o endereço; o rótulo diz o que a página mostra.
export const navLinks = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Projetos", href: "/projetos" },
  { label: "Placas", href: "/placas" },
  { label: "ArpeX CRM", href: "/ecossistema" },
  { label: "Sobre", href: "/sobre" },
] as const;

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}
