# 🔌 MCP Server: Introduction

Swiftcode MCP Server is a server based on the **Model Context Protocol (MCP)**, focusing on automated code generation to support modern web development workflows. It can automatically generate TypeScript API clients from Swagger/OpenAPI specifications and quickly generate Vue list page components based on templates.

By running the MCP server, you enable `swiftcode` to act as a backend for other MCP-compatible clients, such as IDE extensions or other CLIs.

## ✨ Features

- **Swagger/OpenAPI to TypeScript**: Automatically generate TypeScript API clients and type definitions.
- **Vue Component Generation**: One-click generation of Vue 3 list pages with tables, filters, and pagination.
- **Template Management**: Obtain and use built-in code generation templates.
- **Programmatic Access**: Provides a stable, programmatic interface to `swiftcode`'s features.
- **Standardized Communication**: Built on the open MCP standard, ensuring interoperability.

::: tip Use Case
Imagine an IDE extension that adds a right-click context menu to a `swagger.json` file. By communicating with this MCP server, the extension could offer a "Generate API Interfaces" option that triggers `swiftcode`'s functionality seamlessly in the background.
:::
