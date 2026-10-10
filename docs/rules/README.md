# Guia técnico de implementação das regras

Este diretório expande as regras de `Rules.md` em guias operacionais. O documento principal continua sendo a fonte normativa resumida; os guias detalham decisões técnicas, implementações, alternativas, limites, referências e validação.

## Método e critérios

- **Verificado**: apoiado por documentação oficial, código-fonte do projeto referenciado ou comportamento reproduzível.
- **Recomendação contextual**: prática útil, mas que depende de stack, escala, ameaça e requisitos do produto.
- **Exemplo ilustrativo**: código de referência que deve ser adaptado e testado no repositório real.
- **Não presumir**: modelos, serviços, variáveis de ambiente, SDKs, APIs, features e resultados não são considerados existentes até serem verificados.
- Links e versões devem ser revalidados antes de uma migração ou lançamento; documentação de framework muda.

## Mapa dos guias

### Regras gerais
| Regra | Guia | Cobertura |
|---|---|---|
| 1 | [Hierarquia e leitura obrigatória](01-hierarquia-instrucoes.md) | Precedência, instruções locais, confiança e resolução de conflitos |
| 2 | [Fidelidade, escopo e comunicação](02-escopo-fidelidade-comunicacao.md) | Critérios de aceitação, alterações mínimas, autorização e relatório |
| 3 | [Arquitetura e modularidade](03-arquitetura-modularidade.md) | Limites, dependências, reutilização, composição e organização |
| 4 | [Tipagem e validação](04-tipagem-validacao.md) | TypeScript, schemas, validação em runtime e testes |
| 5 | A publicar | Segurança e gestão de segredos |
| 6 | A publicar | Banco de dados, Supabase e SQL |
| 7 | A publicar | APIs, integrações e resiliência |
| 8 | A publicar | UI, design system e acessibilidade |
| 9 | A publicar | Dados dinâmicos e conteúdo configurável |
| 10 | A publicar | Performance e escalabilidade |
| 11 | A publicar | Testes e verificação |
| 12 | A publicar | Organização e documentação |
| 13.1–13.10 | A publicar | Guias por tipo de aplicação |
| 13.11 | A publicar | Classificador operacional e evidências |

## Template mínimo exigido para cada guia

Cada guia deve conter: objetivo e escopo; decisões de uso e não uso; fluxo de implementação; arquitetura modular; tecnologias e alternativas; APIs/modelos/SDKs com links oficiais; configuração e nomes de variáveis (nunca valores secretos); exemplos positivos e antipadrões; responsividade/renderização quando pertinentes; segurança; desempenho/custo; acessibilidade quando pertinente; tratamento de falhas; testes unitários, integração e E2E; scripts de lint/typecheck/build/validação; checklist de aceite; troubleshooting; projetos reais de referência; fontes primárias e data de revisão.

## Comandos de validação

Os comandos abaixo são exemplos e devem ser adaptados aos scripts e ferramentas realmente presentes no repositório:

```bash
git diff --check
git status --short
# Inspecione package.json, pyproject.toml, Makefile ou equivalente antes de executar.
npm run lint --if-present
npm run typecheck --if-present
npm test --if-present
npm run build --if-present
```

Não execute todos os comandos cegamente: confirme o gerenciador de pacotes, os scripts definidos e os efeitos de cada comando. Nunca altere arquivos `.env*` existentes sem autorização explícita.

## Referências transversais

- [GitHub Actions: Continuous Integration](https://docs.github.com/en/actions/get-started/continuous-integration)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [W3C WAI: Standards and Guidelines](https://www.w3.org/WAI/standards-guidelines/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Google SRE Books](https://sre.google/books/)
