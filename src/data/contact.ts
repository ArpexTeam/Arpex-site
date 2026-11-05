export type ContactInterest = "entender" | "site" | "local" | "placas" | "crm" | "automacao" | "sistema" | "outro";

/** "entender" vem primeiro: quem ainda não sabe o que precisa também tem por onde começar. */
export const contactInterests: { value: ContactInterest; label: string; message: string }[] = [
  {
    value: "entender",
    label: "Quero entender por onde começar",
    message: "Quero conversar sobre o meu negócio e entender por onde começar.",
  },
  { value: "site", label: "Site ou página", message: "Quero conversar sobre um site ou página para minha empresa." },
  { value: "local", label: "Perfil no Google", message: "Quero organizar o perfil da minha empresa no Google." },
  { value: "placas", label: "Placa de avaliação", message: "Quero uma placa de avaliação com QR Code e NFC para minha empresa." },
  {
    value: "crm",
    label: "Atendimento e contatos (CRM)",
    message: "Quero organizar o atendimento e os contatos da minha empresa e conhecer o ArpeX CRM.",
  },
  { value: "automacao", label: "Automatizar uma tarefa", message: "Quero automatizar uma tarefa que hoje é feita à mão." },
  { value: "sistema", label: "Sistema ou aplicativo", message: "Quero conversar sobre um sistema ou aplicativo para organizar minha operação." },
  { value: "outro", label: "Outro assunto", message: "Quero conversar sobre um projeto." },
];

export function isContactInterest(value: unknown): value is ContactInterest {
  return typeof value === "string" && contactInterests.some((i) => i.value === value);
}

export function contactHref(interest?: ContactInterest, extra?: Record<string, string>) {
  const params = new URLSearchParams();
  if (interest) params.set("interesse", interest);
  if (extra) for (const [k, v] of Object.entries(extra)) params.set(k, v);
  const qs = params.toString();
  return qs ? `/contato?${qs}` : "/contato";
}

/** Monta o texto do WhatsApp. Só dados que a pessoa escreveu; nada é enviado sem ela tocar em "enviar". */
export function buildContactMessage(input: {
  name: string;
  company?: string;
  interest: ContactInterest;
  details?: string;
  project?: string;
}) {
  const interest = contactInterests.find((i) => i.value === input.interest) ?? contactInterests[contactInterests.length - 1];
  const lines = [`Olá! Sou ${input.name.trim()}${input.company?.trim() ? `, da ${input.company.trim()}` : ""}.`, interest.message];
  if (input.project) lines.push(`Vi o case ${input.project} no site.`);
  if (input.details?.trim()) lines.push("", input.details.trim());
  return lines.join("\n");
}
