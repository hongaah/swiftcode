# 🛠️ Tools Reference

The `Mcp-server` exposes the core functionalities of `swiftcode` as "Tools" that can be called by an MCP client. Here is a detailed reference for each available tool.

## `generate_api_client`

Generates a TypeScript API client from a Swagger/OpenAPI specification.

- **Description**: `Generate TypeScript API client from Swagger/OpenAPI specification`
- **Input Schema**:
  - `source` (string, **required**): The URL or local file path of the `swagger.json` file.
  - `dir` (string, **required**): The absolute path to the workspace directory.
- **Example Arguments**:
  ```json
  {
    "source": "/path/to/your/mock/swagger.json",
    "dir": "/path/to/your/project"
  }
  ```
- **Output**: On success, returns a text message. Generated files will be in `<dir>/apis`.

## `generate_sfc_template_client`

Downloads a sample template file for generating Vue/SFC list components.

- **Description**: `Download the transform sfc template files`
- **Input Schema**:
  - `dir` (string, **required**): The absolute path to the workspace directory.
- **Example Arguments**:
  ```json
  {
    "dir": "/path/to/your/project"
  }
  ```
- **Output**: On success, returns a text message confirming the creation of `template.js`.

## `generate_sfc_client`

Generates Vue/SFC list components from a template file.

- **Description**: `Generate vue sfc component page`
- **Input Schema**:
  - `source` (string, **required**): The local file path of the template file.
  - `dir` (string, **required**): The absolute path to the workspace directory.
- **Example Arguments**:
  ```json
  {
    "source": "template.js",
    "dir": "/path/to/your/project"
  }
  ```
- **Output**: On success, returns a text message. Generated files will be in `<dir>/.lists`.
