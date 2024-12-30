import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';

export default defineConfig([
  // CommonJS (Node js)
  {
    input: 'publicMethods.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      json(),
    ],
    external: [
      ...Object.keys(require('./package.json').dependencies || {}),
      ...Object.keys(require('./package.json').peerDependencies || {}),
    ],
  },
  // ESM (webpack and other builders)
  {
    input: 'publicMethods.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      json(),
    ],
    external: [
      ...Object.keys(require('./package.json').dependencies || {}),
      ...Object.keys(require('./package.json').peerDependencies || {}),
    ],
  },
]);
