import { getRefType, getRefname } from './index'
import { typeMap } from '../constant/type'
import { map2obj } from '@swiftcode/utils'
import { type SwaggerStuctType, type DefinitionsValueType } from '../index'

let definitions = {}

// 将整个 swagger 转化为接口服务对象，值为各项格式化内容
async function api2structure(target: SwaggerStuctType, type: DefinitionsValueType) {
  definitions = type
  const formatTagAndPathObj = transformTagAndPath(target)
  const wholeStructureContent = transformAllPath(formatTagAndPathObj)

  return wholeStructureContent
}

// swagger 转成 Map[tag: {}] 形式
function transformTagAndPath(target: SwaggerStuctType) {
  const result = new Map()

  const apaths = target.paths
  const atags = target.tags

  for (const item of atags) {
    result.set(item?.name ?? Math.random().toFixed(1), {
      ...item,
      path: {}
    })
  }

  for (const path in apaths) {
    const pathContent = apaths[path]
    const reqMethods = Object.keys(pathContent)
    for (const req of reqMethods) {
      const reqContent = pathContent[req]
      const reqTags = reqContent && Object.keys(reqContent).length && reqContent.tags
      for (const tag of reqTags) {
        const currentTagContent = result.get(tag)
        if (currentTagContent) {
          const pathObj = currentTagContent.path
          Object.assign(pathObj, {
            [path]: pathContent
          })
          result.set(tag, Object.assign(currentTagContent, { path: pathObj }))
        }
      }
    }
  }

  return map2obj(result)
}

// 转化所有服务
function transformAllPath(target: Record<string, any>) {
  for (let fileName in target) {
    fileFlatPath(target[fileName])
  }
  return target
}

// 转化单个服务的接口列表
function fileFlatPath(target: Record<string, any>) {
  target.pathFormat = {}
  for (let [pathUrl, pathItem] of Object.entries(target.path)) {
    const fileContent = {}
    // TODO pathItem 有可能为空
    if (pathItem) {
      for (let [method, pathContent] of Object.entries(pathItem)) {
        Object.assign(fileContent, {
          pathUrl: pathUrl,
          method: method,
          summary: pathContent.summary,
          responsesType: getPathResType(pathContent),
          requestType: getPathReqType(pathContent)
        })
      }
    }
    Object.assign(target.pathFormat, { [pathUrl]: fileContent })
  }
}

// 获取返回类型
function getPathResType(target: Record<string, any>) {
  let result = {}
  const schemaContent = target.responses[200].schema

  // 返回参数类型 1
  if (schemaContent?.$ref) {
    const refname = schemaContent.$ref
    result = getRefType(refname, definitions)
  }

  // 返回参数类型 2
  if (schemaContent?.type) {
    let type = schemaContent.type
    if (type === 'integer' && schemaContent.format) {
      type = schemaContent.format
    }
    result = type && Object.keys(typeMap).includes(type) ? typeMap[type as keyof typeof typeMap] : type
  }

  return result
}

// 获取请求类型
function getPathReqType(target: Record<string, any>) {
  const parameters = target.parameters
  const paramsType = Array.isArray(parameters) && parameters.length && parameters[0].in
  const result = {}

  // 请求参数类型 1
  if (paramsType === 'query') {
    for (let param of parameters) {
      let type = param.type
      if (type === 'integer' && param.format) {
        type = param.format
      }
      Object.assign(result, {
        [param.name]: typeMap[type as keyof typeof typeMap]
      })
    }
  }
  if (paramsType === 'body') {
    for (let param of parameters) {
      // 请求参数类型 2
      const refname = param.schema && param.schema.$ref

      if (refname) {
        Object.assign(result, {
          [param.name]: getRefType(refname, definitions)
        })
        Object.assign(result, {
          refname: getRefname(refname)
        })
      } else if (param.schema && param.schema.type === 'array') {
        // 请求参数类型 3
        const paramSchema = param.schema
        let itemType = paramSchema.items && paramSchema.items.type
        if (!paramSchema.items) {
          Object.assign(result, {
            [param.name]: []
          })
        }
        // 请求参数类型 4
        if (itemType === 'integer' && paramSchema?.items?.format) {
          itemType = paramSchema.items.format
        }
        if (itemType && Object.keys(typeMap).includes(itemType)) {
          Object.assign(result, {
            [param.name]: [typeMap[itemType as keyof typeof typeMap]]
          })
        }
        // 请求参数类型 5
        if (paramSchema?.items?.$ref) {
          Object.assign(result, {
            [param.name]: getRefType(paramSchema.items.$ref, definitions)
          })
          Object.assign(result, {
            refname: getRefname(paramSchema.items.$ref)
          })
        }
      }
    }
  }
  // 请求参数类型 6
  if (paramsType === 'formData') {
    for (let param of parameters) {
      let typeresult = null
      let type = param.type
      if (type === 'integer' && param.format) {
        type = param.format
      }
      if (Object.keys(typeMap).includes(type)) {
        // TODO replace #File File
        typeresult = type === 'file' ? '#File' : typeMap[type as keyof typeof typeMap]
      } else {
        typeresult = type
      }
      Object.assign(result, {
        [param.name]: typeresult
      })
    }
  }
  return result
}

export { api2structure }
