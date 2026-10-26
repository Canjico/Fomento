# Manual de reprodução local

## Pré-requisitos

Node.js >=22.12.0 (Next >=20.9; Vitest 5 >=22.12); npm 10; Docker Engine + Compose v2; acesso à registry npm para instalar dependências; Chromium de Playwright (baixado apenas em host autorizado, no setup técnico).

## Passos em Windows (PowerShell)

```powershell
Copy-Item .env.example .env
# edite .env e substitua DB_PASSWORD por senha local, não versionável
npm install
npm run env:check
docker compose up -d --wait postgres
npm run db:ping
npm run dev
```

Navegar para http://127.0.0.1:3000. Para interromper: `Ctrl+C` e `docker compose down`. Para apagar volume local deliberadamente: `docker compose down -v` **destrói os dados de desenvolvimento**, não executar por padrão.

## Verificações adicionais

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
docker compose --profile test up -d --wait postgres-test
npm run db:ping -- --test
docker compose --profile test down
```

## Serviços

| Serviço | Perfil | Host bind | Persistência | Healthcheck |
|---|---|---|---|---|
| `postgres` | padrão | `127.0.0.1:${DB_PORT:-54329}` | `fomento_pgdata_local` | `pg_isready` |
| `postgres-test` | `test` | `127.0.0.1:${DB_TEST_PORT:-54330}` | `tmpfs` efêmero | `pg_isready` |

O `.env.example` usa **valores de demonstração**, não credenciais reais. O teste `db:ping` faz apenas `SELECT 1`. Nenhuma tabela foi criada. A imagem PostgreSQL 17-alpine deve ser fixada por digest após recuperação no host auditor; publicação em produção não faz parte do plano.

## Resolução de falhas

- `docker: command not found`: instalar Docker Desktop/Engine + Compose em host local.
- `EAI_AGAIN registry.npmjs.org`: verificar DNS/proxy/rede e executar `npm install`; não alegar sucesso sem lockfile e dependências instaladas.
- `ECONNREFUSED`: confirmar `docker compose ps`, `.env`, portas, healthcheck e bind localhost.
- Browser ausente no E2E: instalar Chromium Playwright no host onde se executarão os testes.
- `.env` ausente: copiar `.env.example`; não colocar segredos em Git.

## Segurança de operadores

Evitar logs que imprimam credenciais. Não reutilizar credenciais local em ambientes públicos. Usar dados fictícios no banco de testes. Não conectar provedores externos.
