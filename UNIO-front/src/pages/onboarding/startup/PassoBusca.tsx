import { HandCoins, Lightbulb, Network, SearchCheck, type LucideIcon } from "lucide-react";
import OptionGroup from "../../../components/onboarding/OptionGroup";
import SectionCard from "../../../components/onboarding/SectionCard";
import SelectableCard from "../../../components/onboarding/SelectableCard";
import { alternarItem, tabIndexRadio } from "../../../components/onboarding/selecao";
import { FAIXAS_CAPITAL, NECESSIDADES } from "../../../data/options";
import type { Necessidade } from "../../../types";
import type { PassoStartupProps } from "./tipos";

const ICONES: Record<Necessidade, LucideIcon> = {
  Investimento: HandCoins,
  Mentoria: Lightbulb,
  Networking: Network,
  "Validação de mercado": SearchCheck,
};

export default function PassoBusca({ respostas, atualizar }: PassoStartupProps) {
  const investimentoAtivo = respostas.necessidades.includes("Investimento");
  return (
    <>
      <SectionCard tituloId="busca-titulo" titulo="O que a sua startup procura?" subtitulo="Selecione tudo que se aplica.">
        <OptionGroup mode="multiple" labelledBy="busca-titulo" className="grid gap-3 sm:grid-cols-2">
          {NECESSIDADES.map((necessidade) => (
            <SelectableCard
              key={necessidade}
              variant="multiple"
              icon={ICONES[necessidade]}
              title={necessidade}
              selected={respostas.necessidades.includes(necessidade)}
              onSelect={() => {
                const necessidades = alternarItem(respostas.necessidades, necessidade);
                atualizar({
                  necessidades,
                  capitalProcurado: necessidade === "Investimento" && !necessidades.includes("Investimento")
                    ? null
                    : respostas.capitalProcurado,
                });
              }}
            />
          ))}
        </OptionGroup>
      </SectionCard>
      <SectionCard
        tituloId="capital-titulo"
        titulo="Qual a faixa de capital procurado?"
        dica={investimentoAtivo ? "Selecione uma estimativa atual" : "Opcional sem investimento"}
      >
        <OptionGroup mode="single" labelledBy="capital-titulo" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FAIXAS_CAPITAL.map((faixa, indice) => (
            <SelectableCard
              key={faixa}
              variant="single"
              title={faixa}
              selected={respostas.capitalProcurado === faixa}
              tabIndex={tabIndexRadio(respostas.capitalProcurado === faixa, indice, respostas.capitalProcurado !== null)}
              onSelect={() => atualizar({ capitalProcurado: faixa })}
            />
          ))}
        </OptionGroup>
      </SectionCard>
    </>
  );
}
