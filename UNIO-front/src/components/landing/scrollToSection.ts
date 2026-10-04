// Rola suavemente até a seção com esse id. Diferente de um <a href="#id">,
// isso NÃO mexe na URL do navegador — a rota continua exatamente "/",
// sem nenhum "#id" grudado nela.
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
