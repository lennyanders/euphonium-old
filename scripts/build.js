import { rm, mkdir, copyFile, access } from 'fs/promises';
import { execSync } from 'child_process';
import { build } from 'esbuild';
import { build as viteBuild } from 'vite';
import preact from '@preact/preset-vite/dist/cjs/index.js'; // see https://github.com/preactjs/preset-vite/issues/11
import { build as electronBuild } from 'electron-builder';

/** @type {import('esbuild').BuildOptions} */
const sharedBuildOptions = {
  bundle: true,
  minify: true,
  logLevel: 'info',
  platform: 'node',
  format: 'cjs',
  external: ['electron', 'sharp'],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
};

(async () => {
  try {
    await rm('dist', { recursive: true, force: true });
  } finally {
    await mkdir('dist');
  }

  try {
    await access('build/better_sqlite3.node');
  } catch (_) {
    execSync('npm run rebuild');
    await mkdir('build', { recursive: true });
    await copyFile(
      'node_modules/better-sqlite3/build/Release/better_sqlite3.node',
      'build/better_sqlite3.node',
    );
  }

  await build({
    ...sharedBuildOptions,
    entryPoints: ['src/main/index.ts'],
    outfile: 'dist/main.cjs',
  });

  await build({
    ...sharedBuildOptions,
    entryPoints: ['src/preload/index.ts'],
    outfile: 'dist/preload.js',
  });

  await viteBuild({
    configFile: false,
    root: 'src/renderer',
    base: './',
    css: { modules: { localsConvention: 'camelCase' } },
    plugins: [preact.default()], // see https://github.com/preactjs/preset-vite/issues/11
    build: {
      outDir: `${process.cwd()}/dist`,
    },
  });

  await electronBuild({
    config: {
      files: ['dist/**/*', 'build/**/*'],
      directories: {
        output: 'release',
      },
    },
  });
})();
