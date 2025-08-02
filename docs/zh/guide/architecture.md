# 🏗️ 项目架构

本项目采用 **pnpm workspace**（也称为 monorepo）进行结构化管理。这种方法允许我们在单个代码仓库中维护多个独立的包，从而简化了依赖管理和跨包开发。

::: tip 什么是 Monorepo?
Monorepo（“mono” 意为“单一”，“repo” 意为“仓库”）是一种软件开发策略，即将许多项目的代码存储在同一个仓库中。本项目使用它来统一管理 `swiftcode` CLI 及其相关包（`Swagger2Interface`, `Template2List`, `Utils`）。
:::

## 核心结构

项目根目录包含几个关键的配置文件和目录：

- **`package.json`**: `swiftcode` CLI 工具的主清单文件。它定义了入口点 (`bin/index.js`) 并协调整个工作空间。
- **`pnpm-workspace.yaml`**: 此文件定义了 pnpm 工作空间的根目录，并告诉 pnpm 在哪里可以找到子包（在我们的例子中，是 `packages/*` 目录）。
- **`bin/index.js`**: 命令行界面（CLI）的可执行入口点。当您在终端中执行 `swiftcode` 时，运行的就是这个脚本。
- **`packages/`**: 此目录包含构成 SwiftCode 工具集的所有独立、可发布的包。

## 🚀 CLI: `bin/index.js`

项目的核心是 `swiftcode` 命令。`bin/index.js` 文件负责：

1.  **命令解析**: 使用 `commander.js` 定义可用的命令（例如 `swagger`, `template`）。
2.  **用户交互**: 使用 `inquirer` 提示用户输入，例如选择 swagger 源或模板文件。
3.  **任务编排**: 根据用户输入，调用相应包（`@swiftcode/api`, `@swiftcode/list`）中的功能来执行所请求的操作。

## 📦 Packages (核心包)

`packages/` 目录承载了核心逻辑，每个子目录都是一个自包含的 NPM 包。

### 1. `Swagger2Interface` (`@swiftcode/api`)

- **目的**: 这是将 Swagger/OpenAPI 定义转换为 TypeScript 接口的引擎。
- **关键文件**:
  - `src/transformers/apiGetDefinitions.ts`: 获取 API 规范。
  - `src/transformers/convertJsonToTsType.ts`: 将 JSON schema 转换为 TypeScript 类型定义。
  - `src/transformers/renderInterfaceFile.ts`: 将生成的类型写入 `.ts` 文件。
- **交互**: 当用户想要生成 API 类型时，CLI 会使用这个包。

### 2. `Template2List` (`@swiftcode/list`)

- **目的**: 此包设计用于从 JavaScript 对象模板快速生成前端的列表/表格视图。
- **关键文件**:
  - `src/transformers/transfromTemplate.ts`: 读取用户提供的模板文件。
  - `src/transformers/transformFilter.ts`: 为筛选/搜索区域生成代码。
  - `src/transformers/transformTable.ts`: 为数据表格生成代码。
  - `src/transformers/sfcMaterial.ts`: 将各个部分组装成最终的单文件组件。
- **交互**: CLI 使用此包基于模板创建新的前端组件。

### 3. `Utils` (`@swiftcode/utils`)

- **目的**: 一个共享的实用工具库，供 monorepo 中的其他包使用。
- **关键文件**:
  - `src/common-tools.ts`: 通用辅助函数。
  - `src/format-tools.ts`: 代码格式化工具。
  - `src/node-tools.ts`: 文件系统操作。
- **交互**: `Swagger2Interface` 和 `Template2List` 都依赖此包来执行常见任务。
