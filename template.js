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
      客编: input,
      加急单: select,
      交期: daterange,
      完成时间: datetime,
      下通知单日期: date,
      拼板时间: datetimerange,
      下单日期: {
        type: 'daterange',
        range: [1, 'm'], // 第二个参数可以是d m y
      },
    },
    table: {
      选择: select,
      序号: index,
      客编: text,
      生产编号: link,
      审核时间: time,
      下通知单日期: date,
      完成时间: {
        type: datetime,
        formatDate: 'MM-DD HH:mm',
      },
      分配地区: option,
      类型: tag,
      操作: {
        type: operate,
        fixed: 'right',
        render: ['审核', '同步'],
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
      客编: text,
      生产编号: link,
      审核时间: time,
      下通知单日期: date,
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
