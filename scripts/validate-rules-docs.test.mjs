import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validatorPath = resolve(repositoryRoot, "scripts/validate-rules-docs.mjs");
const requiredGuideFiles = [
  "01-hierarquia-instrucoes.md",
  "02-escopo-fidelidade-comunicacao.md",
  "03-arquitetura-modularidade.md",
  "04-tipagem-validacao.md",
  "05-seguranca-segredos.md",
  "06-banco-supabase-sql.md",
  "07-apis-integracoes-resiliencia.md",
  "08-ui-design-system-acessibilidade.md",
  "09-dados-dinamicos-configuraveis.md",
  "10-performance-escalabilidade.md",
  "11-validacao-automatizada.md",
  "12-organizacao-documentacao.md",
  "13-01-curriculos-portfolios.md",
  "13-02-educacao-pesquisa-cientifica.md",
  "13-03-ia-rag-voz-multimodal.md",
  "13-04-transformacao-midia-documentos.md",
  "13-05-dashboards-workspaces.md",
  "13-06-bots-automacoes.md",
  "13-07-devtools-registries-mcp.md",
  "13-08-geoespacial-localizacao.md",
  "13-09-editores-visuais-3d.md",
  "13-10-comercio-comunidade.md",
  "13-11-classificador-operacional.md",
  "14-matriz-tecnologias-por-regra.md",
  "15-catalogo-apis-modelos-variaveis.md",
  "16-blueprints-reutilizaveis.md",
  "17-mcps-skills-assets-e-workflows.md",
  "18-plano-de-testes-e-ci.md",
  "19-modelos-e-avaliacao.md",
  "20-testes-do-validador.md",
];

async function createFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "rules-docs-validator-"));
  const docsRoot = resolve(root, "docs/rules");
  await mkdir(docsRoot, { recursive: true });
  for (const name of requiredGuideFiles) {
    await writeFile(resolve(docsRoot, name), "# Fixture\n\nConteúdo de teste.\n\n## Referências\n\n- Referência de teste.\n", "utf8");
  }
  return { root, docsRoot };
}

function runValidator(cwd) {
  return spawnSync(process.execPath, [validatorPath], {
    cwd,
    encoding: "utf8",
    timeout: 10_000,
  });
}

test("accepts a complete documentation fixture", async (t) => {
  const fixture = await createFixture();
  t.after(() => rm(fixture.root, { recursive: true, force: true }));
  const result = runValidator(fixture.root);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Validated 30 Markdown files/);
});

test("reports a missing required guide", async (t) => {
  const fixture = await createFixture();
  t.after(() => rm(fixture.root, { recursive: true, force: true }));
  await rm(resolve(fixture.docsRoot, "20-testes-do-validador.md"));
  const result = runValidator(fixture.root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing required guide: 20-testes-do-validador\.md/);
});

test("reports broken relative Markdown links", async (t) => {
  const fixture = await createFixture();
  t.after(() => rm(fixture.root, { recursive: true, force: true }));
  await writeFile(resolve(fixture.docsRoot, "20-testes-do-validador.md"), "# Teste\n\n[link quebrado](nao-existe.md)\n\n## Referências\n", "utf8");
  const result = runValidator(fixture.root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /broken relative link nao-existe\.md/);
});

test("flags secret-like literals without exposing real credentials", async (t) => {
  const fixture = await createFixture();
  t.after(() => rm(fixture.root, { recursive: true, force: true }));
  await writeFile(resolve(fixture.docsRoot, "20-testes-do-validador.md"), "# Teste\n\nExemplo fictício: sk-ABCDEFGHIJKLMNOPQRSTUVWXYZ1234\n\n## Referências\n", "utf8");
  const result = runValidator(fixture.root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /possible API secret literal/);
});
