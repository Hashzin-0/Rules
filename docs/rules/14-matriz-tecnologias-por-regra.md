# Matriz técnica por regra — tecnologias, quando usar e quando evitar

Este catálogo complementa [Rules.md](../../Rules.md) e os guias individuais. Não é uma ordem para instalar tudo: escolha a menor combinação que cumpra os requisitos, respeite a stack existente e seja validável. Confirme versão, licença, manutenção, compatibilidade, custos e limites antes de adotar uma dependência.

## Como escolher

1. Defina requisito funcional e não funcional.
2. Verifique o que já existe no repositório e se a dependência atual resolve o caso.
3. Compare documentação oficial, atividade do projeto, licença, suporte, tamanho, acessibilidade, compatibilidade e custo operacional.
4. Crie uma prova de conceito pequena para APIs de alto risco, multimídia, IA, banco e renderização.
5. Defina critério de aceitação e plano de fallback antes de adotar tecnologia crítica.
6. Registre a escolha e alternativas descartadas quando o custo de reversão for relevante.

## Regras 1–3: instruções, escopo e arquitetura

**Ferramentas:** Git, GitHub, git diff, git status, git log, git grep, rg, fd, tree, TypeScript, ESLint, Prettier, dependency-cruiser ou Madge quando a complexidade justificar.

**Use:** AGENTS.md e regras locais para escopo; módulos por domínio/feature; funções puras para lógica testável; adapters para dependências externas; contratos explícitos entre camadas.

**Evite:** reescrever arquitetura apenas por preferência, duplicar regras em vários documentos, criar um framework interno antes de haver repetição real, usar barrels que criem ciclos, ou aplicar padrões de monorepo a um projeto pequeno sem necessidade.

**Validação:** revisão de diff; teste de dependências circulares; imports de módulos privilegiados apenas no servidor; nenhuma alteração fora do escopo.

## Regra 4: tipagem e validação de fronteiras

| Tecnologia | Usar quando | Evitar quando |
|---|---|---|
| TypeScript strict | Aplicações TS com contratos duradouros | Desativar estritamente para silenciar erros |
| Zod | Validar entrada runtime e inferir tipos TS | Revalidar a mesma estrutura em cada camada sem motivo |
| Valibot | Alternativa modular para schemas TS | Adotar sem comparar integração e manutenção |
| Ajv + JSON Schema | Validar contratos JSON entre serviços | Duplicar schemas incompatíveis entre linguagens |
| OpenAPI + geração de tipos | APIs HTTP com consumidores múltiplos | Manter spec que diverge da implementação |

**Padrão:** parseie dados externos na fronteira, transforme-os em tipo interno validado e não confunda inferência TS com validação runtime. Rejeite propriedades críticas inesperadas quando possam alterar permissões.

Referências: https://www.typescriptlang.org/docs/ ; https://zod.dev/ ; https://valibot.dev/ ; https://ajv.js.org/ ; https://spec.openapis.org/oas/latest.html

## Regra 5: segurança

**Ferramentas:** OWASP ASVS, OWASP Cheat Sheet Series, GitHub Secret Scanning, Dependabot, CodeQL, Semgrep, auditoria de dependências e scanners como Gitleaks ou TruffleHog.

**Use:** autenticação e autorização no servidor; consultas parametrizadas; RLS no banco quando aplicável; rate limits; limites de payload; CSP/CSRF conforme a arquitetura; logs sem credenciais; validação de URL e mitigação SSRF em fetches controlados pelo usuário.

**Evite:** considerar CORS como autorização, usar chave service-role no browser, armazenar tokens em logs, confiar em user_metadata para privilégios, adicionar CSP copiada sem testar, ou corrigir acesso removendo RLS.

**Variáveis condicionais:** DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY ou chave publishable adequada, SUPABASE_SERVICE_ROLE_KEY apenas no servidor, SESSION_SECRET, CSRF_SECRET. Não criar todas por padrão. Nunca versionar valores reais.

Referências: https://owasp.org/www-project-application-security-verification-standard/ ; https://cheatsheetseries.owasp.org/ ; https://github.com/gitleaks/gitleaks ; https://github.com/semgrep/semgrep

## Regra 6: banco de dados

**Tecnologias:** PostgreSQL, Supabase, migrations versionadas, pgTAP/supabase test db, EXPLAIN (ANALYZE, BUFFERS) em ambiente seguro, pgvector para vetores e PostGIS para geodados.

**Use:** constraints para invariantes, índices medidos, transações curtas, paginação, RLS/grants testados e migration revisável.

**Evite:** editar schema de produção diretamente sem fluxo autorizado, resetar banco remoto, índices indiscriminados, SECURITY DEFINER como atalho, ou usar service role para contornar política.

**Verificações:** testar permitir e negar para cada papel; migration em banco descartável; compatibilidade de tipos gerados; consultas lentas; integridade e rollback.

Referências: https://supabase.com/docs/guides/database/overview ; https://supabase.com/docs/guides/deployment/database-migrations ; https://supabase.com/docs/guides/database/row-level-security ; https://www.postgresql.org/docs/current/using-explain.html

## Regra 7: APIs e integrações

**Tecnologias:** fetch com timeout/AbortSignal, OpenAPI, Zod/Ajv, p-retry quando adequado, p-limit para concorrência, undici em Node, filas duráveis para tarefas longas.

**Use:** um adapter por provedor, timeout explícito, retries limitados apenas para falhas transitórias, backoff com jitter, idempotência, validação de assinatura de webhook e circuit breaker quando volume justificar.

**Evite:** retry infinito, retry automático de pagamentos ou mutações sem idempotência, chamar APIs diretamente em cada componente UI, tratar 401/403 como transitório, cache compartilhado entre usuários, ou retornar sucesso antes de confirmar a operação.

Referências: https://spec.openapis.org/oas/latest.html ; https://www.rfc-editor.org/rfc/rfc9110 ; https://github.com/sindresorhus/p-retry ; https://github.com/sindresorhus/p-limit

## Regra 8: UI, responsividade e acessibilidade

**Tecnologias:** React/Next.js quando já adotados; CSS Grid/Flexbox; Tailwind CSS ou CSS Modules conforme padrão existente; Radix UI ou React Aria para primitives acessíveis; Storybook para bibliotecas de componentes; Playwright + axe para automação; Figma para fluxos/asset editáveis.

**Use:** componentes semânticos, tokens, breakpoints baseados no conteúdo, estados de loading/erro/vazio, foco restaurado, prefers-reduced-motion, imagem dimensionada e fontes otimizadas.

**Evite:** layout só com pixels fixos, screenshot como interface, controles apenas por hover, animação excessiva, duplicar design tokens, ou assumir que teste automatizado garante WCAG.

Referências: https://react.dev/ ; https://nextjs.org/docs ; https://www.w3.org/WAI/WCAG22/quickref/ ; https://playwright.dev/docs/accessibility-testing ; https://storybook.js.org/docs

## Regras 9–10: dados configuráveis e performance

**Tecnologias:** TanStack Query quando há estado remoto complexo; SWR quando cache remoto simples basta; TanStack Table para tabelas configuráveis; react-virtual para listas comprovadamente grandes; Lighthouse e Web Vitals; PostgreSQL EXPLAIN.

**Use:** fonte de verdade definida, cache com escopo/TTL/invalidação, paginação, virtualização quando medida, índices orientados por consultas e code splitting para módulos pesados.

**Evite:** localStorage como sincronização entre dispositivos, cache de dados privados com chave genérica, memoização indiscriminada, virtualização de listas pequenas, ou otimização sem baseline.

Referências: https://tanstack.com/query/latest/docs/framework/react/overview ; https://tanstack.com/table/latest/docs/introduction ; https://tanstack.com/virtual/latest/docs/introduction ; https://web.dev/articles/vitals

## Regra 11: testes e verificação

**Tecnologias:** Vitest ou Jest para unitários; Testing Library para UI; Playwright ou Cypress para E2E; MSW para mocks HTTP realistas; Pact quando contratos entre serviços justificarem; axe para acessibilidade; k6 para carga quando necessário.

**Use:** runner já adotado, testes baseados em risco, fixtures não sensíveis, ambiente de integração controlado e gates de CI.

**Evite:** múltiplos runners sobrepostos, snapshot como única garantia, mocks para tudo, testes com dados reais sem autorização, ignorar erros para deixar CI verde.

Referências: https://vitest.dev/ ; https://testing-library.com/ ; https://playwright.dev/ ; https://mswjs.io/ ; https://k6.io/docs/

## Regra 12: documentação

**Tecnologias:** Markdown, Mermaid para diagramas versionados, OpenAPI para contratos HTTP, Storybook para catálogo de componentes, Changesets para versionamento de pacotes quando aplicável.

**Use:** fonte de verdade única, exemplos executáveis, versões e pré-requisitos explícitos, links oficiais, decisões arquiteturais quando houver trade-offs importantes.

**Evite:** duplicar a mesma documentação, apresentar exemplos ilustrativos como testes executados ou copiar chaves de API.

Referências: https://mermaid.js.org/ ; https://spec.openapis.org/oas/latest.html ; https://github.com/changesets/changesets

## Regras 13.1–13.11: categorias de produto

| Categoria | Tecnologias reais a avaliar | Cuidado principal |
|---|---|---|
| 13.1 Currículos/portfólios | React PDF, CSS print, PDF.js para visualização | Comparar preview, PDF e conteúdo semântico |
| 13.2 Educação/pesquisa | OpenAlex API, Crossref REST API, Semantic Scholar API, Zod, pgvector | Citações e estatísticas rastreáveis |
| 13.3 IA/RAG/voz | Vercel AI SDK, SDK oficial do provedor, LlamaIndex ou Haystack, pgvector, rerankers | Medir recuperação, qualidade, custo e latência |
| 13.4 Mídia/documentos | Sharp, PyMuPDF, python-pptx, LibreOffice headless, Tesseract OCR, OpenCV | Validar perda de estrutura, recortes e fidelidade |
| 13.5 Dashboards | TanStack Table/Query, React Grid Layout quando drag-and-drop é necessário | Persistência e isolamento por usuário |
| 13.6 Bots | SDK oficial da plataforma, fila/job runner, validação de assinatura | Idempotência, rate limit e permissões |
| 13.7 Devtools/MCP | SDK oficial MCP, JSON Schema, Ajv/Zod, sandbox de execução | Descoberta não equivale a autorização |
| 13.8 Geoespacial | PostGIS, Leaflet, MapLibre GL JS, APIs de geocoding permitidas | Licença de tiles, privacidade e precisão |
| 13.9 Editores/3D | Three.js, React Three Fiber, Konva, Fabric.js, Tiptap conforme domínio | Teclado, memória GPU, serialização e undo/redo |
| 13.10 Comércio/comunidade | SDK do provedor de pagamento real, PostgreSQL, filas, moderação | Estado transacional no servidor e idempotência |
| 13.11 Classificador | Zod/JSON Schema, análise de manifestos, regras explícitas e revisão humana | Evidência observável; não classificar só pelo nome |

Essas são opções para avaliar, não dependências obrigatórias. Verifique licenças, versões, manutenção, requisitos e API atual antes de instalar.

## MCPs e Skills úteis

Use somente se estiverem conectados, autorizados e forem pertinentes:

- GitHub MCP: ler arquivos, revisar diffs, issues, commits e PRs.
- Supabase MCP/Skill: consultar documentação, schema, RLS, migrations e advisors; nunca aplicar mudanças remotas sem autorização.
- Vercel MCP/Skill: inspecionar deployments, logs e configuração de runtime quando conectado.
- Figma MCP/Skill: criar ou inspecionar assets editáveis e sistemas de design quando houver trabalho visual real.
- Canva MCP: criar peças visuais quando o resultado pedido é um asset editável.
- Files MCP: buscar/ler documentos relevantes fornecidos pelo usuário.
- Automations MCP: verificações agendadas quando houver gatilho futuro claro.
- Skills de Playwright, Vitest, OWASP, Vercel AI SDK, Supabase e stack detectada: leia instruções instaladas antes de usá-las.

MCPs externos podem estar disponíveis no ecossistema, mas não presumir conexão. Verifique repositório, publisher, permissões, atividade e política de segurança antes de instalar. Referência: https://modelcontextprotocol.io/

## Critério de adoção

Não instale biblioteca porque aparece nesta tabela. Justifique pela necessidade concreta, valide compatibilidade com a stack, teste caso principal e falha, documente a configuração necessária e mantenha um caminho de atualização.
