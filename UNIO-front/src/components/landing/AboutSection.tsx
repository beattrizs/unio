import { Compass, Eye, Users2 } from "lucide-react";
import { scrollToSection } from "./scrollToSection";

// Seção institucional, em fundo branco — contraste com o Hero/HowItWorks
// escuros logo acima, marcando a "virada de página" pro conteúdo mais formal.
export default function AboutSection() {
  return (
    <section id="sobre" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <span className="inline-block rounded-full bg-lightgray px-4 py-1.5 text-sm font-semibold text-deepgreen">
          Sobre Nós
        </span>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold text-deepgreen sm:text-4xl">
          Conectando o Ecossistema de Inovação do Porto Digital
        </h2>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lightgray text-deepgreen">
                <Compass size={20} />
              </span>
              <h3 className="mt-3 font-semibold text-deepgreen">Nossa Missão</h3>
              <p className="mt-1 text-sm text-deepgreen/70">
                Aproximar startups nordestinas de investidores anjo e mentores
                que acreditam no potencial da região.
              </p>
            </div>

            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lightgray text-deepgreen">
                <Eye size={20} />
              </span>
              <h3 className="mt-3 font-semibold text-deepgreen">Nossa Visão</h3>
              <p className="mt-1 text-sm text-deepgreen/70">
                Ser a porta de entrada de referência entre o Porto Digital e o
                capital que faz startups crescerem.
              </p>
            </div>
          </div>

          {/* Bloco "ilustrativo" no lugar de uma foto de pessoas colaborando */}
          <div className="flex min-h-[260px] items-center justify-center rounded-3xl bg-lightgray">
            <Users2 size={56} className="text-deepgreen/40" />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 rounded-3xl bg-deepgreen p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-lg font-semibold">
            Junte-se a nós para fortalecer o ecossistema de startups do
            Nordeste.
          </p>
          <button
            type="button"
            onClick={() => scrollToSection("como-funciona")}
            className="shrink-0 rounded-full border-0 bg-sage px-6 py-2.5 font-semibold text-deepgreen transition-colors hover:bg-white"
          >
            Saiba Mais
          </button>
        </div>
      </div>
    </section>
  );
}
