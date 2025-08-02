# 🏗️ Project Architecture

This project is structured as a **pnpm workspace**, a setup also known as a monorepo. This approach allows us to manage multiple independent packages within a single repository, simplifying dependency management and cross-package development.

::: tip What is a Monorepo?
A monorepo ("mono" meaning single, "repo" meaning repository) is a software development strategy where code for many projects is stored in the same repository. This project uses it to manage the `swiftcode` CLI and its related packages (`Swagger2Interface`, `Template2List`, `Utils`) together.
:::

## Core Structure

The project root contains several key configuration files and directories:

- **`package.json`**: The main manifest for the `swiftcode` CLI tool. It defines the entry point (`bin/index.js`) and orchestrates the entire workspace.
- **`pnpm-workspace.yaml`**: This file defines the root of the pnpm workspace and tells pnpm where to find the sub-packages (in our case, inside the `packages/*` directory).
- **`bin/index.js`**: The executable entry point for the command-line interface (CLI). This script is what runs when you execute `swiftcode` in your terminal.
- **`packages/`**: This directory contains all the individual, publishable packages that make up the SwiftCode toolset.

## 🚀 The CLI: `bin/index.js`

The heart of the project is the `swiftcode` command. The `bin/index.js` file is responsible for:
1.  **Command Parsing**: It uses `commander.js` to define the available commands (e.g., `swagger`, `template`).
2.  **User Interaction**: It uses `inquirer` to prompt the user for input, such as choosing a swagger source or a template file.
3.  **Orchestration**: Based on user input, it invokes the functionality from the appropriate packages (`@swiftcode/api`, `@swiftcode/list`) to perform the requested actions.

## 📦 Packages

The `packages/` directory houses the core logic, with each sub-directory being a self-contained NPM package.

### 1. `Swagger2Interface` (`@swiftcode/api`)

- **Purpose**: This is the engine for converting Swagger/OpenAPI definitions into TypeScript interfaces.
- **Key Files**:
    - `src/transformers/apiGetDefinitions.ts`: Fetches the API specification.
    - `src/transformers/convertJsonToTsType.ts`: Converts JSON schema to TypeScript types.
    - `src/transformers/renderInterfaceFile.ts`: Writes the generated types to a `.ts` file.
- **Interaction**: The CLI uses this package when the user wants to generate API types.

### 2. `Template2List` (`@swiftcode/list`)

- **Purpose**: This package is designed to scaffold frontend list/table views from a JavaScript object template.
- **Key Files**:
    - `src/transformers/transfromTemplate.ts`: Reads the user-provided template file.
    - `src/transformers/transformFilter.ts`: Generates code for the filter/search section.
    - `src/transformers/transformTable.ts`: Generates code for the data table.
    - `src/transformers/sfcMaterial.ts`: Assembles the parts into a final Single File Component.
- **Interaction**: The CLI uses this package to create new frontend components based on a template.

### 3. `Utils` (`@swiftcode/utils`)

- **Purpose**: A shared utility library used by other packages in the monorepo.
- **Key Files**:
    - `src/common-tools.ts`: General-purpose helper functions.
    - `src/format-tools.ts`: Code formatting utilities.
    - `src/node-tools.ts`: File system operations.
- **Interaction**: Both `Swagger2Interface` and `Template2List` depend on this package.
