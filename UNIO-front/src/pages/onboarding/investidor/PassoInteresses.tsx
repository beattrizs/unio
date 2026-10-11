import OptionGroup from "../../../components/onboarding/OptionGroup";
import SelectableCard from "../../../components/onboarding/SelectableCard";
import { SEGMENTO_ICONES } from "../../../components/onboarding/icons";
import { alternarItem } from "../../../components/onboarding/selecao";
import { SEGMENTOS_DETALHADOS } from "../../../data/options";
import type { PassoInvestidorProps } from "./tipos";

// Passo 1 — segmentos de interesse (múltipla escolha, mínimo 3)
export default function PassoInteresses({ respostas, atualizar }: PassoInvestidorProps) {
  const selecionados = respostas.segmentosInteresse;

  return (
    <OptionGroup
      mode="multiple"
      label="Segmentos de interesse"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      {SEGMENTOS_DETALHADOS.map(({ valor, categoria }) => (
        <SelectableCard
          key={valor}
          variant="multiple"
          icon={SEGMENTO_ICONES[valor]}
          eyebrow={categoria}
          title={valor}
          selected={selecionados.includes(valor)}
          onSelect={() =>
            atualizar({ segmentosInteresse: alternarItem(selecionados, valor) })
          }
        />
      ))}
    </OptionGroup>
  );
}
