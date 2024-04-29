import path from 'path'
import url from 'url'
import { generateFile, readFile } from '@quickcode/utils'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export function dirName() {
  return __dirname
}

export function createTemplate(fileName, tips) {
  const generatedFile = path.join(dirName(), fileName)

  const sourceContent = readFile(generatedFile)
  const __dirname = path.resolve()
  generateFile(path.join(__dirname, fileName), sourceContent)
  console.log(tips)
}

export function getPackageVersion() {
  const packageJson = path.join(dirName(), './package.json')
  const version = JSON.parse(readFile(packageJson)).version

  return version
}
