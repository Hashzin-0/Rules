# Regra 11 — Testes e verificação

Defina critérios de aceite, teste os caminhos afetados e registre o resultado real. Use testes unitários para lógica isolada, integração para banco e APIs, testes de componente para interação e E2E para fluxos críticos. Priorize riscos e regressões prováveis; cobertura percentual isolada não garante qualidade.

Leia os comandos do projeto. Execute lint, typecheck, testes e build quando disponíveis. Revise o diff. Não declare validação com base em comandos não executados. Em CI, faça verificações falharem de modo visível; não ignore erros para manter a pipeline verde.

## Ferramentas

- Vitest: https://vitest.dev/
- Jest: https://jestjs.io/docs/getting-started
- Playwright: https://playwright.dev/docs/intro
- Cypress: https://docs.cypress.io/
- Testing Library: https://testing-library.com/docs/
- Testes de acessibilidade com Playwright: https://playwright.dev/docs/accessibility-testing

Cubra entradas inválidas, permissões, estados de loading/erro/vazio/sucesso, timeout, rate limit, webhooks duplicados, concorrência, isolamento entre usuários, migrations, responsividade e teclado conforme o produto.

## Aceite

[ ] Critérios testáveis. [ ] Testes proporcionais ao risco. [ ] Falhas e permissões cobertas. [ ] CI reporta resultados. [ ] Limitações registradas.

## Referências

- https://vitest.dev/
- https://playwright.dev/docs/intro
- https://testing-library.com/docs/
- https://docs.github.com/en/actions
