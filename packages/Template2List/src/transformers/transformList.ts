import { transformFilter, transformTable, transfromTemplate, type SfcOptionsType } from './index'

function transformList(target: SfcOptionsType) {
  let result = null

  const pageHeader = transfromTemplate(target.template || {})

  const scriptHeader = `<script setup lang="ts">import { dayjs } from '@jlc/utils';import { JlcFilterItem, JlcProTableV2, JlcTableColumn, JlcButtonGroup, JlcButton } from '@jlc/vue3';import { findItemFromConstans } from '@/utils/tools';import hasAuth from '@/utils/permission';import * as Options from '@/constants/manufacturing-management';import * as Mock from './mock';\n\n
  const proTableRef = ref<any>();\n\nconst tableGetData = async (params: any) => {
    // const { root: list, totalRows: total } = await API.engineeringmakingDatapage(params)
    // return {
    //   list: list,
    //   total
    // }
    return {list: Mock.tableData, total: 0};};\n\n`

  const filter = `const filterList = ${JSON.stringify(transformFilter(target.filter || {}))} as JlcFilterItem[];\n\n`
  const table = `const tableColums = ${JSON.stringify(transformTable(target.table || {}))} as JlcTableColumn[];\n\n</script>`

  result = pageHeader + scriptHeader + filter + table
  return result
}

export { transformList }