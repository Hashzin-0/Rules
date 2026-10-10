# Regra 4 — Tipagem e validação

Tipos estáticos ajudam no desenvolvimento, mas não validam dados em runtime. Trate requests, query strings, uploads, webhooks, respostas de APIs, registros externos e saídas de IA como dados não confiáveis.

## Ferramentas
- TypeScript strict: contratos estáticos, sem validação runtime. https://www.typescriptlang.org/docs/
- Zod: schemas com inferência TypeScript. https://zod.dev/ e https://github.com/colinhacks/zod
- Valibot: alternativa modular. https://valibot.dev/ e https://github.com/fabian-hiller/valibot
- Ajv/JSON Schema: validação interoperável. https://ajv.js.org/ e https://json-schema.org/
- OpenAPI: contrato HTTP. https://spec.openapis.org/oas/latest.html

Reutilize o validador já adotado, salvo limitação demonstrável. Não adicione dependências apenas por preferência.

## Fluxo
1. Defina schema na fronteira de entrada.
2. Valide tipos, limites, campos desconhecidos e formatos.
3. Separe validação de autorização: payload válido não significa que o usuário tem permissão.
4. Normalize erros sem expor stack traces, segredos ou dados pessoais.
5. Valide saídas externas e de IA antes de persistir ou executar ações.

## Casos especiais
- Dinheiro: evite ponto flutuante binário para valores exatos.
- Datas: documente formato e timezone.
- URLs: restrinja protocolos e hosts em fetch no servidor para reduzir SSRF.
- Arquivos: valide tamanho, tipo e assinatura quando necessário; não confie só na extensão.
- Arrays/objetos: imponha limites para evitar abuso de recursos.
- Saídas de IA: parseie e valide; não execute código gerado sem controles.

## Antipadrões
`any` generalizado, casts em dados externos, validação só no browser, defaults silenciosos para entrada inválida, schemas divergentes e regex própria para formatos complexos sem justificativa.

## Testes
Cubra payload válido, campos ausentes, tipos errados, limites, campos inesperados e permissões negadas. Use o runner existente. `npx tsc --noEmit` pode verificar tipos em projetos TypeScript, mas não substitui testes runtime e depende da configuração real.

## Critérios de aceite
- [ ] Entradas externas validadas em runtime.
- [ ] Autorização independente do schema.
- [ ] Casos inválidos e limites testados.
- [ ] Erros não vazam informações sensíveis.
- [ ] Tipos e schemas sincronizados.

## Referências
- https://nextjs.org/docs/app/api-reference/config/typescript
- https://ajv.js.org/guide/getting-started.html
