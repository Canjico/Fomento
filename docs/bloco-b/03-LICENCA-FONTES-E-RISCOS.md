# Bloco B — Fontes e riscos residuais

## Tipografia
- Família pretendida nas diretrizes originais: **Anek Tamil**.
- Autor/fonte: [Ek Type, projeto Anek](https://github.com/EkType/Anek).
- Licença: **SIL Open Font License 1.1**. [Texto da licença](https://github.com/EkType/Anek/blob/main/OFL.txt).
- Integração: `next/font/google` em `src/app/layout.tsx`, pesos 400–800 e subset Latin, `font-display: swap`. O Next baixa e empacota os assets na compilação. Não são extraídos do PDF nem servidos pelo Google ao navegador após o build.
- Dependência residual: o runner de build precisa de rede para obter a fonte. Build totalmente offline ainda **não comprovado**; se o gate exigir build sem rede, substituir por pacote/licença versionados e assets locais.
- Nota: o código não altera ou redistribui isoladamente arquivos da fonte; a aplicação usa a família por meio da infraestrutura do framework.

## Design e contraste
- Paleta original `#0A1551 #042E2D #121617 #7CBFE4 #FE6E54` preservada.
- O coral e o azul-claro NÃO são usados com texto branco pequeno, devido à relação de contraste insuficiente; tinta escura sobre esses fundos atende aos pares testados.
- A marca gráfica original NÃO foi reconstruída. O símbolo estilizado em vitrine é puramente decorativo e marcado `aria-hidden`.
- Navegação do admin é apenas prévia de componente isolado, sem rota exposta.

## Riscos para o gate
- Font fetch em rede no build, revisar reprodução CI.
- Contraste e foco em todos os estados reais, inclusive 200/400% zoom.
- Sem inventar identidade visual adicional ou converter catálogo em cards.
- Nenhuma chamada a rede de fontes em runtime, desde que build concluído.
- Responsividade/semântica testadas no desktop e mobile e conferência visual complementar obrigatória.
