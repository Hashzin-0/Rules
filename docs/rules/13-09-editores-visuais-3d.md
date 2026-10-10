# Regra 13.9 — Editores visuais e 3D

Mantenha catálogo, tipos, valores padrão, presets, controles e renderizador coerentes. Ao adicionar um elemento, atualize registros e testes. Controles editáveis devem refletir o resultado renderizado e rejeitar configurações inválidas.

Respeite redução de movimento, legibilidade, teclado e desempenho móvel. Em 3D, limite trabalho por frame, descarte recursos ao desmontar e ofereça alternativa quando WebGL não estiver disponível. Não dependa apenas de hover, cor ou movimento para comunicar informação.

Teste resize, mobile, redução de movimento, configuração inválida, desmontagem/recriação e ausência de suporte gráfico.

Referências: https://threejs.org/docs/ ; https://webglfundamentals.org/ ; https://www.w3.org/WAI/WCAG22/quickref/ ; https://developer.mozilla.org/

Aceite: [ ] catálogo e renderizador alinhados; [ ] recursos liberados; [ ] fallback disponível; [ ] controles acessíveis; [ ] movimento reduzido respeitado.
