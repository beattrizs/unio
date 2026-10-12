import Chip from "../../../components/onboarding/Chip";
import OptionGroup from "../../../components/onboarding/OptionGroup";
import SectionCard from "../../../components/onboarding/SectionCard";
import SelectableCard from "../../../components/onboarding/SelectableCard";
import { ESTAGIO_ICONES } from "../../../components/onboarding/icons";
import { alternarItem } from "../../../components/onboarding/selecao";
import { ESTAGIOS_DETALHADOS, PREFERENCIAS_STARTUP } from "../../../data/options";
import type { PassoInvestidorProps } from "./tipos";

// Passo 2 — estágios preferidos (múltipla, mínimo 1) + preferências opcionais
export default function PassoEstagios({ respostas, atualizar }: PassoInvestidorProps) {
  const { estagiosInteresse, preferenciasStartup } = respostas;

  return (
    <>
      <OptionGroup
        mode="multiple"
        label="Estágios de interesse"
        className="grid gap-3 sm:grid-cols-2"
      >
        {ESTAGIOS_DETALHADOS.map(({ valor, descricao }) => (
          <SelectableCard
            key={valor}
            variant="multiple"
            size="lg"
            icon={ESTAGIO_ICONES[valor]}
            title={valor}
            description={descricao}
            selected={estagiosInteresse.includes(valor)}
            onSelect={() =>
              atualizar({ estagiosInteresse: alternarItem(estagiosInteresse, valor) })
            }
          />
        ))}
      </OptionGroup>

      <SectionCard tituloId="preferencias-titulo" titulo="Prefere startups com…" selo="Opcional">
        <OptionGroup
          mode="multiple"
          labelledBy="preferencias-titulo"
          className="flex flex-wrap gap-2.5"
        >
          {PREFERENCIAS_STARTUP.map((preferencia) => (
            <Chip
              key={preferencia}
              label={preferencia}
              showPlus
              selected={preferenciasStartup.includes(preferencia)}
              onToggle={() =>
                atualizar({
                  preferenciasStartup: alternarItem(preferenciasStartup, preferencia),
                })
              }
            />
          ))}
        </OptionGroup>
      </SectionCard>
    </>
  );
}
