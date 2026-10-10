# Regra 7 — APIs, integrações e resiliência

Centralize integrações externas em serviços ou adapters, com contratos claros, timeout explícito, limites de payload e tratamento consistente de erros. Evite chamadas de rede dispersas na UI.

Diferencie erro de validação, falta de autorização, rate limit, timeout, indisponibilidade e falha permanente. Use retry com backoff apenas para falhas transitórias e operações seguras de repetir. Operações não idempotentes exigem chave de idempotência ou proteção equivalente. Limite tentativas, duração e concorrência.

Cacheie apenas quando privacidade e consistência permitirem. Inclua escopo de usuário/tenant na chave; não reutilize dados privados entre sessões. Fallback deve ser seguro e não mascarar dados antigos como atuais.

Valide destinos externos e redirects quando houver entrada não confiável. Verifique assinatura e timestamp de webhooks e proteja contra reentrega duplicada. Não registre credenciais, headers de autenticação ou corpos sensíveis.

## Testes
Simule timeout, 429, 5xx, payload inválido, credencial expirada e resposta parcial. Confirme que retries param no limite e eventos repetidos não duplicam operações. Use mocks para falhas controladas e testes de integração em ambiente seguro.

## Referências
- https://www.rfc-editor.org/rfc/rfc9110
- https://spec.openapis.org/oas/latest.html
- https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api
- https://cloud.google.com/storage/docs/retry-strategy

## Aceite
[ ] Timeout e limites definidos. [ ] Erros classificados. [ ] Retry limitado e seguro. [ ] Cache isolado por audiência. [ ] Falhas críticas testadas.
