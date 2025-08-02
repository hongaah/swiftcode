import { Template2ListOutput, createTemplate } from '@swiftcode/list'
import { Swagger2InterfaceOutput } from '@swiftcode/api'

async function testapi() {
  try {
    await Swagger2InterfaceOutput({
      source: 'D:/github/swiftcode/mock/swagger.json',
      isDev: false,
      dir: 'apis',
    })
  } catch (error) {
    console.error('Error while generating api files:', error)
  }
}

async function testsfctemplate() {
  try {
    createTemplate('template.js', '下载转换列表的模板 template.js 成功')
  } catch (error) {
    console.error('Error while generating template files:', error)
  }
}

async function testsfc() {
  try {
    await Template2ListOutput({
      source: 'template.js',
      dir: 'D:/github/swiftcode-mcp-server/dist/lists'
    })
  } catch (error) {
    console.error('Error while generating sfc files:', error)
  }
}

// testapi()
testsfctemplate()
testsfc()
