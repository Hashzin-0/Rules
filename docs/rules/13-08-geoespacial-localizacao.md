# Regra 13.8 — Geoespacial, mapas e localização

Diferencie coordenadas fornecidas, geocodificação aproximada e localização precisa. Não invente coordenadas, rotas, distâncias, tempos ou precisão. Preserve sistema de referência, ordem latitude/longitude, unidades e precisão; valide coordenadas antes de calcular ou renderizar.

Trate permissão de localização negada como estado normal e ofereça entrada manual quando possível. Mostre incerteza em geocodificação aproximada. Mantenha dados, marcadores, filtros, legenda e cálculos consistentes. Não conecte pontos em rotas sem que a intenção de rota esteja clara.

Proteja localizações sensíveis e evite histórico de deslocamento em logs ou URLs públicas. Para dados de mapa, verifique licença, atribuição, limites e política de uso do provedor.

Teste coordenadas inválidas, antimeridiano, zoom, dispositivos móveis, permissão negada, localização aproximada e resultados sem rota.

Referências: https://postgis.net/documentation/ ; https://leafletjs.com/reference.html ; https://docs.mapbox.com/ ; https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

Aceite: [ ] coordenadas e unidades validadas; [ ] precisão comunicada; [ ] permissão negada tratada; [ ] privacidade respeitada; [ ] licença/atribuição revisadas.
