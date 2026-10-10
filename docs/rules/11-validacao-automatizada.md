# Regra 11 — Testes e verificação

Defina critérios de aceite, teste os caminhos afetados e registre o resultado real. Use testes unitários para lógica isolada, integração para banco e APIs, testes de componente para interação e E2E para fluxos críticos. Priorize riscos e regressões prováveis; cobertura percentual isolada não garante qualidade.

Leia os comandos do projeto. Execute lint, typecheck, testes e build quando disponíveis. Revise o diff. Não declare validação com base em comandos não executados. Em CI, faça verificações falharem de modo visível; não ignore erros para manter a pipeline verde.

Ferramentas: https://vitest.dev/ ; https://jestjs.io/docs/getting-started ; https://playwright.dev/docs/intro ; https://docs.cypress.io/ ; https://testing-library.com/docs/ ; https://playwright.dev/docs/accessibility-testing

Cubra entradas inválidas, permissões, estados de loading/erro/vazio/sucesso, timeout, rate limit, webhooks duplicados, concorrência, isolamento entre usuários, migrations, responsividade e teclado conforme o produto.

Aceite: [ ] critérios testáveis; [ ] testes proporcionais ao risco; [ ] falhas e permissões cobertas; [ ] CI reporta resultados; [ ] limitações registradas.
