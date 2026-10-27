# Implementação Bloco A — escopo efetivo

## Escopo autorizado

- Inicialização local de um repositório Git, branch `feat/bloco-a-fundacao-local`.
- Estrutura Next.js App Router (`src/app`) com tela técnica estática e aviso de funções indisponíveis.
- TypeScript strict; Tailwind CSS apenas import inicial, sem design system; ESLint, Vitest, Playwright declarados.
- Compose com PostgreSQL local persistente e PostgreSQL de teste isolado, sem migrations/tabelas de domínio.
- Validação de `.env` e utilitário `SELECT 1` quando houver infraestrutura instalada.
- Correção `EDT-08` na cópia de trabalho e registro do gate delegado.
- Documentação de arquitetura, ambiente, testes, riscos e auditoria.

## Arquivos da execução (fora da documentação herdada)

`package.json`, `.npmrc`, `.gitignore`, `.env.example`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `compose.yaml`, `README.md`; `src/app/`, `src/shared/config/`, `src/modules/README.md`, `src/infrastructure/README.md`; `scripts/`, `tests/node`, `tests/unit`, `tests/e2e`; `docs/bloco-a/`, adendo 14; `artifacts/sources/`.

## Fronteiras respeitadas

**Não foi implementado:** catalogação, edição de editais, usuários, sessões, papéis, dashboards, checkout, favoritos, alertas, API pública ou B2B. Não há endpoints administrativos, URLs oficiais, scraping nem mensagens reais. Sem ORM, migrations, tabelas ou dados reais.

## Histórico e validação operacional

O ambiente original de elaboração não possuía Docker nem acesso à registry npm. Essa limitação foi registrada na entrega inicial e permanece documentada no relatório histórico de 26/10/2026.

Em 27/10/2026, a fundação foi validada localmente no Windows:

- Instalação reproduzida com npm ci e package-lock.json versionado.
- Build, lint e TypeScript aprovados.
- Vitest 4/4, testes offline 2/2 e Playwright 3/3 aprovados.
- PostgreSQL de desenvolvimento e testes conectados.
- Persistência de desenvolvimento validada após reinício.
- Gate documental EDT-08 aprovado.

O arquivo next-env.d.ts é gerado pelo Next.js e não é rastreado pelo Git.

Evidências: docs/bloco-a/07-VALIDACAO-LOCAL-WINDOWS.md.

A validação local não substitui a auditoria independente, ainda pendente. Não há autorização para implementar o Bloco B.

## Fora de escopo futuro

Design system em B, autenticação em C, primeiro CRUD D, busca E, detalhe F; restante conforme roadmap e gates humanos.
