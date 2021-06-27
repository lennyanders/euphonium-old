import { rm, mkdir, copyFile, access } from 'fs/promises';
import { execSync } from 'child_process';
import { build } from 'esbuild';
import electronmon from 'electronmon';

(async () => {
  try {
    await rm('dist', { recursive: true, force: true });
  } finally {
    await mkdir('dist');
  }

  try {
    await access('build');
  } catch (_) {
    execSync('npm run rebuild');
    await mkdir('build');
    await copyFile(
      'node_modules/better-sqlite3/build/Release/better_sqlite3.node',
      'build/better_sqlite3.node',
    );
  }

  await build({
    entryPoints: ['src/main/index.ts'],
    platform: 'node',
    format: 'cjs',
    bundle: true,
    minify: true,
    sourcemap: 'inline',
    loader: { '.html': 'file', '.sql': 'file' },
    external: ['electron'],
    outfile: 'dist/main.cjs',
    watch: { onRebuild: () => app?.restart() },
    logLevel: 'info',
  });

  await build({
    entryPoints: ['src/preload/index.ts'],
    platform: 'node',
    format: 'cjs',
    bundle: true,
    minify: true,
    sourcemap: 'inline',
    external: ['electron'],
    outfile: 'dist/preload.js',
    watch: { onRebuild: () => app?.reload() },
    logLevel: 'info',
  });

  await build({
    entryPoints: ['src/renderer/index.ts'],
    format: 'esm',
    bundle: true,
    minify: true,
    sourcemap: 'inline',
    loader: { '.html': 'file' },
    outfile: 'dist/renderer.js',
    watch: { onRebuild: () => app?.reload() },
    logLevel: 'info',
  });

  const app = await electronmon({
    cwd: 'dist',
    args: ['main.cjs'],
    patterns: ['!**/*'], // reloading of electron is done in esbuild hooks
  });
})();
