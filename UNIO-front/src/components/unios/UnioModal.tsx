import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { HeartCrack, Sparkles, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCarregamento } from "../../hooks/useDescoberta";
import { useToast } from "../../hooks/useToast";
import {
  desfazerMatch,
  nomeDaRecomendacao,
  obterContato,
  registrarEvento,
} from "../../services/recomendacoesService";
import type { Recomendacao } from "../../types/recomendacoes";
import { nomeUsuario } from "../../utils/nomeUsuario";
import { FOCO_VISIVEL } from "../onboarding/selecao";
import ConfirmarDesfazer from "./ConfirmarDesfazer";
import ContatoCard, { type CanalContato } from "./ContatoCard";
import ReuniaoCard, { type DestinoReuniao } from "./ReuniaoCard";
import UnioMiniPerfil from "./UnioMiniPerfil";

interface UnioModalProps {
  rec: Recomendacao;
  onFechar: () => void;
  // Match desfeito: a página tira o unio da lista e fecha o popup
  onDesfeito: (rec: Recomendacao) => void;
}

const SELETOR_FOCAVEIS =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

const TOAST_CANAL: Record<CanalContato, string> = {
  whatsapp: "Abrindo WhatsApp…",
  email: "Abrindo seu e-mail…",
  telefone: "Abrindo o telefone…",
};

// "desde 08 out"
function desde(iso: string | null) {
  if (!iso) return null;
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return null;
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = data.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  return `desde ${dia} ${mes}`;
}

// Popup de um unio (investidor e startup): mini perfil da outra parte e
// atalhos para contato e reunião por canais externos. O contato só chega
// aqui quando o status é "match" (o serviço garante).
export default function UnioModal({ rec, onFechar, onDesfeito }: UnioModalProps) {
  const { user } = useAuth();
  const { mostrar } = useToast();
  const idTitulo = useId();
  const refPainel = useRef<HTMLDivElement>(null);
  const refTitulo = useRef<HTMLHeadingElement>(null);
  const [confirmando, setConfirmando] = useState(false);
  const [desfazendo, setDesfazendo] = useState(false);

  const nome = nomeDaRecomendacao(rec);
  const meuNome = nomeUsuario(user) || "um usuário da UNIO";

  const carregar = useCallback(() => obterContato(rec, user), [rec, user]);
  const { carregando, dados } = useCarregamento(carregar, "Não foi possível carregar o contato.");

  // Foco inicial no título e rolagem do fundo travada enquanto aberto
  useEffect(() => {
    refTitulo.current?.focus();
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  // ESC fecha; Tab/Shift+Tab ficam presos dentro do popup
  function aoTeclar(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onFechar();
      return;
    }
    if (event.key !== "Tab" || !refPainel.current) return;
    const focaveis = Array.from(refPainel.current.querySelectorAll<HTMLElement>(SELETOR_FOCAVEIS));
    if (focaveis.length === 0) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    const ativo = document.activeElement;
    if (event.shiftKey && (ativo === primeiro || ativo === refTitulo.current)) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && ativo === ultimo) {
      event.preventDefault();
      primeiro.focus();
    }
  }

  function aoAbrirContato(canal: CanalContato) {
    void registrarEvento(rec, user, "contato");
    mostrar(TOAST_CANAL[canal], "info");
  }

  function aoAbrirReuniao(destino: DestinoReuniao) {
    if (destino === "agenda") {
      void registrarEvento(rec, user, "reuniao");
      mostrar("Abrindo o Google Agenda…", "info");
    } else {
      void registrarEvento(rec, user, "contato");
      mostrar(TOAST_CANAL.whatsapp, "info");
    }
  }

  async function confirmarDesfazer() {
    setDesfazendo(true);
    try {
      await desfazerMatch(rec, user);
      mostrar(`Match desfeito com ${nome}.`, "info");
      onDesfeito(rec);
    } catch {
      mostrar("Não foi possível desfazer o match. Tente novamente.", "erro");
      setDesfazendo(false);
    }
  }

  const dataMatch = desde(dados?.matchEm ?? null);

  return createPortal(
    <div
      className="fixed inset-0 z-[45] flex items-end justify-center bg-deepgreen/40 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onFechar}
    >
      <div
        ref={refPainel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        onKeyDown={aoTeclar}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[94vh] w-full animate-fade-in flex-col overflow-hidden rounded-t-3xl bg-white font-jakarta text-deepgreen shadow-soft-lg sm:max-h-[90vh] sm:max-w-[640px] sm:rounded-3xl"
      >
        {/* Cabeçalho fixo */}
        <div className="flex items-center justify-between gap-3 border-b border-lightgray px-5 py-3 sm:px-6">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-deepgreen px-3 py-1 text-xs font-semibold text-white">
              <Sparkles size={12} aria-hidden="true" />
              Deu match!
            </span>
            {dataMatch && <span className="text-xs text-deepgreen/75">{dataMatch}</span>}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setConfirmando(true)}
              aria-expanded={confirmando}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-red-700 hover:bg-red-50 ${FOCO_VISIVEL}`}
            >
              <HeartCrack size={16} aria-hidden="true" />
              <span className="max-sm:sr-only">Desfazer match</span>
            </button>
            <button
              type="button"
              onClick={onFechar}
              aria-label="Fechar"
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-deepgreen hover:bg-lightgray ${FOCO_VISIVEL}`}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Corpo com rolagem própria */}
        <div className="overflow-y-auto px-5 py-5 sm:px-6">
          {confirmando && (
            <div className="mb-5">
              <ConfirmarDesfazer
                nome={nome}
                ocupado={desfazendo}
                onCancelar={() => setConfirmando(false)}
                onConfirmar={confirmarDesfazer}
              />
            </div>
          )}

          <UnioMiniPerfil rec={rec} idTitulo={idTitulo} refTitulo={refTitulo} />

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {carregando ? (
              <>
                <div className="h-48 animate-pulse rounded-2xl bg-lightgray" aria-hidden="true" />
                <div className="h-48 animate-pulse rounded-2xl bg-lightgray" aria-hidden="true" />
                <span className="sr-only" aria-live="polite">
                  Carregando contato
                </span>
              </>
            ) : dados ? (
              <>
                <ContatoCard nome={nome} meuNome={meuNome} contato={dados.contato} onAbrir={aoAbrirContato} />
                <ReuniaoCard nome={nome} meuNome={meuNome} contato={dados.contato} onAbrir={aoAbrirReuniao} />
              </>
            ) : (
              <p className="rounded-2xl bg-lightgray/50 p-4 text-sm text-deepgreen sm:col-span-2">
                O contato só aparece enquanto vocês têm match.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
