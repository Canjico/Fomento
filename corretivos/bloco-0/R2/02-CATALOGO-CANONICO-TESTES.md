# 02 — Evidência do catálogo canônico de testes

**Fonte normativa:** `docs/bloco-0/11-TESTES-E-GATES.md` §R2. Este relatório **não cria definições paralelas**; fornece inventário, auditoria de colisões históricas e localização única do catálogo.

- Famílias inventariadas: `EDT`, `TIM`, `AUTH`, `SRC`, `DED`, `ENT`, `BIL`, `PERF`, `PRIV`, `LOG`.
- Todos os IDs catalogados são **ESPECIFICADOS CONCEITUALMENTE / NÃO EXECUTADOS** e têm colunas ID, nome, objetivo/requisito, bloco, GIVEN/pré-condição/fixture, WHEN, THEN, evidência e gate. **Não confundir com teste unitário ou E2E rodado.**
- IDs históricos em colisão: `EDT-04`, `EDT-07`, `TIM-06`, `TIM-07`; também detectado `EDT-08` reutilizado com significado novo, agora `EDT-12`. Aliases registrados explicitamente em `11` §R2. **Preservar ambos os cenários, nunca apagar teste só para resolver ID.**

## Inventário ativo

| Família | IDs canônicos atualmente descritos |
| --- | --- |
| EDT | EDT-01, EDT-02, EDT-03, EDT-04, EDT-05, EDT-06, EDT-07, EDT-08, EDT-09, EDT-10, EDT-11, EDT-12 |
| TIM | TIM-01, TIM-02, TIM-03, TIM-04, TIM-05, TIM-06, TIM-07, TIM-08, TIM-09, TIM-10 |
| AUTH | AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, AUTH-08, AUTH-09, AUTH-10, AUTH-11, AUTH-12 |
| SRC | SRC-01, SRC-02, SRC-03, SRC-04, SRC-05, SRC-06, SRC-07, SRC-08 |
| DED | DED-01, DED-02 |
| ENT | ENT-01, ENT-02, ENT-03 |
| BIL | BIL-01, BIL-02, BIL-03, BIL-04, BIL-05, BIL-06, BIL-07, BIL-08, BIL-09, BIL-10 |
| PERF | PERF-01 |
| PRIV | PRIV-01, PRIV-03 |
| LOG | LOG-01 |


## Histórico e controle de conflitos

Os casos de `05` §7 v0.2 e `11` §R1 v0.2 eram normativos **naquele contexto histórico**; após a v0.3, a redação R2 central prevalece. Referências a intervalos em documentos antigos são navegação, não definição alternativa. Auditor da R2 deve confrontar TODOS os usos, inclusive prose de BIL/ENT e as referências `SRC-06`, `EDT-08` e casos `AUTH-12`.

**Não verificado:** execução real ou suficiência de assertions automatizadas; os testes exigem fixtures, ambiente e gate futuro.
