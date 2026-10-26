# Catálogo de testes, fixtures MVP1, AUTH-11 e PERF-01 — Reauditoria R2

**Fontes:** `11-TESTES-E-GATES.md` §R2 (única autoridade ativa); R1 `03-ACHADOS-NOVOS-E-RESIDUAIS.md`; `03-FIXTURES-MVP1.md`; `02-CATALOGO-CANONICO-TESTES.md`; `05-ESTADOS-EDITORIAL-E-AUDITORIA.md` (§7 histórico e §R2); `04-ORGANIZACOES-PERMISSOES.md` e `10-SEGURANCA-PRIVACIDADE-RISCOS.md`.

## Inventário independente

A extração programática de linhas que começam com `| `ID`` **na tabela normativa de `11 §R2`** produziu 61 linhas e 61 IDs distintos (não conta menções em prose nem subfases AUTH-11A/B como IDs autônomos):

| Família | IDs ativos | Total |
|---|---|---:|
| EDT | EDT-01…EDT-12 | 12 |
| TIM | TIM-01…TIM-10 | 10 |
| AUTH | AUTH-01…AUTH-12 | 12 |
| SRC | SRC-01…SRC-08 | 8 |
| DED | DED-01…DED-02 | 2 |
| ENT | ENT-01…ENT-03 | 3 |
| BIL | BIL-01…BIL-10 | 10 |
| PERF | PERF-01 | 1 |
| PRIV | PRIV-01 e PRIV-03 | 2 |
| LOG | LOG-01 | 1 |
| **TOTAL** | 61 únicos | **61** |

O salto PRIV-02→PRIV-03 é nomenclatura não sequencial, **não** colisão ou prova de que existe um teste PRIV-02. Menções NTF/MOD/B2B no roadmap/decisões continuam marcos futuros, não integrantes dessa tabela de 61.

## Crosswalk dos IDs históricos

| Alias e origem | Interpretação histórica | ID canônico | Verificação |
|---|---|---|---|
| EDT-04 / 05 §7 antiga | Revisões concorrentes | EDT-04 | preservada |
| EDT-04 / 11 §R1 | Mutação de documento público por candidato | EDT-10 | renomeada |
| EDT-07 / 05 §7 antiga | Retificação não publicada | EDT-07 | preservada |
| EDT-07 / 11 §R1 | Publicação concorrente | EDT-11 | renomeada |
| EDT-08 / 05 §7 antiga | Correção de PII em audit trail | EDT-08 | preservada |
| EDT-08 / 11 §R1 | Rejeição da revisão E8/v2 | EDT-12 | renomeada |
| TIM-06 / 05 antiga | Instante exato | TIM-06 | preservado |
| TIM-06 / 11 §R1 | Prazo sem hora | TIM-10 | renomeado |
| TIM-07 / 05 antiga | Transição local de timezone | TIM-07 | preservada |
| TIM-07 / 11 §R1 | Limite temporal exato | TIM-06 | reusa ID canônico correto |

As seções antigas estão rotuladas como **HISTÓRICO SUPERADO**. Não foram encontrados dois significados normativos vigentes para o mesmo ID na tabela `11 §R2`.

**Ressalva nova R2-01:** a linha `EDT-08` tem bloco `G/V` e coluna de gate `D/F`; um teste de tratamento de PII de G/V não pode ser automaticamente condição de MVP1/F sem capacidade correspondente. Isso é uma classificação de gate inconsistente e não uma colisão de identificador. Ver `06-REGRESSOES-E-NOVOS-ACHADOS.md`.

## Fixtures e temporalidade

- `03-FIXTURES-MVP1.md`: exatamente E1, E2, E3, E4, E5, E6, E7, E8, E9, E10 como **dez Edital.id independentes**; E1–E8 publicados, E9–E10 rascunhos, E8/v2 é revisão rejeitada vinculada a E8 (não 11.º edital).
- Relógio-base `2026-11-10T12:00:00-03:00` / 15:00 UTC. E1 aberto; E2 encerrado; E3 suspenso; E4 aberto com evento de prorrogação; E5 fim desconhecido; E6 a iniciar; E7 somente data e precisão incerta; E8 aberto até 23:59:59 no relógio-base; E9/E10 não aparecem no público.
- `TIM-06`: E8 antes/no/depois do instante exato; inclusividade condicionada a D-12. `TIM-07`: variação de instantes UTC/timezone IANA em cenários isolados; `TIM-10`: data sem hora não inventa fim do dia. Não se tratam de estados simultâneos num único snapshot.
- `EDT-04`: duas escritas condicionais E1; `EDT-11`: dois publishers E8/v3 no cenário isolado, apenas um commit; `EDT-12`: E8/v2 rejeitada sem trocar versão pública; `EDT-09`: restauração cria E2/v3; `EDT-07` e `EDT-10`: candidata E4/v3 não afeta busca, filtros, lista nem detalhe v2.
- URLs `*.example.invalid`, editais e fontes inteiramente fictícios. No futuro registrar seed hash, clock, branch/cenário isolado, revisão publicada antes/depois, expectedVersion, respostas/DB e logs de saída.

## AUTH-11A e AUTH-11B

| Critério | Evidência proposta em `11 §R2` | Avaliação |
|---|---|---|
| Fase A anti-enumeração | 2 presentes/2 ausentes em contas e convites; 40 amostras/classe, seed, ordem intercalada e randomizada, buckets de rate limit isolados/reiniciados | Suficientemente distinto de B |
| Equivalência pública | Comparar status, texto, tamanho, hashes de corpo, timing mediana/P95; IC bootstrap de 95% contido na margem proposta | Parâmetros ainda precisam ratificação; não afirmar segurança absoluta |
| Fase B abuso | Buckets novos, 5 requisições/15 minutos candidato, limite+1, HTTP 429 e recuperação, testes simétricos presente/ausente | Adequado como plano, sem tratar B como substituto de A |
| Política real | D-07/segurança antes C/G | PENDENTE; teste NÃO EXECUTADO |

A possível chave composta IP+rota+hash do sujeito e impacto sobre usuários legítimos devem ser avaliados no próprio gate C/G, com cuidado contra vazamento por buckets que diferem conforme existência de identidade.

## PERF-01

- Métrica primária proposta: `navigation_start → catalog_ready` observada externamente por Playwright, confirmando IDs/contagem/ordem da primeira página, filtros, títulos, prazos, skeleton finalizado e interação por teclado. `data-ready=true` isoladamente não comprova o marco.
- Dataset determinístico 5.000 editais; duas viewports; cenários de consultas/filtros/paginação; caches frio e aquecido separados; cinco warmups, trinta amostras por cenário/viewport, concorrência 1 e 10; P95 ≤ 2000ms por cenário, condicionado a hardware/protocolo ratificados no E. Erros 5xx, timeouts, dados incorretos e falhas de oráculo não são removidos para melhorar percentil.
- Negativo `LCP=700ms`, lista correta só `3000ms` → **FAIL**. TTFB e LCP são auxiliares. Disponibilidade RNF02 ≥99,5% só pode ser certificada posteriormente em ambiente real.

## Conclusão

R1-02, R1-03, R1-04 e R1-05 receberam contratos suficientemente precisos para os gates futuros, sem exigir testes antes da existência da aplicação. A única ressalva material nesta área é o gate incorreto de EDT-08; não invalida o catálogo de nomes nem o Gate F como conceito, mas deve ser ajustado antes de executar o teste como requisito de aceite.
