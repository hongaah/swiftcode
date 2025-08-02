<div align="center">

# Swiftcode MCP Server

English | [简体中文](https://github.com/hongaah/swiftcode-mcp-server/blob/main/README.zh-CN.md)

</div>

## Introduction

Swiftcode MCP Server is a server based on the Model Context Protocol (MCP), focusing on automated code generation to support modern web development workflows. It can automatically generate TypeScript API clients from Swagger/OpenAPI specifications and quickly generate Vue list page components based on templates, greatly improving frontend and backend development efficiency.

## Features

- **Swagger/OpenAPI to TypeScript**: Automatically generate TypeScript API clients and type definitions.
- **Vue Component Generation**: One-click generation of Vue 3 list pages with tables, filters, and pagination.
- **Template Management**: Obtain and use built-in code generation templates.
- **Specification Validation**: Supports Swagger/OpenAPI validation.
- **Mock Data Generation**: Optionally generate mock data for frontend development.

## Supported Technologies

- Frontend: Vue 3 (Composition API), Element Plus, TypeScript
- API Specification: Swagger 2.0, OpenAPI 3.0+ (JSON/YAML)
- Code Generation: TypeScript interfaces/types, Vue 3 components, Element Plus forms and tables

## Tool List

### 1. `generate_api_client`

Generate TypeScript API client from Swagger/OpenAPI specification.

**Parameters:**

- `source` (string): Swagger/OpenAPI file path or URL
- `dir` (string): Output directory

**Example:**

```json
{
  "source": "/mock/swagger.json",
  "dir": "./"
}
```

### 2. `generate_sfc_template_client`

Download and generate SFC/Vue list template files to the specified directory.

**Parameters:**

- `dir` (string): Output directory

**Example:**

```json
{
  "dir": "./"
}
```

### 3. `generate_sfc_client`

Generate Vue list components based on template files.

**Parameters:**

- `source` (string): Template file path
- `dir` (string): Output directory

**Example:**

```json
{
  "source": "template.js",
  "dir": "./"
}
```

## Quick Start

### NPX (Recommended)

Start as an MCP Server:

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

### Local Development

```bash
pnpm install

# Build MCP
pnpm build

# Start MCP inspector
pnpm inspector
```

Start as an MCP Server:

```json
{
  "mcpServers": {
    // Local development
    "swiftcode-local": {
      "command": "node",
      "args": ["swiftcode-mcp-server/dist/index.js"]
    }
  }
}
```

### Docker

```bash
docker build -t swiftcode-mcp .
docker run -it swiftcode-mcp
```

## Usage Examples

### Generate API Client

```json
{
  "source": "/user/swagger.json",
  "dir": "./"
}
```

### Generate Vue List Component

```json
{
  "source": "template.js",
  "dir": "./"
}
```

## Contribution Guide

1. Fork this repository
2. Create a feature branch
3. Commit your changes
4. Add tests if necessary
5. Submit a Pull Request

## License

MIT

---

For more help or questions, please visit the [GitHub](https://github.com/hongaah/swiftcode-mcp-server).
