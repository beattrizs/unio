import { useState } from "react";
import { MessageSquare, Search, Target, UserPlus } from "lucide-react";

type Perfil = "startup" | "investidor";

// Um conjunto de 3 passos por perfil — o card da direita troca de conteúdo
// conforme o toggle "Sou Startup" / "Sou Investidor" logo acima dele.
const PASSOS: Record<Perfil, { icon: typeof UserPlus; titulo: string; descricao: string }[]> = {
  startup: [
    {
      icon: UserPlus,
      titulo: "Cadastro de Perfil",
      descricao: "Crie o perfil da sua startup em minutos e mostre seu potencial para investidores.",
    },
    {
      icon: Target,
      titulo: "Matchmaking por Afinidade",
      descricao: "Conectamos você com investidores e mentores por segmento, estágio e área de interesse.",
    },
    {
      icon: MessageSquare,
      titulo: "Conexão Direta",
      descricao: "Troque mensagens e agende reuniões sem sair da plataforma.",
    },
  ],
  investidor: [
    {
      icon: UserPlus,
      titulo: "Cadastro de Perfil de Investidor",
      descricao: "Defina seus interesses de investimento e o ticket médio que costuma aportar.",
    },
    {
      icon: Search,
      titulo: "Descubra Startups Compatíveis",
      descricao: "Receba recomendações de startups por afinidade com o seu perfil.",
    },
    {
      icon: MessageSquare,
      titulo: "Conecte-se Direto",
      descricao: "Converse e agende reuniões com startups direto na plataforma.",
    },
  ],
};

const OPCOES: { perfil: Perfil; label: string }[] = [
  { perfil: "startup", label: "Sou Startup" },
  { perfil: "investidor", label: "Sou Investidor" },
];

// Continua no fundo escuro do Hero (mesmo deepgreen), então os dois cards
// aqui usam "camadas" de branco translúcido em vez de bg-white sólido —
// senão eles ficariam bem mais claros que o resto da seção.
export default function HowItWorks() {
  // Qual dos dois fluxos o card da direita está mostrando agora
  const [perfil, setPerfil] = useState<Perfil>("startup");
  const passos = PASSOS[perfil];

  return (
    <section
      id="como-funciona"
      // Começa na mesma cor em que o gradiente do Hero termina (#1b583f) e
      // volta pro deepgreen sólido já nos primeiros 15% — dá continuidade
      // com o Hero sem emenda, e o resto da seção fica com o deepgreen normal.
      className="bg-gradient-to-b from-[#1b583f] from-0% via-deepgreen via-15% to-deepgreen to-100% pb-24 text-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Toggle: decide qual dos dois fluxos aparece no card da direita */}
        <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {OPCOES.map((opcao) => (
            <button
              key={opcao.perfil}
              type="button"
              onClick={() => setPerfil(opcao.perfil)}
              aria-pressed={perfil === opcao.perfil}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                perfil === opcao.perfil
                  ? "bg-sage text-deepgreen"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {opcao.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card "ilustrativo": sem foto de verdade, um bloco com gradiente + ícone.
              Fica igual pros dois perfis — só o card ao lado troca de conteúdo. */}
          <div className="flex min-h-[320px] flex-col justify-end rounded-3xl bg-gradient-to-br from-sage/30 to-white/5 p-8">
            <UserPlus size={40} className="mb-6 text-sage" />
            <h2 className="text-2xl font-bold">Como Funciona</h2>
            <p className="mt-2 max-w-sm text-white/70">
              Um caminho simples entre criar o seu perfil e sentar à mesa com
              quem completa o outro lado do match.
            </p>
          </div>

          {/* Card escuro com os 3 passos do perfil selecionado. A troca de `key`
              a cada clique no toggle faz o React remontar esse bloco, o que
              reinicia a animação `animate-fade-in` (fade + slide leve). */}
          <div
            key={perfil}
            className="animate-fade-in rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-sage">
              {perfil === "startup" ? "Passo a passo para startups" : "Passo a passo para investidores"}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {passos.map(({ icon: Icon, titulo, descricao }) => (
                <div key={titulo}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-deepgreen">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-3 font-semibold">{titulo}</h3>
                  <p className="mt-1 text-sm text-white/70">{descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
