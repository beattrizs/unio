import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { FatiaSegmento } from "../types";

// Escala do verde escuro (deepgreen) ao cinza claro (lightgray), passando
// pelo sage — dá pra distinguir as fatias sem sair da paleta do projeto.
// deepgreen vem primeiro porque é o tom mais forte pra se destacar sozinho
// sobre o fundo branco do card — assim a fatia maior (primeiro item) fica bem visível.
const CORES = ["#00412E", "#2E6B4F", "#5C9670", "#96BF8A", "#C1D8B7", "#E8EAE5"];

interface DonutCardProps {
  title: string;
  dados: FatiaSegmento[];
}

export default function DonutCard({ title, dados }: DonutCardProps) {
  return (
    <div className="rounded-2xl border border-deepgreen/10 bg-white p-5">
      <p className="mb-3 text-sm font-medium text-deepgreen">{title}</p>

      <div className="flex items-center gap-4">
        <div className="h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dados}
                dataKey="quantidade"
                nameKey="segmento"
                innerRadius="60%"
                outerRadius="100%"
                paddingAngle={2}
              >
                {dados.map((fatia, index) => (
                  <Cell key={fatia.segmento} fill={CORES[index % CORES.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda manual — mais simples de estilizar do que o <Legend> do recharts */}
        <ul className="flex-1 space-y-1.5">
          {dados.map((fatia, index) => (
            <li key={fatia.segmento} className="flex items-center gap-2 text-xs text-deepgreen">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: CORES[index % CORES.length] }}
              />
              <span className="flex-1 truncate">{fatia.segmento}</span>
              <span className="font-semibold">{fatia.quantidade}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
