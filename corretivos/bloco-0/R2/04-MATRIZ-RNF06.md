# 04 — Matriz RNF06 de fontes e editais · Corretivo R2

> **SIMULAÇÃO FICTÍCIA 02–08/11/2026.** A especificação normativa está em `docs/bloco-0/05-ESTADOS-EDITORIAL-E-AUDITORIA.md` §R2. Nenhuma consulta externa ou rotina foi executada.

## Universo e cardinalidades

`F(d)={A,B,C}`; `E(d)={A1,A2,B1,B2,C1,C2}`, estáveis nesta simulação; seis `Edital.id` distintos. Associações: **A→A1,A2; B→B1,B2; C→C1,C2**. A fonte A tem dois editais: visitar A não substitui conferir individualmente A2. Fonte primária de cada edital é sua letra; nenhuma secundária aqui. O dia civil usa `America/Sao_Paulo`; o corte é meia-noite do dia seguinte (exclusivo); zero exclusões e zero alterações do universo nesta semana.

**Definições:** `source_coverage=fontes efetivas/3`, `edital_coverage=editais efetivos/6`, `source_attempt_rate=fontes tentadas/3`, `edital_attempt_rate=editais tentados/6`, `*_overdue_count=universo - efetivas`. Conclusão requer inspeção e evidência individual por objeto; tentativa, erro HTTP e fonte indisponível não equivalem a conclusão. Universos vazios = N/A com auditoria, não PASS automático. Casos que entram/saem ao longo de um dia seguem a política versionada de `05` §R2.

## Tabela de eventos por dia

| Dia | Fontes concluídas | Editais concluídos | Eventos importantes |
| --- | --- | --- | --- |
| 02/11 (seg) | A, B, C | A1 A2 B1 B2 C1 C2 | dia integral |
| 03/11 (ter) | A, B, C | A1 B1 B2 C1 C2 | A2 sem tentativa apesar de fonte A verificada |
| 04/11 (qua) | A, C; B inacessível | A1 A2 C1 C2 | B1/B2 tentados mas inconclusivos |
| 05/11 (qui) | A, B, C | A1 A2 B1 B2 C1 C2 | A2 prorrogado; revisão editorial ainda pendente |
| 06/11 (sex) | A, B | A1 A2 B1 B2 | C1/C2 atrasados; fonte C sem operador |
| 07/11 (sáb) | A, B, C | A1 A2 B1 B2 C1 C2 | rechecagem C sem crédito retroativo |
| 08/11 (dom) | A, B, C | A1 A2 B1 B2 C1 C2 | dia integral |

**Eventos adicionais com semântica verificável:** 03/11 A visitada (check efetivo A) e A1 verificado, **A2 não verificado**; source A PASS, edital A2 FAIL. 04/11 B tentativa registrada com `outcome=unavailable`, B1 e B2 tentativas individuais inconclusivas; nenhuma dessas três conta conclusão. 05/11 A2 teve novo prazo encontrado em fonte oficial, efetivamente verificado com `verified_changed`, abre candidata editorial ainda NÃO publicada. 06/11 C não acessada até corte; 07/11 concluída, não reclassifica 06/11.

## Indicadores no corte diário

| Dia | Fonte coverage | Edital coverage | Tentativas F | Tentativas E | Fontes vencidas | Editais vencidos | RNF06 | Motivo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 02/11 (seg) | 3/3 (100.0%) | 6/6 (100.0%) | 3/3 | 6/6 | 0 | 0 | PASS | dia integral |
| 03/11 (ter) | 3/3 (100.0%) | 5/6 (83.3%) | 3/3 | 5/6 | 0 | 1 | FAIL | A2 sem tentativa apesar de fonte A verificada |
| 04/11 (qua) | 2/3 (66.7%) | 4/6 (66.7%) | 3/3 | 6/6 | 1 | 2 | FAIL | B1/B2 tentados mas inconclusivos |
| 05/11 (qui) | 3/3 (100.0%) | 6/6 (100.0%) | 3/3 | 6/6 | 0 | 0 | PASS | A2 prorrogado; revisão editorial ainda pendente |
| 06/11 (sex) | 2/3 (66.7%) | 4/6 (66.7%) | 2/3 | 4/6 | 1 | 2 | FAIL | C1/C2 atrasados; fonte C sem operador |
| 07/11 (sáb) | 3/3 (100.0%) | 6/6 (100.0%) | 3/3 | 6/6 | 0 | 0 | PASS | rechecagem C sem crédito retroativo |
| 08/11 (dom) | 3/3 (100.0%) | 6/6 (100.0%) | 3/3 | 6/6 | 0 | 0 | PASS | dia integral |


## Totais e conclusão

- Fontes: **19/21 = 90.48%** conclusões efetivas; tentadas **20/21 = 95.24%**.
- Editais: **37/42 = 88.10%** conclusões efetivas; tentados **39/42 = 92.86%**.
- RNF06 `PASS` diário apenas **4/7** dias. A semana **FAIL** porque um dia em FAIL basta; médias não compensam lacunas por dia.
- **Responsável real, substituto e escala de fins de semana: PENDENTE D-11 (gate D).** Sem equipe comprovada, não alegar capacidade de cumprimento. Se os registros operacionais não existirem, resultado é `NÃO VERIFICADO`, não PASS; na simulação com registros explícitos os dias indicados são FAIL.

**Provas futuras:** export por dia com snapshots congelados dos universos, checkId+sourceId+editalId, horário e evidence_digest, assinaturas/ator e outcome; comparar numeradores independentemente com `SRC-04`, `SRC-07`, `SRC-08` no catálogo do `11`. Nenhum serviço externo executado.
