import type { StaticImageData } from "next/image";
import hoje from "@/assets/projects/arpex-crm/hoje.webp";
import modoFoco from "@/assets/projects/arpex-crm/modo-foco.webp";
import pipeline from "@/assets/projects/arpex-crm/pipeline.webp";
import followups from "@/assets/projects/arpex-crm/followups.webp";
import metricas from "@/assets/projects/arpex-crm/metricas.webp";
import prospeccao from "@/assets/projects/arpex-crm/prospeccao.webp";
import mensagens from "@/assets/projects/arpex-crm/mensagens.webp";
import financeiro from "@/assets/projects/arpex-crm/financeiro.webp";
import hojeMobile from "@/assets/projects/arpex-crm/hoje-mobile.webp";
import modoFocoMobile from "@/assets/projects/arpex-crm/modo-foco-mobile.webp";

export const CRM_LOGIN_URL = "https://arpex-crm.vercel.app/";

export type CrmScreen = {
  key: string;
  name: string;
  text: string;
  src: StaticImageData;
  mobile?: StaticImageData;
  /** área destacada na sequência da home, em % da captura */
  focus?: { x: number; y: number; w: number; h: number };
};

/** Sequência curta de uso (home): Hoje → Modo foco → Pipeline. */
export const crmStory: CrmScreen[] = [
  {
    key: "hoje",
    name: "Hoje",
    text: "O dia começa pela próxima oportunidade e pela fila do que está atrasado.",
    src: hoje,
    mobile: hojeMobile,
    focus: { x: 17.8, y: 17.4, w: 80, h: 19.8 },
  },
  {
    key: "modo-foco",
    name: "Modo foco",
    text: "Contexto do lead, mensagem pronta com os dados preenchidos e um toque para abrir o WhatsApp.",
    src: modoFoco,
    mobile: modoFocoMobile,
    focus: { x: 56.6, y: 55.6, w: 36.8, h: 13 },
  },
  {
    key: "pipeline",
    name: "Pipeline",
    text: "Cada negócio com etapa, temperatura e próxima atividade, em tabela ou fluxo.",
    src: pipeline,
    focus: { x: 19.4, y: 45.4, w: 78.4, h: 8.2 },
  },
];

export const crmScreens: CrmScreen[] = [
  ...crmStory,
  { key: "followups", name: "Follow-ups", text: "A fila de retornos: atrasados, de hoje e sem próxima ação, com mensagem para copiar.", src: followups },
  { key: "prospeccao", name: "Prospecção", text: "Fila diária de abordagem a partir da meta comercial, com listas importadas.", src: prospeccao },
  { key: "mensagens", name: "Modelos de mensagem", text: "Mensagens reutilizáveis, preenchidas com os dados de cada lead.", src: mensagens },
  { key: "metricas", name: "Métricas", text: "Onde o processo comercial está funcionando e onde está travando, com a evidência de cada alerta.", src: metricas },
  { key: "financeiro", name: "Financeiro", text: "Saldo, projeção de 30 dias e o que exige ação no caixa.", src: financeiro },
];
