# 20 — Testes executáveis do validador de documentação

## Objetivo

Manter o validador de `docs/rules` verificável por testes automatizados. A suíte cria um repositório temporário e exercita o script real sem alterar os documentos do projeto durante os cenários de teste.

## Como executar

Com Node.js 22 ou compatível com a API nativa `node:test`, na raiz do repositório:

```bash
node --test scripts/validate-rules-docs.test.mjs
node scripts/validate-rules-docs.mjs
```

O primeiro comando testa o comportamento do validador em fixtures isoladas. O segundo valida o conteúdo real do checkout atual. Um comando não substitui o outro.

## Cobertura automatizada

A suíte deve confirmar que o validador:

1. Aceita uma coleção completa de guias válidos.
2. Falha quando falta um guia obrigatório.
3. Detecta links Markdown relativos que apontam para caminhos inexistentes.
4. Detecta padrões de strings que se parecem com segredos de API.

Os valores usados para testar detecção de segredos são inteiramente fictícios e não representam credenciais. Não inclua tokens reais em fixtures, exemplos, logs ou mensagens de falha.

## Princípios para manter os testes confiáveis

- Use apenas módulos nativos do Node.js para não introduzir dependências de teste desnecessárias.
- Gere cada fixture em diretório temporário exclusivo e remova-o ao finalizar o teste, inclusive quando houver falha.
- Execute o script real do validador como processo filho; não replique sua lógica dentro dos testes.
- Faça as asserções sobre código de saída e mensagens estáveis, sem depender de caminhos absolutos temporários.
- Ao adicionar um novo guia obrigatório, atualize tanto a lista do validador quanto a fixture da suíte.
- Preserve os testes negativos: eles verificam que o validador falha quando encontra problemas, não apenas que termina sem erro.
- Não afirme que a validação do repositório passou apenas porque a suíte passou. A validação do checkout real é uma etapa separada.

## Integração contínua

O workflow `.github/workflows/validate-rules-docs.yml` deve executar primeiro a suíte automatizada e depois o validador sobre os arquivos reais do checkout. Isso cobre tanto o comportamento do verificador quanto a integridade atual da documentação.

## Limites conhecidos

O verificador de padrões de segredos é heurístico: não substitui scanners especializados, revisão de código ou gestão de segredos. A checagem de links relativos valida a existência do caminho local, mas não verifica se destinos externos estão online. A suíte testa regras selecionadas e não prova a correção semântica de todos os guias.

## Referências

- Node.js test runner: https://nodejs.org/api/test.html
- Node.js child processes: https://nodejs.org/api/child_process.html
- GitHub Actions: https://docs.github.com/actions
