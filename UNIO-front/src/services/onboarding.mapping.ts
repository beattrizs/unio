/*
 * MAPEAMENTO ONBOARDING (front) x BACK — para levar ao squad do back
 * ===================================================================
 * Hoje o onboarding NÃO chama a API: tudo fica no localStorage, via
 * services/onboardingService.ts. Esta lista compara, pergunta por pergunta,
 * o campo usado no front com o que existe no back (unio/, consultado só
 * por leitura em profile/dto/*CreateRequest.java, profile/entity/*.java e
 * ProfileService.java). Nada foi alterado no back.
 *
 * Legenda: [EXISTE] = campo equivalente já existe | [PARECIDO] = existe,
 * mas com tipo/formato diferente | [NÃO EXISTE] = precisa ser criado.
 *
 * ---------------------------------------------------------------------
 * INVESTIDOR / MENTOR  (front: types/onboarding.ts > RespostasInvestidor;
 *                       back: InvestorCreateRequest / entity Investor)
 * ---------------------------------------------------------------------
 * Passo 1 · Segmentos de interesse
 *   segmentosInteresse: string[]       -> segmentosInteresse: List<String>   [EXISTE]
 *
 * Passo 2 · Estágios das startups
 *   estagiosInteresse: string[]        -> estagiosInteresse: List<String>    [EXISTE]
 *   preferenciasStartup: string[]      -> —                                  [NÃO EXISTE]
 *     ("Time fundador completo", "Primeiros clientes pagantes", ...)
 *
 * Passo 3 · Ticket e disponibilidade
 *   ticketMedio: faixa em texto        -> ticketMinimo + ticketMaximo        [PARECIDO]
 *     (ex.: "R$ 50 a 200 mil")            BigDecimal, ambos @NotNull @Positive.
 *                                         Converter faixa -> min/max na integração;
 *                                         "Acima de R$ 500 mil" não tem máximo.
 *   apenasMentor: boolean              -> —                                  [NÃO EXISTE]
 *     Conflita com ticketMinimo/Maximo obrigatórios: mentor sem ticket hoje
 *     não passaria na validação do back. (O cadastro atual, CadastroInvestidor,
 *     manda o tipo de perfil dentro de perfilRisco como paliativo.)
 *   disponibilidade: "Baixa"|"Média"|"Alta" -> —                             [NÃO EXISTE]
 *     (O cadastro atual manda a disponibilidade dentro de regiaoInteresse
 *     como paliativo.)
 *   formasInteracao: string[]          -> —                                  [NÃO EXISTE]
 *
 * Passo 4 · Região
 *   regioesInteresse: string[]         -> regiaoInteresse: String            [PARECIDO]
 *     No front é múltipla escolha; no back é uma string só.
 *   consentimentoLgpd: boolean         -> —                                  [NÃO EXISTE]
 *     Sugestão: guardar data/hora e versão da política aceita.
 *
 * ---------------------------------------------------------------------
 * STATUS DO ONBOARDING (os dois perfis)
 * ---------------------------------------------------------------------
 *   "concluido" | "pulado" (+ data)    -> —                                  [NÃO EXISTE]
 *     Hoje: localStorage, chave unio_onboarding_<email>. Sugestão: campo no
 *     User (ex.: onboardingStatus) devolvido pelo GET /api/profile/me.
 *
 * ---------------------------------------------------------------------
 * STARTUP  (front: types/onboarding.ts > RespostasStartup;
 *            back: StartupCreateRequest / entity Startup)
 * ---------------------------------------------------------------------
 * Passo 1 · Segmento e estágio
 *   segmento: string              -> segmento: String                    [EXISTE]
 *   estagio: string               -> estagio: String                     [EXISTE]
 *
 * Passo 2 · O que busca
 *   necessidades: string[]        -> —                                   [NÃO EXISTE]
 *   capitalProcurado: faixa       -> capitalProcurado: BigDecimal        [PARECIDO]
 *     Converter a faixa em valor numérico quando houver integração.
 *
 * Passo 3 · Localização e tração
 *   localizacao: string           -> localizacao: String                 [EXISTE]
 *   tracao: string[]              -> —                                   [NÃO EXISTE]
 *   tamanhoEquipe: string         -> —                                   [NÃO EXISTE]
 *
 * Passo 4 · Modelo de negócio
 *   modeloNegocio: string         -> modeloNegocio: String               [EXISTE]
 *   mercadoAlvo: string           -> mercadoAlvo: String                 [EXISTE]
 *   pitch: string                -> pitchCanvas: String                  [PARECIDO]
 *   consentimentoLgpd: boolean   -> —                                   [NÃO EXISTE]
 */

export {};
