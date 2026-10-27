# Convenção para módulos futuros (nenhum módulo funcional em A)

A fundação usa monólito modular. **Não** criar entidades vazias ou services fictícios para simular features. Quando o bloco correspondente for aprovado, estruturar cada módulo sob `src/modules/<nome>/` com:

- `domain/`: invariantes e entidades sem Next, SQL, UI ou IO.
- `application/`: casos de uso, transações explícitas, chamadas a portas.
- `ports/`: interfaces estritas de entrada e saída, sem importar adaptadores.
- `adapters/`: implementações de repositórios/HTTP/integrações somente quando autorizadas.
- `index.ts`: API pública do módulo, sem acesso externo a diretórios privados.

**Regras de importação:** web -> application/index público -> domain/ports; adapters -> ports/domain; domínio nunca importa Next/React/PostgreSQL. Módulos não consultam tabela de outro proprietário sem contrato explícito. A futura CI deverá bloquear importações circulares e caminhos privados. Nenhuma política de tenant ou billing foi concretizada no Bloco A.
