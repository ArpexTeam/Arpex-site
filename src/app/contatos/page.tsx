"use client";

import { useState } from "react";
import Section from "@/components/ui/section";
import { H2 } from "@/components/ui/heading";
import Image from "next/image";
import bigLogo from "@/images/LOGOPNG 5.svg";

const field =
  "h-10 w-full rounded-sm border-0 border-b border-b-white/40 bg-[#161616] px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand/70";

const WA_NUMBER_E164 = "5519988935849";
const MAIL_TO = "contatoarpextech@gmail.com.br";
const MAIL_SUBJECT = "Novo contato ArpeX";

export default function ContatoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);

    const fd = new FormData(e.currentTarget);
    const get = (key: string) => String(fd.get(key) ?? "");

    const texto =
      `Olá! Vim pelo site e quero entender qual solução faz mais sentido para o meu negócio.\n\n` +
      `Nome: ${get("nome")} ${get("sobrenome")}\n` +
      `E-mail: ${get("email")}\n` +
      `Telefone: ${get("telefone")}\n` +
      `Necessidade: ${get("necessidade")}\n` +
      `Observações: ${get("observacoes")}`;

    const waUrl = `https://wa.me/${WA_NUMBER_E164}?text=${encodeURIComponent(texto)}`;

    try {
      const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        window.location.href = waUrl;
      }

      setOk(true);
      e.currentTarget.reset();
    } catch {
      try {
        const mailto =
          `mailto:${MAIL_TO}` +
          `?subject=${encodeURIComponent(MAIL_SUBJECT)}` +
          `&body=${encodeURIComponent(texto)}`;
        window.location.href = mailto;
        setOk(true);
      } catch {
        setOk(false);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-gradient-to-r from-[#1A1A1A] to-black pt-12">
      <Image src={bigLogo} alt="Arpex BigLogo" className="absolute max-w-[1000px]" />
      <Section className="relative py-16">
        <div className="mx-auto w-full max-w-[900px] px-4">
          <div className="mb-6 text-center">
            <H2 className="text-white">
              Conte o momento do seu negócio,
              <br /> e estruturamos a conversa certa.
            </H2>
          </div>

          <div className="mt-18 rounded-xl bg-black/60 px-10 py-14 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-white/70">Nome</label>
                <input name="nome" required placeholder="Seu nome" className={field} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Sobrenome</label>
                <input name="sobrenome" required placeholder="Seu sobrenome" className={field} />
              </div>

              <div>
                <label className="mb-1 block text-xs text-white/70">E-mail</label>
                <input type="email" name="email" required placeholder="voce@empresa.com" className={field} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Telefone com DDD</label>
                <input name="telefone" placeholder="(11) 90000-0000" className={field} />
              </div>

              <div className="relative">
                <label className="mb-1 block text-xs text-white/70">Você precisa de...</label>
                <select name="necessidade" className={`${field} appearance-none pr-8`} defaultValue="">
                  <option value="" disabled>
                    Selecionar
                  </option>
                  <option value="diagnostico">Diagnóstico de operação</option>
                  <option value="automacao">Automação de processos</option>
                  <option value="sistema">Sistema sob medida</option>
                  <option value="app">Aplicativo ou portal</option>
                  <option value="financeiro">Solução financeira</option>
                  <option value="site">Site ou experiência digital</option>
                  <option value="outro">Outro</option>
                </select>
                <span
                  className="pointer-events-none absolute right-3 top-9 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-white/60 md:top-[42px]"
                  aria-hidden
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Observações</label>
                <input name="observacoes" placeholder="Descreva dores, metas ou contexto" className={field} />
              </div>

              <div className="mt-2 flex justify-center md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center rounded-sm bg-brand px-12 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Enviar via WhatsApp"}
                </button>
              </div>

              <div className="text-center text-sm md:col-span-2" aria-live="polite">
                {ok === true && (
                  <span className="text-emerald-400">
                    Abrimos sua mensagem no WhatsApp ou no e-mail. Obrigado.
                  </span>
                )}
                {ok === false && (
                  <span className="text-red-400">Não foi possível enviar agora. Tente novamente.</span>
                )}
              </div>
            </form>
          </div>

          <div className="mb-18 mt-18 text-center text-xl text-white">
            <p className="font-semibold">Diagnóstico claro, escopo objetivo e execução forte.</p>
            <p className="font-semibold">Esse é o começo de um projeto com padrão ArpeX.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
