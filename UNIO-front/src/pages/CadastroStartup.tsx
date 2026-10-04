import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import PageContainer from '../components/ui/PageContainer';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import CheckboxGroup from '../components/ui/CheckboxGroup';
import Button from '../components/ui/Button';
import api, { getApiErrorMessage } from '../services/api';
import { SEGMENTOS, ESTAGIOS, NECESSIDADES } from '../data/options';

interface Erros {
  nome?: string;
  segmento?: string;
  estagio?: string;
  localizacao?: string;
  modeloNegocio?: string;
  mercadoAlvo?: string;
  capitalProcurado?: string;
}

export default function CadastroStartup() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [segmento, setSegmento] = useState('');
  const [estagio, setEstagio] = useState('');
  const [necessidades, setNecessidades] = useState<string[]>([]);
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [modeloNegocio, setModeloNegocio] = useState('');
  const [mercadoAlvo, setMercadoAlvo] = useState('');
  const [capitalProcurado, setCapitalProcurado] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [erroApi, setErroApi] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // RF01: nome, segmento e estágio são obrigatórios
    const novosErros: Erros = {};
    if (nome.trim() === '') novosErros.nome = 'Informe o nome da startup.';
    if (segmento === '') novosErros.segmento = 'Selecione um segmento.';
    if (estagio === '') novosErros.estagio = 'Selecione o estágio.';
    if (localizacao.trim() === '') novosErros.localizacao = 'Informe a localização.';
    if (modeloNegocio.trim() === '') novosErros.modeloNegocio = 'Informe o modelo de negócio.';
    if (mercadoAlvo.trim() === '') novosErros.mercadoAlvo = 'Informe o mercado alvo.';
    if (!capitalProcurado || Number(capitalProcurado) <= 0) novosErros.capitalProcurado = 'Informe um capital positivo.';
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setIsLoading(true);
    setErroApi('');
    api.post('/api/profile/startup', {
      segmento,
      estagio,
      localizacao,
      modeloNegocio,
      mercadoAlvo,
      capitalProcurado: Number(capitalProcurado),
      pitchCanvas: descricao,
      necessidades,
      nome,
    })
      .then(() => navigate('/home-startup', { state: { cadastroSucesso: true } }))
      .catch((error: unknown) => setErroApi(getApiErrorMessage(error, 'Não foi possível salvar o perfil.')))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white">
      <Header homeTo="/home-startup" />
      <PageContainer>
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <h1 className="mb-1 text-2xl font-bold text-deepgreen">Cadastro de startup</h1>
          <p className="mb-6 text-deepgreen">
            Preencha os dados da sua startup para aparecer para investidores e mentores.
          </p>
          {erroApi && <p className="mb-4 text-sm text-red-600">{erroApi}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <Input
              id="nome"
              label="Nome da startup"
              placeholder="Ex: EcoTech Solutions"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={erros.nome}
            />

            <Select
              id="segmento"
              label="Segmento"
              options={SEGMENTOS}
              value={segmento}
              onChange={(e) => setSegmento(e.target.value)}
              error={erros.segmento}
            />
            <Input id="localizacao" label="Localização" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} error={erros.localizacao} />
            <Input id="modeloNegocio" label="Modelo de negócio" value={modeloNegocio} onChange={(e) => setModeloNegocio(e.target.value)} error={erros.modeloNegocio} />
            <Input id="mercadoAlvo" label="Mercado alvo" value={mercadoAlvo} onChange={(e) => setMercadoAlvo(e.target.value)} error={erros.mercadoAlvo} />
            <Input id="capitalProcurado" label="Capital procurado (R$)" type="number" min={1} value={capitalProcurado} onChange={(e) => setCapitalProcurado(e.target.value)} error={erros.capitalProcurado} />

            <Select
              id="estagio"
              label="Estágio"
              options={ESTAGIOS}
              value={estagio}
              onChange={(e) => setEstagio(e.target.value)}
              error={erros.estagio}
            />

            <CheckboxGroup
              label="Necessidades"
              options={NECESSIDADES}
              selected={necessidades}
              onChange={setNecessidades}
            />

            <Textarea
              id="descricao"
              label="Breve descrição da startup"
              placeholder="Conte em poucas linhas o que a startup faz..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
