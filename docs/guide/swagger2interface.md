# 🛠️ Swagger2Interface

This package is the core engine for generating TypeScript interfaces directly from a Swagger v2 or OpenAPI v3 specification. It can fetch the specification from a remote URL or a local JSON file and transform it into clean, ready-to-use TypeScript type definitions.

## ✨ How It Works

::: info
The process involves three main steps:
1.  **Input**: It takes a URL or a local file path pointing to a `swagger.json`.
2.  **Transformation**: It uses `quicktype-core` to parse the JSON Schema definitions and convert each into a TypeScript interface.
3.  **Output**: It generates a set of `.ts` files, organized by API tags, into an output directory (default: `.apis/`).
:::

## 🚀 Usage

You can use `Swagger2Interface` in two ways: through an interactive prompt or via direct commands.

### Interactive Mode

For a guided experience, simply run the main command without any arguments:

```bash [Terminal]
swiftcode
```

This will launch an interactive questionnaire. Select **"Convert SwaggerAPI URL"** or **"Convert SwaggerAPI Document"** and follow the prompts.

::: tip Pro Tip
Interactive mode is great when you're starting out or if you don't want to remember all the command options.
:::

### Direct Commands

For faster scripting and integration into automated workflows, use the `gen-api` command.

#### From a URL

```bash [Terminal]
# Basic usage
swiftcode gen-api https://petstore.swagger.io/v2/swagger.json

# Specify a different output directory
swiftcode gen-api https://petstore.swagger.io/v2/swagger.json -r src/generated/api
```

#### From a Local File

```bash [Terminal]
# The --file flag is required
swiftcode gen-api ./mock/swagger.json --file

# Specify a different output directory
swiftcode gen-api ./mock/swagger.json --file -r src/generated/api
```

### ⚙️ Command Options

| Command                 | Alias | Description                                           | Default   |
| ----------------------- | ----- | ----------------------------------------------------- | --------- |
| `gen-api <source>`      |       | The command to generate API interfaces.               |           |
| `--file`                | `-f`  | Treat the `<source>` as a local file path.            | `false`   |
| `--rename <directory>`  | `-r`  | The directory to save the generated files.            | `.apis`   |
| `--dev`                 | `-d`  | (For debugging) Generates intermediate artifacts.     | `false`   |
