# 🧩 Utils

The `Utils` package is a shared internal library that provides a collection of helper functions used across the SwiftCode project.

::: info
Centralizing these functions prevents code duplication and ensures consistent behavior in tasks like file system operations, data transformation, and code formatting.
:::

## Modules

The package is organized into several modules, each focused on a specific area of functionality.

### 📦 `node-tools`
This module provides wrappers around the Node.js `fs` and `child_process` APIs, simplifying file and directory manipulation.

**Key Functions:**
- `generateFolder(dir: string)`: Ensures a directory exists, creating it if it doesn't.
- `generateFile(filename: string, data: string)`: Writes data to a file.
- `readFile(filename: string): string`: Reads the content of a file.
- `removeDir(path: string)`: Recursively removes a directory.
- `existsPath(path: string): boolean`: Checks if a file or directory exists.
- `childProcessExec(command: string, cb: () => void)`: Executes a shell command.

### 🌐 `http-tools`
This module contains a lightweight wrapper for making HTTP/HTTPS requests.

**Key Functions:**
- `request(options: RequestOptions): Promise<any>`: Performs an HTTP request.

### 🎨 `format-tools`
This module integrates `prettier` to provide consistent code formatting.

**Key Functions:**
- `formatPage(filename: string): Promise<string>`: Formats file content using Prettier.

### 🔧 `common-tools`
This module contains various data transformation and utility functions.

**Key Functions:**
- `hump2Line(name: string): string`: Converts a camelCase string to kebab-case.
- `isJson(target: any): boolean`: Checks if a string is valid JSON.
- `json2moduleContent(target: any, varName: string): string`: Converts an object into an ES module string.
