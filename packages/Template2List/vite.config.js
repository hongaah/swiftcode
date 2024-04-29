import commonjs from 'vite-plugin-commonjs'
import { resolve } from 'path'

export default {
  plugins: [
    commonjs({
      include: /Template2List/,
      extensions: ['.js'], // 需要转换的文件扩展名
      ignoreGlobal: false, // 是否忽略全局变量（例如 Buffer）
      sourceMap: false, // 是否生成源映射
      namedExports: {}, // 命名导出（名称和值）
      ignore: [], // 忽略文件的正则表达式
      transformMixedEsModules: true, // 是否转换混合的 ES 模块
    }),
  ],
  build: {
    target: 'modules',
    minify: true,
    lib: {
      entry: './index.js',
      name: 'Template2List',
    },
    rollupOptions: {
      external: ['chalk', 'commander', 'inquirer', 'quicktype-core', 'ora', 'fs'],
      input: {
        index: './index.js',
        renderLists: './transformers/renderLists.js',
      },
      output: {
        format: 'cjs',
        //不用打包成.mjs
        entryFileNames: '[name].js',
        //让打包目录和我们目录对应
        preserveModules: true,
        //配置打包根目录
        dir: resolve(\_\_dirname, '../../dist/Template2List'),
      },
    },
  },
}
