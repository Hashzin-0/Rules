# Regra 13.11 — Classificador operacional

## Evidências a reunir

Examine documentação, manifestos, scripts, rotas, componentes, dependências, schemas, migrations, integrações e testes. Documentação é um sinal, não prova, quando contradiz o código. Um README genérico não determina a categoria.

## Rótulos

- **Confirmada:** código, dados ou fluxos implementados diretamente demonstram a categoria.
- **Provável:** documentação específica e dependências são coerentes, mas o fluxo não foi confirmado.
- **Não demonstrada:** há somente nome, intenção futura ou exemplo genérico.
- **Incompatível:** arquitetura observada contradiz a categoria.

Ative regras especializadas somente para categorias confirmadas. Para provável, investigue mais ou aplique apenas precauções genéricas sem introduzir arquitetura nova.

## Sinais fortes

- Currículos: campos de carreira, templates e exportação de CV.
- Educação/pesquisa: cursos, quizzes, fontes, artigos ou cálculos didáticos.
- IA/RAG/voz: chamadas reais a modelos, embeddings, recuperação ou streaming de áudio.
- Transformação de mídia: OCR, conversão, composição, tradução ou renderização.
- Workspace: widgets reordenáveis e preferências persistidas.
- Bots: SDK de chat, webhooks, comandos e eventos.
- Devtools/MCP: manifestos, descoberta e execução de ferramentas.
- Geoespacial: coordenadas, geocoding, camadas ou rotas.
- Editor/3D: canvas, timeline, WebGL, presets ou renderizador.
- Comércio/comunidade: catálogo, checkout, estoque ou conteúdo de usuários.

Um projeto pode pertencer a várias categorias. Aplique as regras somente ao fluxo relevante. Antes de mudanças não triviais, registre finalidade observada, evidências, categorias ativadas, restrições locais e verificações previstas. Não afirme ter inspecionado arquivos ou integrações inacessíveis.

## Reavaliação

Se a inspeção revelar outro propósito, reclassifique antes de prosseguir. Em scaffolds ou protótipos, não trate recursos planejados como implementados.

## Referências

- https://owasp.org/www-project-top-10-for-large-language-model-applications/
- https://github.com/alan2207/bulletproof-react
- https://docs.github.com/en/repositories
