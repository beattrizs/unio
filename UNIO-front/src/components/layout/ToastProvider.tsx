import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { CircleAlert, CircleCheck, Info, Sparkles, X, type LucideIcon } from "lucide-react";
import { ToastContext, type TipoToast } from "../../hooks/useToast";
import { FOCO_VISIVEL } from "../onboarding/selecao";

interface Toast {
  id: number;
  mensagem: string;
  tipo: TipoToast;
}

const DURACAO_MS = 5000;

const ESTILOS: Record<TipoToast, { classe: string; icone: LucideIcon }> = {
  sucesso: { classe: "bg-deepgreen text-white", icone: CircleCheck },
  match: { classe: "bg-sage font-bold text-deepgreen", icone: Sparkles },
  info: { classe: "border border-lightgray bg-white text-deepgreen", icone: Info },
  erro: { classe: "border border-red-200 bg-white text-red-800", icone: CircleAlert },
};

// Avisos curtos no canto da tela (ex.: "Interesse enviado para BioPay").
// A região é aria-live, então leitores de tela anunciam cada aviso.
export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const proximoId = useRef(0);

  const remover = useCallback((id: number) => {
    setToasts((atuais) => atuais.filter((toast) => toast.id !== id));
  }, []);

  const mostrar = useCallback(
    (mensagem: string, tipo: TipoToast = "sucesso") => {
      proximoId.current += 1;
      const id = proximoId.current;
      // No máximo 3 na tela
      setToasts((atuais) => [...atuais.slice(-2), { id, mensagem, tipo }]);
      window.setTimeout(() => remover(id), DURACAO_MS);
    },
    [remover],
  );

  const valor = useMemo(() => ({ mostrar }), [mostrar]);

  return (
    <ToastContext.Provider value={valor}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end"
      >
        {toasts.map(({ id, mensagem, tipo }) => {
          const { classe, icone: Icone } = ESTILOS[tipo];
          return (
            <div
              key={id}
              className={`pointer-events-auto flex w-full max-w-sm animate-fade-in items-start gap-3 rounded-2xl px-4 py-3 text-sm shadow-soft-lg ${classe}`}
            >
              <Icone size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <p className="flex-1">{mensagem}</p>
              <button
                type="button"
                onClick={() => remover(id)}
                aria-label="Fechar aviso"
                className={`-mr-1 shrink-0 rounded-full p-1 opacity-80 hover:opacity-100 ${FOCO_VISIVEL}`}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
