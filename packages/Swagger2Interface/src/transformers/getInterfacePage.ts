import { isJson } from '@swiftcode/utils'
import { httpResultType } from '../constant/type'

/**
 * 定义类型文件的内容
 * @param {description: string, pathFormat: {}} target
 */

// type: interfaceName | typeName
function getTypeName(target: string, type?: string, isAll?: boolean) {
  const sliceIndex = target.indexOf('»»')
  const splitStr = target.slice(sliceIndex)
  if (target === 'HttpResult') {
    return type === 'interfaceName' ? `Record<string, never>` : ''
  }

  if (target.startsWith('HttpResult«List«')) {
    const HttpResultName = target.split('HttpResult«List«').join('').split('»»')[0]
    let result = ''
    const symbolMap = {
      '»»»»»': '»»»',
      '»»»»': '»»',
      '»»»': '»',
      '»»': ''
    }
    for (const item of Object.keys(symbolMap)) {
      if (target.includes(item)) {
        result = HttpResultName + symbolMap[item as keyof typeof symbolMap]
        break
      }
    }
    return type === 'interfaceName' ? `T.${result}[]` : result
  }

  return type === 'interfaceName' ? `T.'${target}'` : target

  if (target.startsWith('HttpResult«BasePageResponse«')) {
    const result = target.split('HttpResult«BasePageResponse«').join('').split(splitStr)[0]
    return type === 'interfaceName' ? `PageList<T.${result}>` : result
  }

  if (!['»»', '»»»', '»»»»', '»»»»»'].find((item) => target.includes(item)) && target.startsWith('HttpResult«')) {
    const HttpResultName = target.split('HttpResult«').join('').split('»')[0]
    const HttpResultNameReserved = Object.keys(httpResultType).find((item) => item === HttpResultName.toLowerCase())
    if (type === 'interfaceName') {
      return HttpResultNameReserved
        ? httpResultType[HttpResultNameReserved as keyof typeof httpResultType]
        : `T.${HttpResultName}`
    } else {
      return HttpResultNameReserved ? '' : HttpResultName
    }
  }

  return type === 'interfaceName' ? (target.includes('»') ? `T.'${target}'` : `T.${target}`) : target

  if (isAll) {
    return `T.'${target}'`
  }
}

function getInterfacePage(target: Record<string, any>, beforeTransformTs: string) {
  let content = `// ${target.description}
import http from '@/utils/http'
import { ERP_PLATFORM } from '@/constants/service'
import type * as T from './types'
import type { PageList } from '@/types'
`

  const fileType = []
  for (const [pathname, pathInfo] of Object.entries(target.pathFormat) as any) {
    let urlvar = pathname.replace(/\//g, '')

    let reqtype = ''
    if (pathInfo.requestType.refname) {
      reqtype = getTypeName(pathInfo.requestType.refname, 'interfaceName')
      fileType.push(getTypeName(pathInfo.requestType.refname))
    } else {
      if (typeof pathInfo.requestType === 'object' && Object.keys(pathInfo.requestType).length) {
        reqtype = JSON.stringify(pathInfo.requestType)
      } else {
        reqtype = 'Record<string, never>'
      }
    }

    let resType = ''
    if (typeof pathInfo.responsesType === 'object') {
      if (Object.keys(pathInfo.responsesType).length) {
        const typeName = Object.keys(pathInfo.responsesType)[0]
        resType = getTypeName(typeName, 'interfaceName')
        fileType.push(getTypeName(typeName))
      } else {
        resType = `Record<string, never>`
      }
    }
    if (['array', 'string'].includes(pathInfo.responsesType)) {
      resType = 'any'
    }

    let pathContent = `\n// ${pathInfo.summary}\nexport const ${urlvar} = http.${pathInfo.method}<${reqtype}, ${resType}>(`

    let pathContentEnd = '`${ERP_PLATFORM}' + pathInfo.pathUrl + '`)\n'
    content = content + pathContent + pathContentEnd
  }

  const targetTypeList = [...new Set(fileType)]
  const beforeDefinitions = isJson(beforeTransformTs) ? JSON.parse(beforeTransformTs) : {}
  const targetDefinitions = {}

  for (const targetTypeKey of targetTypeList) {
    if (beforeDefinitions[targetTypeKey]) {
      Object.assign(targetDefinitions, { [targetTypeKey]: beforeDefinitions[targetTypeKey] })
    }
  }

  return { content, definitions: JSON.stringify(targetDefinitions, undefined, 2) }
}

export { getInterfacePage }
