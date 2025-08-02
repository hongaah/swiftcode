# 📋 Template2List

这是一个功能强大的脚手架工具，可以从一个简单的 JavaScript 模板对象生成功能丰富的列表和表格页面。它旨在显著加快管理面板和数据驱动视图的开发速度。

## ✨ 工作原理

::: info

1.  **定义模板**: 您创建一个 `template.js` 文件来定义页面的结构和行为（如筛选器、列等）。
2.  **运行命令**: 使用 `swiftcode gen-list` 命令，并将其指向您的模板文件。
3.  **生成代码**: 该包会读取您的模板并生成一个完整的 Vue 单文件组件（`.vue`）。
    :::

## 🚀 使用方法

使用此包分为两步：首先，创建模板；然后，生成页面。

### 1. 获取示例模板

要开始使用，您可以在当前目录中生成一个示例 `template.js` 文件。

```bash [终端]
swiftcode gen-list-template
```

::: tip 专业提示
生成的 `template.js` 是最好的文档。它包含了所有可用的选项和数据类型的示例。
:::

### 2. 生成列表页面

自定义 `template.js` 文件后，运行生成器。

```bash [终端]
# 从默认的 ./template.js 生成
swiftcode gen-list

# 指定一个不同的模板文件路径
swiftcode gen-list ./src/templates/user-list.js
```

默认情况下，生成的文件将放置在 `.lists/` 目录中。

## ⚙️ 模板文件结构

`template.js` 文件导出一个配置对象。以下是其主要属性的分解说明：

```javascript [template.js]
const defineListConfig = {
  // 生成文件的输出目录。
  dir: '.lists',

  // 包含一个或多个页面定义的对象。
  pages: {
    // 每个键都是一个页面名称。
    UserList: {
      template: {
        cn: '用户列表', // 中文名称/标题
        en: 'userList', // 英文名称，用于文件名
        top: true, // 包括顶部的操作栏
        bottom: true, // 包括底部的分页
        select: true, // 启用行选择
        btn: ['新增', '删除'] // 顶部操作栏中的按钮
      },
      // 定义表格上方的筛选字段。
      filter: {
        用户名: 'input',
        状态: 'select',
        创建日期: 'daterange'
      },
      // 定义数据表格中的列。
      table: {
        复选框: 'selection',
        序号: 'index',
        用户名: 'text',
        邮箱: 'link',
        上次登录: 'datetime',
        操作: {
          type: 'operate',
          fixed: 'right',
          render: ['修改', '删除']
        }
      }
    }
  }
}

export default defineListConfig
```

::: danger 重要
您可以在 `pages` 对象中定义多个页面。该工具将为每个页面生成一个文件，使您可以通过一个命令为管理面板的整个部分搭建脚手架。
:::
