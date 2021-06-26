import { build } from 'esbuild';
import electronmon from 'electronmon';

(async () => {
  await build({
    entryPoints: ['src/main/index.ts'],
    platform: 'node',
    format: 'cjs',
    bundle: true,
    minify: true,
    sourcemap: 'inline',
    loader: { '.html': 'file' },
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
