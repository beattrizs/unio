import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  ONBOARDING_CONFIG,
  type ConfigOnboarding,
  type PerfilComOnboarding,
  type RespostasPorPerfil,
} from "../pages/onboarding/config";
import {
  chaveUsuario,
  loadAnswers,
  markCompleted,
  markSkipped,
  saveAnswers,
} from "../services/onboardingService";

export interface OnboardingState<T> {
  respostas: T;
  atualizar: (parcial: Partial<T>) => void;
  // true enquanto as respostas salvas ainda estão sendo carregadas
  carregando: boolean;
  // true enquanto conclui/pula (pra desabilitar os botões)
  ocupado: boolean;
  etapas: string[];
  passo: number;
  totalPassos: number;
  passoValido: boolean;
  next: () => void;
  back: () => void;
  goTo: (passo: number) => void;
  finish: () => Promise<void>;
  skip: () => Promise<void>;
}

// Estado do wizard de onboarding de um perfil: respostas (salvas a cada
// mudança, pra sobreviver a um reload), validação e navegação entre passos.
// O passo atual fica na URL (?passo=2), então o voltar do navegador também
// funciona.
export function useOnboarding<P extends PerfilComOnboarding>(
  perfil: P,
): OnboardingState<RespostasPorPerfil[P]> {
  type T = RespostasPorPerfil[P];
  const config = ONBOARDING_CONFIG[perfil] as ConfigOnboarding<T>;
  const totalPassos = config.etapas.length;

  const { user } = useAuth();
  const userKey = user ? chaveUsuario(user) : "";
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [respostas, setRespostas] = useState<T>(config.respostasIniciais);
  // Guarda pra qual usuário as respostas já foram carregadas
  const [carregadoPara, setCarregadoPara] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const carregando = carregadoPara !== userKey;

  useEffect(() => {
    let ativo = true;
    loadAnswers<T>(userKey, perfil).then((salvas) => {
      if (!ativo) return;
      setRespostas({ ...config.respostasIniciais, ...salvas });
      setCarregadoPara(userKey);
    });
    return () => {
      ativo = false;
    };
  }, [config, perfil, userKey]);

  useEffect(() => {
    if (carregando || !userKey) return;
    void saveAnswers(userKey, perfil, respostas);
  }, [carregando, perfil, respostas, userKey]);

  // O passo pedido na URL só vale se todos os anteriores estiverem válidos;
  // senão, para no primeiro passo incompleto (ex.: alguém digitou ?passo=4).
  const passoPedido = Number(params.get("passo"));
  const passo = useMemo(() => {
    const pedido = Number.isInteger(passoPedido)
      ? Math.min(Math.max(passoPedido, 1), totalPassos)
      : 1;
    for (let anterior = 1; anterior < pedido; anterior++) {
      if (!config.validarPasso(anterior, respostas)) return anterior;
    }
    return pedido;
  }, [config, passoPedido, respostas, totalPassos]);

  // Mantém a URL igual ao passo realmente exibido
  useEffect(() => {
    if (!carregando && passoPedido !== passo) {
      setParams({ passo: String(passo) }, { replace: true });
    }
  }, [carregando, passo, passoPedido, setParams]);

  const passoValido = config.validarPasso(passo, respostas);

  const atualizar = useCallback((parcial: Partial<T>) => {
    setRespostas((atual) => ({ ...atual, ...parcial }));
  }, []);

  const goTo = useCallback(
    (destino: number) => {
      if (destino < 1 || destino > totalPassos) return;
      setParams({ passo: String(destino) });
    },
    [setParams, totalPassos],
  );

  const next = useCallback(() => {
    if (passoValido) goTo(passo + 1);
  }, [goTo, passo, passoValido]);

  const back = useCallback(() => goTo(passo - 1), [goTo, passo]);

  const finish = useCallback(async () => {
    const tudoValido = config.etapas.every((_, indice) =>
      config.validarPasso(indice + 1, respostas),
    );
    if (!tudoValido) return;
    setOcupado(true);
    try {
      await markCompleted(userKey, perfil, respostas);
      navigate(config.rotaHome, { replace: true });
    } finally {
      setOcupado(false);
    }
  }, [config, navigate, perfil, respostas, userKey]);

  const skip = useCallback(async () => {
    setOcupado(true);
    try {
      await markSkipped(userKey, perfil);
      navigate(config.rotaHome, { replace: true });
    } finally {
      setOcupado(false);
    }
  }, [config, navigate, perfil, userKey]);

  return {
    respostas,
    atualizar,
    carregando,
    ocupado,
    etapas: config.etapas,
    passo,
    totalPassos,
    passoValido,
    next,
    back,
    goTo,
    finish,
    skip,
  };
}
