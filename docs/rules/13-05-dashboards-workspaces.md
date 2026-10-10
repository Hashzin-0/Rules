# Regra 13.5 — Dashboards e workspaces configuráveis

Separe dados de domínio, preferências persistidas e estado transitório de UI. Se o produto promete sincronização entre dispositivos, persista as preferências pelo mecanismo existente e associe-as ao usuário autenticado; localStorage não é sincronização em nuvem.

Para widgets, colunas e páginas configuráveis, use schema versionado, componentes permitidos, validação no servidor e migrações de formato. Não execute JavaScript arbitrário nem aceite URLs/HTML inseguros. Normalize identificadores internamente.

Renderize estados de loading, erro, vazio, falta de permissão e recuperação. Para listas grandes, considere paginação/virtualização baseada em medição. Garanta que cache respeite a audiência e nunca exponha conteúdo privado por URLs compartilháveis.

Teste reordenação, visibilidade, reload, sessões/dispositivos, conflitos de edição, preferências inválidas e isolamento entre usuários.

Referências: https://react.dev/learn/sharing-state-between-components ; https://supabase.com/docs/guides/database/secure-data ; https://json-schema.org/ ; https://developer.mozilla.org/

Aceite: [ ] fonte da verdade identificada; [ ] persistência compatível com a promessa do produto; [ ] conteúdo configurável validado; [ ] permissões testadas; [ ] estados de UI completos.
