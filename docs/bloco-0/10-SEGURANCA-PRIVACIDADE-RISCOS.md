# 10 — Threat model, segurança, privacidade e riscos

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Escopo de proteção e premissas

Ativos: catálogo publicado confiável, drafts/admin, sessão e permissões, dados empresariais, favoritos pessoais, convites, assinaturas, eventos financeiros simulados, documentos e candidatos B2B. Fronteiras: internet futura→UI/HTTP; visitante→admin; usuário→organização A/B; editor→publicador; parceiro→moderação; fonte externa→ingestão; simulação→billing; candidato→avaliador. **ORIGINAL:** não armazenar cartão, gateway PCI-DSS futuro, LGPD, disponibilidade e atualização (REQ p.3 §6). Demais controles são PROPOSTAS.

Critérios: impacto `Alto` = vazamento, perda/integridade, dinheiro/visibilidade; `Médio` = interrupção controlada; probabilidade qualitativa `Alta/Média/Baixa` sem evidência empírica. Prioridade `Crítico` para impacto alto e exposição plausível. Não transformar essa classificação em auditoria de exploração real.

## 2. Matriz de ameaças

| ID | Ameaça / ativo | Impacto | Prob. | Mitigação PROPOSTA | Cenário adversarial / gate |
|---|---|---|---|---|---|
| T-01 | IDOR em editais privados, salvos e checklist | Alto | Alta | autorização por dono+contexto e policy no servidor | AUTH-01/02; G,H |
| T-02 | Vazamento cross-org por cache/query/documento | Alto | Alta | escopo tenant em queries, cache keys tenant-aware, teste A/B | AUTH-07/09; G,N,T |
| T-03 | Elevação papel por body/client claims | Alto | Alta | papéis só memberships atuais no servidor, deny-default | AUTH-04/05; C,G |
| T-04 | Publicação ou retificação sem aprovação | Alto | Média | estados + version/guardas e revisão D-07 | EDT-03/06; D |
| T-05 | XSS por descrição de edital/blog | Alto | Média | sanitização contextual, CSP futuro, sem HTML bruto arbitrário | inserir payload inerte de teste, E/F/P |
| T-06 | SQL/NoSQL injection e filtros malformados | Alto | Média | queries parametrizadas, parser/schema input, allowlist sort | filtros maliciosos, E/S |
| T-07 | CSRF em sessão cookie | Alto | Média | SameSite/CSRF token quando aplicável, Origin/Referer defense | POST de origem falsa; C |
| T-08 | Roubo/replay de sessão e reset | Alto | Média | cookie HttpOnly/Secure em prod, TTL/revogação, tokens hash e rotação | logout e sessão antiga; C/G |
| T-09 | Replay webhooks fake / fraude financeiro | Alto | Alta | verificação de origem, event ID único, transação e conciliação | BIL-04/05; M |
| T-10 | Alterar plano/billing por cliente | Alto | Alta | entitlement derivado de evento confirmado, ownership org | BIL-01/03, AUTH-05; L/M |
| T-11 | Condição de corrida no limite de 3 e 5 membros | Médio/Alto | Alta | unicidade, locks/serializabilidade conforme desenho | ENT-01 e AUTH-06; H/N |
| T-12 | Corrida na revisão/publicação | Alto | Média | optimistic locking e revisão aprovada imutável | EDT-04/07; D |
| T-13 | Download/URL de documento privado | Alto | Média | autorização per-object, path-safe, malware checks futuro | AUTH-09; J/N/T |
| T-14 | SSRF ao validar URL de fonte/importação | Alto | Média | allowlist/domínios/sem fetch no MVP; bloqueio IP interno | SRC-01; R |
| T-15 | Vazamento PII em auditoria/log/telemetria | Alto | Alta | redaction, princípios de minimização, política de acesso | LOG-01; C,V |
| T-16 | Retenção excessiva/deleção incorreta de dados LGPD | Alto | Média | mapa de finalidades/bases, export/retificação/tombstone, jurídico | PRIV-01; G,V |
| T-17 | Conteúdo fonte defasado/URL falsa | Alto | Alta | proveniência, checagem diária manual registrada, avisos | SRC-03, TIM-05; D–F |
| T-18 | Dados fictícios confundidos com reais | Médio/Alto | Média | marca “DEMONSTRAÇÃO / FICTÍCIO” e domínios `.invalid` | MVP-03/09; D/F |
| T-19 | Enumeração login/convite | Médio | Alta | respostas homogêneas, rate limiting, anti-automation futuro | AUTH-11; C/G |
| T-20 | B2B avaliador acessa inscrição não atribuída | Alto | Alta | `institution_id`+`application_id`+assignment no backend | B2B-01; U |
| T-21 | Promessa de SLA/99,5% sem operação real | Médio | Alta | registrar como requisito pós-produção; monitorar quando houver | RNF02; V/pós-V |
| T-22 | Fonte externa maliciosa introduz dados no catálogo | Alto | Média | candidate→fila→revisor, nenhuma autopublicação | ING-01; R |

## 3. Políticas de confiança e autorização

- Admin desde C; visitante anônimo nunca recebe rota/metadata de draft. Permissões e ownership validados por caso de uso, não componente UI.
- Documentos futuros têm classe público/privado, backend valida download, expires e logs; anexos desconhecidos não são importados/executados.
- Cookie/CSRF dependem de mecanismo final de auth; tratar D-01 e decisão de sessão antes do C.
- Logs e trilha append-only de fatos críticos com autoria e versões; restringir visibilidade, minimizar PII. “Append-only” lógico não significa armazenamento à prova de adulteração sem controles operacionais adicionais.
- Dependências de terceiros não serão acionadas durante Bloco 0 nem MVP local salvo autorização futura específica.

## 4. LGPD — planejamento, não certificado

| Categoria | Titular/controle conceitual | Finalidade proposta | Retenção / exclusão |
|---|---|---|---|
| User, email, credencial | usuário; Fomentoria controladora a confirmar juridicamente | autenticação e suporte | prazo não definido; hash e minimização |
| Perfil e CNPJ, membros de empresa | usuários e pessoa jurídica | compatibilidade, equipe, billing | validar bases legais e política contratual |
| Preferências/consentimentos | pessoa | canal e finalidade específicas | trilha de consentimento/retirada; prazos a decidir |
| Históricos de pagamentos | titular financeiro | contabilidade e reconciliação | obrigações fiscais/legais definir com jurídico |
| Auditoria de ações | atores de operação | segurança/integridade | anonimização/retificação com trilha, retenção deliberada |
| Dados de candidaturas B2B | candidato/empresa/instituição | processo seletivo futuro | definir papéis controlador/operador antes de T |

Fluxos a desenhar em G/V: aviso de privacidade, opt-in granular quando aplicável, exportação de dados, correção, eliminação quando permitida, revogação, incidente, contato encarregado e registro de finalidade/bases legais. **Não** afirmar conformidade LGPD verificada por documentação; validação jurídica e operação real pendentes.

## 5. Separação do que é verificável localmente

| Verificável no futuro local | Não certificável apenas local |
|---|---|
| autorização contra bypass, IDOR, replay, CSRF controlado, XSS em fixtures, SQL injection com testes, concorrência, logging redigido, teste de restauração de DB | SLA público 99,5%; segurança CDN/TLS/segredos em cloud; PCI-DSS do gateway e integração real; entregabilidade e-mail/WhatsApp; contratos externos; conformidade LGPD jurídica; checagem real diária de terceiros; scanners/monitoramento real |

## 6. Riscos residuais e gates

`RR-01` possibilidade de fonte manual desatualizada (Alto, D–F); `RR-02` política de retenção indefinida (Alto, G/V); `RR-03` exceção “mesma pessoa publica” (Alto, C/D); `RR-04` fonte indisponível confundida com edital aberto (Alto, D/F); `RR-05` ambiguidade favorites versus organizacional (Alto, G/H); `RR-06` canal imediato prometido sem suporte (Médio, K/Q). **Bloqueia implantação** se restar bypass, fonte sem proveniência ou liberação por pagamento falso; **não bloqueia escrever este pacote**.

## R1 — controles vinculados aos achados e critérios observáveis

| Risco | Mitigação proposta | Teste planejado / bloco | Residual e gate |
|---|---|---|---|
| Favoritos multi-org/cota via race (AUD-01/02/13) | usuário dono, contexto tipado, membership revalidado, índice compatível NULL, quota em transação | AUTH-02/03 e ENT-01/02; G/H | Médio até D-02/D-26 e isolamento DB real aprovados |
| Rascunho vaza conteúdo publicado (AUD-03) | `published_revision_id` aponta snapshot completo, escrita CAS + projeção/reindex atômica | EDT-04/07; D/F | Alto até D-06 e teste concorrência |
| Políticas paid antecipadas (AUD-04/14) | ENT FREE no H; billing confirmado só em M, BillingSubject tipado | ENT-03 BIL-01..05; H/L/M | Alto até decisões e mock autenticado |
| RNF06 não comprovado (AUD-06) | controle diário de denominador, tentativas≠verificado, operador/substituto nomeados | SRC-01..07; D–F | Alto operacional se equipe não cumprir |
| Enumeração de convite/conta (AUD-07) | respostas genéricas, comparar latência e logs, rate limit proposto pendente | AUTH-11; C/G | Médio por timing até teste real |
| Supressão alerta cruzando organizações (AUD-10) | delivery key tipada non-null + consentimento contextual e retries | NTF-01..06; K/Q | Médio até jobs locais |
| Parceiro publica indevidamente (AUD-11) | decisão partner separada, candidate editorial e nenhuma delegação publisher | MOD-01..03; D/O | Médio até implementação e auditoria negativa |
| Leitura/export de AuditEvent excessiva (AUD-12) | audit_reader read-only por escopo, mask, audit de leitura/export, dual control | AUTH-12..15; C/D/O | Médio até política de retenção e testes |

**LGPD:** append-only de eventos de negócio não implica retenção eterna de PII; proposta separar identificador técnico e payload pessoal com política de minimização/pseudonimização/tombstone e expurgo permitido sob base legal e prazo ainda a serem ratificados. Hash de log com PII não é anonimização jurídica automática. **RNF02 = disponibilidade 99,5% de produção**, não certificável localmente; o identificador antigo divergente foi descontinuado, sem criar segundo teste. Nenhuma conformidade ou proteção dinâmica foi testada neste R1.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.

## R2 — Ameaça de enumeração com experimento isolado (R1-04)

`AUTH-11` no `11` §R2 usa duas fases independentes. A amostragem de tempos sem rate limit contaminante não é justificativa para remover limitação em produção; proteção real deve ficar ativa. A fase B testa 429, resets, chave de limite e não revelação. Nenhuma política de rate limit, métrica estatística ou conformidade foi aprovada; roteiros são **NÃO EXECUTADOS**.
