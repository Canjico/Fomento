# Testes e evidências — execução real Bloco A (26/10/2026)

## Ambiente e metodologia

Executados na pasta `fomento` deste ambiente de elaboração: Node v22.16.0, npm 10.9.2, Git 2.47.3. **Docker CLI indisponível**. Registry npm inacessível; a tentativa de lockfile expirou sem retorno útil. Todos os códigos abaixo representam **comandos executados**, exceto verificações indicadas como não executadas. Logs brutos estão em `artifacts/bloco-a/run-reports/` **no ZIP de entrega**, gerados separadamente do histórico Git.

| Comando executado | Exit | Resultado | Evidência | Interpretação |
|---|---:|---|---|---|
| `node scripts/check-gate.mjs` | 0 | PASS documental | `gate-edt08.log` | 61 IDs únicos, EDT-08 único e G/V |
| `npm run test:offline` | 0 | PASS restrito | `offline-node-tests.log` | 2 testes nativos Node, não Vitest |
| `npm run env:check` | 0 | PASS local | `env-check.log` | arquivo temporário com senha fictícia, removido após execução |
| `for f in scripts/*.mjs; do node --check "$f"; done` | 0 | PASS sintático | `js-syntax.log` | sintaxe JS dos scripts |
| `node /tmp/fomento-ts-transpile.mjs` | 0 | PASS sintático (auxiliar externo) | `ts-syntax.log` | 8 arquivos TS/TSX analisados pelo TS global, **não equivale a typecheck**; script de auditoria está no ambiente executor, não é dependência do projeto |
| `python -c '...yaml.safe_load...'` | 0 | PASS estrutural | `compose-yaml.log` | YAML parseável, serviços dev/test separados; **não validou Docker Compose runtime** |
| `npm install --package-lock-only ...` | 124 | NÃO CONCLUÍDO | `npm-install-lock.log` | timeout / dependências não resolvidas; sem lockfile |
| `npm run typecheck` | 2 | FAIL por pré-requisito | `typecheck.log` | tipos de Next/React/Node e deps ausentes, não prova existência de erro após instalação |
| `npm run lint` | 127 | NÃO EXECUTÁVEL | `lint.log` | eslint ausente |
| `npm run test` | 127 | NÃO EXECUTÁVEL | `unit-vitest.log` | vitest ausente |
| `npm run build` | 127 | NÃO EXECUTÁVEL | `build.log` | next ausente |
| `npm run test:e2e` | 1 | NÃO EXECUTÁVEL | `playwright.log` | CLI Playwright Python do host, não `@playwright/test` local |
| `docker --version` | 127 | NÃO EXECUTÁVEL | `docker-version.log` | docker ausente |
| `npm run db:ping` | 1 | NÃO EXECUTÁVEL | `db-ping.log` | driver `pg` ausente; DB não inicializado |

## Testes de aceite ainda obrigatórios

`npm install` com lock, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, Playwright em Chromium, `docker compose config`, `docker compose up -d --wait`, `db:ping` dev/test, reinicialização e smoke HTTP da página devem produzir **exit code 0** com log e contexto; hoje todos estão **NÃO VERIFICADOS em execução real**. Não houve navegador funcional nem banco local.

## Segurança e ausência de falsas alegações

`.env` foi criado temporariamente para validação e removido; `.gitignore` protege o arquivo caso seja criado novamente. Nenhum dado de cartão, pagamento, Pix, scraping, autorização/admin ou autenticação foi implementado. `src/app/page.tsx` informa que serviços estão indisponíveis.

## Dados originais e documentação

Os dois arquivos de origem primária foram lidos em inspeção de metadados/conteúdo. PDF: 13 páginas, SHA-256 `50e61c488112a18d5dc8bd7bc6d101f22501b18487af94506e232e0c9f11ff50`; DOCX: SHA-256 `adf7a4d06916f7f5408646db6b0ceb23937a60f37e87a79007fa80b387e64957`. Referências v0.3 e R2 estão verificadas nas evidências `artifacts/sources/`.

**Status técnico:** fundação preparada, **Bloco A não demonstrado funcional**, aguarda setup reproduzido e auditoria independente. Nenhuma execução adicional de B foi autorizada.
