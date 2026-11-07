/**
 * Placa de avaliação com QR Code e NFC — acrílico, sem base.
 *
 * A cena e as páginas usam a foto real: o recorte em
 * src/assets/plaque/placa-real.webp saiu da foto das duas placas sobre a mesa
 * (só a placa preta, sem fundo e sem a sombra da mesa). As medidas ainda não
 * foram confirmadas: NENHUMA medida é exibida no texto.
 *
 * Os pontos abaixo estão em fração do recorte (0–1, a partir do canto
 * superior esquerdo) e posicionam na cena o sinal de NFC e o destaque do QR.
 */
export const plaquePhoto = {
  /** giro da foto original, em graus (anti-horário); a cena o desfaz */
  tiltDeg: 1.8,
  /** ícone "Aproxime seu celular" */
  nfc: { x: 0.167, y: 0.755 },
  /** moldura do QR Code */
  qr: { x: 0.761, y: 0.717, size: 0.32 },
};

/** Fundo da cena e dos renders da placa (a página Placas abre no mesmo tom). */
export const PLAQUE_BG = "#0d110f";

export const plaqueSteps = [
  {
    key: "aproxime",
    title: "Aproxime ou escaneie",
    text: "Encostando o celular (NFC) ou com a câmera (QR Code).",
  },
  {
    key: "acesse",
    title: "Abra a página",
    text: "A página de avaliação da sua empresa abre no navegador, sem aplicativo.",
  },
  {
    key: "avalie",
    title: "Deixe sua avaliação",
    text: "O cliente escolhe a nota, escreve e decide se publica.",
  },
] as const;

export const plaqueUses = [
  { place: "Balcão e caixa", text: "No momento em que o atendimento termina." },
  { place: "Mesas", text: "Enquanto o cliente espera a conta." },
  { place: "Recepção", text: "Na saída de consultórios, salões e estúdios." },
  { place: "Entrega", text: "Junto do pedido, para quem atende fora do endereço." },
];

export const plaqueCustomization = [
  { t: "Acrílico, sem base", d: "Medidas e acabamento são combinados na contratação." },
  { t: "A arte da sua empresa", d: "Logotipo, cores e a frase de chamada, definidos com você." },
];

/** Contratação: arte, destino do link e entrega, combinados na mesma conversa. */
export const plaqueHire = [
  { t: "Arte", d: "Definimos com você o logotipo, as cores e a frase da placa." },
  { t: "Destino do link", d: "O QR Code e o NFC levam à página que você escolher, normalmente a de avaliação da sua empresa." },
  { t: "Entrega", d: "Produção, prazo e entrega são combinados na mesma conversa." },
];

/** Compatibilidade e dúvidas, numa área curta perto do fim. */
export const plaqueFaq = [
  {
    q: "Funciona em qualquer celular?",
    a: "Com NFC ativado, basta aproximar. Em qualquer celular com câmera, pelo QR Code. Por isso a placa tem os dois.",
  },
  { q: "Precisa de aplicativo?", a: "Não. A página abre no navegador do celular." },
];

/** Itens a confirmar antes de publicar especificações comerciais. */
export const plaquePending = [
  "Medidas reais da placa",
  "Espessura e acabamento do acrílico",
  "Fotos em resolução original (as recebidas têm 1152 × 1536) e fotos instaladas em clientes",
  "Destino do QR das placas fotografadas: hoje uma leva a um estabelecimento real e a outra aguarda configuração",
  "Prazo de produção, formas de entrega e preço",
];
