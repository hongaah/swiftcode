import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  ErrorCode,
  McpError,
  Tool,
  CallToolResult,
  Prompt,
} from '@modelcontextprotocol/sdk/types.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { Swagger2InterfaceOutput } from '@swiftcode/api'
import { Template2ListOutput, createTemplate } from '@swiftcode/list'
import path from 'node:path'

const TOOLS: Tool[] = [
  {
    name: 'generate_api_client',
    description: 'Generate TypeScript API client from Swagger/OpenAPI specification',
    inputSchema: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
          description:
            "使用本地文件路径或 swagger URL 生成 API 和类型文件 / URL or JSON file path. Examples: For full path: '//user/file.json', For file only: 'file.json' returns 'file json'. URLs should start with '/' for proper routing.",
        },
        dir: {
          type: 'string',
          description: 'workspace dir',
        },
      },
      required: ['source', 'dir'],
    },
  },
  {
    name: 'generate_sfc_template_client',
    description: '下载转换 sfc / vue 列表的模板文件当前目录下 / Download the transform sfc template files',
    inputSchema: {
      type: 'object',
      properties: {
        dir: {
          type: 'string',
          description: 'workspace dir',
        },
      },
      required: ['dir'],
    },
  },
  {
    name: 'generate_sfc_client',
    description:
      "使用 sfc 模板生成 vue 列表组件 / Generate vue sfc component page.Examples: For file only returns vue sfc pages, default file name: 'template.js'",
    inputSchema: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
          description: 'sfc 模板文件路径 / sfc template file path',
        },
        dir: {
          type: 'string',
          description: 'workspace dir',
        },
      },
      required: ['source', 'dir'],
    },
  },
]

const PROMPTS: Prompt[] = [
  {
    name: 'generate_api_client',
    description: '使用 swiftcode 生成 typescript api 接口文件和类型',
    arguments: [
      {
        name: 'api',
        description: '',
        required: false,
      },
    ],
  },
  {
    name: 'generate_sfc_template_client',
    description: '下载 swiftcode 生成 sfc 的模板文件',
    arguments: [
      {
        name: 'template',
        description: '',
        required: false,
      },
    ],
  },
  {
    name: 'generate_sfc_client',
    description: '使用 swiftcode sfc 模板生成 vue 列表组件',
    arguments: [
      {
        name: 'sfc',
        description: '',
        required: false,
      },
    ],
  },
]

class SwiftcodeMCP {
  server: Server

  constructor() {
    this.server = new Server(
      {
        name: 'swiftcode-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {
            listChanged: true,
          },
          prompts: {
            listChanged: true,
          },
        },
      }
    )

    this.setupHandlers()
    this.setupErrorHandling()
  }

  private setupErrorHandling(): void {
    this.server.onerror = error => {
      console.error('[MCP Error]', error)
    }

    process.on('SIGINT', async () => {
      await this.stop()
      process.exit(0)
    })
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS,
    }))

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async request =>
      this.handleToolCall(request.params.name, request.params.arguments ?? {})
    )

    // List available prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
      prompts: PROMPTS,
    }))
  }

  /**
   * Handles tool call requests
   */
  private async handleToolCall(name: string, args: any): Promise<CallToolResult> {
    switch (name) {
      case 'generate_api_client': {
        const { source, dir } = args
        // 判断 source 是否是文件路径
        const isFilePath = source.startsWith('/')
        const filePath = isFilePath ? `/${source}` : source
        try {
          await Swagger2InterfaceOutput({
            source: filePath,
            isDev: false,
            dir: path.join(dir, 'apis'),
          })
          return {
            content: [
              {
                type: 'text',
                text: 'API client generated successfully. Please check the apis directory. output file list',
              },
            ],
          }
        } catch (error) {
          console.error('Error while generating API client:', error)
          throw new McpError(ErrorCode.InternalError, 'Failed to generate API client', {
            code: ErrorCode.InternalError,
            message: 'Failed to generate API client',
          })
        }
      }
      case 'generate_sfc_template_client': {
        const { dir } = args
        // 直接使用导入的模板内容，写入到目标目录
        try {
          createTemplate('template.js', '', dir)

          return {
            content: [
              {
                type: 'text',
                text: `SFC template file created successfully at ${path.join(dir, 'template.js')}`,
              },
            ],
          }
        } catch (error) {
          console.error('Error while generating SFC template files:', error)
          throw new McpError(ErrorCode.InternalError, 'Failed to generate SFC template files', {
            code: ErrorCode.InternalError,
            message: `Failed to generate SFC template files: ${error instanceof Error ? error.message : 'Unknown error'}`,
          })
        }
      }
      case 'generate_sfc_client': {
        const { source, dir } = args
        try {
          // 判断 source 是否是文件路径
          const isFilePath = source.startsWith('/')
          const filePath = isFilePath ? `/${source}` : source
          const dirPath = path.join(dir, '.lists')
          await Template2ListOutput({
            source: filePath,
            dir: dirPath
          })
          return {
            content: [
              {
                type: 'text',
                text: 'SFC files generated successfully.',
              },
            ],
          }
        } catch (error) {
          console.error('Error while generating SFC files:', error)
          throw new McpError(ErrorCode.InternalError, 'Failed to generate SFC files', {
            code: ErrorCode.InternalError,
            message: 'Failed to generate SFC files',
          })
        }
      }
      default: {
        throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`, {
          code: ErrorCode.MethodNotFound,
          message: `Tool ${name} not found`,
        })
      }
    }
  }

  /**
   * Starts the server
   */
  async start(): Promise<void> {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
  }

  /**
   * Stops the server
   */
  async stop(): Promise<void> {
    try {
      await this.server.close()
    } catch (error) {
      console.error('Error while stopping server:', error)
    }
  }
}

const server = new SwiftcodeMCP()

// Main execution
async function main() {
  try {
    console.log('Swiftcode MCP Server starting...')
    await server.start()
  } catch (error) {
    console.error('Server failed to start:', error)
    process.exit(1)
  }
}

main().catch(error => {
  console.error('Fatal server error:', error)
  process.exit(1)
})

process.on('SIGINT', async () => {
  await server.stop()
  process.exit(0)
})
