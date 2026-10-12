import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import PageContainer from '../components/ui/PageContainer';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import CheckboxGroup from '../components/ui/CheckboxGroup';
import Button from '../components/ui/Button';
import api, { getApiErrorMessage } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { SEGMENTOS, TIPOS_PERFIL, DISPONIBILIDADES } from '../data/options';

interface Erros {
  nome?: string;
  tipoPerfil?: string;
  disponibilidade?: string;
  ticketMedio?: string;
  ticketMaximo?: string;
}

export default function CadastroInvestidor() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [nome, setNome] = useState('');
  const [tipoPerfil, setTipoPerfil] = useState('');
  const [areaInteresse, setAreaInteresse] = useState<string[]>([]);
  const [ticketMedio, setTicketMedio] = useState('');
  const [ticketMaximo, setTicketMaximo] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [erroApi, setErroApi] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const novosErros: Erros = {};
    if (nome.trim() === '') novosErros.nome = 'Informe o nome.';
    if (tipoPerfil === '') novosErros.tipoPerfil = 'Selecione o tipo de perfil.';
    if (disponibilidade === '')
      novosErros.disponibilidade = 'Selecione a disponibilidade.';
    // O back (InvestorCreateRequest) exige ticket mínimo e máximo positivos
    // pra todos os perfis, inclusive "Mentor" — sem isso o cadastro é
    // recusado e a pessoa não chega ao onboarding.
    if (!(Number(ticketMedio) > 0)) {
      novosErros.ticketMedio = 'Informe um ticket médio positivo.';
    }
    if (!(Number(ticketMaximo) > 0)) {
      novosErros.ticketMaximo = 'Informe um ticket máximo positivo.';
    } else if (Number(ticketMedio) > Number(ticketMaximo)) {
      novosErros.ticketMaximo = 'O ticket máximo não pode ser menor que o ticket médio.';
    }
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setIsLoading(true);
    setErroApi('');
    api.post('/api/profile/investor', {
      segmentosInteresse: areaInteresse,
      estagiosInteresse: [],
      ticketMinimo: Number(ticketMedio),
      ticketMaximo: Number(ticketMaximo || ticketMedio),
      regiaoInteresse: disponibilidade,
      perfilRisco: tipoPerfil,
      nome,
    })
      .then(() => refreshProfile())
      .then(() => navigate('/home-investidor', { state: { cadastroSucesso: true } }))
      .catch((error: unknown) => setErroApi(getApiErrorMessage(error, 'Não foi possível salvar o perfil.')))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white">
      <Header homeTo="/home-investidor" />
      <PageContainer>
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <h1 className="mb-1 text-2xl font-bold text-deepgreen">
            Cadastro de investidor / mentor
          </h1>
          <p className="mb-6 text-deepgreen">
            Preencha seus dados para ser conectado com startups compatíveis.
          </p>
          {erroApi && <p className="mb-4 text-sm text-red-600">{erroApi}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <Input
              id="nome"
              label="Nome"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={erros.nome}
            />

            <Select
              id="tipoPerfil"
              label="Tipo de perfil"
              options={TIPOS_PERFIL}
              value={tipoPerfil}
              onChange={(e) => setTipoPerfil(e.target.value)}
              error={erros.tipoPerfil}
            />

            <CheckboxGroup
              label="Área de interesse"
              options={SEGMENTOS}
              selected={areaInteresse}
              onChange={setAreaInteresse}
            />

            <Input
              id="ticketMedio"
              label="Ticket médio de investimento (R$)"
              type="number"
              min={0}
              step="0.01"
              placeholder="Ex: 50000"
              value={ticketMedio}
              onChange={(e) => setTicketMedio(e.target.value)}
              error={erros.ticketMedio}
            />
            <Input
              id="ticketMaximo"
              label="Ticket máximo de investimento (R$)"
              type="number"
              min={0}
              step="0.01"
              placeholder="Ex: 200000"
              value={ticketMaximo}
              onChange={(e) => setTicketMaximo(e.target.value)}
              error={erros.ticketMaximo}
            />

            <Select
              id="disponibilidade"
              label="Disponibilidade"
              options={DISPONIBILIDADES}
              value={disponibilidade}
              onChange={(e) => setDisponibilidade(e.target.value)}
              error={erros.disponibilidade}
            />

            <Button type="submit" fullWidth={false} disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Cadastrar'}
            </Button>
          </form>
        </div>
      </PageContainer>
    </div>
  );
}
