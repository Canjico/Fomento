# Fomentoria — Fundação local (Bloco A)

**Estado:** código de fundação preparado, **não auditado nem aprovado**. Sem catálogo, autenticação, CRUD, checkout, migrations ou deploy. Marca Fomentoria, nome técnico do projeto `fomento`.

## Pré-requisitos

Node.js >= 22.12, npm 10+, Docker Engine + Docker Compose v2 (para PostgreSQL local). Instale as dependências com acesso à registry npm; neste ambiente de elaboração elas **não foram instaladas** (rede indisponível). O `package.json` contém versões declaradas, ainda sem lockfile validado.

## Rodando localmente

```bash
cp .env.example .env
# ajuste DB_PASSWORD apenas para desenvolvimento local
npm install
npm run env:check
docker compose up -d --wait postgres
npm run db:ping
npm run dev
```

Abra `http://127.0.0.1:3000`. Testes: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npx playwright install chromium`, `npm run test:e2e`. Para conectar ao banco de teste, inicialize o serviço isolado `docker compose --profile test up -d --wait postgres-test` conforme `docs/bloco-a/03-AMBIENTE-LOCAL.md` e rode `npm run db:ping -- --test`.

**Este roteiro ainda não foi validado ponta a ponta.** Consulte `docs/bloco-a/04-TESTES-E-EVIDENCIAS.md` para resultados efetivos antes de considerar qualquer gate satisfeito.

## Governança

- Gate 0 delegado: `docs/bloco-a/00-ACEITE-GATE-0.md` e adendo `docs/bloco-0/14-ADENDO-GATE-0-E-R2-01.md`.
- Arquitetura real e limites: `docs/bloco-a/02-ARQUITETURA-REAL.md`.
- Handoff independente: `docs/bloco-a/06-HANDOFF-AUDITORIA.md`.
- O autor **não concede** aceite de A e não inicia B.
