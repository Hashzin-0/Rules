import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve('docs/rules');
const files = (await readdir(root)).filter((name) => name.endsWith('.md'));
const failures = [];
const required = ['## ', 'Referências'];

for (const name of files) {
  const content = await readFile(join(root, name), 'utf8');
  for (const marker of required) {
    if (!content.includes(marker)) failures.push(`${name}: missing ${marker}`);
  }
  for (const match of content.matchAll(/\]\(([^)]+\.md)(?:#[^)]*)?\)/g)) {
    const target = resolve(root, match[1]);
    try { await readFile(target, 'utf8'); }
    catch { failures.push(`${name}: broken relative markdown link ${match[1]}`); }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} Markdown files; required headings and relative links passed.`);
}
