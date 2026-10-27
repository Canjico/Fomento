# Bloco B — plano de implementação e gate

**Origem:** `docs/bloco-0/12-ROADMAP-REVISADO.md` § Bloco B e `docs/bloco-0/08-FLUXOS-E-UX.md`. **Base:** `main` com gate A aprovado no PR #1. **Estado:** aberto para implementação; sem aceite B.

## Objetivo
Transformar a identidade Fomentoria em design tokens e componentes acessíveis, com cascas de navegação para visitantes e para a futura administração, preservando a honestidade sobre recursos ainda não disponíveis.

## Decisão técnica D-27 — fonte Anek Tamil
A família **Anek Tamil** está licenciada sob **SIL Open Font License 1.1**, conforme [repositório do autor EkType/Anek](https://github.com/EkType/Anek/blob/main/README.md) e [OFL.txt](https://github.com/EkType/Anek/blob/main/OFL.txt). O uso web é permitido nos termos dessa licença. Para o projeto, distribuir a fonte por pacote de fornecedor confiável e versionado, preferencialmente com assets locais e aviso de licença; **não** usar ativos retirados do PDF de identidade, nem compartilhar ou revender arquivos de fontes isoladamente. Se a aquisição não for reproduzível, usar fallback do sistema e registrar bloqueio de aceite, sem declarar Anek aplicado.

## Tokens e identidade
- Azul-marinho `#0A1551`, verde-escuro `#042E2D`, quase preto `#121617`, azul-claro `#7CBFE4`, coral `#FE6E54`.
- Tokens semânticos de superfície, texto, borda, foco, erro, avisos, tipografia, espaçamento e raios. Usar estados legíveis sem depender exclusivamente de cor.
- Respeitar o símbolo original; não improvisar logotipo por SVG ou recriar a marca sem fonte de arte autorizada. Assinatura textual temporária é permitida, desde que identificada como tal.

## Entregáveis de B
1. Design tokens CSS, tipografia web com licença registrada, componentes de navegação, botão, campo, chip, badge semântico, feedback e estados de carregamento/vazio/erro.
2. **Shell público** responsivo na rota `/`, com título e promessa da marca, navegação coerente e estado honesto de catálogo vazio. **Sem** CRUD/busca real/dados ou inscrições fictícias.
3. **Shell admin apenas como componente de apresentação/teste**, não exposto em rota `/admin`. Até o Bloco C, `/admin`, `/api/admin` e `/login` continuam 404.
4. Preparação da experiência de lista em **linhas**, nunca mural de cards; fixtures apenas em testes/histórias isoladas, claramente identificadas como demonstrativas.
5. Testes automatizados com Playwright para teclado, foco visível, viewport mobile e desktop, 404 das rotas restritas, e teste de contraste de tokens; inspeção visual/manual complementar.
6. Documentação de arquitetura visual, licença, roteiro de testes, evidências, riscos e handoff para auditoria independente.

## Exclusões e segurança
- Sem autenticação, endpoints admin, banco de domínio, migrations, cadastro, catálogo real, busca, favoritos, billing, integrações externas, deploy ou publicações.
- Sem alucinar prazos, valores, inscrições ou fontes reais.
- Preservar todo o histórico funcional do Bloco A; testes anteriores devem continuar verdes.

## Critérios de aceite/gate
- Instalação reproduzível em `npm ci`; lint, typecheck, unit, build, E2E e `docs:gate` aprovados.
- Navegação somente para rotas existentes, sem botão aparentar funcionalidade futura.
- Contraste de pares de tokens medido; foco/teclado e zoom/mobile comprovados; texto semanticamente nomeado; cabeçalhos e links corretos.
- Layout de listagem por linhas, sem cards; estados vazio/erro/carregamento honestos e acessíveis.
- Licença da fonte e proveniência registradas; limitações explícitas.
- Auditoria por revisão separada + CI reproduzida no PR, sem autoaceite. **Bloco C bloqueado até gate B.**

## Riscos monitorados
- Contraste especialmente do coral e do azul-claro em superfícies claras.
- Fonte não carregada de maneira estável/offline.
- Shell admin exposto publicamente sem autenticação.
- Links/ações falsas para recursos ainda não implementados.
- Deriva do layout tabular para cards no mobile.
