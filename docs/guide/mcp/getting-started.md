# 🚀 Getting Started

This guide will walk you through installing, configuring, and running the `Mcp-server`.

## Installation

The `Mcp-server` is a package within the `swiftcode` monorepo. When you install the dependencies for the entire project, it will be available.

```bash [Terminal]
# From the root of the swiftcode project
pnpm install
```

## Client Configuration

To use the server, an MCP client (like an IDE extension) needs to know how to start it. This is typically done in the client's configuration file (e.g., `settings.json`).

### Using NPX (Recommended)

This method allows the client to run the server using `npx` without needing a local installation.

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

### For Local Development

If you are developing `swiftcode` locally, you can configure the client to run the server directly from your build output.

```json [settings.json]
{
  "mcpServers": {
    "swiftcode-local": {
      "command": "node",
      "args": ["/path/to/swiftcode/packages/Mcp-server/dist/index.js"]
    }
  }
}
```
::: warning
Remember to replace `/path/to/swiftcode` with the actual absolute path to your local project directory.
:::

### Using Docker

You can also build and run the server within a Docker container.

```bash [Terminal]
# 1. Build the Docker image
docker build -t swiftcode-mcp .

# 2. Run the container
docker run -it swiftcode-mcp
```

## Starting the Server Manually

While typically started by a client, you can run the server manually for testing.

```bash [Terminal]
# The binary is named based on its package.json `bin` entry
swiftcode-mcp-server
```
The server will now wait for a client to connect over stdio. To stop it, press `Ctrl+C`.
