import type { StaticImageData } from "next/image";
import type { PanSpec } from "@/components/ui/screen-pan";
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

/**
 * Telas reais do ArpeX CRM, com dados de demonstração. Os recortes (PanSpec)
 * estão em pixels de cada captura: `compact` é o quadro em pé do celular
 * (4:5), `wide` o quadro 16:10 do tablet e do computador. Cada tela aparece
 * uma vez por página.
 */
export type CrmScreen = {
  key: string;
  name: string;
  text: string;
  src: StaticImageData;
  /** área destacada na pilha do computador, em % da captura */
  focus: { x: number; y: number; w: number; h: number };
  compact: PanSpec;
  wide: PanSpec;
};

/** Os três estados da demonstração: Hoje → Modo foco → Pipeline. */
export const crmStory: CrmScreen[] = [
  {
    key: "hoje",
    name: "Hoje",
    text: "O dia começa pela próxima oportunidade e pela fila do que está atrasado.",
    src: hoje,
    focus: { x: 17.8, y: 17.4, w: 80, h: 19.8 },
    compact: { src: hojeMobile, from: { x: 0, y: 0, w: 390 }, to: { x: 8, y: 92, w: 374 }, ring: { x: 16, y: 116, w: 358, h: 222 } },
    wide: { src: hoje, from: { x: 0, y: 0, w: 1440 }, to: { x: 240, y: 110, w: 1190 }, ring: { x: 256, y: 158, w: 1152, h: 180 } },
  },
  {
    key: "modo-foco",
    name: "Modo foco",
    text: "Contexto do lead, mensagem pronta com os dados preenchidos e um toque para abrir o WhatsApp.",
    src: modoFoco,
    focus: { x: 56.6, y: 55.6, w: 36.8, h: 13 },
    compact: { src: modoFocoMobile, from: { x: 0, y: 40, w: 390 }, to: { x: 0, y: 800, w: 390 }, ring: { x: 36, y: 836, w: 318, h: 254 } },
    wide: { src: modoFoco, from: { x: 0, y: 0, w: 1440 }, to: { x: 640, y: 300, w: 780 }, ring: { x: 815, y: 504, w: 530, h: 118 } },
  },
  {
    key: "pipeline",
    name: "Pipeline",
    text: "Cada negócio com etapa, temperatura e próxima atividade, em tabela ou fluxo.",
    src: pipeline,
    focus: { x: 19.4, y: 45.4, w: 78.4, h: 8.2 },
    compact: { src: pipeline, from: { x: 280, y: 60, w: 560 }, to: { x: 520, y: 330, w: 470 }, ring: { x: 282, y: 457, w: 1129, h: 83 } },
    wide: { src: pipeline, from: { x: 0, y: 0, w: 1440 }, to: { x: 260, y: 230, w: 1160 }, ring: { x: 282, y: 457, w: 1129, h: 83 } },
  },
];

export type CrmTask = {
  key: string;
  /** a tarefa, em linguagem de quem usa */
  title: string;
  /** nome da tela no produto */
  screen: string;
  text: string;
  compact: PanSpec;
  wide: PanSpec;
};

/** Página do CRM: do contato ao próximo retorno, só com telas que a demonstração de abertura não mostra. */
export const crmTasks: CrmTask[] = [
  {
    key: "prospeccao",
    title: "Saber quem abordar hoje",
    screen: "Prospecção",
    text: "Uma fila diária de abordagem, calculada a partir da meta comercial, com listas importadas.",
    compact: { src: prospeccao, from: { x: 270, y: 40, w: 600 }, to: { x: 276, y: 220, w: 470 }, ring: { x: 281, y: 231, w: 743, h: 193 } },
    wide: { src: prospeccao, from: { x: 250, y: 40, w: 1170 }, to: { x: 270, y: 210, w: 800 }, ring: { x: 281, y: 231, w: 743, h: 193 } },
  },
  {
    key: "mensagens",
    title: "Mandar a mensagem certa sem digitar de novo",
    screen: "Modelos de mensagem",
    text: "Modelos para cada momento da conversa, preenchidos com os dados de cada lead.",
    compact: { src: mensagens, from: { x: 270, y: 40, w: 600 }, to: { x: 485, y: 225, w: 580 }, ring: { x: 497, y: 243, w: 554, h: 157 } },
    wide: { src: mensagens, from: { x: 250, y: 40, w: 1170 }, to: { x: 470, y: 200, w: 640 }, ring: { x: 497, y: 243, w: 554, h: 157 } },
  },
  {
    key: "followups",
    title: "Não esquecer nenhum retorno",
    screen: "Follow-ups",
    text: "A fila de retornos: atrasados, de hoje e sem próxima ação, com a mensagem para copiar.",
    compact: { src: followups, from: { x: 270, y: 50, w: 600 }, to: { x: 296, y: 320, w: 470 }, ring: { x: 298, y: 343, w: 1072, h: 66 } },
    wide: { src: followups, from: { x: 250, y: 40, w: 1170 }, to: { x: 290, y: 300, w: 800 }, ring: { x: 298, y: 343, w: 1072, h: 66 } },
  },
];

/** Detalhes secundários da página do CRM, numa área expansível. */
export const crmMore: CrmTask[] = [
  {
    key: "metricas",
    title: "Ver onde o comercial trava",
    screen: "Métricas",
    text: "Onde o processo comercial está funcionando e onde está travando, com a evidência de cada alerta.",
    compact: { src: metricas, from: { x: 280, y: 210, w: 500 }, to: { x: 280, y: 210, w: 500 } },
    wide: { src: metricas, from: { x: 270, y: 140, w: 1150 }, to: { x: 270, y: 140, w: 1150 } },
  },
  {
    key: "financeiro",
    title: "Conferir o caixa",
    screen: "Financeiro",
    text: "Saldo, projeção de 30 dias e o que exige ação no caixa.",
    compact: { src: financeiro, from: { x: 280, y: 270, w: 500 }, to: { x: 280, y: 270, w: 500 } },
    wide: { src: financeiro, from: { x: 270, y: 270, w: 1150 }, to: { x: 270, y: 270, w: 1150 } },
  },
];

/** Fila de retornos na aba Atendimento da home (quadro 4:3). */
export const followupsDemo: { compact: PanSpec; wide: PanSpec } = {
  compact: { src: followups, from: { x: 270, y: 50, w: 760 }, to: { x: 296, y: 330, w: 480 }, ring: { x: 298, y: 343, w: 1072, h: 66 } },
  wide: { src: followups, from: { x: 250, y: 30, w: 1160 }, to: { x: 290, y: 300, w: 800 }, ring: { x: 298, y: 343, w: 1072, h: 66 } },
};
