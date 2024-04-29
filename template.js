const select = 'select'
const selection = 'selection'
const index = 'index'
const text = 'text'
const link = 'link'
const time = 'time'
const option = 'option'
const tag = 'tag'
const operate = 'operate'
const input = 'input'
const daterange = 'daterange'
const datetime = 'datetime'
const date = 'date'
const datetimerange = 'datetimerange'
const left = 'left'
const right = 'right'

const pageContents = {
  模板列表: {
    template: {
      cn: '模板列表',
      en: 'templateList',
      top: true,
      bottom: true,
      select: true,
      btn: ['新增', '删除'],
    },
    filter: {
      输入框: input,
      选择框: select,
      日期范围选择框: daterange,
      日期时间选择框: datetime,
      日期字段: date,
      日期时间范围选择框: datetimerange,
      日期月范围选择框: {
        type: 'daterange',
        range: [1, 'm'], // 第二个参数可以是d m y
      },
    },
    table: {
      选择: select,
      序号: index,
      输入框: text,
      链接字段: link,
      时间字段: time,
      日期字段: date,
      日期时间字段: {
        type: datetime,
        formatDate: 'MM-DD HH:mm',
      },
      选择字段: option,
      标签字段: tag,
      操作: {
        type: operate,
        fixed: 'right',
        render: ['修改', '删除'],
      },
    },
  },
  简单列表: {
    template: {
      cn: '简单列表',
      en: 'simpleList',
    },
    filter: {},
    table: {
      序号: index,
      输入框: text,
      链接字段: link,
      时间字段: time,
      日期字段: date,
    },
  },
}

const defineListConfig = {
  dir: '.lists',
  pages: pageContents,
  routes: {
    isRender: true,
    menu: {
      en: 'templateManagement',
      cn: '模板列表',
    },
  },
  mock: true,
  readMe: false,
}

export default defineListConfig
