// /meus-unios?unio=<id>: abre "Meus unios" já com o popup desse unio
export function linkMeusUnios(id: string) {
  return `/meus-unios?unio=${encodeURIComponent(id)}`;
}
