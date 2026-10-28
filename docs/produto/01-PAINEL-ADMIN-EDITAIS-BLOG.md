# Requisito de produto — Painel administrativo de conteúdo

**Registrado:** 28/10/2026 — esclarecimento explícito do responsável pelo produto.
**Status:** requisito funcional confirmado; detalhamento de engenharia e gates por bloco ainda necessários.
**Referências existentes:** `docs/bloco-0/02-PRD-E-ESCOPO.md`, `docs/bloco-0/08-FLUXOS-E-UX.md`, `docs/bloco-0/12-ROADMAP-REVISADO.md` e matriz de decisões `03-DECISOES-E-CONFLITOS.md`.

## 1. Intenção confirmada

A Fomentoria precisa de **uma área administrativa centralizada, protegida por autenticação e autorização**, onde operadores autorizados consigam gerenciar, sem alterar o código-fonte, os dois tipos principais de conteúdo:

1. **Editais:** cadastrar, editar, excluir/retirar de circulação e publicar oportunidades, inclusive documentos e hiperlinks relevantes.
2. **Blog:** cadastrar, editar, excluir/retirar de circulação e publicar artigos editoriais.

Esse pedido é uma confirmação de funcionalidades do produto, **não uma autorização para implementá-las no Bloco B nem para expor /admin sem autenticação**.

## 2. Navegação administrativa pretendida

Uma única entrada administrativa, após autenticação, organiza seções coerentes:
- **Editais:** listagem editorial, criar novo, rascunhos, em revisão, publicados, arquivados e histórico.
- **Blog:** artigos, novo artigo, rascunhos, publicados, arquivados, categorias e mídias.
- **Mídias/documentos:** referências ou anexos vinculados a edital/artigo, respeitando autoria, revisão, validação e permissões.
- **Auditoria/Configurações:** histórico de ações e administração de privilégios conforme política de acesso decidida no Bloco C.

Evitar painéis de acesso distintos e desconectados quando uma navegação única é suficiente. Itens futuros não devem parecer funcionais antes de implementados.

## 3. CRUD editorial de editais — Bloco D

**Operações exigidas pelo produto:**
- Criar edital e salvar rascunho.
- Editar informações essenciais: título, instituição/fonte, descrição, setor, categoria/modalidade, elegibilidade, valores, abrangência, cronograma, prazos, situação temporal, documentos e requisitos.
- Associar **múltiplos links** com descrição e finalidade (fonte oficial, edital original, anexos, retificações e páginas relacionadas). Toda URL externa deve ser validada; distinguir link oficial de fonte não verificada.
- **Anexar ou referenciar documentos** relevantes, incluindo PDFs, termos e formulários, com nome, origem/proveniência e vínculo à revisão do edital. Permitir substituição por nova versão sem corromper o registro publicado.
- Publicar/despublicar/arquivar, com permissões específicas e revisão/histórico do conteúdo.
- Excluir conteúdo na experiência administrativa, distinguindo **retirada pública / exclusão lógica** de **destruição definitiva**. Para editais já publicados, preservar a trilha de auditoria; regras finais de exclusão física e retenção devem ser ratificadas antes da implementação.
- Oferecer busca/filtros internos, paginação, feedback de salvamento, confirmação de ações destrutivas, tratamento de edição concorrente e indicador de estado editorial.

**Contratos críticos:** não permitir publicação sem autorização; separar rascunho da revisão publicada; não modificar silenciosamente uma revisão já publicada; auditabilidade e proveniência são obrigatórias.

## 4. CMS de blog — Bloco P

**Operações exigidas pelo produto:**
- Criar artigo, salvar rascunho, visualizar prévia, editar, publicar, despublicar, arquivar e excluir com confirmação.
- Editor de conteúdo formatado (títulos, parágrafos, listas, destaques, hiperlinks, imagens) com **sanitização** para prevenir XSS.
- Campos de título, resumo, slug, categorias/tags, capa/imagens, conteúdo, autor, status, datas editoriais, metadados SEO e referência às mídias vinculadas.
- Lista administrativa com busca, filtros, ordenação e histórico de alterações; páginas públicas só exibem versões publicadas.
- Upload ou referência de mídia com validação de tipo/tamanho, controle de acesso e cuidados de direitos autorais; sem permitir HTML ou arquivos executáveis arbitrários.

**Contrato crítico:** modificar um artigo publicado não deve tornar conteúdo não revisado automaticamente público quando a política editorial exigir aprovação. As regras de papéis, revisões e retenção seguem a matriz de decisões antes do bloco correspondente.

## 5. Segurança e armazenamento

- Toda ação administrativa exige sessão real e autorização **no servidor**; não basta ocultar botões.
- Registros de criação, atualização, publicação, despublicação e exclusão devem gerar trilha de auditoria.
- Uploads: validar tipo real (não apenas extensão), tamanho, nome e destino; impedir execução de conteúdo recebido e acesso não autorizado a documentos privados.
- Arquivos públicos e privados não podem ser confundidos; preferir armazenamento local controlado no MVP e contrato de armazenamento substituível, **sem assumir serviços externos, produção ou upload público livre**.
- Links externos: esquemas permitidos, proteção contra destinos perigosos, vínculo explícito com fonte e indicação de abertura externa.
- Retenção física/recuperação de exclusões e níveis de privilégio são detalhes que devem ser fechados antes dos migrations e endpoints do respectivo bloco.

## 6. Distribuição entre blocos (sem antecipação)

| Bloco | Responsabilidade |
| --- | --- |
| **B** | Design system e cascas visuais; nenhum admin funcional |
| **C** | Login administrativo, sessões, permissão server-side e guarda de rotas |
| **D** | Gerenciamento completo de editais, revisões e referências/documentos aprovados no escopo |
| **E–F** | Consumo público seguro: lista, filtros, detalhe e documentos/links autorizados |
| **O** | Backoffice/moderação de parceiros; sem implementação de blog nesse bloco |
| **P** | CMS completo de blog no mesmo painel administrativo, com artigo público correspondente |

**Observação de prioridade:** caso seja desejado disponibilizar o blog antes do Bloco P, isso exige **decisão explícita de replanejamento de dependências e gates**. Este documento não antecipa o CMS por omissão.

## 7. Testes e aceite futuros

Verificar com evidências automatizadas e revisão:
- Um operador autorizado cria/edita/publica e arquiva conteúdo; visitante ou operador sem privilégio não consegue.
- Editais publicados mantêm `published_revision_id` estável até nova publicação aprovada.
- PDF/link inválido ou perigoso não é publicado; acesso a documento privado é negado.
- Exclusão de publicação não elimina trilha editorial; ações destrutivas exigem confirmação.
- Blog mantém rascunhos fora da área pública, sanitiza conteúdo e valida slug, mídia e links.
- Regressões em catálogo, permissões e histórico não são permitidas.

**Governança:** os arquivos originais do Bloco 0 permanecem como histórico; este documento adiciona o esclarecimento do proprietário sem substituir a matriz D-01–D-28. O Bloco B não recebe funcionalidade administrativa por causa deste adendo.
