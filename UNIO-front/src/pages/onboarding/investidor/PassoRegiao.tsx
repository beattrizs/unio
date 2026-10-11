import { MapPin, SlidersHorizontal } from "lucide-react";
import Chip from "../../../components/onboarding/Chip";
import ConsentCheckbox from "../../../components/onboarding/ConsentCheckbox";
import OptionGroup from "../../../components/onboarding/OptionGroup";
import SectionCard from "../../../components/onboarding/SectionCard";
import SummaryList from "../../../components/onboarding/SummaryList";
import { REGIAO_ICONES } from "../../../components/onboarding/icons";
import { alternarItem } from "../../../components/onboarding/selecao";
import { DISPONIBILIDADES_DETALHADAS, REGIOES_INTERESSE } from "../../../data/options";
import type { PassoInvestidorProps } from "./tipos";

interface PassoRegiaoProps extends PassoInvestidorProps {
  onEditar: (passo: number) => void;
}

// Passo 4 — regiões (múltipla, mínimo 1), resumo dos passos 1 a 3 e
// consentimento LGPD (obrigatório)
export default function PassoRegiao({ respostas, atualizar, onEditar }: PassoRegiaoProps) {
  const { regioesInteresse } = respostas;

  return (
    <>
      <SectionCard
        tituloId="regiao-titulo"
        titulo="Região de interesse"
        icone={MapPin}
        dica="Seleção múltipla"
      >
        <OptionGroup
          mode="multiple"
          labelledBy="regiao-titulo"
          className="flex flex-wrap gap-2.5"
        >
          {REGIOES_INTERESSE.map((regiao) => (
            <Chip
              key={regiao}
              label={regiao}
              icon={REGIAO_ICONES[regiao]}
              selected={regioesInteresse.includes(regiao)}
              onToggle={() =>
                atualizar({ regioesInteresse: alternarItem(regioesInteresse, regiao) })
              }
            />
          ))}
        </OptionGroup>
      </SectionCard>

      <SectionCard
        tituloId="resumo-titulo"
        titulo="Resumo do seu perfil"
        subtitulo="Preferências coletadas nos passos anteriores"
        icone={SlidersHorizontal}
      >
        <SummaryList
          rows={[
            {
              label: "Segmentos",
              valores: respostas.segmentosInteresse,
              onEdit: () => onEditar(1),
            },
            {
              label: "Estágios",
              valores: respostas.estagiosInteresse,
              onEdit: () => onEditar(2),
            },
            {
              label: "Ticket",
              valores: resumoTicket(respostas),
              onEdit: () => onEditar(3),
            },
            {
              label: "Disponibilidade",
              valores: resumoDisponibilidade(respostas),
              onEdit: () => onEditar(3),
            },
          ]}
        />
      </SectionCard>

      <ConsentCheckbox
        id="consentimento-investidor"
        assunto="minhas preferências"
        checked={respostas.consentimentoLgpd}
        onChange={(valor) => atualizar({ consentimentoLgpd: valor })}
      />
    </>
  );
}

function resumoTicket({ ticketMedio, apenasMentor }: PassoInvestidorProps["respostas"]) {
  const valores: string[] = [];
  if (ticketMedio) valores.push(ticketMedio);
  if (apenasMentor) valores.push("Atua apenas como mentor");
  return valores;
}

// "Média (2 a 5h/mês)"
function resumoDisponibilidade({ disponibilidade }: PassoInvestidorProps["respostas"]) {
  const opcao = DISPONIBILIDADES_DETALHADAS.find((item) => item.valor === disponibilidade);
  if (!opcao) return [];
  const horas = opcao.descricao?.replace(" por mês", "/mês");
  return [`${opcao.valor} (${horas})`];
}
