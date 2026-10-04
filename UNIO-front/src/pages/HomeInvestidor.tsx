import { useLocation } from 'react-router-dom';
import Header from '../components/ui/Header';
import PageContainer from '../components/ui/PageContainer';
import SuccessMessage from '../components/ui/SuccessMessage';

// Página inicial da conta investidor/mentor. Ainda em branco de propósito —
// vai ganhar conteúdo (matches, mensagens, etc.) em uma próxima etapa.
export default function HomeInvestidor() {
  const location = useLocation();
  const cadastroSucesso = (location.state as { cadastroSucesso?: boolean } | null)
    ?.cadastroSucesso;

  return (
    <div className="min-h-screen bg-white">
      <Header homeTo="/home-investidor" />
      <PageContainer>
        {cadastroSucesso && (
          <SuccessMessage message="Cadastro realizado com sucesso! Bem-vindo(a) à UNIO." />
        )}

        <h1 className="text-2xl font-bold text-deepgreen">Área do investidor/mentor</h1>
        <p className="mt-2 text-deepgreen">Em construção.</p>
      </PageContainer>
    </div>
  );
}
