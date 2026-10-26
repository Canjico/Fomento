# 08 — Fluxos, navegação, wireframes e identidade visual

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Marca versus interface

**ORIGINAL ID p.2–4:** símbolo `f` manuscrito contínuo, assinatura `fomentoria` e aplicações claro/escuro. **ID p.5:** cores `#0A1551` azul-marinho, `#042E2D` verde-escuro, `#121617` quase preto, `#7CBFE4` azul-claro, `#FE6E54` coral. **ID p.7:** família **Anek Tamil**; aquisição/versão web/licença **NÃO VERIFICADAS**. **ID p.9:** “Onde a inovação encontra recurso.” **ID p.8:** linguagem pictográfica de ícones lineares. **ID p.10–11:** peças de redes sociais, **não wireframes web**. ID p.12–13: aplicações de marca, não requisitos interativos.

**PROPOSTA UI:** azul-marinho para navegação/elementos institucionais; superfícies brancas/off-white com texto escuro; coral para acentos e avisos escolhidos com contraste; azul-claro para detalhes. Preservar forma do logotipo sem redesenhar ou assumir arquivo vetorial extraível. Criar tokens para cor/foco/espaçamento/tipografia a partir de B, sujeitos a auditoria WCAG. Corpo pode usar fallback de sistema até licença web comprovada. Não codificar urgência apenas por cor.

## 2. Mapa de rotas conceitual (não implementado)

| Rota proposta | Público/bloco | Conteúdo principal | Guarda |
|---|---|---|---|
| `/` | público B,E | proposta de valor + listagem prioritária ou atalho catálogo; pesquisa | livre |
| `/editais` | público E | tabela/lista de editais, filtros, ordenação, paginação | livre |
| `/editais/[slug]` | público F | detalhes, ficha, cronograma, fonte e relacionados | somente versão publicada |
| `/entrar` | admin C; cliente G | login contextual ou entradas separadas | sessão e redirect seguro |
| `/cadastro` | cliente G | registro e consentimentos mínimos | validação |
| `/admin` | C,D | painel interno, fila, meus rascunhos | papel editorial |
| `/admin/editais/novo` | D | formulário editorial | editor |
| `/admin/editais/[id]/revisoes` | D | comparação de versões, decisão | reviewer/publisher |
| `/app` | cliente G | dashboard/resumo | sessão+organização ativa |
| `/app/favoritos` | H | meus salvos | dono, D-02 |
| `/app/calendario` | J | eventos/checklists | membership+entitlement |
| `/app/notificacoes` | K | preferências e consentimentos | titular |
| `/planos` | L | comparação | livre ou logado |
| `/checkout` | M | simulação sem pagamentos reais | cliente+contexto |
| `/parceiros/envios` | O | submissão moderada | parceiro autorizado |
| `/blog` | P | editorial | livre |
| `/instituicoes/*` | T,U | gestão B2B | entidade/role específico |

Rotas são PROPOSTA. Não produzir `sitemap` público ou páginas operacionais neste bloco.

## 3. Wireframe descritivo: catálogo em **linhas**, não mural de cards

```text
┌ LOGO Fomentoria ─ Buscar ─ Editais ─ (Entrar / Área do cliente futuro) ┐
│ Onde a inovação encontra recurso.                                    │
│ Buscar [título ou instituição________________] [Pesquisar]             │
│ Filtros: Setor [v] Estágio [v] Tipo [v] Região [v] Status [v]        │
│ Chips ativos [Indústria ×] [Sudeste ×] [Limpar]                       │
├ Resultados: N    Ordenar [Prazo v] ────────────────────────────────────┤
│ Instituição │ EDITAL / tags                           │ Valor │ Prazo │
│ Fonte A     │ Título A · tags                          │ --    │ 20/11 │
│ Fonte B     │ Título B · tags                          │ R$... │ Indef.│
│ Fonte C     │ Título C · tags                          │ --    │ Fechado│
├ Próximo / Anterior; N resultados; itens por página ───────────────────┤
│ Aviso: informações indicativas. Confira o edital na fonte oficial.    │
└───────────────────────────────────────────────────────────────────────┘
```

Cada linha tem área clicável sem transformar tabela em card. Filtro combinável expressa interseção, input preserva consulta ao paginar, teclado e leitor de tela recebem rótulos. Botão estrela: antes de H, usar ação informativa desabilitada ou login/roadmap honesto, nunca persistir favorito. Estado sem resultados sugere limpar filtros; erro de fonte não desestrutura a lista.

## 4. Wireframe descritivo: detalhe público

```text
Breadcrumbs Início / Editais / Título
[Instituição verificada?]  TÍTULO       [tipo][setor][estágio]
[Status inscrição: Aberto? / Suspenso / Indefinido] [Fonte checada: data]
┌ Texto/descrição      ┐   ┌ Ficha técnica (sticky desktop) ┐
│ Requisitos           │   │ Valor / Região / Prazo / TZ    │
│ Elegibilidade*       │   │ Última checagem + ressalva      │
│ Uso do recurso       │   │ [Ir ao site oficial ↗]          │
│ Cronograma           │   └─────────────────────────────────┘
│ Documentos exigidos  │
│ Retificações         │
│ Fontes e histórico público resumido
│ Editais relacionados (lista)
└──────────────────────┘
*Compatibilidade não é confirmação oficial de elegibilidade.
```

CTA confirma destino e utiliza práticas seguras para links externos; URL inválida/inexistente gera aviso e não link enganoso. `Verificado` refere à checagem da URL/fonte/documento, não endosso governamental. Em mobile, ficha empilha acima/abaixo de texto e CTA permanece acessível sem sobreposição.

## 5. Wireframe descritivo: administração

```text
[Logo] Catálogo | Rascunhos | Em revisão | Publicados | Histórico | Conta
[+ Novo edital]  [Busca interna] [Filtro por autor/estado/fonte]
Linha: Título | Editado | Autor | Estado editorial | Fonte | Ações permitidas
Editor: Formulário -> Salvar draft -> Enviar revisão
Revisor: Diferenças vN → vN+1 -> Aprovar / Pedir ajuste / Rejeitar
Publisher: Ver versão aprovada -> Publicar / retificar / arquivar
Conflito 409: Sua versão está desatualizada; rever mudanças antes de salvar.
```

Criação manual com tags e seleção de taxonomia, não campo livre sem normalização; formulário mostra campos essenciais, origem, prazo desconhecido e campos ausentes; ações não autorizadas não aparecem e **também** são bloqueadas no servidor.

## 6. Fluxos futuros cliente, planos e checkout (desenho, não MVP)

`Cadastro/Entrar → escolher/solicitar vínculo de empresa → confirmar contexto → perfil de compatibilidade → favoritos pessoais segundo D-02 → recomendações indicativas → checklist/calendário → configurações de notificação/consentimento → planos → checkout simulado → confirmação verificada → área do cliente`. No Assessoria, convite de usuários e seleção explícita de cliente. Em checkout: dados empresa/CNPJ, resumo, cupom, método simulado e estados; não exibir pagamentos reais como concluídos.

## 7. Estados de interface e mobile

| Estado | Reação | Acessibilidade |
|---|---|---|
| Loading | skeleton da lista sem alterar filtros | `aria-busy`, texto de carregamento |
| Empty | “Nenhum edital encontrado” + limpar | título de região e foco estável |
| Error | erro contextual sem perda dos filtros | role alert sem spam de anúncio |
| Unverified | “Fonte ainda não verificada/checagem vencida” | texto, não só ícone/cor |
| Closed/suspended | texto de prazo e CTA adequado | status legível por leitor de tela |
| Conflict admin | diff de versões e ação de recarregar | foco no conflito; não descartar digitado |
| Forbidden | 403/404 genérico sem expor dados | caminho de retorno |
| Limite de favoritos | explicação do teto e planos futuros | não atribuir cobrança indevida |

**Desktop:** filtros visíveis na lateral/topo, linhas responsivas e colunas sem truncar informação crítica. **Mobile:** filtros em painel colapsável com contagem, cada item permanece uma **linha/list item vertical**, não grid de cards; campos valor/prazo em segunda linha acessível. Nenhuma funcionalidade essencial exclusiva de hover. **A11y PROPOSTA:** WCAG 2.2 nível AA, contraste medido entre tokens reais, ordem semântica, foco visível, zoom 200/400%, botões ≥ alvo mínimo apropriado, labels, erros descritos, navegação teclado e teste de leitor de tela. Nenhum teste visual/contraste automático foi executado neste Bloco 0.

## 8. Roteiros mínimos por persona

Visitante: filtros → resultado → detalhe → origem; Administrador: login → draft → revisão → publicação → histórico; Fundador: salvar no H com conta; Gestor: checklist no J; Consultor: troca A/B sem vazar filtros privados; Parceiro: submissão O e status de moderação; Operador: triagem/auditoria O. Ver `11` para resultados esperados.

## R1 — correções de UX/fluxo ligadas aos contratos (AUD-01/03/06/12/13)

- **Salvos RF04:** rótulo `Meus editais salvos` e indicador de cota pessoal Free; não usar cartão compartilhado como se pertencesse à empresa. Se D-02 selecionar benefício contextual, explicitar contexto/escopo em todos os controles e contadores; troca de empresa invalida resultados de ENT sem alterar titular pessoal. Após revogação, o usuário mantém link ao edital público e não vê etiquetas, anotações nem dados da antiga empresa; tela de recuperação/exportação só pessoal.
- **Listagem/detalhe públicos:** cada resultado deriva do mesmo `published_revision_id`; uma revisão pendente não altera título, valor, filtro, status temporal editorial ou documentos publicados. Badges separados: estado temporal, atualização da fonte, urgência; fonte indisponível não vira `Encerrado` nem desaparece sem critério.
- **Painel admin D:** separar fila `Revisões editoriais` (editor→reviewer→publisher), `Checagem diária` (fonte, última conclusão, pendência, operador), `Histórico` (conforme `audit_reader/platform_operator`) e futura fila `Submissões de parceiros` no O. Botão publicador precisa aceitar revision/version e recusar obsoleto, mostrar conflito `409`, não sobrescrever.
- **Conta e billing futuros:** Free, Pro e Assessoria visíveis como **referência**, mas plano pago só concedido após M e confirmação simulada; qualquer método externo real fica ausente. Botões ainda não implementados exibem indisponibilidade clara em vez de salvar/cobrar de mentira.
- **Estados de falha:** `sessão revogada`, `empresa sem autorização`, `cota esgotada`, `revisão desatualizada`, `fonte não checada hoje`, `link indisponível` com texto e ícone, nunca só cor; telas mobile preservam coluna principal de lista em linhas com informações progressivamente empilhadas.

**Acessibilidade:** foco visível, heading estruturado, nome de controles, contraste a ser medido com componentes reais, teclado de ponta a ponta, sem confundir visual da campanha do PDF com wireframe web. Anek Tamil e marca são fontes visuais, não autorização de uso de fonte web nem a11y aprovada. Casos de aceite `UX-R1-01..06` referenciam contratos de `04/05/09`.

## R2 — Jornada de contratação alternativa (R1-06)

**A (original, padrão documental para UX até deliberação):** `Planos → selecionar Pro/Assessoria → identificar Organization e papel financeiro → razão social/CNPJ/setor/estágio → simulador futuro M → confirmação validada → direitos ENT`. Usuário sem empresa mantém Free e recebe opção de criar/vincular empresa, sem checkout pago imediato. **B (extensão, NÃO APROVADA):** bifurcação explicitamente rotulada `Pessoal / Empresa` antes do cadastro; pessoal solicita dados adequados legalmente, nunca CNPJ inventado, e não herda direitos para organizações. Estados `sem autorização`, `membership revogado`, `sem confirmação`, `cota excedida`, `cancelamento` e `downgrade` precisam de cópias legíveis. Dez jornadas no relatório `05-CHECKOUT-ALTERNATIVAS.md`.
