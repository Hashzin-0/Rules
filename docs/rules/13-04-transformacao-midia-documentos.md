# Regra 13.4 — Transformação de mídia e documentos

Preserve o original e separe análise, transformação, renderização e validação. Defina o que pode mudar; em edição localizada, não altere elementos fora do escopo. Traduções de histórias devem considerar contexto, voz e continuidade terminológica.

Em conversões, valide texto, imagens, ordem, dimensões, fontes, links, camadas e recursos interativos. Não prometa preservar animações/transições se o formato não suportar isso; registre perdas conhecidas.

Em lotes, use IDs estáveis, idempotência, limites de concorrência e retomada por etapa. Evite repetir processamento caro sem mudança de entrada. Compare entrada e saída para detectar páginas ausentes, recortes, sobreposições, artefatos e conteúdo ilegível.

Teste arquivos longos, dimensões extremas, caracteres especiais, páginas vazias e falhas parciais. Guarde o original para comparação e recuperação.

Referências: https://sharp.pixelplumbing.com/ ; https://pymupdf.readthedocs.io/ ; https://python-pptx.readthedocs.io/ ; https://imagemagick.org/ ; https://github.com/zyddnys/manga-image-translator

Aceite: [ ] original preservado; [ ] etapas rastreáveis; [ ] conteúdo completo; [ ] perdas declaradas; [ ] comparação textual/visual executada.
