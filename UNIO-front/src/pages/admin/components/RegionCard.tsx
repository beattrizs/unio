import type { RegiaoCadastro } from "../types";

interface RegionCardProps {
  title: string;
  dados: RegiaoCadastro[];
}

// Sem mapa de verdade: cada cidade vira uma barra horizontal, com o
// tamanho proporcional ao maior valor da lista.
export default function RegionCard({ title, dados }: RegionCardProps) {
  const maior = Math.max(...dados.map((item) => item.quantidade));

  return (
    <div className="rounded-2xl border border-deepgreen/10 bg-white p-5">
      <p className="mb-3 text-sm font-medium text-deepgreen">{title}</p>

      <ul className="space-y-2.5">
        {dados.map((item) => (
          <li key={item.local}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-deepgreen">{item.local}</span>
              <span className="text-deepgreen">{item.quantidade}</span>
            </div>
            <div className="h-2 rounded-full bg-lightgray">
              {/* deepgreen pro preenchido: sage/lightgray sumiriam sobre o track */}
              <div
                className="h-2 rounded-full bg-deepgreen"
                style={{ width: `${(item.quantidade / maior) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
