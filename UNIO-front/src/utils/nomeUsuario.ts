import type { UserProfile } from "../contexts/AuthContext";

// O /api/profile/me do investidor ainda não devolve nome. Usa um campo de
// nome se existir; senão monta a partir do e-mail ("marcos.andrade@..." →
// "Marcos Andrade").
export function nomeUsuario(user: UserProfile | null): string {
  if (!user) return "";
  for (const valor of [user.nome, user.name, user.nomeCompleto]) {
    if (typeof valor === "string" && valor.trim()) return valor.trim();
  }
  const local = user.email.split("@")[0] ?? "";
  const palavras = local
    .split(/[._\-+]+/)
    .map((parte) => parte.replace(/\d+/g, ""))
    .filter(Boolean);
  if (palavras.length === 0) return user.email;
  return palavras.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(" ");
}

export function primeiroNome(user: UserProfile | null) {
  return nomeUsuario(user).split(" ")[0] ?? "";
}

// "Marcos Andrade" → "MA"; uma palavra só → duas primeiras letras
export function iniciais(nome: string): string {
  const palavras = nome.trim().split(/\s+/).filter(Boolean);
  if (palavras.length === 0) return "?";
  if (palavras.length === 1) return palavras[0].slice(0, 2).toUpperCase();
  return (palavras[0][0] + palavras[palavras.length - 1][0]).toUpperCase();
}
