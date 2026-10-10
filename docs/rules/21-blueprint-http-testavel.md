# 21 — Blueprint HTTP testável com Node.js

## Objetivo

Fornecer uma implementação executável de integração HTTP que demonstre timeout limitado, classificação de status não-2xx, validação do payload e testes sem chamadas de rede reais. O exemplo usa módulos nativos e não adiciona dependências de aplicação.

## Arquivos de referência

- Implementação: [examples/api-client.mjs](examples/api-client.mjs)
- Testes automatizados: [examples/api-client.test.mjs](examples/api-client.test.mjs)

## Executar

Na raiz do repositório, com Node.js 22:

```bash
node --test docs/rules/examples/api-client.test.mjs
```

O teste injeta um cliente HTTP falso e usa URLs `example.invalid`; não precisa de credenciais, servidor externo ou acesso à rede.

## Contrato da função

`fetchJson(url, parse, options)`:

1. Rejeita timeouts ausentes de validade ou menores/iguais a zero.
2. Cria um `AbortController` e limita a duração da chamada.
3. Converte status HTTP não-2xx em `UpstreamHttpError`, preservando o status.
4. Passa o JSON recebido para uma função de parsing fornecida pelo chamador.
5. Converte abortos disparados pelo timeout em `UpstreamTimeoutError`.
6. Limpa o timer em sucesso e em falha.

O parser recebe `unknown`: é responsabilidade do consumidor validar o formato esperado. Em aplicações TypeScript, prefira schema runtime já adotado no projeto (por exemplo, Zod, Valibot ou Ajv) e derive os tipos do contrato quando possível.

## Cobertura incluída

- Resposta JSON válida.
- Status HTTP 429.
- Payload com formato inesperado.
- Timeout simulado.
- Configuração de timeout inválida.

## Como adaptar para produção

- Passe uma URL construída a partir de uma origem confiável; não aceite URLs arbitrárias de usuários sem validação de protocolo, host e destino final.
- Mantenha autenticação no servidor e nunca inclua segredos em código cliente, mensagens de erro ou logs.
- Defina limites de tamanho de resposta e concorrência conforme o provedor.
- Adicione retry somente para falhas transitórias e operações seguras de repetir. Não repita automaticamente mutações sem idempotência.
- Diferencie timeout, falha de transporte, HTTP 4xx/5xx e payload inválido na camada de serviço.
- Considere o limite total da requisição e o timeout do runtime hospedeiro, que podem ser menores que o timeout configurado.
- Use logs estruturados com identificador de correlação, sem registrar credenciais nem corpos sensíveis.

## Limites do exemplo

O cliente não implementa retry, circuit breaker, limite de bytes, autenticação, validação de URL ou telemetria. Essas funcionalidades devem ser adicionadas conforme o risco e o contrato do sistema, e não copiadas indiscriminadamente para toda integração. O teste de timeout cobre o abort disparado pelo wrapper; não substitui teste de integração com o runtime e o provedor reais.

## Critérios de aceite

- [ ] A suíte passa no Node.js suportado pelo projeto.
- [ ] As chamadas de teste não acessam a rede.
- [ ] O parser rejeita formatos inesperados.
- [ ] Timeouts e status HTTP são distinguíveis.
- [ ] Não há retry implícito de operações não idempotentes.
- [ ] As restrições reais do provedor e do runtime estão documentadas.

## Referências

- Node.js Fetch API: https://nodejs.org/api/globals.html#fetch
- Node.js test runner: https://nodejs.org/api/test.html
- MDN AbortController: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- RFC 9110 — HTTP Semantics: https://www.rfc-editor.org/rfc/rfc9110
