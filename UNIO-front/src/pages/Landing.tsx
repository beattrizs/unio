import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import AboutSection from "../components/landing/AboutSection";
import StatsSection from "../components/landing/StatsSection";
import ServicesSection from "../components/landing/ServicesSection";

// Página institucional pública, antes do login. É só a soma das seções —
// cada uma cuida do próprio fundo/cor, então aqui é só empilhar na ordem certa.
export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowItWorks />
      <AboutSection />
      <StatsSection />
      <ServicesSection />

      {/* Rodapé simples — é o alvo do link "Contato" do menu */}
      <footer id="contato" className="bg-deepgreen px-4 py-10 text-white/70 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold text-white">UNIO</p>
            <p className="mt-1 text-sm">
              Conectando startups do Porto Digital a quem acredita nelas.
            </p>
          </div>

          <div className="text-sm">
            <p>
              Fale com a gente:{" "}
              <a href="mailto:contato@unio.com.br" className="font-medium text-white hover:underline">
                contato@unio.com.br
              </a>
            </p>
            <p className="mt-1">© 2026 UNIO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
