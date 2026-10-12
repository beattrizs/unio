import type { KeyboardEvent } from "react";

// Classe de foco visível compartilhada pelos controles do onboarding
export const FOCO_VISIVEL =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deepgreen focus-visible:ring-offset-2";

// Adiciona o item se ele não estiver na lista, ou remove se já estiver
// (seleção múltipla).
export function alternarItem<T>(lista: T[], item: T): T[] {
  return lista.includes(item)
    ? lista.filter((atual) => atual !== item)
    : [...lista, item];
}

// Junta "R$" e "mil" ao número com espaço não separável, pra a faixa
// quebrar em "R$ 200 a" / "500 mil" e nunca deixar "R$" ou "mil" sozinhos.
export function semQuebraMoeda(texto: string) {
  return texto.replace(/R\$ /g, "R$\u00a0").replace(/ mil/g, "\u00a0mil");
}

// "1 selecionado" / "3 selecionados"
export function contagem(n: number, singular: string, plural: string) {
  return `${n} ${n === 1 ? singular : plural}`;
}

// Tabindex "itinerante" de um grupo de rádio (padrão WAI-ARIA): só um item
// do grupo entra na ordem do Tab — o selecionado, ou o primeiro se nenhum
// estiver selecionado. Os outros são alcançados com as setas.
export function tabIndexRadio(
  selecionado: boolean,
  indice: number,
  algumSelecionado: boolean,
) {
  return selecionado || (!algumSelecionado && indice === 0) ? 0 : -1;
}

const TECLAS_ANTERIOR = ["ArrowLeft", "ArrowUp"];
const TECLAS_PROXIMO = ["ArrowRight", "ArrowDown"];

// Setas / Home / End movem o foco e a seleção entre os [role="radio"] do
// grupo, como num grupo de rádio nativo.
export function navegarRadioPorTeclado(event: KeyboardEvent<HTMLElement>) {
  const { key } = event;
  const tratada = [...TECLAS_ANTERIOR, ...TECLAS_PROXIMO, "Home", "End"];
  if (!tratada.includes(key)) return;

  const radios = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]'),
  ).filter((radio) => radio.getAttribute("aria-disabled") !== "true");
  const atual = radios.indexOf(document.activeElement as HTMLElement);
  if (atual === -1) return;

  event.preventDefault();
  let proximo = atual;
  if (TECLAS_ANTERIOR.includes(key)) proximo = (atual - 1 + radios.length) % radios.length;
  if (TECLAS_PROXIMO.includes(key)) proximo = (atual + 1) % radios.length;
  if (key === "Home") proximo = 0;
  if (key === "End") proximo = radios.length - 1;

  radios[proximo].focus();
  radios[proximo].click();
}
