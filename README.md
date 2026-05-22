# API REST Node.js — Desafio 02 Rocketseat

API REST construída com Fastify, TypeScript, Knex e SQLite como parte do segundo desafio do curso Node.js da Rocketseat.

## Tecnologias

- **[Fastify](https://fastify.dev/)** — Framework web de alta performance
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[Knex](https://knexjs.org/)** — Query builder e migrations
- **[SQLite](https://www.sqlite.org/)** — Banco de dados (ambiente de desenvolvimento e testes)
- **[Zod](https://zod.dev/)** — Validação de schemas e variáveis de ambiente
- **[@fastify/swagger](https://github.com/fastify/fastify-swagger)** — Geração automática da especificação OpenAPI
- **[@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)** — Interface interativa da documentação (Swagger UI)
- **[Vitest](https://vitest.dev/)** — Testes automatizados
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
DATABASE_URL="./db/app.db"
```

| Variável          | Descrição                                | Valores aceitos              | Padrão        |
|-------------------|------------------------------------------|------------------------------|---------------|
| `NODE_ENV`        | Ambiente de execução                     | `development`, `test`, `production` | `production` |
| `DATABASE_CLIENT` | Driver do banco de dados                 | `sqlite`, `pg`               | —             |
| `DATABASE_URL`    | Caminho ou connection string do banco    | qualquer string              | —             |
| `PORT`            | Porta em que o servidor vai escutar      | número                       | `3333`        |

> Para testes, as variáveis são carregadas automaticamente do arquivo `.env.test`.

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

## Testes

```bash
# Rodar todos os testes
pnpm test

# Rodar em modo watch
pnpm test --watch
```

## Lint

```bash
# Verificar e corrigir problemas automaticamente
pnpm lint
```

## Estrutura do projeto

```
├── src/
│   ├── @types/
│   │   └── knex.d.ts       # Tipagem das tabelas do Knex
│   ├── env/
│   │   └── index.ts        # Validação das variáveis de ambiente com Zod
│   ├── database.ts         # Configuração e instância do Knex
│   └── server.ts           # Entry point do servidor Fastify
├── db/
│   └── migrations/         # Arquivos de migration do banco de dados
├── .env.example            # Template das variáveis de ambiente
├── .env.test               # Variáveis de ambiente para testes
├── knexfile.ts             # Configuração do Knex CLI
├── biome.json              # Configuração do Biome (lint/format)
└── tsconfig.json           # Configuração do TypeScript
```
