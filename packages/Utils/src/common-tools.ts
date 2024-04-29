function formatDocName(target: string) {
  if (typeof target !== 'string') {
    throw Error('文件名请传入字符串格式')
  }

  return target.startsWith('/') ? target.slice(1) : target
}

// 驼峰转换下划线
function hump2Line(name: string) {
  if (!name) return ''
  const transVar = name.replace(/([A-Z])/g, '-$1').toLowerCase()
  return transVar.startsWith('-') ? transVar.slice(1) : transVar
}

function isJson(target: any) {
  try {
    const result = JSON.parse(target)
    if (Object.prototype.toString.call(result) === '[object Object]') {
      return true
    }
  } catch {
    return false
  }
  return false
}

function map2obj(target: Map<string, any>) {
  const result = Object.create(null)
  for (let [k, v] of target) {
    result[k] = v
  }
  return result
}

function json2moduleContent(target: any, varName = 'data') {
  // if (!isJson(target)) throw Error('文件内容不是 JSON 格式！')

  const result = `const ${varName} = ${JSON.stringify(target, undefined, 2)};\n\nexport { ${varName} }`
  
  return result
}

export { formatDocName, hump2Line, isJson, map2obj, json2moduleContent }