import { hump2Line, generateFolder, generateFile, formatPage } from '@swiftcode/utils'
import { transformList, getTableData, type FilterObjType, type TableObjType, type TemplateObjType } from './index'

export type RenderRoutesType = {
  isRender: boolean
  menu?: {
    en: string
    cn: string
  }
}

export type SfcOptionsType = {
  filter: FilterObjType
  template: TemplateObjType
  table: TableObjType
}

export type RenderPagesType = Record<string, SfcOptionsType>

export type RenderOptionsType = {
  dir?: string
  mock?: boolean
  readMe?: boolean
  pages: RenderPagesType
  routes: RenderRoutesType
}

const absoluteDirAddress = process.cwd()

const defaultRoutes = {
  isRender: false,
  menu: {
    cn: '模板',
    en: 'template'
  }
}

async function autoroutes(options: RenderOptionsType) {
  const { dir, pages, routes } = options

  if (!routes.isRender) return

  const routesContent = []
  const routeTitle = routes?.menu?.cn ?? defaultRoutes.menu.cn
  const routeEnName = routes?.menu?.en ?? defaultRoutes.menu.en
  const routeLineName = hump2Line(routeEnName)

  for (const [pageName, page] of Object.entries(pages)) {
    if (!Object.keys(page).length) return

    const pageTemplateInfo = page?.template || {}

    if (!Object.keys(pageTemplateInfo).length) return

    const fileEnName = pageTemplateInfo.en
    const fileLineName = hump2Line(fileEnName)

    const route = {
      path: `/${routeEnName}/${fileEnName}`,
      name: fileEnName,
      meta: { title: pageName },
      component: `() => import('@/views/${routeLineName}/${fileLineName}/index.vue')`
    }

    routesContent.push(route)
  }

  const routeFileContent = `export const ${routeEnName}Routes = ${JSON.stringify(routesContent, undefined, 2)};export const menuItem = { title: '${routeTitle}', routes: ${routeEnName}Routes };export default ${routeEnName}Routes;`

  const routeFileName = `${dir}/${routeLineName}.ts`
  generateFile(routeFileName, routeFileContent)
  const formatedRoute = await formatPage(routeFileName)
  generateFile(routeFileName, formatedRoute)
}

function total2lists(options: RenderOptionsType) {
  const { dir, mock, readMe, pages } = options

  for (const [, page] of Object.entries(pages)) {
    if (!Object.keys(page).length) return

    const pageTemplateInfo = page.template || {}
    if (!Object.keys(pageTemplateInfo).length) return

    const fileEnName = pageTemplateInfo.en
    const fileCnName = hump2Line(fileEnName)
    const folderFileName = `${dir}/${fileCnName}`

    const fileContent = transformList(page)
    const mockContent = `export const tableData = ${JSON.stringify(getTableData(page.table || {}), undefined, 2)}`
    const mdContent = `# ${pageTemplateInfo.cn}\n`

    generateFolder(folderFileName, async () => {
      const sfcFileName = `${absoluteDirAddress}/${folderFileName}/index.vue`
      generateFile(sfcFileName, fileContent)
      const formatedSfc = await formatPage(sfcFileName)
      generateFile(sfcFileName, formatedSfc, true)

      if (mock) {
        const mockFileName = `${absoluteDirAddress}/${folderFileName}/mock.ts`
        generateFile(mockFileName, mockContent)
        const formatedMock = await formatPage(mockFileName)
        generateFile(mockFileName, formatedMock, true)
      }

      readMe && generateFile(`${absoluteDirAddress}/${folderFileName}/${pageTemplateInfo.cn}.md`, mdContent)
    })
  }
}

function renderLists(options: RenderOptionsType) {
  const { dir = 'dist', mock = true, readMe = true, pages = {}, routes = defaultRoutes } = options
  const renderOptions = {
    dir,
    mock,
    readMe,
    pages,
    routes
  }

  generateFolder(dir)
  total2lists(renderOptions)
  autoroutes(renderOptions)
}

export { renderLists }
