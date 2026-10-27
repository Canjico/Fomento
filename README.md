# Fomentoria — Fundação local (Bloco A)

**Estado:** fundação validada localmente no Windows; auditoria independente e aceite definitivo pendentes. Sem catálogo, autenticação, CRUD, checkout, migrations ou deploy.

## Pré-requisitos

Pré-requisitos: Node.js >= 22.12, npm 11.12.1 e Docker Engine + Compose. Instalação reproduzida com npm ci e package-lock.json.

## Rodando localmente

```bash
cp .env.example .env
# ajuste DB_PASSWORD apenas para desenvolvimento local
npm ci
npm run env:check
docker compose up -d --wait postgres
npm run db:ping
npm run dev
```

Abra `http://127.0.0.1:3000`. Testes: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npx playwright install chromium`, `npm run test:e2e`. Para conectar ao banco de teste, inicialize o serviço isolado `docker compose --profile test up -d --wait postgres-test` conforme `docs/bloco-a/03-AMBIENTE-LOCAL.md` e rode `npm run db:ping -- --test`.

**Validação local:** instalação, build, lint, TypeScript, 9 testes automatizados e PostgreSQL foram validados no Windows. Evidências em docs/bloco-a/07-VALIDACAO-LOCAL-WINDOWS.md.

## Governança

- Gate 0 delegado: `docs/bloco-a/00-ACEITE-GATE-0.md` e adendo `docs/bloco-0/14-ADENDO-GATE-0-E-R2-01.md`.
- Arquitetura real e limites: `docs/bloco-a/02-ARQUITETURA-REAL.md`.
- Handoff independente: `docs/bloco-a/06-HANDOFF-AUDITORIA.md`.
- O Bloco A aguarda auditoria independente e aceite definitivo. O Bloco B permanece bloqueado.
