# Regra 10 — Performance e escalabilidade

Meça antes de otimizar. Identifique latência, throughput, custo, memória, tamanho de bundle, consultas lentas e Core Web Vitals. Defina uma linha de base e compare a mesma métrica depois da mudança.

## Técnicas

- Reduza consultas N+1, payloads grandes e trabalho repetido.
- Use paginação/cursor para conjuntos grandes e índices baseados em consultas reais.
- Aplique cache somente com política explícita de chave, expiração, invalidação e audiência.
- Use lazy loading/code splitting para recursos realmente pesados.
- Memoize quando custo e estabilidade justificarem; memoização indiscriminada aumenta complexidade.
- Limite concorrência, tamanho de arquivo, duração e memória em pipelines.
- Mantenha processamento caro fora do caminho crítico quando possível.

## Renderização web

Em Next.js, considere streaming/Suspense, fetching paralelo, cache adequado, otimização de imagens/fontes e análise do bundle. Não converta tudo para Client Components nem force renderização dinâmica sem requisito. Verifique a semântica de cache para dados privados.

## Testes e ferramentas

- Lighthouse: https://developer.chrome.com/docs/lighthouse/overview
- Web Vitals: https://web.dev/articles/vitals
- Next.js production checklist: https://nextjs.org/docs/app/guides/production-checklist
- PostgreSQL EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html

Meça em condições reproduzíveis e use dados representativos. Testes sintéticos ajudam, mas não substituem telemetria real. Não invente métricas de latência ou economia sem medição.

## Aceite

[ ] Gargalo medido ou demonstrado. [ ] Métrica antes/depois comparável. [ ] Cache seguro e invalidável. [ ] Limites de recursos definidos. [ ] Experiência mobile e bundle avaliados. [ ] Complexidade introduzida justificada.

## Referências

- https://web.dev/articles/vitals
- https://developer.chrome.com/docs/lighthouse/overview
- https://www.postgresql.org/docs/current/using-explain.html
- https://nextjs.org/docs/app/guides/production-checklist
