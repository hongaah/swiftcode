import { generateFile } from '@quickcode/utils'
import { filters, properties, filename } from './target.js'

const propertiesWithDesc = []

function formatProperties(properties) {
  const result = {}
  for (let [key, value] of Object.entries(properties)) {
    const reg =
      /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\s]/im
    let typeName = value.description
    if (reg.test(typeName)) {
      propertiesWithDesc.push(typeName)
      typeName = typeName.split(reg).length ? typeName.split(reg)[0] : Math.random()
    }
    Object.assign(result, { [typeName]: key })
  }
  return result
}

function matchingFieldFormat(filterList, types) {
  const error = []
  const properties = formatProperties(types)
  for (let item of filterList) {
    for (let type in properties) {
      if (Object.keys(properties).includes(item.label)) {
        if (item.label === type) {
          item.key = properties[type]
        }
      } else {
        error.push(item.label)
      }
    }
  }

return {
    properties,
    filterList,
    error,
  }
}

function matchingField(filters, properties) {
  const { error, filterList, properties: type } = matchingFieldFormat(filters, properties)

const content = `const properties = ${JSON.stringify(type)} \nconst filterList = ${JSON.stringify(
    filterList
  )}\n\n\nconst error = '${[...new Set(error)].join(', ')}'\n\nconst propertiesDesc = '${[
    ...new Set(propertiesWithDesc),
  ].join('\n')}'\n`
  generateFile(`dist/${filename}.js`, content)
}

matchingField(filters, properties)