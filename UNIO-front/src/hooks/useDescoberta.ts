import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getApiErrorMessage } from "../services/api";
import { chaveUsuario } from "../services/onboardingService";
import type { StartupRecomendada } from "../types/discovery";
import type { AlteracaoRecomendacao } from "../types/recomendacoes";
import { useToast } from "./useToast";

export function useUserKey() {
  const { user } = useAuth();
  return user ? chaveUsuario(user) : "";
}

interface EstadoCarregamento<T> {
  fonte: () => Promise<T>;
  tentativa: number;
  dados?: T;
  erro?: string;
}

// Carrega dados de uma função do discoveryService. `carregar` precisa ser
// estável (useCallback): quando ela muda (outro id, outro usuário), a tela
// volta a "carregando" sem setState síncrono dentro do efeito.
export function useCarregamento<T>(carregar: () => Promise<T>, mensagemErro: string) {
  const [tentativa, setTentativa] = useState(0);
  const [estado, setEstado] = useState<EstadoCarregamento<T> | null>(null);

  useEffect(() => {
    let ativo = true;
    carregar()
      .then((dados) => {
        if (ativo) setEstado({ fonte: carregar, tentativa, dados });
      })
      .catch((erro: unknown) => {
        if (ativo) {
          setEstado({ fonte: carregar, tentativa, erro: getApiErrorMessage(erro, mensagemErro) });
        }
      });
    return () => {
      ativo = false;
    };
  }, [carregar, mensagemErro, tentativa]);

  const atual = estado && estado.fonte === carregar && estado.tentativa === tentativa ? estado : null;

  const recarregar = useCallback(() => setTentativa((t) => t + 1), []);

  // Atualiza os dados já carregados (ex.: depois de salvar ou demonstrar interesse)
  const alterarDados = useCallback((alterar: (dados: T) => T) => {
    setEstado((anterior) =>
      anterior && anterior.dados !== undefined
        ? { ...anterior, dados: alterar(anterior.dados) }
        : anterior,
    );
  }, []);

  return {
    carregando: atual === null,
    erro: atual?.erro ?? null,
    dados: atual?.dados ?? null,
    recarregar,
    alterarDados,
  };
}

// Executa uma ação de um item (salvar, interesse...) marcando o item como
// ocupado enquanto roda e mostrando um toast se der erro
export function useExecucao() {
  const { mostrar } = useToast();
  const [ocupados, setOcupados] = useState<string[]>([]);

  const executar = useCallback(
    async (id: string, acao: () => Promise<void>, mensagemErro: string) => {
      setOcupados((atual) => [...atual, id]);
      try {
        await acao();
      } catch {
        mostrar(mensagemErro, "erro");
      } finally {
        setOcupados((atual) => atual.filter((item) => item !== id));
      }
    },
    [mostrar],
  );

  const estaOcupado = useCallback((id: string) => ocupados.includes(id), [ocupados]);

  return { executar, estaOcupado };
}

// Aplica uma alteração num item de uma lista de StartupRecomendada
export function alterarItem(
  lista: StartupRecomendada[],
  id: string,
  alteracao: AlteracaoRecomendacao,
): StartupRecomendada[] {
  return lista.map((item) => (item.startup.id === id ? { ...item, ...alteracao } : item));
}
