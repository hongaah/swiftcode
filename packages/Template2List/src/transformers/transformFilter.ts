import { filterMaterial } from './index'

// const example = {
//   x1: 'input',
//   x2: 'select',
//   x3: 'daterange',
//   x4: {
//     type: 'daterange',
//     range: [1, 'm'] // 第二个参数可以是 d m y
//   },
//   x5: 'datetime',
//   x6: 'date',
//   x7: 'datetimerange',
// }

export type FilterMaterialType = keyof typeof filterMaterial

type rangeDateType = {
  type: 'daterange' | 'datetimerange'
  range: [number, 'd' | 'm' | 'y']
}

export type FilterObjType = Record<string, FilterMaterialType | rangeDateType>

const DateMap = {
  d: 'day',
  m: 'month',
  y: 'year',
}

function transformFilter(target: FilterObjType) {
  const result = []
  if (String(target) !== '[object Object]') {
    throw new Error('请传入对象类型')
  }
  for (let index = 0; index < Object.entries(target).length; index++) {
    const [label, content] = Object.entries(target)[index]
    const itemType = (typeof content === 'object' ? content.type : content) || 'input'
    const resultItem = { ...filterMaterial[itemType] }
    resultItem.label = label
    resultItem.key = `param${index + 1}`
    if (itemType === 'daterange') {
      Object.assign(resultItem, { nextKey: `param0${index + 1}` })
    }

    // content: string | object
    if (typeof content === 'object') {
      if (content.range) {
        const nextkey = content.range[1] ? `'${DateMap[content.range[1]]}'` : 'month'
        resultItem.value = `[dayjs().subtract(${
          content.range[0] ? content.range[0] : 1
        }, ${nextkey}).startOf('day').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')]`
      }
    }

    result.push(resultItem)
  }
  return result
}

export { transformFilter }