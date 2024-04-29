import fs, { existsSync } from 'node:fs'
import child_process from 'node:child_process'

function existsPath(path: string) {
  try {
    return existsSync(path)
  } catch (err) {
    throw Error(`[ERROR] ${err}`)
  }
}

// 如果路径名是以 / 开头，表示从当前电脑盘根目录开始
function generateFolder(dir: string, cb?: () => void, isDev: boolean = false) {
  // let dir = originDir.replace(/\//g, '')
  try {
    if (fs.existsSync(dir)) {
      // console.log(`${dir} 文件夹已存在`)
      cb && cb()
    } else {
      fs.mkdirSync(dir)
      if (isDev || !dir.startsWith('temp')) {
        console.log(`[SUCCESS] 创建 ${dir} 文件夹成功`)
      }
      cb && cb()
    }
  } catch (e) {
    throw Error(`[ERROR] 创建 ${dir} 文件夹失败`)
  }
}

function generateFile(filename: string, data: string, isDev = false) {
  try {
    fs.writeFileSync(filename, data)
    if (isDev || !filename.startsWith('temp')) {
      console.log(`[SUCCESS] 创建 ${filename} 文件成功`)
    }
  } catch (err) {
    throw Error(`[ERROR] ${err}`)
  }
}

function readFile(filename: string) {
  try {
    return fs.readFileSync(filename, { encoding: 'utf-8' })
  } catch (err) {
    throw Error(`[ERROR] ${err}`)
  }
}

function removeFile(target: string, isDev = false) {
  const filename = target.startsWith('/') ? target.slice(1) : target

fs.unlink(target, (err) => {
    if (err) throw Error(err.message)
    isDev && console.log(`${filename} 文件已删除`)
  })
}

function removeDir(filePath: string) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath)
    files.forEach((file) => {
      const nextFilePath = `${filePath}/${file}`
      const states = fs.statSync(nextFilePath)
      if (states.isDirectory()) {
        //recurse
        removeDir(nextFilePath)
      } else {
        //delete file
        fs.unlinkSync(nextFilePath)
      }
    })
    fs.rmdirSync(filePath)
  }
}

function childProcessExec(command: string, cb: () => void) {
  child_process.exec(command, (error: any, stdout: string, stderr: string) => {
    if (error) {
      console.log(error.stack)
    }
    console.log(stdout)
    console.log(stderr)
    cb && cb()
  })
}

export { existsPath, generateFolder, generateFile, readFile, removeFile, removeDir, childProcessExec }