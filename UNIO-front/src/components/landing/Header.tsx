import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "./scrollToSection";

// Links do menu: todos apontam para uma seção da própria landing page, pelo
// "id" usado em cada componente de seção (ver Landing.tsx). O clique rola
// até lá via JS (scrollToSection) — não são links <a href="#id"> de verdade,
// então a URL continua "/", sem nenhum "#id" grudando nela.
const LINKS = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "contato", label: "Contato" },
];

// Barra de navegação fixa no topo da landing page. `fixed` faz ela ficar
// grudada na tela mesmo rolando — por isso a Landing precisa reservar um
// espaço vazio do mesmo tamanho dela lá em cima (ver Landing.tsx).
export default function Header() {
  // Controla se o menu de links está aberto no mobile (a barra de cima só
  // mostra a logo + botão de entrar + esse ícone de hambúrguer/X)
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-deepgreen text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="border-0 bg-transparent p-0 text-xl font-bold tracking-wide"
        >
          UNIO
        </button>

        {/* Menu central: só aparece a partir de md (telas médias/grandes) */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="border-0 bg-transparent p-0 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Essa aqui é uma rota de verdade (não uma seção da landing),
              então continua sendo um <Link> normal do React Router */}
          <Link
            to="/login"
            className="rounded-full border border-white bg-white px-5 py-2 text-sm font-semibold text-deepgreen transition-colors hover:bg-sage hover:border-sage"
          >
            Login / Cadastro
          </Link>

          {/* Hambúrguer: só aparece no mobile, abre/fecha o menu de links */}
          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            className="text-white md:hidden"
          >
            {menuAberto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Painel do menu mobile: os mesmos links de cima, empilhados */}
      {menuAberto && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 md:hidden">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                // Fecha o painel mobile primeiro; o scroll espera um instante
                // pra calcular a posição já sem esse painel ocupando espaço
                // (senão a rolagem erra o alvo por causa da mudança de altura)
                setMenuAberto(false);
                setTimeout(() => scrollToSection(link.id), 0);
              }}
              className="rounded-lg border-0 bg-transparent px-2 py-2.5 text-left text-sm font-medium text-white/80 transition-colors hover:bg-sage/20 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
