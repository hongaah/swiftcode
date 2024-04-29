import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: {
      index: './src/index.ts'
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
    watch: {
      exclude: 'node_modules/**',
      include: 'src/**'
    },
    external: ['fs', 'prettier'],
    plugins: [
      commonjs(),
      resolve(),
      terser(),
      typescript({
        tsconfig: 'tsconfig.json'
      })
    ]
  },
  {
    input: './src/index.ts',
    output: [{ file: './dist/types/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]