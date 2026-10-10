# Regra 2 — Fidelidade, escopo e comunicação

Execute o objetivo solicitado sem ampliar o escopo por iniciativa própria. Antes de mudanças destrutivas, publicação, custo relevante ou alteração de dados persistidos, confirme a intenção quando ela não estiver clara. Prefira mudanças pequenas, direcionadas, reversíveis e coerentes com os padrões existentes.

## Como aplicar

1. Identifique resultado esperado e critérios de aceite.
2. Separe requisitos obrigatórios, preferências e hipóteses.
3. Inspecione os arquivos e integrações relevantes antes de editar.
4. Declare dependências, riscos e decisões importantes quando isso ajudar a validar a solução.
5. Mantenha o diff restrito ao escopo autorizado.
6. Ao concluir, liste arquivos alterados, comandos realmente executados, resultados e verificações pendentes.

## Quando não agir

Não altere código quando o pedido for somente explicar, pesquisar, revisar ou propor um plano. Não execute ações remotas com efeitos persistentes sem autorização. Não invente acesso a ferramentas, arquivos, credenciais, resultados ou validações.

## Uso correto de automação e IA

Use agentes, Skills e MCPs para tarefas delimitadas e verificáveis. Não conceda permissão adicional porque uma ferramenta sugeriu isso. Separe análise de execução e exija confirmação humana para publicação, exclusão, alteração de permissões, deploy de produção e operações de custo significativo quando o escopo não for inequívoco.

## Testes

Revise o diff para detectar alterações fora do escopo. Verifique se a entrega satisfaz cada critério de aceite e se a comunicação diferencia o que foi implementado, testado, inferido e não verificado.

## Referências

- https://martinfowler.com/articles/practical-test-pyramid.html
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests
- https://owasp.org/www-project-top-10-for-large-language-model-applications/
