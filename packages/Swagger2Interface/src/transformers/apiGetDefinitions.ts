import { typeMap } from '../constant/type'
import { type SwaggerDefinitionsStuctType, type DefinitionsValueType } from '../index'

// 将 swagger apijson 转纯类型对象
function apiGetDefinitions(target: SwaggerDefinitionsStuctType) {
  const apiDefinitions = apiAddDefinitions(target)
  const result = {}
  for (const [name, content] of Object.entries(apiDefinitions)) {
    Object.assign(result, { [name]: content.definition })
  }
  return result
}

// target: api.definitions，给 target 各个对象添加 definition 属性，properties 类型转化 definitions
function apiAddDefinitions(target: SwaggerDefinitionsStuctType) {
  for (let targetKey in target) {
    transformSingleType(target[targetKey])
  }
  for (let targetKey in target) {
    transformRef(target[targetKey], target)
  }
  return target
}

// 转化 definitions 内的单个对象，给该对象添加 definition 属性，该属性取 properties 各个类型
function transformSingleType(target: DefinitionsValueType) {
  const properties = target.properties
  const definition = {}
  if (properties) {
    for (let [k, properItemContent] of Object.entries(properties)) {
      if (properItemContent.type) {
        if (properItemContent.type === 'array') {
          const itemType = properItemContent.items && properItemContent.items.type
          if (!properItemContent.items) {
            Object.assign(definition, {
              [k]: []
            })
          }
          if (itemType && Object.keys(typeMap).includes(itemType)) {
            let type = itemType
            if (itemType === 'integer' && properItemContent.items.format) {
              type = properItemContent.items.format
            }
            Object.assign(definition, {
              [k]: [typeMap[type as keyof typeof typeMap]]
            })
          }
          if (properItemContent?.items?.$ref) {
            Object.assign(definition, {
              [k]: properItemContent.items.$ref
            })
          }
        }

        if (Object.keys(typeMap).includes(properItemContent.type)) {
          let type = properItemContent.type
          if (type === 'integer' && properItemContent.format) {
            type = properItemContent.format
          }
          Object.assign(definition, {
            [k]: typeMap[type as keyof typeof typeMap]
          })
        }
      }
      if (properItemContent?.$ref) {
        Object.assign(definition, {
          [k]: properItemContent.$ref
        })
      }
    }
    Object.assign(target, {
      definition: definition
    })
  }
}

// 转化 definitions 内所有含有 ref 的
function transformRef(target: DefinitionsValueType, allDefinition: SwaggerDefinitionsStuctType) {
  const definition = target.definition
  if (definition) {
    for (let k in definition) {
      const definitionItemContent = definition[k]
      const tag = '#/definitions/'
      let reusableName = ''
      // 避免自己引用自己类型 死循环
      if (
        typeof definitionItemContent === 'string' &&
        definitionItemContent.includes(tag) &&
        definitionItemContent !== '#/definitions/File' &&
        target.title !== definitionItemContent.split(tag)[1]
      ) {
        reusableName = definitionItemContent.split(tag)[1]

        let clonedDefinition = {}
        try {
          clonedDefinition =
            allDefinition?.[reusableName]?.definition &&
            JSON.parse(JSON.stringify(allDefinition[reusableName].definition))
        } catch (e) {
          console.log(`异常值${allDefinition[reusableName].definition}`, e)
        }

        Object.assign(definition, {
          [k]: clonedDefinition
        })
      }
    }
  }
}

// // definitions to 类型数组
// function apiGetType(definitions: DefinitionsValueType) {
//   const typeResult = []
//   const definitionsArr = Object.values(definitions)
//   for (const definition of definitionsArr) {
//     const properItemContent = definition.properties
//     if (!properItemContent) {
//       console.log('非对象')
//       break
//     }
//     const propertiesArr = Object.values(properItemContent)
//     for (const item of propertiesArr) {
//       typeResult.push(item.type)
//     }
//   }
//   return [...new Set(typeResult)] // ['number', 'integer', 'string', 'array', undefined, 'boolean', 'object']
// }

// 获取类型 target：已转好的类型内容 result: 获取某个类型定义
function getRefType(target: string, definitions: Record<string, any>) {
  const refname = getRefname(target)
  return { [refname]: definitions[refname] && definitions[refname].definition }
}

function getRefname(target: string) {
  if (!target) return ''
  const character = '#/definitions/'
  let refname = target
  if (target.includes(character)) {
    refname = target.split(character)[1]
  }
  return refname
}

export { apiAddDefinitions, apiGetDefinitions, getRefType, getRefname }
