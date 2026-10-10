# Regra 6 — Banco de dados, Supabase e SQL

## Antes de alterar
Inspecione migrations, schema, índices, constraints, triggers, views, funções/RPCs, tipos gerados, políticas RLS e consultas consumidoras. Confirme ambiente local/staging/produção antes de executar comandos com efeitos persistentes.

## Migrações
Versione mudanças em migrations revisáveis. Prefira alterações compatíveis em etapas: adicionar estrutura, migrar dados, atualizar consumidores e só depois remover campos antigos em uma mudança autorizada. Considere transações, lock timeouts, índices, volume de tabela, rollback e janela de indisponibilidade. Não edite produção diretamente fora do fluxo aprovado nem reescreva histórico de migrations aplicadas sem plano de recuperação.

## Supabase e RLS
Para tabelas expostas pela Data API, avalie grants e habilite RLS conforme o modelo de acesso. Escreva políticas por operação e teste permitir e negar SELECT/INSERT/UPDATE/DELETE para cada papel relevante. RLS não substitui autorização de negócio e não torna uma service-role key segura no browser. Nunca exponha credenciais privilegiadas ao cliente.

## Performance e integridade
Use constraints para invariantes de dados, índices baseados em consultas reais e EXPLAIN/ANALYZE em ambiente adequado. Evite N+1, transações longas e consultas sem paginação em conjuntos grandes. Não adicione índices indiscriminadamente: eles aumentam custo de escrita e armazenamento. Verifique chaves estrangeiras, unicidade, nulabilidade e concorrência.

## Testes e comandos
Use a CLI e versão documentadas pelo projeto. O fluxo Supabase pode incluir `supabase migration list`, `supabase db reset`, `supabase test db` e, após revisão/autorização, `supabase db push`. Nunca execute reset ou push remoto sem confirmar o alvo e os efeitos. Valide migrations em banco local descartável e mantenha backup/rollback quando o risco exigir.

## Referências oficiais
- Database overview: https://supabase.com/docs/guides/database/overview
- Migrations: https://supabase.com/docs/guides/deployment/database-migrations
- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Secure data: https://supabase.com/docs/guides/database/secure-data
- pgvector e busca semântica: https://supabase.com/docs/guides/ai
- PostgreSQL docs: https://www.postgresql.org/docs/

## Aceite
[ ] Migration versionada e revisada. [ ] RLS/grants avaliados. [ ] Testes allow/deny executados. [ ] Tipos e consumidores atualizados. [ ] Plano de rollback e impacto documentados quando necessário.
