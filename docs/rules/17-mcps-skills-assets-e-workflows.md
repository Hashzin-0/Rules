# MCPs, Skills, assets e workflow de execução

## Objetivo

Use ferramentas especializadas para reduzir erros e trabalho manual, mas mantenha autorização, escopo e verificação sob controle. MCP/Skill é capacidade auxiliar, não fonte automática de verdade.

## Ordem de descoberta

1. Inspecione arquivos de instrução locais e a stack do repositório.
2. Liste as ferramentas e Skills realmente disponíveis na sessão.
3. Leia a Skill relevante antes de usar uma ferramenta que a exija.
4. Prefira ferramenta oficial do serviço para ações no conteúdo desse serviço.
5. Use documentação oficial para conferir versão, argumentos e limites.
6. Registre o que foi consultado e não afirme que uma ferramenta foi usada se não foi.

## MCPs por tipo de tarefa

| Tarefa | MCP/integração a avaliar | O que fazer | Limites |
|---|---|---|---|
| Código, PRs, issues | GitHub MCP | Ler arquivos, procurar padrões, revisar diffs, commits e status | Confirmar repo/branch; não publicar/mesclar sem autorização |
| Banco e autenticação | Supabase MCP + Skill Supabase | Ler docs, schema, policies, advisors e migrations | Escritas remotas precisam de escopo e autorização |
| Deploy e logs | Vercel MCP + Skill Vercel | Inspecionar deployment, logs, configuração e status | Não alterar produção sem autorização |
| Banco/serviços gerenciados | Render MCP | Inspecionar serviços, logs, metrics e Postgres | Confirmar alvo e impacto de ações |
| UI editável | Figma MCP + Skills Figma | Inspecionar/criar design, componentes, variáveis e assets | Não é necessário para documentação técnica sem artefato visual |
| Design/marketing | Canva MCP | Criar peças visuais quando o resultado pedido é asset editável | Não substituir UI funcional por imagem |
| Arquivos de conversa | Files MCP | Buscar/ler documentos relevantes fornecidos pelo usuário | Não inventar caminho sandbox; citar conforme regras |
| Automação recorrente | Automations MCP | Criar verificações agendadas se houver gatilho futuro claro | Não criar automação sem intenção adequada |
| APIs e plugins | Plugin Management MCP | Descobrir capacidades conectadas | Instalação/conexão exige ação explícita do usuário |

MCPs externos podem estar disponíveis no ecossistema, mas não presumir conexão. Exemplos a pesquisar quando apropriado: Playwright MCP, Context7/documentation MCP, GitHub MCP oficial, Supabase MCP oficial e servidores MCP dos fornecedores. Verifique repositório, publisher, permissões, atividade e política de segurança antes de instalar.

Referência do protocolo: https://modelcontextprotocol.io/

## Skills a priorizar quando instaladas

- Skill da framework/SDK detectada no código (Next.js, React, Vercel AI SDK, Supabase etc.).
- Skill de banco quando houver migrations, SQL, RLS, Auth ou dados persistidos.
- Skill de segurança para autorização, segredos, uploads, URLs, prompt injection ou ferramentas de agente.
- Skill de testes/browser para fluxos de usuário e regressões.
- Skill de Figma somente quando houver trabalho de design/asset editável.
- Skill de implantação para Vercel/Render ou plataforma realmente utilizada.
- Skill de criação de plugins quando o pedido for construir integração reutilizável.

Leia a instrução da Skill, confira se corresponde à versão do projeto e trate orientação que contradiga documentação oficial atual como algo a verificar.

## Assets: onde buscar e como usar

### UI e design

- Figma Community: https://www.figma.com/community
- Lucide: https://lucide.dev/icons/
- Heroicons: https://heroicons.com/
- Radix Icons: https://icons.radix-ui.com/
- Storybook: https://storybook.js.org/
- Open Props: https://open-props.style/

Prefira SVGs acessíveis, fontes e imagens com licença compatível. Não use screenshots como substituto de controles interativos. Confira licença, atribuição, versão e acessibilidade. Não crie assets via Figma quando uma correção de CSS ou componente resolve o requisito.

### Dados e fixtures

- Dados sintéticos pequenos para unitários.
- Fixtures representativas sem informações pessoais para integração.
- Dados anonimizados ou sintéticos para performance.
- Imagens de teste com licença clara para pipelines de visão/OCR.
- Fixtures de erro: 401, 403, 404, 429, 5xx, timeout, JSON malformado, arquivo corrompido e payload excessivo.

Não coloque dados reais de clientes, documentos privados ou credenciais em fixtures versionadas.

## Workflow de implementação

1. **Descoberta:** leia Rules.md, instruções locais, package manifests, schemas e arquitetura existente.
2. **Classificação:** associe a tarefa às regras gerais e às categorias confirmadas.
3. **Planejamento:** declare escopo, riscos, contratos, integrações e critérios de aceite.
4. **Pesquisa:** verifique APIs e versões nas fontes oficiais e nos docs locais instalados.
5. **Implementação:** mudanças mínimas, modularizadas e reversíveis.
6. **Validação:** testes direcionados, lint, typecheck, build e E2E conforme risco.
7. **Revisão:** diff, segredos, migrações, acessibilidade, logs e dependências.
8. **Entrega:** arquivos alterados, comandos realmente executados, resultados, limitações e follow-up.

## Confirmação humana

Exija confirmação explícita antes de operações destrutivas, exposição pública, alteração de permissões, migração remota de alto risco, compra, envio em massa, publicação ou deploy de produção quando autorização não estiver clara.

## Critérios de aceite

- [ ] Ferramentas escolhidas por pertinência, não por disponibilidade.
- [ ] Skills obrigatórias lidas antes das ferramentas correspondentes.
- [ ] Permissões mínimas e autorização respeitadas.
- [ ] Assets e código de terceiros têm licença revisada.
- [ ] Resultados verificados e não exagerados.
- [ ] Nenhum segredo em arquivos, prompts, logs ou screenshots.
