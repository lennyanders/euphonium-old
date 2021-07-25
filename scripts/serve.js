import { rm, mkdir, copyFile, access } from 'fs/promises';
import { execSync } from 'child_process';
import { build } from 'esbuild';
import electronmon from 'electronmon';

/** @type {import('esbuild').BuildOptions} */
const sharedBuildOptions = {
  bundle: true,
  minify: true,
  sourcemap: 'inline',
  logLevel: 'info',
  define: { 'process.env.NODE_ENV': JSON.stringify('development') },
};

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
    ...sharedBuildOptions,
    entryPoints: ['src/main/index.ts'],
    platform: 'node',
    format: 'cjs',
    loader: { '.html': 'file' },
    external: ['electron'],
    outfile: 'dist/main.cjs',
    watch: { onRebuild: () => app?.restart() },
  });

  await build({
    ...sharedBuildOptions,
    entryPoints: ['src/preload/index.ts'],
    platform: 'node',
    format: 'cjs',
    external: ['electron'],
    outfile: 'dist/preload.js',
    watch: { onRebuild: () => app?.reload() },
  });

  await build({
    ...sharedBuildOptions,
    entryPoints: ['src/renderer/index.ts'],
    format: 'esm',
    loader: { '.html': 'file' },
    outfile: 'dist/renderer.js',
    watch: { onRebuild: () => app?.reload() },
  });

  const app = await electronmon({
    cwd: 'dist',
    args: ['main.cjs'],
    patterns: ['!**/*'], // reloading of electron is done in esbuild hooks
  });
})();
