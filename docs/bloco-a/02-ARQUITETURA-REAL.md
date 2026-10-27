# Arquitetura real da fundação

## Diagrama de dependência atual

```text
src/app/ (Next App Router; exibição técnica, sem dados)
  └─ globals.css (Tailwind v4, sem tokens definitivos)
src/shared/config/local-db.ts (função pura de validação)
scripts/check-env.mjs (validação independente CLI)
  └─ scripts/db-ping.mjs (adaptador local `pg`, SELECT 1)
compose.yaml (postgres persistente + perfil test com tmpfs)
```

Não existe dependência de aplicação em módulos de domínio porque **nenhum módulo de negócio foi materializado**. As convenções propostas para módulos novos constam de `src/modules/README.md`: domínio isolado → casos de uso → portas → adaptadores; cada módulo publica API interna controlada. Isso é a **fronteira documentada**, não uma garantia de enforcement automatizado já implementado.

## Decisões técnicas deste A

- Next.js App Router como web única; monólito modular, sem serviços remotos.
- PostgreSQL local validado com dois bancos em **containers separados**: dev persistente e testes efêmeros. Sem ORM escolhido, sem SQL de domínio e sem migrations.
- `.env` é lido somente em utilitários locais; nenhuma credencial é lida pela página web. Não há autenticação fictícia.
- `pg` é dependência de infraestrutura para teste de conectividade, não ORM.
- Playwright E2E contém um oráculo negativo: ausência de botões/links inexistentes.

## Modelo de segurança nesta etapa

As portas host dos containers usam bind `127.0.0.1` (não publicação geral na LAN). HTTP local inicia explicitamente com `--hostname 127.0.0.1`. A UI é apenas informativa, sem dados pessoais. `.env` é ignorado pelo Git. PostgreSQL tem credenciais apenas por variáveis de ambiente para desenvolvimento. A proteção real de rotas admin pertence a C; nenhuma rota admin foi criada.

## Compatibilidade e referências

### Ambiente validado — Windows, 27/10/2026

- Node.js 24.15.0; npm 11.12.1.
- Next.js 16.4.3; React 19.3.1.
- Tailwind CSS v4 e PostCSS.
- Instalacao limpa com npm ci: PASS.
- ESLint e TypeScript strict: PASS.
- Vitest: 4/4 testes aprovados.
- Playwright Chromium: 3/3 testes aprovados.
- Testes offline Node.js: 2/2 aprovados.
- Build de producao: PASS.
- PostgreSQL 17 Alpine: dev/test conectados.
- Persistencia do banco dev: validada apos reinicio.

### Riscos e limites

A execucao ocorreu no ambiente local Windows.
A auditoria independente permanece necessaria.

A imagem postgres:17-alpine utiliza tag mutavel.
Risco A-RSK-05: baixo, sujeito a reavaliacao antes
de qualquer ambiente compartilhado ou producao.

Nao existem modulos de negocio, ORM ou migrations de dominio.

Evidencias: docs/bloco-a/07-VALIDACAO-LOCAL-WINDOWS.md.

Fontes de compatibilidade: Next.js https://nextjs.org/docs/app/getting-started/installation; releases Next https://github.com/vercel/next.js/releases; Vitest https://vitest.dev/guide/; Playwright https://playwright.dev/docs/intro; React https://react.dev/versions.
