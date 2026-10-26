# Handoff para auditoria independente do Bloco A

## Missão do auditor

Inspecionar repositório Git e commit informado separadamente no relatório de entrega, reproduzir instalação/build, executar Compose e testes independentes, verificar documentação e emitir APROVADO / APROVADO COM RESSALVAS / REPROVADO **sem aceitar autorrelato como prova**.

## Ordem de execução

1. Conferir integridade dos ZIPs históricos em `artifacts/sources`, comparar hash das fontes `docs/bloco-0` (desconsiderar o ajuste `EDT-08`, documentado em adendo).
2. Validar Gate 0 `docs/bloco-a/00-ACEITE-GATE-0.md`, compromisso D-09 e ausência de migrations.
3. Inspecionar `git status --porcelain`, `git log --oneline --decorate -5`, e confirmar branch dedicada.
4. Criar `.env` a partir de `.env.example` com credencial descartável. Executar `npm install` ou `npm ci` se lockfile já aprovado; `npm run env:check`.
5. Subir Compose dev/test; verificar volumes e bind localhost, database separado, `db:ping` dev/test, reiniciar e repetir.
6. Executar lint, typecheck, unit tests, build, E2E desktop/mobile e smoke HTTP 200.
7. Fazer tentativas de acesso a `/admin`, `/api/admin`, `/login`: não deve existir fluxo funcional; não aceitar dashboard/admin sem auth.
8. Rodar `node scripts/check-gate.mjs` e comparar trecho `EDT-08` com o ZIP v0.3; confirmar somente correção de gate e 61 IDs.
9. Inspecionar logs e `.gitignore`, procurar segredos e URLs remotas, testar ausência de migrations e dados do domínio.
10. Conferir relatório de testes `04`, riscos `05`, dependências e arquivo `artifacts/bloco-a/run-reports/GIT-FINAL.txt` incluído no pacote entregue.

## Condições de reprovação

- Dependências ausentes ou sem lockfile / sem build verde no ambiente de auditoria.
- PostgreSQL não acessível, serviço não isolado ou persistência quebrada.
- Endpoints admin expostos, credenciais em Git, código de domínio prematuro.
- `EDT-08` ainda vinculando gate D/F, ou sem trilha do adendo.
- Ausência de teste real sem explicitação da limitação.

## Limites

O implementador **não** realiza a auditoria neste pacote. Sem push/PR/deploy; não implementar B antes de gate humano.
