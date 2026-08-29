"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { waLink, CONTACT_EMAIL } from "@/data/social-links";

const necessidades = [
  { value: "diagnostico", label: "Diagnóstico de operação" },
  { value: "automacao", label: "Automação de processos" },
  { value: "sistema", label: "Sistema sob medida" },
  { value: "app", label: "Aplicativo ou portal" },
  { value: "financeiro", label: "Solução financeira" },
  { value: "site", label: "Site ou experiência digital" },
  { value: "outro", label: "Outro" },
] as const;

const schema = z.object({
  nome: z.string().trim().min(1, "Informe seu nome."),
  sobrenome: z.string().trim().min(1, "Informe seu sobrenome."),
  email: z.string().trim().min(1, "Informe seu e-mail.").email("E-mail inválido."),
  telefone: z.string().trim().optional(),
  necessidade: z.enum(necessidades.map((n) => n.value) as [string, ...string[]], {
    message: "Selecione uma opção.",
  }),
  observacoes: z.string().trim().optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldCls =
  "h-11 w-full border-0 border-b border-smoke bg-transparent px-0 text-ivory placeholder:text-muted outline-none transition-colors focus:border-system";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    const texto =
      `Olá! Vim pelo site e quero entender qual solução faz mais sentido para o meu negócio.\n\n` +
      `Nome: ${data.nome} ${data.sobrenome}\n` +
      `E-mail: ${data.email}\n` +
      `Telefone: ${data.telefone ?? "-"}\n` +
      `Necessidade: ${necessidades.find((n) => n.value === data.necessidade)?.label ?? data.necessidade}\n` +
      `Observações: ${data.observacoes ?? "-"}`;

    const url = waLink(texto);

    try {
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = url;
      setStatus("ok");
      reset();
    } catch {
      try {
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          "Novo contato ArpeX"
        )}&body=${encodeURIComponent(texto)}`;
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <label htmlFor="nome" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
          Nome
        </label>
        <input id="nome" className={fieldCls} {...register("nome")} />
        {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="sobrenome" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
          Sobrenome
        </label>
        <input id="sobrenome" className={fieldCls} {...register("sobrenome")} />
        {errors.sobrenome && <p className="mt-1 text-xs text-red-400">{errors.sobrenome.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
          E-mail
        </label>
        <input id="email" type="email" className={fieldCls} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="telefone" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
          Telefone com DDD
        </label>
        <input id="telefone" placeholder="(11) 90000-0000" className={fieldCls} {...register("telefone")} />
      </div>

      <div>
        <label htmlFor="necessidade" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
          Você precisa de...
        </label>
        <select
          id="necessidade"
          defaultValue=""
          className={`${fieldCls} appearance-none`}
          {...register("necessidade")}
        >
          <option value="" disabled>
            Selecionar
          </option>
          {necessidades.map((n) => (
            <option key={n.value} value={n.value}>
              {n.label}
            </option>
          ))}
        </select>
        {errors.necessidade && <p className="mt-1 text-xs text-red-400">{errors.necessidade.message}</p>}
      </div>

      <div>
        <label htmlFor="observacoes" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
          Observações
        </label>
        <input id="observacoes" placeholder="Descreva dores, metas ou contexto" className={fieldCls} {...register("observacoes")} />
      </div>

      <div className="flex flex-col items-center gap-4 md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring inline-flex h-12 items-center justify-center rounded-md bg-system px-12 text-[15px] font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Enviar via WhatsApp"}
        </button>

        <div role="status" aria-live="polite" className="text-sm">
          {status === "ok" && (
            <span className="text-system">Abrimos sua mensagem no WhatsApp ou no e-mail. Obrigado.</span>
          )}
          {status === "error" && (
            <span className="text-red-400">Não foi possível enviar agora. Tente novamente.</span>
          )}
        </div>
      </div>
    </form>
  );
}
