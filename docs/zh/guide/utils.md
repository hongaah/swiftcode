# 🧩 Utils

`Utils` 包是一个共享的内部库，提供了在整个 SwiftCode 项目中使用的辅助函数集合。

::: info
集中管理这些函数可以防止代码重复，并确保在文件系统操作、数据转换和代码格式化等任务中行为一致。
:::

## 模块

该包被组织成几个模块，每个模块都专注于一个特定的功能领域。

### 📦 `node-tools`

该模块提供了对 Node.js `fs` 和 `child_process` API 的封装，简化了文件和目录的操作。

**关键函数:**

- `generateFolder(dir: string)`: 确保目录存在，如果不存在则创建它。
- `generateFile(filename: string, data: string)`: 将数据写入文件。
- `readFile(filename: string): string`: 读取文件内容。
- `removeDir(path: string)`: 递归地删除一个目录。
- `existsPath(path: string): boolean`: 检查文件或目录是否存在。
- `childProcessExec(command: string, cb: () => void)`: 执行一个 shell 命令。

### 🌐 `http-tools`

该模块包含一个用于发出 HTTP/HTTPS 请求的轻量级封装。

**关键函数:**

- `request(options: RequestOptions): Promise<any>`: 执行一个 HTTP 请求。

### 🎨 `format-tools`

该模块集成了 `prettier` 以提供一致的代码格式化。

**关键函数:**

- `formatPage(filename: string): Promise<string>`: 使用 Prettier 格式化文件内容。

### 🔧 `common-tools`

该模块包含各种数据转换和实用函数。

**关键函数:**

- `hump2Line(name: string): string`: 将驼峰式字符串转换为短横线式。
- `isJson(target: any): boolean`: 检查字符串是否为有效的 JSON。
- `json2moduleContent(target: any, varName: string): string`: 将对象转换为 ES 模块内容的字符串。
