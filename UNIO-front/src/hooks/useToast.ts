import { createContext, useContext } from "react";

export type TipoToast = "sucesso" | "match" | "info" | "erro";

export interface ToastContextValue {
  mostrar: (mensagem: string, tipo?: TipoToast) => void;
}

// O provider fica em components/layout/ToastProvider.tsx (arquivo só com
// componente, por causa do fast refresh)
export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) throw new Error("useToast precisa ser usado dentro de <ToastProvider>");
  return contexto;
}
