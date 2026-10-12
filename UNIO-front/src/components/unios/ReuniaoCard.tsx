import { CalendarDays, CalendarPlus, MessageCircle } from "lucide-react";
import type { Contato } from "../../types/contato";
import { linkGoogleAgenda, linkWhatsApp } from "../../utils/contato";
import { BOTAO_LINK } from "./ContatoCard";

export type DestinoReuniao = "agenda" | "whatsapp";

interface ReuniaoCardProps {
  nome: string;
  meuNome: string;
  contato: Contato;
  onAbrir: (destino: DestinoReuniao) => void;
}

// "Marcar reunião": abre um modelo de evento no Google Agenda (a pessoa
// escolhe o horário lá) ou propõe a reunião pelo WhatsApp
export default function ReuniaoCard({ nome, meuNome, contato, onAbrir }: ReuniaoCardProps) {
  const agenda = linkGoogleAgenda(
    `Reunião UNIO: ${meuNome} e ${nome}`,
    `Conversa entre ${meuNome} e ${nome}, que deram match na UNIO. Pauta sugerida: apresentações, tese e negócio, próximos passos.`,
    contato.email,
  );
  const whatsapp = contato.whatsapp
    ? linkWhatsApp(
        contato.whatsapp,
        `Olá, ${nome}! Aqui é ${meuNome} (UNIO). Que tal marcarmos uma reunião para conversar sobre o nosso match? Qual dia e horário ficam bons para você?`,
      )
    : null;

  return (
    <section aria-labelledby="titulo-reuniao" className="flex flex-col rounded-2xl border border-lightgray p-4">
      <h3 id="titulo-reuniao" className="flex items-center gap-2 font-bold text-deepgreen">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage/30" aria-hidden="true">
          <CalendarDays size={16} />
        </span>
        Marcar reunião
      </h3>
      <p className="mt-2 text-sm text-deepgreen/80">Escolha um horário e envie o convite para {nome}.</p>
      <div className="mt-auto space-y-2 pt-4">
        <a
          href={agenda}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onAbrir("agenda")}
          className={`${BOTAO_LINK} bg-deepgreen text-white hover:bg-sage hover:text-deepgreen`}
        >
          <CalendarPlus size={16} aria-hidden="true" />
          Criar convite no Google Agenda
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onAbrir("whatsapp")}
            className={`${BOTAO_LINK} border border-lightgray bg-white text-deepgreen hover:border-sage`}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Combinar pelo WhatsApp
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        )}
      </div>
    </section>
  );
}
