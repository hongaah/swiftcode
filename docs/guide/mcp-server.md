# 🔌 MCP Server

The `Mcp-server` package extends `swiftcode` by exposing its core functionalities through a server that implements the **Model Context Protocol (MCP)**. This allows other tools and services to programmatically interact with `swiftcode`'s code generation capabilities.

## ✨ What is MCP?

[Model Context Protocol (MCP)](https://github.com/model-context-protocol/specification) is a specification for language models and development tools to communicate. By running the MCP server, you enable `swiftcode` to act as a backend for other MCP-compatible clients, such as IDE extensions or other CLIs.

## 🚀 Usage

The server provides a programmatic bridge to the core packages (`Swagger2Interface` and `Template2List`).

### Starting the Server

To start the server, you can run its binary directly.

```bash [Terminal]
# (Assuming it's installed or linked in node_modules)
swiftcode-mcp-server
```

Once running, the server will listen for requests from MCP clients and execute the corresponding code generation tasks.

### Key Dependencies

- **`@modelcontextprotocol/sdk`**: The official SDK for building MCP-compliant tools in TypeScript.
- **`@swiftcode/api`**: The core engine for Swagger-to-Interface generation.
- **`@swiftcode/list`**: The core engine for Template-to-List generation.

::: tip Use Case
Imagine an IDE extension that adds a right-click context menu to a `swagger.json` file. By communicating with this MCP server, the extension could offer a "Generate API Interfaces" option that triggers `swiftcode`'s functionality seamlessly in the background.
:::
