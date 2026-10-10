# Regra 8 — Interface, design system e acessibilidade

## Design system
Reutilize componentes, tokens e padrões visuais existentes. Centralize cores, tipografia, espaçamento, raios, sombras e breakpoints quando o projeto tiver design system. Não crie tokens globais para cada valor isolado sem benefício real. Componentes compartilhados devem ter APIs claras e variações limitadas.

## Responsividade
Projete mobile-first quando adequado, mas valide também telas grandes. Use layout fluido, grid/flex, limites de largura e breakpoints baseados no conteúdo. Evite larguras fixas que causem overflow. Teste zoom, orientação, teclado virtual e conteúdo longo; não dependa apenas de screenshots em tamanhos padrão.

## Renderização e estados
Para fluxos assíncronos, modele loading, erro, vazio, sucesso, desabilitado e retry. Preserve foco e estado durante atualizações. Em frameworks híbridos, minimize código cliente, evite hydration mismatch e mantenha dados privados no servidor. Otimize imagens e fontes para reduzir layout shift.

## Acessibilidade
Use HTML semântico, rótulos associados, foco visível, navegação por teclado, contraste adequado e mensagens de erro ligadas aos campos. Não dependa só de cor, hover ou animação. Respeite `prefers-reduced-motion`. Testes automáticos detectam apenas parte dos problemas; combine automação com revisão manual.

## Ferramentas e assets
Use Storybook ou equivalente se houver biblioteca de componentes e valor em documentar estados. Use Figma quando for necessário criar ou revisar assets/fluxos; mantenha tokens e componentes alinhados entre design e código. Evite exportar imagens estáticas para substituir controles interativos ou conteúdo que precise ser responsivo.

## Testes
Verifique breakpoints, teclado, leitor de tela quando possível, conteúdo vazio/long-form, contraste, foco, loading e erro. Playwright com axe pode detectar violações comuns, mas não substitui avaliação humana.

## Referências
- https://www.w3.org/WAI/standards-guidelines/
- https://www.w3.org/WAI/WCAG22/quickref/
- https://playwright.dev/docs/accessibility-testing
- https://nextjs.org/docs/app/guides/production-checklist
- https://storybook.js.org/docs

## Aceite
[ ] Layout funciona em larguras relevantes. [ ] Foco/teclado e rótulos verificados. [ ] Estados assíncronos completos. [ ] Tokens/componentes existentes reutilizados. [ ] Imagens/fontes não causam deslocamento evitável.
