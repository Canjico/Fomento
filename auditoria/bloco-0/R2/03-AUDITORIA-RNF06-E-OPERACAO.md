# RNF06 — Auditoria independente do contrato operacional

**Fontes:** `REQ` (DOCX) §6 (checagem de editais de fontes oficiais ≥1 vez/dia); `05-ESTADOS-EDITORIAL-E-AUDITORIA.md` §R2; `07-MODELO-DE-DADOS-LOGICO.md` §R2; `11-TESTES-E-GATES.md` SRC-04/07/08; `corretivos/bloco-0/R2/04-MATRIZ-RNF06.md`.

## Escopo e semântica reproduzida

- `F(d)`: fontes oficiais ativas acompanhadas durante a janela diária, inclusive indisponíveis, com alterações/exclusões só por decisão documentada prospectivamente; cada fonte deduplicada.
- `E(d)`: `Edital.id` publicado sob acompanhamento, inclusive encerrado ainda monitorado, admitido até corte; arquivo/dispensa exclui apenas com trilha registrada, sem remoção retroativa. Uma oportunidade com duas fontes conta uma única vez.
- Registro lógico `DailyMonitorUniverse(day,kind,resource_id,eligible_from,exclusion_decision_id,universe_revision)` preserva denominador versionado. `SourceReference` explicita origem primária/secundária; `SourceCheck` não substitui `EditalSourceCheck` com campos e evidências comparadas individualmente.
- `source_coverage(d)=#fontes com check efetivo / |F(d)|`, `edital_coverage(d)=#editais com check efetivo / |E(d)|`; tentativas têm métricas próprias. `*_overdue_count` = universo − concluídos até corte. Universo vazio = N/A auditado, nunca PASS silencioso.
- Janela **proposta**: meia-noite inclusiva até meia-noite seguinte exclusiva, no fuso `America/Sao_Paulo`. Registro de instantes em UTC; a obrigação é válida também sábados, domingos e feriados.
- Regra documental de conformidade: PASS somente 100% nos dois universos com evidência até o corte; FAIL se obrigação conhecida vencida e não concluída; NÃO VERIFICADO se faltarem logs/prova do universo. Falha tardia nunca retroativamente vira PASS. **Não confundir método manual com garantia de capacidade.**

## Reprodução por evento (inventário fictício da R2)

`F(d)={A,B,C}` todos os sete dias (3/dia), `E(d)={A1,A2,B1,B2,C1,C2}` todos os dias (6/dia). A→A1/A2, B→B1/B2, C→C1/C2. A fonte A representa mais de um edital. Não há exclusões ou variação de universo neste ensaio; estes casos aparecem no contrato geral.

| Dia de novembro de 2026 | Fonte efetiva/3 | Edital efetivo/6 | Fonte tentada/3 | Edital tentado/6 | Overdue F/E | RNF06 | Evidência do evento |
|---|---:|---:|---:|---:|---:|---|---|
| 02, seg | 3 | 6 | 3 | 6 | 0/0 | PASS | A/B/C e 6 editais concluídos |
| 03, ter | 3 | 5 | 3 | 5 | 0/1 | FAIL | A conferida, A1 conferido, A2 nem tentado |
| 04, qua | 2 | 4 | 3 | 6 | 1/2 | FAIL | B indisponível, B1/B2 inconclusivos |
| 05, qui | 3 | 6 | 3 | 6 | 0/0 | PASS | A2 alteração oficial detectada; retificação segue workflow |
| 06, sex | 2 | 4 | 2 | 4 | 1/2 | FAIL | C/C1/C2 pendentes no corte |
| 07, sáb | 3 | 6 | 3 | 6 | 0/0 | PASS | Rechecagem C, sem crédito para o dia 06 |
| 08, dom | 3 | 6 | 3 | 6 | 0/0 | PASS | Cobertura integral |
| **TOTAL** | **19/21** | **37/42** | **20/21** | **39/42** | **2/5 ocorrências atrasadas** | **4 PASS / 3 FAIL** | Simulação, não registros operacionais reais |

Resultados recalculados:

- Fontes efetivamente concluídas: `19÷21×100=90,476190…%=90,48%`.
- Editais efetivamente concluídos: `37÷42×100=88,095238…%=88,10%`.
- Fontes tentadas: `20÷21×100=95,238095…%=95,24%`.
- Editais tentados: `39÷42×100=92,857142…%=92,86%`.
- No dia 03, cobertura F=100% mas E=83,33%; a conjunção RNF06 é FAIL. Indicadores semanais não compensam dias individuais.

## Cenários negativos e prova de integridade do significado

| Cenário | Prova de contrato | Resultado |
|---|---|---|
| A conferida, A2 sem check | Entradas A, A1 concluídas; A2 ausente | Fonte A não confere A2, RNF FAIL |
| Fonte B indisponível | `unavailable` com tentativa e evidence | B não é check efetivo; B1/B2 não são concluídos |
| Retificação de A2 | `verified_changed` específico, candidata v+1 | Check efetivo sem publicação automática; snapshot anterior prevalece |
| Revisão tardia | C verificada dia 07, não dia 06 | Dia 06 fica FAIL |
| Duas fontes por edital | Distinct Edital.id no numerador E(d) | Evita contagem dupla, independentemente dos checks fonte |
| Universo vazio | N/A e revisão da configuração | Não converte denominador zero em sucesso |
| Fonte arquivada/editais ingressados | `eligible_from`, decisão de exclusão, histórico do conjunto | Denominador auditável; não remover obrigação retroativamente |

## Risco residual e última decisão

A **causa raiz de R1-01 foi resolvida documentalmente**, mas D-11 permanece **PENDENTE**: responsável nominal, substituto, escala, limites de fontes/editais e canal de contingência antes de D/F/MVP1. O processo manual pode não atingir 100% por dia; caso a equipe não consiga garantir escala, o projeto deve reconhecer CONFLITO com RNF06 e levar à deliberação humana, nunca inventar um PASS.

Não foi verificada operação diária real, disponibilidade das fontes públicas, evidência em produção ou tempo de equipe. O cenário fictício evidencia literalmente **uma semana FAIL**; não implica percentual real da futura plataforma.
