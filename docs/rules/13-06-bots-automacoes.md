# Regra 13.6 — Bots e automações de mensagens

Mantenha tokens fora do código e dos logs. Solicite permissões mínimas e valide permissões administrativas no servidor, não apenas na UI. Separe descoberta/registro de comandos da execução normal do bot quando isso reduzir efeitos colaterais.

Handlers de webhooks e eventos devem tolerar reentrega e concorrência. Use IDs de evento, idempotência e armazenamento de estado quando necessário para evitar mensagens, recompensas ou tarefas duplicadas. Respeite rate limits, aplique backoff limitado e diferencie erros de permissão, payload inválido e indisponibilidade.

Não envie mensagens privadas, menções em massa ou ações externas sem configuração e autorização adequadas. Mostre estados de falha e evite retries infinitos.

Teste permissões, eventos repetidos, rate limits, timeouts, reinicialização, concorrência e recuperação de jobs. Não inclua valores de tokens em exemplos; documente apenas nomes de variáveis e instruções de provisionamento.

Referências: https://discord.com/developers/docs/ ; https://discord.js.org/ ; https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks ; https://cloud.google.com/storage/docs/retry-strategy

Aceite: [ ] token protegido; [ ] permissões mínimas; [ ] handlers idempotentes; [ ] rate limits tratados; [ ] ações externas autorizadas; [ ] testes de reentrega.
