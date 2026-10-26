# 06 — Validação cruzada, regressões e limites

| Fronteira | Evidências | Estado | Justificativa |
| --- | --- | --- | --- |
| RNF06 × fontes/editais × dados | 05 §R2, 07 §R2, 04-MATRIZ-RNF06 | PASS DOCUMENTAL | checks de fonte não multiplicam editais; 3/3 e 5/6 FAIL |
| IDs × estados × fixtures | 11 §R2, 05 §7, 03-FIXTURES | PASS DOCUMENTAL | EDT-04/07 e TIM-06/07 mapeados a IDs exclusivos; histórico não normativo |
| E1–E10 × Gate MVP1 | 11 §R2, 12 §R2, 03-FIXTURES | PASS DOCUMENTAL | 8 published, 2 draft, E8/v2 rejeitada separada |
| AUTH-11 × RBAC/segurança | 04,10,11 §R2 | PASS DOCUMENTAL | A ≠ B, buckets separados; parâmetros ratificação futura |
| PERF-01 × UX/listagem | 01,11,12 §R2 | PASS DOCUMENTAL | lista pronta ≠ LCP; cenário 3s = FAIL |
| Billing × ownership × checkout | 02,03,04,08,09 §R2 | CONDICIONAL | alternativa A aderente ao DOCX, B extensão D-26 pendente |
| Manifesto × histórico | 00 §R2 | PASS APÓS EMBALAGEM | conferir tabela R2 de hashes sem auto-hash |
| Decisões × roadmap × migrations | 03 matriz D-01..28,12 | CONDICIONAL | antecipação de D-02/D-26 só se migration exigir |
| Revisões × busca pública | 05 §R1,07,06 | PASS DOCUMENTAL | snapshot e ponteiro de versão não foram alterados no R2 |
| Isolamento × favorites × assinatura | 04,07,09 | CONDICIONAL | nenhum benefício A→B; política comercial D-02 pendente |
| Segurança/privacidade | 10;11 | NÃO VERIFICADO DINAMICAMENTE | somente contratos; não há aplicação |
| Acessibilidade/identidade | 08;PDF | NÃO VERIFICADO DINAMICAMENTE | marca mantida; contraste na UI real não testado |


## Análise de regressão

- **Risco controlado:** o novo checkout pessoal não é anunciado como original nem disponível; protegidos entitlement e ownership por contextos distintos.
- **Risco controlado:** o contrato `DailyMonitorUniverse` não altera os snapshots publicados nem faz parsing de documentos externos.
- **Risco controlado:** o catálogo de testes substitui definições históricas apenas por autoridade de documentação, não elimina cenários. Resta uma **ressalva**: verificar interpretações passadas em TODO o corpus durante a reauditoria R2.
- **Risco de implementação futuro:** datas somente-dia, inclusividade exata, política de desconto e disponibilidade continuam dependentes dos gates; não converter essa pendência em regressão resolvida.
- **Não houve** execução de suíte de regressão de software, testes banco, mocks, infraestrutura ou UX real. Ver `08` para testes físicos de arquivo/diff/CRC.
