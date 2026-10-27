# Infraestrutura do Bloco A

- `compose.yaml`: dois serviços PostgreSQL locais, sendo o de testes um perfil isolado com dados efêmeros.
- `scripts/db-ping.mjs`: `SELECT 1` sem alteração de schema, executável somente quando o pacote `pg` e o DB estiverem disponíveis.
- `scripts/check-env.mjs`: validação sem dependências, sem saída de segredos.
- `.env.example`: referência para ambiente local. **Nunca importar credenciais em componentes cliente.**

Sem ORM ou migrations neste bloco. A infraestrutura de notificações fica para K (sem Mailpit em A). Não há nenhum servidor de administração funcional.
