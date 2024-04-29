import { convertJsonToTsType, apiAddDefinitions, apiGetDefinitions } from './index'
import { json2moduleContent, generateFolder, generateFile, formatPage } from '@swiftcode/utils'
import { type OptionsType, type SwaggerStuctType } from '../index'

async function renderDefinitionFile(
  source: Pick<OptionsType, 'dir' | 'isDev'> & {
    target: SwaggerStuctType
  }
) {
  const { target, dir = 'dist', isDev } = source ?? {}
  if (!target) throw Error(`输入为空`)

  // 将 swagger api 转化为 definitions 对象文件
  const definitionsContent = apiAddDefinitions(target.definitions)
  const fileContent = json2moduleContent(definitionsContent, 'definitions')

  // 将 swagger api 转化为纯类型文件
  const beforeTransformTs = JSON.stringify(apiGetDefinitions(target.definitions), undefined, 2)

  // 转成类型声明文件
  try {
    await convertJsonToTsType(beforeTransformTs)
    // generateFolder(`${dir}`)
    // generateFile(`${dir}/definitions.ts`, interfaceContent)
  } catch (e) {
    console.log('[ERROR] JSON 转换为 TypeScript 失败', e)
  }

  generateFolder(dir, async () => {
    const definitionsFileName = `${dir}/definitions.js`
    generateFile(definitionsFileName, fileContent, isDev)
    const formatedDefinitions = await formatPage(definitionsFileName)
    generateFile(definitionsFileName, formatedDefinitions)
  })

  generateFolder(
    'temp',
    async () => {
      generateFile('temp/before-transform-ts.json', beforeTransformTs, isDev)
    },
    isDev
  )

  return {
    definitionsContent,
    beforeTransformTs
  }
}

export { renderDefinitionFile }
