# 🚀 快速入门

本指南将引导您完成 `McpServer` 的安装、配置和运行。

## 安装

`McpServer` 是 `swiftcode` monorepo 内的一个包。当您为整个项目安装依赖时，它就会被安装好。

```bash [终端]
# 在 swiftcode 项目的根目录运行
pnpm install
```

## 客户端配置

要使用该服务器，MCP 客户端（如 IDE 扩展）需要知道如何启动它。这通常在客户端的配置文件（例如 `settings.json`）中完成。

### 使用 NPX (推荐)

此方法允许客户端使用 `npx` 运行服务器，无需本地安装。

```json [settings.json]
{
  "mcpServers": {
    "swiftcode-npm": {
      "command": "npx",
      "args": ["-y", "@swiftcode/mcp"]
    }
  }
}
```

### 用于本地开发

如果您在本地开发 `swiftcode`，可以配置客户端直接从您的构建产物中运行服务器。

```json [settings.json]
{
  "mcpServers": {
    "swiftcode-local": {
      "command": "node",
      "args": ["/path/to/swiftcode/packages/McpServer/dist/index.js"]
    }
  }
}
```

::: warning
请记得将 `/path/to/swiftcode` 替换为您本地项目目录的实际绝对路径。
:::

### 使用 Docker

您也可以在 Docker 容器中构建和运行服务器。

```bash [终端]
# 1. 构建 Docker 镜像
docker build -t swiftcode-mcp .

# 2. 运行容器
docker run -it swiftcode-mcp
```

## 手动启动服务器

虽然通常由客户端启动，但您也可以手动运行服务器进行测试。

```bash [终端]
# 二进制文件名基于 package.json 中的 `bin` 条目
swiftcode-McpServer
```

服务器现在将等待客户端通过 stdio 连接。要停止它，请按 `Ctrl+C`。
