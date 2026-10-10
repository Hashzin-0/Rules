# Catálogo de APIs, modelos e variáveis de ambiente

Este arquivo registra nomes e pontos de entrada conhecidos para avaliação. Não contém valores de chaves. APIs, limites, modelos e preços mudam; confirme documentação oficial e conta habilitada antes de implementar.

## Regras de configuração

- Adicione apenas variáveis necessárias à integração escolhida.
- Documente nome, finalidade, ambiente (servidor/cliente), obrigatoriedade, origem e como verificar.
- Nunca registre valor de chave, JWT, cookie ou connection string.
- Não exponha segredos com prefixos públicos como NEXT_PUBLIC_.
- Preserve arquivos .env* existentes. Para documentação, use placeholders vazios em .env.example apenas com autorização e sem sobrescrever arquivos existentes.
- Separe credenciais de desenvolvimento, preview e produção; aplique menor privilégio e rotação.
- Valide startup: se variável obrigatória faltar, falhe com mensagem segura que nomeie a variável, sem imprimir o valor.

## OpenAI API

**Documentação:** https://developers.openai.com/api/docs/  
**SDK:** https://github.com/openai/openai-node  
**Variável usual:** OPENAI_API_KEY  
**APIs a avaliar:** Responses API, embeddings, Files API, Realtime API, modelos disponíveis via endpoint de listagem.  
**Quando usar:** geração, ferramentas, visão/áudio e embeddings se contrato e política de dados forem adequados.  
**Não usar:** chamada direta do browser com chave secreta, modelo/endpoints copiados de tutoriais antigos sem confirmar suporte, ou IA para operações que exigem cálculo determinístico.  
**Referência de modelos:** https://platform.openai.com/docs/api-reference/models/list

## Google Gemini API

**Documentação:** https://ai.google.dev/gemini-api/docs  
**SDK JS/TS:** https://github.com/googleapis/js-genai  
**Variável usual:** GEMINI_API_KEY  
**APIs a avaliar:** generate content, embeddings, Files API, live/audio, structured output e multimodalidade conforme suporte do modelo.  
**Quando usar:** quando modalidades e limites documentados correspondem ao fluxo, com avaliação de qualidade e quota.  
**Não usar:** assumir que um modelo tem saída de imagem/áudio só porque é multimodal, nem ignorar limites por arquivo ou rate limits.  
**Referências:** https://ai.google.dev/gemini-api/docs/embeddings ; https://ai.google.dev/gemini-api/docs/models

## Anthropic API

**Documentação:** https://docs.anthropic.com/  
**SDK:** https://github.com/anthropics/anthropic-sdk-typescript  
**Variável usual:** ANTHROPIC_API_KEY  
**APIs a avaliar:** Messages API, tool use, streaming e recursos de arquivos/documentos conforme disponibilidade.  
**Cuidado:** verifique modelo, região, limites, retenção e formato de saída na documentação atual.

## Vercel AI SDK e AI Gateway

**Documentação:** https://ai-sdk.dev/docs  
**Repositório:** https://github.com/vercel/ai  
**Pacotes possíveis:** ai, @ai-sdk/react, provider packages necessários, @ai-sdk/mcp quando integração MCP for requerida.  
**Variável possível:** AI_GATEWAY_API_KEY quando a aplicação usa AI Gateway com chave; ambientes Vercel podem suportar fluxos de identidade específicos.  
**Quando usar:** aplicações TypeScript que precisam de streaming, tool calling, saída estruturada ou múltiplos provedores com interface comum.  
**Não usar:** instalar todos os providers, presumir que exemplos antigos continuam válidos, ou esconder autorização dentro do prompt.  
**Regra:** leia documentação correspondente à versão instalada e confirme assinatura da API antes de implementar.

## Modelos: como selecionar sem IDs obsoletos

Não codifique ID de modelo a partir de memória. Registre, para cada tarefa:

- provedor e ID exato retornado pelo catálogo atual;
- capacidades exigidas: texto, visão, áudio, transcrição, embeddings, reranking, tool calling ou saída estruturada;
- limites de contexto e payload;
- latência p50/p95 medida;
- custo medido por tarefa;
- taxa de sucesso no conjunto de avaliação;
- política de dados, região e retenção;
- plano de fallback e comportamento quando provedor estiver indisponível.

Modelos de geração, embeddings e reranking não são intercambiáveis. Não compare embeddings sem considerar modelo usado na indexação, dimensão, normalização e estratégia de distância. Para RAG, medir relevância em dados representativos vale mais que escolher apenas por benchmark genérico.

## APIs públicas úteis por domínio

Estas APIs têm pontos de entrada públicos documentados; isso não significa acesso irrestrito, ausência de chave, licença universal ou permissão para coleta em massa.

| Domínio | API/documentação | Utilização possível | Atenção |
|---|---|---|---|
| Metadados acadêmicos | Crossref REST API — https://api.crossref.org/ | DOI, autores, títulos, datas e metadados | Respeitar rate limits e atribuição |
| Catálogo de pesquisa | OpenAlex API — https://docs.openalex.org/ | Obras, autores, instituições e tópicos | Confirmar autenticação/limites atuais |
| Busca semântica acadêmica | Semantic Scholar API — https://api.semanticscholar.org/api-docs/ | Artigos e citações | Rate limit pode variar; implementar backoff |
| Literatura biomédica | Europe PMC REST — https://europepmc.org/RestfulWebService | Artigos e metadados biomédicos | Escopo biomédico, licença e proveniência |
| Dados públicos brasileiros | dados.gov.br — https://dados.gov.br/ | Catálogos e datasets públicos | Conferir licença, atualização e formato |
| Geocodificação | Nominatim — https://nominatim.org/release-docs/latest/api/Overview/ | Geocoding OSM quando política permitir | Instância pública tem política estrita; não usar como serviço de alto volume sem permissão |
| Mapas | MapLibre — https://maplibre.org/ e Leaflet — https://leafletjs.com/ | Renderização no cliente | Bibliotecas não fornecem automaticamente tiles/rotas |
| Tempo meteorológico | Open-Meteo — https://open-meteo.com/en/docs | Previsão e variáveis meteorológicas | Confirmar atribuição, cobertura e termos |
| Séries financeiras brasileiras | Banco Central SGS — https://api.bcb.gov.br/dados/serie/bcdata.sgs. | Séries temporais do BCB | Validar código, periodicidade e unidade |
| Dados públicos de saúde | DATASUS/TabNet e portais oficiais correspondentes | Indicadores de saúde pública | Verificar formato, documentação e contexto |

Não invente URL de endpoint específico: use a referência oficial para selecionar recurso e parâmetros documentados. Evite scraping quando houver API oficial ou quando os termos proibirem automação.

## Variáveis por tipo de integração

### Banco e armazenamento

Nomes possíveis, dependendo da arquitetura: DATABASE_URL, DIRECT_URL, SUPABASE_URL, SUPABASE_ANON_KEY ou chave publishable apropriada, SUPABASE_SERVICE_ROLE_KEY (somente servidor), SUPABASE_DB_PASSWORD. Não inclua todos automaticamente. Confirme as variáveis exigidas pelo SDK e ambiente.

### Autenticação e sessão

Nomes alternativos possíveis: AUTH_SECRET, SESSION_SECRET, NEXTAUTH_SECRET, AUTH_URL, NEXTAUTH_URL, CLERK_SECRET_KEY, CLERK_PUBLISHABLE_KEY, BETTER_AUTH_SECRET. O nome exato depende da biblioteca e da versão.

### Observabilidade

Nomes possíveis: SENTRY_DSN, SENTRY_AUTH_TOKEN (build/CI), OTEL_EXPORTER_OTLP_ENDPOINT, OTEL_SERVICE_NAME. Não envie dados pessoais ou prompts sensíveis por padrão; configure amostragem e redaction.

### Email, pagamentos e outros provedores

Nomes possíveis conforme o SDK escolhido: RESEND_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET ou variáveis do provedor efetivo. Não configurar provedor de pagamento até existir requisito real. Segredos ficam apenas no servidor.

## Validação de configuração

1. Liste variáveis efetivamente lidas pelo código, não apenas citadas em documentação.
2. Verifique presença no ambiente apropriado sem imprimir valores.
3. Valide formato básico e falhe cedo para valores obrigatórios ausentes.
4. Teste que bundle cliente não contém segredos.
5. Teste credencial ausente, expirada, sem permissão e rate limit.
6. Documente como provisionar, rotacionar e revogar a chave sem colocá-la em commits.

## Referências de segurança e atualidade

- OpenAI: https://developers.openai.com/api/docs/quickstart/
- Gemini embeddings: https://ai.google.dev/gemini-api/docs/embeddings
- Supabase: https://supabase.com/docs/guides/database/secure-data
- OWASP secrets: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- OpenAPI: https://spec.openapis.org/oas/latest.html
