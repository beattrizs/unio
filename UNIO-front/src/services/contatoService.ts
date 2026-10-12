import type { UserProfile } from "../contexts/AuthContext";
import type { Contato } from "../types/contato";
import { contatoValido } from "../utils/contato";
import { chaveUsuario } from "./onboardingService";

// Contato do PRÓPRIO usuário logado (seção "Contatos para matches" do Meu
// perfil). MOCK: o back ainda NÃO tem campos de contato; por enquanto fica no
// localStorage, em unio_contato_<email>. Só é mostrado a quem der match.

const chave = (user: UserProfile) => `unio_contato_${chaveUsuario(user)}`;

export async function obterMeuContato(user: UserProfile | null): Promise<Contato> {
  if (!user) return {};
  try {
    const bruto = localStorage.getItem(chave(user));
    return bruto ? contatoValido(JSON.parse(bruto) as Contato) : {};
  } catch {
    return {};
  }
}

// Grava só os canais válidos (a tela já valida; isto é a garantia final)
export async function salvarMeuContato(user: UserProfile | null, contato: Contato): Promise<Contato> {
  const valido = contatoValido(contato);
  if (!user) return valido;
  try {
    localStorage.setItem(chave(user), JSON.stringify(valido));
  } catch {
    throw new Error("Não foi possível salvar neste navegador.");
  }
  return valido;
}
