# Billing, autorização e contratos — Reauditoria arquitetural delimitada R2

**Fontes originais:** DOCX §4.4 (plano → razão social/CNPJ/setor/estágio → cartão/Pix/boleto → confirmação), §5 RF04–RF08, §7 preços/benefícios. **Fontes de projeto:** `02`, `03`, `04`, `06`, `07`, `08`, `09`, `10`, `12` e relatório R2 `05-CHECKOUT-ALTERNATIVAS.md`.

## R1-06: conciliação comercial

| Tópico | Alternativa A — empresarial | Alternativa B — pessoal + empresarial | Auditoria |
|---|---|---|---|
| Aderência ao DOCX | Preserva checkout com dados da empresa | Ampliação explícita, não requisito original | Sem alteração silenciosa da fonte |
| Titular | Organization com autorização de billing | BillingSubject tipado PERSON ou ORGANIZATION, exatamente um titular | Sem assinatura órfã |
| Usuário sem empresa | Gratuito; deve vincular/criar org autorizada para Pro | Pro pessoal só após aprovação de novos fluxos, dados fiscais/LGPD | Jornada sem CNPJ fictício |
| Consultor em A Pro/B Free | Direitos comerciais de A não se transferem a B | Direito pessoal, se aprovado, pertence só à pessoa; direito empresarial continua contextual | Não eleva membership |
| Favoritos RF04 | Dados pessoais do User, cota ligada a entitlement a ratificar | Idem; possibilidade de cota global quando Pro pessoal aprovado | Não tornar favoritos compartilhados |
| Revogação membership | Revalidar antes de commit / ativação | Revalidar contexto de organização; benefício pessoal não dá acesso a dados empresariais | Evita autorização stale |
| Checkout | Somente simulador M, sem liberar pago por escolha visual | Idem, acrescida da bifurcação autorizada | Sem gateway real |

`05-CHECKOUT-ALTERNATIVAS.md` registra **10 jornadas J01–J10** cobrindo conta sem empresa, empresário, consultor A/B, membro sem finanças, revogação durante checkout, cancelamento, downgrade e tentativa de usar A em B. As linhas incluem ator, contexto, plano, sujeito, dados, permissão, entitlement, favorito, teste e resultado esperado.

**Decisões pendentes:** D-02 (cota e benefício), D-26 (titular da assinatura), D-16 (vigência/cancelamento/prorrata), D-22 (dados pessoais), D-21 (até cinco usuários Assessoria). A alternativa B precisa aprovação de alteração do fluxo original; A é recomendação de menor desvio comercial, não escolha executada.

## Interfaces relevantes não regrediram

1. **ORG/IAM:** `Membership` depende de autorização server-side e contexto atual. Permissões por org não derivam de `org_id` informado sem checagem. Convites e revogações são autorizados em seus próprios módulos.
2. **FAV/ENT/BILL:** `SavedEdital` pertence à identidade; FAV chama `effectiveEntitlement(actor,context,feature,at)` sem ler tabela Subscription. ENT governa capacidade, billing simulado em M governa confirmação financeira. O Free de H não exige antecipar cobrança L/M.
3. **Unicidade/cota:** índices parciais ou semântica equivalente para contexto NULL proposta no `07`; transação serializa verificação da cota e evita dois inserts 2/3→4/3; escolha técnica final é posterior, sem migração.
4. **CAT/SRC/ADM:** `published_revision_id` único ponteiro público em CAT; snapshot editoral imutável. SRC pode registrar divergência e propor candidata, mas não troca valores publicados. ADM decide revisão; não escreve diretamente conteúdo público por bypass.
5. **Auditoria/moderação:** decisões de aprovação interna `RevisionReviewDecision` e moderação de parceiros `PartnerModerationDecision` são fluxos distintos; aprovação externa não equivale a autorização de publicação.
6. **Privacidade/logs:** solicitação LGPD e retenção pendentes do bloco pertinente; logs com dados sensíveis não têm publicação presumida; autorizações de leitura e mascaramento propostas em `04/10`.
7. **Notificações:** identidade de entrega inclui destinatário, contexto tipado não nulo, finalidade, canal, versão do evento e janela, evitando deduplicar incorretamente consultor em duas organizações.

## Gates e migrations

A matriz de autoridade de `03 §Matriz D-01–D-28` contém todos os identificadores, estado PENDENTE e último gate. A obrigação de antecipar decisões é **condicional ao conteúdo real das migrations de A**; não autorizar migração de assinatura/favoritos/edital sem D-26/D-02/D-06/D-05/D-12 resolvidas quando afetadas. D-09/D-23 são pré-aceite documental, mas **aceitar Bloco 0 não autoriza A**. O roadmap 0,A–V preserva ordem geral e interfaces incrementais.

## Resultado

**R1-06 = RESOLVIDO CONDICIONALMENTE.** Os cenários A/B são comercialmente deliberáveis sem outro plano de arquitetura. Não há vazamento cross-tenant introduzido pelo delta R2. As restrições jurídicas e operacionais de cobrança real ficam para etapa posterior; somente simulador local em M poderá ser autorizado futuramente. O pequeno conflito gate EDT-08 é tratado no relatório `06`, não altera integridade de billing.
