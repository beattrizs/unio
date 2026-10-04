import { GraduationCap, Handshake, TrendingUp } from "lucide-react";

// Sem fotos de verdade disponíveis: cada card usa um gradiente diferente
// (dentro da própria paleta do projeto) no lugar de uma imagem de fundo,
// com um degradê escuro embaixo pra dar contraste pro ícone e pro título.
const SERVICOS = [
  {
    icon: Handshake,
    titulo: "Conexão com Investidores",
    gradiente: "from-deepgreen to-sage",
  },
  {
    icon: GraduationCap,
    titulo: "Mentoria Especializada",
    gradiente: "from-sage to-deepgreen",
  },
  {
    icon: TrendingUp,
    titulo: "Métricas de Crescimento",
    gradiente: "from-deepgreen via-sage/70 to-deepgreen",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <span className="inline-block rounded-full bg-lightgray px-4 py-1.5 text-sm font-semibold text-deepgreen">
          Como Ajudamos
        </span>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold text-deepgreen sm:text-4xl">
          Ferramentas Para Impulsionar Sua Startup
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICOS.map(({ icon: Icon, titulo, gradiente }) => (
            <div
              key={titulo}
              className={`relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-6 ${gradiente}`}
            >
              {/* Degradê escuro só na base do card, pra legenda não brigar com o fundo */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                <Icon size={20} />
              </span>
              <h3 className="relative mt-3 text-lg font-semibold text-white">{titulo}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
