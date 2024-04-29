const filename = '药水供应商列表 req'

const filters = [
  { label: '对账单号', key: '' },
  { label: '供应商简称', key: '' },
  { label: '对账月份', key: '' },
  { label: '生产地区', key: '' },
  { label: '工艺类型', key: '' },
  { label: '费用产生日期', key: '' },
  { label: '推送进销存', key: '' },
  { label: '采购订单号', key: '' },
  { label: '应付对账单号', key: '' },
]

const properties = {
  outDetailType: {
    type: 'integer',
    format: 'int32',
    description: '外发类型 枚举值：ProductionOutDetailTypeEnum',
    allowEmptyValue: false,
  },
  pageNum: {
    type: 'integer',
    format: 'int32',
    description: '当前页码',
    allowEmptyValue: false,
  },
  pageSize: {
    type: 'integer',
    format: 'int32',
    description: '每页行数',
    allowEmptyValue: false,
  },
  produceFactory: {
    type: 'string',
    description: '生产地区 枚举值：ProductFactoryEnum',
    allowEmptyValue: false,
  },
  supplierName: {
    type: 'string',
    description: '供应商名字',
    allowEmptyValue: false,
  },
}
export { filters, properties, filename }