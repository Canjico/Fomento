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

`package.json`, `.npmrc`, `.gitignore`, `.env.example`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `compose.yaml`, `README.md`; `src/app/`, `src/shared/config/`, `src/modules/README.md`, `src/infrastructure/README.md`; `scripts/`, `tests/node`, `tests/unit`, `tests/e2e`; `docs/bloco-a/`, adendo 14; `artifacts/sources/`.

## Fronteiras respeitadas

**Não foi implementado:** catalogação, edição de editais, usuários, sessões, papéis, dashboards, checkout, favoritos, alertas, API pública ou B2B. Não há endpoints administrativos, URLs oficiais, scraping nem mensagens reais. Sem ORM, migrations, tabelas ou dados reais.

## Divergências e bloqueios reais

O ambiente que produziu esta fundação não possui Docker nem acesso à registry npm. A fundação existe como **código-fonte configurado**, mas não há dependências instaladas nem execução da aplicação/DB. Portanto, não é correto alegar app funcional, `npm run build` PASS ou sistema pronto para auditoria sem ressalvas. Não foi gerado `package-lock.json`; o `npm install` em rede disponível é pré-requisito de reprodução e deve gerar lockfile auditável antes do gate.

## Fora de escopo futuro

Design system em B, autenticação em C, primeiro CRUD D, busca E, detalhe F; restante conforme roadmap e gates humanos.
