# 🔌 MCP 服务器

`Mcp-server` 包通过一个实现了 **模型上下文协议 (Model Context Protocol, MCP)** 的服务器来扩展 `swiftcode`，使其核心功能得以暴露。这允许其他工具和服务以编程方式与 `swiftcode` 的代码生成能力进行交互。

## ✨ 什么是 MCP?

[模型上下文协议 (MCP)](https://github.com/model-context-protocol/specification) 是一个为语言模型和开发工具之间通信而设计的规范。通过运行 MCP 服务器，您可以让 `swiftcode` 作为其他兼容 MCP 的客户端（如 IDE 扩展或其他 CLI 工具）的后端。

## 🚀 使用方法

该服务器为核心包（`Swagger2Interface` 和 `Template2List`）提供了一个编程桥梁。

### 启动服务器

您可以通过直接运行其二进制文件来启动服务器。

```bash [终端]
# (假设它已在 node_modules 中安装或链接)
swiftcode-mcp-server
```

一旦运行，服务器将侦听来自 MCP 客户端的请求，并执行相应的代码生成任务。

### 关键依赖

- **`@modelcontextprotocol/sdk`**: 用于在 TypeScript 中构建兼容 MCP 的工具的官方 SDK。
- **`@swiftcode/api`**: Swagger 转接口生成的核心引擎。
- **`@swiftcode/list`**: 模板生成列表的核心引擎。

::: tip 使用场景
想象一个 IDE 扩展，它为一个 `swagger.json` 文件添加了右键上下文菜单。通过与此 MCP 服务器通信，该扩展可以提供一个“生成 API 接口”的选项，从而在后台无缝触发 `swiftcode` 的功能。
:::
