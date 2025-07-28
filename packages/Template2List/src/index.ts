import path from 'path'
import url from 'url'
import { formatDocName, readFile, generateFile, removeFile } from '@swiftcode/utils'
import { renderLists } from './transformers/renderLists'

export type RenderOptionsType = {
  source: string,

  // 输出路径，优先于模板定义的 dir
  dir?: string
}

async function loadModule(path: string) {
  const module = await import(path)

  return module
}

async function Template2ListOutput(options: RenderOptionsType) {
  const { source, dir } = options
  const sourceContent = readFile(`${formatDocName(source)}`)

  const localPathAbsoluteDir = process.cwd()
  // const \_\_dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const tempFile = './temp_list_config.mjs'
  const tempListConfigFile = path.join(localPathAbsoluteDir, tempFile)
  // 导入一个位于电脑磁盘符下的绝对路径文件 C:\path\to\example.js 需使用 file:// 协议
  const localfilesImportPattern = `file:///${tempListConfigFile}`.replaceAll('/', '\\')

  await generateFile(tempFile, sourceContent)
  const { default: listConfig } = await loadModule(localfilesImportPattern)

  if (dir) {
    listConfig.dir = dir
  }
  await renderLists(listConfig)
  removeFile(tempFile)
}

function createTemplate(
  fileName: string,
  tips?: string,
  dir?: string
): void {
  const __dirname: string = path.dirname(url.fileURLToPath(import.meta.url))
  const generatedFile = path.join(__dirname, fileName)
  const sourceContent = readFile(generatedFile) as string
  const genDir = dir ?? path.resolve()
  generateFile(path.join(genDir, fileName), sourceContent)

  if (tips) {
    console.log(tips)
  }
}

process.on('uncaughtException', function (err) {
  console.log(`${err.message}`)
})

// Template2ListOutput({
//   source: './template.js',
// })

export { Template2ListOutput, renderLists, createTemplate }
