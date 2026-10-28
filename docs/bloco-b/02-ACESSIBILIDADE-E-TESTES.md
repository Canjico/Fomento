# Bloco B — Acessibilidade e protocolo de evidências

**Meta:** WCAG 2.2 AA para os controles e telas materializados no Bloco B (não certificação integral).

## Testes automatizados adicionados
1. Skip link recebe o primeiro foco via Tab.
2. Navegação aponta para seções reais, não rotas de features fictícias.
3. Menu mobile usa `details/summary`, com navegação visível após interação.
4. Viewport de 375 px não produz rolagem horizontal.
5. Pares de tokens de texto em papel e tinta sobre coral/azul-claro têm contraste >=4.5:1. Esses testes de tokens não substituem inspeção de todas as combinações/composição.
6. Rotas administrativas e login ainda retornam 404.

## Revisão manual exigida
- 375/768/1280 px, zoom a 200% e 400%, navegação sem mouse, foco visível e sem trap.
- Contraste real em botões, textos reduzidos, bordas e status; ícones nunca são a única informação.
- Interação com menu aberto/fechado e leitores de tela onde disponível.
- Sem falsos controles: CTA vai somente para âncoras existentes; menu e rodapé seguem navegáveis.
- Visuais em linhas, não cards nem falsos resultados.

O teste de contraste de tokens não mede automaticamente todos os pixels ou pares possíveis. Registrar evidências reais e qualquer limitação antes de liberar o gate.

## Cobertura complementar
- Vitest inspeciona semântica dos estados reutilizáveis: `status`/ `aria-busy` no carregamento, `alert` no erro, chips não interativos e labels dos campos.
- Playwright verifica ausência de rolagem horizontal a 320/375/768/1280 px, além dos testes anteriores.
- Quatro capturas de página completa são anexadas ao relatório HTML no GitHub Actions e servem para revisão humana do layout. Viewport 320 px é um proxy útil de reflow, **não equivale a teste de zoom real a 400%**.
- A revisão humana de aparência, zoom real, foco e leitor de tela permanece documentada como limitação para aceite.
