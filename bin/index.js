#! /usr/bin/env node
import path from 'path'
import url from 'url'
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import { Command } from 'commander/esm.mjs'
import { Swagger2InterfaceOutput } from '@swiftcode/api'
import { Template2ListOutput } from '@swiftcode/list'
import { readFile } from '@swiftcode/utils'
// import { Swagger2InterfaceOutput } from '../packages/Swagger2Interface/dist/index.esm.js'
// import { Template2ListOutput, createTemplate } from '../packages/Template2List/dist/index.esm.js'
// import { readFile } from '../packages/Utils/dist/index.esm.js'

const program = new Command()

function getPackageVersion() {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const packageJson = path.join(__dirname, '../package.json')
  const version = JSON.parse(readFile(packageJson)).version

  return version
}

async function handleTransformApi(options) {
  if (!options.source) return

  const installSpinner = ora(`正在转换 ${options.source}...\n`).start()
  try {
    await Swagger2InterfaceOutput(options)
    installSpinner.succeed(chalk.green('接口文档生成成功'))
  } catch (err) {
    installSpinner.fail(chalk.red('接口文档生成失败'))
    console.log(err.message)
  }
}

async function handleTransformList(options) {
  if (!options.source) return

  const installSpinner = ora(`正在转换 ${options.source}...\n`).start()
  try {
    await Template2ListOutput(options)
    installSpinner.succeed(chalk.green('列表生成成功'))
  } catch (err) {
    installSpinner.fail(chalk.red('列表生成失败'))
    console.log(err.message)
  }
}

function globalCommandInquirer() {
  inquirer
    .prompt([
      {
        name: 'features',
        // 单选: list 多选：checkbox
        type: 'list',
        message: 'Check the features needed for your project:',
        choices: [
          {
            name: '转换 SwaggerAPI 地址',
            checked: true
          },
          {
            name: '转换 SwaggerAPI 文档'
          },
          {
            name: '转换列表页面'
          },
          {
            name: '下载转换列表的模板'
          }
        ]
      }
    ])
    .then((data) => {
      switch (data.features) {
        case '转换 SwaggerAPI 地址': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'filepath',
                message: '请输入 SwaggerAPI 地址'
              }
            ])
            .then((data) => {
              handleTransformApi({
                type: 'url',
                source: data.filepath,
                isDev: false,
                dir: '.apis'
              })
            })
          break
        }
        case '转换 SwaggerAPI 文档': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'filepath',
                message: '请输入要转换的文件'
              }
            ])
            .then((data) => {
              handleTransformApi({
                source: data.filepath,
                isDev: false,
                dir: '.apis'
              })
            })
          break
        }
        case '转换列表页面': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'filepath',
                message: '请输入要转换的文件'
              }
            ])
            .then((data) => {
              handleTransformList({
                source: data.filepath || './template.js'
              })
            })
          break
        }
        case '下载转换列表的模板': {
          createTemplate('template.js', '下载转换列表的模板 template.js 成功')
          break
        }
        default:
          break
      }
    })
}

function globalCommandProgram() {
  program
    .command('gen-api <address>')
    .option('-d, --dev', '是否生成调试产物')
    .option('-f, --file', '是否用文件地址生成')
    .option('-r, --rename <dir>', '重命名存放产物的文件夹')
    .description('输入 swagger 地址生成接口文件')
    .action(function (address, option) {
      const isDev = option.dev
      const renameDir = option.rename || '.apis'

      if (!option.file && address) {
        handleTransformApi({
          type: 'url',
          source: address,
          isDev: isDev,
          dir: renameDir
        })
      }

      if (option.file && address) {
        handleTransformApi({
          source: address,
          isDev: isDev,
          dir: renameDir
        })
      }
    })

  program
    .command('gen-list [address]')
    .description('输入要转换的文件地址生成列表')
    .action(function (address) {
      const transAddress = address || './template.js'

      handleTransformList({
        source: transAddress
      })
    })

  program
    .command('gen-list-template')
    .description('下载转换列表的模板')
    .action(function () {
      createTemplate('template.js', '下载转换列表的模板 template.js 成功')
    })

  const version = getPackageVersion()
  program.version(version, '-v, --version')

  program.parse(process.argv)
}

function init() {
  if (!process.argv[2]) {
    globalCommandInquirer()
    return
  }
  globalCommandProgram()
}

init()
