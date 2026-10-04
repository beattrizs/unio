const NUMEROS = [
  { valor: "150+", label: "Startups cadastradas" },
  { valor: "40+", label: "Investidores e mentores ativos" },
  { valor: "92%", label: "Taxa de satisfação" },
  { valor: "300+", label: "Matches realizados" },
];

// Faixa de números, em fundo lightgray pra criar um respiro visual entre
// a seção "Sobre" (branca) e a de "Serviços" (branca também) logo abaixo.
export default function StatsSection() {
  return (
    <section className="bg-lightgray py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-8 lg:grid-cols-4">
        {NUMEROS.map((numero) => (
          <div key={numero.label}>
            <div className="h-1 w-10 rounded-full bg-sage" />
            <p className="mt-3 text-4xl font-bold text-deepgreen">{numero.valor}</p>
            <p className="mt-1 text-sm text-deepgreen/70">{numero.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
