import type { StaticImageData } from "next/image";
import honorattoImg from "@/images/2026-02-14_12h19_46.png";
import florImg from "@/images/2026-02-14_12h20_01.png";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  externalUrl?: string;
  image?: StaticImageData;
  /** true quando ainda não recebemos os assets reais (screenshots/vídeo) deste case */
  assetsPending?: boolean;
  size: "lg" | "md" | "sm";
};

export const projects: Project[] = [
  {
    slug: "honoratto-tattoo",
    title: "Honoratto Tattoo",
    category: "Presença digital",
    description:
      "Site de portfólio e posicionamento para estúdio de tatuagem, construído para apresentar trabalho autoral com identidade própria.",
    externalUrl: "https://honoratto.vercel.app",
    image: honorattoImg,
    size: "lg",
  },
  {
    slug: "flor-de-maria-vip",
    title: "Flor de Maria VIP",
    category: "Landing de conversão",
    description:
      "Landing page com foco em conversão, estruturada para captação e clareza de oferta.",
    externalUrl: "https://flordemariavip.com.br",
    image: florImg,
    size: "md",
  },
  {
    slug: "chef-bruno",
    title: "Chef Bruno",
    category: "Presença digital",
    description: "Case ArpeX em curadoria — assets reais em atualização.",
    assetsPending: true,
    size: "sm",
  },
  {
    slug: "lux-bar",
    title: "Lux Bar",
    category: "Experiência digital",
    description: "Case ArpeX em curadoria — assets reais em atualização.",
    assetsPending: true,
    size: "sm",
  },
  {
    slug: "dalury",
    title: "Dalury",
    category: "Sistema sob medida",
    description: "Case ArpeX em curadoria — assets reais em atualização.",
    assetsPending: true,
    size: "sm",
  },
  {
    slug: "arpex-crm",
    title: "ArpeX CRM",
    category: "Produto próprio",
    description:
      "Sistema de inteligência comercial desenvolvido internamente pela ArpeX — pipeline, cadência e follow-up em um único fluxo.",
    size: "lg",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
