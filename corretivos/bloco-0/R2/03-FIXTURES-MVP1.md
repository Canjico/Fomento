# 03 — Fixtures MVP 1 · Corretivo R2

> **10 editais distintos, zero dados reais**. `E1..E10` são IDs lógicos estáveis de `Edital.id`, não identificadores oficiais. Instituições A/B/C, URLs `*.example.invalid`, títulos, datas e eventos são **fictícios**. Relógio base: `2026-11-10 12:00 America/Sao_Paulo` (15:00 UTC); mudanças de clock nos casos temporais, nunca afirmar múltiplos estados simultâneos impossíveis.

| Edital.id | Título fictício | Fonte | Editorial | Temporal no relógio-base | Início | Encerramento | Timezone | Precisão | Publicado | Candidatas/eventos | Rejeitada | Lista | Detalhe | Teste |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E1 | Radar Inovação Alfa | A | published | open | 2026-11-01 08:00 | 2026-11-30 18:00 | America/Sao_Paulo | instante | v1 | v2/v3 concorrentes | — | sim / v1 | sim / v1 | EDT-04,TIM-07 |
| E2 | Fundo Pesquisa Beta | B | published | closed | 2026-10-01 09:00 | 2026-11-05 18:00 | America/Sao_Paulo | instante | v2 | v3 restauração sob revisão | — | sim / v2 | sim / v2 | EDT-05,EDT-09,TIM-01 |
| E3 | Prêmio Ciência Gama | C | published | suspended | 2026-11-01 09:00 | 2026-12-01 18:00 | America/Sao_Paulo | instante | v1 | event suspensão e posterior reversão | — | sim / v1 suspenso | sim / v1 suspenso | TIM-02,TIM-09 |
| E4 | Chamada Aceleração Delta | A | published | open + extended | 2026-11-01 09:00 | 2026-11-20 18:00 | America/Sao_Paulo | instante | v2 (fim anterior 03/11) | v3 retificação rascunho | — | sim / v2 | sim / v2 | EDT-07,EDT-10,TIM-03 |
| E5 | Linha de Crédito Épsilon | B | published | unknown | 2026-11-01 00:00 | desconhecido | America/Sao_Paulo | desconhecida | v1 | — | — | sim / aviso | sim / aviso | TIM-04 |
| E6 | Bolsa Empreender Zeta | C | published | upcoming | 2026-11-15 09:00 | 2026-12-20 18:00 | America/Sao_Paulo | instante | v1 | — | — | sim / futura | sim / futura | TIM-08 |
| E7 | Edital Economia Eta | B | published | open (limite incerto) | 2026-11-01 | 2026-11-12 | America/Sao_Paulo | somente data | v1 | — | — | sim / precisão explícita | sim / incerteza | TIM-10 |
| E8 | Prêmio Tecnológico Teta | A | published | open, fim exato | 2026-11-01 09:00 | 2026-11-10 23:59:59 | America/Sao_Paulo | instante | v1 | v2 rejeitada; v3 aprovada concorrente em branch de teste | v2 | sim / v1 | sim / v1 | EDT-03,EDT-11,EDT-12,TIM-06 |
| E9 | Rascunho Ômega | C | draft | n/a | 2026-11-01 | 2026-12-01 | America/Sao_Paulo | data apenas | — | v1 draft | — | não | 404 | EDT-01 |
| E10 | Rascunho Sigma | A | draft | n/a | desconhecido | desconhecido | America/Sao_Paulo | desconhecida | — | v1 draft | — | não | 404 | EDT-01,EDT-06 |


## Cardinalidade e histórico

- **10 Edital.id distintos**: E1–E10. **8 published** (E1–E8), **2 draft** (E9–E10), **0 archived**. **Uma revisão rejeitada explícita** (`E8/v2`); ela não é 11.º edital. `E8/v3` só é aprovada em branch de teste sem conflitar com a rejeição de `E8/v2`. `E4/v3` é candidata ainda não publicada. E1/v2 e E1/v3 são propostas de concorrência, não duas publicações automáticas. E2/v3 de restauração é revisão nova, nunca rewrite de v1.
- **Revisões publicadas distintas**: E1/v1 E2/v2 E3/v1 E4/v2 E5/v1 E6/v1 E7/v1 E8/v1 (= 8 ponteiros). Candidatas base a serem instanciadas nos cenários: E1/v2,v3; E2/v3; E4/v3; E8/v2 rejeitada; E8/v3 aprovada em cenário isolado. **Eventos**: E3 suspensão e reversão em momentos sucessivos, E4 prorrogação de v1→v2, E2 restauração solicitada, publicação concorrente E8/v3. Contar versões e eventos em inventário separado por execução, pois ramificações isoladas não ocorrem todas no mesmo snapshot base.
- **URLs** de fonte sempre `https://fonte-a.example.invalid/...` etc.; não abrir inscrição real, nem usar domínios reais como prova. Valor/documentos são campos de demo rotulados sintéticos com versões coerentes.

## Matriz fixture → revisão → caso → resultado

| Fixture e revisão | Caso de teste canônico | Evidência/oráculo esperado |
| --- | --- | --- |
| E1 v1 | EDT-04,TIM-07 | sim / v1 / sim / v1 |
| E2 v2 | EDT-05,EDT-09,TIM-01 | sim / v2 / sim / v2 |
| E3 v1 | TIM-02,TIM-09 | sim / v1 suspenso / sim / v1 suspenso |
| E4 v2 (fim anterior 03/11) | EDT-07,EDT-10,TIM-03 | sim / v2 / sim / v2 |
| E5 v1 | TIM-04 | sim / aviso / sim / aviso |
| E6 v1 | TIM-08 | sim / futura / sim / futura |
| E7 v1 | TIM-10 | sim / precisão explícita / sim / incerteza |
| E8 v1 | EDT-03,EDT-11,EDT-12,TIM-06 | sim / v1 / sim / v1 |
| E9 — | EDT-01 | não / 404 |
| E10 — | EDT-01,EDT-06 | não / 404 |


## Cenários sequenciais e relógios adicionais

| Cenário | GIVEN | WHEN | THEN |
|---|---|---|---|
| `TIM-06` | E8 fim `2026-11-10T23:59:59-03:00` | clock 1 segundo antes, exato e 1 segundo após | conforme D-12 de inclusividade; após fim fechado; nunca inventar deadline |
| `TIM-07` | E1 timezone IANA + instantes UTC | testar mudança de data local em `America/Sao_Paulo`; adicional relógio de laboratório IANA `Europe/Lisbon` com janela fictícia controlada | status coerente com hora UTC e zona da fonte (não trocar timezone do edital por timezone do visitante) |
| `TIM-10` | E7 só informa `2026-11-12` | navegar antes/durante/depois da data local | exposição da precisão; sem end-of-day automático não ratificado |
| `TIM-09` | E3 suspended em 10/11 | registrar reversão autenticada em 11/11 e clock avançar | abrir novamente se prazo válido; suspensão histórica permanece |
| `EDT-04` | E1/v1 e dois comandos sobre mesmo expectedVersion | disparar escrita concorrente | uma vencedora; outra 409 |
| `EDT-07`/`EDT-10` | E4/v2 publicada, candidata v3 ainda draft | editar valor/prazo/docs e consultar lista + detalhe + busca | público v2 inalterado em tudo, inclusive filtros |
| `EDT-11` | E8/v3 aprovada em cenário isolado, dois publicadores | publicar com mesma versão-base | uma operação, uma 409 e um único evento |
| `EDT-12` | E8/v2 candidata | rejeitar com motivo | E8/v1 pública permanece; registrar decisão |
| `EDT-09` | E2/v1 e v2 existentes | solicitar restaurar v1 | nova v3, sem alterar v1/v2 e com workflow |

**Nenhum PASS funcional foi produzido.** Gate F exige registrar `seed_hash`, ambiente, timezone/clock, revisão publicada antes/depois, traces, resultado de tela/DB, permissão e exit codes. Não contar revisão/evento como edital adicional. A exigência de cinco publicados + um draft continua satisfeita como **plano**, não como execução.
