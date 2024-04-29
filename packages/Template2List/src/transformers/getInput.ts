import { formatDocName, readFile } from '@quickcode/utils'

export type InputType = {
  type: 'json'
  source: string
}

/**
 * 转化输入为可处理对象 js 格式
 * @param { type: 'json', source: 文件路径{string}} target
 * @returns
 */
async function getInput(target: InputType) {
  let result = null
  if (Object.prototype.toString.call(target) !== '[object Object]') {
    throw Error('请传入对象形式')
  }

  const { type = 'json', source } = target

  if (type === 'json') {
    if (!source) {
      throw Error('请传入文件路径')
    }

    const sourceContent = readFile(`${formatDocName(source)}`)

    result = sourceContent
  }

  return result
}

process.on('uncaughtException', function (err) {
  console.log(`${err.message}`)
})

export { getInput }