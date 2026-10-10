# Plano de testes, validação documental e CI

## Princípios

- Automatize verificações determinísticas e mantenha revisão humana para julgamento semântico.
- Falhe explicitamente quando regras estruturais não forem cumpridas.
- Não afirme que script foi executado quando apenas foi criado.
- Não faça deploy nem operações remotas como parte da validação documental.
- Fixe versões e use lockfile do projeto; evite instalar dependências globalmente para uma única checagem.

## Camadas de testes de aplicação

| Camada | Ferramentas a avaliar | Exemplo |
|---|---|---|
| Unitário | Vitest/Jest | parser, cálculo, policy helper |
| Componente | Testing Library | formulário, loading, erro e vazio |
| HTTP | MSW + teste de integração | 401, 429, timeout, payload inválido |
| Banco | PostgreSQL/Supabase local + pgTAP | migrations, constraints, RLS allow/deny |
| E2E | Playwright/Cypress | login, fluxo crítico, exportação |
| Acessibilidade | axe + revisão manual | labels, contraste, teclado, foco |
| Carga | k6 | throughput, latência e limites |
| Segurança | CodeQL, Semgrep, secret scanner, OWASP ASVS | vulnerabilidades, credenciais, autorização |
| Contrato | OpenAPI validator / Pact se necessário | compatibilidade cliente-servidor |
| Documentação | script Node | links relativos, headings, referências |

Não use todas as camadas em todo projeto. Selecione por risco, stack e impacto.

## Script para validar os guias Markdown

O script scripts/validate-rules-docs.mjs deve validar:
- existência do conjunto esperado de guias;
- títulos e estrutura mínima;
- presença de seção de referências;
- links relativos para arquivos existentes;
- links HTTP(S) bem formados (não garante que estejam online);
- placeholders de segredos comuns e caminhos duplicados;
- índice de documentação alinhado aos arquivos existentes.

Use a versão atual do script no repositório e execute localmente antes de declarar a validação concluída.

## Teste de links externos

Não faça checker de links que transforme qualquer bloqueio anti-bot em falha real. Se implementar verificação HTTP:
- use timeout curto, limite de concorrência e retry limitado;
- prefira HEAD, mas faça fallback controlado para GET quando o servidor não aceitar;
- classifique 401/403/429 e erros transitórios separadamente;
- mantenha allowlist para links que não aceitam automação;
- evite executar em cada commit se a verificação for lenta; agende ou rode sob demanda.

## Exemplo de workflow GitHub Actions

Ajuste versão Node e package manager ao projeto real. Este workflow valida documentação Markdown sem instalar dependências de aplicação:

~~~yaml
name: Validate rules docs
on:
  pull_request:
    paths:
      - "Rules.md"
      - "docs/rules/**"
      - "scripts/validate-rules-docs.mjs"
      - ".github/workflows/validate-rules-docs.yml"
  push:
    branches: [main]
    paths:
      - "Rules.md"
      - "docs/rules/**"
      - "scripts/validate-rules-docs.mjs"
      - ".github/workflows/validate-rules-docs.yml"
jobs:
  validate-docs:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: node scripts/validate-rules-docs.mjs
~~~

Antes de adicionar workflow ao repositório, confira política local de actions e versões aprovadas. Em organizações que exigem SHA pinning, fixe actions por SHA completo.

## Validação de segurança

- Confirme que segredos não aparecem em diff, fixtures, screenshots ou logs.
- Teste APIs diretamente, sem depender da UI para autorização.
- Teste IDs de outro usuário/tenant.
- Teste assinatura inválida e reentrega de webhook.
- Teste upload com MIME/extensão divergente, tamanho excessivo e arquivo corrompido.
- Teste URL privada/loopback quando o sistema busca URLs fornecidas pelo usuário.
- Para IA, teste prompt injection em documentos recuperados e tool calls fora da allowlist.
- Use OWASP ASVS para selecionar requisitos proporcionais ao risco.

## Gate de aceite por regra

- Regra 1: instruções locais encontradas e conflitos resolvidos.
- Regras 2–3: diff restrito, módulos coesos, sem abstração desnecessária.
- Regra 4: input runtime validado e tipo inferido sem casts inseguros.
- Regra 5: autorização, segredo, logs e rate limit verificados.
- Regra 6: migrations, RLS, grants e compatibilidade revisados.
- Regra 7: timeout, retries, idempotência e erros cobertos.
- Regra 8: responsividade, teclado, foco e estados assíncronos verificados.
- Regra 9: fonte de verdade e persistência definidas.
- Regra 10: gargalo e métrica antes/depois identificados quando otimização exigir.
- Regra 11: comandos executados e resultados registrados.
- Regra 12: documentação alinhada ao comportamento real.
- Regras 13.1–13.10: testes específicos do domínio, integridade e privacidade.
- Regra 13.11: categoria baseada em evidência e revisável.

## Referências

- GitHub Actions: https://docs.github.com/en/actions
- Playwright: https://playwright.dev/docs/intro
- Vitest: https://vitest.dev/
- OWASP ASVS: https://github.com/OWASP/ASVS
- OpenAPI: https://spec.openapis.org/oas/latest.html
- k6: https://grafana.com/docs/k6/latest/
