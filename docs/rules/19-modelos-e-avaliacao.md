# Modelos de IA e avaliação

Revisão de catálogos: 10 de outubro de 2026. IDs e disponibilidade mudam; consulte a documentação oficial antes de integrar e não trate esta lista como fonte de verdade do runtime.

## Exemplos atuais por fornecedor

- OpenAI: GPT-6 Astra para raciocínio/código complexo; GPT-6.1 Sol para equilíbrio entre capacidade e custo; GPT-6 Luna para workloads de alto volume. Catálogo: https://developers.openai.com/api/docs/models
- Gemini: Gemini 3.8 Flash para texto, coding e agentes; Gemini 3.8 Live para voz em tempo real; Gemini Embedding 2 para embeddings multimodais; gemini-embedding-001 para avaliar embeddings de texto. Catálogo: https://ai.google.dev/gemini-api/docs/models
- Anthropic: Claude Opus 5 e Claude Sonnet 5 como opções de alta capacidade no catálogo consultado; escolher a família Haiku apenas após verificar a versão ativa e o limite aplicável. Catálogo: https://docs.anthropic.com/en/docs/about-claude/models

## Como selecionar

Compare modelos com o mesmo conjunto de tarefas representativas. Registre taxa de sucesso, qualidade factual, aderência a schema, qualidade das citações, latência p50/p95, custo por tarefa, tamanho do contexto, modalidades, limites, disponibilidade regional e política de dados. Separe modelos de geração, embeddings, reranking, visão, áudio e transcrição; não são intercambiáveis.

Para embeddings, registre ID do modelo, dimensão, normalização, distância vetorial e versão do índice. Uma troca de modelo pode exigir re-embedding e migração planejada; não misture vetores incompatíveis.

## Controle de descontinuação

- OpenAI: https://developers.openai.com/api/docs/changelog
- Gemini: https://ai.google.dev/gemini-api/docs/deprecations
- Anthropic: https://docs.anthropic.com/en/docs/about-claude/model-deprecations

Centralize os IDs em configuração tipada, valide a allowlist por ambiente e rode avaliações de regressão antes de trocar um modelo. Quando houver endpoint oficial de listagem, use-o para verificar disponibilidade em vez de confiar em listas copiadas.

## APIs e variáveis de configuração

- OpenAI API: https://developers.openai.com/api/docs/ — variável usual OPENAI_API_KEY.
- Gemini API: https://ai.google.dev/gemini-api/docs — variável usual GEMINI_API_KEY.
- Anthropic API: https://docs.anthropic.com/ — variável usual ANTHROPIC_API_KEY.
- Vercel AI SDK: https://ai-sdk.dev/docs — pacote ai e providers necessários; AI_GATEWAY_API_KEY apenas se o projeto usar esse gateway.

Esses são nomes de variáveis, não valores. Não exponha chaves no browser, logs, screenshots ou Git. Confirme os nomes exigidos pela versão instalada.

## Referências de implementação

- Vercel AI SDK: https://github.com/vercel/ai
- RAG demo com LlamaIndex, Haystack e LangChain: https://github.com/MoritzLaurer/rag-demo
- Zod: https://github.com/colinhacks/zod
- Supabase pgvector: https://supabase.com/docs/guides/ai
