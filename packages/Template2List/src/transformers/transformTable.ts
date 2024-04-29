import { columsMaterial } from './index'

// const example = {
//   x0: 'select',
//   x1: 'index',
//   x2: 'text',
//   x3: 'link',
//   x5: 'time',
//   x6: 'option',
//   x4: 'tag',
//   x8: 'operate',
//   x7: {
//     type: 'operate',
//     render: ['作废', '删除']
//   },
//   x8: {
//     type: 'text',
//     fixed: 'left'
//   },
//   x9: {
//     type: 'datetime',
//     formatDate: 'YYYY-MM-DD HH:mm:ss'
//   },
//   x10: 'date',
// }

export type ColumsMaterialType = keyof typeof columsMaterial

type CustomType = {
  type: ColumsMaterialType
  render: string[]
  fixed: 'left' | 'right'
  formatDate: string
}

export type TableObjType = Record<string, ColumsMaterialType | CustomType>

function getColumnOperateRender(target: string[]) {
  const btnList = target.map((item) => {
    return `h(ElButton, {type: 'primary', onClick: () => {}}, { default: () => '${item}' })`
  })
  return `(h: (...args: any) => any, row: any) => {return h(ElButtonGroup, {}, { default: () => [` + `${btnList}]})}`
}

function transformTable(target: TableObjType) {
  const result = []
  if (String(target) !== '[object Object]') {
    throw new Error('请传入对象类型')
  }
  for (let index = 0; index < Object.entries(target).length; index++) {
    const [label, content] = Object.entries(target)[index]
    const itemType = typeof content === 'string' ? content : content?.type ?? 'text'
    const resultItem = {}

    // columsMaterial 未定义该类型
    if (typeof columsMaterial[itemType] === 'undefined') {
      Object.assign(resultItem, {
        type: itemType
      })
      Object.assign(resultItem, columsMaterial['text'])
    }
    if (typeof columsMaterial[itemType] === 'object') {
      Object.assign(resultItem, columsMaterial[itemType])
    }

    // 根据类型设置值
    if (!['select'].includes(itemType)) {
      Object.assign(resultItem, {
        label: label
      })
    }

    if (!['select', 'index', 'operate'].includes(itemType)) {
      Object.assign(resultItem, {
        prop: `prop${index + 1}`
      })
    }

    // 根据值设置
    // content: string | object
    if (typeof content === 'object') {
      if (content.fixed) {
        Object.assign(resultItem, {
          fixed: content.fixed
        })
      }
      if (content.formatDate) {
        Object.assign(resultItem, {
          formatDate: content.formatDate
        })
      }
      if (content.render) {
        if (Array.isArray(content.render) && content.render.length) {
          Object.assign(resultItem, {
            render: getColumnOperateRender(content.render)
          })
        }
      }
    }

    result.push(resultItem)
  }
  return result
}

function getTableData(target: TableObjType) {
  if (String(target) !== '[object Object]') {
    throw new Error('请传入对象类型')
  }
  const resultItem = {}
  Object.keys(target).forEach((item, index) => {
    Object.assign(resultItem, {
      ['prop' + (index + 1)]: String(index + 1)
    })
  })

  return Array.from({ length: 5 }, () => resultItem)
}

export { transformTable, getTableData }
