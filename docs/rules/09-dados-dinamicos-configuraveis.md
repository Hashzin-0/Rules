# Regra 9 — Dados dinâmicos e conteúdo configurável

## Fonte da verdade
Dados que mudam por usuário, catálogo, schema ou configuração devem vir da fonte de verdade existente, não de listas duplicadas no frontend. Descubra tabelas, colunas, categorias e permissões por APIs ou metadados explícitos quando apropriado. Não faça introspecção indiscriminada se uma API tipada for mais segura e estável.

## Configuração segura
Diferencie configuração do sistema, preferências do usuário e estado transitório. Valide opções fechadas contra allowlist no servidor. Para conteúdo configurável, defina schema, limites, versões e migração. Não execute JavaScript arbitrário nem aceite HTML/URLs perigosas.

## Persistência
Se o produto promete sincronização entre dispositivos, use o mecanismo de persistência já adotado e associe preferências ao usuário autenticado. Diferencie armazenamento local, nuvem e cache. Preserve ordem e visibilidade de widgets/colunas quando fizerem parte do contrato. Não trate placeholders como dados reais.

## Renderização
Carregue listas grandes com paginação ou virtualização quando necessário. Mostre estados de loading, erro, vazio e falta de permissão. Normalize slugs e identificadores internamente para que a interface não exija convenções técnicas desnecessárias.

## Testes
Teste configuração inválida, opções não permitidas, dados ausentes, sincronização entre sessões, conflitos de atualização e isolamento entre usuários. Verifique que novos campos não são aceitos silenciosamente quando possam alterar privilégios.

## Referências
- https://supabase.com/docs/guides/database/overview
- https://supabase.com/docs/guides/database/secure-data
- https://json-schema.org/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON

## Aceite
[ ] Fonte de verdade identificada. [ ] Configuração validada no servidor. [ ] Cache não substitui persistência. [ ] Estados vazios/erro implementados. [ ] Preferências e permissões testadas.
