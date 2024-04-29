export type TemplateObjType = {
  cn: string
  en: string
  top: boolean
  bottom: boolean
  select: boolean
  btn: string[]
}

function getBtnList(target: string[]) {
  const btnArr = typeof target === 'string' ? [target] : target
  const btnList = btnArr.map((item) => {
    return `<el-button type="primary">${item}</el-button>\n`
  })
  const result = `<template #filter-bottom>\n<el-button-group>\n${btnList.join('')}</el-button-group>\n</template>\n`
  return result
}

function transfromTemplate(target: TemplateObjType) {
  const templateHeader = `<!-- ${target.cn} --><template><div class="h-full"><el-pro-table-v2 ref="proTableRef" :filters="filterList" :columns="tableColums" :filter-props="{customId: '${target.en || target.cn || 'customId'}'}" :table-props="{customId: '${target.en || target.cn || 'customId'}'}" :get-data="tableGetData" max-height="auto" scroll-target="main_wrap_hook" init-get `

  const isSelect = target.select ? `@selection-change="onSelectionChange">\n\n` : '>\n\n'
  const filterTop = target.top ? `<template #filter-top></template>\n` : ''
  const filterBottom = target.btn ? getBtnList(target.btn) : ''
  const tableBottom = target.bottom ? `<template #table-bottom></template>\n\n` : ''
  const templateFooter = `</el-pro-table-v2></div></template>\n\n`

  const result = templateHeader + isSelect + filterTop + filterBottom + tableBottom + templateFooter

  return result
}

export { transfromTemplate }
