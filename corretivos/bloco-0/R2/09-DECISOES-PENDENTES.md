# 09 — Decisões humanas pendentes (R2)

> **Nenhuma D-01–D-28 aprovada.** A matriz única normativa permanece `03-DECISOES-E-CONFLITOS.md`, §Matriz de autoridade. Este relatório agrupa os assuntos por último gate admissível, **sem substituir a autoridade**.

| Momento de decisão | IDs prioritários | Alternativas e recomendação condicionada | Impacto de adiamento |
|---|---|---|---|
| Antes do aceite documental Bloco 0 | D-09 e D-23 | manter auditoria independente + decisão humana, e separar aceite do Bloco 0 de autorização do A | bloqueia fechamento do gate documental |
| Antes do Bloco A (dependendo da migration planejada) | D-01, D-08; D-03/D-06/D-02/D-26 quando entidades forem antecipadas | monólito modular e fronteiras; **não** migrar assinaturas/favoritos em A sem decisões | estrutura inconsistente; adiamento pode ser legítimo para entidades futuras |
| Antes de B/C | marca/web font e papéis D-07, políticas de AUTH-11/segurança | separação de autor/revisor/publicador e rate-limit testável, sem configurar produção sem decisão | risco de autorização e UX enganosa |
| Antes de D–F/Gate MVP1 | D-04, D-05, D-06, D-07, D-10–D-13, D-25, D-11 operacional | preservar snapshots, fonte oficial, tempo IANA, universos F/E; ratificar equipe/corte/urgência | RNF06 não demonstrável e catálogo não confiável |
| Antes de G–M | D-02, D-26, D-16, D-18, D-21, D-22 | **A empresarial preserva checkout original**; B pessoal é extensão formal, com dados fiscais e LGPD; cotas condicionadas | migration de Subscription e jornadas bloqueadas |
| Futuras e adiáveis | D-15, D-17, D-19, D-20, D-24 e políticas restantes da matriz | billing simulado, match indicativo, assessoria contratual, moderação e B2B isolado | impacto apenas no bloco proprietário |

## Decisões D-02 / D-26 — efeitos essenciais

- **A — comercial estritamente empresarial:** conta sem empresa continua Gratuito, empresa autoriza contratação/cancelamento; mantém DOCX e exige regra de cota RF04 vinculada aos benefícios org sem vazamento. Não inventar benefício pessoal global por membership.
- **B — pessoa ou empresa:** demanda aprovação de extensão do checkout original, campos fiscais pessoais, termos e regras LGPD; entitlement pessoal pertence à identidade, empresarial ao contexto. Fav. RF04 continuam privados e não são usados para obter dados de org.
- **Recomendação técnica deliberável:** preservar A para primeiro checkout simulado, preparar fronteira de BillingSubject tipada **somente se** o proprietário aceitar custo e extensão B. Não efetuar migração antes do gate da decisão.

As D-01..28 continuam nominalmente no `03`, com responsáveis de deliberação humana sem assinatura. **Aceite do Bloco 0 ≠ autorização do Bloco A.**
