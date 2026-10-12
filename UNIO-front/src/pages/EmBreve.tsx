import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import AvisoEstado from "../components/discovery/AvisoEstado";
import CabecalhoPagina from "../components/discovery/CabecalhoPagina";
import { FOCO_VISIVEL } from "../components/onboarding/selecao";

interface EmBreveProps {
  titulo: string;
  texto: string;
  link?: { para: string; rotulo: string };
  // Conteúdo que já existe nessa seção (ex.: contatos no Meu perfil)
  children?: ReactNode;
}

// Placeholder das seções do investidor que ainda não têm tela
export default function EmBreve({ titulo, texto, link, children }: EmBreveProps) {
  return (
    <div>
      <CabecalhoPagina titulo={titulo} />
      <AvisoEstado
        icone={Clock}
        titulo="Em breve"
        texto={texto}
        acao={
          link && (
            <Link
              to={link.para}
              className={`inline-flex min-h-[48px] items-center rounded-2xl border border-lightgray bg-white px-5 text-sm font-semibold text-deepgreen hover:border-sage ${FOCO_VISIVEL}`}
            >
              {link.rotulo}
            </Link>
          )
        }
      />
      {children}
    </div>
  );
}
