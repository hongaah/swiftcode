# swiftcode

## 简介

自动生成代码工具

- 转换 swagger api 文档，生成前端接口文件和匹配的类型文件，支持输入 swagger 地址和 json 文档进行数据读取。
- 快速生成 vue 列表页面，根据模板配置文件，配置要生成的内容。

## 快速开始

```bash

# 安装
$ npm install -g swiftcode

# 使用：在一个文件夹中打开终端，执行以下命令
$ swiftcode

# 帮助手册
$ qucickcode -h
```

### 转换 Swagger API

```bash

# 使用：在一个文件夹中打开终端，执行以下命令
$ swiftcode

# SwaggerAPI：通过命令转换 swagger 地址
# SwaggerAPI：swagger 链接查找方式：打开swagger 页面，控制台网络找到api.json接口
$ swiftcode gen-api <swagger-api-address>

# 通过命令转换 swagger json 文档
$ swiftcode gen-api <swagger-json-address> -f

# 通过命令生成调试产物
$ swiftcode gen-api <swagger-api-address> -d

# 重命名存放产物的文件夹
$ swiftcode gen-api <swagger-api-address> -d -r <rename-dist>

```

### 生成 SFC 页面

#### 前置环境

- vue3
- element-plus
- 配置 ElConfigProvider 文件

#### 功能命令

```bash

# 使用：在一个文件夹中打开终端，执行以下命令
$ swiftcode

# 转换列表页面，默认为 template.js
$ swiftcode gen-list [template-address]

# 下载转换列表的模板
$ swiftcode gen-list-template

```

#### 配置选项

```js: template.js
// 为避免重复写引号定义的变量
const select = 'select'
const selection = 'selection'
const index = 'index'
const text = 'text'
const link = 'link'
const time = 'time'
const option = 'option'
const tag = 'tag'
const operate = 'operate'
const input = 'input'
const daterange = 'daterange'
const datetime = 'datetime'
const date = 'date'
const datetimerange = 'datetimerange'
const left = 'left'
const right = 'right'

const pageContents = {
  // 一个属性对应一个页面
  模板列表: {
    // 模板相关
    template: {
      // 页面的中文名称，用于路由名，页面注释
      cn: '模板列表',
      // 页面的英文名称，用于路由路径，文件名，页面 customId
      en: 'templateList',
      // 是否有 filter-top 插槽
      top: true,
      // 是否有 table-bottom 插槽
      bottom: true,
      // 是否有表格选择
      select: true,
      // 是否有 filter-bottom 插槽按钮组
      btn: ['新增', '删除'],
    },
    // 筛选器选项
    filter: {
      客编: input,
      加急单: select,
      交期: daterange,
      完成时间: datetime,
      下通知单日期: date,
      拼板时间: datetimerange,
      下单日期: {
        type: 'daterange',
        range: [1, 'm'], // 第二个参数可以是d m y
      },
    },
    // 表格选项
    table: {
      选择: select,
      序号: index,
      客编: text,
      // 时间格式 YYYY-MM-DD HH:mm:ss
      审核时间: time,
      // 日期格式 YYYY-MM-DD
      下通知单日期: date,
      // 时间格式自定义 需单独配置 config-provider
      完成时间: {
        type: datetime,
        formatDate: 'MM-DD HH:mm',
      },
      // 枚举 需单独配置 config-provider
      分配地区: option,
      // 链接 需单独配置 config-provider
      生产编号: link,
      // 标签 需单独配置 config-provider
      类型: tag,
      操作: {
        type: operate,
        fixed: 'right',
        // 渲染按钮组
        render: ['审核', '同步'],
      },
    },
  }
}

const renderList = {
  // 存放生成的列表产物的文件夹
  dir: '.lists',
  // 页面配置
  pages: pageContents,
  // 路由配置
  routes: {
    // 是否需要生成路由文件
    isRender: true,
    menu: {
      // 路由菜单英文名
      en: 'templateManagement',
      // 路由菜单中文名
      cn: '模板列表',
    },
  },
  // 每个页面是否生成对应的表格 mock 文件
  mock: true,
  // 每个页面是否生成对应的 README 文件
  readMe: false,
}

```
