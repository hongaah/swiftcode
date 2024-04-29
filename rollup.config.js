import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

export default [
  {
    input: {
      'Swagger2Interface/index': './packages/Swagger2Interface/src/index.ts',
      'Template2List/index': './packages/Template2List/src/index.ts'
    },
    output: [
      {
        entryFileNames: '[name].cjs.js',
        dir: 'dist',
        format: 'cjs'
      },
      {
        entryFileNames: '[name].esm.js',
        dir: 'dist',
        format: 'es'
      }
    ],
    external: [
      'chalk',
      'commander',
      'inquirer',
      'ora',
      'process',
      'fs',
      'events',
      'buffer',
      'string_decoder',
      'prettier',
      'quicktype',
      'quicktype-core'
    ],
    plugins: [
      commonjs(),
      resolve(),
      terser(),
      json(),
      typescript({
        tsconfig: 'tsconfig.json'
      })
    ]
  }
]