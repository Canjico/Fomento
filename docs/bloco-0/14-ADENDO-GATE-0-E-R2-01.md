# Adendo — Gate documental 0 e correção pontual R2-01

**Data declarada da autorização:** 26/10/2026. **Natureza:** decisão técnica delegada pelo proprietário na solicitação do Bloco A; não é aceite independente de A.

## Gate e decisões formalizados pela solicitação

| Registro | Estado autorizado | Limite |
|---|---|---|
| D-09 | APROVADA | Execução ≠ auditoria independente; autor não aprova seus próprios resultados |
| D-23 | APROVADA | Gates APROVADO / APROVADO COM RESSALVAS NÃO BLOQUEADORAS / REPROVADO; sem avanço automático; severidade crítica/alta bloqueia |
| D-01 | APROVADA **somente para a fundação** | Next.js App Router, TypeScript strict, PostgreSQL, Tailwind, Docker Compose, Vitest, Playwright |
| D-08 | APROVADA **somente para a fundação** | Monólito modular, dependências mediadas por contratos, sem microsserviços |

O proprietário declarou o **Bloco 0 aprovado com ressalva controlada** e autorizou **restritamente o Bloco A**; isso é diferente de aprovar a implementação do Bloco A. D-02/D-26 e as demais decisões comerciais/de domínio continuam pendentes. A decisão de **não criar nenhuma migration de domínio em A** também foi expressamente autorizada. Todos os demais itens da matriz documental prevalecem como propostas ainda não ratificadas.

## Correção pontual R2-01

- Fonte da ressalva: `auditoria/bloco-0/R2/06-REGRESSOES-E-NOVOS-ACHADOS.md`.
- Documento alterado no repositório: `docs/bloco-0/11-TESTES-E-GATES.md`, tabela canônica de testes, linha `EDT-08`.
- **Antes:** bloco `G/V`, gate incorreto `D/F`.
- **Depois:** bloco `G/V`, gate `G/V`. Mantidas a identidade e a semântica de `EDT-08` (correção de PII em trilha).
- A tabela normativa permanece no documento `11`. Os registros históricos do pacote **v0.3 original não foram alterados**.
- Obrigações de sanitização de logs administrativos em `C/D` continuam presentes; um cenário específico de sanitização administrativa poderá ser registrado no backlog do Bloco C, **sem criar um caso ativo novo agora**.

## Validação objetiva

`node scripts/check-gate.mjs` deve confirmar: um registro canônico `EDT-08`, gate `G/V`, ausência de exigência prematura em `D/F` para essa linha, e 61 IDs únicos na matriz normativa. Conferir log do Bloco A para o resultado efetivo.

## Proveniência

O arquivo `artifacts/sources/FOMENTO_BLOCO_0_DOCUMENTACAO_v0.3.zip` é a fonte histórica imutável. O documento `11` extraído no repositório é uma **cópia ajustada por adendo**, não faz parte do ZIP v0.3 original. Não houve reauditoria independente do adendo nesta execução.

## Hashes de adendo (autoritativos somente para o arquivo ajustado)

- `docs/bloco-0/11-TESTES-E-GATES.md` **no ZIP histórico v0.3** SHA-256: `c09186764c40bc283063d4d6a8ca98d9e6439a862b5120a69606bd64ec11323a`.
- `docs/bloco-0/11-TESTES-E-GATES.md` **no repositório Bloco A** SHA-256: `0a76691bdfb326eb6e74c472baf8c660eba3417775dae4c72988898f370e4657`.
- O manifesto original `00-MANIFESTO-E-FONTES.md` e seus hashes internos são **históricos**; para o único documento alterado pela autorização A prevalece o hash deste adendo. Os 13 outros documentos principais permanecem byte a byte iguais.
