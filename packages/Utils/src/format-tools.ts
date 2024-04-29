import prettier from 'prettier'
import { readFile } from './node-tools'

export default async function formatPage(filename: string) {
  const code = readFile(filename)
  const result = await prettier.format(code, {
    filepath: filename,
    tabWidth: 2,
    useTabs: false,
    printWidth: 120,
    singleQuote: true,
    semi: false,
    trailingComma: 'none',
    bracketSameLine: true,
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
    vueIndentScriptAndStyle: true
  })

  return result
}