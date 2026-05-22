# API REST Node.js — Desafio 02 Rocketseat

API REST construída com Fastify, TypeScript, Knex e SQLite como parte do segundo desafio do curso Node.js da Rocketseat.

## Tecnologias

- **[Fastify](https://fastify.dev/)** — Framework web de alta performance
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[Knex](https://knexjs.org/)** — Query builder e migrations
- **[SQLite](https://www.sqlite.org/)** — Banco de dados em desenvolvimento
- **[Zod](https://zod.dev/)** — Validação de schemas e variáveis de ambiente
- **[@fastify/swagger](https://github.com/fastify/fastify-swagger)** — Geração automática da especificação OpenAPI
- **[@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)** — Interface interativa da documentação (Swagger UI)
- **[pnpm](https://pnpm.io/)** — Gerenciador de pacotes

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/installation) >= 10

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd 02-challenge-api-rest-nodejs
pnpm install
```

## Configuração das variáveis de ambiente

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp .env.example .env
```

Edite o `.env` com os valores desejados:

```env
NODE_ENV="development"
DATABASE_CLIENT="sqlite"
DATABASE_URL="./src/database/app.db"
```

| Variável          | Descrição                                | Valores aceitos              | Padrão        |
|-------------------|------------------------------------------|------------------------------|---------------|
| `NODE_ENV`        | Ambiente de execução                     | `development`, `production` | `production` |
| `DATABASE_CLIENT` | Driver do banco de dados                 | `sqlite`, `pg`               | —             |
| `DATABASE_URL`    | Caminho ou connection string do banco    | qualquer string              | —             |
| `PORT`            | Porta em que o servidor vai escutar      | número                       | `3333`        |

## Migrations

Execute as migrations para criar as tabelas no banco de dados:

```bash
# Executar todas as migrations pendentes
pnpm knex migrate:latest

# Criar uma nova migration
pnpm knex migrate:make nome_da_migration

# Desfazer a última migration
pnpm knex migrate:rollback
```

## Rodando o projeto

```bash
# Modo desenvolvimento (hot reload)
pnpm dev

# Build de produção
pnpm build

# Rodar o build
node build/server.js
```

O servidor estará disponível em `http://localhost:3333`.

A documentação interativa da API (Swagger UI) estará acessível em `http://localhost:3333/docs`.

## Lint

```bash
# Verificar e corrigir problemas automaticamente
pnpm lint
```

## Estrutura do projeto

```
├── src/
│   ├── @types/
│   │   └── knex.d.ts                         # Tipagem das tabelas do Knex
│   ├── config/
│   │   └── env.ts                            # Validação das variáveis de ambiente com Zod
│   ├── controllers/
│   │   └── users.controller.ts               # Handlers HTTP dos usuários
│   ├── database/
│   │   └── migrations/
│   │       └── 20260424030018_create_users.ts # Migration da tabela users
│   ├── middlewares/
│   │   └── ensure-session.middleware.ts       # Validação do cookie de sessão
│   ├── routes/
│   │   └── users.ts                          # Registro de rotas e schemas Swagger
│   ├── schemas/
│   │   ├── response.schema.ts                # Schemas de resposta reutilizáveis
│   │   └── user.schema.ts                    # Schema de criação de usuário
│   ├── services/
│   │   └── users.service.ts                  # Lógica de negócio dos usuários
│   ├── utils/
│   │   └── index.ts                          # Utilitários (normalização de CPF)
│   ├── app.ts                                # Configuração do Fastify
│   ├── database.ts                           # Configuração e instância do Knex
│   └── server.ts                             # Entry point do servidor
├── .env.example                              # Template das variáveis de ambiente
├── knexfile.ts                               # Configuração do Knex CLI
└── tsconfig.json                             # Configuração do TypeScript
```
