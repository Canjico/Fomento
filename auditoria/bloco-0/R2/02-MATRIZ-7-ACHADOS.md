# Matriz independente — sete achados da Reauditoria R1

**Classificação:** RESOLVIDO; RESOLVIDO CONDICIONALMENTE; PARCIAL; NÃO RESOLVIDO; REGRESSÃO; NÃO VERIFICÁVEL. A gravidade da R1 é preservada, independentemente do risco residual. Fonte de auditoria: `auditoria/bloco-0/03-ACHADOS-NOVOS-E-RESIDUAIS.md` no ZIP R1. Estado = documental, não teste de app.

| ID | Gravidade original | Causa raiz e critério R1 | Evidência v0.3 conferida | Estado R2 | Risco residual / último gate |
|---|---|---|---|---|---|
| R1-01 | ALTO | Fonte revisada ≠ editais revisados | `05 §R2` fórmulas F/E, `07 §R2` SourceCheck/EditalSourceCheck, `04-MATRIZ-RNF06.md` eventos 02–08/11, casos SRC-04/07/08 | **RESOLVIDO CONDICIONALMENTE** | RNF06 não comprovado fora simulação; D-11 e operação até D/F |
| R1-02 | MÉDIO | EDT-04/07/08 e TIM-06/07 colidiam | `11 §R2` 61 IDs únicos e crosswalk explícito, `02-CATALOGO-CANONICO-TESTES.md`, `05 §7` supersessão | **RESOLVIDO** | Novo R2-01 = gate EDT-08 G/V vs D/F; alinhar antes D/F, sem colisão ativa de ID |
| R1-03 | MÉDIO | Uma revisão rejeitada contada como edital | `03-FIXTURES-MVP1.md` E1…E10 10 ids distintos, 8 published/2 draft, rejeição E8/v2, `11 §R2` | **RESOLVIDO** | Ainda é apenas seed/roteiro futuro; executar evidências no F |
| R1-04 | MÉDIO | Rate limit contaminava ensaio anti-enumeração | `11 §R2` AUTH-11A amostras/ordem/buckets reset, AUTH-11B 429 separado, `04` e `10` vinculados | **RESOLVIDO CONDICIONALMENTE** | 5/15 min, margens timing/bootstrap e bucket ainda PROPOSTAS; ratificar C/G |
| R1-05 | MÉDIO | LCP aceitava lista ainda incompleta | `11 §R2` marco navigation_start→catalog_ready, oráculo do DOM/seed, negativo 700/3000; `01`/`12` | **RESOLVIDO CONDICIONALMENTE** | Hardware/percentis/SLI propostos, ratificar até E; benchmark real não feito |
| R1-06 | MÉDIO | BillingSubject pessoal destoava do checkout do DOCX | `05-CHECKOUT-ALTERNATIVAS.md` 10 jornadas, `09 §R2`, `02/03/04/08` | **RESOLVIDO CONDICIONALMENTE** | D-02/D-26 não aprovadas, opção B amplia requisitos; antes de H/L/migrations relevantes |
| R1-07 | BAIXO | Manifesto v0.2 dizia versão 0.1 como atual | `00` introdução e §R2 identificam v0.3, §3 histórico v0.2, nova tabela 13 hashes validada | **RESOLVIDO** | Nenhuma inconsistência de versão corrente encontrada |

## Casos de teste sem execução

- `SRC-04`: fonte A e A1 conferidos, A2 pendente; `edital_coverage=5/6` ainda que `source_coverage=3/3` no exemplo completo; RNF06=FAIL.
- `AUTH-11`: fase A mede indistinguibilidade pública, fase B mede abuso e 429; logs sanitizados. Não misturar amostras.
- `PERF-01`: cabeçalho 500ms, LCP 700ms, linhas 3000ms → FAIL funcional, mesmo com LCP<2s.
- `EDT-04/07/08/10/11/12` e `TIM-06/07/10`: significados únicos no catálogo; testes históricos não desaparecem.
- `ENT-02` (consulta entre duas empresas): benefício Pro de A não se aplica a B; favoritos pessoais de consultor não se tornam visíveis para a empresa.

## Conclusão

Os critérios de resolução **documentais** da R1 estão satisfeitos. A ausência legítima de equipe, dados de benchmark, gateway, migrações ou aplicação não invalida o contrato, desde que continue explicitamente pendente — como está. O R2-01 está descrito separadamente e pode ser corrigido pontualmente antes do gate D/F, sem exigir novo ciclo R3 amplo.
