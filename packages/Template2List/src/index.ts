import path from 'path'
import { formatDocName, readFile, generateFile, removeFile } from '@swiftcode/utils'
import { renderLists } from './transformers/renderLists'

export type RenderOptionsType = {
  source: string
}

async function loadModule(path: string) {
  const module = await import(path)

  return module
}

async function Template2ListOutput(options: RenderOptionsType) {
  const { source } = options
  const sourceContent = readFile(`${formatDocName(source)}`)

  const localPathAbsoluteDir = process.cwd()
  // const \_\_dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const tempFile = './temp_list_config.mjs'
  const tempListConfigFile = path.join(localPathAbsoluteDir, tempFile)
  // 导入一个位于电脑磁盘符下的绝对路径文件 C:\path\to\example.js 需使用 file:// 协议
  const localfilesImportPattern = `file:///${tempListConfigFile}`.replaceAll('/', '\\')

  await generateFile(tempFile, sourceContent)
  const { default: listConfig } = await loadModule(localfilesImportPattern)
  await renderLists(listConfig)
  removeFile(tempFile)
}

function renderTemplate() {
  const sourceContent = readFile('./template.js')

  generateFile('template.js', sourceContent)
  console.log('下载转换列表的模板 template.js 成功')
}

process.on('uncaughtException', function (err) {
  console.log(`${err.message}`)
})

// Template2ListOutput({
//   source: './template.js',
// })

export { Template2ListOutput, renderLists, renderTemplate }
