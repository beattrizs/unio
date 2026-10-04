import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LogEntry } from "../types";

interface AuditContextValue {
  logs: LogEntry[];
  registrarAcao: (acao: string) => void;
}

// Contexto = "estado global" desta área: as telas de moderação escrevem
// aqui, e a tela de auditoria só lê. Assim as duas telas conseguem
// conversar sem precisar passar tudo por props.
const AuditContext = createContext<AuditContextValue | null>(null);

const ADMIN_ATUAL = "Admin Master";

export function AuditProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const registrarAcao = useCallback((acao: string) => {
    const novoLog: LogEntry = {
      id: crypto.randomUUID(),
      dataHora: new Date().toLocaleString("pt-BR"),
      usuario: ADMIN_ATUAL,
      acao,
    };
    // Novo registro entra na frente, então o log já fica do mais recente
    // para o mais antigo sem precisar ordenar na tela.
    setLogs((atual) => [novoLog, ...atual]);
  }, []);

  const value = useMemo(() => ({ logs, registrarAcao }), [logs, registrarAcao]);

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
}

// Hook de conveniência: evita repetir o useContext + null-check em cada tela.
export function useAudit() {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error("useAudit precisa ser usado dentro de <AuditProvider>");
  }
  return context;
}
