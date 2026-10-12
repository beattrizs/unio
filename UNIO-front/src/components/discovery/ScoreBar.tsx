interface ScoreBarProps {
  rotulo: string;
  valor: number;
}

// Barra de um critério da compatibilidade (Segmento 95%, Estágio 90%...).
// O texto já traz o valor, então a barra é só decorativa para leitores de tela.
export default function ScoreBar({ rotulo, valor }: ScoreBarProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-deepgreen/80">{rotulo}</span>
        <span className="font-bold text-deepgreen">{valor}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-lightgray" aria-hidden="true">
        <div className="h-full rounded-full bg-deepgreen" style={{ width: `${valor}%` }} />
      </div>
    </div>
  );
}
