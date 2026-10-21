/* Build do site, sem Vite: esbuild junta o React e o Tailwind 4 gera o CSS.
   npm run build  → gera a pasta dist/ (é ela que vai para o GitHub Pages)
   npm run dev    → build + servidor local em http://localhost:5173 que refaz a cada alteração */
import { build, context, transform } from 'esbuild';
import { compile } from 'tailwindcss';
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { watch } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const DEV = process.argv.includes('--dev');
const OUT = 'dist';

async function filesIn(dir, exts) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await filesIn(p, exts));
    else if (exts.some((x) => p.endsWith(x))) out.push(p);
  }
  return out;
}

async function buildCss() {
  const entry = path.resolve('src/styles.css');
  const twDir = path.dirname(require.resolve('tailwindcss/package.json'));
  const compiler = await compile(await readFile(entry, 'utf8'), {
    base: path.dirname(entry),
    async loadStylesheet(id, base) {
      const file = id === 'tailwindcss' ? path.join(twDir, 'index.css')
        : id.startsWith('tailwindcss/') ? path.join(twDir, id.slice('tailwindcss/'.length))
        : path.resolve(base, id);
      return { path: file, base: path.dirname(file), content: await readFile(file, 'utf8') };
    },
  });
  // Candidatos: todo "pedaço" de texto das fontes que pode ser uma classe do Tailwind.
  const sources = [...await filesIn('src', ['.jsx', '.js']), 'public/index.html'];
  const candidates = new Set();
  for (const f of sources) {
    for (const t of (await readFile(f, 'utf8')).split(/[\s"'`{}()<>;,]+|\$\{/)) if (t) candidates.add(t);
  }
  // Classes com parênteses dentro de colchetes, ex.: text-[clamp(46px,7.6vw,120px)]
  for (const f of sources) {
    for (const m of (await readFile(f, 'utf8')).matchAll(/[\w:-]+\[[^\]\s"'`]+\][\w/.-]*/g)) candidates.add(m[0]);
  }
  const css = compiler.build([...candidates]);
  const { code } = await transform(css, { loader: 'css', minify: !DEV });
  await writeFile(path.join(OUT, 'assets/styles.css'), code);
}

const jsOptions = {
  entryPoints: ['src/main.jsx'],
  bundle: true,
  format: 'esm',
  outfile: path.join(OUT, 'assets/app.js'),
  jsx: 'automatic',
  minify: !DEV,
  sourcemap: DEV,
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production') },
  logLevel: 'info',
};

await rm(OUT, { recursive: true, force: true });
await mkdir(path.join(OUT, 'assets'), { recursive: true });
await cp('public', OUT, { recursive: true });
await buildCss();

if (!DEV) {
  await build(jsOptions);
  console.log('Pronto: site gerado em dist/');
} else {
  const ctx = await context(jsOptions);
  await ctx.watch();
  let timer;
  watch('src', { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(() => buildCss().catch(console.error), 80); });
  watch('public', { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(() => cp('public', OUT, { recursive: true }).catch(console.error), 80); });
  const { port } = await ctx.serve({ servedir: OUT, port: 5173 });
  console.log(`Abra http://localhost:${port}`);
}
