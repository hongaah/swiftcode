import { getInterfacePage, api2structure, convertJsonToTsType } from './index'
import { generateFolder, generateFile } from '@swiftcode/utils'
import { type SwaggerStuctType, type DefinitionsValueType } from '../index'

export type renderInterfaceOptions = {
  target: SwaggerStuctType
  dir?: string
  isDev?: boolean
  definitions: DefinitionsValueType
  beforeTransformTs: string
}

// 将整个 api 文件转成各个接口类型文件
// 先行条件：node A-renderInterfaceFile.js 存在 ${dir}/definitions.js 文件
async function renderInterfaceFile(source: renderInterfaceOptions) {
  const { target, definitions, dir = 'dist', isDev, beforeTransformTs } = source ?? {}
  const wholeStructureContent = await api2structure(target, definitions)

  generateFolder(
    'temp',
    () => {
      generateFile('temp/whole-structure-content.json', JSON.stringify(wholeStructureContent, undefined, 2), isDev)
    },
    isDev
  )

  for (let [fileName, fileContent] of Object.entries(wholeStructureContent)) {
    const { content, definitions } = getInterfacePage(fileContent, beforeTransformTs)
    const typesContent = await convertJsonToTsType(definitions)
    // const typesContentOrigin = definitions
    generateFolder(`${dir}`)
    generateFolder(
      `${dir}/${fileName}`,
      () => {
        generateFile(`${dir}/${fileName}/index.ts`, content)
        generateFile(`${dir}/${fileName}/types.ts`, typesContent)
      },
      isDev
    )
    // generateFile(`${dir}/${fileName}/definitions.ts`, typesContentOrigin)
  }
}

export { renderInterfaceFile }
