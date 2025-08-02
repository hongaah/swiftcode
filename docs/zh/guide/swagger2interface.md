# 🛠️ Swagger2Interface

这个包是直接从 Swagger v2 或 OpenAPI v3 规范生成 TypeScript 接口的核心引擎。它可以从远程 URL 或本地 JSON 文件中获取规范，并将其转换为清晰、可直接使用的 TypeScript 类型定义。

## ✨ 工作原理

::: info
该过程主要包括三个步骤：

1.  **输入**: 接收一个指向 `swagger.json` 文件的 URL 或本地文件路径。
2.  **转换**: 使用 `quicktype-core` 来解析 JSON Schema 定义，并将每个定义转换为一个 TypeScript 接口。
3.  **输出**: 将生成的一组 `.ts` 文件（按 API 标签组织）输出到一个目录中（默认为 `.apis/`）。
    :::

## 🚀 使用方法

您可以通过两种方式使用 `Swagger2Interface`：交互式提示或直接命令。

### 交互模式

为了获得引导式体验，只需运行不带任何参数的主命令：

```bash [终端]
swiftcode
```

这将启动一个交互式问卷。选择 **"json 换 SwaggerAPI 地址"** 或 **"转换 SwaggerAPI 文档"**，然后按照提示操作。

::: tip 专业提示
当您刚开始使用或者不想记住所有命令选项时，交互模式是一个很好的选择。
:::

### 直接命令

为了更快的脚本编写和集成到自动化工作流中，请使用 `gen-api` 命令。

#### 从 URL 生成

```bash [终端]
# 基本用法
swiftcode gen-api https://petstore.swagger.io/v2/swagger.json

# 指定不同的输出目录
swiftcode gen-api https://petstore.swagger.io/v2/swagger.json -r src/generated/api
```

#### 从本地文件生成

```bash [终端]
# 需要 --file 标志
swiftcode gen-api ./mock/swagger.json --file

# 指定不同的输出目录
swiftcode gen-api ./mock/swagger.json --file -r src/generated/api
```

### ⚙️ 命令选项

| 命令                   | 别名 | 描述                             | 默认值  |
| ---------------------- | ---- | -------------------------------- | ------- |
| `gen-api <source>`     |      | 生成 API 接口的命令。            |         |
| `--file`               | `-f` | 将 `<source>` 视作本地文件路径。 | `false` |
| `--rename <directory>` | `-r` | 保存生成文件的目录。             | `.apis` |
| `--dev`                | `-d` | (用于调试) 生成中间产物。        | `false` |
