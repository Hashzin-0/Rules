import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const repositoryRoot = process.cwd();
const docsRoot = resolve(repositoryRoot, "docs/rules");
const files = (await readdir(docsRoot)).filter((name) => name.endsWith(".md"));
const failures = [];
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

for (const expected of requiredGuideFiles) {
  try {
    await stat(join(docsRoot, expected));
  } catch {
    failures.push("missing required guide: " + expected);
  }
}

for (const name of files) {
  const fullPath = join(docsRoot, name);
  const content = await readFile(fullPath, "utf8");
  const isIndex = name.toLowerCase() === "readme.md" || name.toLowerCase() === "status.md";

  if (!content.trim()) failures.push(name + ": file is empty");
  if (!content.startsWith("# ")) failures.push(name + ": must start with a level-1 heading");
  if (!isIndex && !content.includes("Referências")) failures.push(name + ": missing References section");
  if (content.includes("sk-") && /sk-[A-Za-z0-9]{20,}/.test(content)) {
    failures.push(name + ": possible API secret literal");
  }

  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const rawTarget = match[1].trim();
    if (/^(https?:|mailto:|#|tel:)/i.test(rawTarget)) continue;
    const pathOnly = rawTarget.split("#")[0].split("?")[0];
    if (!pathOnly) continue;
    const target = resolve(dirname(fullPath), decodeURIComponent(pathOnly));
    try {
      await stat(target);
    } catch {
      failures.push(name + ": broken relative link " + rawTarget);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Validated " + files.length + " Markdown files, required guide inventory, headings, references, secret-like literals, and relative links.");
}
