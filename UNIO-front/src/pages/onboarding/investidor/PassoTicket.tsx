import { Clock } from "lucide-react";
import Chip from "../../../components/onboarding/Chip";
import OptionGroup from "../../../components/onboarding/OptionGroup";
import SectionCard from "../../../components/onboarding/SectionCard";
import SelectableCard from "../../../components/onboarding/SelectableCard";
import ToggleSwitch from "../../../components/onboarding/ToggleSwitch";
import { FORMA_INTERACAO_ICONES } from "../../../components/onboarding/icons";
import { alternarItem, semQuebraMoeda, tabIndexRadio } from "../../../components/onboarding/selecao";
import {
  DISPONIBILIDADES_DETALHADAS,
  FAIXA_CAPITAL_MAIS_COMUM,
  FAIXAS_CAPITAL,
  FORMAS_INTERACAO,
} from "../../../data/options";
import type { PassoInvestidorProps } from "./tipos";

// Passo 3 — ticket (único, opcional pra quem é só mentor), disponibilidade
// (única) e formas de interação (opcional)
export default function PassoTicket({ respostas, atualizar }: PassoInvestidorProps) {
  const { ticketMedio, apenasMentor, disponibilidade, formasInteracao } = respostas;

  return (
    <>
      <SectionCard
        tituloId="ticket-titulo"
        titulo="Ticket médio por investimento"
        dica={apenasMentor ? "Opcional para quem atua só como mentor" : "Selecione uma opção"}
      >
        <OptionGroup
          mode="single"
          labelledBy="ticket-titulo"
          className="grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {FAIXAS_CAPITAL.map((faixa, indice) => (
            <SelectableCard
              key={faixa}
              variant="single"
              eyebrow={faixa === FAIXA_CAPITAL_MAIS_COMUM ? "Mais comum" : `Faixa ${indice + 1}`}
              title={semQuebraMoeda(faixa)}
              selected={ticketMedio === faixa}
              tabIndex={tabIndexRadio(ticketMedio === faixa, indice, ticketMedio !== null)}
              onSelect={() => atualizar({ ticketMedio: faixa })}
            />
          ))}
        </OptionGroup>

        <div className="mt-6 border-t border-lightgray pt-5">
          <ToggleSwitch
            id="apenas-mentor"
            label="Atuo apenas como mentor (sem investimento financeiro)"
            description="Priorizaremos startups que buscam conselho executivo e conexão de rede."
            checked={apenasMentor}
            onChange={(valor) => atualizar({ apenasMentor: valor })}
          />
        </div>
      </SectionCard>

      <SectionCard
        tituloId="disponibilidade-titulo"
        titulo="Disponibilidade para mentoria"
        dica="Selecione uma intensidade"
      >
        <OptionGroup
          mode="single"
          labelledBy="disponibilidade-titulo"
          className="grid gap-3 sm:grid-cols-3"
        >
          {DISPONIBILIDADES_DETALHADAS.map(({ valor, descricao }, indice) => (
            <SelectableCard
              key={valor}
              variant="single"
              icon={Clock}
              title={valor}
              description={descricao}
              selected={disponibilidade === valor}
              tabIndex={tabIndexRadio(disponibilidade === valor, indice, disponibilidade !== null)}
              onSelect={() => atualizar({ disponibilidade: valor })}
            />
          ))}
        </OptionGroup>
      </SectionCard>

      <SectionCard
        tituloId="interacao-titulo"
        titulo="Como prefere interagir?"
        subtitulo="Escolha os formatos mais confortáveis para seu dia a dia."
        selo="Opcional"
      >
        <OptionGroup
          mode="multiple"
          labelledBy="interacao-titulo"
          className="flex flex-wrap gap-2.5"
        >
          {FORMAS_INTERACAO.map((forma) => (
            <Chip
              key={forma}
              label={forma}
              icon={FORMA_INTERACAO_ICONES[forma]}
              selected={formasInteracao.includes(forma)}
              onToggle={() =>
                atualizar({ formasInteracao: alternarItem(formasInteracao, forma) })
              }
            />
          ))}
        </OptionGroup>
      </SectionCard>
    </>
  );
}
