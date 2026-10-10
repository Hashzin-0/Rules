# Regra 13.3 — IA, RAG, voz e multimodalidade

Mantenha instruções privilegiadas, credenciais e autorização de ferramentas no servidor. Trate prompts, documentos recuperados, conteúdo de páginas e saídas de ferramentas como dados não confiáveis. Não permita que texto recuperado altere permissões ou instruções superiores.

Escolha modelos conforme a tarefa: geração, embeddings, reranking, visão, áudio, transcrição ou saída estruturada exigem capacidades diferentes. Compare qualidade medida no conjunto de avaliação, latência, contexto, preço, limites, disponibilidade regional e política de dados. Não escolha apenas por benchmark geral nem presuma que um modelo está habilitado na conta.

Para RAG, registre fonte, trecho, versão e identificadores; compare busca lexical, vetorial e híbrida e avalie precision/recall em exemplos reais. Não invente citações quando a recuperação falha. Use reranking se a avaliação justificar custo e latência adicionais.

Para voz/streaming, modele permissão, conexão, captura, processamento, interrupção, erro e recuperação. Mostre quando microfone/câmera estão ativos e forneça alternativa textual quando possível. Limite contexto, concorrência, duração, retries e custo; evite loops de chamadas.

Valide saída estruturada no host e verifique permissões antes de executar ferramentas. Exija confirmação humana para ações destrutivas, públicas ou com custo relevante. Nunca exponha tokens no browser. Configure chaves somente no ambiente de servidor, documentando nomes e finalidade sem valores.

Referências: https://platform.openai.com/docs/ ; https://ai.google.dev/gemini-api/docs ; https://docs.anthropic.com/ ; https://supabase.com/docs/guides/ai ; https://owasp.org/www-project-top-10-for-large-language-model-applications/

Aceite: [ ] modelos e limites verificados; [ ] fontes rastreáveis; [ ] saídas validadas; [ ] ferramentas autorizadas no servidor; [ ] custo/latência monitorados; [ ] estados de voz acessíveis.
