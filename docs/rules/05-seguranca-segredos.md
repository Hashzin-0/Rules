# Regra 5 — Segurança e confiança zero

## Modelo de ameaça
Identifique ativos (dados, tokens, contas), atores, pontos de entrada, fronteiras de confiança e impactos. Segurança não é uma lista universal de bibliotecas: escolha controles de acordo com dados, exposição, permissões e efeitos da operação.

## Controles essenciais
- Autentique e autorize no servidor cada operação protegida; ocultar botões não é controle de acesso.
- Valide entradas e codifique saídas conforme o contexto. Evite XSS, SQL injection, command injection, SSRF, CSRF e redirects abertos.
- Use consultas parametrizadas; não concatene entrada do usuário em SQL ou comandos.
- Aplique privilégio mínimo, rate limiting, limites de payload e timeouts.
- Em multi-tenant, teste isolamento entre usuários e organizações no servidor e banco.
- Evite dados pessoais e credenciais em logs, URLs, analytics e mensagens de erro.

## Chaves e configuração
Armazene credenciais em variáveis de ambiente de servidor ou gerenciadores de segredos da plataforma. Documente somente nomes, finalidade, escopo e como provisionar; nunca registre valores. Exemplos condicionais: `DATABASE_URL`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Use somente as variáveis exigidas pelas integrações reais. `NEXT_PUBLIC_*` deve ser tratado como público. Nunca altere ou sobrescreva `.env*` existentes sem autorização explícita.

## Uso e não uso
Use CSP, CSRF protection, rate limiting, allowlists, auditoria e RLS quando a arquitetura e ameaça justificarem. Não copie headers ou políticas cegamente: CSP pode quebrar scripts legítimos; CORS não substitui autorização; criptografia não corrige controle de acesso; um WAF não corrige vulnerabilidades de lógica.

## Testes
Teste chamadas diretas à API sem UI, usuários sem permissão, troca de IDs, payloads maliciosos, rate limit, origem não permitida, expiração de sessão e isolamento cross-tenant. Faça scans de dependências e segredos em CI, revise falsos positivos e mantenha ferramentas atualizadas.

## Referências
- OWASP Cheat Sheets: https://cheatsheetseries.owasp.org/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- Next.js Security: https://nextjs.org/docs/app/guides/data-security
- Next.js Security Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Nextjs_Security_Cheat_Sheet.html
- GitHub secret scanning: https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning

## Aceite
[ ] Segredos fora do cliente e do Git. [ ] Autorização validada no servidor. [ ] Entradas e limites testados. [ ] Erros/logs sem dados sensíveis. [ ] Dependências e riscos relevantes revisados.
