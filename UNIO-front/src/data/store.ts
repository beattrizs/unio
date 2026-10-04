import type { Startup, Investidor } from "../types";

export const startups: Startup[] = [];
export const investidores: Investidor[] = [];

export type TipoConta = "Startup" | "Investidor" | "Admin";

interface Conta {
  email: string;
  tipo: TipoConta;
}

// Credenciais fixas do admin: como ainda não tem back-end, a conta já vem
// "pronta" pra dar pra logar direto e ver o painel /admin na demo.
export const ADMIN_EMAIL = "sadcarola@gmail.com";
export const ADMIN_SENHA = "000";

// Contas que já concluíram o cadastro (passo 1 do AuthCard + RF01/RF02),
// mais a conta admin, que já nasce cadastrada. É o que o login usa pra
// saber se o e-mail existe e pra decidir pra onde mandar depois de entrar.
const contasCadastradas: Conta[] = [{ email: ADMIN_EMAIL, tipo: "Admin" }];

export function registrarConta(email: string, tipo: TipoConta) {
  contasCadastradas.push({ email: email.trim().toLowerCase(), tipo });
}

export function buscarConta(email: string): Conta | undefined {
  const emailNormalizado = email.trim().toLowerCase();
  return contasCadastradas.find((conta) => conta.email === emailNormalizado);
}

export function contaExiste(email: string) {
  return buscarConta(email) !== undefined;
}

export function addStartup(startup: Omit<Startup, "id">) {
  const novaStartup: Startup = { ...startup, id: crypto.randomUUID() };
  startups.push(novaStartup);
  console.log("Startup cadastrada:", novaStartup);
  return novaStartup;
}

export function addInvestidor(investidor: Omit<Investidor, "id">) {
  const novoInvestidor: Investidor = { ...investidor, id: crypto.randomUUID() };
  investidores.push(novoInvestidor);
  console.log("Investidor cadastrado:", novoInvestidor);
  return novoInvestidor;
}
