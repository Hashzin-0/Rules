# Documentação detalhada das regras

Fonte normativa: [Rules.md](../../Rules.md). Estes guias ampliam a aplicação prática das regras, sem substituir instruções específicas de cada projeto.

## Guias por regra

- [01 — Hierarquia e instruções](01-hierarquia-instrucoes.md)
- [02 — Escopo, fidelidade e comunicação](02-escopo-fidelidade-comunicacao.md)
- [03 — Arquitetura e modularidade](03-arquitetura-modularidade.md)
- [04 — Tipagem e validação](04-tipagem-validacao.md)
- [05 — Segurança e segredos](05-seguranca-segredos.md)
- [06 — Banco, Supabase e SQL](06-banco-supabase-sql.md)
- [07 — APIs e resiliência](07-apis-integracoes-resiliencia.md)
- [08 — UI, design system e acessibilidade](08-ui-design-system-acessibilidade.md)
- [09 — Dados dinâmicos e configuração](09-dados-dinamicos-configuraveis.md)
- [10 — Performance e escalabilidade](10-performance-escalabilidade.md)
- [11 — Testes e verificação](11-validacao-automatizada.md)
- [12 — Organização e documentação](12-organizacao-documentacao.md)
- [13.1 — Currículos e portfólios](13-01-curriculos-portfolios.md)
- [13.2 — Educação e pesquisa científica](13-02-educacao-pesquisa-cientifica.md)
- [13.3 — IA, RAG, voz e multimodalidade](13-03-ia-rag-voz-multimodal.md)
- [13.4 — Transformação de mídia e documentos](13-04-transformacao-midia-documentos.md)
- [13.5 — Dashboards e workspaces](13-05-dashboards-workspaces.md)
- [13.6 — Bots e automações](13-06-bots-automacoes.md)
- [13.7 — Devtools, registries e MCPs](13-07-devtools-registries-mcp.md)
- [13.8 — Geoespacial e localização](13-08-geoespacial-localizacao.md)
- [13.9 — Editores visuais e 3D](13-09-editores-visuais-3d.md)
- [13.10 — Comércio e comunidade](13-10-comercio-comunidade.md)
- [13.11 — Classificador operacional](13-11-classificador-operacional.md)

## Catálogos transversais

- [14 — Matriz de tecnologias por regra](14-matriz-tecnologias-por-regra.md)
- [15 — APIs, modelos e variáveis de ambiente](15-catalogo-apis-modelos-variaveis.md)
- [16 — Blueprints reutilizáveis](16-blueprints-reutilizaveis.md)
- [17 — MCPs, Skills, assets e workflows](17-mcps-skills-assets-e-workflows.md)
- [18 — Testes, validação e CI](18-plano-de-testes-e-ci.md)
- [19 — Modelos de IA e avaliação](19-modelos-e-avaliacao.md)
- [20 — Testes executáveis do validador](20-testes-do-validador.md)
- [21 — Blueprint HTTP testável com Node.js](21-blueprint-http-testavel.md)

## Como usar

1. Leia Rules.md e as instruções locais do projeto.
2. Identifique regras gerais e categorias confirmadas por evidências.
3. Consulte a matriz tecnológica e o catálogo de APIs antes de escolher dependências.
4. Use blueprints como ponto de partida, adaptando-os à stack e à versão instaladas.
5. Execute as verificações aplicáveis e registre resultados reais.

## Estado e limites

Os catálogos são referências de decisão, não uma lista obrigatória de dependências. IDs de modelos, APIs, limites, versões e preços devem ser revalidados na documentação oficial antes de implementar. Exemplos de código não são declarados como testados apenas por estarem documentados.

Validação local: node scripts/validate-rules-docs.mjs

## Referências

- Rules.md: https://github.com/Hashzin-0/Rules/blob/main/Rules.md
- OpenAPI: https://spec.openapis.org/oas/latest.html
- OWASP ASVS: https://github.com/OWASP/ASVS
