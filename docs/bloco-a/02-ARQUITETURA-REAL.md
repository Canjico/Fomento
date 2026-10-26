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
- PostgreSQL local futuro com dois bancos em **containers separados**: dev persistente e testes efêmeros. Sem ORM escolhido, sem SQL de domínio e sem migrations.
- `.env` é lido somente em utilitários locais; nenhuma credencial é lida pela página web. Não há autenticação fictícia.
- `pg` é dependência de infraestrutura para teste de conectividade, não ORM.
- Playwright E2E contém um oráculo negativo: ausência de botões/links inexistentes.

## Modelo de segurança nesta etapa

As portas host dos containers usam bind `127.0.0.1` (não publicação geral na LAN). HTTP local inicia explicitamente com `--hostname 127.0.0.1`. A UI é apenas informativa, sem dados pessoais. `.env` é ignorado pelo Git. PostgreSQL tem credenciais apenas por variáveis de ambiente para desenvolvimento. A proteção real de rotas admin pertence a C; nenhuma rota admin foi criada.

## Compatibilidade e referências

- Next.js 16.4.3, React 19.3.1: versões estáveis propostas com base em releases de outubro de 2026; **não instaladas**.
- Node 22.16.0 da máquina: compatível com os mínimos oficiais de Next (>=20.9) e Vitest 5 (>=22.12), mas o projeto não foi compilado.
- Tailwind v4 via PostCSS; eslint-config-next 16; Vitest 5 e Playwright 1.64.1 são versões **declaradas**, não resolvidas.
- Docker Compose não está presente no runtime executor. Deverá ser auditado em host compatível.

Fontes de compatibilidade: Next.js https://nextjs.org/docs/app/getting-started/installation; releases Next https://github.com/vercel/next.js/releases; Vitest https://vitest.dev/guide/; Playwright https://playwright.dev/docs/intro; React https://react.dev/versions.
