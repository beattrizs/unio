import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircle, Phone, PhoneCall } from "lucide-react";
import type { Contato } from "../../types/contato";
import { formatarTelefone, linkEmail, linkTelefone, linkWhatsApp } from "../../utils/contato";
import { FOCO_VISIVEL } from "../onboarding/selecao";

export type CanalContato = "whatsapp" | "email" | "telefone";

interface ContatoCardProps {
  nome: string;
  meuNome: string;
  contato: Contato;
  onAbrir: (canal: CanalContato) => void;
}

export const BOTAO_LINK = `flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${FOCO_VISIVEL}`;

interface OpcaoCanal {
  canal: CanalContato;
  rotulo: string;
  icone: LucideIcon;
  href: string | null;
}

// "Entrar em contato": um botão por canal que a outra parte informou. Os
// links são montados em utils/contato.ts, só com números/e-mails validados.
export default function ContatoCard({ nome, meuNome, contato, onAbrir }: ContatoCardProps) {
  const mensagem = `Olá, ${nome}! Aqui é ${meuNome} (UNIO). Deu match entre a gente na plataforma e queria conversar.`;
  const opcoes: OpcaoCanal[] = [
    {
      canal: "whatsapp",
      rotulo: "WhatsApp",
      icone: MessageCircle,
      href: contato.whatsapp ? linkWhatsApp(contato.whatsapp, mensagem) : null,
    },
    {
      canal: "email",
      rotulo: "E-mail",
      icone: Mail,
      href: contato.email ? linkEmail(contato.email, `Match na UNIO: ${meuNome} e ${nome}`, mensagem) : null,
    },
    {
      canal: "telefone",
      rotulo: contato.telefone ? `Ligar ${formatarTelefone(contato.telefone)}` : "Ligar",
      icone: PhoneCall,
      href: contato.telefone ? linkTelefone(contato.telefone) : null,
    },
  ];
  const disponiveis = opcoes.filter((opcao) => opcao.href);

  return (
    <section aria-labelledby="titulo-contato" className="flex flex-col rounded-2xl border border-lightgray p-4">
      <h3 id="titulo-contato" className="flex items-center gap-2 font-bold text-deepgreen">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage/30" aria-hidden="true">
          <Phone size={16} />
        </span>
        Entrar em contato
      </h3>
      {disponiveis.length > 0 ? (
        <>
          <p className="mt-2 text-sm text-deepgreen/80">Fale diretamente com {nome} pelos canais informados.</p>
          <div className="mt-auto space-y-2 pt-4">
            {disponiveis.map(({ canal, rotulo, icone: Icone, href }, indice) => (
              <a
                key={canal}
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onAbrir(canal)}
                className={`${BOTAO_LINK} ${
                  indice === 0
                    ? "bg-deepgreen text-white hover:bg-sage hover:text-deepgreen"
                    : "border border-lightgray bg-white text-deepgreen hover:border-sage"
                }`}
              >
                <Icone size={16} aria-hidden="true" />
                {rotulo}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-2 text-sm">
          <p className="font-semibold text-deepgreen">{nome} ainda não informou um contato.</p>
          <p className="mt-1 text-deepgreen/75">Avisaremos quando houver um contato cadastrado.</p>
        </div>
      )}
    </section>
  );
}
