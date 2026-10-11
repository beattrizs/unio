import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { ADMIN_EMAIL, ADMIN_SENHA } from "../data/store";

// BACK SIMULADO — só pra testar o front sem o back (unio/) rodando.
// Liga com VITE_MOCK_BACKEND=true no .env (ver services/api.ts); com a
// variável desligada, este arquivo nem é carregado.
//
// Responde às mesmas rotas que o front usa, imitando os status e mensagens
// do back (409 e-mail já cadastrado, 401 credenciais inválidas, 404 perfil
// ainda não criado...). Os dados ficam no localStorage, na chave abaixo —
// apague-a pra "zerar o banco".

const CHAVE_BANCO = "unio_mock_backend";
const LATENCIA_MS = 300;

type Role = "STARTUP" | "INVESTOR" | "ADMIN";

interface UsuarioMock {
  id: number;
  email: string;
  senha: string;
  role: Role;
  createdAt: string;
}

interface BancoMock {
  proximoId: number;
  usuarios: UsuarioMock[];
  // perfis por id do usuário
  startups: Record<number, Record<string, unknown>>;
  investidores: Record<number, Record<string, unknown>>;
}

function bancoInicial(): BancoMock {
  return {
    proximoId: 2,
    // Mesmo admin de demonstração de data/store.ts
    usuarios: [
      {
        id: 1,
        email: ADMIN_EMAIL,
        senha: ADMIN_SENHA,
        role: "ADMIN",
        createdAt: new Date().toISOString(),
      },
    ],
    startups: {},
    investidores: {},
  };
}

function lerBanco(): BancoMock {
  try {
    const bruto = localStorage.getItem(CHAVE_BANCO);
    if (bruto) return JSON.parse(bruto) as BancoMock;
  } catch {
    // banco corrompido ou localStorage indisponível: recomeça do zero
  }
  return bancoInicial();
}

function salvarBanco(banco: BancoMock) {
  try {
    localStorage.setItem(CHAVE_BANCO, JSON.stringify(banco));
  } catch {
    // sem localStorage os dados só duram até recarregar a página
  }
}

// Token no formato JWT (header.payload.assinatura) com as mesmas claims do
// back (sub, userId, role), pra o AuthContext conseguir ler. Sem assinatura
// de verdade — não serve pra nada fora deste simulador.
function base64Url(texto: string) {
  const bytes = new TextEncoder().encode(texto);
  let binario = "";
  bytes.forEach((byte) => (binario += String.fromCharCode(byte)));
  return btoa(binario).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function gerarToken(usuario: UsuarioMock) {
  const header = base64Url(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({ sub: usuario.email, userId: usuario.id, role: usuario.role }),
  );
  return `${header}.${payload}.mock`;
}

function usuarioDoToken(banco: BancoMock, config: InternalAxiosRequestConfig) {
  const auth = String(config.headers?.Authorization ?? "");
  const token = auth.replace(/^Bearer\s+/i, "");
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes)) as { userId?: number };
    return banco.usuarios.find((usuario) => usuario.id === claims.userId) ?? null;
  } catch {
    return null;
  }
}

class ErroHttp extends Error {
  status: number;
  extra?: Record<string, unknown>;
  constructor(status: number, message: string, extra?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}

function resumoUsuario(usuario: UsuarioMock) {
  return {
    id: usuario.id,
    email: usuario.email,
    role: usuario.role,
    createdAt: usuario.createdAt,
  };
}

function perfilCompleto(banco: BancoMock, usuario: UsuarioMock) {
  if (usuario.role === "ADMIN") return resumoUsuario(usuario);
  const perfil =
    usuario.role === "STARTUP" ? banco.startups[usuario.id] : banco.investidores[usuario.id];
  if (!perfil) {
    const tipo = usuario.role === "STARTUP" ? "Startup" : "Investor";
    throw new ErroHttp(404, `Perfil ${tipo} não encontrado`);
  }
  return { ...resumoUsuario(usuario), ...perfil };
}

function exigirCampos(corpo: Record<string, unknown>, campos: Record<string, string>) {
  const faltando = Object.entries(campos)
    .filter(([campo]) => {
      const valor = corpo[campo];
      return valor === undefined || valor === null || String(valor).trim() === "";
    })
    .map(([, mensagem]) => ({ defaultMessage: mensagem }));
  if (faltando.length > 0) throw new ErroHttp(400, "Dados inválidos", { errors: faltando });
}

function exigirPositivo(valor: unknown, mensagem: string) {
  if (!(Number(valor) > 0)) {
    throw new ErroHttp(400, mensagem, { errors: [{ defaultMessage: mensagem }] });
  }
}

type Rota = (args: {
  banco: BancoMock;
  corpo: Record<string, unknown>;
  config: InternalAxiosRequestConfig;
}) => unknown;

function exigirUsuario(banco: BancoMock, config: InternalAxiosRequestConfig) {
  const usuario = usuarioDoToken(banco, config);
  if (!usuario) throw new ErroHttp(401, "Não autenticado");
  return usuario;
}

const ROTAS: Record<string, Rota> = {
  "POST /api/auth/register": ({ banco, corpo }) => {
    const email = String(corpo.email ?? "").trim().toLowerCase();
    const role = corpo.role as Role;
    exigirCampos(corpo, { email: "Email é obrigatório", password: "Senha é obrigatória" });
    if (banco.usuarios.some((usuario) => usuario.email === email)) {
      throw new ErroHttp(409, "Email já cadastrado");
    }
    if (role === "ADMIN") {
      throw new ErroHttp(403, "Criação de administrador deve ser feita por bootstrap interno");
    }
    const usuario: UsuarioMock = {
      id: banco.proximoId++,
      email,
      senha: String(corpo.password),
      role: role === "INVESTOR" ? "INVESTOR" : "STARTUP",
      createdAt: new Date().toISOString(),
    };
    banco.usuarios.push(usuario);
    return { token: gerarToken(usuario), email: usuario.email, role: usuario.role };
  },

  "POST /api/auth/login": ({ banco, corpo }) => {
    const email = String(corpo.email ?? "").trim().toLowerCase();
    const usuario = banco.usuarios.find((item) => item.email === email);
    if (!usuario || usuario.senha !== String(corpo.password ?? "")) {
      throw new ErroHttp(401, "Credenciais inválidas");
    }
    return { token: gerarToken(usuario), email: usuario.email, role: usuario.role };
  },

  "GET /api/profile/me": ({ banco, config }) =>
    perfilCompleto(banco, exigirUsuario(banco, config)),

  "PUT /api/profile/me": ({ banco, corpo, config }) => {
    const usuario = exigirUsuario(banco, config);
    const perfis = usuario.role === "STARTUP" ? banco.startups : banco.investidores;
    if (usuario.role !== "ADMIN") {
      perfilCompleto(banco, usuario); // 404 se ainda não existe
      perfis[usuario.id] = { ...perfis[usuario.id], ...corpo };
    }
    return perfilCompleto(banco, usuario);
  },

  "POST /api/profile/startup": ({ banco, corpo, config }) => {
    const usuario = exigirUsuario(banco, config);
    if (usuario.role !== "STARTUP") throw new ErroHttp(403, "Usuário não é do tipo STARTUP");
    if (banco.startups[usuario.id]) throw new ErroHttp(409, "Perfil Startup já existe");
    exigirCampos(corpo, {
      segmento: "Segmento é obrigatório",
      estagio: "Estágio é obrigatório",
      localizacao: "Localização é obrigatória",
      modeloNegocio: "Modelo de negócio é obrigatório",
      mercadoAlvo: "Mercado alvo é obrigatório",
      capitalProcurado: "Capital procurado é obrigatório",
    });
    exigirPositivo(corpo.capitalProcurado, "Capital procurado deve ser positivo");
    banco.startups[usuario.id] = corpo;
    return perfilCompleto(banco, usuario);
  },

  "POST /api/profile/investor": ({ banco, corpo, config }) => {
    const usuario = exigirUsuario(banco, config);
    if (usuario.role !== "INVESTOR") throw new ErroHttp(403, "Usuário não é do tipo INVESTOR");
    if (banco.investidores[usuario.id]) throw new ErroHttp(409, "Perfil Investor já existe");
    exigirPositivo(corpo.ticketMinimo, "Ticket mínimo deve ser positivo");
    exigirPositivo(corpo.ticketMaximo, "Ticket máximo deve ser positivo");
    if (Number(corpo.ticketMinimo) > Number(corpo.ticketMaximo)) {
      throw new ErroHttp(400, "Ticket mínimo não pode ser maior que ticket máximo");
    }
    banco.investidores[usuario.id] = corpo;
    return perfilCompleto(banco, usuario);
  },

  "GET /api/admin/users": ({ banco, config }) => {
    const usuario = exigirUsuario(banco, config);
    if (usuario.role !== "ADMIN") throw new ErroHttp(403, "Acesso negado");
    return banco.usuarios.map(resumoUsuario);
  },
};

export async function mockAdapter(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  await new Promise((resolve) => setTimeout(resolve, LATENCIA_MS));

  const metodo = (config.method ?? "get").toUpperCase();
  const caminho = (config.url ?? "").split("?")[0];
  const rota = ROTAS[`${metodo} ${caminho}`];
  const corpo =
    typeof config.data === "string" && config.data ? JSON.parse(config.data) : config.data ?? {};

  const banco = lerBanco();
  try {
    if (!rota) throw new ErroHttp(404, `Rota não simulada: ${metodo} ${caminho}`);
    const data = rota({ banco, corpo, config });
    salvarBanco(banco);
    console.info(`[back simulado] ${metodo} ${caminho} -> 200`, data);
    return { data, status: 200, statusText: "OK", headers: {}, config };
  } catch (erro) {
    const http = erro instanceof ErroHttp ? erro : new ErroHttp(500, String(erro));
    console.info(`[back simulado] ${metodo} ${caminho} -> ${http.status}`, http.message);
    const response: AxiosResponse = {
      data: { status: http.status, message: http.message, ...http.extra },
      status: http.status,
      statusText: http.message,
      headers: {},
      config,
    };
    throw new AxiosError(http.message, `HTTP_${http.status}`, config, null, response);
  }
}

// Selo fixo no canto da tela, pra ninguém esquecer que o back está desligado
function mostrarSelo() {
  if (typeof document === "undefined" || document.getElementById("selo-back-simulado")) return;
  const selo = document.createElement("div");
  selo.id = "selo-back-simulado";
  selo.setAttribute("role", "status");
  selo.textContent = "Back simulado (sem servidor)";
  selo.style.cssText =
    "position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:9999;" +
    "padding:4px 10px;border-radius:999px;white-space:nowrap;" +
    "background:#FDE68A;color:#713F12;font:600 12px system-ui,sans-serif;" +
    "box-shadow:0 2px 8px rgba(0,0,0,.15);pointer-events:none";
  document.body.appendChild(selo);
}

if (typeof document !== "undefined") {
  if (document.body) mostrarSelo();
  else document.addEventListener("DOMContentLoaded", mostrarSelo);
}
