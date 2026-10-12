# Contrato de API — Onboarding de primeiro acesso

**Status:** Ativo
**Data:** 2026-10-11
**Escopo:** adiciona `GET` e `PUT /api/profile/onboarding`. Não altera nenhum endpoint
de `contrato-v2.md` nem de `/api/auth/**`, `/api/profile/**` (demais rotas), `/api/admin/**`.

---

## Visão geral

Guarda o status e as respostas do onboarding de primeiro acesso dos perfis STARTUP e
INVESTOR. Tabela `user_onboarding` (migration `V10__create_user_onboarding.sql`), uma
linha por usuário, criada no primeiro `PUT`.

- O usuário só lê e altera o **próprio** onboarding: o id vem do JWT, nunca da URL ou do corpo.
- `respostas` é um **JSON livre** cujo formato pertence ao front. O back não valida o
  conteúdo; só guarda e devolve. Limite: 20 KB serializado.
- Os dados serão consumidos pelo motor de matchmaking/IA. Renomear campos de `respostas`
  exige ajustar esse consumidor.
- Não depende de o perfil startup/investor já existir.

| Status       | Significado                                   |
|--------------|-----------------------------------------------|
| `PENDENTE`   | Ainda não concluído nem pulado (padrão)       |
| `CONCLUIDO`  | Usuário terminou os 4 passos                  |
| `PULADO`     | Usuário optou por pular                       |

**Autenticação:** `Authorization: Bearer <token>` (token de `POST /api/auth/login`).
**Papéis:** `STARTUP` e `INVESTOR`. `ADMIN` recebe 403.

---

## GET /api/profile/onboarding

Devolve o onboarding do usuário logado. Sem registro salvo, devolve `PENDENTE`,
`respostas` vazias e `atualizadoEm: null` (sem gravar nada).

**200 OK** — sem registro:
```json
{ "status": "PENDENTE", "respostas": {}, "atualizadoEm": null }
```

**200 OK** — com registro:
```json
{
  "status": "CONCLUIDO",
  "respostas": {
    "segmentosInteresse": ["Fintech", "Saúde"],
    "estagiosInteresse": ["MVP", "Tração"],
    "ticketMedio": "R$ 50 a 200 mil",
    "apenasMentor": false,
    "disponibilidade": "Média",
    "consentimentoLgpd": true
  },
  "atualizadoEm": "2026-10-11T17:00:00.123456Z"
}
```

---

## PUT /api/profile/onboarding

Upsert do onboarding do usuário logado. Os dois campos são opcionais:

| Campo       | Tipo                                   | Regra                                                         |
|-------------|----------------------------------------|---------------------------------------------------------------|
| `status`    | `PENDENTE` \| `CONCLUIDO` \| `PULADO`  | Ausente = mantém o status atual                               |
| `respostas` | objeto JSON                            | Ausente = mantém as respostas; presente = **substitui** tudo  |

`atualizadoEm` é sempre atualizado. Resposta no mesmo formato do `GET`.

| Ação do front               | Corpo                                              |
|-----------------------------|----------------------------------------------------|
| Salvar progresso (autosave) | `{ "respostas": { ... } }`                         |
| Concluir                    | `{ "status": "CONCLUIDO", "respostas": { ... } }`  |
| Pular                       | `{ "status": "PULADO" }`                           |

**Request** (concluir, STARTUP):
```json
{
  "status": "CONCLUIDO",
  "respostas": {
    "segmento": "Fintech",
    "estagio": "MVP",
    "necessidades": ["Capital", "Mentoria"],
    "capitalProcurado": "R$ 200 a 500 mil",
    "localizacao": "São Paulo/SP",
    "tracao": ["Clientes pagantes"],
    "tamanhoEquipe": "2 a 5",
    "modeloNegocio": "B2B",
    "mercadoAlvo": "PMEs",
    "pitch": "Plataforma de crédito para PMEs...",
    "consentimentoLgpd": true
  }
}
```

**200 OK**:
```json
{
  "status": "CONCLUIDO",
  "respostas": { "segmento": "Fintech", "...": "..." },
  "atualizadoEm": "2026-10-11T17:00:00.123456Z"
}
```

---

## Códigos de resposta

| Código | Quando                                                                  |
|--------|-------------------------------------------------------------------------|
| 200    | Sucesso (`GET` e `PUT`)                                                 |
| 400    | `status` fora do enum, JSON malformado ou `respostas` acima de 20 KB    |
| 401    | Token inválido/expirado (ver observação abaixo)                         |
| 403    | Usuário `ADMIN`; também requisição **sem** token (ver observação)       |

**Observação sobre 401 × 403:** o `SecurityConfig` atual não define um
`AuthenticationEntryPoint`, então o Spring Security responde **403** a requisições sem
`Authorization`, como já acontece em todas as rotas autenticadas do projeto. O front deve
tratar 401 e 403 sem token como "sessão ausente".

Corpo de erro: formato padrão do Spring Boot (`/error`), por exemplo:
```json
{ "timestamp": "2026-10-11T17:00:00.000+00:00", "status": 400, "error": "Bad Request", "path": "/api/profile/onboarding" }
```
