const filterMaterial = {
    input: {
      label: '',
      key: '',
      component: 'jlc-input',
      value: null,
      attrs: { maxlength: 50 },
    },
    select: {
      label: '',
      key: '',
      component: 'jlc-select',
      type: 'select',
      value: null,
      selectChildren: 'Options.mockList',
    },
    daterange: {
      label: '',
      key: '',
      nextKey: '',
      type: 'rangeDate',
      value: `[dayjs().subtract(3, 'month').startOf('day').format('YYYY-MM-DD'), dayjs().endOf('day').format('YYYY-MM-DD')]`,
    },
    datetime: {
      label: '',
      key: '',
      component: 'jlc-date-picker',
      attrs: {
        type: 'datetime',
      },
      value: `dayjs().format('YYYY-MM-DD HH:mm:ss')`,
    },
    date: {
      label: '',
      key: '',
      component: 'jlc-date-picker',
      type: 'date',
      value: `dayjs().format('YYYY-MM-DD')`,
    },
    datetimerange: {
      label: '',
      key: '',
      value: [],
      component: 'jlc-date-picker',
      attrs: {
        type: 'datetimerange',
      },
      transform: `(value) => {
        /** 请求前对值的转换函数 */
        const [beginDate, endDate] = value;
        /** 返回的对象类型，默认会拉平，如不需要可配置flatTransform参数 */
        return { beginDate, endDate };
      }`,
    },
  }
  
  const columsMaterial = {
    select: {
      type: 'selection',
      label: '',
      width: 60,
    },
    index: {
      type: 'index',
      label: '序号',
      width: 60,
    },
    text: {
      label: '',
      prop: '',
      showOverflowTooltip: true,
    },
    link: {
      label: '',
      prop: '',
      type: 'link',
      showOverflowTooltip: true,
      onClick: `(row: any) => {}`,
    },
    time: {
      label: '',
      prop: '',
      type: 'time',
      showOverflowTooltip: true,
    },
    date: {
      label: '',
      prop: '',
      type: 'date',
      showOverflowTooltip: true,
    },
    datetime: {
      label: '',
      prop: '',
      type: 'datetime',
      formatDate: 'YYYY-MM-DD HH:mm:ss',
      showOverflowTooltip: true,
    },
    option: {
      label: '',
      prop: '',
      showOverflowTooltip: true,
      type: 'enumList',
      list: 'Options.mockList',
    },
    tag: {
      label: '',
      prop: '',
      type: 'tagType',
      list: 'Options.mockList',
    },
    operate: {
      label: '操作',
      width: 150,
      fixed: 'right',
      render: `(h: (...args: any) => any, row: any) => { return h(JlcButtonGroup, {}, { default: () => [h(JlcButton, { type: 'primary', onClick: () => {} }, { default: () => '编辑' }), h(JlcButton, { type: 'primary', onClick: () => {}}, { default: () => '删除' })]})}`,
    },
  }
  
  export { filterMaterial, columsMaterial }