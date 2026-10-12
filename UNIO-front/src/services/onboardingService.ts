import type { PerfilOnboarding, StatusOnboarding } from "../types/onboarding";

// Único ponto de persistência do onboarding. Por enquanto tudo fica no
// localStorage do navegador (o onboarding ainda NÃO chama a API). Quando o
// back tiver os campos/endpoints, basta trocar a implementação destas funções
// por chamadas HTTP — por isso todas já retornam Promise, e as telas não
// precisam mudar.

const PREFIXO = "unio_onboarding_";

interface RegistroStatus {
  status: Exclude<StatusOnboarding, "pendente">;
  perfil: PerfilOnboarding;
  atualizadoEm: string;
}

// Identificador do usuário usado nas chaves. Usa o e-mail porque é o único
// dado que existe tanto logo após o cadastro (a resposta do /register não
// traz id) quanto após o login (/api/profile/me) — com o id, a mesma pessoa
// ficaria com duas chaves diferentes.
export function chaveUsuario(user: { email: string }) {
  return user.email.trim().toLowerCase();
}

const chaveStatus = (userKey: string) => `${PREFIXO}${userKey}`;
const chaveRespostas = (userKey: string, perfil: PerfilOnboarding) =>
  `${PREFIXO}${userKey}_${perfil}_respostas`;

// localStorage pode lançar erro (modo privado, cota cheia); nesse caso o
// onboarding continua funcionando, só não sobrevive ao recarregar a página.
function ler<T>(chave: string): T | null {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : null;
  } catch {
    return null;
  }
}

function gravar(chave: string, valor: unknown) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // ver comentário em ler()
  }
}

export async function getStatus(userKey: string): Promise<StatusOnboarding> {
  return ler<RegistroStatus>(chaveStatus(userKey))?.status ?? "pendente";
}

export async function loadAnswers<T>(
  userKey: string,
  perfil: PerfilOnboarding,
): Promise<Partial<T> | null> {
  return ler<Partial<T>>(chaveRespostas(userKey, perfil));
}

export async function saveAnswers<T>(
  userKey: string,
  perfil: PerfilOnboarding,
  respostas: T,
): Promise<void> {
  gravar(chaveRespostas(userKey, perfil), respostas);
}

export async function markCompleted<T>(
  userKey: string,
  perfil: PerfilOnboarding,
  respostas: T,
): Promise<void> {
  gravar(chaveRespostas(userKey, perfil), respostas);
  const registro: RegistroStatus = {
    status: "concluido",
    perfil,
    atualizadoEm: new Date().toISOString(),
  };
  gravar(chaveStatus(userKey), registro);
}

// As respostas parciais continuam salvas, pra quem pulou poder retomar
// depois de onde parou.
export async function markSkipped(
  userKey: string,
  perfil: PerfilOnboarding,
): Promise<void> {
  const registro: RegistroStatus = {
    status: "pulado",
    perfil,
    atualizadoEm: new Date().toISOString(),
  };
  gravar(chaveStatus(userKey), registro);
}
