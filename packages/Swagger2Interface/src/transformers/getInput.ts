import { formatDocName, isJson, readFile, request } from '@swiftcode/utils'
import { type OptionsType, type SwaggerStuctType } from '../index'

/**
 * 转化输入为可处理对象 js 格式
 * @param { type: 'json' | 'url', source: 文件路径{string}} target
 * @returns
 */
async function getInput(target: Pick<OptionsType, 'type' | 'source'>) {
  let result = null
  if (Object.prototype.toString.call(target) !== '[object Object]') {
    throw Error('请传入对象形式')
  }

  const { type, source } = target

  if (type === 'json') {
    if (!source) {
      throw Error('请传入文件路径')
    }

    const sourceContent = readFile(`${formatDocName(source)}`)

    if (!isJson(sourceContent)) throw Error('文件内容不是 JSON 格式！')
    const { tags, paths, definitions } = JSON.parse(sourceContent) ?? {}
    if (!tags || !paths || !definitions) {
      throw Error(`文档格式不支持，请传入 swagger json 文档`)
    }

    result = JSON.parse(sourceContent)
  }

  if (type === 'url') {
    if (source.startsWith('https') || source.startsWith('http')) {
      try {
        result = await request({
          url: source
        })
      } catch (e) {
        throw Error(`[ERROR] ${e}`)
      }

      const { tags, paths, definitions } = (result ?? {}) as SwaggerStuctType
      if (!tags || !paths || !definitions) {
        throw Error(`[ERROR] 格式不支持，请传入 swagger json 文档`)
      }
    } else {
      throw Error(`[ERROR] 地址不支持，请传入完整请求地址`)
    }
  }

  return result
}

export { getInput }
