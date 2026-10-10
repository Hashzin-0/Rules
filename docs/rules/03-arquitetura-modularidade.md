# Regra 3 — Arquitetura e modularidade

Objetivo: organizar código por responsabilidades coesas, contratos explícitos e dependências controladas.

Princípios: coesão alta, acoplamento baixo, composição, reutilização com propósito e evitar abstrações prematuras. Antes de criar componente, hook, serviço ou utilitário, procure equivalentes e compare semântica, parâmetros e tratamento de erros.

Separações possíveis: UI, domínio, serviços, adapters de infraestrutura, schemas, tipos e testes. Essa estrutura é uma opção, não obrigação; mantenha a arquitetura proporcional ao projeto e preserve convenções existentes.

Em aplicações com renderização servidor/cliente, mantenha credenciais e lógica privilegiada no servidor. Envie ao cliente somente os dados necessários e não importe módulos com segredos em componentes cliente.

Referências: https://refactoring.com/ ; https://github.com/alan2207/bulletproof-react ; https://nextjs.org/docs/app/guides/production-checklist ; https://github.com/vercel/next.js/tree/canary/examples
