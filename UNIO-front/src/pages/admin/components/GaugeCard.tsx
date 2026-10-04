import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface GaugeCardProps {
  title: string;
  percentual: number;
  legenda: string;
}

// Gauge (velocímetro) feito com um RadialBarChart de uma barra só. O
// PolarAngleAxis escondido é o que define a escala 0–100 do arco — sem
// ele, o recharts usaria o próprio valor como "100%" e o arco pareceria
// sempre cheio, não importa o número.
export default function GaugeCard({ title, percentual, legenda }: GaugeCardProps) {
  const dados = [{ nome: title, valor: percentual }];

  return (
    <div className="rounded-2xl border border-deepgreen/10 bg-white p-5">
      <p className="mb-2 text-sm font-medium text-deepgreen">{title}</p>

      <div className="relative mx-auto h-40 w-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={dados}
            innerRadius="72%"
            outerRadius="100%"
            barSize={14}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            {/* deepgreen no arco preenchido, lightgray no track (fundo) — dá
                pra distinguir o arco mesmo sobre o card branco */}
            <RadialBar dataKey="valor" cornerRadius={8} fill="#00412E" background={{ fill: "#E8EAE5" }} />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Número centralizado por cima do gráfico */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-deepgreen">{percentual}%</span>
          <span className="text-xs text-deepgreen">{legenda}</span>
        </div>
      </div>
    </div>
  );
}
