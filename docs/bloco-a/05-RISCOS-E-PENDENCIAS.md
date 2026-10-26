# Riscos e pendências do Bloco A

| ID | Gravidade | Estado | Consequência | Resolução objetiva e gate |
|---|---|---|---|---|
| A-BLK-01 | ALTO / ambiente | npm registry indisponível (`EAI_AGAIN`) | Dependências não instaladas, sem lockfile, build/typecheck/lint/Vitest/E2E não comprovados | instalar em host conectado, gerar lockfile, rodar suíte e anexar logs; antes da auditoria final A |
| A-BLK-02 | ALTO / ambiente | Docker/Compose ausentes | PostgreSQL e isolamento DB não executados | subir ambos serviços, validar healthcheck, `db:ping` dev/test e reinício; antes da auditoria A |
| A-BLK-03 | MÉDIO | Navegador Playwright e pacote não instalados | E2E não executado | instalar Chromium e rodar E2E desktop/mobile; antes da auditoria A |
| A-RSK-04 | MÉDIO | Versões declaradas sem resolução de peer deps/lockfile | Compatibilidade operacional não provada | `npm install`, lock e testes com exit 0; auditoria A |
| A-RSK-05 | BAIXO | Imagem `postgres:17-alpine` por tag | Variação futura do patch | fixar digest após primeira extração confiável; auditoria A |
| A-RSK-06 | MÉDIO | Fronteiras modulares apenas documentadas | Futuro import privado indevido | checar arquitetura/lint de fronteiras antes do primeiro módulo real; gate C/D |
| A-RSK-07 | BAIXO | Anek Tamil e marca não incorporadas | Tela técnica não é UI final | validar licença e design system apenas no B |
| A-RSK-08 | MÉDIO | Correção EDT-08 não foi auditada independentemente nesta execução | risco documental residual | auditor independente conferir `EDT-08` e adendo no gate A |

**Sem autorização comercial:** D-02/D-26, ownership, planos e demais decisões futuras permanecem pendentes. Nada autoriza B automaticamente.
