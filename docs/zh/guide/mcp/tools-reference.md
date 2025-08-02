# 🛠️ 工具参考

`McpServer` 将 `swiftcode` 的核心功能作为“工具”暴露出来，可由 MCP 客户端调用。以下是每个可用工具的详细参考。

## `generate_api_client`

从 Swagger/OpenAPI 规范生成 TypeScript API 客户端。

- **描述**: `Generate TypeScript API client from Swagger/OpenAPI specification`
- **输入参数**:
  - `source` (string, **必需**): `swagger.json` 文件的 URL 或本地文件路径。
  - `dir` (string, **必需**): 工作区目录的绝对路径。
- **参数示例**:
  ```json
  {
    "source": "/path/to/your/mock/swagger.json",
    "dir": "/path/to/your/project"
  }
  ```
- **输出**: 成功后，返回一条文本消息。生成的文件将位于 `<dir>/apis`。

## `generate_sfc_template_client`

下载用于生成 Vue/SFC 列表组件的示例模板文件。

- **描述**: `Download the transform sfc template files`
- **输入参数**:
  - `dir` (string, **必需**): 工作区目录的绝对路径。
- **参数示例**:
  ```json
  {
    "dir": "/path/to/your/project"
  }
  ```
- **输出**: 成功后，返回一条文本消息，确认 `template.js` 已创建。

## `generate_sfc_client`

从模板文件生成 Vue/SFC 列表组件。

- **描述**: `Generate vue sfc component page`
- **输入参数**:
  - `source` (string, **必需**): 模板文件的本地文件路径。
  - `dir` (string, **必需**): 工作区目录的绝对路径。
- **参数示例**:
  ```json
  {
    "source": "template.js",
    "dir": "/path/to/your/project"
  }
  ```
- **输出**: 成功后，返回一条文本消息。生成的文件将位于 `<dir>/.lists`。
