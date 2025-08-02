# 🔌 MCP 服务器: 介绍

Swiftcode MCP 服务器是一个基于 **模型上下文协议 (MCP)** 的服务器，专注于自动化代码生成，以支持现代 Web 开发工作流。它可以根据 Swagger/OpenAPI 规范自动生成 TypeScript API 客户端，并基于模板快速生成 Vue 列表页面组件。

通过运行 MCP 服务器，您可以让 `swiftcode` 作为其他兼容 MCP 的客户端（如 IDE 扩展或其他 CLI 工具）的后端。

## ✨ 功能特性

- **Swagger/OpenAPI 转 TypeScript**: 自动生成 TypeScript API 客户端和类型定义。
- **Vue 组件生成**: 一键生成包含表格、筛选和分页的 Vue 3 列表页面。
- **模板管理**: 获取并使用内置的代码生成模板。
- **编程访问**: 为 `swiftcode` 的功能提供了一个稳定的编程接口。
- **标准化通信**: 基于开放的 MCP 标准构建，确保了互操作性。

::: tip 使用场景
想象一个 IDE 扩展，它为一个 `swagger.json` 文件添加了右键上下文菜单。通过与此 MCP 服务器通信，该拓展可以提供一个“生成 API 接口”的选项，从而在后台无缝触发 `swiftcode` 的功能。
:::
