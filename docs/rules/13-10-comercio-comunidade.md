# Regra 13.10 — Comércio, comunidade e conteúdo público

Não confunda demonstração com catálogo, estoque, preço, disponibilidade ou transação real. Valide identidade, preço, quantidade, permissão e disponibilidade no servidor antes de confirmar operações. A UI não deve ser a fonte da verdade para valores financeiros ou autorização.

Represente estados transacionais explicitamente, como pendente, confirmado, falhou ou cancelado. Não informe sucesso antes da confirmação do sistema de origem. Para conteúdo de usuários, valide e sanitize entradas, trate spam/abuso e aplique políticas de moderação adequadas.

Mantenha rastreabilidade de operações importantes e retenha somente dados pessoais necessários. Teste duplicação de requisições, concorrência de estoque, autorização, cancelamento, falha parcial, conteúdo malicioso e estados de pagamento quando aplicável.

Referências: https://owasp.org/www-project-application-security-verification-standard/ ; https://cheatsheetseries.owasp.org/ ; https://docs.stripe.com/ (somente se Stripe for o provedor real) ; https://schema.org/Product

Aceite: [ ] dados reais distinguíveis de mocks; [ ] validação no servidor; [ ] estados transacionais claros; [ ] idempotência; [ ] moderação e privacidade verificadas.
