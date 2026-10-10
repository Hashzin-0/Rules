# Blueprints reutilizáveis para implementar as regras

Os exemplos são modelos de implementação, não código testado no repositório consumidor. Ajuste imports, versões e contratos à stack existente. Nunca copie credenciais. Não execute operações de escrita contra produção durante testes.

## 1. Validar uma fronteira HTTP com Zod

Exemplo para TypeScript/Node em API route. Instale Zod somente se o projeto ainda não possuir validador equivalente.

~~~ts
import { z } from "zod";

const CreateItemSchema = z.object({
  title: z.string().trim().min(1).max(160),
  category: z.enum(["research", "education", "media"]),
}).strict();

export async function parseCreateItem(input: unknown) {
  const parsed = CreateItemSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, issues: parsed.error.issues };
  }
  return { ok: true as const, data: parsed.data };
}
~~~

**Use:** payload externo com contrato fechado. **Evite:** confiar apenas em TypeScript ou fazer cast inseguro sem validação. Adapte tratamento HTTP ao framework e nunca retorne stack trace ao cliente.

## 2. Timeout e classificação de erros ao chamar uma API

~~~ts
export async function fetchJson<T>(
  url: URL,
  parse: (value: unknown) => T,
  timeoutMs = 8_000,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Upstream HTTP ${response.status}`);
    }
    const payload: unknown = await response.json();
    return parse(payload);
  } finally {
    clearTimeout(timer);
  }
}
~~~

Este exemplo não implementa retry. Adicione retry apenas para falhas transitórias e operações seguras de repetir; nunca repita mutações sem idempotência. Em ambientes que não suportam AbortSignal no cliente escolhido, use mecanismo documentado pela versão instalada.

## 3. Interface assíncrona: estados que não podem faltar

~~~ts
type RemoteState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string; retryable: boolean };
~~~

Na UI, cada estado deve ter representação acessível: indicador com texto, erro associado à ação, vazio com próximo passo e botão de retry somente quando a operação puder ser repetida. Preserve foco e não anuncie mensagens de streaming em excesso para leitores de tela.

## 4. Pipeline RAG testável por etapas

Arquitetura de referência:

1. Ingestão e validação do documento.
2. Extração de texto e metadados com proveniência.
3. Chunking por estrutura semântica, preservando página/seção/URL.
4. Embeddings compatíveis com a versão do índice.
5. Persistência vetorial com filtro de tenant e ACL.
6. Recuperação lexical/vetorial/híbrida.
7. Reranking opcional, justificado por avaliação.
8. Construção de contexto com fontes.
9. Geração com instruções para declarar insuficiência de evidência.
10. Verificação de citações e telemetria redigida.

Mantenha interfaces distintas para embedDocument, retrieveCandidates, rerankCandidates e generateAnswer. Isso permite testar cada etapa e trocar provedor sem reescrever UI. Não misture embeddings de modelos incompatíveis no mesmo índice sem migração planejada.

**Métricas mínimas:** recall@k, precision@k ou MRR para recuperação; fidelidade às fontes, taxa de citações corretas, taxa de abstenção apropriada, latência p50/p95 e custo por pergunta. Defina um conjunto de avaliação versionado antes de comparar.

**Ferramentas a avaliar:** Supabase pgvector, OpenAI embeddings, Gemini embeddings, LlamaIndex, Haystack, LangChain, Ragas ou DeepEval. Escolha uma camada de orquestração apenas se reduzir trabalho real; não adote três frameworks para a mesma função.

Referências: https://supabase.com/docs/guides/ai ; https://ai.google.dev/gemini-api/docs/embeddings ; https://platform.openai.com/docs/guides/embeddings ; https://github.com/explodinggradients/ragas ; https://github.com/confident-ai/deepeval

## 5. Operação idempotente de webhook

- Verifique assinatura/timestamp antes de processar.
- Valide payload e versão do evento.
- Registre identificador único do evento com constraint de unicidade.
- Se já processado, responda de forma idempotente.
- Coloque tarefas longas em fila durável.
- Registre estado e número de tentativas.
- Use backoff limitado para falhas transitórias.
- Nunca registre token, assinatura, dados pessoais desnecessários ou corpo sensível completo.

Não confunda HTTP 2xx com trabalho concluído se o processamento é assíncrono; documente o contrato do webhook.

## 6. SQL: política RLS de propriedade ilustrativa

~~~sql
alter table public.documents enable row level security;

create policy "owners can read own documents"
on public.documents
for select
to authenticated
using ((select auth.uid()) = owner_id);
~~~

Este exemplo pressupõe uma coluna owner_id corretamente mantida pelo servidor e uma tabela em schema exposto. Não o copie sem revisar grants, policies existentes, operações INSERT/UPDATE/DELETE e modelo de tenancy. Para UPDATE, valide USING e WITH CHECK; teste usuários sem sessão e IDs de outro usuário. Nunca resolva erro de permissão removendo RLS.

Referências: https://supabase.com/docs/guides/database/postgres/row-level-security ; https://supabase.com/docs/guides/database/secure-data

## 7. Renderização responsiva

- Use layout fluido com Grid/Flexbox e limites de largura.
- Defina breakpoints a partir do conteúdo, não de modelos de aparelho.
- Teste conteúdo longo, zoom, teclado virtual e orientação.
- Garanta que tabelas tenham estratégia mobile explícita.
- Não transforme conteúdo importante em imagem estática.
- Respeite prefers-reduced-motion.
- Reserve espaço para imagens para reduzir CLS.
- Verifique teclado, foco, labels, contraste e estados de erro.

Referências: https://web.dev/articles/responsive-web-design-basics ; https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries ; https://www.w3.org/WAI/WCAG22/quickref/

## 8. Configuração de variáveis

~~~dotenv
# Exemplos; inclua somente variáveis realmente usadas pelo projeto.
DATABASE_URL=
GEMINI_API_KEY=
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
~~~

Não sobrescreva arquivos .env* existentes. O snippet é ilustrativo e não deve ser copiado automaticamente para todos os projetos. Nunca use NEXT_PUBLIC_ para uma chave secreta. Use validação de startup e teste a ausência de variáveis sem imprimir valores.

## 9. Reutilização sem acoplamento

Crie módulo compartilhado quando houver contrato estável e pelo menos dois consumidores reais ou necessidade clara de consistência. Exporte APIs pequenas, mantenha dependências unidirecionais e teste comportamento público. Não crie um utils.ts gigantesco nem abstraia diferenças semanticamente importantes.

## 10. Projetos reais de referência

- Zod: https://github.com/colinhacks/zod — schemas runtime e inferência TS.
- Bulletproof React: https://github.com/alan2207/bulletproof-react — organização de aplicações React; adaptar sem copiar cegamente.
- Vercel AI SDK: https://github.com/vercel/ai — geração, streaming e ferramentas.
- RAG demo: https://github.com/MoritzLaurer/rag-demo — exemplos de pipelines e avaliação RAG.
- Supabase: https://github.com/supabase/supabase — ecossistema e padrões do produto.
- Playwright: https://github.com/microsoft/playwright — automação de browser.
- OWASP ASVS: https://github.com/OWASP/ASVS — requisitos de verificação de segurança.

Um repositório público demonstra uma abordagem; não comprova que seja a melhor para outro produto. Revise licença, manutenção, issues, release e dependências antes de reutilizar código.
