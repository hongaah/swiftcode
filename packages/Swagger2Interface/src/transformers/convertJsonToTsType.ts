import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core'

// 转成类型声明文件
async function convertJsonToTsType(target: string) {
  // 设置目标语言为 TypeScript
  const lang = 'typescript'
  const jsonInput = jsonInputForTargetLanguage(lang)
  await jsonInput.addSource({ name: 'output', samples: [target] })

  // 创建 quicktype-core 输入数据
  const inputData = new InputData()
  inputData.addInput(jsonInput)

  // 使用 quicktype-core 进行转换
  const { lines } = await quicktype({
    inputData,
    lang,
    indentation: '  ',
    inferEnums: false,
    allPropertiesOptional: true,
    rendererOptions: {
      'just-types': 'true',
    },
  })

const result = lines.join('\n')
  return result
}

export { convertJsonToTsType }