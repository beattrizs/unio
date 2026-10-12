// Contato de uma das partes, mostrado só para quem deu match (unio). A
// plataforma não tem chat nem agenda: o contato e a reunião acontecem por
// canais externos (WhatsApp, e-mail, telefone, Google Agenda).
export interface Contato {
  // Só dígitos, com DDI (ex.: "5581999990000")
  whatsapp?: string;
  email?: string;
  telefone?: string;
}

// Contato de um unio + quando o match aconteceu (ISO; null se não registrado)
export interface DadosUnio {
  contato: Contato;
  matchEm: string | null;
}

// Eventos locais para as métricas da home da startup
export type TipoEventoUnio = "contato" | "reuniao";
