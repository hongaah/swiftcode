<div align="center">

# Swiftcode MCP Server

简体中文 | [English](https://github.com/hongaah/swiftcode-mcp-server/blob/main/README.md)

</div>

## 项目简介

Swiftcode MCP Server 是一个基于 Model Context Protocol (MCP) 的服务端，专注于自动化代码生成，支持现代 Web 开发流程。它可以根据 Swagger/OpenAPI 规范自动生成 TypeScript API 客户端，以及基于模板快速生成 Vue 列表页面组件，极大提升前后端开发效率。

## 功能特性

- **Swagger/OpenAPI 转 TypeScript**：自动生成 TypeScript API 客户端和类型定义。
- **Vue 组件生成**：一键生成包含表格、筛选、分页等功能的 Vue 3 列表页面。
- **模板管理**：获取和使用预置的代码生成模板。
- **代码校验**：支持 Swagger/OpenAPI 规范校验。
- **Mock 数据生成**：可选生成前端开发用的 mock 数据。

## 支持技术

- 前端框架：Vue 3（Composition API）、Element Plus、TypeScript
- API 规范：Swagger 2.0、OpenAPI 3.0+（JSON/YAML）
- 生成代码：TypeScript 接口/types、Vue 3 组件、Element Plus 表单与表格

## 工具列表

### 1. `generate_api_client`

根据 Swagger/OpenAPI 规范生成 TypeScript API 客户端

**参数：**

- `source` (string)：Swagger/OpenAPI 文件路径或 URL
- `dir` (string)：输出目录

**示例：**

```json
{
  "source": "/mock/swagger.json",
  "dir": "./"
}
```

### 2. `generate_sfc_template_client`

下载并生成 SFC/Vue 列表模板文件到指定目录

**参数：**

- `dir` (string)：输出目录

**示例：**

```json
{
  "dir": "./"
}
```

### 3. `generate_sfc_client`

基于模板文件生成 Vue 列表组件

**参数：**

- `source` (string)：模板文件路径
- `dir` (string)：输出目录

**示例：**

```json
{
  "source": "template.js",
  "dir": "./"
}
```

## 快速开始

### NPX (推荐)

MCP Server 客户端配置：

```json
{
  "mcpServers": {
    "swiftcode-npm": {
      "command": "npx",
      "args": ["-y", "@swiftcode/mcp"]
    }
  }
}
```

### 本地开发启动

```bash
pnpm install

# 编译 mcp
ppm build

# 启动 mcp 调试器
pnpm inspector
```

MCP Server 客户端配置：

```json
{
  "mcpServers": {
    // 本地开发
    "swiftcode-local": {
      "command": "node",
      "args": ["swiftcode-mcp-server/dist/index.js"]
    }
  }
}
```

### Docker 方式

```bash
docker build -t swiftcode-mcp .
docker run -it swiftcode-mcp
```

## 使用示例

### 生成 API 客户端

```json
{
  "source": "/user/swagger.json",
  "dir": "./"
}
```

### 生成 Vue 列表组件

```json
{
  "source": "template.js",
  "dir": "./"
}
```

## 贡献指南

1. Fork 本仓库
2. 新建功能分支
3. 提交你的更改
4. 如有需要请补充测试
5. 提交 Pull Request

## License

MIT

---

如需更多帮助或有任何问题，请访问 [GitHub 仓库](https://github.com/hongaah/swiftcode-mcp-server)。