import type { Contato } from "../types/contato";

// MOCK — contatos fictícios das startups e dos investidores. O back ainda NÃO
// tem campos de contato. Ficam separados dos dados da descoberta de propósito:
// só obterContato() (discoveryService / investidoresService) lê daqui, e só
// devolve o contato quando o status do interesse é "match".
//
// Variação para testar: alguns com os três canais, alguns só com e-mail e um
// sem nenhum (EduSync e Juliana Prado, que também têm interesse recíproco).

export const CONTATOS_STARTUPS: Record<string, Contato> = {
  biopay: { whatsapp: "5511987650001", email: "contato@biopay.exemplo.com", telefone: "5511987650001" },
  healthpulse: { email: "fundadores@healthpulse.exemplo.com" },
  terraverde: { whatsapp: "5565998760002", email: "ola@terraverde.exemplo.com" },
  edusync: {},
  logiroute: { email: "investidores@logiroute.exemplo.com", telefone: "554130300003" },
  studionext: { whatsapp: "5521977770004" },
  "verde-pay": { whatsapp: "5581999990005", email: "time@verdepay.exemplo.com", telefone: "5581999990005" },
  medconecta: { email: "contato@medconecta.exemplo.com" },
  solarne: { whatsapp: "5585988880007", email: "contato@solarne.exemplo.com" },
  feiraja: { whatsapp: "5581966660008" },
  codalab: { email: "ola@codalab.exemplo.com" },
  rotanordeste: { whatsapp: "5571955550010", email: "contato@rotanordeste.exemplo.com" },
};

export const CONTATOS_INVESTIDORES: Record<string, Contato> = {
  "marcos-andrade": { whatsapp: "5581991110001", email: "marcos.andrade@exemplo.com", telefone: "5581991110001" },
  "camila-lins": { email: "camila.lins@exemplo.com" },
  "ricardo-bittencourt": { email: "ricardo.b@exemplo.com", telefone: "5521992220003" },
  "marina-albuquerque": { whatsapp: "5581993330004", email: "marina.albuquerque@exemplo.com" },
  "juliana-prado": {},
  "fernando-accioly": { whatsapp: "5587994440006" },
  "beatriz-nobrega": { email: "beatriz.nobrega@exemplo.com" },
  "paulo-cavalcanti": { email: "paulo.cavalcanti@exemplo.com", telefone: "554133330008" },
  "lucas-teixeira": { whatsapp: "5581995550009", email: "lucas.teixeira@exemplo.com", telefone: "5581995550009" },
  "helena-duarte": { email: "helena.duarte@exemplo.com" },
  "andre-moura": { whatsapp: "5583996660011" },
  "sofia-rangel": { whatsapp: "5584997770012", email: "sofia.rangel@exemplo.com" },
};
